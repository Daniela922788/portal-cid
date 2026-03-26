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

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function SemanaSTEM() {
  const [bannerSrc, setBannerSrc] = useState('/images/semana-stem-banner.png');
  const [activeYear, setActiveYear] = useState(2025);
  const [activeDay, setActiveDay] = useState(1);
  const [selectedDay2Team, setSelectedDay2Team] = useState<string | null>(null);
  const [day2VisibleImages, setDay2VisibleImages] = useState(6);
  const speakerImage = (fileName: string) => `/ponentes/martes/${encodeURIComponent(fileName)}`;
  const toWebp = (imagePath: string) => imagePath.replace(/\.(jpe?g|png)$/i, '.webp');

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
    };
  }, []);

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

  // Datos del Día 2 - Miércoles
  const day2Sessions = [
    {
      time: '07:30 a.m.',
      title: 'Apertura – Olimpiadas Maker: Misión de Rescate',
      description:
        'La jornada inició con la bienvenida a las Olimpiadas Maker: Misión de Rescate Maker 2025, realizadas en el marco de la Semana STEM+ Envigado 2025. El evento resaltó el compromiso del municipio con el fortalecimiento del enfoque STEM y el reconocimiento de Envigado como Ciudad del Aprendizaje y Territorio STEM. Durante la apertura se destacó el talento de los estudiantes para resolver retos del mundo real a través de la robótica, el pensamiento computacional y el diseño de soluciones tecnológicas orientadas a situaciones de emergencia como deslizamientos, desastres naturales o estructuras colapsadas.',
      icon: '🚀',
      color: 'from-orange-400 to-orange-600',
    },
    {
      time: '08:05 a.m.',
      title: 'Presentación del Reto: Roverbots Rescatistas',
      description:
        'Se presentó el desafío central de la competencia: el desarrollo de Roverbots rescatistas, robots diseñados por los equipos estudiantiles para superar una pista inspirada en escenarios de rescate. La actividad se desarrolló con el acompañamiento del Cuerpo de Bomberos Voluntarios de Envigado, quienes apoyaron el proceso formativo en gestión del riesgo y colaboraron en el diseño de la pista de competencia, conectando el aprendizaje con situaciones reales de protección de la vida.',
      icon: '🤖',
      color: 'from-blue-400 to-blue-600',
    },
    {
      time: '08:25 a.m.',
      title: 'Reglas de Competencia y Presentación de Jurados',
      description:
        'En este espacio se explicó la dinámica de la jornada y los criterios de evaluación de las Olimpiadas Maker. La calificación se dividió en dos componentes principales: el video del proceso de desarrollo del robot (40%) y el desempeño del robot en la pista de rescate (60%). También se presentaron los jurados evaluadores, encargados de analizar el diseño, la programación y el desempeño de los prototipos desarrollados por los estudiantes. Durante este momento se socializó además el orden y horario estimado de participación de cada equipo, junto con la lista oficial de instituciones y equipos competidores, con el fin de organizar el desarrollo de las pruebas en la pista de rescate y garantizar la participación de todos los grupos.',
      scheduleRows: [
        { hora: '8:30', institucion: 'Institución Educativa Alejandro Vélez Barrientos', equipo: 'Equipo #1' },
        { hora: '8:40', institucion: 'Institución Educativa La Paz', equipo: 'Equipo #2' },
        { hora: '8:50', institucion: 'Institución Educativa José Miguel de la Calle', equipo: 'Equipo #3' },
        { hora: '9:00', institucion: 'Colegio Reggio Emilia', equipo: 'Equipo #4' },
        { hora: '9:10', institucion: 'Institución Educativa San Vicente Alto de las Flores', equipo: 'Equipo #5' },
        { hora: '9:20', institucion: 'Institución Educativa Manuel Uribe Ángel', equipo: 'Equipo #6' },
        { hora: '9:30', institucion: 'Institución Educativa Comercial de Envigado', equipo: 'COMERCIALISTAS ROBÓTICOS' },
        { hora: '9:40', institucion: 'Institución Educativa El Salado', equipo: 'Equipo #8' },
        { hora: '9:50', institucion: 'Institución Educativa Martín Eduardo Ríos Llanos', equipo: 'Equipo #9' },
        { hora: '10:00', institucion: 'Institución Educativa Normal Superior de Envigado', equipo: 'Equipo #10' },
        { hora: '10:10', institucion: 'Institución Educativa Darío de Bedout', equipo: 'Equipo #11' },
        { hora: '10:20', institucion: 'Institución Educativa Las Palmas', equipo: 'Equipo #12' },
        { hora: '10:30', institucion: 'Colegio Benedictino de Santa María', equipo: 'ENBY TEAM' },
        { hora: '10:40', institucion: 'Institución Educativa Darío de Bedout', equipo: 'Equipo #14' },
        { hora: '10:50', institucion: 'Institución Educativa Comercial de Envigado', equipo: 'COMERCIALISTAS AL RESCATE' },
        { hora: '11:00', institucion: 'Institución Educativa Leticia Arango Avendaño', equipo: 'Equipo #16' },
        { hora: '11:10', institucion: 'Institución Educativa María Poussepin', equipo: 'Equipo #17' },
        { hora: '11:20', institucion: 'Institución Educativa Martín Eduardo Ríos Llanos', equipo: 'Equipo #18' },
        { hora: '11:30', institucion: 'Institución Educativa José Manuel Restrepo Vélez', equipo: 'Equipo #19' },
        { hora: '11:40', institucion: 'Colegio Benedictino de Santa María', equipo: 'ROBOBEN' },
      ],
      icon: '⚙️',
      color: 'from-purple-400 to-purple-600',
    },
    {
      time: '09:30 a.m.',
      title: 'Receso',
      description:
        'Espacio de pausa para los participantes, en el que se realizó la entrega de refrigerios a los equipos competidores y docentes acompañantes, permitiendo un momento de descanso antes de continuar con las actividades de la jornada.',
      icon: '☕',
      color: 'from-yellow-400 to-yellow-600',
    },
    {
      time: '09:45 a.m.',
      title: 'Desarrollo de la Competencia',
      description:
        'Los equipos pusieron a prueba sus robots en la pista de rescate, enfrentando distintos retos que exigían programación, diseño mecánico, pensamiento lógico y trabajo en equipo. Además de la competencia principal, los estudiantes pudieron participar en distintas estaciones de aprendizaje relacionadas con pensamiento computacional y robótica, fortaleciendo sus habilidades a través de experiencias prácticas y lúdicas.',
      icon: '🧠',
      color: 'from-green-400 to-green-600',
    },
    {
      time: '12:00 p.m.',
      title: 'Premiación y Cierre',
      description:
        'La jornada concluyó con la retroalimentación del jurado y el anuncio de los equipos ganadores. Los tres mejores puntajes recibieron trofeos para sus instituciones educativas y reconocimientos para los estudiantes y docentes entrenadores. Además, los cuatro primeros equipos obtuvieron la oportunidad de participar en el 5° Congreso Internacional de Gestión del Riesgo de Desastres en Medellín, donde compartirán sus prototipos de robótica educativa para rescate en estructuras colapsadas. El evento finalizó con un reconocimiento a todos los participantes, destacando que más allá de la competencia, las Olimpiadas Maker representan un espacio para aprender, innovar y construir soluciones que aporten a la vida y al territorio.',
      icon: '🏆',
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

  const day2Highlights = [
    {
      icon: '🎯',
      title: 'Aprendizaje Basado en Retos',
      desc: 'La robótica como herramienta para resolver problemas reales de rescate',
    },
    {
      icon: '🤖',
      title: 'Robótica para la Gestión del Riesgo',
      desc: 'Diseño de Roverbots inspirados en escenarios de emergencia',
    },
    {
      icon: '🧠',
      title: 'Pensamiento Computacional',
      desc: 'Programación, lógica y creatividad aplicadas a la resolución de desafíos',
    },
    {
      icon: '🤝',
      title: 'Trabajo en Equipo',
      desc: 'Colaboración entre estudiantes, docentes y expertos para innovar',
    },
  ];

  const day2GalleryImages: string[] = [
    '/Semana STEM/24/1.jpg',
    '/Semana STEM/24/2.jpg',
    '/Semana STEM/24/3.jpg',
    '/Semana STEM/24/4.jpg',
    '/Semana STEM/24/5.jpg',
    '/Semana STEM/24/6.jpg',
    '/Semana STEM/24/7.jpg',
    '/Semana STEM/24/8.jpg',
    '/Semana STEM/24/9.jpg',
    '/Semana STEM/24/10.jpg',
    '/Semana STEM/24/11.jpg',
    '/Semana STEM/24/12.jpg',
    '/Semana STEM/24/13.jpg',
    '/Semana STEM/24/14.jpg',
  ];

  // Datos del Día 3 - Jueves
  const day3Sessions = [
    {
      time: '07:00 a.m.',
      title: 'Montaje de la Feria',
      description:
        'Los equipos iniciaron el montaje de sus stands en la plazoleta principal de la Institución Universitaria de Envigado, organizando sus proyectos de investigación y adecuando los espacios para la socialización de sus propuestas.',
      icon: '🌱',
      color: 'from-emerald-400 to-emerald-600',
    },
    {
      time: '07:30 a.m.',
      title: 'Registro de Participantes',
      description:
        'Se realizó el registro de estudiantes, docentes y equipos participantes, dando inicio formal a la jornada académica y organizativa de la feria.',
      icon: '📝',
      color: 'from-slate-400 to-slate-600',
    },
    {
      time: '08:00 a.m.',
      title: 'Apertura – Feria PRAE',
      description:
        'La jornada inició como un espacio de encuentro para la socialización de proyectos de investigación escolar enfocados en el medio ambiente. Se destacó la importancia de fortalecer la cultura investigativa, el enfoque PRAE y el compromiso de las instituciones educativas con el territorio.',
      icon: '🚀',
      color: 'from-orange-400 to-orange-600',
    },
    {
      time: '08:00 a.m.',
      title: 'Foro: Investigación y Diálogo de Saberes en la Formación Ambiental',
      description:
        'Se desarrolló un espacio dirigido a docentes en el auditorio principal, enfocado en la reflexión sobre la educación ambiental, el diálogo de saberes y la sostenibilidad. Este espacio permitió fortalecer la articulación entre la investigación escolar y las prácticas pedagógicas en el territorio.',
      forumTopics: [
        'La educación ambiental como herramienta de transformación',
        'La sostenibilidad en el contexto educativo',
        'La implementación del Plan de Educación Ambiental Municipal (PEAM)',
      ],
      location: 'Auditorio principal',
      icon: '🎓',
      color: 'from-blue-400 to-blue-600',
    },
    {
      time: '08:30 a.m.',
      title: 'Inicio de Exposiciones',
      description:
        'Los equipos de semilleros de investigación presentaron sus proyectos, compartiendo hallazgos, experiencias y propuestas enfocadas en problemáticas ambientales. Este espacio permitió evidenciar el impacto de la investigación escolar en el entorno.',
      icon: '🔬',
      color: 'from-purple-400 to-purple-600',
    },
    {
      time: '10:00 a.m.',
      title: 'Refrigerio',
      description:
        'Espacio de pausa para el descanso e intercambio de experiencias entre estudiantes, docentes e invitados.',
      icon: '☕',
      color: 'from-yellow-400 to-yellow-600',
    },
    {
      time: '10:30 a.m.',
      title: 'Continuación de Exposiciones',
      description:
        'Los equipos continuaron la socialización de sus proyectos, fortaleciendo habilidades de comunicación, argumentación y trabajo colaborativo en torno a la investigación científica escolar.',
      icon: '🔎',
      color: 'from-cyan-400 to-cyan-600',
    },
    {
      time: '12:30 p.m.',
      title: 'Cierre y Entrega de Certificados',
      description:
        'La jornada concluyó con el reconocimiento a la participación de los equipos y la entrega de certificados, resaltando el valor de la investigación escolar como herramienta para la transformación del entorno.',
      icon: '🏆',
      color: 'from-red-400 to-red-600',
    },
  ];

  const day3ProjectRows = [
    { institucion: 'I. E. Comercial de Envigado - sede principal', grupo: 'The Titans Forest', docente: 'Jhon Alexander Echeverri Acosta' },
    { institucion: 'I. E. Darío de Bedout', grupo: 'Construyendo Armonías', docente: 'Mónica Trujillo' },
    { institucion: 'I. E. El Salado - sede principal', grupo: 'Aguas Literarias', docente: 'Daniel Botero' },
    { institucion: 'I. E. José Manuel Restrepo Vélez', grupo: 'Ecos Ancestrales', docente: 'Sandra Penagos' },
    { institucion: 'I. E. José Manuel Restrepo Vélez', grupo: 'El Tintero', docente: 'Juan Carlos Cuartas' },
    { institucion: 'I. E. José Manuel Restrepo Vélez', grupo: 'Vos Con Voz', docente: 'Carlos Alberto Villada Giraldo' },
    { institucion: 'I. E. José Miguel de la Calle', grupo: 'Quebrada La Yurá', docente: 'Olga Lucía Mesa Hincapié' },
    { institucion: 'I. E. José Miguel de la Calle', grupo: 'Investigarte', docente: 'Wilberto Sanchez' },
    { institucion: 'I. E. La Paz - sede principal', grupo: 'Alimentación Saludable', docente: 'Jason Cardona Gomez' },
    { institucion: 'I. E. La Paz - sede principal', grupo: 'Acción Climática', docente: 'Viviana Obando' },
    { institucion: 'I. E. Las Palmas', grupo: 'Supernova', docente: 'Juan Camilo Grajales Arboleda' },
    { institucion: 'I. E. Las Palmas', grupo: 'Huerta escolar', docente: 'Gloria Isabel Valencia Rentería' },
    { institucion: 'I. E. Leticia Arango de Avendaño', grupo: 'Sistema IOT', docente: 'Carolina Torres Lasso' },
    { institucion: 'I. E. Manuel Uribe Ángel - Marceliano Vélez', grupo: 'Huerta_4.0', docente: 'Elis Yaneth Vides Bulloso' },
    { institucion: 'I. E. Manuel Uribe Ángel - sede principal', grupo: 'Lenguajes En Contexto', docente: 'Catalina Higuita' },
    { institucion: 'I. E. María Poussepin', grupo: 'Polinizando Saberes', docente: 'Mónica Pineda Tavera' },
    { institucion: 'I. E. Martín Eduardo Ríos Llano - principal', grupo: 'Investigación_7b', docente: 'Yesenia Morales Mejia' },
    { institucion: 'I. E. Martín Eduardo Ríos Llano - principal', grupo: 'Investigacion_9a', docente: 'Lorena Palacios' },
    { institucion: 'I. E. Martín Eduardo Ríos Llano - principal', grupo: 'Investigacion_9b', docente: 'Isabel Velásquez' },
    { institucion: 'I. E. Martín Eduardo Ríos Llano - principal', grupo: 'Investigacion_8a', docente: 'Gabriela Bedoya Duque' },
    { institucion: 'I. E. Normal Superior de Envigado', grupo: 'Leo Mi Normal', docente: 'Abraham Quintero' },
    { institucion: 'I. E. Normal Superior de Envigado', grupo: 'Aquaplanton', docente: 'Luisa Fernanda Rodríguez González' },
    { institucion: 'I. E. Normal Superior de Envigado', grupo: 'GANSE', docente: 'John Mario Pérez' },
    { institucion: 'I. E. San Vicente Alto de las Flóres', grupo: 'Matemáticas Divertidas', docente: 'Noreyda Florez Mena' },
    { institucion: 'Institución Educativa José Miguel de la Calle', grupo: 'Proseres', docente: 'María Isabel Cárdenas Espinosa' },
    { institucion: 'I.E Manuel Uribe Ángel, sede Marceliano Vélez', grupo: 'Transición Energética', docente: 'Yaneth Vides Bulloso' },
    { institucion: 'I.E Manuel Uribe Ángel, sede Marceliano Vélez', grupo: 'Mentes robóticas', docente: 'Lina Marcela García Ramírez' },
    { institucion: 'Institución Educativa José Miguel de la Calle', grupo: 'Aula Felíz de la Jose: innovación Educativa con enfoque STEM', docente: 'Liliana María Ochoa Betancur' },
    { institucion: 'IE LA PAZ', grupo: 'Circuitos y vida', docente: 'Ginna Rozo' },
    { institucion: 'Institución Educativa José Manuel Restrepo Vélez', grupo: 'Pequeños investigadores, grandes mentes creativas', docente: 'Ana María Jaramillo Restrepo' },
    { institucion: 'Martin Eduardo Rios Llanos', grupo: 'Patrimonio', docente: 'Mabel Pacheco, David Gonzalez, Gabriela Bedoya' },
    { institucion: 'Institución Educativa San Vicente Alto de las Flores', grupo: 'Bichos en el Patio', docente: 'Claudia Elena Cardona Villa' },
    { institucion: 'Colegio Franciscano Palermo de San José', grupo: 'SIPAL', docente: 'Luz Marina Duque Zuluaga' },
  ];

  const day3InvitedInstitutions = [
    { municipio: 'El Peñol – Antioquia', institucion: 'I.E. León XIII', grupo: 'Mentes Sinápticas', docente: 'Edwin Alexander Gallo Zuluaga' },
    { municipio: 'Caldas – Antioquia', institucion: 'C.E.R. Claudina Múnera', grupo: 'Weather Scientists', docente: 'Gustavo Adolfo Restrepo Arboleda' },
    { municipio: 'Sabaneta – Antioquia', institucion: 'I.E. Rafael J. Mejía', grupo: 'Alas de Cristal (Jardines funcionales)', docente: 'Catalina Ayala Arroyave' },
    { municipio: 'Sabaneta – Antioquia', institucion: 'I.E. José Félix de Restrepo Vélez', grupo: 'PRAE', docente: 'Angélica María Betancur Garcés' },
    { municipio: 'Caldas – Antioquia', institucion: 'I.E. Federico Ángel', grupo: 'Salvadores del planeta', docente: 'Viviana Ramírez y Álvaro Fausto Peláez' },
    { municipio: 'Institución Universitaria de Envigado', institucion: 'Semillero de investigación aplicada Incore', grupo: '', docente: 'Lina María Zapata Pérez' },
    { municipio: 'Institución Universitaria de Envigado', institucion: 'Semillero de investigación El Taller', grupo: '', docente: 'Diana Lucía Gómez Santamaría y Juan Guillermo Estrada Vallejo' },
    { municipio: 'Institución Universitaria de Envigado', institucion: 'Semillero de investigación GICE', grupo: '', docente: 'Raúl David Ruiz Escobar' },
    { municipio: 'Institución Universitaria de Envigado', institucion: 'Semillero Finanzas IUE', grupo: '', docente: 'Raúl David Ruiz Escobar' },
  ];

  const day3Recognitions = [
    {
      category: 'Categoría básica secundaria',
      items: [
        'Alas de cristal de la Institución educativa Rafael J. Mejía (Medio ambiente).',
        'Sociedad Norma Literaria (LEO mi normal) de la Institución Educativa Normal Superior de Envigado.',
      ],
    },
    {
      category: 'Categoría básica primaria',
      items: [
        'Pequeños investigadores, grandes mentes creativas de la Institución Educativa José Manuel Restrepo Vélez.',
        'Bichos en el Patio de la Institución Educativa San Vicente Alto de las Flores (Medio ambiente).',
      ],
    },
    {
      category: 'Reconocimiento a la trayectoria',
      items: [
        'Supernova de la Institución Educativa Las Palmas.',
      ],
    },
  ];

  const day3Highlights = [
    {
      icon: '🌱',
      title: 'Investigación con Impacto Ambiental',
      desc: 'Proyectos escolares enfocados en la sostenibilidad y el cuidado del entorno.',
    },
    {
      icon: '🔬',
      title: 'Cultura Investigativa Escolar',
      desc: 'Fortalecimiento de habilidades de indagación, análisis y comunicación.',
    },
    {
      icon: '🤝',
      title: 'Trabajo Colaborativo',
      desc: 'Estudiantes y docentes construyendo conocimiento de manera conjunta.',
    },
    {
      icon: '🌍',
      title: 'Conexión con el Territorio',
      desc: 'Propuestas que responden a problemáticas ambientales locales.',
    },
  ];

  const day3GalleryImages: string[] = [
    '/Semana%20STEM/25/1.jpg',
    '/Semana%20STEM/25/2.jpg',
    '/Semana%20STEM/25/3.jpg',
    '/Semana%20STEM/25/4.jpg',
    '/Semana%20STEM/25/5.jpg',
    '/Semana%20STEM/25/6.jpg',
    '/Semana%20STEM/25/7.jpg',
    '/Semana%20STEM/25/8.jpg',
    '/Semana%20STEM/25/9.jpg',
    '/Semana%20STEM/25/10.jpg',
    '/Semana%20STEM/25/11.jpg',
    '/Semana%20STEM/25/14.jpg',
  ];

  // Datos del Dia 4 - Viernes
  const day4Sessions = [
    {
      time: '07:30 a.m.',
      title: 'Apertura - Hackathon STEM Envigado',
      description:
        'La jornada inició con la bienvenida a la primera Hackathon STEM de Envigado, realizada en el marco de la Semana STEM+ Envigado 2025. Este espacio reunió a estudiantes de distintas instituciones educativas para enfrentar retos reales utilizando creatividad, tecnología e inteligencia artificial. Durante la apertura se resaltó el compromiso del municipio con la educación innovadora y el reconocimiento de Envigado como Ciudad del Aprendizaje y Territorio STEM, así como el trabajo conjunto con aliados estratégicos que hacen posible estos escenarios de innovación educativa.',
      icon: '🚀',
      color: 'from-orange-400 to-orange-600',
    },
    {
      time: '07:45 a.m.',
      title: 'Presentación del Reto y Metodología GENIA',
      description:
        'En este espacio se presentó el desafío central de la Hackathon: desarrollar soluciones para huertas urbanas inteligentes apoyadas en inteligencia artificial, con el objetivo de aportar a la seguridad alimentaria y la sostenibilidad en entornos urbanos. Los participantes conocieron la metodología GENIA (Genera, Explora, Nuevas ideas, Inventa y Aplica), que orientó el proceso creativo de los equipos para identificar problemas, investigar, diseñar soluciones con IA y presentar propuestas con impacto en la comunidad.',
      icon: '🧠',
      color: 'from-blue-400 to-blue-600',
    },
    {
      time: '08:00 a.m.',
      title: 'Asignación de Sub-retos y Presentación de Equipos',
      description:
        'Los equipos participantes se presentaron ante el público y recibieron de manera aleatoria su sub-reto mediante una ruleta digital, lo que permitió asignar distintos desafíos relacionados con el funcionamiento de las huertas urbanas. Entre los temas abordados se encontraban riego inteligente, control de plagas, compostaje, semillas, energías renovables, sensores, impacto ambiental y educación comunitaria. Cada equipo inició así el proceso de ideación y desarrollo de su propuesta utilizando herramientas de inteligencia artificial generativa.',
      subretosRows: [
        {
          reto: 'Monitoreo del crecimiento y salud de las plantas',
          institucion: 'I.E. Escuela Normal Superior María Auxiliadora',
          municipio: 'Copacabana',
          orden: 'Equipo #6',
        },
        {
          reto: 'Inclusión y participación social',
          institucion: 'I.E. Escuela Normal Superior de Envigado',
          municipio: 'Envigado',
          orden: 'Equipo #13',
        },
        {
          reto: 'Recuperación y uso eficiente del agua',
          institucion: 'I.E. Escuela Normal Superior María Auxiliadora',
          municipio: 'Copacabana',
          orden: 'Equipo #15',
        },
        {
          reto: 'Implementación y diseño del espacio',
          institucion: 'I.E. San Vicente Alto de las Flores',
          municipio: 'Envigado',
          orden: 'Equipo #3',
        },
        {
          reto: 'Seguridad alimentaria y distribución local',
          institucion: 'I.E. Escuela Normal Superior María Auxiliadora',
          municipio: 'Copacabana',
          orden: 'Equipo #9',
        },
        {
          reto: 'Educación y sensibilización comunitaria',
          institucion: 'Ser School',
          municipio: 'Envigado',
          orden: 'Equipo #8',
        },
        {
          reto: 'Selección y manejo de semillas',
          institucion: 'I.E. José Miguel de la Calle',
          municipio: 'Envigado',
          orden: 'Equipo #5',
        },
        {
          reto: 'Cuidado y manejo de plagas',
          institucion: 'I.E. Leticia Arango de Avendaño',
          municipio: 'Envigado',
          orden: 'Equipo #2',
        },
        {
          reto: 'Gestión de residuos y compostaje',
          institucion: 'I.E. Luis Carlos Galán Sarmiento',
          municipio: 'Itagüí',
          orden: 'Equipo #7',
        },
      ],
      icon: '🎲',
      color: 'from-purple-400 to-purple-600',
    },
    {
      time: '08:10 a.m.',
      title: 'Desarrollo del Reto en Salas de Innovación',
      description:
        'Luego de conocer su desafío, los equipos se desplazaron a diferentes salas de trabajo donde iniciaron el proceso de creación acompañado por gestores de innovación. Durante esta fase, los estudiantes exploraron ideas, investigaron problemáticas, diseñaron prototipos conceptuales y utilizaron herramientas de inteligencia artificial para estructurar soluciones innovadoras que respondieran a los retos asignados.',
      icon: '⚙️',
      color: 'from-cyan-400 to-cyan-600',
    },
    {
      time: '12:30 p.m.',
      title: 'Receso - Almuerzo',
      description:
        'Después de una intensa jornada de trabajo creativo, los participantes realizaron una pausa para el almuerzo antes de continuar con la etapa final de la Hackathon: la presentación de sus proyectos ante el jurado.',
      icon: '🍽️',
      color: 'from-yellow-400 to-yellow-600',
    },
    {
      time: '01:30 p.m.',
      title: 'Presentación de Proyectos (Pitch)',
      description:
        'Cada equipo presentó su propuesta en un pitch de 5 minutos, seguido de un espacio de preguntas por parte del jurado. Las presentaciones incluyeron el problema identificado, la solución diseñada con inteligencia artificial y el impacto esperado en la comunidad. Los estudiantes utilizaron herramientas digitales para mostrar infografías, imágenes, prototipos y demostraciones de sus ideas innovadoras.',
      icon: '🎤',
      color: 'from-emerald-400 to-emerald-600',
    },
    {
      time: '03:00 p.m.',
      title: 'Deliberación del Jurado y Presentación Artística',
      description:
        'Mientras los jurados evaluaban las propuestas, los asistentes disfrutaron de una presentación artística a cargo de la Estudiantina de Envigado, resaltando el vínculo entre la creatividad artística y la innovación científica.',
      icon: '🎶',
      color: 'from-pink-400 to-pink-600',
    },
    {
      time: '03:30 p.m.',
      title: 'Premiación y Cierre',
      description:
        'La jornada concluyó con el anuncio del equipo ganador de la primera Hackathon STEM de Envigado. Más allá de la competencia, el evento destacó el talento de los estudiantes para utilizar la inteligencia artificial como herramienta de innovación y transformación social.\n\nEl cierre dejó como mensaje que la creatividad, el trabajo colaborativo y la tecnología pueden convertirse en semillas de soluciones para los desafíos del territorio.\n\nEl proyecto ganador fue “Monitoreo del crecimiento y salud de las plantas”, desarrollado por estudiantes de la I.E. Escuela Normal Superior María Auxiliadora del municipio de Copacabana, quienes presentaron una propuesta enfocada en el uso de tecnología e inteligencia artificial para el seguimiento del estado de las plantas en huertas urbanas, contribuyendo al cuidado de los cultivos y a la sostenibilidad alimentaria.',
      icon: '🏆',
      color: 'from-red-400 to-red-600',
    },
  ];

  const day4Highlights = [
    {
      icon: '💡',
      title: 'Innovación con Inteligencia Artificial',
      desc: 'Uso de herramientas de IA generativa para diseñar soluciones con impacto social.',
    },
    {
      icon: '🌱',
      title: 'Huertas Urbanas Inteligentes',
      desc: 'Propuestas tecnológicas para fortalecer la seguridad alimentaria en entornos urbanos.',
    },
    {
      icon: '🧠',
      title: 'Metodología GENIA',
      desc: 'Proceso creativo que conecta investigación, ideación y prototipado.',
    },
    {
      icon: '🤝',
      title: 'Trabajo Colaborativo',
      desc: 'Equipos de estudiantes creando soluciones para su comunidad.',
    },
  ];

  const day4GalleryImages: string[] = [
    '/Semana STEM/26/1.jpg',
    '/Semana STEM/26/2.jpg',
    '/Semana STEM/26/3.jpg',
    '/Semana STEM/26/4.jpg',
    '/Semana STEM/26/5.jpg',
    '/Semana STEM/26/6.jpg',
    '/Semana STEM/26/7.jpg',
    '/Semana STEM/26/8.jpg',
  ];

  const day2TeamCards = [
    'I.E. Alejandro Velez Barrientos',
    'Benedictino de Santa Maria ENBY TEAM',
    'Benedictino de Santa Maria ROBOBEN',
    'I.E. Comercial de Envigado Comercialistas al Rescate',
    'I.E. Comercial de Envigado Comercialistas Roboticos',
    'I.E. Dario de Bedout 1',
    'I.E. Dario de Bedout 2',
    'I.E. El Salado',
    'I.E. Jose Manuel Restrepo Velez',
    'I.E. Jose Miguel de la Calle',
    'I.E. La Paz',
    'I.E. Las Palmas',
    'I.E. Leticia Arango Avendano',
    'I.E. Manuel Uribe Angel',
    'I.E. Maria Poussepin',
    'I.E. Martin Eduardo Rios Llanos 1',
    'I.E. Martin Eduardo Rios Llanos 2',
    'I.E. Normal Superior de Envigado',
    'Colegio Reggio Emilia',
    'I.E. San Vicente Alto de las Flores',
  ];

  const day2TeamVideos: Record<string, string> = {
    'I.E. Alejandro Velez Barrientos': '',
    'Benedictino de Santa Maria ENBY TEAM': '',
    'Benedictino de Santa Maria ROBOBEN': 'https://www.youtube.com/embed/XtdAWwpAniQ?autoplay=1&mute=1&rel=0',
    'I.E. Comercial de Envigado Comercialistas al Rescate': 'https://www.youtube.com/embed/bZe3Y83YwX4?autoplay=1&mute=1&rel=0',
    'I.E. Comercial de Envigado Comercialistas Roboticos': 'https://www.youtube.com/embed/fsU9GRDMgGc?autoplay=1&mute=1&rel=0',
    'I.E. Dario de Bedout 1': 'https://www.youtube.com/embed/gB3XPxh1JdI?autoplay=1&mute=1&rel=0',
    'I.E. Dario de Bedout 2': 'https://www.youtube.com/embed/xJ52Sn3ufsQ?autoplay=1&mute=1&rel=0',
    'I.E. El Salado': 'https://www.youtube.com/embed/O6wNRTuTDdk?autoplay=1&mute=1&rel=0',
    'I.E. Jose Manuel Restrepo Velez': 'https://www.youtube.com/embed/3fXfxUdhSN8?autoplay=1&mute=1&rel=0',
    'I.E. Jose Miguel de la Calle': 'https://www.youtube.com/embed/dm1w5l5n--0?autoplay=1&mute=1&rel=0',
    'I.E. La Paz': 'https://www.youtube.com/embed/6xC2YXb-wuo?autoplay=1&mute=1&rel=0',
    'I.E. Las Palmas': 'https://www.youtube.com/embed/3XGTzJVrO3o?autoplay=1&mute=1&rel=0',
    'I.E. Leticia Arango Avendano': 'https://www.youtube.com/embed/X7xWT9YwWuA?autoplay=1&mute=1&rel=0',
    'I.E. Manuel Uribe Angel': 'https://www.youtube.com/embed/AmXY42urPuQ?autoplay=1&mute=1&rel=0',
    'I.E. Maria Poussepin': '',
    'I.E. Martin Eduardo Rios Llanos 1': 'https://www.youtube.com/embed/AUPxMjj7bhQ?autoplay=1&mute=1&rel=0',
    'I.E. Martin Eduardo Rios Llanos 2': 'https://www.youtube.com/embed/lOGpBY61YBo?autoplay=1&mute=1&rel=0',
    'I.E. Normal Superior de Envigado': 'https://www.youtube.com/embed/IXItsW-CWSU?autoplay=1&mute=1&rel=0',
    'Colegio Reggio Emilia': 'https://www.youtube.com/embed/0uSnMbCQXGk?autoplay=1&mute=1&rel=0',
    'I.E. San Vicente Alto de las Flores': '',
  };

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
          <section className="relative w-full overflow-hidden">
            <img
              src="/banners/Banner-semana.webp"
              alt="Banner principal Semana STEM+ Envigado 2025"
              loading="eager"
              fetchPriority="high"
              decoding="sync"
              className="w-full h-auto object-cover"
            />
          </section>

          {/* Days Navigation */}
          <section className="py-12 px-4 bg-white border-b border-gray-200">
            <div className="max-w-6xl mx-auto">
              <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3 rounded-2xl border border-gray-200 bg-slate-50 p-2">
                {daysNavigation.map((dayNav) => (
                  <motion.button
                    key={dayNav.index}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveDay(dayNav.index)}
                    className={`min-w-[150px] rounded-xl px-5 py-3 text-left transition-all ${
                      activeDay === dayNav.index
                        ? 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-300'
                        : 'text-gray-600 hover:bg-white/80 hover:text-gray-800'
                    }`}
                  >
                    <p className="text-sm font-semibold">{dayNav.day}</p>
                    <p className="text-xs text-gray-500">{dayNav.date} de julio</p>
                  </motion.button>
                ))}
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

          {/* Content Section - Show Miércoles (Day 2) */}
          {activeDay === 2 && (
            <div>
              <section className="px-4 py-8 bg-white">
                <div className="max-w-6xl mx-auto overflow-hidden rounded-2xl shadow-lg">
                  <picture>
                    <source srcSet="/Semana%20STEM/24/portada-miercoles.webp" type="image/webp" />
                    <img
                      src="/Semana%20STEM/24/portada-miercoles.jpeg"
                      alt="Portada miércoles Semana STEM"
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                      className="w-full h-auto object-cover"
                    />
                  </picture>
                </div>
              </section>

              <section className="py-12 px-4 max-w-6xl mx-auto">
                <h3 className="text-3xl font-bold mb-8 text-gray-800">Agenda del Día</h3>
                <div className="space-y-4">
                  {day2Sessions.map((session, idx) => (
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
                          <div>
                            <p className="text-sm font-semibold opacity-90">{session.time}</p>
                            <h3 className="text-2xl font-bold">{session.title}</h3>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-gray-200">
                        {session.time === '08:25 a.m.' && session.title === 'Reglas de Competencia y Presentación de Jurados' ? (
                          <>
                            <p className="text-gray-700 leading-relaxed">{session.description}</p>

                            <details className="mt-6 rounded-lg border border-gray-200 bg-slate-50 p-4">
                              <summary className="cursor-pointer font-semibold text-gray-800">
                                Ver reglas de competencia y jurados
                              </summary>

                              <div className="mt-4 space-y-4 text-gray-700 leading-relaxed">
                                <div>
                                  <h4 className="font-semibold text-gray-900">Reglas de competencia</h4>
                                  <p className="mt-2">El video representa un 40% del puntaje total.</p>
                                  <p>El desempeno en pista representa un 60% del puntaje total del 100%.</p>
                                </div>

                                <div>
                                  <p className="font-medium text-gray-900">
                                    Para la competencia en pista es importante tener en cuenta las siguientes recomendaciones:
                                  </p>
                                  <ol className="mt-2 list-decimal pl-6 space-y-2">
                                    <li>El robot debe ubicarse detrás de la línea de inicio. El tiempo comienza cuando el juez da la orden de salida.</li>
                                    <li>Cada equipo tiene 3 minutos para superar la pista. El tiempo se detiene cuando el robot lleve el kit de supervivencia hasta el triángulo de vida. Si no lo logra en los 3 minutos, se sumarán los puntos obtenidos hasta ese momento.</li>
                                    <li>
                                      Los puntajes que se otorgarán en la pista son:
                                      <ul className="mt-2 list-disc pl-6 space-y-1">
                                        <li>Paso por puente sobre el agua (+3 puntos).</li>
                                        <li>Paso por terreno irregular (+3 puntos).</li>
                                        <li>Paso por terreno inclinado (+3 puntos).</li>
                                        <li>Paso por terreno arenoso (+3 puntos).</li>
                                        <li>Evasión de obstáculos (+3 puntos).</li>
                                        <li>Paso por túnel (+3 puntos).</li>
                                        <li>Entrega de kits de rescate en el triángulo de vida (+9 puntos).</li>
                                      </ul>
                                    </li>
                                    <li>
                                      Durante la competencia en pista, se debe tener en cuenta las siguientes observaciones:
                                      <ul className="mt-2 list-disc pl-6 space-y-1">
                                        <li>El equipo puede tocar el robot para acomodarlo sobre la pista, pero se le descontará 1 punto (-1 punto).</li>
                                        <li>El equipo podrá hacer intervención técnica al robot sobre la pista, pero se le descontará 2 puntos (-2 puntos).</li>
                                        <li>Si el robot no es capaz de superar un obstáculo, el equipo podrá ayudarle manualmente; no se sumarán los puntos del obstáculo y se descontará 1 punto por tocar el robot.</li>
                                      </ul>
                                    </li>
                                    <li>
                                      En caso de empate, se aplicarán los siguientes criterios de desempate:
                                      <ul className="mt-2 list-disc pl-6 space-y-1">
                                        <li>Menor tiempo de ejecución.</li>
                                        <li>Mejor puntaje en el video del proceso.</li>
                                      </ul>
                                    </li>
                                  </ol>
                                </div>

                                <div>
                                  <p className="font-medium text-gray-900">Jurados evaluadores:</p>
                                  <ol className="mt-2 list-decimal pl-6 space-y-3">
                                    <li>
                                      <p className="font-semibold">Rolando Augusto Agudelo Alvarez</p>
                                      <ul className="mt-1 list-disc pl-6 space-y-1">
                                        <li>Ingeniero electrónico, egresado de la Universidad Envigado.</li>
                                        <li>Especialista en gerencia de proyectos.</li>
                                        <li>Docente universitario con 16 años de experiencia en áreas de tecnología e ingeniería.</li>
                                        <li>Experto en robótica; trabaja con semilleros y academia de robótica infantil.</li>
                                        <li>Jurado en competencias locales, nacionales e internacionales de robótica.</li>
                                      </ul>
                                    </li>
                                    <li>
                                      <p className="font-semibold">Boris Mauricio Revelo Rendon</p>
                                      <ul className="mt-1 list-disc pl-6 space-y-1">
                                        <li>Ingeniero en instrumentación y control.</li>
                                        <li>Instructor Cisco y Magíster en educación.</li>
                                        <li>Docente e investigador con experiencia en electrónica, programación y robótica.</li>
                                        <li>Jurado en múltiples eventos de robótica.</li>
                                      </ul>
                                    </li>
                                    <li>Capitana de los Bomberos Voluntarios de Envigado Juliana Rosero.</li>
                                    <li>Sargento de los Bomberos Voluntarios de Envigado Carlos Pérez.</li>
                                  </ol>
                                </div>
                              </div>
                            </details>

                            <p className="mt-6 text-gray-700 leading-relaxed">
                              Los estudiantes tendrán la oportunidad de poner a prueba las plataformas robóticas creadas en nuestra base principal, pero, de igual forma podrán ir pasando por distintas bases en donde seguirán aprendiendo sobre pensamiento computacional y robótica a través del juego.
                            </p>
                          </>
                        ) : (
                          <p className="text-gray-700 leading-relaxed">{session.description}</p>
                        )}

                        {'scheduleRows' in session && session.scheduleRows ? (
                          <div className="mt-6 overflow-hidden rounded-lg border border-gray-200">
                            <div className="overflow-x-auto">
                              <table className="min-w-full bg-white">
                                <thead className="bg-teal-600 text-white">
                                  <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Hora presentación</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Institución Educativa</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Equipo</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {session.scheduleRows.map((row, rowIdx) => (
                                    <tr key={`${row.hora}-${rowIdx}`} className={rowIdx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                                      <td className="px-4 py-3 text-sm font-medium text-gray-800 whitespace-nowrap">{row.hora}</td>
                                      <td className="px-4 py-3 text-sm text-gray-700">{row.institucion}</td>
                                      <td className="px-4 py-3 text-sm text-gray-700 font-medium whitespace-nowrap">{row.equipo}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        ) : null}

                        {'subretosRows' in session && Array.isArray(session.subretosRows) ? (
                          <div className="mt-6 overflow-hidden rounded-lg border border-gray-200">
                            <div className="overflow-x-auto">
                              <table className="min-w-full bg-white">
                                <thead className="bg-teal-600 text-white">
                                  <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Reto</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Institución Educativa</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Municipio</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Orden de presentación</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {session.subretosRows.map((row: { reto: string; institucion: string; municipio: string; orden: string }, rowIdx: number) => (
                                    <tr key={`${row.reto}-${rowIdx}`} className={rowIdx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                                      <td className="px-4 py-3 text-sm text-gray-700 min-w-[240px]">{row.reto}</td>
                                      <td className="px-4 py-3 text-sm text-gray-700 min-w-[220px]">{row.institucion}</td>
                                      <td className="px-4 py-3 text-sm font-medium text-gray-800 whitespace-nowrap">{row.municipio}</td>
                                      <td className="px-4 py-3 text-sm text-gray-700 font-medium whitespace-nowrap">{row.orden}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              <section className="py-4 px-4 max-w-6xl mx-auto">
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Equipos Participantes</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {day2TeamCards.map((teamName, idx) => (
                      <button
                        type="button"
                        key={`${teamName}-${idx}`}
                        onClick={() =>
                          setSelectedDay2Team((prev) => (prev === teamName ? null : teamName))
                        }
                        className={`rounded-xl border p-4 text-left text-gray-800 font-medium shadow-sm transition-all hover:shadow-md ${
                          selectedDay2Team === teamName
                            ? 'border-teal-400 bg-teal-50'
                            : 'border-gray-200 bg-slate-50'
                        }`}
                      >
                        {teamName}
                      </button>
                    ))}
                  </div>

                  {selectedDay2Team && (
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">Video: {selectedDay2Team}</h4>

                      {day2TeamVideos[selectedDay2Team] ? (
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-gray-200 shadow-md">
                          <iframe
                            src={day2TeamVideos[selectedDay2Team]}
                            title={`Video del equipo ${selectedDay2Team}`}
                            loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full"
                          />
                        </div>
                      ) : (
                        <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-gray-500">
                          Video pendiente por cargar para esta institución.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </section>

              <section className="py-12 px-4 max-w-6xl mx-auto">
                <h3 className="text-3xl font-bold mb-8 text-gray-800">Momentos Destacados</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {day2Highlights.map((highlight, idx) => (
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

              <section className="py-12 px-4 max-w-6xl mx-auto">
                <h3 className="text-3xl font-bold mb-8 text-gray-800">Galería de Fotos</h3>
                {day2GalleryImages.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {day2GalleryImages.slice(0, day2VisibleImages).map((image, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.08 }}
                          viewport={{ once: true }}
                          className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                        >
                          <picture>
                            <source srcSet={toWebp(image)} type="image/webp" />
                            <img
                              src={image}
                              alt={`Foto miércoles ${idx + 1}`}
                              loading={idx < 6 ? "eager" : "lazy"}
                              decoding={idx < 6 ? "sync" : "async"}
                              fetchPriority={idx < 6 ? "high" : "low"}
                              className="w-full h-64 object-cover hover:scale-105 transition-transform"
                            />
                          </picture>
                        </motion.div>
                      ))}
                    </div>

                    {day2VisibleImages < day2GalleryImages.length && (
                      <div className="mt-8 flex justify-center">
                        <button
                          type="button"
                          onClick={() => setDay2VisibleImages((prev) => prev + 4)}
                          className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                        >
                          Ver más fotos
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-500">
                    Pendiente por cargar fotos del miércoles 24.
                  </div>
                )}
              </section>
            </div>
          )}

          {/* Content Section - Show Jueves (Day 3) */}
          {activeDay === 3 && (
            <div>
              <section className="px-4 py-8 bg-white">
                <div className="max-w-6xl mx-auto overflow-hidden rounded-2xl shadow-lg">
                  <picture>
                    <source srcSet="/Semana%20STEM/25/portada-jueves.webp" type="image/webp" />
                    <img
                      src="/Semana%20STEM/25/portada-jueves.jpeg"
                      alt="Portada jueves Semana STEM"
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                      className="w-full h-auto object-cover"
                    />
                  </picture>
                </div>
              </section>

              <section className="py-12 px-4 max-w-6xl mx-auto">
                <h3 className="text-3xl font-bold mb-8 text-gray-800">Agenda del Día</h3>
                <div className="space-y-4">
                  {day3Sessions.map((session, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.08 }}
                      viewport={{ once: true }}
                      className="bg-white border border-gray-200 rounded-lg p-6 text-gray-900 shadow-lg hover:shadow-xl transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="text-sm font-semibold opacity-90">{session.time}{'location' in session && session.location ? ` - ${session.location}` : ''}</p>
                            <h3 className="text-2xl font-bold">{session.title}</h3>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-gray-700 leading-relaxed">{session.description}</p>

                        {'forumTopics' in session && Array.isArray(session.forumTopics) ? (
                          <>
                            <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50 p-4">
                              <h4 className="font-semibold text-gray-900">Durante el foro se abordaron temas como:</h4>
                              <ul className="mt-3 list-disc pl-6 space-y-1 text-gray-700">
                                {session.forumTopics.map((topic: string) => (
                                  <li key={topic}>{topic}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <picture>
                                <source srcSet="/Semana%20STEM/25/Profes%201.webp" type="image/webp" />
                                <img
                                  src="/Semana%20STEM/25/Profes%201.jpg"
                                  alt="Foro docentes - imagen 1"
                                  loading="lazy"
                                  className="w-full rounded-lg object-cover shadow-md"
                                />
                              </picture>
                              <picture>
                                <source srcSet="/Semana%20STEM/25/Profes%202.webp" type="image/webp" />
                                <img
                                  src="/Semana%20STEM/25/Profes%202.jpg"
                                  alt="Foro docentes - imagen 2"
                                  loading="lazy"
                                  className="w-full rounded-lg object-cover shadow-md"
                                />
                              </picture>
                            </div>
                          </>
                        ) : null}

                        {session.title === 'Inicio de Exposiciones' ? (
                          <div className="mt-6 overflow-hidden rounded-lg border border-gray-200">
                            <div className="overflow-x-auto">
                              <table className="min-w-full bg-white">
                                <thead className="bg-emerald-600 text-white">
                                  <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Institución educativa</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Nombre del grupo</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Docente feria</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {day3ProjectRows.map((row, rowIdx) => (
                                    <tr key={`${row.institucion}-${row.grupo}-${rowIdx}`} className={rowIdx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                                      <td className="px-4 py-3 text-sm text-gray-700 min-w-[260px]">{row.institucion}</td>
                                      <td className="px-4 py-3 text-sm text-gray-700 min-w-[220px]">{row.grupo}</td>
                                      <td className="px-4 py-3 text-sm text-gray-700 min-w-[220px]">{row.docente}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              <section className="py-12 px-4 max-w-6xl mx-auto">
                <h3 className="text-3xl font-bold mb-8 text-gray-800">Invitados Destacados</h3>
                <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50 p-6">
                  <h4 className="text-xl font-bold text-gray-900">Participación Regional e Institucional</h4>
                  <p className="mt-2 text-gray-700">La feria contó con la participación de instituciones educativas y semilleros de investigación invitados de distintos municipios, fortaleciendo el intercambio de experiencias y el trabajo colaborativo en torno a la investigación escolar y la educación ambiental.</p>
                </div>

                <div className="overflow-hidden rounded-lg border border-gray-200">
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                      <thead className="bg-teal-600 text-white">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-semibold">Municipio / entidad</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold">Institución / semillero</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold">Grupo</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold">Docente(s)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {day3InvitedInstitutions.map((row, rowIdx) => (
                          <tr key={`${row.municipio}-${row.institucion}-${rowIdx}`} className={rowIdx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                            <td className="px-4 py-3 text-sm text-gray-700 min-w-[180px]">{row.municipio}</td>
                            <td className="px-4 py-3 text-sm text-gray-700 min-w-[240px]">{row.institucion}</td>
                            <td className="px-4 py-3 text-sm text-gray-700 min-w-[220px]">{row.grupo || '—'}</td>
                            <td className="px-4 py-3 text-sm text-gray-700 min-w-[220px]">{row.docente}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              <section className="py-12 px-4 max-w-6xl mx-auto">
                <h3 className="text-3xl font-bold mb-8 text-gray-800">Reconocimientos</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {day3Recognitions.map((group) => (
                    <div key={group.category} className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 shadow-sm">
                      <h4 className="text-lg font-bold text-gray-900 mb-4">{group.category}</h4>
                      <ul className="space-y-3 text-sm text-gray-700">
                        {group.items.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-1 text-emerald-600">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-gray-700">
                  Para la evaluación de los proyectos se conformó un equipo de 12 profesionales integrado por tres gestores de innovación, tres técnicos ambientales de la Secretaría de Medio Ambiente, tres docentes de la Institución Universitaria de Envigado y tres invitados.
                </div>
              </section>

              <section className="py-12 px-4 max-w-6xl mx-auto">
                <h3 className="text-3xl font-bold mb-8 text-gray-800">Momentos Destacados</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {day3Highlights.map((highlight, idx) => (
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

              <section className="py-12 px-4 max-w-6xl mx-auto">
                <h3 className="text-3xl font-bold mb-8 text-gray-800">Galería de Fotos</h3>
                {day3GalleryImages.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {day3GalleryImages.map((image, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.08 }}
                        viewport={{ once: true }}
                        className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                      >
                        <picture>
                          <source srcSet={toWebp(image)} type="image/webp" />
                          <img
                            src={image}
                            alt={`Foto jueves ${idx + 1}`}
                            loading={idx < 6 ? 'eager' : 'lazy'}
                            decoding={idx < 6 ? 'sync' : 'async'}
                            fetchPriority={idx < 6 ? 'high' : 'low'}
                            className="w-full h-64 object-cover hover:scale-105 transition-transform"
                          />
                        </picture>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-500">
                    Pendiente por cargar fotos del jueves 25.
                  </div>
                )}
              </section>
            </div>
          )}

          {/* Content Section - Show Viernes (Day 4) */}
          {activeDay === 4 && (
            <div>
              <section className="px-4 py-8 bg-white">
                <div className="max-w-6xl mx-auto overflow-hidden rounded-2xl shadow-lg">
                  <picture>
                    <source srcSet="/Semana%20STEM/26/portada-viernes.webp" type="image/webp" />
                    <img
                      src="/Semana%20STEM/26/portada-viernes.jpeg"
                      alt="Portada viernes Semana STEM"
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                      className="w-full h-auto object-cover"
                    />
                  </picture>
                </div>
              </section>

              <section className="py-12 px-4 max-w-6xl mx-auto">
                <h3 className="text-3xl font-bold mb-8 text-gray-800">Agenda del Día</h3>
                <div className="space-y-4">
                  {day4Sessions.map((session, idx) => (
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
                          <div>
                            <p className="text-sm font-semibold opacity-90">{session.time}</p>
                            <h3 className="text-2xl font-bold">{session.title}</h3>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-gray-200">
                        {session.time === '07:45 a.m.' && session.title === 'Presentación del Reto y Metodología GENIA' ? (
                          <>
                            <p className="text-gray-700 leading-relaxed">{session.description}</p>

                            <details className="mt-6 rounded-lg border border-gray-200 bg-slate-50 p-4">
                              <summary className="cursor-pointer font-semibold text-gray-800">
                                Ver detalle del reto y metodología GENIA
                              </summary>

                              <div className="mt-4 space-y-4 text-gray-700 leading-relaxed">
                                <div>
                                  <h4 className="font-semibold text-gray-900">Introducción y contexto</h4>
                                  <p className="mt-2">Las huertas urbanas son una alternativa sostenible para fortalecer la seguridad alimentaria en las ciudades, reducir el impacto ambiental del transporte de alimentos y promover prácticas ecológicas en las comunidades. Sin embargo, su gestión enfrenta desafíos como el uso eficiente del agua, el manejo del suelo, el control de plagas y la adaptación al cambio climático.</p>
                                  <p className="mt-2">En este contexto, la inteligencia artificial se convierte en una herramienta para optimizar estos procesos y transformar las huertas en sistemas más eficientes, al tiempo que permite a los estudiantes desarrollar competencias tecnológicas, ambientales y de innovación.</p>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-gray-900">Planteamiento del reto</h4>
                                  <p className="mt-2">El reto de la Hackathon consistió en que los equipos diseñaran y prototiparan una solución innovadora basada en inteligencia artificial que permitiera mejorar la gestión, producción o impacto social de una huerta urbana escolar o comunitaria.</p>
                                  <p className="mt-2">Las propuestas debían considerar condiciones reales de implementación, promover la sostenibilidad ambiental y utilizar metodologías de pensamiento de diseño y cultura maker.</p>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-gray-900">Objetivos específicos</h4>
                                  <ul className="mt-2 list-disc pl-6 space-y-1">
                                    <li>Comprender la relación entre seguridad alimentaria, sostenibilidad y huertas urbanas.</li>
                                    <li>Aplicar herramientas de inteligencia artificial para analizar y proponer soluciones a problemáticas del huerto.</li>
                                    <li>Utilizar la metodología GENIA para estructurar el proceso creativo desde la identificación del problema hasta la propuesta de solución.</li>
                                    <li>Fomentar el trabajo colaborativo, la comunicación y la distribución de roles dentro de los equipos.</li>
                                    <li>Promover una visión crítica y responsable sobre el uso de la inteligencia artificial en retos sociales y ambientales.</li>
                                  </ul>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-gray-900">Distribución creativa de roles por equipo</h4>
                                  <p className="mt-2">Cada equipo estuvo conformado por seis integrantes con roles específicos para fortalecer el trabajo colaborativo:</p>
                                  <ul className="mt-2 list-disc pl-6 space-y-1">
                                    <li>Líder de innovación: impulsa las ideas y orienta el proceso creativo.</li>
                                    <li>Investigador de IA y medio ambiente: analiza la problemática y explora el uso de tecnologías.</li>
                                    <li>Diseñador digital / prototipador: desarrolla el diseño visual o conceptual de la solución.</li>
                                    <li>Gestor de recursos: organiza materiales y herramientas necesarias para el proyecto.</li>
                                    <li>Comunicador: construye el mensaje y la narrativa del proyecto.</li>
                                    <li>Presentador: expone la solución final ante el jurado.</li>
                                  </ul>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-gray-900">Entregables esperados</h4>
                                  <p className="mt-2">Los equipos debían presentar tres elementos principales:</p>
                                  <ul className="mt-2 list-disc pl-6 space-y-1">
                                    <li>Prototipo: modelo conceptual o funcional que integre inteligencia artificial para mejorar la huerta urbana.</li>
                                    <li>Presentación tipo pitch: explicación clara del problema, la solución propuesta y su impacto social y ambiental.</li>
                                    <li>Documento o video: evidencia del proceso de trabajo, los roles del equipo y el uso de herramientas de IA.</li>
                                  </ul>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-gray-900">Criterios de evaluación</h4>
                                  <p className="mt-2">Las propuestas fueron evaluadas considerando:</p>
                                  <ul className="mt-2 list-disc pl-6 space-y-1">
                                    <li>Creatividad e innovación: uso original de la inteligencia artificial para resolver el reto.</li>
                                    <li>Viabilidad: posibilidad real de implementar la solución en un contexto escolar o comunitario.</li>
                                    <li>Impacto social y ambiental: aporte a la sostenibilidad y a la seguridad alimentaria.</li>
                                    <li>Trabajo en equipo: articulación de roles y calidad del proceso colaborativo.</li>
                                  </ul>
                                </div>
                              </div>
                            </details>
                          </>
                        ) : (
                          <p className="text-gray-700 leading-relaxed">{session.description}</p>
                        )}

                        {'subretosRows' in session && Array.isArray(session.subretosRows) ? (
                          <div className="mt-6 overflow-hidden rounded-lg border border-gray-200">
                            <div className="overflow-x-auto">
                              <table className="min-w-full bg-white">
                                <thead className="bg-teal-600 text-white">
                                  <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Reto</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Institución Educativa</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Municipio</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Orden de presentación</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {session.subretosRows.map((row: { reto: string; institucion: string; municipio: string; orden: string }, rowIdx: number) => (
                                    <tr key={`${row.reto}-${rowIdx}`} className={rowIdx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                                      <td className="px-4 py-3 text-sm text-gray-700 min-w-[240px]">{row.reto}</td>
                                      <td className="px-4 py-3 text-sm text-gray-700 min-w-[220px]">{row.institucion}</td>
                                      <td className="px-4 py-3 text-sm font-medium text-gray-800 whitespace-nowrap">{row.municipio}</td>
                                      <td className="px-4 py-3 text-sm text-gray-700 font-medium whitespace-nowrap">{row.orden}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              <section className="py-12 px-4 max-w-6xl mx-auto">
                <h3 className="text-3xl font-bold mb-8 text-gray-800">Momentos Destacados</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {day4Highlights.map((highlight, idx) => (
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

              <section className="py-12 px-4 max-w-6xl mx-auto">
                <h3 className="text-3xl font-bold mb-8 text-gray-800">Galería de Fotos</h3>
                {day4GalleryImages.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {day4GalleryImages.map((image, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.08 }}
                          viewport={{ once: true }}
                          className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                        >
                          <picture>
                            <source srcSet={toWebp(image)} type="image/webp" />
                            <img
                              src={image}
                              alt={`Foto viernes ${idx + 1}`}
                              loading={idx < 6 ? "eager" : "lazy"}
                              decoding={idx < 6 ? "sync" : "async"}
                              fetchPriority={idx < 6 ? "high" : "low"}
                              className="w-full h-64 object-cover hover:scale-105 transition-transform"
                            />
                          </picture>
                        </motion.div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-500">
                    Pendiente por cargar fotos del viernes 26.
                  </div>
                )}
              </section>
            </div>
          )}

          {/* Other Days Placeholder */}
          {activeDay > 4 && (
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
