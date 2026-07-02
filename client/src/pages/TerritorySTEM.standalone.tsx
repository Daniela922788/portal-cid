'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Target, Award, Users, Lightbulb, TrendingUp, BookOpen, Zap, ChevronLeft, ChevronRight, ExternalLink, PlayCircle, ArrowRight, Home } from 'lucide-react';
import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function FlyToSelectedInstitution({ position }: { position: [number, number] }) {
  const map = useMap();
  const isFirstRender = React.useRef(true);
  const previousPositionRef = React.useRef<string>('');

  useEffect(() => {
    const currentKey = `${position[0]},${position[1]}`;
    if (isFirstRender.current) {
      isFirstRender.current = false;
      previousPositionRef.current = currentKey;
      return;
    }
    if (previousPositionRef.current === currentKey) return;
    previousPositionRef.current = currentKey;
    map.flyTo(position, 15, { duration: 1.1 });
  }, [map, position]);

  return null;
}

function FitAllInstitutionsOnLoad({ points }: { points: Array<[number, number]> }) {
  const map = useMap();
  const didFitRef = React.useRef(false);

  useEffect(() => {
    if (!points.length || didFitRef.current) return;
    map.fitBounds(points, { padding: [30, 30], maxZoom: 15 });
    didFitRef.current = true;
  }, [map, points]);

  return null;
}

/* Eyebrow editorial reutilizable: regla teal + etiqueta en versalitas. */
function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="h-px w-10" style={{ backgroundColor: '#11B2AA' }} />
      <span
        className="text-lg font-semibold uppercase tracking-[0.22em]"
        style={{ color: light ? '#11B2AA' : '#0D4B56' }}
      >
        {children}
      </span>
    </div>
  );
}

