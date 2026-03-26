import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, GraduationCap, Video, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";

// ─── Actualiza estas rutas cuando tengas las imágenes del aula ───────────────
const WHATSAPP_ADMIN = "https://wa.me/573012577662";

const aulaNaranjaImages = [
  "/Centro%20Audiovisual/2_FOTOS_QUE_ES_EL_AULA/315A0526.jpg",
  "/Centro%20Audiovisual/2_FOTOS_QUE_ES_EL_AULA/315A0672.jpg",
  "/Centro%20Audiovisual/2_FOTOS_QUE_ES_EL_AULA/315A0682.jpg",
  "/Centro%20Audiovisual/2_FOTOS_QUE_ES_EL_AULA/315A0694.jpg",
];

const infraestructuraImages = [
  "/Centro%20Audiovisual/3_FOTOS_INFRAESTRUCTURA/2025-08-25-RECORRIDO%20PEDAGOGICO%20MARIE%20POUSSEPAN_1.jpg",
  "/Centro%20Audiovisual/3_FOTOS_INFRAESTRUCTURA/2025-08-25-RECORRIDO%20PEDAGOGICO%20MARIE%20POUSSEPAN_5.jpg",
  "/Centro%20Audiovisual/3_FOTOS_INFRAESTRUCTURA/315A1034.jpg",
  "/Centro%20Audiovisual/3_FOTOS_INFRAESTRUCTURA/315A1047.jpg",
  "/Centro%20Audiovisual/3_FOTOS_INFRAESTRUCTURA/315A1343.jpg",
  "/Centro%20Audiovisual/3_FOTOS_INFRAESTRUCTURA/315A1346.jpg",
  "/Centro%20Audiovisual/3_FOTOS_INFRAESTRUCTURA/315A4231.jpg",
  "/Centro%20Audiovisual/3_FOTOS_INFRAESTRUCTURA/315A4264.jpg",
  "/Centro%20Audiovisual/3_FOTOS_INFRAESTRUCTURA/315A4274.jpg",
  "/Centro%20Audiovisual/3_FOTOS_INFRAESTRUCTURA/315A9734.jpg",
];

const paraQuienesGalleryImages = [
  "/Centro%20Audiovisual/5_FOTOS_PARA%20QUIENES/315A0251.jpg",
  "/Centro%20Audiovisual/5_FOTOS_PARA%20QUIENES/315A0258.jpg",
  "/Centro%20Audiovisual/5_FOTOS_PARA%20QUIENES/315A1147.jpg",
  "/Centro%20Audiovisual/5_FOTOS_PARA%20QUIENES/315A1185.jpg",
  "/Centro%20Audiovisual/5_FOTOS_PARA%20QUIENES/315A1322.jpg",
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
    titulo: "Producción Propia",
    descripcion:
      "Uso del estudio y la infraestructura para materializar proyectos de comunidades, instituciones y emprendedores.",
  },
];

