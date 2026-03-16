import Breadcrumbs from "@/components/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpenCheck, ExternalLink, Lightbulb, Sparkles, TimerReset } from "lucide-react";

const TOOLBOX_URL = "https://www.mineducacion.gov.co/portal/micrositios-institucionales/Centros-de-Interes-para-la-Formacion-Integral/422449:Caja-de-Herramientas";

const beneficios = [
  {
    icon: TimerReset,
    title: "Acceso rápido",
    description: "Encuentra en un solo lugar guías, orientaciones y materiales listos para usar en clase.",
  },
  {
    icon: BookOpenCheck,
    title: "Contenido curado",
    description: "Recursos pedagógicos seleccionados para fortalecer los Centros de Interés en CTeI.",
  },
  {
    icon: Lightbulb,
    title: "Inspiración docente",
    description: "Explora experiencias y referentes que ayudan a llevar el enfoque STEM+ al aula.",
  },
];

const recursosDestacados = [
  "Guías pedagógicas y de apropiación STEM+",
  "Materiales para convivencia, bienestar y gestión emocional",
  "Referentes para planeación de experiencias de aula",
  "Contenidos listos para consulta o descarga",
];

export default function KitHerramientas() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff7f4_0%,#ffffff_24%,#fff8ef_100%)] py-8 sm:py-10">
      <div className="container space-y-8 sm:space-y-10">
        <Breadcrumbs items={[{ label: "Kit de Herramientas" }]} />

        <section className="relative overflow-hidden rounded-[32px] border border-orange-100 bg-[radial-gradient(circle_at_top_left,_rgba(255,96,52,0.24),_transparent_30%),linear-gradient(135deg,#ff4f87_0%,#7a3df0_42%,#2f2c98_100%)] px-6 py-8 text-white shadow-[0_24px_80px_rgba(122,61,240,0.24)] sm:px-8 sm:py-10 lg:px-12 lg:py-12">
          <div className="absolute -right-10 top-6 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-0 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full bg-orange-300/20 blur-2xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-5">
              <Badge className="rounded-full border border-white/20 bg-white/12 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-white hover:bg-white/12">
                Recursos para docentes
              </Badge>

              <div className="space-y-4">
                <h1 className="max-w-2xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                  Caja de herramientas para potenciar experiencias STEM+
                </h1>
                <p className="max-w-2xl text-base leading-7 text-white/84 sm:text-lg">
                  Esta sección funciona como puerta de entrada a la caja de herramientas pedagógicas: un espacio con contenidos clave,
                  orientaciones y recursos educativos para fortalecer los Centros de Interés y enriquecer la práctica docente.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="h-12 rounded-full bg-white px-6 text-sm font-semibold text-[#2f2c98] hover:bg-white/90">
                  <a href={TOOLBOX_URL} target="_blank" rel="noopener noreferrer">
                    Ir a la caja de herramientas
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-white/30 bg-white/10 px-6 text-sm font-semibold text-white hover:bg-white/16 hover:text-white">
                  <a href="#recursos-destacados">
                    Ver qué encontrarás
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>

            <Card className="border-white/12 bg-white/10 text-white shadow-none backdrop-blur-sm">
              <CardContent className="p-5 sm:p-6">
                <div className="overflow-hidden rounded-[24px] border border-white/12 bg-[linear-gradient(160deg,rgba(91,29,155,0.92)_0%,rgba(69,33,136,0.96)_55%,rgba(45,27,102,1)_100%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] sm:p-6">
                  <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
                    <span>Centro de innovación</span>
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div className="mt-10 max-w-xs space-y-3">
                    <p className="text-3xl font-black leading-tight sm:text-4xl">
                      Caja de herramientas pedagógicas
                    </p>
                    <p className="text-sm leading-6 text-white/72">
                      Un acceso visual y directo a materiales pedagógicos, referentes y recursos para usar en tus procesos formativos.
                    </p>
                  </div>
                  <div className="mt-8 inline-flex rounded-full border border-white/14 bg-white/12 px-4 py-2 text-xs font-semibold text-white/86">
                    Consulta en línea o abre la herramienta completa
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          {beneficios.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="border-orange-100 bg-white/90 shadow-[0_12px_32px_rgba(15,23,42,0.05)]">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#ffedd5_0%,#ffe4e6_100%)] text-[#e6513e]">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section id="recursos-destacados" className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <Card className="overflow-hidden border-0 bg-[linear-gradient(145deg,#1f285f_0%,#322978_52%,#5b1d9b_100%)] text-white shadow-[0_20px_64px_rgba(49,46,129,0.24)]">
            <CardContent className="p-6 sm:p-8">
              <Badge className="rounded-full bg-white/12 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-white hover:bg-white/12">
                Vista previa
              </Badge>
              <h2 className="mt-5 text-3xl font-black leading-tight sm:text-4xl">
                Más que un enlace, una puerta de entrada clara para tus docentes
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/78 sm:text-base">
                En lugar de mostrar un cuadro simple con texto, esta página presenta el recurso con contexto, valor y un llamado a la acción mucho más fuerte.
                Así el usuario entiende por qué entrar y qué va a encontrar antes de salir del portal.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {recursosDestacados.map((recurso) => (
                  <div key={recurso} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm leading-6 text-white/88">
                    {recurso}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-100 bg-white shadow-[0_18px_48px_rgba(15,23,42,0.07)]">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="secondary" className="rounded-full bg-orange-100 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-700 hover:bg-orange-100">
                  Recomendado
                </Badge>
                <span className="text-sm text-slate-500">Actualizado y pensado para consulta rápida</span>
              </div>

              <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-900">
                Abre la herramienta completa
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Desde aquí puedes enviar al usuario a la página externa real de la caja de herramientas con un acceso visible, elegante y fácil de encontrar.
              </p>

              <div className="mt-6 rounded-[28px] border border-dashed border-orange-200 bg-[linear-gradient(180deg,#fff7ed_0%,#ffffff_100%)] p-5">
                <div className="rounded-[24px] border border-orange-100 bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-orange-500">Caja de herramientas</p>
                      <p className="mt-2 text-2xl font-black text-slate-900">Recursos pedagógicos para docentes</p>
                    </div>
                    <div className="rounded-2xl bg-orange-50 p-3 text-orange-600">
                      <BookOpenCheck className="h-6 w-6" />
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    Úsala como acceso principal a contenidos, guías y materiales que complementan el trabajo en aula y los procesos de innovación educativa.
                  </p>
                  <Button asChild className="mt-6 h-11 rounded-full px-5 text-sm font-semibold">
                    <a href={TOOLBOX_URL} target="_blank" rel="noopener noreferrer">
                      Abrir recurso externo
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>

              <p className="mt-5 text-xs leading-6 text-slate-500">
                Solo te queda reemplazar la constante <strong>TOOLBOX_URL</strong> por el enlace final de la caja de herramientas.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}