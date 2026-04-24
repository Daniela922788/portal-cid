import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import CoursesCarouselNew from "@/components/CoursesCarouselNew";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Lightbulb, 
  Users, 
  ChevronLeft,
  BookOpen, 
  Award, 
  Newspaper, 
  Calendar,
  Microscope,
  GraduationCap,
  Sparkles,
  HeartHandshake
} from "lucide-react";
 
import educacionLogo from "@/assets/educacion-logo.png";
import alcaldiaLogo from "@/assets/alcaldia-envigado-logo.png";
import cienciasLogo from "@/assets/ciencias-logo.png";
import ticLogo from "@/assets/tic-logo.png";
export default function Home() {
  // Authentication state is managed by the app context
  // Users can login via the header button
  const showCoursesCarousel = false;
  const showCidKids = false;
  const videosShorts = [
    {
      id: "QLJqKHyzcnU",
      titulo: "Capsula STEM 1",
    },
    {
      id: "spMFXEUCEX8",
      titulo: "Capsula STEM 2",
    },
    {
      id: "R3-OXQd-Fp4",
      titulo: "Capsula STEM 3",
    },
    {
      id: "4qF9yJWZRcU",
      titulo: "Capsula STEM 4",
    },
  ];
  const [videoIndex, setVideoIndex] = useState(0);
  const mobileVideoSectionRef = useRef<HTMLElement | null>(null);
  const hasAutoCenteredMobileRef = useRef(false);

  const goPrevVideo = () => {
    setVideoIndex((prev) => (prev - 1 + videosShorts.length) % videosShorts.length);
  };

  const goNextVideo = () => {
    setVideoIndex((prev) => (prev + 1) % videosShorts.length);
  };

  const currentVideo = videosShorts[videoIndex];

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth >= 768) return;

    const section = mobileVideoSectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting || hasAutoCenteredMobileRef.current) return;

        hasAutoCenteredMobileRef.current = true;
        section.scrollIntoView({ behavior: "smooth", block: "center" });
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden md:h-screen">
        <picture>
          <source srcSet="/banners/Banner_principal.webp" type="image/webp" />
          <img
            src="/banners/Banner_principal.png"
            alt="Banner principal Portal de Innovación Educativa CID"
            loading="eager"
            fetchPriority="high"
            decoding="sync"
            className="w-full h-auto object-contain md:h-full md:object-cover md:object-center"
          />
        </picture>
        <div className="absolute inset-0 bg-[#182130]/35" />
        <div className="absolute left-4 top-[62%] z-10 -translate-y-1/2 text-left md:left-28 md:top-[58%] lg:left-[6.5rem] lg:top-[56%]">
          <h1 className="text-sm font-black leading-tight text-white sm:text-4xl lg:text-6xl xl:text-7xl">
            <span className="block">Somos el CID</span>
            <span className="block">donde la ciencia</span>
            <span className="block">y la innovación</span>
            <span className="block">transforman</span>
            <span className="block">el territorio.</span>
          </h1>
        </div>
        
                {/* Flecha scroll-down */}
                <div className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 animate-bounce text-white/50 md:bottom-8 md:block">
                  <ChevronLeft className="h-5 w-5 rotate-[-90deg] md:h-6 md:w-6" />
                </div>
      </section>

      {/* Banner Trancion de fondo debajo del principal y debajo de los cuadros */}
      <div className="relative w-full">
        <img
          src="/Home/banner%20trancion.webp"
          alt="Banner Trancion"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-auto object-cover z-0"
          style={{ pointerEvents: 'none' }}
        />
        {/* Banners de acceso rápido sobre el fondo */}
        <section className="relative z-10 bg-transparent pt-4 md:py-8">
          <div className="w-full space-y-2 md:container md:mx-auto md:space-y-4 md:px-4">
            <Link href="/nosotros" aria-label="Ir a Nosotros" className="group block">
              <div className="overflow-hidden rounded-2xl shadow-md">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src="/banners/banner%202.webp"
                    alt="Banner Nosotros"
                    loading="lazy"
                    decoding="async"
                    className="w-full object-cover transition-transform duration-300 group-hover:scale-[1.01] md:group-hover:scale-100"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 hidden bg-black/0 transition-colors duration-300 md:block md:group-hover:bg-black/20"
                  />
                </div>
              </div>
            </Link>

            <Link href="/formacion" aria-label="Ir a Formación" className="group block">
              <div className="overflow-hidden rounded-2xl shadow-md">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src="/banners/banner%204.webp"
                    alt="Banner Formación"
                    loading="lazy"
                    decoding="async"
                    className="w-full object-cover transition-transform duration-300 group-hover:scale-[1.01] md:group-hover:scale-100"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 hidden bg-black/0 transition-colors duration-300 md:block md:group-hover:bg-black/20"
                  />
                </div>
              </div>
            </Link>

            <div className="overflow-hidden rounded-2xl shadow-md">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src="/banners/banner%203.webp"
                  alt="Banner Convocatorias"
                  loading="lazy"
                  decoding="async"
                  className="w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Carrusel de Cursos */}
      {showCoursesCarousel && <CoursesCarouselNew />}

      {/* Accesos Rápidos */}
      <section className="py-16">
        {/* Nuestras Secciones - estilo destacado (comparación) */}
        <section className="w-full py-12" style={{ background: '#11B2AA' }}>
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-[#2B3990] tracking-tight">NUESTRAS SECCIONES</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Territorio STEM */}
              <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
                <img src="/Home/1.webp" alt="Territorio STEM" className="w-full h-auto object-contain bg-white" />
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-[#2B3990] mb-2">Territorio STEM</h3>
                  <p className="text-gray-700 text-base mb-2">Conoce el ecosistema STEM de Envigado, sus actores, proyectos y oportunidades para estudiantes y docentes.</p>
                </div>
              </div>
              {/* Premios y reconocimientos */}
              <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
                <img src="/Home/2.webp" alt="Premios y reconocimientos" className="w-full h-auto object-contain bg-white" />
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-[#2B3990] mb-2">Premios y reconocimientos</h3>
                  <p className="text-gray-700 text-base mb-2">Explora los reconocimientos que reflejan nuestro compromiso con la excelencia.</p>
                </div>
              </div>
              {/* Aliados */}
              <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
                <img src="/Home/3.webp" alt="Aliados" className="w-full h-auto object-contain bg-white" />
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-[#2B3990] mb-2">Aliados</h3>
                  <p className="text-gray-700 text-base mb-2">Descubre a nuestros aliados estratégicos que impulsan la innovación educativa en nuestra comunidad.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

        
      <section className="relative left-1/2 w-screen -translate-x-1/2 py-10 md:py-14">
        <div className="container">
          <div className="mb-6 text-center md:mb-8">
            <h2 className="text-4xl font-bold text-[#023A34] md:text-6xl">TOM 2026</h2>
            <p className="mt-2 text-lg text-gray-700 md:text-2xl">Ideas que se convierten en esperanza</p>
          </div>
          <div className="mx-auto max-w-8xl overflow-hidden rounded-2xl shadow-2xl">
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

      {/* Carrusel de videos STEM */}
      <section ref={mobileVideoSectionRef} className="relative overflow-hidden py-10 md:py-16">
        <img
          src="/Fondos/6.png"
          alt="Fondo sección de videos móvil"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover md:hidden"
        />
        <img
          src="/Fondos/5.png"
          alt="Fondo sección de videos"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 hidden h-full w-full object-contain md:block"
        />

        <div className="container relative z-10">
          <div className="relative flex min-h-[650px] items-center justify-center md:min-h-[900px]">
            <div className="relative">
              <button
                type="button"
                onClick={goPrevVideo}
                aria-label="Video anterior"
                className="absolute left-0 top-1/2 z-20 -translate-x-[115%] -translate-y-1/2 rounded-full border border-white/55 bg-black/35 p-2 text-white transition hover:bg-black/55"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="relative w-[340px] overflow-hidden rounded-[2.8rem] border-[5px] border-white/85 bg-black shadow-[0_20px_50px_rgba(0,0,0,0.55)] sm:w-[420px] md:w-[520px]">
                <div className="pointer-events-none absolute left-1/2 top-2 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-white/70" />
                <iframe
                  key={currentVideo.id}
                  src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=1&mute=1&loop=1&playlist=${currentVideo.id}&playsinline=1&rel=0&modestbranding=1`}
                  title={currentVideo.titulo}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="aspect-[9/16] w-full"
                />
              </div>

              <button
                type="button"
                onClick={goNextVideo}
                aria-label="Siguiente video"
                className="absolute right-0 top-1/2 z-20 translate-x-[115%] -translate-y-1/2 rounded-full border border-white/55 bg-black/35 p-2 text-white transition hover:bg-black/55"
              >
                <ChevronLeft className="h-5 w-5 rotate-180" />
              </button>

              <div className="mt-4 flex justify-center gap-2">
              {videosShorts.map((video, index) => (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => setVideoIndex(index)}
                  aria-label={`Ir al video ${index + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    videoIndex === index ? "w-8 bg-white" : "w-2 bg-white/45"
                  }`}
                />
              ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Semana STEM */}
      <section className="py-8 md:py-12 bg-white">
        {/* Mobile: banner extendido, Desktop: container */}
        <div className="block md:hidden w-full">
          <Link href="/semana-stem-complete" aria-label="Ir a la sección Semana STEM" className="group block cursor-pointer">
            <div className="overflow-hidden rounded-2xl shadow-md">
              <img
                src="/banners/banner-semana-click.webp"
                alt="Banner Semana STEM"
                loading="lazy"
                fetchPriority="high"
                decoding="async"
                className="w-full object-contain h-20 sm:h-28 rounded-2xl"
              />
            </div>
          </Link>
        </div>
        <div className="hidden md:block container">
          <Link href="/semana-stem-complete" aria-label="Ir a la sección Semana STEM" className="group block cursor-pointer">
            <div className="overflow-hidden rounded-2xl shadow-md">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="/banners/banner-semana-click.webp"
                  alt="Banner Semana STEM"
                  loading="lazy"
                  fetchPriority="high"
                  decoding="async"
                  className="h-[220px] w-full object-cover object-center md:h-[270px] rounded-2xl"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20"
                />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Logos de Ministerios y Entidades */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-4 items-center gap-3 md:gap-6">
            <a href="https://www.mineducacion.gov.co/portal/" target="_blank" rel="noopener noreferrer">
              <div className="flex flex-col items-center hover:opacity-80 transition-opacity cursor-pointer">
                <img 
                  src={educacionLogo} 
                  alt="Ministerio de Educación" 
                  className="h-14 w-auto object-contain sm:h-20 md:h-24"
                />
              </div>
            </a>

            <a href="https://minciencias.gov.co/" target="_blank" rel="noopener noreferrer">
              <div className="flex flex-col items-center hover:opacity-80 transition-opacity cursor-pointer">
                <img 
                  src={cienciasLogo} 
                  alt="Ciencias" 
                  className="h-14 w-auto object-contain sm:h-20 md:h-24"
                />
              </div>
            </a>

            <a href="https://www.mintic.gov.co/portal/inicio/" target="_blank" rel="noopener noreferrer">
              <div className="flex flex-col items-center hover:opacity-80 transition-opacity cursor-pointer">
                <img 
                  src={ticLogo} 
                  alt="TIC" 
                  className="h-14 w-auto object-contain sm:h-20 md:h-24"
                />
              </div>
            </a>

            <a href="https://www.envigado.gov.co/" target="_blank" rel="noopener noreferrer">
              <div className="flex flex-col items-center hover:opacity-80 transition-opacity cursor-pointer">
                <img 
                  src={alcaldiaLogo} 
                  alt="Alcaldía de Envigado" 
                  className="h-14 w-auto object-contain sm:h-20 md:h-24"
                />
              </div>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
