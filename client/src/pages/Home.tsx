import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import CoursesCarouselNew from "@/components/CoursesCarouselNew";
import { ChevronLeft, ChevronRight } from "lucide-react";

import educacionLogo from "@/assets/educacion-logo.png";
import alcaldiaLogo from "@/assets/alcaldia-envigado-logo.png";
import cienciasLogo from "@/assets/ciencias-logo.png";
import ticLogo from "@/assets/tic-logo.png";

export default function Home() {
  const showCoursesCarousel = false;
  const showCidKids = false;

  // ─────────────────────────────────────────────
  // Carrusel de contenido destacado
  // Para agregar / quitar slides, edita este arreglo.
  // videoId = el ID del video de YouTube (lo que va después de "watch?v=")
  // bg      = imagen de fondo difuminada (ponla en /public/Fondos/)
  // ─────────────────────────────────────────────
  const featuredSections = [
    {
      id: "chernobyl",
      title: "Chernóbil: el desastre nuclear más grande de la historia",
      desc: "Chernóbil no fue un fallo de la física, sino un quiebre de la responsabilidad. Nos recordó que la ciencia sin conciencia es un arma de doble filo: una herramienta capaz de iluminar naciones o de apagar el futuro de generaciones enteras.",
      videos: ["hwdlq1YyQII"],
      bg: "/Fondos/Fondo_chernobyl.png",
      watermark: "CID",
    },
    
    {
      id: "arbol",
      title: "Día del Árbol: sembrando futuro",
      desc: "Cada árbol que sembramos es una decisión sobre el futuro que queremos habitar. El Día del Árbol nos recuerda que cuidar lo vivo también es una forma de innovación: la más antigua y la más necesaria.",
      videos: ["vnCAia6v0bE"],
      bg: "/Fondos/dia_arbol.jpg",
      watermark: "ÁRBOL",
    },
    {
      id: "artemis",
      title: "Artemis II: el regreso de la humanidad a la Luna",
      desc: "Artemis II marca el retorno de la humanidad a la Luna después de más de medio siglo. No es solo un viaje: es la promesa de que la curiosidad y la cooperación científica todavía pueden llevarnos más lejos de lo que imaginamos.",
      videos: ["spMFXEUCEX8", "R3-OXQd-Fp4", "QLJqKHyzcnU", "4qF9yJWZRcU"],
      bg: "/Fondos/5.png",
      watermark: "ARTEMIS",
    },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [activeVideo, setActiveVideo] = useState(0);
  // handlers to navigate videos inside a section
  const prevVideo = () => setActiveVideo((v) => (v - 1 + active.videos.length) % active.videos.length);
  const nextVideo = () => setActiveVideo((v) => (v + 1) % active.videos.length);
  const sectionCount = featuredSections.length;
  const active = featuredSections[activeSection];
  const currentVideoId = active.videos[Math.min(activeVideo, active.videos.length - 1)];
  const selectSection = (i: number) => {
    setActiveSection(((i % sectionCount) + sectionCount) % sectionCount);
    setActiveVideo(0);
  };
  const goPrev = () => selectSection(activeSection - 1);
  const goNext = () => selectSection(activeSection + 1);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F5F2EC]" style={{ fontFamily: "'Georgia', serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500&display=swap');

        .cid-hero-text {
          font-family: 'Playfair Display', Georgia, serif;
        }
        .cid-hero-banner {
          font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
          font-weight: 900;
        }
        .cid-body {
          font-family: 'DM Sans', sans-serif;
        }
        .cid-section-label {
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.22em;
          font-size: 0.72rem;
          font-weight: 500;
          text-transform: uppercase;
        }
        .cid-card {
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .cid-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 56px rgba(2, 58, 52, 0.18);
        }
        .cid-banner-link img {
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .cid-banner-link:hover img {
          transform: scale(1.015);
        }
        .cid-rule {
          height: 3px;
          background: #11B2AA;
          width: 52px;
          border-radius: 2px;
          display: inline-block;
        }
        .cid-diagonal-strip {
          clip-path: polygon(0 6%, 100% 0%, 100% 94%, 0% 100%);
        }
        .cid-logo-strip a {
          transition: filter 0.25s, transform 0.25s;
          filter: grayscale(100%) opacity(0.6);
        }
        .cid-logo-strip a:hover {
          filter: grayscale(0%) opacity(1);
          transform: scale(1.07);
        }
        @keyframes cid-fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cid-fade-up { animation: cid-fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .cid-fade-up-2 { animation: cid-fade-up 0.9s 0.15s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .cid-fade-up-3 { animation: cid-fade-up 0.9s 0.3s cubic-bezier(0.22, 1, 0.36, 1) both; }

        .phone-frame {
          border-radius: 2.8rem;
          border: 5px solid rgba(255,255,255,0.85);
          overflow: hidden;
          box-shadow: 0 32px 80px rgba(0,0,0,0.5);
        }
        .phone-notch {
          position: absolute;
          left: 50%;
          top: 10px;
          transform: translateX(-50%);
          width: 64px;
          height: 6px;
          background: rgba(255,255,255,0.7);
          border-radius: 3px;
          z-index: 10;
        }

        @keyframes cid-fade-in { from { opacity: 0; } to { opacity: 1; } }
        .cid-fade-in { animation: cid-fade-in 0.55s ease both; }
        @keyframes cid-bg-fade { from { opacity: 0; } to { opacity: 0.1; } }
        .cid-bg-fade { animation: cid-bg-fade 0.8s ease both; }

        .cid-carousel-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 9999px;
          background: rgba(255,255,255,0.75);
          border: 1px solid rgba(2,58,52,0.15);
          color: #023A34;
          box-shadow: 0 8px 24px rgba(2,58,52,0.15);
          backdrop-filter: blur(4px);
          cursor: pointer;
          transition: background 0.25s, transform 0.25s, box-shadow 0.25s;
        }
        .cid-carousel-arrow:hover {
          background: #11B2AA;
          color: #ffffff;
          transform: scale(1.08);
          box-shadow: 0 12px 30px rgba(17,178,170,0.35);
        }
      `}</style>

      {/* ═══════════════════════════════════════
          HERO – full-bleed with editorial overlay
      ═══════════════════════════════════════ */}
      <section className="relative w-full" style={{ height: '100vh', minHeight: '500px' }}>
        <picture>
          <source srcSet="/banners/Banner_principal.webp" type="image/webp" />
          <img
            src="/banners/Banner_principal.png"
            alt="Banner principal Portal de Innovación Educativa CID"
            loading="eager"
            fetchPriority="high"
            decoding="sync"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </picture>

        {/* Deep gradient — left side dark, fades right */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(105deg, rgba(2,20,18,0.82) 0%, rgba(2,58,52,0.55) 45%, rgba(17,178,170,0.12) 100%)'
          }}
        />

        {/* Vertical rule accent */}
        <div
          className="absolute hidden md:block"
          style={{
            left: '7rem',
            top: '18%',
            bottom: '18%',
            width: '3px',
            background: 'linear-gradient(to bottom, transparent, #11B2AA, transparent)',
            opacity: 0.8,
          }}
        />

        {/* Text block */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10 md:left-32">

          <h1 className="cid-hero-banner cid-fade-up-2 leading-[1.05] text-white"
            style={{ fontSize: 'clamp(1.8rem, 7vw, 6.5rem)' }}>
            <span className="block" style={{ color: '#11B2AA' }}>Somos el CID</span>
            <span className="block">donde la ciencia</span>
            <span className="block">y la innovación</span>
            <span className="block">transforman</span>
            <span className="block">el territorio.</span>
          </h1>
          <div className="cid-fade-up-3 mt-6 md:mt-8 flex items-center gap-3">
            <span className="cid-rule" />
            <span className="cid-body text-white/60 text-sm">Envigado, Antioquia</span>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-white/40">
          <div className="animate-bounce">
            <ChevronLeft className="h-5 w-5 rotate-[-90deg]" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          QUICK-ACCESS BANNERS — editorial grid
      ═══════════════════════════════════════ */}
      <section className="relative bg-[#F5F2EC] py-12 md:py-20">
        {/* Watermark number */}
        <span
          className="cid-hero-text pointer-events-none select-none absolute right-4 top-4 text-[11rem] font-black text-[#11B2AA]/6 leading-none hidden md:block"
          aria-hidden="true"
        >01</span>

        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-8 md:mb-12 flex items-center gap-4">
            <span className="cid-rule" />
            <p className="cid-section-label text-[#023A34]">Explora</p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:gap-7">
            {/* Banner Nosotros */}
            <Link href="/nosotros" aria-label="Ir a Nosotros" className="cid-banner-link group block">
              <div className="overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="/banners/banner 2.webp"
                  alt="Banner Nosotros"
                  loading="lazy"
                  decoding="async"
                  className="w-full object-cover"
                />
              </div>
            </Link>

            {/* Banner Formación */}
            <Link href="/formacion" aria-label="Ir a Formación" className="cid-banner-link group block">
              <div className="overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="/banners/banner 4.webp"
                  alt="Banner Formación"
                  loading="lazy"
                  decoding="async"
                  className="w-full object-cover"
                />
              </div>
            </Link>

            {/* Banner Convocatorias (no link) */}
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src="/banners/banner 3.webp"
                alt="Banner Convocatorias"
                loading="lazy"
                decoding="async"
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {showCoursesCarousel && <CoursesCarouselNew />}

      {/* ═══════════════════════════════════════
          NUESTRAS SECCIONES — teal diagonal strip
      ═══════════════════════════════════════ */}
      <section
        className="relative py-20 md:py-28 cid-diagonal-strip"
        style={{ background: 'linear-gradient(135deg, #023A34 0%, #11B2AA 100%)' }}
      >
        {/* Watermark */}
        <span
          className="cid-hero-text pointer-events-none select-none absolute left-4 top-4 text-[11rem] font-black text-white/5 leading-none hidden md:block"
          aria-hidden="true"
        >02</span>

        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-12 md:mb-16 text-center">
            <p className="cid-section-label text-[#11B2AA]/70 mb-3" style={{ color: 'rgba(255,255,255,0.55)' }}>Lo que hacemos</p>
            <h2 className="cid-hero-text text-4xl md:text-6xl font-black text-white tracking-tight">
              Nuestras Secciones
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                img: "/Home/1.webp",
                title: "Territorio STEM",
                desc: "Conoce el ecosistema STEM de Envigado, sus actores, proyectos y oportunidades para estudiantes y docentes.",
                href: "/territorio-stem",
              },
              {
                img: "/Home/2.webp",
                title: "Premios y reconocimientos",
                desc: "Explora los reconocimientos que reflejan nuestro compromiso con la excelencia.",
                href: "/reconocimientos",
              },
              {
                img: "/Home/3.webp",
                title: "Aliados",
                desc: "Descubre a nuestros aliados estratégicos que impulsan la innovación educativa en nuestra comunidad.",
                href: "/aliados",
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                aria-label={`Ir a ${item.title}`}
                onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "auto" })}
                className="cid-card group bg-white rounded-2xl overflow-hidden flex flex-col shadow-xl"
              >
                <div className="overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-auto object-contain bg-white transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 md:p-8 flex-1 flex flex-col gap-3 border-t-4 border-[#11B2AA]">
                  <h3 className="cid-hero-text text-2xl font-bold text-[#023A34]">{item.title}</h3>
                  <p className="cid-body text-gray-600 text-base leading-relaxed">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TOM 2026 — dark cinematic section
      ═══════════════════════════════════════ */}
      <section className="relative py-16 md:py-24 bg-[#08100F]">
        {/* Watermark */}
        <span
          className="cid-hero-text pointer-events-none select-none absolute right-6 bottom-6 text-[11rem] font-black text-white/[0.03] leading-none hidden md:block"
          aria-hidden="true"
        >03</span>

        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
            <div>
              <p className="cid-section-label text-[#11B2AA] mb-3">Video principal</p>
              <h2 className="cid-hero-text font-black text-white leading-none"
                style={{ fontSize: 'clamp(2.8rem, 8vw, 7rem)' }}>
                TOM 2026
              </h2>
            </div>
            <p className="cid-body text-white/50 text-lg md:text-2xl md:text-right max-w-xs">
              Ideas que se convierten en esperanza
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl shadow-2xl"
            style={{ boxShadow: '0 0 80px rgba(17,178,170,0.15), 0 32px 64px rgba(0,0,0,0.6)' }}>
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src="https://www.youtube.com/embed/CceKZW0xxTk?autoplay=1&mute=1&loop=1&playlist=CceKZW0xxTk&playsinline=1&rel=0&modestbranding=1"
                title="Somos el CID - Video"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CONTENIDO DESTACADO — carrusel de mockups
      ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-[#F5F2EC]">
        {/* Fondo decorativo (cambia por slide) */}
        <img
          key={`bg-${active.id}`}
          src={active.bg}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          className="cid-bg-fade absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Marca de agua grande */}
        <span
          key={`wm-${active.id}`}
          className="cid-hero-text cid-fade-in pointer-events-none select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[14rem] font-black text-[#023A34]/5 leading-none whitespace-nowrap hidden md:block"
          aria-hidden="true"
        >{active.watermark}</span>

        <div className="relative z-10 container mx-auto px-4 md:px-8">
          {/* Encabezado fijo */}
          <div className="mb-8 md:mb-12 flex items-center gap-3">
            <span className="cid-rule" />
            <p className="cid-section-label text-[#023A34]">Contenido destacado</p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            {/* Texto */}
            <div key={`txt-${active.id}`} className="cid-fade-in md:flex-1 text-center md:text-left">
              <h2 className="cid-hero-text text-4xl md:text-5xl font-black text-[#023A34] mb-6 leading-tight">
                {active.title}
              </h2>
              <div className="cid-rule mb-6" />
              <p className="cid-body text-[#023A34]/75 text-base md:text-lg leading-relaxed max-w-md mx-auto md:mx-0">
                {active.desc}
              </p>
            </div>

            {/* Celular */}
            <div className="relative flex flex-col items-center md:flex-1">
              <div
                key={`phone-${active.id}-${activeVideo}`}
                className="phone-frame cid-fade-in relative bg-black"
                style={{ width: 'min(88vw, 330px)' }}
              >
                <div className="phone-notch" />
                <div className="aspect-[9/16] w-full">
                  <iframe
                    src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&mute=1&loop=1&playlist=${currentVideoId}&playsinline=1&rel=0&modestbranding=1`}
                    title={active.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
                {/* Flechas internas para navegar entre videos (aparecen si hay más de uno) */}
                {active.videos.length > 1 && (
                  <>
                    <button
                      onClick={prevVideo}
                      aria-label="Video anterior"
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-30 cid-carousel-arrow"
                      style={{ width: '38px', height: '38px' }}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={nextVideo}
                      aria-label="Siguiente video"
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-30 cid-carousel-arrow"
                      style={{ width: '38px', height: '38px' }}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </>
                )}
              </div>

              {/* Puntos de video (solo si la sección tiene más de uno) */}
              {active.videos.length > 1 && (
                <div className="mt-5 flex items-center justify-center gap-2.5">
                  {active.videos.map((v, vi) => (
                    <button
                      key={v}
                      onClick={() => setActiveVideo(vi)}
                      aria-label={`Ver video ${vi + 1} de ${active.videos.length}`}
                      aria-current={vi === activeVideo}
                      className="rounded-full transition-all duration-300"
                      style={
                        vi === activeVideo
                          ? { width: '22px', height: '6px', background: '#11B2AA' }
                          : { width: '6px', height: '6px', background: 'rgba(2,58,52,0.22)' }
                      }
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Puntos de navegación */}
          <div className="mt-10 md:mt-12 flex items-center justify-center gap-3">
            {featuredSections.map((s, i) => (
              <button
                key={s.id}
                onClick={() => selectSection(i)}
                aria-label={`Ir a la sección ${s.title}`}
                aria-current={i === activeSection}
                className="rounded-full transition-all duration-300"
                style={
                  i === activeSection
                    ? { width: '30px', height: '8px', background: '#11B2AA' }
                    : { width: '8px', height: '8px', background: 'rgba(2,58,52,0.25)' }
                }
              />
            ))}
          </div>
        </div>

        {/* Flechas laterales */}
        <button
          onClick={goPrev}
          aria-label="Sección anterior"
          className="cid-carousel-arrow absolute top-1/2 -translate-y-1/2 z-20"
          style={{ left: 'calc(50% - 890px)' }}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={goNext}
          aria-label="Sección siguiente"
          className="cid-carousel-arrow absolute top-1/2 -translate-y-1/2 z-20"
          style={{ left: 'calc(50% + 700px)' }}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </section>

      {/* ═══════════════════════════════════════
          SEMANA STEM — full-bleed banner
      ═══════════════════════════════════════ */}
      <section className="py-8 md:py-14 bg-[#023A34]">
        <div className="container mx-auto px-4 md:px-8">
          <p className="cid-section-label text-[#11B2AA] mb-6 text-center">Evento especial</p>
          <Link
            href="/semana-stem-complete"
            aria-label="Ir a la sección Semana STEM"
            className="cid-banner-link group block"
          >
            <div className="overflow-hidden rounded-2xl shadow-2xl"
              style={{ boxShadow: '0 0 60px rgba(17,178,170,0.2), 0 16px 48px rgba(0,0,0,0.4)' }}>
              <img
                src="/banners/banner-semana-click.webp"
                alt="Banner Semana STEM"
                loading="lazy"
                fetchPriority="high"
                decoding="async"
                className="w-full object-cover"
              />
            </div>
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          LOGOS — refined grayscale strip
      ═══════════════════════════════════════ */}
      <section className="py-14 md:py-20 bg-[#F5F2EC] border-t border-[#023A34]/10">
        <div className="container mx-auto px-4 md:px-8">
          <p className="cid-section-label text-center text-[#023A34]/40 mb-10">Con el apoyo de</p>
          <div className="cid-logo-strip grid grid-cols-4 items-center justify-items-center gap-4 md:gap-10">
            <a href="https://www.mineducacion.gov.co/portal/" target="_blank" rel="noopener noreferrer">
              <img src={educacionLogo} alt="Ministerio de Educación" className="h-12 w-auto object-contain sm:h-16 md:h-20" />
            </a>
            <a href="https://minciencias.gov.co/" target="_blank" rel="noopener noreferrer">
              <img src={cienciasLogo} alt="Minciencias" className="h-12 w-auto object-contain sm:h-16 md:h-20" />
            </a>
            <a href="https://www.mintic.gov.co/portal/inicio/" target="_blank" rel="noopener noreferrer">
              <img src={ticLogo} alt="MinTIC" className="h-12 w-auto object-contain sm:h-16 md:h-20" />
            </a>
            <a href="https://www.envigado.gov.co/" target="_blank" rel="noopener noreferrer">
              <img src={alcaldiaLogo} alt="Alcaldía de Envigado" className="h-12 w-auto object-contain sm:h-16 md:h-20" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}