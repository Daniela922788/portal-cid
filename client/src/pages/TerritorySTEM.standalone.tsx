'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Target, Award, Users, Lightbulb, TrendingUp, BookOpen, Zap, ChevronLeft, ChevronRight, ExternalLink, PlayCircle } from 'lucide-react';
import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

/**
 * TerritorySTEM Component
 * 
 * Componente standalone que muestra la página completa de Territorio STEM+ de Envigado.
 * Incluye todas las secciones: Hero, STEM+, Manifiesto, Mapa Interactivo, Objetivos, Metas y Testimonios.
 * 
 * Dependencias requeridas:
 * - framer-motion
 * - lucide-react
 * - tailwindcss
 * 
 * Uso:
 * import TerritorySTEM from './TerritorySTEM.standalone';
 * 
 * <TerritorySTEM />
 */

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

    if (previousPositionRef.current === currentKey) {
      return;
    }

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

export default function TerritorioStem() {
  const [activeTestimony, setActiveTestimony] = useState(0);
  const [selectedInstitution, setSelectedInstitution] = useState(0);

  const playlistUrl = 'https://www.youtube.com/playlist?list=PLzd_wYuK8iVLJZku5Go5bitRXDS9AjlQ8';
  const playlistEmbedUrl = 'https://www.youtube.com/embed/videoseries?list=PLzd_wYuK8iVLJZku5Go5bitRXDS9AjlQ8';

  // Colores pastel personalizados
  const pastelColors = {
    pink: '#FFB6D9',
    blue: '#B4D7FF',
    green: '#B4E7C3',
    yellow: '#FFE5B4',
    purple: '#D4B6FF',
    peach: '#FFCBB4',
  };

  // Datos de metas hasta Diciembre 2027
  const goals = [
    {
      title: 'Asistencia Técnica a Instituciones',
      description: 'Brindar asistencia técnica al 100% de las instituciones educativas oficiales del municipio de Envigado para la implementación de metodologías con enfoque STEM y STEM+',
      icon: Target,
      color: pastelColors.pink,
    },
    {
      title: 'Formación de Estudiantes',
      description: 'Formar a 1.000 estudiantes de instituciones educativas oficiales del municipio de Envigado en metodologías para la resolución de problemas y retos asociados al enfoque STEM y STEM+',
      icon: Users,
      color: pastelColors.blue,
    },
    {
      title: 'Capacitación Docente',
      description: 'Formar a 50 docentes del municipio de Envigado en metodologías para la resolución de problemas y retos relacionados con el enfoque STEM y STEM+',
      icon: BookOpen,
      color: pastelColors.green,
    },
  ];

  // Datos de testimonios
  const testimonies = [
    {
      name: 'María González',
      role: 'Docente de Ciencias',
      institution: 'Institución Educativa Envigado',
      text: 'El enfoque STEM+ ha transformado mi forma de enseñar. Mis estudiantes ahora ven la ciencia como algo vivo y aplicable a su realidad.',
      color: pastelColors.pink,
      icon: '👩‍🏫',
    },
    {
      name: 'Carlos Mendoza',
      role: 'Estudiante de Ingeniería',
      institution: 'Centro de Innovación y Desarrollo',
      text: 'Participar en proyectos STEM+ me permitió descubrir mi pasión por la tecnología y la innovación. Es increíble ver cómo puedo impactar mi territorio.',
      color: pastelColors.blue,
      icon: '👨‍💻',
    },
    {
      name: 'Laura Rodríguez',
      role: 'Directora de Empresa Tecnológica',
      institution: 'TechSolutions Envigado',
      text: 'Envigado como territorio STEM+ nos permite acceder a talento joven preparado y comprometido. Es una oportunidad única para crecer juntos.',
      color: pastelColors.green,
      icon: '👩‍💼',
    },
    {
      name: 'Juan Pérez',
      role: 'Estudiante de Primaria',
      institution: 'Colegio Envigado',
      text: 'Me encanta participar en los clubes STEM+. Aprendemos haciendo cosas divertidas y entiendo por qué es importante la tecnología.',
      color: pastelColors.yellow,
      icon: '👦',
    },
  ];

  const playlistHighlights = [
    'Videos cortos para inspirar clases con enfoque STEM+',
    'Experiencias y estrategias aplicables al contexto escolar',
    'Contenido para docentes, directivos y comunidad educativa',
  ];

  const stemConsiderations = [
    {
      title: 'Es un enfoque, no una metodología',
      description: 'Impulsa procesos de innovación educativa y transformación curricular.',
      color: pastelColors.pink,
    },
    {
      title: 'Participación colectiva',
      description: 'Promueve alianzas entre instituciones educativas, organizaciones y actores del territorio.',
      color: pastelColors.blue,
    },
    {
      title: 'Aprendizaje centrado en el estudiante',
      description: 'Prioriza experiencias activas e integradas entre áreas del conocimiento.',
      color: pastelColors.green,
    },
    {
      title: 'Docente investigador',
      description: 'Reflexiona sobre su práctica pedagógica y diseña experiencias de aprendizaje situadas.',
      color: pastelColors.yellow,
    },
    {
      title: 'Competencias para el siglo XXI',
      description: 'Fomenta pensamiento crítico, creatividad, resolución de problemas y colaboración.',
      color: pastelColors.purple,
    },
    {
      title: 'Ciudadanía responsable',
      description: 'Busca formar estudiantes comprometidos con el desarrollo sostenible y los desafíos sociales y ambientales.',
      color: pastelColors.peach,
    },
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

  // Datos de instituciones para el mapa interactivo
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

  const selectedPosition: [number, number] = [
    institutions[selectedInstitution].lat,
    institutions[selectedInstitution].lng,
  ];
  const institutionPoints = institutions.map((inst) => [inst.lat, inst.lng] as [number, number]);

  // Auto-avance de testimonios cada 15 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimony((prev) => (prev + 1) % testimonies.length);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const goToPreviousTestimony = () => {
    setActiveTestimony((prev) => (prev - 1 + testimonies.length) % testimonies.length);
  };

  const goToNextTestimony = () => {
    setActiveTestimony((prev) => (prev + 1) % testimonies.length);
  };

  // Variantes de animación Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
      <section className="relative w-full overflow-hidden">
        <img
          src="/banners/banner-territorio.png"
          alt="Banner Territorio STEM"
          loading="lazy"
          fetchPriority="low"
          decoding="async"
          className="w-full h-auto object-cover"
        />
      </section>

      {/* ===== SECCIÓN: MANIFIESTO ===== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2 variants={itemVariants} className="text-4xl font-bold text-center mb-12 text-gray-800">
            Manifiesto Envigado Territorio STEM+
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="relative rounded-3xl p-12 shadow-2xl overflow-hidden bg-white border border-slate-200"
          >
            <div className="relative z-10 text-gray-800 space-y-6 leading-relaxed">
              <p className="text-lg">
                Como Municipio de Envigado entendemos que la educación es la ruta para la transformación social y empresarial, todo esto potenciado por la tecnología, la ciencia, la ingeniería y las matemáticas, esto nos hace pensar en Envigado como un territorio STEM+ que potencie estas capacidades, en toda su población.
              </p>

              <p className="text-lg">
                Para potenciar a nuestro municipio, el territorio de Envigado STEM+ se basa en un principio Smart, que busca convivir de manera integrada con los diferentes sistemas existentes, dentro de la educación, la empresa, el estado y la población, un trabajo conjunto que busca alcanzar los objetivos planteados para el territorio STEM+ de Envigado, regenerando, procesos, metodologías, pensamientos y comportamientos de manera consciente por parte de todos sus actores.
              </p>

              <p className="text-lg">
                Todo esto con el fin de hacer de Envigado un área fuerte en nuevas tecnologías, acorde a las tendencias mundiales, preparada para los retos de una sociedad globalizada y tecnológica, es por eso que Envigado se propone como un territorio STEM+ Smart regenerativo. Es por eso, que mediante el presente manifiesto nos comprometemos con los niños, niñas y jóvenes de nuestro municipio a desarrollar actividades de experiencias STEM+ que potencien al municipio y lo posicionen como referente nacional en temas tecnológicos y de vanguardia. La unión de los diferentes estamentos como, el gobierno, la educación, la empresa privada y la población, en un trabajo conjunto que va desde la enseñanza del concepto STEM+, pasando por su puesta en marcha y su posicionamiento como concepto base de la educación del municipio, garantizará la consecución del logro de Envigado como un territorio STEM+.
              </p>

              <p className="text-lg font-semibold">
                Generar un compromiso de los diferentes estamentos es el primer punto para abordar para que este proyecto se lleve a cabo y haga de Envigado un territorio STEM+, es por eso que la instauración del concepto de Smart regenerativo debe ser una política pública que todos estemos dispuestos a acatar.
              </p>

              <p className="text-lg">
                El compromiso de trabajo de una mesa para el cumplimento de metas del territorio STEM+ es quien debe velar por la consecución de los logros, por eso es importante que esta sea una política pública perdurable en el tiempo con un trabajo continuo, que va desde la comunicación del concepto a los diferentes estamentos, hasta la apropiación de éste. Es por esto que lo consignado en la declaración de Envigado como territorio STEM+ Smart regenerativo es un trabajo que no puede morir con un manifiesto, sino más bien debe comenzar su implementación, articulando, socializando y trabajando con los distintos actores identificados durante la creación de este territorio para lograr en su primera etapa dar a conocer el concepto.
              </p>

              <p className="text-lg">
                El trabajo continuo de los diversos involucrados debe darse de manera continua sin detención alguna, pues la manera de apropiación del concepto es la repetición y el trabajo de los diferentes planes establecidos. De esta manera consideramos que lograremos transformar la sociedad y el sector empresarial, educación, estado y población de nuestro territorio.
              </p>

            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ===== SECCIÓN: DÓNDE SE DESARROLLA - MAPA INTERACTIVO ===== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      >
        <motion.h2 variants={itemVariants} className="text-4xl font-bold text-center mt-6 mb-12 text-gray-800">
          Dónde se desarrolla
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <motion.div
            variants={itemVariants}
            className="rounded-2xl p-8 text-white shadow-lg"
            style={{ backgroundColor: pastelColors.green }}
          >
            <h3 className="text-2xl font-bold mb-4">Centro de Innovación y Desarrollo</h3>
            <p className="text-gray-800 leading-relaxed">
              Epicentro de la transformación STEM+ en Envigado, donde se articulan iniciativas educativas, empresariales y comunitarias para potenciar el territorio.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="rounded-2xl p-8 text-white shadow-lg"
            style={{ backgroundColor: pastelColors.blue }}
          >
            <h3 className="text-2xl font-bold mb-4">Instituciones Educativas</h3>
            <p className="text-gray-800 leading-relaxed">
              Más de 15 instituciones educativas públicas y privadas implementan el enfoque STEM+ en sus currículos, formando a estudiantes desde primaria hasta educación superior.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="rounded-2xl p-8 text-white shadow-lg"
            style={{ backgroundColor: pastelColors.peach }}
          >
            <h3 className="text-2xl font-bold mb-4">Alianzas Empresariales</h3>
            <p className="text-gray-800 leading-relaxed">
              Empresas tecnológicas, de manufactura y servicios se unen para crear oportunidades de aprendizaje práctico y empleo para nuestros jóvenes.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl"
        >
          <div className="mb-5">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">Envigado, Antioquia</h3>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base mb-4">
              En el marco del Territorio STEM+ Smart Regenerativo, la estrategia tiene como alcance todo el territorio del municipio de Envigado y, como punto de partida, para fortalecer las capacidades educativas, la Secretaría de Educación de Envigado orienta el trabajo con las instituciones educativas oficiales para promover la innovación educativa y consolidar el ecosistema STEM+ en el municipio.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {institutions.map((inst, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setSelectedInstitution(idx)}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`rounded-lg p-3 shadow-md transition-all ${
                    selectedInstitution === idx
                      ? 'ring-2 ring-offset-2 ring-blue-500 bg-blue-50'
                      : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <p className="font-semibold text-gray-800 text-sm">{inst.name}</p>
                  <p className="text-xs text-gray-600 mt-1">{inst.type}</p>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="w-full max-w-[1200px] h-[300px] mx-auto overflow-hidden rounded-xl border border-slate-200">
            <MapContainer
              center={selectedPosition}
              zoom={14}
              scrollWheelZoom
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <FitAllInstitutionsOnLoad points={institutionPoints} />

              <FlyToSelectedInstitution position={selectedPosition} />

              {institutions.map((inst, idx) => (
                <CircleMarker
                  key={inst.name}
                  center={[inst.lat, inst.lng]}
                  radius={selectedInstitution === idx ? 11 : 8}
                  pathOptions={{
                    color: selectedInstitution === idx ? '#2563eb' : '#0f172a',
                    fillColor: selectedInstitution === idx ? '#3b82f6' : '#60a5fa',
                    fillOpacity: 0.9,
                    weight: selectedInstitution === idx ? 3 : 2,
                  }}
                  eventHandlers={{
                    click: () => setSelectedInstitution(idx),
                  }}
                >
                  <Popup>
                    <strong>{inst.name}</strong>
                    <br />
                    Tipo: {inst.type}
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>

          <motion.div
            key={selectedInstitution}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-5 text-center"
          >
            <p className="text-lg font-bold text-gray-800">{institutions[selectedInstitution].name}</p>
            <p className="text-sm text-gray-600 mt-1">Tipo: {institutions[selectedInstitution].type}</p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ===== SECCIÓN: QUÉ SE BUSCA ===== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-50 via-yellow-50 to-pink-50"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 variants={itemVariants} className="text-4xl font-bold text-center mb-12 text-gray-800">
            Qué se busca con Territorio STEM+ Smart Regenerativo
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Lightbulb,
                title: 'Innovación Educativa',
                description: 'Transformar prácticas pedagógicas mediante metodologías activas y experiencias de aprendizaje significativo.',
                color: pastelColors.yellow,
              },
              {
                icon: Users,
                title: 'Inclusión Social',
                description: 'Garantizar que todos los estudiantes, sin importar su origen, tengan acceso a educación STEM+ de calidad.',
                color: pastelColors.pink,
              },
              {
                icon: TrendingUp,
                title: 'Desarrollo Económico',
                description: 'Preparar talento humano competitivo para las demandas del mercado laboral del siglo XXI.',
                color: pastelColors.blue,
              },
              {
                icon: Target,
                title: 'Solución de Problemas',
                description: 'Formar ciudadanos capaces de identificar y resolver problemáticas locales con enfoque científico y tecnológico.',
                color: pastelColors.green,
              },
              {
                icon: Award,
                title: 'Posicionamiento Regional',
                description: 'Consolidar a Envigado como referente nacional en educación STEM+ e innovación educativa.',
                color: pastelColors.purple,
              },
              {
                icon: Zap,
                title: 'Transformación Social',
                description: 'Crear una cultura de innovación, emprendimiento y pensamiento crítico en toda la comunidad.',
                color: pastelColors.peach,
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="rounded-2xl p-8 text-white shadow-lg hover:shadow-2xl transition-shadow"
                style={{ backgroundColor: item.color }}
              >
                <item.icon className="w-12 h-12 text-gray-800 mb-4" />
                <h3 className="text-xl font-bold mb-3 text-gray-800">{item.title}</h3>
                <p className="text-gray-800 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ===== SECCIÓN: METAS 2025-2026 ===== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      >
        <motion.h2 variants={itemVariants} className="text-4xl font-bold text-center mb-4 text-gray-800">
          Metas Plan de Desarrollo <span className="italic">Envigado Vamos Adelante, Amor por la Gente, Amor por Envigado</span> 2024 - 2027
        </motion.h2>
        <motion.p variants={itemVariants} className="text-center text-gray-600 mb-12 text-lg">
          Compromisos medibles para consolidar a Envigado como territorio STEM+
        </motion.p>

        <div className="space-y-8">
          {goals.map((goal, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
            >
              <div
                className="rounded-2xl p-8 text-white shadow-lg hover:shadow-2xl transition-all"
                style={{ backgroundColor: goal.color }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{goal.title}</h3>
                    <p className="text-gray-800">{goal.description}</p>
                  </div>
                  <goal.icon className="w-12 h-12 text-gray-800 flex-shrink-0 ml-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ===== SECCIÓN: ¿QUÉ ES STEM+? ===== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      >
        <motion.h2 variants={itemVariants} className="text-4xl font-bold text-center mb-4 text-gray-800">
          ¿Qué es el enfoque educativo STEM+?
        </motion.h2>
        <motion.p variants={itemVariants} className="text-center text-gray-600 mb-12 text-lg max-w-3xl mx-auto">
          Una visión integrada del conocimiento para aprender de forma activa, interdisciplinaria y conectada con los desafíos del contexto.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="rounded-3xl p-8 mb-8 shadow-xl border border-blue-100 bg-gradient-to-br from-white via-blue-50/60 to-fuchsia-50/50"
        >
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              Las diferentes interpretaciones sobre el enfoque STEM/STEAM, tanto en la práctica como en los contextos académicos e investigativos, orientan la forma en que cada país y su sistema educativo decide implementarlo. Esto se refleja en aspectos como el diseño curricular, las prácticas pedagógicas, la colaboración entre docentes y la participación de los estudiantes en su proceso de aprendizaje.
            </p>

            <p>
              En Colombia se ha adoptado el término STEM+, donde la "+" incorpora las artes, el diseño y otras áreas del conocimiento. Más que una modificación del término, esta propuesta plantea una visión integrada del conocimiento, que busca facilitar su apropiación dentro del sistema educativo y promover experiencias de aprendizaje activas, interdisciplinarias y conectadas con los desafíos del contexto.
            </p>

            <p>
              A partir de diferentes investigaciones y lineamientos estratégicos, el enfoque STEM+ promueve el desarrollo de competencias para la vida, el pensamiento crítico, la creatividad, la resolución de problemas y el trabajo colaborativo, situando al estudiante en el centro del proceso educativo y reconociendo al docente como un investigador pedagógico que diseña experiencias de aprendizaje contextualizadas.
            </p>
          </div>
        </motion.div>

        <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-6 text-gray-800">
          Consideraciones generales del enfoque STEM+
        </motion.h3>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {stemConsiderations.map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="rounded-2xl p-7 text-white shadow-lg transition-transform"
              style={{ backgroundColor: item.color }}
            >
              <h4 className="text-xl font-bold mb-3 text-gray-800">{item.title}</h4>
              <p className="text-gray-800 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={itemVariants}
          className="rounded-2xl p-8 mb-10 shadow-lg border-l-4 border-indigo-500 bg-gradient-to-r from-indigo-50 via-blue-50 to-transparent"
        >
          <h4 className="text-2xl font-bold mb-3 text-gray-800">STEM+ y el desarrollo de los territorios</h4>
          <p className="text-lg text-gray-700 leading-relaxed">
            El enfoque STEM+ también ha sido proyectado como una estrategia para impulsar el desarrollo de territorios y comunidades sostenibles. Durante el II Encuentro de la Red STEM Latinoamérica (Monterrey, 2023), se reafirmó este propósito y se propuso avanzar en la construcción de Territorios STEM+, entendidos como ecosistemas de actores educativos, sociales y productivos que trabajan de manera articulada para transformar la educación y generar impacto en el territorio.
          </p>
        </motion.div>

        <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-6 text-gray-800">
          Modelo de madurez para Territorios STEM+
        </motion.h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {territoryMaturityModel.map((step, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -3 }}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold mb-3">
                {idx + 1}
              </div>
              <p className="text-sm leading-6 text-gray-700">{step}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={itemVariants}
          className="rounded-2xl p-8 mb-8 border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50"
        >
          <p className="text-lg text-gray-700 leading-relaxed">
            Estos elementos permiten comprender el enfoque STEM+ no solo como una estrategia educativa, sino también como una oportunidad para fortalecer el desarrollo territorial a través de la educación, la innovación y la colaboración entre actores.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="rounded-2xl p-6 bg-gray-100 border-l-4 border-gray-400"
        >
          <h4 className="text-xl font-bold text-gray-800 mb-4">Fuentes</h4>
          <ul className="space-y-2 text-sm text-gray-700 mb-5">
            <li>Organización de Estados Iberoamericanos (OEI) y Ministerio de Educación Nacional (MEN). Visión STEM+: una propuesta para la transformación educativa en Colombia (2020).</li>
            <li>Red STEM Latinoamérica. Declaración de Monterrey y modelo de madurez para Territorios STEM+ (2023).</li>
          </ul>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://eduteka.icesi.edu.co/pdfdir/eduteka-explora-oei-men-vision-stem-2020.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-blue-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Descargar documento Visión STEM+
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href="https://educacion.stem.siemens-stiftung.org/wp-content/uploads/2024/10/001_Sie_Modelo_De_Madurez_Territorios_STEM__17_07.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Descargar documento Territorios STEM+
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </motion.section>

      {/* ===== SECCIÓN: VIDEOTECA STEM+ ===== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-[linear-gradient(120deg,#eef4ff_0%,#fdf2f8_45%,#fff7ed_100%)]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-700">
                <PlayCircle className="h-4 w-4" />
                Videoteca Territorio STEM+
              </div>

              <div>
                <h2 className="text-4xl font-black leading-tight text-slate-900 md:text-5xl">
                  Aprende en video y llévate ideas listas para aplicar
                </h2>
                <p className="mt-4 text-base leading-7 text-slate-700 md:text-lg">
                  Explora esta playlist oficial con contenidos que acercan el enfoque STEM+ al aula de forma práctica.
                  Es un formato dinámico para motivar a docentes y equipos directivos a ver, compartir y poner en marcha nuevas estrategias.
                </p>
              </div>

              <div className="grid gap-3">
                {playlistHighlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex items-start gap-3 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-sm backdrop-blur"
                  >
                    <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-fuchsia-500" />
                    <p className="text-sm leading-6 text-slate-700">{highlight}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={playlistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-slate-900 px-5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  Ver playlist completa
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href={playlistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Guardar en YouTube
                  <PlayCircle className="h-4 w-4" />
                </a>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="rounded-3xl border border-white/90 bg-white/85 p-3 shadow-[0_24px_65px_rgba(30,41,59,0.15)] backdrop-blur-sm">
                <div className="relative overflow-hidden rounded-2xl bg-slate-950">
                  <iframe
                    src={playlistEmbedUrl}
                    title="Playlist Territorio STEM+"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="aspect-video w-full"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ===== SECCIÓN: TESTIMONIOS STEM+ - CARRUSEL AUTOMÁTICO ===== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 variants={itemVariants} className="text-4xl font-bold text-center mb-4 text-gray-800">
            Testimonios STEM+
          </motion.h2>
          <motion.p variants={itemVariants} className="text-center text-gray-600 mb-12 text-lg">
            Historias de transformación desde el territorio
          </motion.p>

          <div className="relative">
            <button
              type="button"
              onClick={goToPreviousTestimony}
              aria-label="Testimonio anterior"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 h-10 w-10 rounded-full border border-slate-300 bg-white/95 text-slate-700 shadow-md hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5 mx-auto" />
            </button>

            <button
              type="button"
              onClick={goToNextTestimony}
              aria-label="Siguiente testimonio"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 h-10 w-10 rounded-full border border-slate-300 bg-white/95 text-slate-700 shadow-md hover:bg-white"
            >
              <ChevronRight className="h-5 w-5 mx-auto" />
            </button>

            <motion.div
              key={activeTestimony}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl p-12 shadow-2xl bg-white border border-slate-200"
            >
              <div className="flex items-start gap-6 mb-6">
                <div className="text-6xl">{testimonies[activeTestimony].icon}</div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-1">{testimonies[activeTestimony].name}</h3>
                  <p className="text-gray-800 font-semibold">{testimonies[activeTestimony].role}</p>
                  <p className="text-gray-700 text-sm">{testimonies[activeTestimony].institution}</p>
                </div>
              </div>

              <p className="text-lg text-gray-800 leading-relaxed italic">
                "{testimonies[activeTestimony].text}"
              </p>
            </motion.div>

            {/* Indicadores de progreso */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonies.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setActiveTestimony(idx)}
                  className={`h-2 rounded-full transition-all ${
                    activeTestimony === idx ? 'bg-gray-800 w-8' : 'bg-gray-400 w-2'
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ===== SECCIÓN: BANNER SEMANA STEM (FORMATO COMPACTO) ===== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-12 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants}>
            <a href="/semana-stem-complete" aria-label="Ir a Semana STEM" className="group block">
              <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-md transition-all group-hover:shadow-lg">
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src="/banners/banner-semana-click.png"
                    alt="Banner Semana STEM"
                    loading="lazy"
                    decoding="async"
                    className="h-[190px] w-full object-cover object-center md:h-[230px]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                </div>
              </div>
            </a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
