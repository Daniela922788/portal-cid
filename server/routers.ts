import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
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
});

export type AppRouter = typeof appRouter;
