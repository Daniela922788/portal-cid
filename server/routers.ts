import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { ENV } from "./_core/env";
import { z } from "zod";
import { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse, createEnrollment, getAllPQRS, createPQRS, getAllNews, getAllEvents, getEventById, getAllProjects, getProjectById, getAllCentrosInteres, getCentroInteresById, createCentroInteres, updateCentroInteres, deleteCentroInteres, getAllSesiones, getSesionById, createSesion, updateSesion, deleteSesion, getAsistenciaBySesion, createAsistencia, deleteAsistencia, getAllAsesorias, getAsesoriaById, createAsesoria, updateAsesoria, deleteAsesoria, getAllGestores, addGestorToCentro } from "./db";
import { loadDataProcedure } from "./load-data";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  courses: router({
    list: publicProcedure.query(async () => {
      return await getAllCourses();
    }),
    getById: publicProcedure.input(z.number()).query(async ({ input }) => {
      return await getCourseById(input);
    }),
    create: publicProcedure.input(z.object({
      titulo: z.string(),
      descripcion: z.string().optional(),
      imagen: z.string().optional(),
      fechaInicio: z.date().optional(),
      fechaFin: z.date().optional(),
      horario: z.string().optional(),
      lugar: z.string().optional(),
      cupos: z.number().optional(),
      publicoObjetivo: z.string().optional(),
      responsable: z.string().optional(),
      estado: z.enum(['activo', 'inactivo', 'completado']).optional(),
    })).mutation(async ({ input }) => {
      return await createCourse(input);
    }),
    update: publicProcedure.input(z.object({
      id: z.number(),
      data: z.object({
        titulo: z.string().optional(),
        descripcion: z.string().optional(),
        imagen: z.string().optional(),
        fechaInicio: z.date().optional(),
        fechaFin: z.date().optional(),
        horario: z.string().optional(),
        lugar: z.string().optional(),
        cupos: z.number().optional(),
        publicoObjetivo: z.string().optional(),
        responsable: z.string().optional(),
        estado: z.enum(['activo', 'inactivo', 'completado']).optional(),
      }),
    })).mutation(async ({ input }) => {
      return await updateCourse(input.id, input.data);
    }),
    delete: publicProcedure.input(z.number()).mutation(async ({ input }) => {
      return await deleteCourse(input);
    }),
  }),

  enrollments: router({
    create: publicProcedure.input(z.object({
      courseId: z.number(),
      nombreParticipante: z.string(),
      apellidoParticipante: z.string(),
      emailParticipante: z.string(),
      telefonoParticipante: z.string().optional(),
      edadParticipante: z.number().optional(),
      institucion: z.string().optional(),
      nombreAcudiente: z.string().optional(),
      emailAcudiente: z.string().optional(),
      telefonoAcudiente: z.string().optional(),
      residencia: z.string().optional(),
      horarioPreferido: z.string().optional(),
    })).mutation(async ({ input }) => {
      return await createEnrollment(input);
    }),
  }),

  pqrs: router({
    create: publicProcedure.input(z.object({
      tipo: z.enum(["peticion", "queja", "reclamo", "sugerencia", "felicitacion", "denuncia", "solicitud_info", "solicitud_datos", "agenda_cita"]),
      nombre: z.string(),
      email: z.string(),
      telefono: z.string().optional(),
      asunto: z.string(),
      descripcion: z.string(),
    })).mutation(async ({ input }) => {
      return await createPQRS(input);
    }),
    list: publicProcedure.query(async () => {
      return await getAllPQRS();
    }),
  }),

  news: router({
    list: publicProcedure.query(async () => {
      return await getAllNews();
    }),
  }),

  events: router({
    list: publicProcedure.query(async () => {
      return await getAllEvents();
    }),
    getById: publicProcedure.input(z.number()).query(async ({ input }) => {
      return await getEventById(input);
    }),
  }),

  projects: router({
    list: publicProcedure.query(async () => {
      return await getAllProjects();
    }),
    getById: publicProcedure.input(z.number()).query(async ({ input }) => {
      return await getProjectById(input);
    }),
  }),

  // ============================================
  // NUEVOS PROCEDIMIENTOS PARA EL CRM
  // ============================================

  centrosInteres: router({
    list: publicProcedure.query(async () => {
      return await getAllCentrosInteres();
    }),
    getById: publicProcedure.input(z.number()).query(async ({ input }) => {
      return await getCentroInteresById(input);
    }),
    create: publicProcedure.input(z.object({
      nombre: z.string(),
      correoGestor: z.string(),
      institucionEducativa: z.string(),
      fechaInicio: z.date(),
      numeroSesiones: z.number(),
      lineaTematica: z.string(),
      codigoGrupo: z.string(),
      grado: z.string(),
      numeroEstudiantes: z.number(),
      numeroDocentes: z.number(),
      gestoresIds: z.array(z.number()),
    })).mutation(async ({ input }) => {
      const { gestoresIds, ...centroData } = input;
      const centro = await createCentroInteres(centroData);
      
      // Agregar gestores al centro
      for (const gestorId of gestoresIds) {
        await addGestorToCentro(centro.id, gestorId);
      }
      
      return centro;
    }),
    update: publicProcedure.input(z.object({
      id: z.number(),
      data: z.object({
        nombre: z.string().optional(),
        institucionEducativa: z.string().optional(),
        numeroSesiones: z.number().optional(),
        lineaTematica: z.string().optional(),
        numeroEstudiantes: z.number().optional(),
        numeroDocentes: z.number().optional(),
        estado: z.enum(['activo', 'inactivo', 'completado']).optional(),
      }),
    })).mutation(async ({ input }) => {
      return await updateCentroInteres(input.id, input.data);
    }),
    delete: publicProcedure.input(z.number()).mutation(async ({ input }) => {
      return await deleteCentroInteres(input);
    }),
  }),

  sesiones: router({
    list: publicProcedure.query(async () => {
      return await getAllSesiones();
    }),
    getById: publicProcedure.input(z.number()).query(async ({ input }) => {
      return await getSesionById(input);
    }),
    create: publicProcedure.input(z.object({
      titulo: z.string(),
      centroInteresId: z.number(),
      numeroSesion: z.number(),
      fechaHora: z.date(),
      duracionMinutos: z.number(),
    })).mutation(async ({ input }) => {
      return await createSesion({
        ...input,
        estado: 'pendiente',
      });
    }),
    update: publicProcedure.input(z.object({
      id: z.number(),
      data: z.object({
        titulo: z.string().optional(),
        numeroSesion: z.number().optional(),
        fechaHora: z.date().optional(),
        duracionMinutos: z.number().optional(),
        estado: z.enum(['pendiente', 'completada', 'cancelada']).optional(),
        observaciones: z.string().optional(),
      }),
    })).mutation(async ({ input }) => {
      return await updateSesion(input.id, input.data);
    }),
    delete: publicProcedure.input(z.number()).mutation(async ({ input }) => {
      return await deleteSesion(input);
    }),
  }),

  asistencia: router({
    getBySesion: publicProcedure.input(z.number()).query(async ({ input }) => {
      return await getAsistenciaBySesion(input);
    }),
    create: publicProcedure.input(z.object({
      sesionId: z.number(),
      documentoEstudiante: z.string(),
    })).mutation(async ({ input }) => {
      return await createAsistencia(input);
    }),
    delete: publicProcedure.input(z.number()).mutation(async ({ input }) => {
      return await deleteAsistencia(input);
    }),
  }),

  asesorias: router({
    list: publicProcedure.query(async () => {
      return await getAllAsesorias();
    }),
    getById: publicProcedure.input(z.number()).query(async ({ input }) => {
      return await getAsesoriaById(input);
    }),
    create: publicProcedure.input(z.object({
      titulo: z.string(),
      tipoDocumento: z.string(),
      documentoIdentidad: z.string(),
      primerNombre: z.string(),
      segundoNombre: z.string().optional(),
      primerApellido: z.string(),
      segundoApellido: z.string().optional(),
      telefono: z.string().optional(),
      correoElectronico: z.string().optional(),
      institucionEducativa: z.string(),
      rolPersona: z.string(),
      barrioVereda: z.string().optional(),
      ruralUrbano: z.enum(['Rural', 'Urbano']).optional(),
      fechaNacimiento: z.date().optional(),
      edad: z.number().optional(),
      genero: z.enum(['Hombre', 'Mujer', 'Otro']).optional(),
      personasEspecialInteres: z.string().optional(),
      autoreconocimientoEtnico: z.string().optional(),
      orientacionSexual: z.string().optional(),
      grado: z.string().optional(),
      duracionMinutos: z.number(),
      fechaAsesoria: z.date(),
      tipoAcompanamiento: z.string(),
      desarrolloAcompanamiento: z.string().optional(),
    })).mutation(async ({ input, ctx }) => {
      if (!ctx.user) throw new Error('Not authenticated');
      return await createAsesoria({
        ...input,
        gestorInnovacionId: ctx.user.id,
      });
    }),
    update: publicProcedure.input(z.object({
      id: z.number(),
      data: z.object({
        titulo: z.string().optional(),
        institucionEducativa: z.string().optional(),
        rolPersona: z.string().optional(),
        duracionMinutos: z.number().optional(),
        fechaAsesoria: z.date().optional(),
        tipoAcompanamiento: z.string().optional(),
      }),
    })).mutation(async ({ input }) => {
      return await updateAsesoria(input.id, input.data);
    }),
    delete: publicProcedure.input(z.number()).mutation(async ({ input }) => {
      return await deleteAsesoria(input);
    }),
  }),

  // Gestores
  gestores: router({
    list: publicProcedure.query(async () => {
      return await getAllGestores();
    }),
  }),

  // Cargar datos desde Excel
  loadData: loadDataProcedure,

  // Chat con IA del CID
  ai: router({
    chat: publicProcedure
      .input(
        z.object({
          messages: z.array(
            z.object({
              role: z.enum(["user", "assistant"]),
              content: z.string(),
            })
          ),
        })
      )
      .mutation(async ({ input }) => {
        const latestUserMessage = [...input.messages]
          .reverse()
          .find(message => message.role === "user")
          ?.content.toLowerCase() ?? "";

        const courseTerms = "curso|cursos|semillero|semilleros|grupo|grupos|clase|clases|taller|talleres";

        const asksForCourseCatalog = new RegExp(
          `((qu[eé]|cu[aá]les|cuales|ofrecen|oferta|inscrip|formaci[oó]n).*(?:${courseTerms}))|((?:${courseTerms}).*(ofrecen|hay|tienen|dan))`,
          "i"
        ).test(
          latestUserMessage
        );
        const asksAboutCoursePrice = new RegExp(
          `((?:${courseTerms}).*(gratis|costo|costos|precio|precios|valor|vale))|((gratis|costo|costos|precio|precios|valor|vale).*(?:${courseTerms}))`,
          "i"
        ).test(
          latestUserMessage
        );
        const asksAboutCourseLocation = new RegExp(
          `((d[oó]nde|donde|lugar|ubicaci[oó]n|sitio).*(?:${courseTerms}))|((?:${courseTerms}).*(d[oó]nde|donde|lugar|ubicaci[oó]n|sitio))`,
          "i"
        ).test(
          latestUserMessage
        );
        const asksAboutContact = /(contact|whatsapp|wpp|comunicar|comunicate|comunícate|hablar|escribirles|escribirles|mesa de ayuda)/i.test(
          latestUserMessage
        );
        const asksAboutHours = /(horario|horarios|atienden|atenci[oó]n|abren|cierran|hora)/i.test(
          latestUserMessage
        );
        const asksAboutCidOrTeam = /(qué es el cid|que es el cid|quienes son|quiénes son|equipo|nosotros|sobre el cid|sobre ustedes)/i.test(
          latestUserMessage
        );
        const asksAboutSemanaStem = /(semana\s*stem|stem\+|foro\s*tendencias\s*que\s*transforman|territorio\s*stem|ciudad\s*del\s*aprendizaje)/i.test(
          latestUserMessage
        );

        let navigateTo: string | undefined;
        const additionalGuidance: string[] = [
          "- Responde de forma conversacional y natural, sin sonar como bot de menú.",
          "- Contesta la pregunta específica del usuario; no repitas siempre el mismo texto para preguntas distintas sobre cursos.",
        ];

        if (asksForCourseCatalog) {
          navigateTo = "/formacion";
          additionalGuidance.push(
            "- El usuario está preguntando por la oferta general de cursos, semilleros, grupos, clases o talleres.",
            "- Puedes decir que el CID ofrece procesos de formación en tecnología, robótica, programación, fotografía e inteligencia artificial, entre otras líneas STEM+.",
            "- Puedes mencionar como ejemplos de cursos recientes: STEAMers Kids, Explorando la IA, Senior Tech, Exprésate con estilo: Canva, Fotografía Creativa Express y Stop Motion con Legos.",
            "- Responde normal, en uno o dos párrafos, y al final menciona que lo estás redirigiendo a Formación para ver la oferta vigente.",
            "- No presentes el enlace como '/formacion' en bruto; solo habla de la sección Formación de manera natural."
          );
        }

        if (asksAboutCidOrTeam && !navigateTo) {
          navigateTo = "/nosotros";
          additionalGuidance.push(
            "- El usuario está preguntando qué es el CID o por el equipo humano.",
            "- Responde de manera natural con qué es el CID y qué hace.",
            "- Al final menciona que lo estás redirigiendo a la sección Nosotros para ampliar la información del equipo.",
            "- No escribas rutas con slash como '/nosotros'; menciona solo 'sección Nosotros'."
          );
        }

        if (asksAboutSemanaStem && !navigateTo) {
          navigateTo = "/semana-stem-complete";
          additionalGuidance.push(
            "- El usuario está preguntando por Semana STEM+ Envigado.",
            "- Responde con base en la información oficial incluida en este prompt sobre propósito, marco institucional y enfoque pedagógico del evento.",
            "- Incluye que es una iniciativa de la Dirección de Innovación de la Secretaría de Educación y que se enmarca en Envigado como Ciudad del Aprendizaje de la UNESCO y Territorio STEM+ Smart Regenerativo.",
            "- Puedes mencionar el foro 'Tendencias que Transforman: Educación, tecnología y ética' como espacio de reflexión del marco Semana STEM+ Envigado 2025.",
            "- Al final, menciona que lo estás redirigiendo a la sección Semana STEM para ampliar la información.",
            "- No escribas rutas con slash como '/semana-stem'; menciona solo 'sección Semana STEM'."
          );
        }

        if (asksAboutCoursePrice) {
          additionalGuidance.push(
            "- El usuario está preguntando por el precio, valor o costo de cursos, semilleros, grupos, clases o talleres.",
            "- Este dato sí está confirmado: los cursos no tienen costo; son gratuitos.",
            "- Responde de forma directa y natural que no tienen costo, no valen nada o son gratis.",
            "- Si ayuda, puedes añadir que para ver la oferta vigente lo estás redirigiendo a Formación."
          );
        }

        if (asksAboutCourseLocation) {
          additionalGuidance.push(
            "- El usuario está preguntando por el lugar donde se realizan cursos, semilleros, grupos, clases o talleres.",
            "- Este dato sí está confirmado: el lugar varía según la oferta.",
            "- Puedes responder que la mayoría de los cursos se realizan en la Biblioteca Pública y Parque Cultural Débora Arango.",
            "- Aclara de forma natural que el lugar depende de cada curso o semillero y que en Formación se puede revisar el detalle vigente."
          );
        }

        if (asksAboutContact) {
          additionalGuidance.push(
            "- El usuario está preguntando cómo comunicarse con el CID.",
            "- Indica que puede comunicarse por Mesa de Ayuda.",
            "- Menciona literalmente 'Mesa de Ayuda' en la respuesta para que la interfaz convierta eso en el enlace de WhatsApp."
          );
        }

        if (asksAboutHours) {
          additionalGuidance.push(
            "- El horario confirmado es: días hábiles, de 7:00 a. m. a 5:00 p. m.",
            "- Responde ese dato de forma directa y natural."
          );
        }

        const systemPrompt = `Eres el asistente virtual del Centro de Innovación y Desarrollo (CID) de Envigado, Colombia.
Tu nombre es "Asistente CID" y tu función es responder preguntas sobre el CID de manera clara, amable y precisa en español.

INFORMACIÓN SOBRE EL CID:
- El CID (Centro de Innovación y Desarrollo) es una dependencia de la Alcaldía de Envigado que lidera procesos de transformación educativa y digital en el municipio.
- Trabaja bajo el enfoque STEM+ (Ciencia, Tecnología, Ingeniería, Arte y Matemáticas).
- Su propósito es fortalecer la innovación educativa, la formación tecnológica y el acompañamiento a instituciones educativas y comunidad.
- Cuenta con Gestores de Innovación Educativa: profesionales asignados a las instituciones educativas públicas de Envigado para acompañar a docentes y estudiantes.
- Los gestores acompañan procesos pedagógicos, formación, proyectos y apropiación tecnológica en las instituciones.
- Ofrece formación y cursos en tecnología, robótica, programación, fotografía, y otras áreas STEM para docentes, estudiantes y comunidad en general.
- Tiene salas de tecnología y espacios educativos en diferentes instituciones del municipio.
- Los cursos, semilleros, grupos, clases y talleres del CID son gratuitos; no tienen costo.
- El lugar de la oferta varía según cada curso o semillero. La mayoría se realiza en la Biblioteca Pública y Parque Cultural Débora Arango.
- Realiza eventos como la Semana STEM+ anualmente.
- La Semana STEM+ Envigado es una iniciativa de la Dirección de Innovación de la Secretaría de Educación para consolidar el compromiso del municipio con una educación transformadora, pertinente y conectada con los retos del siglo XXI.
- Este evento se desarrolla en el marco del reconocimiento de Envigado como Ciudad del Aprendizaje de la UNESCO y como Territorio STEM+ Smart Regenerativo.
- La Semana STEM+ busca visibilizar, fortalecer y promover experiencias pedagógicas significativas que integren ciencia, tecnología, ética, pensamiento crítico y creatividad en la vida escolar.
- Es una invitación a niñas, niños, jóvenes, docentes e instituciones a imaginar, construir y compartir soluciones reales a desafíos locales y globales.
- En el marco de Semana STEM+ Envigado 2025, el foro "Tendencias que Transforman: Educación, tecnología y ética" fue un espacio de encuentro, reflexión y proyección sobre los desafíos y oportunidades de la educación en un mundo mediado por la tecnología.
- Apoya proyectos de investigación y semilleros escolares.
- Tiene el programa CID Kids para niños.
- Cuenta con aliados estratégicos y reconocimientos a nivel nacional.
- Horario de atención confirmado: días hábiles (lunes a viernes), de 7:00 a. m. a 5:00 p. m.
- Para más información o contacto: visita la sección Mesa de Ayuda en la página web o comunícate con la Alcaldía de Envigado.

MAPA DEL PORTAL (ENLACES INTERNOS OFICIALES):
- Formación y cursos: /formacion
- Equipo del CID (carrusel): /nosotros
- Gestores de innovación: /gestores
- Semana STEM: /semana-stem-complete
- Mesa de ayuda: /mesa-ayuda

REGLAS ESTRICTAS (OBLIGATORIAS):
- Responde siempre en español.
- Usa solo la información incluida en este prompt y en el mensaje del usuario.
- No inventes nombres, fechas, horarios, direcciones, costos, teléfonos, correos, enlaces ni requisitos.
- Si el usuario pide un dato que no está confirmado, responde EXACTAMENTE esta frase al inicio:
  "No tengo ese dato confirmado en este momento."
- Después de esa frase, orienta a la Mesa de Ayuda del sitio para confirmación oficial.
- Nunca afirmes como hecho algo incierto o no verificado.
- Si hay ambigüedad, pide una aclaración breve en lugar de suponer.
- Mantén respuestas breves, claras y útiles.

RUTEO OBLIGATORIO SEGÚN INTENCIÓN:
- Si preguntan por cursos, oferta, inscripciones o formación: debes enviar a "Formación (/formacion)".
- Si preguntan por el equipo humano del CID: debes enviar a "Nosotros (/nosotros)" e indicar que allí está el carrusel del equipo.
- Si preguntan por horarios: responde explícitamente "días hábiles de 7:00 a. m. a 5:00 p. m.".
- Si preguntan qué es el CID, qué hace el CID o qué hacen los gestores: responde con la información oficial de este prompt y, cuando ayude, complementa con enlaces internos del mapa.
- No muestres rutas con slash en la respuesta final (por ejemplo, "/nosotros" o "/formacion"); menciona solo el nombre de la sección.

FORMATO DE SEGURIDAD:
- Cuando sí tengas certeza: responde normal y directo.
- Cuando NO tengas certeza: usa el formato:
  1) "No tengo ese dato confirmado en este momento."
  2) "Te recomiendo validar en la Mesa de Ayuda del portal del CID para una respuesta oficial."

GUÍA PARA ESTA CONSULTA ACTUAL:
${additionalGuidance.join("\n")}`;

        const ollamaUrl = (ENV.ollamaBaseUrl || "http://127.0.0.1:11434").replace(/\/$/, "");
        const ollamaModel = ENV.ollamaModel || "deepseek-r1:1.5b";
        const preferLocal = ENV.aiProvider !== "forge" && ENV.aiProvider !== "gemini";

        const requestBody = {
          model: ollamaModel,
          messages: [{ role: "system", content: systemPrompt }, ...input.messages],
          max_tokens: 1024,
          temperature: 0.1,
        };

        const callOllama = async () => {
          return await fetch(`${ollamaUrl}/v1/chat/completions`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          });
        };

        const callRemote = async () => {
          const apiKey = ENV.geminiApiKey || ENV.forgeApiKey;
          if (!apiKey) {
            throw new Error(
              "No hay proveedor remoto configurado. Usa Ollama local o define GEMINI_API_KEY/BUILT_IN_FORGE_API_KEY."
            );
          }

          const apiUrl = ENV.forgeApiKey
            ? `${(ENV.forgeApiUrl || "https://forge.manus.im").replace(/\/$/, "")}/v1/chat/completions`
            : "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";

          return await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              ...requestBody,
              model: ENV.forgeApiKey ? "gemini-2.5-flash" : "gemini-2.0-flash",
            }),
          });
        };

        let response: Response;

        try {
          response = preferLocal ? await callOllama() : await callRemote();
        } catch (error) {
          if (!preferLocal) {
            throw error;
          }

          throw new Error(
            `No se pudo conectar a Ollama local. Instala Ollama, ejecuta 'ollama serve' y luego 'ollama run ${ollamaModel}'.`
          );
        }

        if (!response.ok) {
          const errorText = await response.text();
          if (preferLocal) {
            throw new Error(
              `Ollama respondió con error (${response.status}). Verifica que el modelo '${ollamaModel}' esté instalado. Detalle: ${errorText}`
            );
          }
          throw new Error(`Error de la API de IA: ${response.status} - ${errorText}`);
        }

        const data = (await response.json()) as {
          choices?: Array<{ message?: { content?: string } }>;
        };

        const reply = data.choices?.[0]?.message?.content ?? "";
        return { reply, navigateTo };
      }),
  }),
});

export type AppRouter = typeof appRouter;
