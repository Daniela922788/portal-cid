import { ReactNode, useEffect, useRef, useState } from "react";
import { Award, Search, Sparkles, X } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

function AutoPlayShortsEmbed({ videoId, title }: { videoId: string; title: string }) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.6 }
    );

    observer.observe(wrapperRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const baseUrl = `https://www.youtube.com/embed/${videoId}?playsinline=1&rel=0&modestbranding=1&mute=1`;
  const src = isInView ? `${baseUrl}&autoplay=1` : baseUrl;

  return (
    <div className="pt-4 flex justify-center" ref={wrapperRef}>
      <div className="w-full max-w-[500px] aspect-[9/16] rounded-lg overflow-hidden border border-slate-200 shadow-sm">
        <iframe
          src={src}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  );
}

type Noticia = {
  id: string;
  titulo: string;
  categoria: string;
  autor: string;
  fecha: string;
  resumen: string;
  contenido: ReactNode[];
  imagenes: string[];
  video?: {
    url: string;
    startSeconds: number;
    endSeconds: number;
  };
};

export default function Reconocimientos() {
  const [selectedNews, setSelectedNews] = useState<Noticia | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const [anioFiltro, setAnioFiltro] = useState("");
  const toWebp = (imagePath: string) => imagePath.replace(/\.(jpe?g|png|jfif)$/i, ".webp");
  const getOptimizedImageSrc = (imagePath: string) => toWebp(imagePath);
  const extractYouTubeVideoId = (url: string) => {
    try {
      const parsed = new URL(url);
      if (parsed.hostname.includes("youtu.be")) {
        return parsed.pathname.replace("/", "");
      }
      if (parsed.pathname.startsWith("/live/")) {
        return parsed.pathname.split("/live/")[1]?.split("/")[0] || "";
      }
      if (parsed.pathname.startsWith("/embed/")) {
        return parsed.pathname.split("/embed/")[1] || "";
      }
      return parsed.searchParams.get("v") || "";
    } catch {
      return "";
    }
  };

  const getYouTubeClipUrl = (video: NonNullable<Noticia["video"]>) => {
    const id = extractYouTubeVideoId(video.url);
    if (!id) return "";
    const params = new URLSearchParams({
      start: String(video.startSeconds),
      end: String(video.endSeconds),
      rel: "0",
      modestbranding: "1",
      playsinline: "1",
    });
    return `https://www.youtube.com/embed/${id}?${params.toString()}`;
  };
  const getImageFitClass = (newsId: string, imageIndex: number, isModal = false) => {
    if (newsId === "nuevo-reconocimiento") {
      return "object-cover";
    }
    if (isModal && newsId === "reconocimiento-adicional" && imageIndex === 1) {
      return "object-contain bg-white";
    }
    return "object-cover";
  };
  const getModalImageHeightClass = (newsId: string, imageIndex: number) => {
    if (newsId === "reconocimiento-adicional" && imageIndex === 1) {
      return "h-auto max-h-[500px]";
    }
    if (newsId === "reconocimiento-adicional" && imageIndex === 0) {
      return "h-[540px]";
    }
    return "h-[500px]";
  };
  const getImagePositionClass = (newsId: string, imageIndex: number) => {
    if (newsId === "ciudad-aprendizaje" && imageIndex === 0) {
      return "object-[50%_40%]";
    }
    if (newsId === "reconocimiento-adicional" && imageIndex === 0) {
      return "object-[50%_18%]";
    }
    if (newsId === "nuevo-reconocimiento" && imageIndex === 0) {
      return "object-[50%_66%]";
    }
    if (newsId === "nuevo-reconocimiento" && imageIndex === 1) {
      return "object-[50%_74%]";
    }
    if (newsId === "nuevo-reconocimiento" && imageIndex === 2) {
      return "object-[50%_84%]";
    }
    if (newsId === "nuevo-reconocimiento" && imageIndex === 3) {
      return "object-[50%_38%]";
    }
    if (newsId === "colombia-lider" && imageIndex === 0) {
      return "object-[50%_12%]";
    }
    if (newsId === "territorio-stem") {
      return "object-[50%_0%]";
    }
    return "object-center";
  };

  const preloadImage = (src: string) => {
    const img = new Image();
    img.decoding = "async";
    img.src = src;
  };

  const noticias: Noticia[] = [
    {
      id: "ciudad-aprendizaje",
      titulo: "Envigado recibió reconocimiento por sus buenas prácticas en Foro Latinoamericano de Ciudades del Aprendizaje",
      categoria: "Reconocimiento UNESCO",
      autor: "Municipio de Envigado",
      fecha: "6 de noviembre de 2025",
      resumen:
        "El Municipio de Envigado recibió el reconocimiento otorgado por la Red Latinoamericana de Ciudades del Aprendizaje por su experiencia Construyendo futuro: territorio STEM + SMART Regenerativo.",
      contenido: [
        "El Municipio de Envigado recibió el reconocimiento otorgado por la Red Latinoamericana de Ciudades del Aprendizaje por su experiencia Construyendo futuro: territorio STEM + SMART Regenerativo, teniendo en cuenta las buenas prácticas que se implementan en el territorio y que apuntan a la implementación de programas de aprendizaje para el cierre de la brecha digital y el desarrollo de competencias en docentes y estudiantes, en función de su contexto socioeconómico y su sentido de pertenencia hacia el municipio. La entrega del reconocimiento se llevó a cabo en ceremonia oficial desde la ciudad de La Paz (México), dentro del Tercer Foro de Ciudades del Aprendizaje de Latinoamérica Aprendizaje basado en el lugar.",
        "La experiencia presentada desde Envigado proyecta el territorio con la promoción de estrategias y experiencias de aprendizaje a lo largo de la vida, para desarrollar competencias, conocimientos, actitudes y valores a través de procesos de investigación, promoción de la ciencia, la tecnología y la innovación. En el sistema educativo local se entiende lo regenerativo como una apuesta que hace énfasis en la sostenibilidad, el pensamiento crítico, la conciencia ambiental, la equidad y el compromiso ciudadano, a través de una perspectiva pedagógica.",
        "Es importante señalar que la UNESCO ratificó a Envigado como parte de la Red Global de Ciudades del Aprendizaje, designación que tiene desde 2022 y que le permite recibir y transferir buenas prácticas educativas de alto impacto global, como las que se tienen en temas como la promoción de habilidades STEM entre sus estudiantes.",
      ],
      imagenes: [
        "/ciudadaprendizaje/1.jpeg",
        "/ciudadaprendizaje/2.jpeg",
        "/ciudadaprendizaje/3.jpeg",
        "/ciudadaprendizaje/4.jpeg",
      ],
    },
    {
      id: "colombia-lider",
      titulo: "Envigado, referente nacional tras ganar el Reto Nacional por la Educación 2025",
      categoria: "Colombia Líder",
      autor: "Alcaldía de Envigado",
      fecha: "2025",
      resumen:
        "El Reto Nacional por la Educación 2025, promovido por la organización Colombia Líder, reconoce a los territorios que impulsan transformaciones significativas en sus sistemas educativos a través de políticas públicas innovadoras, inclusivas y orientadas al desarrollo social.",
      contenido: [
        "El Reto Nacional por la Educación 2025, promovido por la organización Colombia Líder, reconoce a los territorios que impulsan transformaciones significativas en sus sistemas educativos a través de políticas públicas innovadoras, inclusivas y orientadas al desarrollo social.",
        "En este escenario, el municipio de Envigado fue exaltado como ganador en la categoría IV (municipios con población superior a 100.001 habitantes), un reconocimiento que destaca los avances del territorio en inversión educativa, cobertura, calidad y formación integral para los estudiantes.",
        "La distinción se otorgó gracias a la mayor inversión presupuestal en educación, el fortalecimiento de programas para mejorar la calidad educativa y una cobertura superior al 99 %, así como a la implementación de estrategias que promueven habilidades blandas, competencias STEM+ y oportunidades de aprendizaje a lo largo de la vida.",
        "Entre las experiencias más destacadas del municipio se encuentra la formación STEM+ dirigida a más de mil estudiantes en áreas como robótica, programación e inteligencia artificial, iniciativas que preparan a los jóvenes para los retos de un mundo cada vez más tecnológico.",
        "También sobresale la articulación con instituciones técnicas, que permite que el 42,5 % de los estudiantes accedan a formación laboral y obtengan, además de su título como bachilleres, certificados de aptitud ocupacional al finalizar la educación media, ampliando así sus oportunidades de inserción en el mercado laboral.",
        "Otro de los programas reconocidos es la implementación de las Zonas de Orientación Escolar, espacios que brindan acompañamiento permanente a la salud mental de estudiantes y docentes, contribuyendo a reducir el estrés laboral y la deserción escolar dentro de las instituciones educativas.",
        "Para la Alcaldía de Envigado, este reconocimiento respalda los procesos de transformación educativa que se vienen adelantando en el municipio y que hoy lo consolidan como un territorio de oportunidades, guiado por la innovación, la creatividad y el compromiso con la calidad educativa.",
        "El reconocimiento fue entregado por Colombia Líder en alianza con Fundación Mujer, Fundación Saldarriaga Concha, Konrad Adenauer Stiftung, Drifting y Movistar Colombia, organizaciones que durante 2025 realizaron una evaluación rigurosa de las políticas públicas educativas en tres dimensiones clave: aprendizajes fundamentales, habilidades socioemocionales y formación pertinente para el mundo laboral, cada vez más competitivo y potenciado por la inteligencia artificial.",
        "Este logro posiciona a Envigado como un referente nacional en educación, demostrando cómo la inversión, la innovación y el bienestar de la comunidad educativa pueden transformar los territorios y generar mayores oportunidades para sus ciudadanos.",
      ],
      imagenes: ["/colombialider/1.jpeg", "/colombialider/2.jpg"],
    },
    {
      id: "nuevo-reconocimiento",
      titulo: "Reconocimiento a Instituciones Educativas de Envigado en las Olimpiadas STEM+ Colombia 2025",
      categoria: "Olimpiadas STEM+ Colombia 2025",
      autor: "Secretaría de Educación de Envigado",
      fecha: "2025",
      resumen:
        "En Cartagena de Indias se realizó la Gran Final Nacional de las Olimpiadas STEM+ Colombia 2025, donde instituciones educativas de Envigado fueron reconocidas con medalla de bronce en sus respectivas categorías.",
      contenido: [
        "En la ciudad de Cartagena de Indias se llevó a cabo la Gran Final Nacional de las Olimpiadas STEM+ Colombia 2025, un evento que reunió a los mejores proyectos escolares del país enfocados en ciencia, tecnología, ingeniería, matemáticas e innovación territorial.",
        "La final congregó 48 equipos seleccionados entre más de 500 propuestas provenientes de 78 Secretarías de Educación, quienes presentaron soluciones a problemáticas reales de sus territorios mediante proyectos científicos y tecnológicos.",
        "Durante la jornada, estudiantes de todo el país expusieron prototipos e iniciativas desarrolladas a lo largo del año en áreas como ciencias naturales, tecnologías emergentes, ingeniería e innovación comunitaria. El proceso se enmarca dentro de la Estrategia de Innovación Educativa y Formación Integral del Gobierno Nacional, que busca fortalecer el pensamiento científico desde la escuela.",
        "Protagonismo de Envigado en la final nacional.",
        "En este importante escenario nacional, dos instituciones educativas de Envigado lograron destacarse entre los mejores proyectos del país, obteniendo reconocimiento en sus respectivas categorías.",
        <>
          <strong>I.E. Manuel Uribe Ángel - Sede Marceliano Vélez. Medalla de Bronce - Categoría A Senior. Proyecto: Agrigirls STEM.</strong>
          <img
            src="/Olimpiadas%20STEM/I.E.%20Manuel%20Uribe%20%C3%81ngel.webp"
            alt="I.E. Manuel Uribe Ángel"
            loading="lazy"
            decoding="async"
            className="mt-3 w-full max-w-4xl rounded-lg border border-slate-200"
            onError={(e) => {
              e.currentTarget.src = "/Olimpiadas%20STEM/I.E.%20Manuel%20Uribe%20%C3%81ngel.jpg";
            }}
          />
        </>,
        <>
          <strong>I.E. Comercial de Envigado. Medalla de Bronce - Categoría B Senior. Proyecto: Defensores del Aire.</strong>
          <img
            src="/Olimpiadas%20STEM/I.E.%20Comercial%20de%20Envigado.webp"
            alt="I.E. Comercial de Envigado"
            loading="lazy"
            decoding="async"
            className="mt-3 w-full max-w-4xl rounded-lg border border-slate-200"
            onError={(e) => {
              e.currentTarget.src = "/Olimpiadas%20STEM/I.E.%20Comercial%20de%20Envigado.jpg";
            }}
          />
        </>,
        <>
          <strong>Estos resultados posicionan a Envigado como un referente en la promoción del talento científico escolar y evidencian el compromiso de sus instituciones educativas con la innovación y la formación integral de sus estudiantes.</strong>
        </>,
        <strong>Reconocimientos obtenidos.</strong>,
        "Los equipos que alcanzaron medalla de bronce en las Olimpiadas STEM+ Colombia 2025 recibieron: beca del 100% para los cinco integrantes del equipo en programas de pregrado de la oferta virtual y a distancia de UNIMINUTO.",
        "También recibieron participación en el FIRST LEGO League, temporada 2026-2027, uno de los programas internacionales más importantes de robótica y ciencia para estudiantes.",
        <strong>Innovación con impacto territorial.</strong>,
        "Agrigirls STEM, de la I.E. Manuel Uribe Ángel, propone soluciones innovadoras que integran tecnología y sostenibilidad para fortalecer procesos agrícolas.",
        "Defensores del Aire, de la I.E. Comercial de Envigado, desarrolla alternativas científicas orientadas a la sostenibilidad ambiental y a la búsqueda de nuevas fuentes de energía.",
        "Ambas iniciativas demuestran cómo la creatividad, el trabajo colaborativo y el pensamiento científico de los estudiantes pueden generar propuestas con impacto real en sus comunidades.",
        <strong>Un logro para la educación de Envigado.</strong>,
        "La participación y reconocimiento de estas instituciones en la final nacional de las Olimpiadas STEM+ Colombia 2025 resalta el talento, la dedicación y el compromiso de estudiantes y docentes que apuestan por la ciencia, la tecnología y la innovación como herramientas para transformar su entorno.",
        "Estos logros reflejan el potencial de la educación pública para formar agentes de cambio capaces de desarrollar soluciones innovadoras a los retos de sus territorios, consolidando a Envigado como un referente en el impulso de la educación STEM en Colombia.",
        <AutoPlayShortsEmbed videoId="7D9AshgwwZk" title="Olimpiadas STEM+ Colombia 2025 - video" />,
      ],
      imagenes: [
        "/Olimpiadas%20STEM/1.jpeg",
        "/Olimpiadas%20STEM/2.jpeg",
        "/Olimpiadas%20STEM/3.jpeg",
        "/Olimpiadas%20STEM/4.jpeg",
      ],
    },
    {
      id: "territorio-stem",
      titulo: "Envigado reconocido como territorio STEM+ por el Ministerio de Educación Nacional",
      categoria: "Reconocimiento STEM+",
      autor: "Ministerio de Educación Nacional",
      fecha: "2022",
      resumen:
        "El Ministerio de Educación Nacional, a través de la Oficina de Innovación, reconoció a Envigado como territorio STEM+ por su trabajo en el fortalecimiento de ciencia, tecnología, innovación, creatividad, arte e investigación en las instituciones educativas.",
      contenido: [
        "El Ministerio de Educación Nacional, a través de la Oficina de Innovación, reconoció a Envigado como territorio STEM+. La Ciudad Señorial fue destacada por su trabajo en el fortalecimiento de ciencia, tecnología, innovación, creatividad, arte e investigación en las instituciones educativas, un esfuerzo de la Administración Municipal, en cabeza del Alcalde Braulio Espinosa Márquez.",
        "Con este reconocimiento, Envigado tiene la posibilidad de identificar oportunidades y posibilidades a partir de la ciencia, la tecnología, la ingeniería y las matemáticas, además vincula al municipio a la red latinoamericana de territorios STEM, conformada por 13 países entre los cuales están Colombia, México, Brasil, Argentina, Chile, Perú y Ecuador. Esta red permite establecer estrategias innovadoras dentro de los currículos de cada institución educativa oficial y también, como es un solo ecosistema educativo, acercar a los colegios privados.",
        "Este reconocimiento posibilita intercambios con otras regiones, transferencia de conocimientos, circulación de saberes y la posibilidad de establecer alianzas estratégicas con el sector productivo que hacen parte de la red técnica STEM+, por eso la presencia de la Cámara de Comercio Aburrá Sur, en el evento de entrega de dicho reconocimiento.",
        "Además, este es un esfuerzo del cual también hacen parte los maestros, rectores, coordinadores y todo el programa de STEM Maker del Centro de Innovación y Desarrollo, que a través de los master teacher en cada colegio establece retos, desafíos para los estudiantes, logrando innovación, disrupción y evolución a partir del uso de las herramientas tecnológicas.",
      ],
      imagenes: [
        "/STEM/1.jpeg",
        "/STEM/2.jfif",
        "/STEM/3.jfif",
        "/STEM/4.jfif",
        "/STEM/5.jfif",
        "/STEM/6.jfif",
        "/STEM/7.jfif",
      ],
    },
    {
      id: "reconocimiento-adicional",
      titulo: "Reconocimiento nacional para Envigado en La Noche de los Mejores 2020",
      categoria: "Reconocimiento Nacional",
      autor: "Secretaría de Educación de Envigado",
      fecha: "2020",
      resumen:
        "La Secretaría de Educación de Envigado fue reconocida a nivel nacional durante la gala La Noche de los Mejores 2020, organizada por el Ministerio de Educación Nacional para destacar a quienes fortalecen y transforman la educación en Colombia.",
      contenido: [
        "La Secretaría de Educación de Envigado fue reconocida a nivel nacional durante la gala La Noche de los Mejores 2020, un evento organizado por el Ministerio de Educación Nacional para destacar a los actores del sector educativo que contribuyen al fortalecimiento y transformación de la educación en Colombia.",
        "En esta edición, el Ministerio otorgó un reconocimiento especial a la Secretaría de Educación de Envigado por su ecosistema de innovación educativa, el cual permitió acompañar y fortalecer el proceso educativo desde casa durante la pandemia por COVID-19. Este reconocimiento resalta las estrategias implementadas por el municipio para garantizar la continuidad del aprendizaje y apoyar a estudiantes, docentes y familias en un momento de grandes desafíos para el sistema educativo.",
        "La ceremonia se llevó a cabo el 4 de diciembre de 2020 en Bogotá D.C., y reunió a representantes de todo el país para exaltar el trabajo de docentes, directivos, estudiantes, instituciones educativas y entidades territoriales comprometidas con la calidad y la innovación educativa.",
        "Durante la gala, la entonces ministra de Educación, María Victoria Angulo, destacó la importancia de reconocer a quienes, con dedicación y compromiso, contribuyen a construir una educación de calidad, inclusiva y con mayores oportunidades para niños, niñas y jóvenes en todo el territorio nacional.",
        "Este reconocimiento representa un logro colectivo para el municipio de Envigado y para todo su ecosistema educativo. El trabajo articulado entre funcionarios de la Secretaría, directivos docentes, maestros, personal administrativo, estudiantes, padres de familia y líderes comunitarios ha sido fundamental para desarrollar iniciativas que fortalezcan la educación y permitan afrontar los retos del sector.",
        "La distinción obtenida en La Noche de los Mejores 2020 reafirma el compromiso de Envigado con la innovación educativa y con la construcción de un sistema educativo que responda a las necesidades de la comunidad y contribuya al desarrollo de la ciudad.",
        "Este premio es también un reconocimiento al esfuerzo, la dedicación y la convicción de quienes día a día trabajan por la educación en el municipio, demostrando que el trabajo en equipo y el compromiso con la formación de las nuevas generaciones generan resultados que trascienden a nivel nacional.",
      ],
      imagenes: [
        "/la%20noche%20de%20los%20mejores/articles-402464_recurso_2.jpg",
        "/la%20noche%20de%20los%20mejores/la%20noche%20de%20los%20mejores.jpg",
      ],
      video: {
        url: "https://www.youtube.com/live/g855oPTgaf0?si=Hu8NxFM6w4XdkZSn",
        startSeconds: 12309,
        endSeconds: 12404,
      },
    },
  ];

  const orderedNewsIds = [
    "ciudad-aprendizaje",
    "colombia-lider",
    "nuevo-reconocimiento",
    "territorio-stem",
    "reconocimiento-adicional",
  ];

  const orderedNoticias = orderedNewsIds
    .map((id) => noticias.find((noticia) => noticia.id === id))
    .filter((noticia): noticia is Noticia => Boolean(noticia));
  const categoriesCount = new Set(orderedNoticias.map((item) => item.categoria)).size;

  // ===== Filtros (buscador + categoría + año) =====
  const normalizarTexto = (t: string) =>
    t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const extraerAnio = (fecha: string) => fecha.match(/\d{4}/)?.[0] ?? "";

  const categoriasDisponibles = Array.from(
    new Set(orderedNoticias.map((n) => n.categoria))
  ).sort((a, b) => a.localeCompare(b));
  const aniosDisponibles = Array.from(
    new Set(orderedNoticias.map((n) => extraerAnio(n.fecha)).filter(Boolean))
  ).sort((a, b) => Number(b) - Number(a));

  const noticiasVisibles = orderedNoticias.filter((noticia) => {
    const texto = normalizarTexto(
      `${noticia.titulo} ${noticia.resumen} ${noticia.categoria} ${noticia.autor}`
    );
    const coincideBusqueda =
      searchTerm.trim() === "" || texto.includes(normalizarTexto(searchTerm.trim()));
    const coincideCategoria = categoriaFiltro === "" || noticia.categoria === categoriaFiltro;
    const coincideAnio = anioFiltro === "" || extraerAnio(noticia.fecha) === anioFiltro;
    return coincideBusqueda && coincideCategoria && coincideAnio;
  });

  const hayFiltrosActivos =
    searchTerm.trim() !== "" || categoriaFiltro !== "" || anioFiltro !== "";
  const limpiarFiltros = () => {
    setSearchTerm("");
    setCategoriaFiltro("");
    setAnioFiltro("");
  };

  const goPrevImage = () => {
    if (!selectedNews) return;
    setCurrentImage((prev) => (prev === 0 ? selectedNews.imagenes.length - 1 : prev - 1));
  };

  const goNextImage = () => {
    if (!selectedNews) return;
    setCurrentImage((prev) => (prev === selectedNews.imagenes.length - 1 ? 0 : prev + 1));
  };

  const openNoticia = (news: Noticia) => {
    news.imagenes.forEach((src) => preloadImage(getOptimizedImageSrc(src)));
    setCurrentImage(0);
    setSelectedNews(news);
  };

  useEffect(() => {
    if (!selectedNews) return;

    const total = selectedNews.imagenes.length;
    const nextIndex = (currentImage + 1) % total;
    const prevIndex = (currentImage - 1 + total) % total;

    preloadImage(getOptimizedImageSrc(selectedNews.imagenes[nextIndex]));
    preloadImage(getOptimizedImageSrc(selectedNews.imagenes[prevIndex]));
  }, [selectedNews, currentImage]);

  return (
    <div className="min-h-screen">
      {/* ===== HERO / BANNER (full-bleed, hasta el tope detrás del header) ===== */}
      <section className="relative isolate overflow-hidden text-white">
        {/* Degradado base petróleo -> teal */}
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(115deg,#11212e_0%,#0D4B56_46%,#0e6e72_74%,#11B2AA_100%)]" />
        {/* Brillo teal a la derecha */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(70%_120%_at_88%_22%,rgba(17,178,170,0.55)_0%,rgba(17,178,170,0)_60%)]" />
        {/* Acentos suaves de marca */}
        <div className="pointer-events-none absolute -right-28 -top-28 -z-10 h-80 w-80 rounded-full bg-[#FFDE07]/12 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 -bottom-20 -z-10 h-72 w-72 rounded-full bg-[#EC6910]/12 blur-3xl" />
        {/* Filo inferior */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/10" />

        <div className="container relative pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-black leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
              Reconocimientos
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-cyan-50/90 sm:text-lg">
              Un recorrido por los logros que posicionan a Envigado como referente en innovación, educación y transformación territorial.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-medium backdrop-blur-sm">
                <Award className="h-4 w-4 text-[#FFDE07]" />
                {orderedNoticias.length} historias destacadas
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-medium backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-[#FFDE07]" />
                {categoriesCount} categorías
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTENIDO ===== */}
      <div className="container py-10">
        <Breadcrumbs items={[{ label: "Reconocimientos" }]} />

        {/* ===== FILTROS (buscador + categoría + año) ===== */}
        <div className="mt-4 mb-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
            <div className="relative w-full sm:w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0D4B56]/60" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar reconocimientos..."
                className="w-full rounded-lg border border-[#0D4B56]/25 bg-white py-2 pl-9 pr-3 text-sm text-[#182130] outline-none transition-colors focus:border-[#0D4B56] focus:ring-1 focus:ring-[#0D4B56]/30"
              />
            </div>

            <select
              value={categoriaFiltro}
              onChange={(e) => setCategoriaFiltro(e.target.value)}
              className="w-full rounded-lg border border-[#0D4B56]/25 bg-white py-2 px-3 text-sm text-[#182130] outline-none transition-colors focus:border-[#0D4B56] focus:ring-1 focus:ring-[#0D4B56]/30 sm:w-auto"
            >
              <option value="">Todas las categorías</option>
              {categoriasDisponibles.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              value={anioFiltro}
              onChange={(e) => setAnioFiltro(e.target.value)}
              className="w-full rounded-lg border border-[#0D4B56]/25 bg-white py-2 px-3 text-sm text-[#182130] outline-none transition-colors focus:border-[#0D4B56] focus:ring-1 focus:ring-[#0D4B56]/30 sm:w-auto"
            >
              <option value="">Todos los años</option>
              {aniosDisponibles.map((a) => (
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
              {noticiasVisibles.length}{" "}
              {noticiasVisibles.length === 1 ? "resultado" : "resultados"}
            </p>
          )}
        </div>

        {noticiasVisibles.length === 0 ? (
          <div className="py-12 text-center">
            <Award className="mx-auto mb-4 h-12 w-12 text-[#0D4B56]/40" />
            <p className="text-[#0D4B56]">No se encontraron reconocimientos con esos filtros.</p>
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
          <div className="grid md:grid-cols-2 gap-6">
            {noticiasVisibles.map((noticia) => (
            <button
              key={noticia.id}
              onClick={() => openNoticia(noticia)}
              className="text-left overflow-hidden rounded-xl border border-border bg-white hover:shadow-lg transition-shadow"
            >
              <div className="h-56 bg-muted overflow-hidden">
                <picture>
                  <source srcSet={getOptimizedImageSrc(noticia.imagenes[0])} type="image/webp" />
                  <img
                    src={getOptimizedImageSrc(noticia.imagenes[0])}
                    alt={noticia.titulo}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    className={`w-full h-full ${getImageFitClass(noticia.id, 0)} ${getImagePositionClass(noticia.id, 0)}`}
                    onError={(e) => {
                      e.currentTarget.src = noticia.imagenes[0];
                    }}
                  />
                </picture>
              </div>
              <div className="p-5 space-y-2">
                <span className="text-xs font-bold text-[#EC6910] uppercase tracking-wider">{noticia.categoria}</span>
                <h2 className="text-xl font-bold text-[#182130] leading-snug">{noticia.titulo}</h2>
                <p className="text-sm text-[#023A34]">
                  <span className="font-medium">Fecha de publicación:</span> {noticia.fecha}
                </p>
                <p className="text-sm text-[#2D3586] font-semibold pt-1">Abrir noticia</p>
              </div>
            </button>
          ))}
          </div>
        )}
      </div>

      {selectedNews && (
        <div className="fixed inset-0 z-50 bg-black/60 p-4 overflow-y-auto" onClick={() => setSelectedNews(null)}>
          <div className="min-h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-bold">Noticia</h3>
                <button onClick={() => setSelectedNews(null)} className="p-1 rounded hover:bg-muted" aria-label="Cerrar noticia">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 md:p-8 max-h-[85vh] overflow-y-auto">
                <div className="mb-4">
                  <span className="text-sm font-bold text-[#EC6910] uppercase tracking-wider">{selectedNews.categoria}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-[#182130] mb-4 leading-tight">{selectedNews.titulo}</h1>
                <p className="text-lg text-[#023A34] mb-6 leading-relaxed">{selectedNews.resumen}</p>

                <div className="flex items-center gap-6 text-sm text-[#0D4B56] border-t border-b border-slate-300 py-4 mb-8">
                  <span className="font-semibold text-[#182130]">{selectedNews.autor}</span>
                  <span>
                    <span className="font-medium text-[#182130]">Fecha de publicación:</span> {selectedNews.fecha}
                  </span>
                </div>

                <div className="mb-8 rounded-lg overflow-hidden shadow-xl bg-muted relative">
                  {selectedNews.imagenes.length > 1 && (
                    <div className="hidden" aria-hidden="true">
                      <img src={getOptimizedImageSrc(selectedNews.imagenes[(currentImage + 1) % selectedNews.imagenes.length])} alt="" />
                      <img src={getOptimizedImageSrc(selectedNews.imagenes[(currentImage - 1 + selectedNews.imagenes.length) % selectedNews.imagenes.length])} alt="" />
                    </div>
                  )}
                  <picture>
                    <source srcSet={getOptimizedImageSrc(selectedNews.imagenes[currentImage])} type="image/webp" />
                    <img
                      src={getOptimizedImageSrc(selectedNews.imagenes[currentImage])}
                      alt={selectedNews.titulo}
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
                      className={`w-full ${getModalImageHeightClass(selectedNews.id, currentImage)} ${getImageFitClass(selectedNews.id, currentImage, true)} ${getImagePositionClass(selectedNews.id, currentImage)}`}
                      onError={(e) => {
                        e.currentTarget.src = selectedNews.imagenes[currentImage];
                      }}
                    />
                  </picture>

                  <button
                    onClick={goPrevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/45 text-white text-xl hover:bg-black/60 transition-colors"
                    aria-label="Imagen anterior"
                  >
                    ‹
                  </button>
                  <button
                    onClick={goNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/45 text-white text-xl hover:bg-black/60 transition-colors"
                    aria-label="Imagen siguiente"
                  >
                    ›
                  </button>

                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 bg-black/25 px-3 py-1 rounded-full">
                    {selectedNews.imagenes.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImage(idx)}
                        className={`w-2.5 h-2.5 rounded-full transition-colors ${
                          currentImage === idx ? "bg-white" : "bg-white/50"
                        }`}
                        aria-label={`Ir a imagen ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
                  {selectedNews.contenido.map((parrafo, idx) =>
                    typeof parrafo === "string" ? (
                      <p key={idx} className="text-lg text-[#0D4B56] leading-relaxed">
                        {parrafo}
                      </p>
                    ) : (
                      <div key={idx} className="text-lg text-[#0D4B56] leading-relaxed">
                        {parrafo}
                      </div>
                    )
                  )}

                  {selectedNews.video && (
                    <div className="pt-4">
                      <h4 className="font-semibold text-[#182130] mb-3">Video relacionado</h4>
                      <div className="rounded-lg overflow-hidden border border-slate-200 shadow-sm w-full max-w-4xl">
                        <div className="w-full h-[320px] md:h-[520px]">
                          <iframe
                            src={getYouTubeClipUrl(selectedNews.video)}
                            title={`${selectedNews.titulo} - video`}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
