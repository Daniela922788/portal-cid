import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, GraduationCap, Video, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";

// ─── Actualiza estas rutas cuando tengas las imágenes del aula ───────────────
const WHATSAPP_ADMIN = "https://wa.me/573012577662";

const aulaNaranjaImages = [
  "/Centro%20Audiovisual/2_FOTOS_QUE_ES_EL_AULA/315A0526.webp",
  "/Centro%20Audiovisual/2_FOTOS_QUE_ES_EL_AULA/315A0672.webp",
  "/Centro%20Audiovisual/2_FOTOS_QUE_ES_EL_AULA/315A0682.webp",
  "/Centro%20Audiovisual/2_FOTOS_QUE_ES_EL_AULA/315A0694.webp",
];

const infraestructuraImages = [
  "/Centro%20Audiovisual/3_FOTOS_INFRAESTRUCTURA/2025-08-25-RECORRIDO%20PEDAGOGICO%20MARIE%20POUSSEPAN_1.webp",
  "/Centro%20Audiovisual/3_FOTOS_INFRAESTRUCTURA/2025-08-25-RECORRIDO%20PEDAGOGICO%20MARIE%20POUSSEPAN_5.webp",
  "/Centro%20Audiovisual/3_FOTOS_INFRAESTRUCTURA/315A1034.webp",
  "/Centro%20Audiovisual/3_FOTOS_INFRAESTRUCTURA/315A1047.webp",
  "/Centro%20Audiovisual/3_FOTOS_INFRAESTRUCTURA/315A1343.webp",
  "/Centro%20Audiovisual/3_FOTOS_INFRAESTRUCTURA/315A1346.webp",
  "/Centro%20Audiovisual/3_FOTOS_INFRAESTRUCTURA/315A4231.webp",
  "/Centro%20Audiovisual/3_FOTOS_INFRAESTRUCTURA/315A4264.webp",
  "/Centro%20Audiovisual/3_FOTOS_INFRAESTRUCTURA/315A4274.webp",
  "/Centro%20Audiovisual/3_FOTOS_INFRAESTRUCTURA/315A9734.webp",
];

const paraQuienesGalleryImages = [
  "/Centro%20Audiovisual/5_FOTOS_PARA%20QUIENES/315A1147.webp",
  "/Centro%20Audiovisual/5_FOTOS_PARA%20QUIENES/315A1185.webp",
  "/Centro%20Audiovisual/5_FOTOS_PARA%20QUIENES/315A1322.webp",
];
// ─────────────────────────────────────────────────────────────────────────────

const servicios = [
  {
    icon: GraduationCap,
    titulo: "Formación Académica",
    descripcion:
      "Programas estructurados de aprendizaje en producción y comunicación audiovisual para distintos públicos.",
  },
  {
    icon: BookOpen,
    titulo: "Prácticas Guiadas",
    descripcion:
      "Sesiones prácticas acompañadas por profesionales donde se desarrollan habilidades técnicas y creativas.",
  },
  {
    icon: Video,
    titulo: "Producción audiovisual",
    descripcion:
      "Uso del estudio y la infraestructura para materializar proyectos de comunidades, instituciones y emprendedores.",
  },
];

const perfiles = [
  {
    titulo: "Instituciones Educativas",
    descripcion: "Integra la producción audiovisual como herramienta pedagógica en el aula.",
    color: "#2D3586",
  },
  {
    titulo: "La Comunidad",
    descripcion: "Accede a un espacio profesional para aprender, crear y comunicar.",
    color: "#023A34",
  },
  {
    titulo: "Emprendedores",
    descripcion: "Desarrolla contenido de calidad para impulsar tu proyecto o idea.",
    color: "#EC6910",
  },
  {
    titulo: "Sector Público",
    descripcion: "Produce piezas comunicativas con infraestructura profesional.",
    color: "#0D4B56",
  },
];

