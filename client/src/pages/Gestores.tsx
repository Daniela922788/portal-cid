import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BrainCircuit,
  Building2,
  CheckCircle2,
  GraduationCap,
  Handshake,
  Landmark,
  Lightbulb,
  MapPinned,
  Rocket,
  School,
  Sparkles,
  Target,
  Users,
  Waypoints,
  type LucideIcon,
} from "lucide-react";

type Competencia = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type FrenteTrabajo = {
  id: string;
  title: string;
  summary: string;
  icon: LucideIcon;
  acciones: string[];
  impacto: string;
};

const funcionesGenerales = [
  "Acompañamiento pedagógico a docentes.",
  "Diseño de experiencias de aprendizaje con metodologías activas.",
  "Implementación del enfoque STEM+.",
  "Formación en herramientas tecnológicas y digitales.",
  "Gestión de proyectos educativos innovadores.",
  "Articulación con instituciones, aliados y el ecosistema educativo.",
];

const competenciasSigloXXI = ["Conocimientos", "Habilidades", "Actitudes", "Valores"];

const capacidadesCiudadanas = [
  "Integrar conocimientos, habilidades, actitudes y valores.",
  "Resolver problemas complejos.",
  "Tomar decisiones informadas.",
  "Aportar al desarrollo sostenible del territorio.",
];

const competenciasClave: Competencia[] = [
  {
    title: "Metodologías activas",
    description: "Manejo de ABP, STEAM, Design Thinking y aprendizaje basado en retos.",
    icon: BrainCircuit,
  },
  {
    title: "Liderazgo pedagógico",
    description: "Capacidad para orientar y acompañar a docentes y directivos en procesos de transformación.",
    icon: GraduationCap,
  },
  {
    title: "Habilidades tecnológicas",
    description: "Uso de herramientas digitales, programación, robótica y producción multimedia.",
    icon: Rocket,
  },
  {
    title: "Gestión de proyectos",
    description: "Diseño, ejecución y evaluación de iniciativas educativas con seguimiento real.",
    icon: Target,
  },
  {
    title: "Habilidades blandas",
    description: "Comunicación asertiva, trabajo colaborativo, pensamiento crítico y resolución de problemas.",
    icon: Users,
  },
  {
    title: "Enfoque ético y sostenible",
    description: "Promoción de prácticas responsables con el entorno y orientadas al bien común.",
    icon: CheckCircle2,
  },
  {
    title: "Articulación institucional",
    description: "Trabajo coordinado con instituciones educativas, centros de ciencia y aliados.",
    icon: Waypoints,
  },
];

