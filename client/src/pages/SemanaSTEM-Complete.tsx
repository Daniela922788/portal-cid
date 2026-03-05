/**
 * COMPONENTE SEMANA STEM+ COMPLETO
 * 
 * DEPENDENCIAS NECESARIAS:
 * npm install framer-motion lucide-react
 * 
 * REQUISITOS:
 * - React 18+
 * - Tailwind CSS 3+
 * - TypeScript (opcional)
 * 
 * USO:
 * import SemanaSTEM from './SemanaSTEM';
 * 
 * <SemanaSTEM />
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function SemanaSTEM() {
  const [bannerSrc, setBannerSrc] = useState('/images/semana-stem-banner.png');
  const [activeYear, setActiveYear] = useState(2025);
  const [activeDay, setActiveDay] = useState(1);
  const speakerImage = (fileName: string) => `/ponentes/martes/${encodeURIComponent(fileName)}`;
  const toWebp = (imagePath: string) => imagePath.replace(/\.(jpe?g|png)$/i, '.webp');

  // Datos del Día 1 - Martes
  const day1Sessions = [
    {
      time: '07:30 a.m.',
      title: 'Apertura',
      description: 'El foro dio inicio como un espacio de encuentro y reflexión en el marco de la Semana STEM+ Envigado 2025, resaltando el compromiso del territorio con una educación transformadora, ética y conectada con los desafíos del siglo XXI. Se destacó el reconocimiento de Envigado como Ciudad del Aprendizaje y la importancia de construir conocimiento con sentido territorial',
      speakers: [],
      icon: '🚀',
      color: 'from-orange-400 to-orange-600',
    },
    {
      time: '08:00 a.m.',
      title: 'Ética de la Inteligencia Artificial',
      description: 'La ponencia abordó los principales dilemas éticos del uso de la inteligencia artificial en la educación, enfatizando que la IA no es una amenaza ni una salvación, sino una herramienta que requiere intención pedagógica, equilibrio y responsabilidad. Se resaltó el papel del docente como mediador ético, la importancia del pensamiento crítico y creativo, y la necesidad de formar estudiantes conscientes del valor de la autoría, los datos y el uso responsable de la tecnología',
      speakers: [
        {
          name: 'Diana Marcela Parra',
          organization: 'Municipio de Copacabana',
          role: 'Secretaria de Educación',
          image: speakerImage('Diana Marcela Parra.png'),
        },
      ],
      icon: '🤖',
      color: 'from-blue-400 to-blue-600',
      eCardImage: '/Semana%20STEM/23/Agenda/Etica-inteligencia.jpeg',
    },
    {
      time: '08:45 a.m.',
      title: 'Innovación Educativa: De la Idea al Impacto con Tecnología',
      description: 'En este conversatorio se reflexionó sobre cómo la infraestructura tecnológica solo genera impacto cuando se articula con el contexto, la pedagogía y las necesidades reales de los territorios. Se destacó la importancia de la formación docente, la apropiación de la tecnología y la construcción de alianzas multisectoriales para lograr proyectos sostenibles que transformen comunidades y reduzcan brechas educativas',
      speakers: [
        {
          name: 'Jorge Ramírez Marín',
          organization: 'Lenovo',
          role: 'Gerente comercial sector relacional',
          image: speakerImage('Jorge Ramírez Marín.png'),
        },
        {
          name: 'Yorfarly Aristizabal Morales',
          organization: 'Microsoft Colombia',
          role: 'Gerente de la unidad de distribuidores',
          image: speakerImage('Yorfarly Aristizabal Morales.png'),
        },
        {
          name: 'Juan José Cardona',
          organization: 'Talentum',
          role: 'Gerente T.I.',
          image: speakerImage('Juan José Cardona.png'),
        },
      ],
      icon: '💡',
      color: 'from-purple-400 to-purple-600',
      eCardImage: '/Semana%20STEM/23/Agenda/Conversatorio-innovacion.jpeg',
    },
    {
      time: '09:30 a.m.',
      title: 'Receso',
      description: 'Espacio de pausa para el intercambio informal, la reflexión y el fortalecimiento de redes entre los participantes.',
      speakers: [],
      icon: '☕',
      color: 'from-yellow-400 to-yellow-600',
    },
    {
      time: '10:00 a.m.',
      title: 'Primera Infancia y STEM',
      description: 'La ponencia presentó el enfoque STEM como una forma de aprender desde la primera infancia a través de experiencias cotidianas, metodologías activas y la resolución de problemas reales. Se destacó que STEM no depende de la tecnología, sino del desarrollo de competencias para la vida como la creatividad, el pensamiento crítico y la colaboración, con educadores que actúan como mediadores del aprendizaje',
      speakers: [
        {
          name: 'Vianey Johana Salazar Villegas',
          organization: 'United Way Colombia',
          role: 'Coordinadora de impacto de la regional noroccidente',
          image: speakerImage('Vianey Johana Salazar Villegas.png'),
        },
      ],
      icon: '👶',
      color: 'from-pink-400 to-pink-600',
      eCardImage: '/Semana%20STEM/23/Agenda/Primera-infancia.jpeg',
    },
    {
      time: '10:45 a.m.',
      title: 'Conversatorio: Retos en Educación STEM para el Siglo XXI',
      description: 'El conversatorio permitió identificar que los principales retos del enfoque STEM son culturales, pedagógicos y territoriales. Los ponentes coincidieron en la necesidad de fortalecer la formación docente, derribar barreras mentales, trabajar en red y conectar la educación con la sostenibilidad y el contexto productivo, entendiendo el error como parte del aprendizaje y la innovación como un proceso colectivo',
      speakers: [
        {
          name: 'Sandra Milena Gaviria Peña',
          organization: 'Colegio Benedictino',
          role: 'Coordinación académica',
          image: speakerImage('Sandra Milena Gaviria Peña.png'),
        },
        {
          name: 'Tatiana Jiménez Hoyos',
          organization: 'AtlanttiCO EdTech',
          role: 'Directora estratégica',
          image: speakerImage('Tatiana Jiménez Hoyos.png'),
        },
        {
          name: 'Diego Alonso Gómez Gonzáles',
          organization: 'I.E Jose Manuel Restrepo Velez',
          role: 'Docente',
          image: speakerImage('Diego Alonso Gómez Gonzáles.png'),
        },
        {
          name: 'Daniela López Montoya',
          organization: 'Provincia Cartama',
          role: 'Líder de proyectos y gestión de alianzas de la Provincia de Administración y Planificación Cartama',
          image: speakerImage('Daniela López Montoya.png'),
        },
      ],
      icon: '🎯',
      color: 'from-green-400 to-green-600',
      eCardImage: '/Semana%20STEM/23/Agenda/Conversatorio-retos.jpeg',
    },
    {
      time: '11:30 a.m.',
      title: 'Redes Colaborativas de Trabajo STEM+',
      description: 'Se presentó la experiencia de las redes colaborativas como una estrategia clave para fortalecer la práctica docente y la integración curricular. A través del ejemplo de STEM LATAM, se resaltó el valor del trabajo entre pares, la mentoría, los recursos educativos abiertos y la identificación de problemáticas locales como punto de partida para construir comunidades educativas con propósito e impacto',
      speakers: [
        {
          name: 'Mag. Daniel Andrés Quiroz Vallejo',
          organization: 'Red STEM+ Latinoamérica',
          role: 'Mesa pensamiento computacional',
          image: speakerImage('Mag. Daniel Andrés Quiroz Vallejo.png'),
        },
      ],
      icon: '🤝',
      color: 'from-cyan-400 to-cyan-600',
      eCardImage: '/Semana%20STEM/23/Agenda/Redes-colaborativas.jpeg',
    },
    {
      time: '12:30 p.m.',
      title: 'Clausura',
      description: 'La jornada concluyó reafirmando que la transformación educativa no depende solo de la tecnología, sino de una visión ética, colaborativa y contextualizada. El foro dejó como invitación seguir construyendo alianzas, repensar las prácticas educativas y asumir la innovación como un camino colectivo para transformar vidas y territorios',
      speakers: [],
      icon: '✨',
      color: 'from-red-400 to-red-600',
    },
  ];

  const galleryImages = [
    '/Semana%20STEM/23/Galeria/1.jpg',
    '/Semana%20STEM/23/Galeria/2.jpg',
    '/Semana%20STEM/23/Galeria/3.jpg',
    '/Semana%20STEM/23/Galeria/4.jpg',
    '/Semana%20STEM/23/Galeria/5.jpg',
    '/Semana%20STEM/23/Galeria/6.jpg',
  ];

  const daysNavigation = [
    { day: 'Martes', date: '23', index: 1, icon: '🚀' },
    { day: 'Miércoles', date: '24', index: 2, icon: '🤖' },
    { day: 'Jueves', date: '25', index: 3, icon: '💡' },
    { day: 'Viernes', date: '26', index: 4, icon: '🌍' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Year Tabs Section */}
      <section className="py-6 px-4 bg-white border-b-2 border-gray-300">
        <div className="max-w-6xl mx-auto flex justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveYear(2025)}
            className={`px-8 py-3 rounded-lg font-bold text-lg transition-all ${
              activeYear === 2025
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            2025
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveYear(2026)}
            className={`px-8 py-3 rounded-lg font-bold text-lg transition-all ${
              activeYear === 2026
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            2026
          </motion.button>
        </div>
      </section>

      {/* Content based on year */}
      {activeYear === 2025 ? (
        <>
          {/* Hero Section */}
          <section className="relative min-h-[60vh] bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 text-center px-4"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="text-7xl mb-6 inline-block"
              >
                🚀
              </motion.div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                Semana STEM+
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-2">
                Envigado 2025
              </p>
              <p className="text-lg text-white/80">
                Tendencias que Transforman: Educación, Tecnología y Ética
              </p>
            </motion.div>
          </section>

          {/* Days Navigation */}
          <section className="py-12 px-4 bg-white border-b border-gray-200">
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-center items-center gap-8 flex-wrap">
                {daysNavigation.map((dayNav, idx) => {
                  const colors = [
                    'from-orange-400 to-orange-600',
                    'from-blue-400 to-blue-600',
                    'from-purple-400 to-purple-600',
                    'from-green-400 to-green-600',
                  ];
                  return (
                    <motion.button
                      key={dayNav.index}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveDay(dayNav.index)}
                      className={`w-40 h-40 rounded-full font-bold transition-all flex flex-col items-center justify-center shadow-lg hover:shadow-xl ${
                        activeDay === dayNav.index
                          ? `bg-gradient-to-br ${colors[idx]} text-white scale-110`
                          : `bg-gradient-to-br ${colors[idx]} text-white opacity-70 hover:opacity-100`
                      }`}
                    >
                      <span className="text-6xl mb-2">{dayNav.icon}</span>
                      <div className="flex flex-col items-center text-center">
                        <span className="font-bold text-base">{dayNav.day}</span>
                        <span className="text-sm mt-1 opacity-90">{dayNav.date}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Content Section - Show Martes (Day 1) */}
          {activeDay === 1 && (
            <div>
              <section className="px-4 py-8 bg-white">
                <div className="max-w-6xl mx-auto overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src={bannerSrc}
                    alt="Banner Semana STEM"
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    className="w-full h-auto object-cover"
                    onError={() => {
                      if (bannerSrc === '/images/semana-stem-banner.png') {
                        setBannerSrc('/images/semana-stem-banner.jpg');
                        return;
                      }
                      if (bannerSrc === '/images/semana-stem-banner.jpg') {
                        setBannerSrc('/semana-stem-banner.png');
                        return;
                      }
                      if (bannerSrc === '/semana-stem-banner.png') {
                        setBannerSrc('/semana-stem-banner.jpg');
                      }
                    }}
                  />
                </div>
              </section>

              <section className="py-12 px-4 max-w-6xl mx-auto">
                <h3 className="text-3xl font-bold mb-8 text-gray-800">Agenda del Día</h3>
                <div className="space-y-4">
                  {day1Sessions.map((session, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white border border-gray-200 rounded-lg p-6 text-gray-900 shadow-lg hover:shadow-xl transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-4">
                          <span className="text-4xl">{session.icon}</span>
                          <div>
                            <p className="text-sm font-semibold opacity-90">{session.time}</p>
                            <h3 className="text-2xl font-bold">{session.title}</h3>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-gray-700 mb-6 leading-relaxed">{session.description}</p>

                        {'eCardImage' in session && session.eCardImage && (
                          <div className="mb-2">
                            <picture>
                              <source srcSet={toWebp(session.eCardImage)} type="image/webp" />
                              <img
                                src={session.eCardImage}
                                alt={session.title}
                                loading="lazy"
                                decoding="async"
                                fetchPriority="low"
                                className="w-full rounded-lg shadow-lg"
                              />
                            </picture>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Highlights */}
              <section className="py-12 px-4 max-w-6xl mx-auto">
                <h3 className="text-3xl font-bold mb-8 text-gray-800">Momentos Destacados</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { icon: '🎓', title: 'Educación Transformadora', desc: 'La tecnología es una herramienta, no la solución' },
                    { icon: '⚖️', title: 'Ética en IA', desc: 'Intención pedagógica y responsabilidad digital' },
                    { icon: '🌐', title: 'Trabajo en Red', desc: 'Colaboración multisectorial para el impacto' },
                    { icon: '🗺️', title: 'Contexto Territorial', desc: 'Soluciones adaptadas a necesidades locales' },
                  ].map((highlight, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      <p className="text-4xl mb-3">{highlight.icon}</p>
                      <h4 className="font-bold text-lg mb-2">{highlight.title}</h4>
                      <p className="text-gray-600 text-sm">{highlight.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Gallery */}
              <section className="py-12 px-4 max-w-6xl mx-auto">
                <h3 className="text-3xl font-bold mb-8 text-gray-800">Galería de Fotos</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {galleryImages.map((image, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                    >
                      <picture>
                        <source srcSet={toWebp(image)} type="image/webp" />
                        <img
                          src={image}
                          alt={`Foto ${idx + 1}`}
                          loading="lazy"
                          decoding="async"
                          fetchPriority="low"
                          className="w-full h-64 object-cover hover:scale-105 transition-transform"
                        />
                      </picture>
                    </motion.div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* Other Days Placeholder */}
          {activeDay !== 1 && (
            <section className="py-16 px-4 max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <p className="text-2xl text-gray-600 mb-4">
                  Contenido del {daysNavigation.find(d => d.index === activeDay)?.day} próximamente...
                </p>
                <p className="text-gray-500">
                  Estamos preparando la información detallada de este día
                </p>
              </motion.div>
            </section>
          )}
        </>
      ) : (
        <section className="py-20 px-4 bg-gradient-to-br from-blue-900 via-purple-800 to-purple-900 text-white min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="text-8xl mb-6 inline-block"
              >
                🚀
              </motion.div>
            </div>
            <h2 className="text-5xl font-bold mb-6">Semana STEM+ 2026</h2>
            <p className="text-2xl text-white/90 mb-4">¡Próximamente!</p>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              Estamos preparando la próxima edición de la Semana STEM+ Envigado 2026 con nuevas tendencias, expositores internacionales y experiencias transformadoras para la educación.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8 border border-white/20">
              <p className="text-white/90 mb-4">Mantente atento a las novedades</p>
              <p className="text-sm text-white/70">Pronto compartiremos fechas, agenda y detalles del evento</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all"
            >
              Notificarme
            </motion.button>
          </motion.div>
        </section>
      )}
    </div>
  );
}