const perfiles = [
  {
    emoji: "🎒",
    titulo: "Instituciones Educativas",
    descripcion: "Integra la producción audiovisual como herramienta pedagógica en el aula.",
    color: "#2D3586",
  },
  {
    emoji: "🌱",
    titulo: "La Comunidad",
    descripcion: "Accede a un espacio profesional para aprender, crear y comunicar.",
    color: "#023A34",
  },
  {
    emoji: "💡",
    titulo: "Emprendedores",
    descripcion: "Desarrolla contenido de calidad para impulsar tu proyecto o idea.",
    color: "#EC6910",
  },
  {
    emoji: "🏛️",
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
}: {
  images: string[];
  altPrefix: string;
  interval?: number;
  imageClassName?: string;
}) {
  const [current, setCurrent] = useState(0);
  const toWebp = (src: string) => src.replace(/\.(jpe?g|png)$/i, ".webp");

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [images.length, interval]);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, i) => (
          <picture key={src} className="min-w-full">
            <source srcSet={toWebp(src)} type="image/webp" />
            <img
              src={src}
              alt={`${altPrefix} ${i + 1}`}
              className={`min-w-full ${imageClassName ?? "h-72 object-cover"}`}
              loading="lazy"
              decoding="async"
            />
          </picture>
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
    command("setPlaybackQuality", ["hd1080"]);
  };

  useEffect(() => {
    // Retry a few times to improve autoplay reliability on mobile browsers.
    const timers = [150, 500, 1200, 2500].map((delay) =>
      window.setTimeout(forceHeroVideoPlayback, delay)
    );

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#182130]">

      {/* ─── 1. HERO ───────────────────────────────────────────────────── */}
      <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
        <img
          src="/Centro%20Audiovisual/1_VIDEO_CORTO_FULL/banner-centro-audiovisual.jpg"
          alt="Banner Centro Audiovisual"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 overflow-hidden">
          <iframe
            ref={heroVideoRef}
            src="https://www.youtube-nocookie.com/embed/zfpCuxxymuA?autoplay=1&mute=1&controls=0&loop=1&playlist=zfpCuxxymuA&modestbranding=1&rel=0&playsinline=1&iv_load_policy=3&fs=0&enablejsapi=1&widget_referrer=https%3A%2F%2Fportal-cid.vercel.app"
            title="Video de fondo Centro Audiovisual"
            className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2"
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            loading="eager"
            onLoad={forceHeroVideoPlayback}
          />
        </div>
        <div className="absolute inset-0 bg-[#182130]/45" />

        {/* Orbes decorativos */}
        <div className="absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-[#11B2AA]/20 blur-3xl" />
        <div className="absolute right-0 bottom-1/4 h-96 w-96 rounded-full bg-[#2D3586]/25 blur-3xl" />
        <div className="absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-full bg-[#FFDE07]/15 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-none px-6 text-center">
          <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-7xl xl:text-8xl lg:whitespace-nowrap">
            Centro Audiovisual
          </h1>
        </div>

        {/* Flecha scroll-down */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
          <ChevronLeft className="h-6 w-6 rotate-[-90deg]" />
        </div>
      </section>

      <section className="bg-white py-12 sm:py-14">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <Badge className="mb-5 bg-[#FFDE07] text-[#182130] hover:bg-[#FFDE07]/90 text-sm font-semibold px-4 py-1">
            Centro de Ciencia · Secretaría de Educación de Envigado
          </Badge>
          <p className="text-2xl font-light text-[#0D4B56] sm:text-3xl">
            Aula de Experimentación Audiovisual
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Un espacio abierto para crear, aprender y transformar a Envigado a través de
            la ciencia y la innovación.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={WHATSAPP_ADMIN}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#FFDE07] px-8 py-3 text-base font-bold text-[#182130] shadow-lg transition-transform hover:scale-105 hover:bg-[#FFDE07]/90"
            >
              <MessageCircle className="h-5 w-5" />
              Reserva un turno
            </a>
            <button
              type="button"
              onClick={() => infraRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#0D4B56]/30 px-8 py-3 text-base font-semibold text-[#0D4B56] transition-colors hover:border-[#0D4B56] hover:bg-[#0D4B56]/5"
            >
              Descubre el espacio
            </button>
          </div>
        </div>
      </section>

      {/* ─── 2. ¿QUÉ ES EL AULA? ───────────────────────────────────────── */}
      <section className="py-20">
        <div className="container mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
          <AutoCarousel images={aulaNaranjaImages} altPrefix="Aula Naranja" interval={6000} />

          <div className="space-y-6">
            <Badge className="bg-[#11B2AA]/15 text-[#0D4B56] hover:bg-[#11B2AA]/25">
              ¿Qué es el Aula?
            </Badge>
            <h2 className="text-3xl font-black leading-snug text-[#182130] sm:text-4xl">
              Un laboratorio de creación <span className="text-[#11B2AA]">con enfoque colaborativo</span>
            </h2>
            <p className="text-base leading-loose text-slate-600 sm:text-lg">
              Somos un entorno pedagógico, abierto y dinámico del Centro de Ciencia de la
              Secretaría de Educación de Envigado. Democratizamos la producción audiovisual
              para que cualquier persona, sin importar su experiencia, pueda crear contenido
              con calidad y propósito.
            </p>
            <div className="h-1 w-16 rounded-full bg-[#EC6910]" />
          </div>
        </div>
      </section>

      {/* ─── 3. LA INFRAESTRUCTURA ─────────────────────────────────────── */}
      <section
        ref={infraRef}
        className="bg-gradient-to-br from-[#182130] to-[#0D4B56] py-20 text-white"
      >
        <div className="container mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <Badge className="mb-4 bg-[#FFDE07] text-[#182130]">Infraestructura</Badge>
            <h2 className="text-3xl font-black sm:text-4xl">Espacios diseñados para crear</h2>
            <p className="mt-3 text-white/70">
              Tres ambientes profesionales que integran tecnología, creatividad y pedagogía.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <AutoCarousel
              images={infraestructuraImages}
              altPrefix="Infraestructura"
              interval={8000}
              imageClassName="h-96 sm:h-[28rem] object-cover object-center"
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
                    <p className="font-bold text-white">{espacio.nombre}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-white/65">{espacio.desc}</p>
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
            <Badge className="mb-4 bg-[#2D3586]/15 text-[#2D3586] hover:bg-[#2D3586]/25">
              Nuestros Servicios
            </Badge>
            <h2 className="text-3xl font-black text-[#182130] sm:text-4xl">
              ¿Cómo podemos ayudarte?
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
                    <h3 className="mb-2 text-lg font-bold text-[#182130]">{servicio.titulo}</h3>
                    <p className="text-sm leading-relaxed text-slate-500">{servicio.descripcion}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 5. ¿PARA QUIÉN ES? ────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#023A34]/5 to-[#11B2AA]/5 py-20">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <Badge className="mb-4 bg-[#023A34]/15 text-[#023A34] hover:bg-[#023A34]/25">
              ¿Para quién es?
            </Badge>
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
                className="border border-slate-100 bg-white shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
                    style={{ backgroundColor: perfil.color + "1A" }}
                  >
                    {perfil.emoji}
                  </div>
                  <h3
                    className="mb-2 text-base font-bold"
                    style={{ color: perfil.color }}
                  >
                    {perfil.titulo}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-500">{perfil.descripcion}</p>
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