const frentesTrabajo: FrenteTrabajo[] = [
  {
    id: "cid",
    title: "Trabajo en el Centro de Innovación (CID)",
    summary:
      "En el Centro de Innovación, los gestores desarrollan procesos formativos dirigidos a docentes, estudiantes y comunidad en general.",
    icon: Lightbulb,
    acciones: [
      "Talleres formativos y cursos en tecnología, innovación y STEM.",
      "Clubes y espacios de experimentación con enfoque práctico.",
      "Procesos de alfabetización digital y apropiación del conocimiento.",
      "Diseño de experiencias que luego se trasladan a las instituciones educativas.",
    ],
    impacto:
      "El CID funciona como un laboratorio de aprendizaje donde se exploran metodologías, herramientas y rutas de innovación aplicables al territorio.",
  },
  {
    id: "instituciones",
    title: "Trabajo en Instituciones Educativas",
    summary:
      "En las instituciones educativas públicas fortalecen centros de interés, semilleros de investigación y proyectos STEM.",
    icon: School,
    acciones: [
      "Acompañamiento a centros de interés y proyectos con enfoque territorial.",
      "Impulso a procesos en tecnología, ciencia, robótica, medio ambiente y comunicación.",
      "Planeación de actividades y seguimiento continuo a los procesos.",
      "Promoción del aprendizaje basado en proyectos y la participación activa del estudiante.",
    ],
    impacto:
      "Los estudiantes desarrollan intereses, capacidades y experiencias más significativas dentro de su contexto escolar.",
  },
  {
    id: "docentes",
    title: "Acompañamiento y asesoría a docentes",
    summary:
      "Uno de los pilares del trabajo de los gestores es el acompañamiento directo a docentes dentro del aula.",
    icon: Handshake,
    acciones: [
      "Planeación conjunta de clases y proyectos.",
      "Implementación de metodologías activas e integración del enfoque STEM en el currículo.",
      "Apoyo en el uso de herramientas tecnológicas y evaluación de experiencias de aprendizaje.",
      "Talleres de formación, mentorías personalizadas y espacios de aprendizaje colaborativo.",
    ],
    impacto:
      "El docente gana confianza para innovar, incorporar tecnología y transformar sus dinámicas de enseñanza.",
  },
  {
    id: "territorio",
    title: "Trabajo en el territorio y la comunidad",
    summary:
      "Los gestores extienden su impacto más allá de la escuela, vinculando ciudadanía, comunidad y territorio.",
    icon: MapPinned,
    acciones: [
      "Creación de comunidades de aprendizaje y formación abierta a la ciudadanía.",
      "Procesos de alfabetización digital y diagnósticos sobre el uso de TIC.",
      "Difusión de buenas prácticas educativas, ferias de ciencia y eventos del ecosistema.",
      "Participación en redes de conocimiento que fortalecen el aprendizaje compartido.",
    ],
    impacto:
      "Se consolida un ecosistema educativo innovador donde el conocimiento circula, se transforma y genera impacto social.",
  },
  {
    id: "articulacion",
    title: "Articulación y gestión del sistema educativo",
    summary:
      "También cumplen un rol estratégico en la articulación institucional y el seguimiento de procesos educativos.",
    icon: Landmark,
    acciones: [
      "Apoyo a la transformación del PEI y la planeación de proyectos educativos.",
      "Gestión de alianzas con actores del ecosistema y participación en comités.",
      "Reportes periódicos, registro de actividades y seguimiento a indicadores.",
      "Gestión administrativa que asegura continuidad, trazabilidad y mejora.",
    ],
    impacto:
      "La innovación deja de depender de acciones aisladas y se integra a la gestión institucional con visión de sostenibilidad.",
  },
];

