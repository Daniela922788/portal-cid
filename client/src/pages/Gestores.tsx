import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  GraduationCap,
  Handshake,
  MapPinned,
  Rocket,
  School,
  Sparkles,
  Waypoints,
} from "lucide-react";

const trabajoBloques = [
  {
    title: "Acompañamiento a instituciones educativas",
    description: "Apoyan la implementación de estrategias STEM+ y procesos de innovación en contextos reales.",
    icon: School,
  },
  {
    title: "Fortalecimiento de capacidades",
    description: "Orientan a docentes y estudiantes en metodologías, herramientas y pensamiento innovador.",
    icon: GraduationCap,
  },
  {
    title: "Gestión de proyectos",
    description: "Promueven, estructuran y hacen seguimiento a iniciativas de ciencia, tecnología e innovación.",
    icon: Rocket,
  },
  {
    title: "Articulación del ecosistema",
    description: "Conectan actores del sector público, privado, académico y comunitario.",
    icon: Waypoints,
  },
  {
    title: "Dinamización del territorio",
    description: "Llevan la innovación a aulas, bibliotecas, parques culturales y espacios comunitarios.",
    icon: MapPinned,
  },
];

const cursosCentroInnovacion = [
  "/Fotogestores.jpg",
  "/Formacion/Ecard%20Explorando%20la%20IA.jpeg",
  "/Formacion/Ecard%20Power%20Bi.jpeg",
  "/cursos/laboratorio-secreto.jpg",
  "/cursos/crea-naturaleza.jpg",
  "/cursos/montaje-fotografico.jpg",
];

const centrosInteresInstituciones = [
  "/InstituciónEducativaComercialdeEnvigado.jpg",
  "/InstituciónEducativaElSalado.jpg",
  "/InstituciónEducativaLaPaz.jpg",
  "/InstituciónEducativaNormalSuperiordeEnvigado.jpg",
  "/InstituciónEducativaDaríodeBedout.jpg",
  "/InstituciónEducativaManuelUribeÁngel.JPG",
];

const cursosTerritorio = [
  "/STEM/1.webp",
  "/STEM/2.webp",
  "/STEM/3.webp",
  "/STEM/4.webp",
  "/ciudadaprendizaje/1.webp",
  "/ciudadaprendizaje/2.webp",
];

