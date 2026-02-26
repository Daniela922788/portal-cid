import { useState } from "react";
import { X, Eye } from "lucide-react";

export default function Reconocimientos() {
  const [openNews, setOpenNews] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const noticiaEnvigado = {
    titulo: "Envigado recibió reconocimiento por sus buenas prácticas en Foro Latinoamericano de Ciudades del Aprendizaje",
    boletin: "Boletín 243 - 6 de noviembre de 2025",
    categoria: "Reconocimiento UNESCO",
    autor: "Municipio de Envigado",
    fecha: "6 de noviembre de 2025",
    imagen: "/images/reconocimiento-envigado.jpg",
    resumen:
      "El Municipio de Envigado recibió el reconocimiento otorgado por la Red Latinoamericana de Ciudades del Aprendizaje por su experiencia Construyendo futuro: territorio STEM + SMART Regenerativo.",
    contenido: [
      "El Municipio de Envigado recibió el reconocimiento otorgado por la Red Latinoamericana de Ciudades del Aprendizaje por su experiencia Construyendo futuro: territorio STEM + SMART Regenerativo, teniendo en cuenta las buenas prácticas que se implementan en el territorio y que apuntan a la implementación de programas de aprendizaje para el cierre de la brecha digital y el desarrollo de competencias en docentes y estudiantes, en función de su contexto socioeconómico y su sentido de pertenencia hacia el municipio. La entrega del reconocimiento se llevó a cabo en ceremonia oficial desde la ciudad de La Paz (México), dentro del Tercer Foro de Ciudades del Aprendizaje de Latinoamérica Aprendizaje basado en el lugar.",
      "La experiencia presentada desde Envigado proyecta el territorio con la promoción de estrategias y experiencias de aprendizaje a lo largo de la vida, para desarrollar competencias, conocimientos, actitudes y valores a través de procesos de investigación, promoción de la ciencia, la tecnología y la innovación. En el sistema educativo local se entiende lo regenerativo como una apuesta que hace énfasis en la sostenibilidad, el pensamiento crítico, la conciencia ambiental, la equidad y el compromiso ciudadano, a través de una perspectiva pedagógica.",
      "Es importante señalar que la UNESCO ratificó a Envigado como parte de la Red Global de Ciudades del Aprendizaje, designación que tiene desde 2022 y que le permite recibir y transferir buenas prácticas educativas de alto impacto global, como las que se tienen en temas como la promoción de habilidades STEM entre sus estudiantes.",
    ],
    views: 3120,
    likes: 456,
    comments: 124,
    shares: 78,
  };

  const carouselImages = [
    "/ciudadaprendizaje/146814_whatsapp-image-20251106-at-71037-am_1024x600.jpeg",
    "/ciudadaprendizaje/146816_145350_315a0044_1024x600_1024x600.jpg",
    "/ciudadaprendizaje/146817_whatsapp-image-20250922-at-103715-am_1024x600.jpeg",
    "/ciudadaprendizaje/146818_whatsapp-image-20251017-at-23058-pm_1024x600.jpeg",
    "/ciudadaprendizaje/146819_whatsapp-image-20251106-at-111733-am_1024x600.jpeg",
    "/ciudadaprendizaje/146820_315a9764_1024x600.jpg",
    "/ciudadaprendizaje/146822_envigado-fue-reconocido-por-sus-buenas-practicas-en_1024x600.jpeg",
  ];

  const goPrevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };

  const goNextImage = () => {
    setCurrentImage((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
  };

  const openNoticia = () => {
    setCurrentImage(0);
    setOpenNews(true);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-3">Reconocimientos</h1>
          <p className="text-lg text-muted-foreground">Logros destacados del territorio.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={openNoticia}
            className="text-left overflow-hidden rounded-xl border border-border bg-white hover:shadow-lg transition-shadow"
          >
            <div className="h-52 bg-muted overflow-hidden">
              <img
                src={carouselImages[0]}
                alt={noticiaEnvigado.titulo}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=700&fit=crop";
                }}
              />
            </div>
            <div className="p-5 space-y-2">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">{noticiaEnvigado.categoria}</span>
              <h2 className="text-xl font-bold text-slate-900 leading-snug">{noticiaEnvigado.titulo}</h2>
              <p className="text-sm text-muted-foreground">{noticiaEnvigado.boletin}</p>
              <p className="text-sm text-blue-700 font-semibold pt-1">Abrir noticia</p>
            </div>
          </button>
        </div>
      </div>

      {openNews && (
        <div className="fixed inset-0 z-50 bg-black/60 p-4 overflow-y-auto" onClick={() => setOpenNews(false)}>
          <div className="min-h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-bold">Noticia</h3>
                <button onClick={() => setOpenNews(false)} className="p-1 rounded hover:bg-muted" aria-label="Cerrar noticia">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 md:p-8 max-h-[85vh] overflow-y-auto">
                <div className="mb-4">
                  <span className="text-sm font-bold text-amber-600 uppercase tracking-wider">{noticiaEnvigado.categoria}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">{noticiaEnvigado.titulo}</h1>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">{noticiaEnvigado.resumen}</p>

                <div className="flex items-center gap-6 text-sm text-slate-500 border-t border-b border-slate-300 py-4 mb-8">
                  <span className="font-semibold text-slate-700">{noticiaEnvigado.autor}</span>
                  <span>{noticiaEnvigado.fecha}</span>
                  <div className="flex items-center gap-1 ml-auto">
                    <Eye className="w-4 h-4" />
                    <span>{noticiaEnvigado.views.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mb-8 rounded-lg overflow-hidden shadow-xl bg-muted relative">
                  <img
                    src={carouselImages[currentImage]}
                    alt={noticiaEnvigado.titulo}
                    className="w-full h-[420px] object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=700&fit=crop";
                    }}
                  />

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
                    {carouselImages.map((_, idx) => (
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
                  <p className="font-semibold text-slate-900">{noticiaEnvigado.boletin}</p>
                  {noticiaEnvigado.contenido.map((parrafo, idx) => (
                    <p key={idx} className="text-lg text-slate-700 leading-relaxed">
                      {parrafo}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