function AutoCarousel({
  images,
  altPrefix,
  interval = 2000,
  imageClassName,
  containerClassName,
}: {
  images: string[];
  altPrefix: string;
  interval?: number;
  imageClassName?: string;
  containerClassName?: string;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [images.length, interval]);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <div className={`relative overflow-hidden ${containerClassName ?? "rounded-2xl"}`}>
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, i) => (
          <div key={src} className="min-w-full shrink-0">
            <img
              src={src}
              alt={`${altPrefix} ${i + 1}`}
              className={`w-full ${imageClassName ?? "h-72 object-cover"}`}
              loading="eager"
              decoding="async"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
        aria-label="Anterior"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
        aria-label="Siguiente"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            aria-label={`Ir a imagen ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === current ? "w-5 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Centro() {
  const infraRef = useRef<HTMLElement>(null);
  const heroVideoRef = useRef<HTMLIFrameElement>(null);

  const forceHeroVideoPlayback = () => {
    const iframe = heroVideoRef.current;
    if (!iframe?.contentWindow) return;

    const command = (func: string, args: unknown[] = []) =>
      iframe.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func, args }),
        "*"
      );

    command("mute");
    command("playVideo");
    command("setLoop", [true]);
  };

  useEffect(() => {
    const triggerPlayback = () => forceHeroVideoPlayback();

    // Reintentos escalonados para mejorar la fiabilidad en móvil
    const timers = [300, 800, 2000, 4000].map((delay) =>
      window.setTimeout(triggerPlayback, delay)
    );

    // Solo una vez por tipo de evento para no acumular llamadas
    document.addEventListener("touchstart", triggerPlayback, { once: true, passive: true });
    document.addEventListener("click", triggerPlayback, { once: true });

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      document.removeEventListener("touchstart", triggerPlayback);
      document.removeEventListener("click", triggerPlayback);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#182130]">

      {/* ─── 1. HERO ───────────────────────────────────────────────────── */}
      {/*
        Usamos un único iframe para móvil y desktop.
        - youtube-nocookie.com: menos restricciones de privacidad/autoplay
        - controls=1: el usuario puede dar play manualmente si el autoplay falla en móvil
        - playsinline=1: evita que iOS abra el video en pantalla completa
        - La imagen de fondo actúa como fallback mientras carga el video
      */}
      <section
        className="relative w-full overflow-hidden"
        style={{ minHeight: "100svh" }}
      >
        {/* Imagen de fallback — visible debajo del iframe */}
        <img
          src="/Centro%20Audiovisual/2_FOTOS_QUE_ES_EL_AULA/315A0526.webp"
          alt="Banner Centro Audiovisual"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />

        {/* Contenedor del iframe */}
        <div className="absolute inset-0">
          <iframe
            ref={heroVideoRef}
            /*
              Parámetros importantes:
              - autoplay=1 + mute=1: necesarios para autoplay sin interacción
              - controls=1: muestra controles en móvil para que el usuario pueda dar play si falla
              - loop=1 + playlist=ID: necesario para loopear en la API de YT
              - playsinline=1: evita fullscreen automático en iOS
              - enablejsapi=1: permite enviar comandos postMessage
              - origin=...: requerido por la API de YT cuando se usa enablejsapi
            */
            src="https://www.youtube-nocookie.com/embed/zfpCuxxymuA?autoplay=1&mute=1&controls=1&loop=1&playlist=zfpCuxxymuA&modestbranding=1&rel=0&playsinline=1&enablejsapi=1&origin=https://portal-cid.vercel.app"
            title="Video de fondo Centro Audiovisual"
            /*
              El truco del aspect-ratio 16:9 centrado:
              - Se posiciona en el centro
              - Tiene ancho mínimo de 177.78vh y alto mínimo de 56.25vw
              - Así cubre toda la pantalla sin importar el tamaño
            */
            className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-full min-w-[177.78vh] -translate-x-1/2 -translate-y-1/2"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            loading="eager"
            onLoad={forceHeroVideoPlayback}
          />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[#182130]/45" />

        {/* Orbes decorativos */}
        <div className="hidden md:block absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-[#11B2AA]/20 blur-3xl" />
        <div className="hidden md:block absolute right-0 bottom-1/4 h-96 w-96 rounded-full bg-[#2D3586]/25 blur-3xl" />
        <div className="hidden md:block absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-full bg-[#FFDE07]/15 blur-3xl" />

        <div className="absolute left-1/2 top-[50%] z-10 -translate-x-1/2 -translate-y-1/2 text-center md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:text-center">
          <h1 className="text-lg font-black leading-tight text-white sm:text-5xl lg:text-7xl xl:text-8xl lg:whitespace-nowrap">
            Aula de Experimentación Audiovisual
          </h1>
        </div>

        {/* Flecha scroll-down */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
          <ChevronLeft className="h-6 w-6 rotate-[-90deg]" />
        </div>
      </section>

      {/* ─── 2. ¿QUÉ ES EL AULA? ───────────────────────────────────────── */}
      <section className="py-20">
        <div className="container mx-auto max-w-[96rem] px-6">
          <div className="grid gap-12 lg:grid-cols-[2.1fr_0.7fr] lg:items-center">
            <AutoCarousel
              images={aulaNaranjaImages}
              altPrefix="Aula Naranja"
              interval={6000}
              containerClassName="rounded-[2rem]"
              imageClassName="h-[27rem] sm:h-[32rem] object-contain"
            />

            <div className="space-y-6">
              <h2 className="text-3xl font-black leading-snug text-[#023A34] sm:text-4xl lg:whitespace-nowrap">
                Aula de Experimentación Audiovisual
              </h2>
              <h2 className="text-xl font-black leading-snug text-[#11B2AA] sm:text-2xl">
                Un laboratorio de creación con enfoque colaborativo
              </h2>
              <p className="text-base leading-loose text-slate-600 sm:text-lg">
                El Aula de Experimentación Audiovisual es un espacio pedagógico, didáctico y dinámico del Centro de Ciencia de la Secretaría de Educación de Envigado. Nuestro objetivo es fortalecer la creatividad, la innovación educativa y la capacidad de producción de contenidos de la comunidad. Democratizamos el acceso a la tecnología, brindando herramientas profesionales y el acompañamiento técnico necesario para que las personas den vida a sus ideas. No solo somos un lugar físico; somos un entorno de aprendizaje colaborativo diseñado para transformar la realidad local a través de la apropiación social del conocimiento.
              </p>
              <div className="h-1 w-16 rounded-full bg-[#EC6910]" />
            </div>
          </div>

          <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={WHATSAPP_ADMIN}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#FFDE07] px-8 py-2.5 text-base font-bold text-[#182130] shadow-lg transition-transform hover:scale-105 hover:bg-[#FFDE07]/90"
            >
              <MessageCircle className="h-5 w-5" />
              Reserva un turno
            </a>
          </div>
        </div>
      </section>

      {/* ─── 3. LA INFRAESTRUCTURA ─────────────────────────────────────── */}
      <section
        ref={infraRef}
        className="bg-gradient-to-br from-[#182130] to-[#0D4B56] py-20 text-white"
      >
        <div className="container mx-auto max-w-[96rem] px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-black sm:text-4xl">Espacios diseñados para crear</h2>
            <p className="mt-3 text-white/70">
              Tres ambientes profesionales que integran tecnología, creatividad y pedagogía.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[2.1fr_0.7fr] lg:items-center">
            <AutoCarousel
              images={infraestructuraImages}
              altPrefix="Infraestructura"
              interval={8000}
              containerClassName="rounded-[2rem]"
              imageClassName="h-[27rem] sm:h-[32rem] object-cover"
            />

            <div className="flex flex-col justify-center gap-4">
              {[
                {
                  nombre: "Aula Naranja",
                  desc: "Área colaborativa de formación, ideal para talleres, capacitaciones y dinámicas en grupo.",
                  color: "#EC6910",
                },
                {
                  nombre: "Sala de Control (Master)",
                  desc: "Centro de operaciones técnico donde se gestiona el audio, video y transmisiones en vivo.",
                  color: "#11B2AA",
                },
                {
                  nombre: "Estudio de Televisión",
                  desc: "Estudio profesional con iluminación, cámara y fondo para grabaciones de alta calidad.",
                  color: "#FFDE07",
                },
              ].map((espacio) => (
                <div
                  key={espacio.nombre}
                  className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                >
                  <div
                    className="mt-1 h-3 w-3 shrink-0 rounded-full"
                    style={{ backgroundColor: espacio.color }}
                  />
                  <div>
                    <p className="text-lg font-bold text-white sm:text-xl">{espacio.nombre}</p>
                    <p className="mt-0.5 text-base leading-relaxed text-white/65 sm:text-lg">{espacio.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. NUESTROS SERVICIOS ─────────────────────────────────────── */}
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-black text-[#182130] sm:text-4xl">
              Cómo podemos ayudarte
            </h2>
            <p className="mt-3 max-w-xl mx-auto text-slate-500">
              Tres líneas de trabajo para potenciar tu proceso creativo y comunicativo.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {servicios.map((servicio, idx) => {
              const Icon = servicio.icon;
              const colors = ["#11B2AA", "#2D3586", "#EC6910"];
              const bgs = ["#11B2AA1A", "#2D35861A", "#EC69101A"];
              return (
                <Card
                  key={servicio.titulo}
                  className="border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
                      style={{ backgroundColor: bgs[idx] }}
                    >
                      <Icon className="h-7 w-7" style={{ color: colors[idx] }} />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-[#182130] sm:text-2xl">{servicio.titulo}</h3>
                    <p className="text-base leading-relaxed text-slate-500 sm:text-lg">{servicio.descripcion}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 5. UN ESPACIO PARA TODOS ────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#023A34]/5 to-[#11B2AA]/5 py-20">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-black text-[#182130] sm:text-4xl">
              Un espacio para todos
            </h2>
            <p className="mt-3 max-w-xl mx-auto text-slate-500">
              El Aula de Experimentación Audiovisual está pensada para la diversidad del territorio.
            </p>
          </div>

          <div className="mb-10">
            <AutoCarousel
              images={paraQuienesGalleryImages}
              altPrefix="Galería para quiénes"
              interval={6000}
              imageClassName="h-[28rem] sm:h-[34rem] object-cover"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {perfiles.map((perfil) => (
              <Card
                key={perfil.titulo}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className="h-1.5 w-full"
                  style={{ backgroundColor: perfil.color }}
                />
                <CardContent className="p-6 text-center">
                  <p
                    className="mb-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em]"
                    style={{
                      color: perfil.color,
                      backgroundColor: perfil.color + "1A",
                    }}
                  >
                  </p>
                  <h3
                    className="mb-3 text-lg font-extrabold leading-tight sm:text-xl"
                    style={{ color: perfil.color }}
                  >
                    {perfil.titulo}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-slate-600 sm:text-base">{perfil.descripcion}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. CTA FINAL ──────────────────────────────────────────────── */}
      <section className="bg-[#182130] py-16 text-white">
        <div className="container mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-black sm:text-4xl">
            ¿Listo para crear algo <span className="text-[#FFDE07]">increíble</span>?
          </h2>
          <p className="mt-4 text-white/70">
            Contáctanos y te acompañamos en cada paso de tu proceso creativo.
          </p>
          <a
            href={WHATSAPP_ADMIN}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#FFDE07] px-10 py-4 text-base font-bold text-[#182130] shadow-lg transition-transform hover:scale-105"
          >
            <MessageCircle className="h-5 w-5" />
            Contáctenos por WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