export default function Gestores() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-cyan-50/40 py-8">
      <div className="container">
        <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Gestores de Innovación" }]} />

        <section className="relative mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 text-white shadow-2xl">
          <img
            src="/Fotogestores.jpg"
            alt="Equipo de gestores de innovación"
            className="h-[300px] w-full object-cover object-[50%_24%] opacity-35 md:h-[380px] md:object-[50%_20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/75 to-cyan-900/45" />
          <div className="absolute inset-0 p-6 md:p-10 lg:p-14">
            <Badge className="mb-4 bg-cyan-500 text-slate-900 hover:bg-cyan-400">
              <Sparkles className="mr-2 h-4 w-4" /> Ecosistema STEM+
            </Badge>
            <h1 className="max-w-3xl text-3xl font-black leading-tight md:text-5xl">Gestores de Innovación</h1>
            <p className="mt-4 max-w-2xl text-sm text-cyan-50 md:text-lg">
              Profesionales que impulsan procesos de transformación educativa, tecnológica y social en el territorio,
              conectando instituciones, comunidad y estrategias de innovación.
            </p>
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <Card className="border-slate-200 bg-white/95 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-900">¿Quiénes son?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700">
              <p>
                Son profesionales que impulsan procesos de transformación educativa, tecnológica y social en el
                territorio. Actúan como puentes entre las instituciones, la comunidad y las estrategias del
                ecosistema STEM+.
              </p>
              <p>
                Su labor no se limita a acompañar proyectos: dinamizan ideas, conectan actores y promueven el
                desarrollo de capacidades en estudiantes, docentes e instituciones.
              </p>
            </CardContent>
          </Card>

          <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-900">¿Por qué son importantes?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-slate-700">
              <p>Traducen las políticas y estrategias en acciones concretas.</p>
              <p>Aseguran continuidad en los procesos.</p>
              <p>Generan impacto directo en las comunidades educativas.</p>
              <p>Promueven una cultura de innovación sostenible.</p>
            </CardContent>
          </Card>
        </section>

        <section className="mt-10">
          <h2 className="mb-5 text-2xl font-bold text-slate-900 md:text-3xl">¿Qué hacen?</h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {trabajoBloques.map((bloque) => {
              const Icon = bloque.icon;
              return (
                <Card key={bloque.title} className="border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg leading-snug text-slate-900">{bloque.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-slate-600">{bloque.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-cyan-50 p-6 shadow-sm md:p-8">
          <div className="flex items-start gap-3">
            <Handshake className="mt-1 h-6 w-6 shrink-0 text-emerald-700" />
            <div>
              <h3 className="text-xl font-bold text-slate-900">Presencia en el territorio</h3>
              <p className="mt-2 text-slate-700">
                Los gestores de innovación tienen presencia en el territorio, priorizando inicialmente las
                instituciones educativas oficiales, para garantizar un acceso equitativo a los procesos de formación,
                innovación y apropiación del conocimiento en todo el municipio.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-14 space-y-14">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">1</div>
              <h3 className="text-2xl font-bold text-slate-900">Trabajo en el Centro de Innovación con los cursos que se dan</h3>
            </div>
            <p className="mb-6 max-w-4xl text-slate-600">
              En el Centro de Innovación, los gestores diseñan y acompañan experiencias formativas para distintos
              públicos, fortaleciendo habilidades STEM+, pensamiento creativo y apropiación tecnológica.
            </p>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-4">
              {cursosCentroInnovacion.map((src, idx) => (
                <div key={src} className={`overflow-hidden rounded-2xl border border-slate-200 bg-white ${idx === 0 ? "col-span-2 row-span-2" : ""}`}>
                  <img src={src} alt={`Curso en centro de innovación ${idx + 1}`} className="h-full w-full object-cover" loading="lazy" decoding="async" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">2</div>
              <h3 className="text-2xl font-bold text-slate-900">Centros de interés en las instituciones públicas de Envigado</h3>
            </div>
            <p className="mb-6 max-w-4xl text-slate-600">
              Los gestores acompañan procesos en instituciones educativas oficiales, articulando centros de interés
              con estrategias pedagógicas para llevar la innovación a la escuela y fortalecer el aprendizaje con
              sentido territorial.
            </p>
            <div className="grid gap-3 md:grid-cols-12 lg:gap-4">
              <div className="overflow-hidden rounded-2xl border border-slate-200 md:col-span-7">
                <img src={centrosInteresInstituciones[0]} alt="Instituciones educativas públicas" className="h-[260px] w-full object-cover" loading="lazy" decoding="async" />
              </div>
              <div className="overflow-hidden rounded-2xl border border-slate-200 md:col-span-5">
                <img src={centrosInteresInstituciones[1]} alt="Trabajo en instituciones" className="h-[260px] w-full object-cover" loading="lazy" decoding="async" />
              </div>
              {centrosInteresInstituciones.slice(2).map((src, idx) => (
                <div key={src} className="overflow-hidden rounded-2xl border border-slate-200 md:col-span-3">
                  <img src={src} alt={`Centro de interés ${idx + 1}`} className="h-[180px] w-full object-cover" loading="lazy" decoding="async" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-600 text-sm font-bold text-white">3</div>
              <h3 className="text-2xl font-bold text-slate-900">Los cursos que se dan en territorio</h3>
            </div>
            <p className="mb-6 max-w-4xl text-slate-600">
              La formación también llega a escenarios comunitarios del territorio para ampliar oportunidades,
              democratizar el acceso al conocimiento y consolidar una cultura de innovación sostenible.
            </p>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6 lg:gap-4">
              {cursosTerritorio.map((src, idx) => (
                <Card key={src} className="overflow-hidden border-slate-200 shadow-sm">
                  <img src={src} alt={`Curso territorial ${idx + 1}`} className="h-40 w-full object-cover" loading="lazy" decoding="async" />
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-700">
            <Building2 className="h-6 w-6" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">Innovación con impacto real</h3>
          <p className="mx-auto mt-3 max-w-3xl text-slate-600">
            Los gestores son la fuerza articuladora que convierte la visión STEM+ en experiencias concretas para
            estudiantes, docentes e instituciones de Envigado.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <Badge variant="secondary" className="px-3 py-1">Transformación educativa</Badge>
            <Badge variant="secondary" className="px-3 py-1">Ciencia y tecnología</Badge>
            <Badge variant="secondary" className="px-3 py-1">Trabajo en red</Badge>
            <Badge variant="secondary" className="px-3 py-1">Territorio STEM+</Badge>
          </div>
        </section>
      </div>
    </div>
  );
}