export default function TerritorioStem() {
  const [activeTestimony, setActiveTestimony] = useState(0);
  const [selectedInstitution, setSelectedInstitution] = useState(0);

  const playlistUrl = 'https://www.youtube.com/playlist?list=PLzd_wYuK8iVLJZku5Go5bitRXDS9AjlQ8';
  const playlistEmbedUrl = 'https://www.youtube.com/embed/videoseries?list=PLzd_wYuK8iVLJZku5Go5bitRXDS9AjlQ8';

  // Paleta con roles claros. Teal = firma. Amarillo = única chispa.
  const C = {
    ink:    '#182130',
    deep:   '#0D4B56',
    forest: '#0D4B56',
    teal:   '#11B2AA',
    indigo: '#2D3586',
    yellow: '#FFDE07',
    orange: '#EC6910',
  };

  // Cifras resumen de las metas, usadas como apoyo del hero (la sección
  // completa de Metas se conserva más abajo, en su orden original).
  const heroStats = [
    { prefix: '', metric: '100%', label: 'instituciones educativas oficiales con asistencia técnica' },
    { prefix: 'Más de', metric: '1.000', label: 'estudiantes formados en metodologías STEM+' },
    { prefix: 'Más de', metric: '50', label: 'docentes capacitados en el enfoque STEM+' },
  ];

  const goals = [
    { title: 'Asistencia Técnica a Instituciones', description: 'Brindar asistencia técnica al 100% de las instituciones educativas oficiales del municipio de Envigado para la implementación de metodologías con enfoque STEM y STEM+', icon: Target, metric: '100%', metricLabel: 'instituciones', accent: C.teal },
    { title: 'Formación de Estudiantes', description: 'Formar a 1.000 estudiantes de instituciones educativas oficiales del municipio de Envigado en metodologías para la resolución de problemas y retos asociados al enfoque STEM y STEM+', icon: Users, metric: '1.000', metricLabel: 'estudiantes', accent: C.indigo },
    { title: 'Capacitación Docente', description: 'Formar a 50 docentes del municipio de Envigado en metodologías para la resolución de problemas y retos relacionados con el enfoque STEM y STEM+', icon: BookOpen, metric: '50', metricLabel: 'docentes', accent: C.deep },
  ];

  const testimonies = [
    { title: 'Testimonio de:', embedUrl: 'https://www.youtube.com/embed/LZgiyBqGILc?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1', lines: ['Luz Ester Pérez M. - Estudiante de fotografía'] },
    { title: 'Testimonios de:', embedUrl: 'https://www.youtube.com/embed/0boej4mKxB4?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1', lines: ['Temuujin Parra - Estudiante', 'Alejandro Manjarrés - Estudiante'] },
  ];

  const playlistHighlights = [
    'Videos cortos para inspirar clases con enfoque STEM+',
    'Experiencias y estrategias aplicables al contexto escolar',
    'Contenido para docentes, directivos y comunidad educativa',
  ];

  const stemConsiderations = [
    { title: 'Es un enfoque, no una metodología', description: 'Impulsa procesos de innovación educativa y transformación curricular.' },
    { title: 'Participación colectiva', description: 'Promueve alianzas entre instituciones educativas, organizaciones y actores del territorio.' },
    { title: 'Aprendizaje centrado en el estudiante', description: 'Prioriza experiencias activas e integradas entre áreas del conocimiento.' },
    { title: 'Docente investigador', description: 'Reflexiona sobre su práctica pedagógica y diseña experiencias de aprendizaje situadas.' },
    { title: 'Competencias para el siglo XXI', description: 'Fomenta pensamiento crítico, creatividad, resolución de problemas y colaboración.' },
    { title: 'Ciudadanía responsable', description: 'Busca formar estudiantes comprometidos con el desarrollo sostenible y los desafíos sociales y ambientales.' },
  ];

  const territoryMaturityModel = [
    'Identificación de necesidades y problemáticas del territorio.',
    'Definición de desafíos y objetivos de transformación.',
    'Mapeo de actores e iniciativas que puedan contribuir al proceso.',
    'Construcción de mecanismos de gobernanza y trabajo colaborativo.',
    'Desarrollo de una agenda compartida de acción.',
    'Implementación de sistemas de monitoreo y evaluación.',
    'Diseño de una estrategia de comunicaciones que visibilice avances e impactos.',
  ];

  const manifestoImages = [
    { src: '/Territorio/1.jpg', alt: 'Estudiantes colaborando en actividad STEM+', caption: 'Aprendizaje colaborativo' },
    { src: '/Territorio/2.jpg', alt: 'Trabajo articulado entre actores del territorio', caption: 'Articulación territorial' },
    { src: '/Territorio/3.jpg', alt: 'Innovación educativa en entorno escolar', caption: 'Innovación educativa' },
  ];

  const manifestoParagraphs = [
    { text: 'Como Municipio de Envigado entendemos que la educación es la ruta para la transformación social y empresarial, todo esto potenciado por la tecnología, la ciencia, la ingeniería y las matemáticas, esto nos hace pensar en Envigado como un territorio STEM+ que potencie estas capacidades, en toda su población.', strong: false },
    { text: 'Para potenciar a nuestro municipio, el territorio de Envigado STEM+ se basa en un principio Smart, que busca convivir de manera integrada con los diferentes sistemas existentes, dentro de la educación, la empresa, el estado y la población, un trabajo conjunto que busca alcanzar los objetivos planteados para el territorio STEM+ de Envigado, regenerando, procesos, metodologías, pensamientos y comportamientos de manera consciente por parte de todos sus actores.', strong: false },
    { text: 'Todo esto con el fin de hacer de Envigado un área fuerte en nuevas tecnologías, acorde a las tendencias mundiales, preparada para los retos de una sociedad globalizada y tecnológica, es por eso que Envigado se propone como un territorio STEM+ Smart regenerativo. Es por eso, que mediante el presente manifiesto nos comprometemos con los niños, niñas y jóvenes de nuestro municipio a desarrollar actividades de experiencias STEM+ que potencien al municipio y lo posicionen como referente nacional en temas tecnológicos y de vanguardia. La unión de los diferentes estamentos como, el gobierno, la educación, la empresa privada y la población, en un trabajo conjunto que va desde la enseñanza del concepto STEM+, pasando por su puesta en marcha y su posicionamiento como concepto base de la educación del municipio, garantizará la consecución del logro de Envigado como un territorio STEM+.', strong: false },
    { text: 'Generar un compromiso de los diferentes estamentos es el primer punto para abordar para que este proyecto se lleve a cabo y haga de Envigado un territorio STEM+, es por eso que la instauración del concepto de Smart regenerativo debe ser una política pública que todos estemos dispuestos a acatar.', strong: true },
    { text: 'El compromiso de trabajo de una mesa para el cumplimento de metas del territorio STEM+ es quien debe velar por la consecución de los logros, por eso es importante que esta sea una política pública perdurable en el tiempo con un trabajo continuo, que va desde la comunicación del concepto a los diferentes estamentos, hasta la apropiación de éste. Es por esto que lo consignado en la declaración de Envigado como territorio STEM+ Smart regenerativo es un trabajo que no puede morir con un manifiesto, sino más bien debe comenzar su implementación, articulando, socializando y trabajando con los distintos actores identificados durante la creación de este territorio para lograr en su primera etapa dar a conocer el concepto.', strong: false },
    { text: 'El trabajo continuo de los diversos involucrados debe darse de manera continua sin detención alguna, pues la manera de apropiación del concepto es la repetición y el trabajo de los diferentes planes establecidos. De esta manera consideramos que lograremos transformar la sociedad y el sector empresarial, educación, estado y población de nuestro territorio.', strong: false },
  ];

  const territoryActors = [
    { title: 'Centro de Innovación y Desarrollo', description: 'Epicentro de la transformación STEM+ en Envigado, donde se articulan iniciativas educativas, empresariales y comunitarias para potenciar el territorio.' },
    { title: 'Instituciones Educativas', description: 'Más de 15 instituciones educativas públicas y privadas implementan el enfoque STEM+ en sus currículos, formando a estudiantes desde primaria hasta educación superior.' },
    { title: 'Alianzas Empresariales', description: 'Empresas tecnológicas, de manufactura y servicios se unen para crear oportunidades de aprendizaje práctico y empleo para nuestros jóvenes.' },
  ];

  const aims = [
    { icon: Lightbulb, title: 'Innovación Educativa', description: 'Transformar prácticas pedagógicas mediante metodologías activas y experiencias de aprendizaje significativo.' },
    { icon: Users, title: 'Inclusión Social', description: 'Garantizar que todos los estudiantes, sin importar su origen, tengan acceso a educación STEM+ de calidad.' },
    { icon: TrendingUp, title: 'Desarrollo Económico', description: 'Preparar talento humano competitivo para las demandas del mercado laboral del siglo XXI.' },
    { icon: Target, title: 'Solución de Problemas', description: 'Formar ciudadanos capaces de identificar y resolver problemáticas locales con enfoque científico y tecnológico.' },
    { icon: Award, title: 'Posicionamiento Regional', description: 'Consolidar a Envigado como referente nacional en educación STEM+ e innovación educativa.' },
    { icon: Zap, title: 'Transformación Social', description: 'Crear una cultura de innovación, emprendimiento y pensamiento crítico en toda la comunidad.' },
  ];

  const institutions = [
    { name: 'Alejandro Vélez Barrientos', lat: 6.17014611789602, lng: -75.5924838748379, type: 'Institución Educativa' },
    { name: 'Comercial de Envigado', lat: 6.15377295339681, lng: -75.5852665546053, type: 'Institución Educativa' },
    { name: 'CE; San Rafael', lat: 6.15844905918835, lng: -75.5831364704327, type: 'Sede' },
    { name: 'CE; Pio XII', lat: 6.16543555268393, lng: -75.5815837206465, type: 'Sede' },
    { name: 'Darío de Bedout', lat: 6.16783353621534, lng: -75.5784390928834, type: 'Institución Educativa' },
    { name: 'El Salado', lat: 6.15313189685307, lng: -75.5778405979997, type: 'Institución Educativa' },
    { name: 'SAL, La Morena', lat: 6.15005325372034, lng: -75.5625222541818, type: 'Sede' },
    { name: 'La Paz', lat: 6.16309481312973, lng: -75.5938164704326, type: 'Institución Educativa' },
    { name: 'PAZ, John F. Kennedy', lat: 6.1655756354066, lng: -75.5910370851908, type: 'Sede' },
    { name: 'PAZ, Trianón', lat: 6.15782433968609, lng: -75.5912842062557, type: 'Sede' },
    { name: 'Las Palmas', lat: 6.15158353118516, lng: -75.5339220190377, type: 'Institución Educativa' },
    { name: 'Manuel Uribe Ángel', lat: 6.17090418894318, lng: -75.5898687629498, type: 'Institución Educativa' },
    { name: 'MUA, Marceliano Vélez', lat: 6.17277576590806, lng: -75.5863661423291, type: 'Sede' },
    { name: 'Martín Eduardo Ríos Llanos', lat: 6.18704720456411, lng: -75.4900374246891, type: 'Institución Educativa' },
    { name: 'MERL, Cruz del Porvenir', lat: 6.19010029827366, lng: -75.5033298291144, type: 'Sede' },
    { name: 'San Vicente Alto de las Flores', lat: 6.15477081941266, lng: -75.6014022654518, type: 'Institución Educativa' },
    { name: 'María Poussepin', lat: 6.17137662705895, lng: -75.5770857603272, type: 'Institución Educativa' },
    { name: 'José Manuel Restrepo Vélez', lat: 6.17165768792742, lng: -75.5911353176654, type: 'Institución Educativa' },
    { name: 'Normal Superior de Envigado', lat: 6.16764026227279, lng: -75.5813261026564, type: 'Institución Educativa' },
    { name: 'Leticia Arango de Avendaño', lat: 6.1635849643157, lng: -75.5942057738208, type: 'Institución Educativa' },
    { name: 'José Miguel de la Calle', lat: 6.17317295959675, lng: -75.5813227314919, type: 'Institución Educativa' },
    { name: 'CID', lat: 6.17231877089521, lng: -75.5910955159567, type: 'Centro' },
  ];

  const selectedPosition: [number, number] = [institutions[selectedInstitution].lat, institutions[selectedInstitution].lng];
  const institutionPoints = institutions.map((inst) => [inst.lat, inst.lng] as [number, number]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimony((prev) => (prev + 1) % testimonies.length);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const goToPreviousTestimony = () => setActiveTestimony((prev) => (prev - 1 + testimonies.length) % testimonies.length);
  const goToNextTestimony = () => setActiveTestimony((prev) => (prev + 1) % testimonies.length);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-white text-[#182130]">

      {/* ===== HERO — banner (logo) con teal continuo hasta el menú ===== */}
      {/*
        El fondo del hero usa el MISMO teal del banner (#018290), de modo que
        el color sube detrás del header sin verse "cortado". El pt-20 reserva
        la altura del header absoluto. Tras el banner, un fundido teal→verde
        lleva la vista hacia la zona oscura donde van la bajada, las cifras
        y la ruta (breadcrumb) en blanco, alineada con el texto.
        Si tu header tiene otra altura, ajusta el pt-20.
      */}
      <div className="bg-[#018290] pt-20">
        <section className="relative w-full overflow-hidden bg-[#018290]">
          <img
            src="/banners/banner-territorio.webp"
            alt="Banner Territorio STEM+ — Envigado"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-full h-[150px] object-cover object-center md:h-auto"
          />
          {/* Fundido del teal del banner hacia el verde de la zona de cifras */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#182130]" />
        </section>

        {/* Zona oscura: bajada editorial + cifras + ruta (todo alineado) */}
        <div className="bg-[#182130] px-4 sm:px-6 lg:px-8 pb-12 pt-10">
          <div className="max-w-6xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl text-3xl font-light leading-snug text-white md:text-5xl"
            >
              Un territorio que potencia la{' '}
              <span className="font-black text-white">ciencia, la tecnología, la ingeniería, las matemáticas y las artes</span>{' '}
              <span className="text-[#11B2AA]">en toda su población.</span>
            </motion.h1>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3"
            >
              {heroStats.map((s) => (
                <motion.div key={s.metric} variants={itemVariants} className="bg-[#182130] p-7">
                  <div className="mb-2 h-px w-8" style={{ backgroundColor: '#11B2AA' }} />
                  <p className="text-lg font-semibold uppercase tracking-wide text-white/55">{s.prefix || '\u00A0'}</p>
                  <p className="text-5xl font-black leading-none text-white md:text-6xl">{s.metric}</p>
                  <p className="mt-2 text-xl leading-snug text-white/70">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Ruta (breadcrumb): sobre el oscuro, en blanco, alineada con el texto */}
            <nav aria-label="Ruta de navegación" className="mt-8 flex items-center gap-2 text-xl text-white/70">
              <a href="/" className="inline-flex items-center gap-1.5 transition-colors hover:text-white">
                <Home className="h-4 w-4" />
                Inicio
              </a>
              <ChevronRight className="h-4 w-4 text-white/40" />
              <span className="font-medium text-white">Territorio STEM+</span>
            </nav>
          </div>
        </div>
      </div>

      {/* ===== 1 · MANIFIESTO — bloque oscuro ===== */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}
        className="bg-[#182130] px-4 sm:px-6 lg:px-8 py-24"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div variants={itemVariants}>
            <h2 className="mb-12 text-5xl font-black leading-[1.05] tracking-tight text-white md:text-6xl">
              Manifiesto Envigado Territorio STEM+
            </h2>
          </motion.div>

          <div className="space-y-6 leading-relaxed">
            {manifestoParagraphs.map((paragraph, idx) => (
              <React.Fragment key={idx}>
                {paragraph.strong ? (
                  <motion.div variants={itemVariants} className="rounded-2xl border-l-4 border-[#FFDE07] bg-white/[0.04] p-6">
                    <p className="text-2xl font-semibold text-white md:text-2xl">{paragraph.text}</p>
                  </motion.div>
                ) : (
                  <motion.p variants={itemVariants} className="text-xl leading-relaxed text-white/75 md:text-2xl">
                    {paragraph.text}
                  </motion.p>
                )}

                {idx === 1 && (
                  <motion.div variants={itemVariants} className="grid gap-3 py-2 sm:grid-cols-2">
                    {manifestoImages.slice(0, 2).map((image) => (
                      <figure key={image.src} className="overflow-hidden rounded-2xl">
                        <img src={image.src} alt={image.alt} loading="lazy" decoding="async" className="h-52 w-full object-cover" />
                        <figcaption className="mt-2 text-lg uppercase tracking-wide text-[#11B2AA]">{image.caption}</figcaption>
                      </figure>
                    ))}
                  </motion.div>
                )}

                {idx === 3 && (
                  <motion.figure variants={itemVariants} className="overflow-hidden rounded-2xl py-2">
                    <img src={manifestoImages[2].src} alt={manifestoImages[2].alt} loading="lazy" decoding="async" className="h-64 w-full object-cover rounded-2xl" />
                    <figcaption className="mt-2 text-lg uppercase tracking-wide text-[#11B2AA]">{manifestoImages[2].caption}</figcaption>
                  </motion.figure>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ===== 2 · DÓNDE SE DESARROLLA — MAPA ===== */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}
        className="bg-[#F6F8F8] px-4 sm:px-6 lg:px-8 py-24"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants}>
            <h2 className="mb-4 text-5xl font-black leading-[1.05] tracking-tight text-[#182130] md:text-6xl">Dónde se desarrolla</h2>
            <p className="mb-12 max-w-3xl text-2xl text-[#0D4B56]">
              El alcance es todo el municipio de Envigado. Como punto de partida, la Secretaría de Educación orienta el trabajo con las instituciones educativas oficiales para consolidar el ecosistema STEM+.
            </p>
          </motion.div>

          <div className="mb-6 grid gap-5 md:grid-cols-3">
            {territoryActors.map((actor, idx) => (
              <motion.div key={idx} variants={itemVariants} className="rounded-2xl border border-[#0D4B56]/12 bg-white p-7">
                <span className="mb-4 block h-1 w-8 rounded-full" style={{ backgroundColor: idx === 0 ? '#11B2AA' : idx === 1 ? '#2D3586' : '#0D4B56' }} />
                <h3 className="mb-2 text-2xl font-bold text-[#182130]">{actor.title}</h3>
                <p className="text-xl leading-relaxed text-[#0D4B56]">{actor.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="rounded-3xl border border-[#0D4B56]/12 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-center text-2xl font-bold text-[#182130]">Envigado, Antioquia · Instituciones del ecosistema</h3>
            <div className="mb-5 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {institutions.map((inst, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setSelectedInstitution(idx)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`rounded-lg border p-3 text-left transition-all ${
                    selectedInstitution === idx
                      ? 'border-[#11B2AA] bg-[#11B2AA]/10'
                      : 'border-[#0D4B56]/10 bg-white hover:border-[#11B2AA]/40 hover:bg-[#11B2AA]/[0.04]'
                  }`}
                >
                  <p className="text-xl font-semibold text-[#182130]">{inst.name}</p>
                  <p className="mt-0.5 text-lg text-[#0D4B56]">{inst.type}</p>
                </motion.button>
              ))}
            </div>

            <div className="mx-auto h-[340px] w-full max-w-[1200px] overflow-hidden rounded-2xl border border-[#0D4B56]/12">
              <MapContainer center={selectedPosition} zoom={14} scrollWheelZoom className="h-full w-full">
                <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <FitAllInstitutionsOnLoad points={institutionPoints} />
                <FlyToSelectedInstitution position={selectedPosition} />
                {institutions.map((inst, idx) => (
                  <CircleMarker
                    key={inst.name}
                    center={[inst.lat, inst.lng]}
                    radius={selectedInstitution === idx ? 11 : 8}
                    pathOptions={{
                      color: selectedInstitution === idx ? '#2D3586' : '#0D4B56',
                      fillColor: selectedInstitution === idx ? '#11B2AA' : '#0D4B56',
                      fillOpacity: 0.9,
                      weight: selectedInstitution === idx ? 3 : 2,
                    }}
                    eventHandlers={{ click: () => setSelectedInstitution(idx) }}
                  >
                    <Popup><strong>{inst.name}</strong><br />Tipo: {inst.type}</Popup>
                  </CircleMarker>
                ))}
              </MapContainer>
            </div>

            <motion.div key={selectedInstitution} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="mt-5 flex items-center justify-center gap-3 text-center">
              <MapPin className="h-5 w-5" style={{ color: '#11B2AA' }} />
              <div>
                <p className="text-xl font-bold text-[#182130]">{institutions[selectedInstitution].name}</p>
                <p className="text-xl text-[#0D4B56]">{institutions[selectedInstitution].type}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ===== 3 · QUÉ SE BUSCA ===== */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}
        className="bg-white px-4 sm:px-6 lg:px-8 py-24"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants}>
            <h2 className="mb-12 max-w-3xl text-5xl font-black leading-[1.05] tracking-tight text-[#182130] md:text-6xl">
              Qué se busca con el Territorio STEM+ Smart Regenerativo
            </h2>
          </motion.div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {aims.map((item, idx) => (
              <motion.div key={idx} variants={itemVariants} whileHover={{ y: -4 }} className="rounded-2xl border border-[#0D4B56]/12 bg-white p-7 transition-shadow hover:shadow-lg">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#11B2AA]/12">
                  <item.icon className="h-6 w-6" style={{ color: '#11B2AA' }} />
                </div>
                <h3 className="mb-2 text-2xl font-bold text-[#182130]">{item.title}</h3>
                <p className="text-xl leading-relaxed text-[#0D4B56]">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ===== 4 · METAS 2024-2027 — las cifras son el héroe ===== */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}
        className="bg-[#F6F8F8] px-4 sm:px-6 lg:px-8 py-24"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants}>
            <Eyebrow>Compromisos · 2024–2027</Eyebrow>
            <h2 className="mb-3 max-w-4xl text-5xl font-black leading-[1.05] tracking-tight text-[#182130] md:text-6xl">
              Metas del Plan de Desarrollo
            </h2>
            <p className="mb-12 max-w-2xl text-2xl italic text-[#0D4B56]">
              Envigado Vamos Adelante, Amor por la Gente, Amor por Envigado
            </p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-3">
            {goals.map((goal, idx) => (
              <motion.div key={idx} variants={itemVariants} className="flex flex-col rounded-2xl border border-[#0D4B56]/12 bg-white p-8 transition-shadow hover:shadow-lg">
                <goal.icon className="mb-6 h-9 w-9" style={{ color: goal.accent }} />
                <p className="text-6xl font-black leading-none text-[#182130] md:text-6xl">{goal.metric}</p>
                <p className="mt-2 text-lg font-semibold uppercase tracking-wide" style={{ color: goal.accent }}>{goal.metricLabel}</p>
                <h3 className="mt-6 mb-2 text-2xl font-bold text-[#182130]">{goal.title}</h3>
                <p className="text-xl leading-relaxed text-[#0D4B56]">{goal.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ===== 5 · ¿QUÉ ES STEM+? ===== */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}
        className="bg-white px-4 sm:px-6 lg:px-8 py-24"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants}>
          </motion.div>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <motion.h2 variants={itemVariants} className="text-5xl font-black leading-[1.05] tracking-tight text-[#182130] md:text-6xl">
              ¿Qué es el enfoque educativo <span className="text-[#11B2AA]">STEM+</span>?
            </motion.h2>
            <motion.div variants={itemVariants} className="space-y-5 text-2xl leading-relaxed text-[#0D4B56]">
              <p className="text-2xl font-medium text-[#182130]">Una visión integrada del conocimiento para aprender de forma activa, interdisciplinaria y conectada con los desafíos del contexto.</p>
              <p>Las diferentes interpretaciones sobre el enfoque STEM/STEAM, tanto en la práctica como en los contextos académicos e investigativos, orientan la forma en que cada país y su sistema educativo decide implementarlo. Esto se refleja en el diseño curricular, las prácticas pedagógicas, la colaboración entre docentes y la participación de los estudiantes en su proceso de aprendizaje.</p>
              <p>En Colombia se ha adoptado el término STEM+, donde la "+" incorpora las artes, el diseño y otras áreas del conocimiento. Más que una modificación del término, plantea una visión integrada del conocimiento que busca facilitar su apropiación y promover experiencias de aprendizaje activas, interdisciplinarias y conectadas con los desafíos del contexto.</p>
              <p>A partir de diferentes investigaciones y lineamientos estratégicos, el enfoque STEM+ promueve el desarrollo de competencias para la vida, el pensamiento crítico, la creatividad, la resolución de problemas y el trabajo colaborativo, situando al estudiante en el centro del proceso educativo y reconociendo al docente como un investigador pedagógico.</p>
            </motion.div>
          </div>

          {/* Consideraciones */}
          <motion.div variants={itemVariants} className="mt-16">
            <div className="grid gap-px overflow-hidden rounded-2xl border border-[#0D4B56]/12 bg-[#0D4B56]/10 md:grid-cols-2 lg:grid-cols-3">
              {stemConsiderations.map((item) => (
                <div key={item.title} className="group bg-white p-7 transition-colors hover:bg-[#11B2AA]/[0.04]">
                  <span className="mb-4 block h-1 w-8 rounded-full" style={{ backgroundColor: '#11B2AA' }} />
                  <h4 className="mb-2 text-2xl font-bold text-[#182130]">{item.title}</h4>
                  <p className="text-xl leading-relaxed text-[#0D4B56]">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Pull-quote territorios */}
          <motion.div variants={itemVariants} className="mt-12 rounded-3xl bg-[#182130] p-10 md:p-12">
            <Eyebrow light>STEM+ y el desarrollo de los territorios</Eyebrow>
            <p className="max-w-4xl text-2xl font-light leading-relaxed text-white md:text-3xl">
              Durante el II Encuentro de la Red STEM Latinoamérica (Monterrey, 2023) se propuso avanzar en la construcción de <span className="font-semibold text-[#11B2AA]">Territorios STEM+</span>: ecosistemas de actores educativos, sociales y productivos que trabajan de manera articulada para transformar la educación y generar impacto en el territorio.
            </p>
          </motion.div>

          {/* Modelo de madurez: secuencia real → timeline numerada */}
          <motion.div variants={itemVariants} className="mt-16">
            <Eyebrow>Modelo de madurez · 7 etapas</Eyebrow>
            <h3 className="mb-8 text-3xl font-bold text-[#182130] md:text-4xl">Cómo madura un Territorio STEM+</h3>
            <div className="space-y-px overflow-hidden rounded-2xl border border-[#0D4B56]/12">
              {territoryMaturityModel.map((step, idx) => (
                <div key={idx} className="flex items-center gap-5 bg-white p-5 transition-colors hover:bg-[#11B2AA]/[0.04]">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xl font-black text-white" style={{ backgroundColor: idx === territoryMaturityModel.length - 1 ? '#EC6910' : '#11B2AA' }}>
                    {idx + 1}
                  </span>
                  <p className="text-[#0D4B56]">{step}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Cierre + Fuentes */}
          <motion.div variants={itemVariants} className="mt-12 rounded-2xl border-l-4 border-[#11B2AA] bg-[#11B2AA]/[0.06] p-8">
            <p className="text-2xl leading-relaxed text-[#0D4B56]">Estos elementos permiten comprender el enfoque STEM+ no solo como una estrategia educativa, sino también como una oportunidad para fortalecer el desarrollo territorial a través de la educación, la innovación y la colaboración entre actores.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-6 rounded-2xl border border-[#0D4B56]/12 bg-[#0D4B56]/[0.04] p-7">
            <h4 className="mb-4 text-xl font-bold uppercase tracking-wide text-[#182130]">Fuentes</h4>
            <ul className="mb-5 space-y-2 text-xl text-[#0D4B56]">
              <li>Organización de Estados Iberoamericanos (OEI) y Ministerio de Educación Nacional (MEN). Visión STEM+: una propuesta para la transformación educativa en Colombia (2020).</li>
              <li>Red STEM Latinoamérica. Declaración de Monterrey y modelo de madurez para Territorios STEM+ (2023).</li>
            </ul>
            <div className="flex flex-wrap gap-3">
              <a href="https://eduteka.icesi.edu.co/pdfdir/eduteka-explora-oei-men-vision-stem-2020.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-2 rounded-full bg-[#2D3586] px-4 text-xl font-semibold text-white transition-colors hover:bg-[#182130]">
                Visión STEM+ <ExternalLink className="h-4 w-4" />
              </a>
              <a href="https://educacion.stem.siemens-stiftung.org/wp-content/uploads/2024/10/001_Sie_Modelo_De_Madurez_Territorios_STEM__17_07.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-2 rounded-full border border-[#0D4B56]/25 bg-white px-4 text-xl font-semibold text-[#0D4B56] transition-colors hover:bg-[#11B2AA]/10">
                Territorios STEM+ <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ===== 6 · VIDEOTECA STEM+ ===== */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}
        className="bg-[#F6F8F8] px-4 sm:px-6 lg:px-8 py-24"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="text-5xl font-black leading-[1.05] tracking-tight text-[#182130] md:text-6xl">Aprende en video y llévate ideas listas para aplicar</h2>
              <p className="text-2xl leading-relaxed text-[#0D4B56]">Playlist oficial con contenidos que acercan el enfoque STEM+ al aula de forma práctica. Un formato dinámico para que docentes y equipos directivos vean, compartan y pongan en marcha nuevas estrategias.</p>
              <div className="grid gap-2">
                {playlistHighlights.map((highlight) => (
                  <div key={highlight} className="flex items-start gap-3 border-t border-[#0D4B56]/10 pt-3">
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0" style={{ color: '#11B2AA' }} />
                    <p className="text-xl leading-6 text-[#0D4B56]">{highlight}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <a href={playlistUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-2 rounded-full bg-[#182130] px-5 text-xl font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-[#2D3586]">
                  Ver playlist completa <ExternalLink className="h-4 w-4" />
                </a>
                <a href={playlistUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-2 rounded-full border border-[#0D4B56]/25 bg-white px-5 text-xl font-semibold text-[#0D4B56] transition-colors hover:bg-[#11B2AA]/10">
                  Guardar en YouTube <PlayCircle className="h-4 w-4" />
                </a>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="overflow-hidden rounded-3xl border border-[#0D4B56]/12 bg-[#182130] p-2 shadow-[0_24px_65px_rgba(24,33,48,0.18)]">
                <iframe src={playlistEmbedUrl} title="Playlist Territorio STEM+" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen className="aspect-video w-full rounded-2xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ===== BANNER SEMANA STEM ===== */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}
        className="bg-white px-4 sm:px-6 lg:px-8 pb-20 pt-4"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants}>
            <a href="/semana-stem-complete" aria-label="Ir a Semana STEM" className="group block">
              <div className="overflow-hidden rounded-3xl border border-[#0D4B56]/15 bg-white shadow-md transition-all group-hover:shadow-xl">
                <div className="relative overflow-hidden">
                  <img src="/banners/banner-semana-click.webp" alt="Banner Semana STEM" loading="lazy" decoding="async" className="h-[190px] w-full object-cover object-center md:h-[230px]" />
                  <div className="pointer-events-none absolute inset-0 bg-[#182130]/0 transition-colors duration-300 group-hover:bg-[#182130]/20" />
                </div>
              </div>
            </a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}