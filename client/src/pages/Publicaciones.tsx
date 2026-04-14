import { useMemo, useRef, useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BookOpen, CalendarDays, Download, Eye, FileText } from "lucide-react";

const publicacionDestacada = {
  titulo: "Narrativas Ecosistémicas",
  subtitulo: "Investigación Pedagógica y Educación Rural",
  tipo: "Publicacion digital",
  ano: "2025",
  descripcion:
    "Proyectos liderados por las Escuelas Normales Superiores que vinculan sus apuestas de formación docente y acompañamiento con sus realidades territoriales",
  rutaDocumento: "/Publicaciones/Narrativas_ecosistemas_2026_01_27.pdf",
};

export default function Publicaciones() {
  const [errorVisor, setErrorVisor] = useState(false);
  const visorRef = useRef<HTMLDivElement>(null);

  const visorSrc = useMemo(() => `${publicacionDestacada.rutaDocumento}#view=FitH`, []);

	const irAlVisor = () => {
		visorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
	};

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_8%_20%,rgba(17,178,170,0.16),transparent_40%),radial-gradient(circle_at_92%_10%,rgba(236,105,16,0.14),transparent_38%),#ffffff]">
      <section className="relative w-full overflow-hidden bg-[linear-gradient(122deg,#182130_0%,#0D4B56_52%,#11B2AA_100%)] text-white">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#FFDE07]/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-[#EC6910]/20 blur-3xl" />

        <div className="relative z-10 container flex min-h-[420px] flex-col justify-end pb-10 pt-24 md:pt-0">
          <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/35 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]">
            <FileText className="h-4 w-4 text-[#FFDE07]" />
            Biblioteca CID
          </div>

          <h1 className="text-5xl font-extrabold leading-tight lg:text-6xl">Publicaciones</h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-white/85 lg:text-lg">
            Aqui puedes explorar nuestras publicaciones destacadas. Ingresas, lees en linea y tambien puedes descargar el documento.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/12 px-4 py-2 font-medium backdrop-blur-sm">
              <BookOpen className="h-4 w-4" />
              1 publicacion
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/12 px-4 py-2 font-medium backdrop-blur-sm">
              Lectura en linea
            </span>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-10">
        <Breadcrumbs items={[{ label: "Publicaciones" }]} />

        <section className="mt-6 rounded-3xl border border-[#0D4B56]/15 bg-white/95 p-5 shadow-[0_18px_45px_rgba(24,33,48,0.10)] md:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <article className="rounded-3xl border border-[#0D4B56]/15 bg-[linear-gradient(165deg,#ffffff_0%,#f5fbfb_52%,#f2f7ff_100%)] p-5 md:p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0D4B56]/10 text-[#0D4B56]">
                <BookOpen className="h-6 w-6" />
              </div>

              <div>
                <h2 className="text-2xl font-bold leading-tight text-[#182130] md:text-3xl">{publicacionDestacada.titulo}</h2>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#0D4B56] md:text-base">
                  {publicacionDestacada.subtitulo}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.08em]">
                <span className="rounded-full bg-[#182130] px-3 py-1 text-white">{publicacionDestacada.tipo}</span>
                <span className="inline-flex items-center gap-1 rounded-full border border-[#0D4B56]/20 px-3 py-1 text-[#0D4B56]">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {publicacionDestacada.ano}
                </span>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-slate-700 md:text-base">{publicacionDestacada.descripcion}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={irAlVisor}
                  className="inline-flex items-center gap-2 rounded-full bg-[#0D4B56] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0A3A42]"
                >
                  <Eye className="h-4 w-4" />
                  Leer ahora
                </button>
                <a
                  href={publicacionDestacada.rutaDocumento}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#0D4B56]/25 bg-white px-5 py-2.5 text-sm font-semibold text-[#0D4B56] transition-colors hover:bg-[#f1f8f8]"
                >
                  <Download className="h-4 w-4" />
                  Descargar PDF
                </a>
              </div>
            </article>

            <div ref={visorRef} id="visor-publicacion" className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_45px_rgba(24,33,48,0.14)]">
              <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-sm font-semibold text-[#182130]">Visor de documento</p>
              </div>

              {errorVisor ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center px-6 text-center">
                  <p className="text-base font-semibold text-[#182130]">No se encontro el documento en la ruta configurada.</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Verifica que el archivo exista en <span className="font-semibold">client/public/Publicaciones/Narrativas_ecosistemas_2026_01_27.pdf</span>
                  </p>
                </div>
              ) : (
                <iframe
                  src={visorSrc}
                  title={publicacionDestacada.titulo}
                  className="h-[420px] w-full md:h-[620px]"
                  onError={() => setErrorVisor(true)}
                />
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}