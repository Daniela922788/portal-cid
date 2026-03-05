import { useState } from "react";
import { X } from "lucide-react";

type Noticia = {
  id: string;
  titulo: string;
  categoria: string;
  autor: string;
  fecha: string;
  resumen: string;
  contenido: string[];
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
  const toWebp = (imagePath: string) => imagePath.replace(/\.(jpe?g|png|jfif)$/i, ".webp");
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
    if (newsId === "colombia-lider" && imageIndex === 0) {
      return "object-[50%_28%]";
    }
    if (newsId === "territorio-stem") {
      return "object-[50%_24%]";
    }
    return "object-center";
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

  const goPrevImage = () => {
    if (!selectedNews) return;
    setCurrentImage((prev) => (prev === 0 ? selectedNews.imagenes.length - 1 : prev - 1));
  };

  const goNextImage = () => {
    if (!selectedNews) return;
    setCurrentImage((prev) => (prev === selectedNews.imagenes.length - 1 ? 0 : prev + 1));
  };

  const openNoticia = (news: Noticia) => {
    setCurrentImage(0);
    setSelectedNews(news);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-3">Reconocimientos</h1>
          <p className="text-lg text-muted-foreground">Logros destacados del territorio.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {noticias.map((noticia) => (
            <button
              key={noticia.id}
              onClick={() => openNoticia(noticia)}
              className="text-left overflow-hidden rounded-xl border border-border bg-white hover:shadow-lg transition-shadow"
            >
              <div className="h-56 bg-muted overflow-hidden">
                <picture>
                  <source srcSet={toWebp(noticia.imagenes[0])} type="image/webp" />
                  <img
                    src={noticia.imagenes[0]}
                    alt={noticia.titulo}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    className={`w-full h-full ${getImageFitClass(noticia.id, 0)} ${getImagePositionClass(noticia.id, 0)}`}
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=700&fit=crop";
                    }}
                  />
                </picture>
              </div>
              <div className="p-5 space-y-2">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">{noticia.categoria}</span>
                <h2 className="text-xl font-bold text-slate-900 leading-snug">{noticia.titulo}</h2>
                <p className="text-sm text-blue-700 font-semibold pt-1">Abrir noticia</p>
              </div>
            </button>
          ))}
        </div>
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
                  <span className="text-sm font-bold text-amber-600 uppercase tracking-wider">{selectedNews.categoria}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">{selectedNews.titulo}</h1>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">{selectedNews.resumen}</p>

                <div className="flex items-center gap-6 text-sm text-slate-500 border-t border-b border-slate-300 py-4 mb-8">
                  <span className="font-semibold text-slate-700">{selectedNews.autor}</span>
                  <span>{selectedNews.fecha}</span>
                </div>

                <div className="mb-8 rounded-lg overflow-hidden shadow-xl bg-muted relative">
                  <picture>
                    <source srcSet={toWebp(selectedNews.imagenes[currentImage])} type="image/webp" />
                    <img
                      src={selectedNews.imagenes[currentImage]}
                      alt={selectedNews.titulo}
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                      className={`w-full ${getModalImageHeightClass(selectedNews.id, currentImage)} ${getImageFitClass(selectedNews.id, currentImage, true)} ${getImagePositionClass(selectedNews.id, currentImage)}`}
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=700&fit=crop";
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
                  {selectedNews.contenido.map((parrafo, idx) => (
                    <p key={idx} className="text-lg text-slate-700 leading-relaxed">
                      {parrafo}
                    </p>
                  ))}

                  {selectedNews.video && (
                    <div className="pt-4">
                      <h4 className="font-semibold text-slate-900 mb-3">Video relacionado</h4>
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
