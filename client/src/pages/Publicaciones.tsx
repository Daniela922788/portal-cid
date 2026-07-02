import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BookOpen, CalendarDays, Download, Eye, Search, X } from "lucide-react";

type Publicacion = {
  id: string;
  titulo: string;
  subtitulo: string;
  tipo: string;
  ano: string;
  descripcion: string;
  rutaDocumento: string;
};

// Para agregar una nueva publicación, copia un bloque y cambia sus datos.
const publicaciones: Publicacion[] = [
  {
    id: "narrativas-ecosistemicas",
    titulo: "Narrativas Ecosistémicas",
    subtitulo: "Investigación Pedagógica y Educación Rural",
    tipo: "Publicacion digital",
    ano: "2025",
    descripcion:
      "Proyectos liderados por las Escuelas Normales Superiores que vinculan sus apuestas de formación docente y acompañamiento con sus realidades territoriales",
    rutaDocumento: "/Publicaciones/Narrativas_ecosistemas_2026_01_27.pdf",
  },
];

export default function Publicaciones() {
  const [errorVisor, setErrorVisor] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("");
  const [anoFiltro, setAnoFiltro] = useState("");
  const [publicacionActiva, setPublicacionActiva] = useState<Publicacion | null>(null);

  // ===== Filtros (buscador + tipo + año) =====
  const normalizarTexto = (t: string) =>
    t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const tiposDisponibles = Array.from(new Set(publicaciones.map((p) => p.tipo))).sort((a, b) =>
    a.localeCompare(b)
  );
  const anosDisponibles = Array.from(new Set(publicaciones.map((p) => p.ano)))
    .filter(Boolean)
    .sort((a, b) => Number(b) - Number(a));

  const publicacionesVisibles = publicaciones.filter((pub) => {
    const texto = normalizarTexto(`${pub.titulo} ${pub.subtitulo} ${pub.descripcion} ${pub.tipo}`);
    const coincideBusqueda =
      searchTerm.trim() === "" || texto.includes(normalizarTexto(searchTerm.trim()));
    const coincideTipo = tipoFiltro === "" || pub.tipo === tipoFiltro;
    const coincideAno = anoFiltro === "" || pub.ano === anoFiltro;
    return coincideBusqueda && coincideTipo && coincideAno;
  });

  const hayFiltrosActivos = searchTerm.trim() !== "" || tipoFiltro !== "" || anoFiltro !== "";
  const limpiarFiltros = () => {
    setSearchTerm("");
    setTipoFiltro("");
    setAnoFiltro("");
  };

  const abrirPublicacion = (pub: Publicacion) => {
    setErrorVisor(false);
    setPublicacionActiva(pub);
  };
  const cerrarVisor = () => setPublicacionActiva(null);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_8%_20%,rgba(17,178,170,0.16),transparent_40%),radial-gradient(circle_at_92%_10%,rgba(236,105,16,0.14),transparent_38%),#ffffff]">
      <section className="relative w-full overflow-hidden bg-[linear-gradient(122deg,#182130_0%,#0D4B56_52%,#11B2AA_100%)] text-white">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#FFDE07]/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-[#EC6910]/20 blur-3xl" />

        <div className="relative z-10 container flex min-h-[420px] flex-col justify-end pb-10 pt-24 md:pt-0">
          <h1 className="text-5xl font-extrabold leading-tight lg:text-6xl">Publicaciones</h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-white/85 lg:text-lg">
            Aqui puedes explorar nuestras publicaciones destacadas. Ingresas, lees en linea y tambien puedes descargar el documento.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/12 px-4 py-2 font-medium backdrop-blur-sm">
              <BookOpen className="h-4 w-4" />
              {publicaciones.length} {publicaciones.length === 1 ? "publicacion" : "publicaciones"}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/12 px-4 py-2 font-medium backdrop-blur-sm">
              Lectura en linea
            </span>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-10">
        <Breadcrumbs items={[{ label: "Publicaciones" }]} />

        {/* ===== FILTROS (buscador + tipo + año) ===== */}
        <div className="mt-6 mb-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
            <div className="relative w-full sm:w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0D4B56]/60" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar publicaciones..."
                className="w-full rounded-lg border border-[#0D4B56]/25 bg-white py-2 pl-9 pr-3 text-sm text-[#182130] outline-none transition-colors focus:border-[#0D4B56] focus:ring-1 focus:ring-[#0D4B56]/30"
              />
            </div>

            <select
              value={tipoFiltro}
              onChange={(e) => setTipoFiltro(e.target.value)}
              className="w-full rounded-lg border border-[#0D4B56]/25 bg-white py-2 px-3 text-sm text-[#182130] outline-none transition-colors focus:border-[#0D4B56] focus:ring-1 focus:ring-[#0D4B56]/30 sm:w-auto"
            >
              <option value="">Todos los tipos</option>
              {tiposDisponibles.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <select
              value={anoFiltro}
              onChange={(e) => setAnoFiltro(e.target.value)}
              className="w-full rounded-lg border border-[#0D4B56]/25 bg-white py-2 px-3 text-sm text-[#182130] outline-none transition-colors focus:border-[#0D4B56] focus:ring-1 focus:ring-[#0D4B56]/30 sm:w-auto"
            >
              <option value="">Todos los años</option>
              {anosDisponibles.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>

            {hayFiltrosActivos && (
              <button
                onClick={limpiarFiltros}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-[#EC6910] transition-colors hover:bg-[#EC6910]/10"
              >
                <X className="h-4 w-4" />
                Limpiar
              </button>
            )}
          </div>

          {hayFiltrosActivos && (
            <p className="mt-2 text-xs text-[#0D4B56]/70">
              {publicacionesVisibles.length}{" "}
              {publicacionesVisibles.length === 1 ? "resultado" : "resultados"}
            </p>
          )}
        </div>

        {/* ===== GRID DE PUBLICACIONES (2 columnas) ===== */}
        {publicacionesVisibles.length === 0 ? (
          <div className="py-12 text-center">
            <BookOpen className="mx-auto mb-4 h-12 w-12 text-[#0D4B56]/40" />
            <p className="text-[#0D4B56]">No se encontraron publicaciones con esos filtros.</p>
            {hayFiltrosActivos && (
              <button
                onClick={limpiarFiltros}
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-[#0D4B56] bg-[#FFDE07]/20 px-5 py-2 text-sm font-semibold text-[#182130] transition-colors hover:bg-[#FFDE07]/35"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            {publicacionesVisibles.map((pub) => (
              <article
                key={pub.id}
                className="flex flex-col rounded-3xl border border-[#0D4B56]/15 bg-[linear-gradient(165deg,#ffffff_0%,#f5fbfb_52%,#f2f7ff_100%)] p-5 transition-shadow hover:shadow-[0_14px_35px_rgba(24,33,48,0.10)]"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0D4B56]/10 text-[#0D4B56]">
                  <BookOpen className="h-5 w-5" />
                </div>

                <h2 className="text-xl font-bold leading-tight text-[#182130]">{pub.titulo}</h2>
                <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#0D4B56]">
                  {pub.subtitulo}
                </p>

                <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.08em]">
                  <span className="rounded-full bg-[#182130] px-2.5 py-1 text-white">{pub.tipo}</span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-[#0D4B56]/20 px-2.5 py-1 text-[#0D4B56]">
                    <CalendarDays className="h-3 w-3" />
                    {pub.ano}
                  </span>
                </div>

                <p
                  className="mt-3 text-sm leading-relaxed text-slate-700"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {pub.descripcion}
                </p>

                <div className="mt-auto flex flex-wrap gap-2.5 pt-5">
                  <button
                    type="button"
                    onClick={() => abrirPublicacion(pub)}
                    className="inline-flex items-center gap-2 rounded-full bg-[#0D4B56] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0A3A42]"
                  >
                    <Eye className="h-4 w-4" />
                    Leer ahora
                  </button>
                  <a
                    href={pub.rutaDocumento}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[#0D4B56]/25 bg-white px-4 py-2 text-sm font-semibold text-[#0D4B56] transition-colors hover:bg-[#f1f8f8]"
                  >
                    <Download className="h-4 w-4" />
                    Descargar
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* ===== VENTANA EMERGENTE / VISOR DEL DOCUMENTO ===== */}
      {publicacionActiva && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4"
          onClick={cerrarVisor}
        >
          <div
            className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-[#182130]">{publicacionActiva.titulo}</p>
                <p className="truncate text-xs text-slate-500">{publicacionActiva.subtitulo}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={publicacionActiva.rutaDocumento}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden items-center gap-2 rounded-full border border-[#0D4B56]/25 bg-white px-4 py-1.5 text-sm font-semibold text-[#0D4B56] transition-colors hover:bg-[#f1f8f8] sm:inline-flex"
                >
                  <Download className="h-4 w-4" />
                  Descargar
                </a>
                <button
                  onClick={cerrarVisor}
                  className="rounded-full p-1.5 text-slate-600 transition-colors hover:bg-slate-100"
                  aria-label="Cerrar visor"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 bg-slate-50">
              {errorVisor ? (
                <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
                  <p className="text-base font-semibold text-[#182130]">No se encontro el documento en la ruta configurada.</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Verifica que el archivo exista en{" "}
                    <span className="font-semibold">client/public{publicacionActiva.rutaDocumento}</span>
                  </p>
                  <a
                    href={publicacionActiva.rutaDocumento}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#0D4B56] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0A3A42]"
                  >
                    <Download className="h-4 w-4" />
                    Descargar PDF
                  </a>
                </div>
              ) : (
                <iframe
                  key={publicacionActiva.id}
                  src={`${publicacionActiva.rutaDocumento}#view=FitH`}
                  title={publicacionActiva.titulo}
                  className="h-[80vh] w-full"
                  onError={() => setErrorVisor(true)}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}