export default function Gestores() {
  const [frenteActivo, setFrenteActivo] = useState(frentesTrabajo[0].id);

  const frenteActual = frentesTrabajo.find((frente) => frente.id === frenteActivo) ?? frentesTrabajo[0];
  const IconoFrenteActual = frenteActual.icon;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,222,7,0.18),_transparent_22%),linear-gradient(180deg,_#ffffff_0%,_rgba(17,178,170,0.08)_45%,_rgba(13,75,86,0.08)_100%)] py-8">
      <div className="container">
        <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Gestores de Innovación" }]} />

        <section className="relative mt-6 overflow-hidden rounded-3xl border border-[#182130] bg-gradient-to-r from-[#182130] via-[#0D4B56] to-[#023A34] p-6 text-white shadow-2xl md:p-10 lg:p-14">
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[#11B2AA]/25 blur-2xl" />
          <div className="absolute -bottom-16 left-1/3 h-52 w-52 rounded-full bg-[#2D3586]/25 blur-2xl" />
          <div className="relative">
            <Badge className="mb-4 bg-[#FFDE07] text-[#182130] hover:bg-[#FFDE07]/90">
              <Sparkles className="mr-2 h-4 w-4" /> Innovación educativa y territorio STEM+
            </Badge>
            <h1 className="max-w-4xl text-3xl font-black leading-tight md:text-5xl">
              Gestores de Innovación Educativa
            </h1>
            <p className="mt-4 max-w-4xl text-sm text-cyan-50 md:text-lg">
              Son profesionales que lideran procesos de transformación en las instituciones educativas,
              promoviendo nuevas formas de enseñar y aprender a través del enfoque STEM+, la tecnología y la
              innovación pedagógica.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-white/15 text-white hover:bg-white/20">
                Agentes de cambio
              </Badge>
              <Badge variant="secondary" className="bg-white/15 text-white hover:bg-white/20">
                Acompañamiento pedagógico
              </Badge>
              <Badge variant="secondary" className="bg-white/15 text-white hover:bg-white/20">
                Innovación con impacto territorial
              </Badge>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <Card className="border-[#0D4B56]/30 bg-gradient-to-br from-white via-white to-[#11B2AA]/10 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-[#0D4B56]">¿Qué son los gestores?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700">
              <p>
                Se caracterizan por ser agentes de cambio con mentalidad innovadora, capaces de trascender los
                modelos tradicionales de educación y acompañar nuevas formas de aprendizaje.
              </p>
              <p>
                Su enfoque multidisciplinario les permite integrar distintas áreas del conocimiento para trabajar de
                la mano con docentes, directivos y estudiantes en experiencias educativas más dinámicas,
                pertinentes y significativas.
              </p>
              <p>
                Más que capacitadores externos, son aliados en el aula que fortalecen las prácticas pedagógicas
                desde la realidad del territorio.
              </p>
            </CardContent>
          </Card>

          <Card className="border-[#11B2AA]/40 bg-gradient-to-br from-[#FFDE07]/20 via-[#11B2AA]/10 to-[#2D3586]/15 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-[#182130]">Propósito de los gestores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700">
              <p>
                Su propósito se enmarca en el trabajo de la Dirección de Innovación, que busca liderar, coordinar y
                promover el desarrollo científico, tecnológico y de innovación como motor del progreso social,
                educativo, económico y cultural del municipio.
              </p>
              <p>
                En ese sentido, los gestores conectan conocimiento, comunidad y soluciones a problemáticas reales,
                impulsando procesos educativos alineados con la sostenibilidad y el enfoque de Territorio STEM+
                SMART.
              </p>
              <div className="rounded-2xl border border-[#EC6910]/40 bg-gradient-to-r from-[#EC6910]/15 to-[#FFDE07]/15 p-4">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#EC6910]">
                  Su labor contribuye a formar ciudadanos capaces de:
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {capacidadesCiudadanas.map((capacidad) => (
                    <div key={capacidad} className="rounded-xl border border-[#FFDE07]/40 bg-white/90 p-3 text-sm text-slate-700 shadow-sm">
                      {capacidad}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Card className="border-[#11B2AA]/40 bg-gradient-to-br from-white to-[#11B2AA]/10 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-[#182130]">¿Qué hacen los gestores?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-5 text-slate-700">
                Diseñan, implementan y acompañan procesos educativos innovadores que impactan diferentes niveles del
                sistema educativo y la comunidad.
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                {funcionesGenerales.map((funcion) => (
                  <div key={funcion} className="rounded-2xl border border-[#11B2AA]/25 bg-gradient-to-br from-white to-[#11B2AA]/10 p-4 text-sm text-slate-700 shadow-sm">
                    {funcion}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#2D3586]/30 bg-gradient-to-br from-[#2D3586]/15 via-white to-[#FFDE07]/10 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-[#182130]">Competencias que promueven</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {competenciasSigloXXI.map((competencia) => (
                <div key={competencia} className="rounded-2xl border border-[#2D3586]/20 bg-gradient-to-r from-white to-[#2D3586]/10 p-4 text-slate-700 shadow-sm">
                  <p className="font-semibold text-[#182130]">{competencia}</p>
                  <p className="text-sm text-[#0D4B56]">
                    Desarrollo integral para aprender, hacer, convivir y actuar con criterio.
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="mt-12 rounded-[2rem] border border-[#11B2AA]/20 bg-gradient-to-b from-white to-[#11B2AA]/5 p-1">
          <div className="rounded-[1.7rem] bg-white/80 p-5 md:p-6">
          <div className="mb-5 flex items-center gap-3">
            <BrainCircuit className="h-7 w-7 text-[#0D4B56]" />
            <div>
              <h2 className="text-2xl font-bold text-[#182130] md:text-3xl">Perfil y competencias del gestor</h2>
              <p className="text-slate-600">
                El gestor de innovación educativa combina capacidades pedagógicas, tecnológicas y sociales para
                generar impacto real en el entorno educativo.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {competenciasClave.map((competencia) => {
              const Icon = competencia.icon;

              return (
                <Card key={competencia.title} className="border-transparent bg-gradient-to-br from-white via-white to-[#11B2AA]/10 shadow-sm ring-1 ring-[#11B2AA]/15">
                  <CardContent className="p-5">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FFDE07] to-[#EC6910] text-[#182130] shadow-sm">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-[#182130]">{competencia.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{competencia.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          </div>
        </section>

        <section className="mt-14 rounded-3xl border border-[#023A34]/20 bg-gradient-to-r from-[#023A34]/15 via-[#11B2AA]/12 to-[#FFDE07]/12 p-6 shadow-sm md:p-8">
          <div className="flex items-start gap-3">
            <Handshake className="mt-1 h-6 w-6 shrink-0 text-[#023A34]" />
            <div>
              <h3 className="text-xl font-bold text-[#182130]">¿Cómo trabajan los gestores?</h3>
              <p className="mt-2 max-w-4xl text-slate-700">
                Su trabajo combina formación, acompañamiento, trabajo en red y gestión institucional. A continuación
                puedes explorar los principales escenarios en los que desarrollan su labor.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="border-[#2D3586]/20 bg-gradient-to-b from-white to-[#2D3586]/5 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-[#182130]">Frentes de trabajo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {frentesTrabajo.map((frente) => {
                const Icon = frente.icon;

                return (
                  <button
                    key={frente.id}
                    type="button"
                    onClick={() => setFrenteActivo(frente.id)}
                    className={`flex w-full items-start gap-3 rounded-2xl border px-4 py-4 text-left transition-colors ${
                      frenteActivo === frente.id
                        ? "border-[#2D3586] bg-gradient-to-r from-[#2D3586]/15 to-[#11B2AA]/10 text-[#182130]"
                        : "border-slate-200 bg-white text-slate-700 hover:border-[#2D3586]/40 hover:bg-[#2D3586]/5"
                    }`}
                  >
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#2D3586] to-[#0D4B56] text-white shadow-sm">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold">{frente.title}</p>
                      <p className="mt-1 text-sm text-slate-600">{frente.summary}</p>
                    </div>
                  </button>
                );
              })}
            </CardContent>
          </Card>

          <Card className="border-[#2D3586]/30 bg-[linear-gradient(135deg,rgba(45,53,134,0.16)_0%,rgba(255,255,255,0.96)_38%,rgba(17,178,170,0.16)_72%,rgba(255,222,7,0.14)_100%)] shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FFDE07] to-[#EC6910] text-[#182130] shadow-sm">
                  <IconoFrenteActual className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-xl text-[#182130]">{frenteActual.title}</CardTitle>
                  <p className="mt-1 text-sm text-slate-600">{frenteActual.summary}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#2D3586]">Acciones destacadas</p>
              <div className="grid gap-3 md:grid-cols-2">
                {frenteActual.acciones.map((accion) => (
                  <div key={accion} className="rounded-2xl border border-[#11B2AA]/20 bg-white/90 p-4 text-sm text-slate-700 shadow-sm">
                    {accion}
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl border border-[#EC6910]/40 bg-gradient-to-r from-[#EC6910]/15 to-[#FFDE07]/20 p-4 text-sm text-[#182130]">
                <span className="font-bold text-[#EC6910]">Impacto:</span> {frenteActual.impacto}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-16 rounded-3xl border border-[#182130]/10 bg-[linear-gradient(145deg,rgba(24,33,48,0.98)_0%,rgba(13,75,86,0.98)_45%,rgba(2,58,52,0.96)_100%)] p-8 text-white shadow-sm">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FFDE07] to-[#EC6910] text-[#182130]">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">Cierre</h3>
              <p className="mt-3 text-cyan-50">
                Los Gestores de Innovación Educativa son actores clave en la transformación del sistema educativo,
                conectando la escuela con la tecnología, la innovación y las necesidades del territorio.
              </p>
              <p className="mt-3 text-cyan-50">
                Su trabajo no solo impacta el aula; fortalece el ecosistema educativo en su conjunto y promueve una
                educación más pertinente, creativa y orientada al futuro.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                <p className="font-semibold text-[#FFDE07]">Transformación educativa</p>
                <p className="mt-1 text-sm text-cyan-50">Acompañan procesos que cambian la práctica pedagógica.</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                <p className="font-semibold text-[#11B2AA]">Tecnología con sentido</p>
                <p className="mt-1 text-sm text-cyan-50">Integran herramientas y metodologías según las necesidades reales.</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                <p className="font-semibold text-[#EC6910]">Trabajo en red</p>
                <p className="mt-1 text-sm text-cyan-50">Articulan comunidad, instituciones y aliados del ecosistema.</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                <p className="font-semibold text-[#2D3586]">Proyección territorial</p>
                <p className="mt-1 text-sm text-cyan-50">Impulsan una educación conectada con el futuro del municipio.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
