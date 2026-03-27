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
    <div className="min-h-screen bg-[linear-gradient(180deg,rgba(17,178,170,0.08)_0%,#ffffff_26%,rgba(45,53,134,0.06)_100%)] py-8 sm:py-10">
      <div className="container space-y-8 sm:space-y-10">
        <Breadcrumbs items={[{ label: "Kit de Herramientas" }]} />

        <section className="relative overflow-hidden rounded-[32px] border border-[#0D4B56]/25 bg-[radial-gradient(circle_at_top_left,_rgba(236,105,16,0.18),_transparent_28%),linear-gradient(135deg,#182130_0%,#2D3586_42%,#11B2AA_100%)] px-6 py-8 text-white shadow-[0_24px_80px_rgba(24,33,48,0.24)] sm:px-8 sm:py-10 lg:px-12 lg:py-12">
          <div className="absolute -right-10 top-6 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-0 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full bg-[#FFDE07]/18 blur-2xl" />
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
                <Button asChild size="lg" className="h-12 rounded-full bg-white px-6 text-sm font-semibold text-[#2D3586] hover:bg-white/90">
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
                <div className="overflow-hidden rounded-[24px] border border-white/12 bg-[linear-gradient(160deg,rgba(24,33,48,0.94)_0%,rgba(45,53,134,0.96)_58%,rgba(13,75,86,1)_100%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] sm:p-6">
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
            <Card key={title} className="border-[#11B2AA]/15 bg-white/90 shadow-[0_12px_32px_rgba(24,33,48,0.05)]">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(255,222,7,0.26)_0%,rgba(17,178,170,0.16)_100%)] text-[#EC6910]">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold text-[#182130]">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-[#0D4B56]">{description}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section id="recursos-destacados" className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <Card className="overflow-hidden border-0 bg-[linear-gradient(145deg,#182130_0%,#2D3586_54%,#0D4B56_100%)] text-white shadow-[0_20px_64px_rgba(24,33,48,0.24)]">
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

          <Card className="border-[#EC6910]/20 bg-white shadow-[0_18px_48px_rgba(24,33,48,0.07)]">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="secondary" className="rounded-full bg-[#FFDE07]/20 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#EC6910] hover:bg-[#FFDE07]/20">
                  Recomendado
                </Badge>
                <span className="text-sm text-[#0D4B56]">Actualizado y pensado para consulta rápida</span>
              </div>

              <h2 className="mt-5 text-3xl font-black tracking-tight text-[#182130]">
                Abre la herramienta completa
              </h2>
              <p className="mt-4 text-base leading-7 text-[#0D4B56]">
                Desde aquí puedes enviar al usuario a la página externa real de la caja de herramientas con un acceso visible, elegante y fácil de encontrar.
              </p>

              <div className="mt-6 rounded-[28px] border border-dashed border-[#11B2AA]/30 bg-[linear-gradient(180deg,rgba(17,178,170,0.08)_0%,#ffffff_100%)] p-5">
                <div className="rounded-[24px] border border-[#11B2AA]/15 bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#EC6910]">Caja de herramientas</p>
                      <p className="mt-2 text-2xl font-black text-[#182130]">Recursos pedagógicos para docentes</p>
                    </div>
                    <div className="rounded-2xl bg-[#11B2AA]/12 p-3 text-[#0D4B56]">
                      <BookOpenCheck className="h-6 w-6" />
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-[#0D4B56]">
                    Úsala como acceso principal a contenidos, guías y materiales que complementan el trabajo en aula y los procesos de innovación educativa.
                  </p>
                  <Button asChild className="mt-6 h-11 rounded-full bg-[#182130] px-5 text-sm font-semibold text-white hover:bg-[#0D4B56]">
                    <a href={TOOLBOX_URL} target="_blank" rel="noopener noreferrer">
                      Abrir recurso externo
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>

              <p className="mt-5 text-xs leading-6 text-[#0D4B56]">
                Solo te queda reemplazar la constante <strong>TOOLBOX_URL</strong> por el enlace final de la caja de herramientas.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}