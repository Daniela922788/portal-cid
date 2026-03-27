import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, BookOpen, X, Search, ChevronRight, ChevronLeft } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Skeleton } from "@/components/ui/skeleton";

interface ECard {
  id: string;
  titulo: string;
  tematica: string;
  estado: string;
  lugar: string;
  edad: string;
  fechas: string[];
  sesiones: string[]; // ISO dates: "2026-03-20"
  ano: number;
  imagen: string;
  subtitulo: string;
  descripcion: string[];
  trabajado: string[];
  enfoque: string;
  metodologias: string[];
  enfoqueCierre: string;
  competencias: string[];
  proyectoFinal: string;
}

const toWebp = (src: string) => src.replace(/\.(jpe?g|png)$/i, ".webp");

export default function Formacion() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTematicas, setSelectedTematicas] = useState<string[]>([]);
  const [selectedEstados, setSelectedEstados] = useState<string[]>([]);
  const [selectedEdades, setSelectedEdades] = useState<string[]>([]);
  const [selectedLugares, setSelectedLugares] = useState<string[]>([]);
  const [ecardOpen, setEcardOpen] = useState(false);
  const [selectedEcard, setSelectedEcard] = useState<ECard | null>(null);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const { data: cursos = [], isLoading } = trpc.courses.list.useQuery();

  // Opciones de filtros
  const tematicas = ["Robótica", "Inteligencia Artificial", "Alfabetización Digital", "Diseño", "Animación", "Música", "Ciencia", "Fotografía", "Medio ambiente", "Podcast", "Edición", "Cocina", "Analítica", "Tecnología", "Creatividad", "Escritura"];
  const tematicaAliases: Record<string, string[]> = {
    "Robótica": ["Robótica", "Robotica"],
    "Inteligencia Artificial": ["Inteligencia Artificial", "IA"],
    "Música": ["Música", "Musica"],
    "Fotografía": ["Fotografía", "Fotografia"],
    "Edición": ["Edición", "Edicion"],
  };
  const estados = ["En inscripciones", "En curso", "Finalizado"];
  const edades = ["8 - 12", "12 a 18", "+18", "+60"];
  const edadBuckets: Record<string, { min: number; max: number }> = {
    "8 - 12": { min: 8, max: 12 },
    "12 a 18": { min: 12, max: 18 },
    "+18": { min: 18, max: Number.POSITIVE_INFINITY },
    "+60": { min: 60, max: Number.POSITIVE_INFINITY },
  };
  const lugares = [
    "Biblioteca Pública y Parque Cultural Débora Arango",
    "Otros lugares",
  ];
  const lugarAliases: Record<string, string[]> = {
    "Biblioteca Pública y Parque Cultural Débora Arango": ["Biblioteca Pública y Parque Cultural Débora Arango"],
    "Otros lugares": ["Lugar X", "Palma de Mayorca", "Area de Recreación Urbana (ARU) Trianón-La Heliodora", "Envigado", "Lugar Y"],
  };

  // Datos de ejemplo de ECards
  const ecards: ECard[] = [
    {
      id: "1",
      titulo: "STEAMers Kids",
      tematica: "Robótica",
      estado: "Finalizado",
      edad: "10 a 13 años",
      lugar: "Biblioteca Pública y Parque Cultural Débora Arango",
      fechas: [
        "22 de abril - 20 de mayo de 2025",
        "5 sesiones presenciales (1 sesión semanal de 1 hora y 30 minutos)",
      ],
      ano: 2025,
      imagen: "/Formacion/Ecard%20STEAMER%20KIDS.jpeg",
      subtitulo:
        "Espacio formativo para explorar Ciencia, Tecnología, Ingeniería, Arte y Matemáticas (STEAM) con experiencias prácticas y basadas en el juego.",
      descripcion: [
        "El Semillero STEAMers Kids es un espacio formativo dirigido a estudiantes de primaria para introducirlos en las áreas de Ciencia, Tecnología, Ingeniería, Arte y Matemáticas (STEAM) a través de actividades lúdicas y prácticas. Durante el curso, los participantes exploraron el pensamiento computacional, la programación por bloques, el modelado 3D en Tinkercad y la construcción de robots artesanales, trabajando mediante metodologías activas como el juego, los retos y el trabajo colaborativo. Como resultado del proceso, los estudiantes diseñaron y pusieron a prueba sus propios robots, fortaleciendo habilidades como la creatividad, la resolución de problemas y el trabajo en equipo.",
      ],
      trabajado: [
        "Exploraron el pensamiento computacional mediante actividades desconectadas.",
        "Aprendieron programación por bloques a través de retos interactivos.",
        "Realizaron modelado 3D utilizando la plataforma Tinkercad.",
        "Diseñaron y construyeron robots artesanales con materiales accesibles.",
        "Participaron en una actividad final para poner a prueba sus robots.",
      ],
      enfoque:
        "El semillero se desarrolló bajo el enfoque educativo STEAM+, que promueve el aprendizaje activo y la integración de múltiples áreas del conocimiento.",
      metodologias: [
        "Design Thinking",
        "Gamificación",
        "Aprendizaje basado en retos",
      ],
      enfoqueCierre:
        "Estas estrategias permitieron que los estudiantes aprendieran experimentando, creando y colaborando con otros compañeros.",
      competencias: [
        "Pensamiento computacional",
        "Creatividad e innovación",
        "Resolución de problemas",
        "Trabajo en equipo y colaboración",
        "Interés por la ciencia y la tecnología",
      ],
      sesiones: [],
      proyectoFinal:
        "Como cierre del semillero, los estudiantes diseñaron, construyeron y perfeccionaron robots artesanales, los cuales fueron puestos a prueba en una actividad colaborativa donde aplicaron los conocimientos adquiridos durante las sesiones.",
    },
    {
      id: "2",
      titulo: "IA para Educadores",
      tematica: "IA",
      estado: "En curso",
      edad: "18+ años",
      lugar: "Lugar X",
      fechas: ["15 de marzo - 30 de abril de 2026"],
      sesiones: [
        "2026-03-20",
        "2026-03-27",
        "2026-04-03",
        "2026-04-17",
        "2026-04-24",
      ],
      ano: 2026,
      imagen: "/Formacion/Ecard%20STEAMER%20KIDS.jpeg",
      subtitulo: "Curso sobre aplicaciones de inteligencia artificial en educación.",
      descripcion: ["Contenido del curso..."],
      trabajado: ["Tema 1", "Tema 2"],
      enfoque: "Enfoque pedagógico...",
      metodologias: ["Método 1", "Método 2"],
      enfoqueCierre: "Conclusión...",
      competencias: ["Competencia 1"],
      proyectoFinal: "Proyecto final...",
    },
    {
      id: "3",
      titulo: "Explorando la IA",
      tematica: "Inteligencia Artificial",
      estado: "Finalizado",
      edad: "8 a 17 años",
      lugar: "Biblioteca Pública y Parque Cultural Débora Arango",
      fechas: ["24 de abril - 29 de mayo de 2025"],
      sesiones: [],
      ano: 2025,
      imagen: "/Formacion/Ecard%20Explorando%20la%20IA.jpeg",
      subtitulo:
        "Curso para comprender la Inteligencia Artificial de forma accesible, creativa y reflexiva.",
      descripcion: [
        "El curso Explorando la Inteligencia Artificial acercó a estudiantes de primaria y secundaria al mundo de la IA de manera accesible, creativa y reflexiva, permitiéndoles comprender qué es, cómo funciona y en qué contextos se utiliza. A través de actividades lúdicas, herramientas digitales y proyectos creativos, los participantes exploraron conceptos como el aprendizaje automático, los algoritmos y el uso de plataformas de IA para la creación de contenidos como historias, imágenes y música. El proceso se desarrolló mediante metodologías activas que promovieron el pensamiento crítico, el trabajo colaborativo y la reflexión ética, finalizando con la socialización de proyectos donde los estudiantes analizaron el impacto y las implicaciones del uso de la inteligencia artificial en la vida cotidiana.",
      ],
      trabajado: ["Proyecto creativo con IA"],
      enfoque: "Enfoque de exploración tecnológica y pensamiento crítico.",
      metodologias: ["Aprendizaje basado en proyectos"],
      enfoqueCierre: "Socialización de proyectos y reflexión ética.",
      competencias: ["Pensamiento crítico", "Creatividad", "Trabajo colaborativo"],
      proyectoFinal: "Socialización de proyectos sobre uso e impacto de la IA.",
    },
    {
      id: "4",
      titulo: "Senior Tech: Herramientas digitales para la vida",
      tematica: "Alfabetización Digital",
      estado: "Finalizado",
      edad: "Adultos mayores",
      lugar: "Palma de Mayorca",
      fechas: ["6 de mayo - 24 de junio de 2025"],
      sesiones: [],
      ano: 2025,
      imagen: "/Formacion/Ecard%20Senior%20Tech.jpeg",
      subtitulo:
        "Ruta formativa para fortalecer habilidades digitales y autonomía tecnológica en personas mayores.",
      descripcion: [
        "La ruta formativa Senior Tech: apropiación digital para todxs fue un espacio diseñado para fortalecer las habilidades digitales de personas mayores, promoviendo su inclusión y autonomía en un entorno cada vez más tecnológico. A través de un enfoque práctico y vivencial basado en STEAM, los participantes aprendieron el uso básico de dispositivos, navegación segura en internet, realización de trámites en línea y el uso de herramientas como asistentes virtuales e inteligencia artificial. El proceso se desarrolló mediante actividades colaborativas, ejercicios cotidianos y espacios de reflexión, permitiendo no solo adquirir conocimientos técnicos, sino también ganar confianza, pensamiento crítico y seguridad en el uso de la tecnología en su vida diaria.",
      ],
      trabajado: [
        "Uso básico de dispositivos digitales",
        "Navegación segura en internet",
        "Trámites en línea",
        "Uso de asistentes virtuales e inteligencia artificial",
      ],
      enfoque: "Enfoque práctico, vivencial y colaborativo basado en STEAM.",
      metodologias: ["Actividades colaborativas", "Ejercicios cotidianos", "Espacios de reflexión"],
      enfoqueCierre: "Fortalecimiento de confianza y autonomía digital para la vida diaria.",
      competencias: ["Autonomía digital", "Pensamiento crítico", "Seguridad digital"],
      proyectoFinal: "Aplicación de herramientas digitales en situaciones cotidianas.",
    },
    {
      id: "5",
      titulo: "Exprésate con estilo: Canva",
      tematica: "Diseño",
      estado: "Finalizado",
      edad: "10 en adelante",
      lugar: "Biblioteca Pública y Parque Cultural Débora Arango",
      fechas: ["14 de mayo - 30 de mayo"],
      sesiones: [],
      ano: 2025,
      imagen: "/Formacion/CID-10_Ecard.jpeg",
      subtitulo:
        "Curso para fortalecer habilidades de comunicación visual con herramientas digitales.",
      descripcion: [
        "El curso Exprésate con estilo: Canva fue un espacio formativo orientado a profesionales, emprendedores y estudiantes interesados en fortalecer sus habilidades de comunicación visual mediante el uso de herramientas digitales. A través de sesiones prácticas, los participantes aprendieron a crear piezas gráficas atractivas para sus proyectos, explorando el potencial de Canva para diseñar contenidos visuales de manera sencilla y creativa, potenciando así su capacidad de comunicar ideas de forma efectiva.",
      ],
      trabajado: [
        "Diseño de piezas gráficas con Canva",
        "Comunicación visual para proyectos",
      ],
      enfoque: "Aprendizaje práctico orientado a comunicación visual efectiva.",
      metodologias: ["Sesiones prácticas", "Aprendizaje basado en creación"],
      enfoqueCierre: "Fortalecimiento de habilidades de diseño y expresión visual.",
      competencias: ["Comunicación visual", "Creatividad digital"],
      proyectoFinal: "Creación de piezas gráficas aplicadas a proyectos personales o profesionales.",
    },
    {
      id: "6",
      titulo: "Fotografía Creativa Express",
      tematica: "Fotografía",
      estado: "Finalizado",
      edad: "12 a 20 años",
      lugar: "Biblioteca Pública y Parque Cultural Débora Arango",
      fechas: ["13 de junio - 29 de mayo"],
      sesiones: [],
      ano: 2025,
      imagen: "/Formacion/CID-09_Ecard.jpeg",
      subtitulo:
        "Experiencia intensiva para desarrollar una mirada fotográfica técnica, narrativa y creativa.",
      descripcion: [
        "Este curso de fotografía creativa express está diseñado como una experiencia de aprendizaje intensiva para transformar la mirada técnica en una capacidad narrativa profunda en tiempo récord. El programa se centra en el dominio de la luz natural y artificial, explorando cómo las atmósferas visuales y los contrastes pueden comunicar emociones específicas sin depender exclusivamente de equipos costosos. A través de módulos prácticos, los estudiantes aprenden reglas de composición avanzada, como el uso de marcos naturales y líneas de fuga, para guiar la atención del espectador de manera efectiva. La metodología promueve el \"disparo consciente\", una técnica que busca minimizar errores desde la captura para optimizar los flujos de trabajo en la postproducción digital posterior. Al finalizar, los participantes habrán desarrollado un lenguaje visual propio, siendo capaces de identificar oportunidades estéticas en entornos cotidianos y producir imágenes con acabado profesional. Es una propuesta ideal para quienes buscan resultados inmediatos en sus proyectos visuales, integrando la eficiencia técnica con la sensibilidad artística necesaria para contar historias impactantes.",
      ],
      trabajado: [
        "Dominio de luz natural y artificial",
        "Composición avanzada",
        "Narrativa visual",
        "Disparo consciente y postproducción",
      ],
      enfoque: "Aprendizaje intensivo orientado a resultados visuales inmediatos y de alta calidad.",
      metodologias: ["Módulos prácticos", "Ejercicios de observación", "Producción visual aplicada"],
      enfoqueCierre: "Integración de técnica fotográfica con sensibilidad artística y narrativa.",
      competencias: ["Composición visual", "Narrativa fotográfica", "Sensibilidad estética"],
      proyectoFinal: "Producción de imágenes con acabado profesional y enfoque narrativo propio.",
    },
    {
      id: "7",
      titulo: "Stop Motion con Legos",
      tematica: "Animación",
      estado: "Finalizado",
      edad: "8 a 16 años",
      lugar: "Biblioteca Pública y Parque Cultural Débora Arango",
      fechas: ["17 de junio - 20 de junio de 2025"],
      sesiones: [],
      ano: 2025,
      imagen: "/Formacion/stopmotion%20con%20legos.png",
      subtitulo:
        "Curso creativo para explorar animación y narrativa audiovisual con LEGO y herramientas digitales.",
      descripcion: [
        "El curso Stop Motion con Legos fue una experiencia creativa en la que niños, niñas y adolescentes exploraron el mundo de la animación y la narrativa audiovisual mediante la creación de cortometrajes cuadro a cuadro. A través del uso de piezas LEGO, herramientas digitales y metodologías activas, los participantes diseñaron historias, construyeron escenarios y dieron vida a sus ideas, fortaleciendo habilidades como la creatividad, el pensamiento lógico, el trabajo en equipo y la resolución de problemas, en un proceso lúdico que integró elementos del pensamiento computacional y la expresión artística.",
      ],
      trabajado: [
        "Creación de historias cuadro a cuadro",
        "Diseño de escenarios con LEGO",
        "Narrativa audiovisual",
        "Pensamiento computacional y expresión artística",
      ],
      enfoque: "Aprendizaje lúdico y creativo para contar historias a través de la animación.",
      metodologias: ["Metodologías activas", "Creación colaborativa", "Producción audiovisual práctica"],
      enfoqueCierre: "Integración de creatividad, lógica y trabajo en equipo mediante el stop motion.",
      competencias: ["Creatividad", "Pensamiento lógico", "Trabajo en equipo", "Resolución de problemas"],
      proyectoFinal: "Creación de cortometrajes animados cuadro a cuadro con LEGO.",
    },
    {
      id: "8",
      titulo: "STEAMers Kids 2",
      tematica: "Robótica",
      estado: "Finalizado",
      edad: "10 a 13 años",
      lugar: "Biblioteca Pública y Parque Cultural Débora Arango",
      fechas: ["16 de junio - 20 de junio de 2025"],
      sesiones: [],
      ano: 2025,
      imagen: "/Formacion/Ecard%20Steamer%20Kids%20%281%29.jpeg",
      subtitulo:
        "Curso para explorar las áreas STEAM mediante programación, pensamiento computacional y robótica creativa.",
      descripcion: [
        "El curso STEAMers Kids fue un espacio formativo dirigido a niños y niñas entre 10 y 13 años para explorar las áreas STEAM a través de la programación, el pensamiento computacional y la creación de proyectos tecnológicos. Durante las sesiones, los participantes trabajaron con programación por bloques, diseño 3D en Tinkercad y la construcción de robots artesanales motorizados, desarrollando retos prácticos que fomentaron la creatividad, el pensamiento lógico y la resolución de problemas. Como resultado, los estudiantes diseñaron, construyeron y pusieron a prueba sus propios robots en una actividad colaborativa, fortaleciendo habilidades técnicas y de trabajo en equipo.",
      ],
      trabajado: [
        "Programación por bloques",
        "Pensamiento computacional",
        "Diseño 3D en Tinkercad",
        "Construcción de robots artesanales motorizados",
      ],
      enfoque: "Aprendizaje práctico STEAM basado en retos y creación tecnológica.",
      metodologias: ["Retos prácticos", "Aprendizaje activo", "Trabajo colaborativo"],
      enfoqueCierre: "Fortalecimiento de habilidades técnicas, creativas y de colaboración.",
      competencias: ["Creatividad", "Pensamiento lógico", "Resolución de problemas", "Trabajo en equipo"],
      proyectoFinal: "Diseño, construcción y prueba de robots propios en una actividad colaborativa.",
    },
    {
      id: "9",
      titulo: "Música y Ciencia",
      tematica: "Música",
      estado: "Finalizado",
      edad: "8 a 12 años",
      lugar: "Biblioteca Pública y Parque Cultural Débora Arango",
      fechas: ["24 de junio - 27 de junio"],
      sesiones: [],
      ano: 2025,
      imagen: "/Formacion/Ecard%20Ciencia%20y%20M%C3%BAsica.jpeg",
      subtitulo:
        "Taller para explorar la música y el sonido mediante la creación de instrumentos artesanales.",
      descripcion: [
        "El taller Creando instrumentos fue una experiencia lúdica en la que niños y niñas exploraron la música a través de la creación de instrumentos artesanales como maracas, palo de agua y zampoñas. Mediante actividades de ritmo, construcción y experimentación sonora, los participantes comprendieron de manera práctica conceptos básicos sobre el sonido, fortaleciendo su creatividad, el trabajo en equipo y la expresión musical en un ambiente participativo.",
      ],
      trabajado: [
        "Creación de maracas, palo de agua y zampoñas",
        "Ritmo y experimentación sonora",
        "Conceptos básicos sobre el sonido",
      ],
      enfoque: "Aprendizaje lúdico basado en construcción, ritmo y exploración musical.",
      metodologias: ["Actividades de ritmo", "Construcción artesanal", "Experimentación sonora"],
      enfoqueCierre: "Fortalecimiento de creatividad, expresión musical y trabajo en equipo.",
      competencias: ["Creatividad", "Trabajo en equipo", "Expresión musical"],
      proyectoFinal: "Construcción y exploración de instrumentos artesanales propios.",
    },
    {
      id: "10",
      titulo: "Explorando el territorio",
      tematica: "Medio ambiente",
      estado: "Finalizado",
      edad: "9 a 12 años",
      lugar: "Area de Recreación Urbana (ARU) Trianón-La Heliodora",
      fechas: ["24 de junio - 27 de julio de 2025"],
      sesiones: [],
      ano: 2025,
      imagen: "/Formacion/Ecard%20Explorando.jpeg",
      subtitulo:
        "Experiencia educativa para explorar la flora y fauna de Envigado mediante recorridos y actividades prácticas.",
      descripcion: [
        "El curso Explorando el territorio fue una experiencia educativa en la que niños y niñas exploraron la flora y fauna de Envigado a través de recorridos, observación directa y actividades prácticas como la elaboración de herbarios y el uso de bitácoras de campo. Durante las sesiones, los participantes fortalecieron su pensamiento científico, la creatividad y el trabajo en equipo, al tiempo que desarrollaron una mayor conciencia sobre el cuidado del entorno natural y la importancia de la biodiversidad.",
      ],
      trabajado: [
        "Recorridos y observación directa",
        "Elaboración de herbarios",
        "Uso de bitácoras de campo",
        "Exploración de flora y fauna local",
      ],
      enfoque: "Aprendizaje vivencial en territorio para fortalecer la relación con el entorno natural.",
      metodologias: ["Recorridos guiados", "Observación directa", "Actividades prácticas"],
      enfoqueCierre: "Desarrollo de pensamiento científico, creatividad y conciencia ambiental.",
      competencias: ["Pensamiento científico", "Trabajo en equipo", "Conciencia ambiental"],
      proyectoFinal: "Registro y análisis de hallazgos del entorno natural mediante bitácoras y herbarios.",
    },
    {
      id: "11",
      titulo: "Let's Play Videopodcast Gamer",
      tematica: "Podcast",
      estado: "Finalizado",
      edad: "12 a 18 años",
      lugar: "Biblioteca Pública y Parque Cultural Débora Arango",
      fechas: ["24 de junio - 27 de julio de 2025"],
      sesiones: [],
      ano: 2025,
      imagen: "/Formacion/Ecard%20Video%20Podcast.jpeg",
      subtitulo:
        "Semillero vacacional para crear contenidos digitales y episodios sobre videojuegos en formato podcast.",
      descripcion: [
        "El semillero vacacional Videopodcast Gamer fue una experiencia formativa en la que los participantes exploraron la creación de contenidos digitales a través del formato podcast, enfocado en el mundo de los videojuegos. Durante las sesiones, desarrollaron habilidades de expresión oral, manejo de la voz, escritura de guiones y producción audiovisual, culminando con la grabación de sus propios episodios. Este proceso fortaleció la creatividad, la comunicación y la confianza en un entorno dinámico y participativo.",
      ],
      trabajado: [
        "Expresión oral y manejo de la voz",
        "Escritura de guiones",
        "Producción audiovisual",
        "Grabación de episodios propios",
      ],
      enfoque: "Aprendizaje creativo y participativo para la producción de contenidos digitales.",
      metodologias: ["Producción práctica", "Creación colaborativa", "Narrativa digital"],
      enfoqueCierre: "Fortalecimiento de creatividad, comunicación y confianza en un entorno dinámico.",
      competencias: ["Comunicación", "Creatividad", "Confianza", "Producción digital"],
      proyectoFinal: "Grabación y socialización de episodios de videopodcast sobre videojuegos.",
    },
    {
      id: "12",
      titulo: "Fotografía de retrato",
      tematica: "Fotografía",
      estado: "Finalizado",
      edad: "18 o mas años",
      lugar: "Biblioteca Pública y Parque Cultural Débora Arango",
      fechas: ["29 de julio - 12 de agosto"],
      sesiones: [],
      ano: 2025,
      imagen: "/Formacion/Ecard%20Fotografia%20de%20Retrato.jpeg",
      subtitulo:
        "Serie de cursos para convertir el celular en una herramienta de expresión artística y conexión humana.",
      descripcion: [
        "Retratos con Alma es una serie de cursos diseñados para transformar el celular en una herramienta de expresión artística y conexión humana profunda. A lo largo de este proceso, los participantes exploran la fotografía más allá de la captura convencional, enfocándose en descubrir la esencia de las personas y las historias que habitan en su entorno cotidiano. Desde el dominio de la luz natural y el drama del blanco y negro hasta la construcción de narrativas visuales complejas en color, cada sesión prioriza la sensibilidad narrativa sobre la técnica fría. El programa enseña a dirigir sujetos mediante la conversación y la empatía, reemplazando las poses rígidas por gestos genuinos que revelan la identidad única del retratado. En esta etapa avanzada, los estudiantes profundizan en el retrato conceptual, la psicología cromática y la postproducción profesional en Snapseed, desarrollando una voz artística propia y coherente. El viaje creativo culmina en una exposición física donde cada participante materializa su visión en una fotografía impresa de alta calidad. Esta propuesta busca democratizar el arte visual, demostrando que no se requiere equipo profesional para conmover a la comunidad. Al finalizar, los alumnos no solo dominan su dispositivo, sino que han cultivado una mirada poética capaz de transformar lo ordinario en una obra de arte digna de ser expuesta.",
      ],
      trabajado: [
        "Dirección de retrato con empatía y conversación",
        "Narrativas visuales en blanco y negro y color",
        "Retrato conceptual y psicología cromática",
        "Postproducción profesional en Snapseed",
      ],
      enfoque: "Formación artística orientada a la sensibilidad narrativa y la identidad visual.",
      metodologias: ["Práctica guiada", "Narrativa visual", "Crítica y curaduría fotográfica"],
      enfoqueCierre: "Consolidación de una voz artística propia y exposición final de obra.",
      competencias: ["Narrativa visual", "Dirección de retrato", "Postproducción", "Expresión artística"],
      proyectoFinal: "Exposición física de una fotografía de retrato impresa en alta calidad.",
    },
    {
      id: "13",
      titulo: "Fotografía Experimental",
      tematica: "Fotografía",
      estado: "Finalizado",
      edad: "18 o mas años",
      lugar: "Biblioteca Pública y Parque Cultural Débora Arango",
      fechas: ["29 de julio - 12 de agosto"],
      sesiones: [],
      ano: 2025,
      imagen: "/Formacion/Ecard%20Fotografia%20Experimental.jpeg",
      subtitulo:
        "Un laboratorio creativo y práctico donde el celular se convierte en una herramienta de exploración artística ilimitada.",
      descripcion: [
        "El curso fotografía Experimental es un laboratorio creativo y práctico donde el teléfono celular deja de ser una simple cámara para convertirse en una herramienta de exploración artística ilimitada. A lo largo de la experiencia, los estudiantes descubren cómo romper las reglas tradicionales de la imagen, aprendiendo a alterar físicamente la óptica con vidrios y celofanes, manipular el comportamiento de la luz a través de técnicas como el light painting y la larga exposición, y fusionar el mundo físico con el digital mediante proyecciones. En esencia, se aprende a observar la realidad desde una perspectiva completamente nueva, transformando objetos cotidianos y espacios comunes en composiciones visuales abstractas y oníricas, lo que les permite desarrollar su pensamiento creativo y encontrar su propia voz expresiva más allá del modo automático.",
      ],
      trabajado: [
        "Alteración física de la óptica con vidrios y celofanes",
        "Técnicas de light painting y larga exposición",
        "Fusión del mundo físico y digital mediante proyecciones",
        "Composiciones visuales abstractas y oníricas",
      ],
      enfoque: "Exploración artística ilimitada a través de técnicas experimentales con dispositivos móviles.",
      metodologias: ["Experimentación práctica", "Exploración creativa", "Innovación visual"],
      enfoqueCierre: "Desarrollo del pensamiento creativo y expresión artística personal más allá de formas convencionales.",
      competencias: ["Pensamiento creativo", "Exploración técnica", "Expresión artística", "Innovación visual"],
      proyectoFinal: "Creación de series de composiciones visuales experimentales y presentación de descubrimientos artísticos.",
    },
    {
      id: "14",
      titulo: "CapCut Creativo",
      tematica: "Edición",
      estado: "Finalizado",
      edad: "18 o mas años",
      lugar: "Biblioteca Pública y Parque Cultural Débora Arango",
      fechas: ["23 de julio - 31 de julio"],
      sesiones: [],
      ano: 2025,
      imagen: "/Formacion/Ecard%20CapCut%20Creativo.jpeg",
      subtitulo:
        "Curso práctico y dinámico para editar videos desde el celular con creatividad y enfoque comunicativo.",
      descripcion: [
        "El curso CapCut Creativo permitió a los participantes aprender a editar videos desde el celular de forma práctica y dinámica, explorando herramientas básicas de corte, efectos, texto y sonido. A través de actividades creativas, desarrollaron contenidos audiovisuales propios, fortaleciendo su creatividad, expresión digital y habilidades de comunicación en entornos digitales.",
      ],
      trabajado: [
        "Herramientas de corte y organización de clips",
        "Aplicación de efectos, texto y sonido",
        "Producción de contenidos audiovisuales propios",
        "Comunicación digital en formatos de video",
      ],
      enfoque: "Formación práctica en edición móvil para potenciar la expresión digital.",
      metodologias: ["Aprendizaje basado en proyectos", "Práctica guiada", "Creación audiovisual"],
      enfoqueCierre: "Consolidación de habilidades narrativas y técnicas para comunicar ideas con video.",
      competencias: ["Edición de video", "Creatividad", "Comunicación digital", "Narrativa audiovisual"],
      proyectoFinal: "Creación y presentación de una pieza audiovisual editada completamente en celular.",
    },
    {
      id: "15",
      titulo: "A Fuego Lento",
      tematica: "Cocina",
      estado: "Finalizado",
      edad: "18 o mas años",
      lugar: "Biblioteca Pública y Parque Cultural Débora Arango",
      fechas: ["10 de septiembre - 29 de octubre"],
      sesiones: [],
      ano: 2025,
      imagen: "/Formacion/Ecard%20A%20Fuego%20Lento.jpeg",
      subtitulo:
        "Curso para explorar la alimentación como fenómeno cultural, ecológico, narrativo y científico.",
      descripcion: [
        "La alimentación como un fenómeno cultural, ecológico, narrativo y científico, a través de experiencias sensoriales y reflexivas en torno a ingredientes fundamentales de la cocina colombiana, especialmente antioqueña, con énfasis en la conexión entre historia, ciencia y tradición",
      ],
      trabajado: [
        "Lectura cultural e histórica de ingredientes locales",
        "Experiencias sensoriales aplicadas a la cocina",
        "Relación entre ciencia, tradición y territorio",
        "Reflexión ecológica sobre prácticas alimentarias",
      ],
      enfoque: "Aprendizaje integral de la cocina como lenguaje cultural, científico y ecológico.",
      metodologias: ["Exploración sensorial", "Aprendizaje experiencial", "Reflexión colectiva"],
      enfoqueCierre: "Reconocimiento de la cocina como puente entre memoria, territorio e innovación.",
      competencias: ["Cultura alimentaria", "Pensamiento crítico", "Sensibilidad ecológica", "Trabajo colaborativo"],
      proyectoFinal: "Diseño de una propuesta culinaria argumentada desde historia, ciencia y tradición local.",
    },
    {
      id: "16",
      titulo: "Diseño Creativo en Canva",
      tematica: "Diseño",
      estado: "Finalizado",
      edad: "18 o mas años",
      lugar: "Biblioteca Pública y Parque Cultural Débora Arango",
      fechas: ["5 de septiembre - 19 de septiembre"],
      sesiones: [],
      ano: 2025,
      imagen: "/Formacion/Ecard%20Diseno%20Creativo%20en%20Canva.jpeg",
      subtitulo:
        "Introducción práctica al diseño gráfico digital para crear contenidos visuales claros y creativos.",
      descripcion: [
        "El curso Diseño Creativo en Canva brindó a los participantes una introducción práctica al diseño gráfico digital, permitiéndoles crear contenidos visuales de manera sencilla y creativa. A través del uso de herramientas intuitivas, exploraron principios básicos de diseño, desarrollaron piezas gráficas y fortalecieron habilidades de comunicación visual en un entorno dinámico y accesible.",
      ],
      trabajado: [
        "Principios básicos de composición y jerarquía visual",
        "Creación de piezas gráficas en Canva",
        "Uso de plantillas, tipografía y color",
        "Comunicación visual para entornos digitales",
      ],
      enfoque: "Diseño accesible y funcional orientado a la comunicación visual efectiva.",
      metodologias: ["Práctica guiada", "Diseño por proyectos", "Iteración creativa"],
      enfoqueCierre: "Fortalecimiento de la autonomía para crear piezas gráficas con intención comunicativa.",
      competencias: ["Diseño gráfico básico", "Comunicación visual", "Creatividad", "Uso de herramientas digitales"],
      proyectoFinal: "Desarrollo de una colección de piezas gráficas para una campaña de comunicación.",
    },
    {
      id: "17",
      titulo: "Retratos con Alma",
      tematica: "Fotografía",
      estado: "Finalizado",
      edad: "18 o mas años",
      lugar: "Biblioteca Pública y Parque Cultural Débora Arango",
      fechas: ["2 de septiembre - 18 de septiembre"],
      sesiones: [],
      ano: 2025,
      imagen: "/Formacion/Ecard%20Retratos%20con%20Alma.jpeg",
      subtitulo:
        "Proceso fotográfico para construir retratos sensibles, narrativos y técnicamente sólidos desde el celular.",
      descripcion: [
        "Retratos con Alma es una serie de cursos diseñados para transformar el celular en una herramienta de expresión artística y conexión humana profunda. A lo largo de este proceso, los participantes exploran la fotografía más allá de la captura convencional, enfocándose en descubrir la esencia de las personas y las historias que habitan en su entorno cotidiano. Desde el dominio de la luz natural y el drama del blanco y negro hasta la construcción de narrativas visuales complejas en color, cada sesión prioriza la sensibilidad narrativa sobre la técnica fría. El programa enseña a dirigir sujetos mediante la conversación y la empatía, reemplazando las poses rígidas por gestos genuinos que revelan la identidad única del retratado. En esta etapa avanzada, los estudiantes profundizan en el retrato conceptual, la psicología cromática y la postproducción profesional en Snapseed, desarrollando una voz artística propia y coherente. El viaje creativo culmina en una exposición física donde cada participante materializa su visión en una fotografía impresa de alta calidad. Esta propuesta busca democratizar el arte visual, demostrando que no se requiere equipo profesional para conmover a la comunidad. Al finalizar, los alumnos no solo dominan su dispositivo, sino que han cultivado una mirada poética capaz de transformar lo ordinario en una obra de arte digna de ser expuesta.",
      ],
      trabajado: [
        "Dirección de sujetos desde la conversación y la empatía",
        "Narrativas visuales en blanco y negro y color",
        "Retrato conceptual y psicología cromática",
        "Postproducción avanzada en Snapseed",
      ],
      enfoque: "Formación fotográfica centrada en la sensibilidad narrativa y la identidad del retratado.",
      metodologias: ["Práctica guiada", "Narrativa visual", "Crítica y curaduría fotográfica"],
      enfoqueCierre: "Consolidación de una voz autoral propia mediante una exposición final.",
      competencias: ["Dirección de retrato", "Narrativa visual", "Postproducción", "Expresión artística"],
      proyectoFinal: "Producción y exhibición de una fotografía de retrato impresa en alta calidad.",
    },
    {
      id: "18",
      titulo: "Excel Power BI",
      tematica: "Analítica",
      estado: "Finalizado",
      edad: "18 o mas años",
      lugar: "Biblioteca Pública y Parque Cultural Débora Arango",
      fechas: ["15 de octubre - 26 de noviembre"],
      sesiones: [],
      ano: 2025,
      imagen: "/Formacion/Ecard%20Power%20Bi.jpeg",
      subtitulo:
        "Introducción práctica a la analítica de datos con Excel y Power BI para organizar, visualizar y comunicar información.",
      descripcion: [
        "El curso Excel y Power BI ofreció una introducción práctica a la analítica de datos, permitiendo a los participantes dar sus primeros pasos en el manejo, organización y visualización de información. A través del uso de herramientas accesibles, se exploraron conceptos básicos de análisis de datos y se desarrollaron habilidades para interpretar y comunicar información de manera efectiva.",
      ],
      trabajado: [
        "Organización y limpieza básica de datos",
        "Visualización de información con gráficos y tableros",
        "Conceptos fundamentales de análisis de datos",
        "Comunicación efectiva de hallazgos",
      ],
      enfoque: "Aprendizaje aplicado en analítica para la toma de decisiones informadas.",
      metodologias: ["Práctica guiada", "Análisis de casos", "Construcción de tableros"],
      enfoqueCierre: "Fortalecimiento de competencias para interpretar datos y convertirlos en información útil.",
      competencias: ["Analítica básica", "Visualización de datos", "Pensamiento lógico", "Comunicación de datos"],
      proyectoFinal: "Construcción de un tablero básico en Power BI con datos organizados en Excel.",
    },
    {
      id: "19",
      titulo: "Navidad en movimiento",
      tematica: "Animación",
      estado: "Finalizado",
      edad: "12 a 17 años",
      lugar: "Biblioteca Pública y Parque Cultural Débora Arango",
      fechas: ["24 de noviembre - 2 de diciembre de 2025"],
      sesiones: [],
      ano: 2025,
      imagen: "/cursos/Navidad%20en%20movimiento.jpg",
      subtitulo: "Taller creativo para explorar stop motion con temáticas navideñas.",
      descripcion: [
        "El taller Navidad en movimiento fue una experiencia creativa en la que jóvenes exploraron la animación en stop motion a partir de temáticas navideñas. Durante las sesiones, los participantes crearon historias, personajes y escenas, dando vida a sus ideas cuadro a cuadro, mientras fortalecían habilidades como la creatividad, la narración audiovisual y el trabajo en equipo en un ambiente dinámico y festivo.",
      ],
      trabajado: [
        "Creación de historias y guiones navideños",
        "Diseño de personajes y escenas",
        "Animación cuadro a cuadro en stop motion",
        "Trabajo colaborativo en producción audiovisual",
      ],
      enfoque: "Aprendizaje creativo para narrar historias a través de la animación.",
      metodologias: ["Aprendizaje basado en proyectos", "Producción colaborativa", "Exploración audiovisual"],
      enfoqueCierre: "Fortalecimiento de creatividad y narración audiovisual en un entorno festivo.",
      competencias: ["Creatividad", "Narrativa audiovisual", "Trabajo en equipo", "Resolución de problemas"],
      proyectoFinal: "Producción de una pieza de stop motion con temática navideña.",
    },
    {
      id: "20",
      titulo: "Montaje Fotográfico",
      tematica: "Edición",
      estado: "Finalizado",
      edad: "14 a 17 años",
      lugar: "Biblioteca Pública y Parque Cultural Débora Arango",
      fechas: ["4 de diciembre - 5 de diciembre de 2025"],
      sesiones: [],
      ano: 2025,
      imagen: "/cursos/Montaje%20Fotogr%C3%A1fico.jpg",
      subtitulo: "Taller para crear composiciones surrealistas con celular.",
      descripcion: [
        "El taller Montaje Fotográfico fue una experiencia creativa en la que jóvenes exploraron la creación de imágenes surrealistas utilizando únicamente sus celulares. A través de técnicas como la levitación y la clonación, los participantes desarrollaron habilidades en composición visual, edición y creatividad, logrando resultados de apariencia profesional en un entorno dinámico y experimental.",
      ],
      trabajado: [
        "Técnicas de levitación y clonación",
        "Composición visual para montaje",
        "Edición fotográfica en celular",
        "Construcción de imágenes surrealistas",
      ],
      enfoque: "Exploración de la edición creativa para transformar imágenes cotidianas.",
      metodologias: ["Experimentación práctica", "Producción guiada", "Creación visual"],
      enfoqueCierre: "Desarrollo de piezas fotográficas con estética profesional desde dispositivos móviles.",
      competencias: ["Edición fotográfica", "Composición visual", "Creatividad", "Pensamiento experimental"],
      proyectoFinal: "Creación de una serie de montajes fotográficos surrealistas en celular.",
    },
    {
      id: "21",
      titulo: "Tarjeta Navideña",
      tematica: "Diseño",
      estado: "Finalizado",
      edad: "11 a 17 años",
      lugar: "Biblioteca Pública y Parque Cultural Débora Arango",
      fechas: ["4 de diciembre - 5 de diciembre de 2025"],
      sesiones: [],
      ano: 2025,
      imagen: "/cursos/Tarjeta%20Navide%C3%B1a.jpg",
      subtitulo: "Taller digital para diseñar tarjetas navideñas familiares.",
      descripcion: [
        "El taller Tarjeta Navideña fue una experiencia creativa en la que jóvenes diseñaron sus propias tarjetas familiares utilizando herramientas digitales. A través de la exploración del color, la composición y la creatividad, los participantes crearon piezas únicas, fortaleciendo sus habilidades de diseño y expresión visual en un ambiente práctico y dinámico.",
      ],
      trabajado: [
        "Composición y jerarquía visual",
        "Uso creativo del color",
        "Diseño digital de tarjetas",
        "Expresión visual para mensajes familiares",
      ],
      enfoque: "Diseño aplicado para comunicar emociones y mensajes en formatos visuales.",
      metodologias: ["Taller práctico", "Diseño por proyectos", "Iteración creativa"],
      enfoqueCierre: "Fortalecimiento de habilidades de diseño y comunicación visual.",
      competencias: ["Diseño gráfico", "Creatividad", "Comunicación visual", "Expresión artística"],
      proyectoFinal: "Creación de una tarjeta navideña digital personalizada.",
    },
    {
      id: "22",
      titulo: "Laboratorio Secreto de Navidad",
      tematica: "Creatividad",
      estado: "Finalizado",
      edad: "7 a 11 años",
      lugar: "Biblioteca Pública y Parque Cultural Débora Arango",
      fechas: ["24 de noviembre - 2 de diciembre de 2025"],
      sesiones: [],
      ano: 2025,
      imagen: "/cursos/Laboratorio%20Secreto%20de%20Navidad.jpg",
      subtitulo: "Espacio lúdico para imaginar y construir inventos navideños.",
      descripcion: [
        "El taller Laboratorio Secreto de Navidad fue una experiencia creativa en la que niños y niñas imaginaron, diseñaron y construyeron sus propios inventos navideños. A través del uso de materiales y actividades de animación, exploraron su creatividad, fortaleciendo habilidades de creación, experimentación y expresión en un ambiente lúdico y participativo.",
      ],
      trabajado: [
        "Diseño y construcción de inventos navideños",
        "Exploración de materiales creativos",
        "Actividades de animación",
        "Juego colaborativo y experimentación",
      ],
      enfoque: "Aprendizaje lúdico para potenciar la imaginación y la creación.",
      metodologias: ["Juego guiado", "Exploración de materiales", "Creación colaborativa"],
      enfoqueCierre: "Consolidación de habilidades creativas en un entorno participativo.",
      competencias: ["Creatividad", "Experimentación", "Expresión", "Trabajo en equipo"],
      proyectoFinal: "Presentación de inventos navideños creados por los participantes.",
    },
    {
      id: "23",
      titulo: "Navidad Creativa",
      tematica: "Inteligencia Artificial",
      estado: "Finalizado",
      edad: "8 a 13 años",
      lugar: "Biblioteca Pública y Parque Cultural Débora Arango",
      fechas: ["24 de noviembre - 2 de diciembre de 2025"],
      sesiones: [],
      ano: 2025,
      imagen: "/cursos/Navidad%20Creativa.jpg",
      subtitulo: "Curso para crear contenidos navideños con apoyo de inteligencia artificial.",
      descripcion: [
        "El curso Navidad Creativa fue una experiencia innovadora en la que niños y niñas exploraron la creatividad a través del uso de inteligencia artificial. Durante las sesiones, los participantes imaginaron, diseñaron y crearon contenidos digitales, fortaleciendo su pensamiento creativo y habilidades tecnológicas en un entorno lúdico que combinó juego, imaginación y herramientas digitales.",
      ],
      trabajado: [
        "Introducción a herramientas de IA",
        "Diseño y creación de contenidos digitales",
        "Imaginación aplicada a proyectos navideños",
        "Uso creativo de tecnologías emergentes",
      ],
      enfoque: "Innovación educativa para combinar creatividad infantil y tecnología.",
      metodologias: ["Aprendizaje basado en proyectos", "Exploración digital", "Juego creativo"],
      enfoqueCierre: "Fortalecimiento de pensamiento creativo y habilidades tecnológicas.",
      competencias: ["Creatividad", "Alfabetización digital", "Pensamiento crítico", "Innovación"],
      proyectoFinal: "Desarrollo de una pieza digital navideña con apoyo de IA.",
    },
    {
      id: "24",
      titulo: "Navidad en 3D",
      tematica: "Diseño",
      estado: "Finalizado",
      edad: "12 a 16 años",
      lugar: "Biblioteca Pública y Parque Cultural Débora Arango",
      fechas: ["24 de noviembre - 2 de diciembre de 2025"],
      sesiones: [],
      ano: 2025,
      imagen: "/cursos/Navidad%20en%203D.jpg",
      subtitulo: "Taller de diseño 3D con creación de objetos de temática navideña.",
      descripcion: [
        "Taller enfocado en el diseño 3D donde los participantes exploraron herramientas de creación digital para desarrollar objetos con temática navideña. A través de ejercicios prácticos, dieron forma a sus ideas utilizando volumen, color y creatividad en entornos tridimensionales.",
      ],
      trabajado: [
        "Modelado de objetos en entornos 3D",
        "Uso de volumen y color",
        "Diseño digital con temática navideña",
        "Desarrollo de prototipos creativos",
      ],
      enfoque: "Aprendizaje práctico de diseño tridimensional orientado a la creación.",
      metodologias: ["Taller práctico", "Diseño iterativo", "Exploración digital"],
      enfoqueCierre: "Consolidación de habilidades de modelado y visualización en 3D.",
      competencias: ["Diseño 3D", "Creatividad", "Pensamiento espacial", "Resolución de problemas"],
      proyectoFinal: "Creación de un objeto navideño original en formato 3D.",
    },
    {
      id: "25",
      titulo: "Crea con la naturaleza",
      tematica: "Ciencia",
      estado: "Finalizado",
      edad: "7 a 11 años",
      lugar: "Biblioteca Pública y Parque Cultural Débora Arango",
      fechas: ["24 de noviembre - 2 de diciembre de 2025"],
      sesiones: [],
      ano: 2025,
      imagen: "/cursos/Crea%20con%20la%20naturaleza.jpg",
      subtitulo: "Taller que integra ciencia y arte a partir de la naturaleza.",
      descripcion: [
        "Taller que integró la ciencia y el arte a través de actividades creativas inspiradas en la naturaleza. Los participantes exploraron materiales y conceptos para crear piezas artísticas, desarrollando su curiosidad y construyendo un pequeño espacio expositivo con sus creaciones.",
      ],
      trabajado: [
        "Exploración de materiales naturales",
        "Creación de piezas artísticas con enfoque científico",
        "Curiosidad y observación del entorno",
        "Montaje de mini espacio expositivo",
      ],
      enfoque: "Aprendizaje interdisciplinar entre ciencia, arte y exploración del entorno.",
      metodologias: ["Exploración guiada", "Creación artística", "Aprendizaje experiencial"],
      enfoqueCierre: "Desarrollo de curiosidad científica y expresión artística.",
      competencias: ["Curiosidad científica", "Creatividad", "Observación", "Trabajo colaborativo"],
      proyectoFinal: "Exposición de piezas artísticas inspiradas en la naturaleza.",
    },
    {
      id: "26",
      titulo: "Navidad en Pixel",
      tematica: "Tecnología",
      estado: "Finalizado",
      edad: "10 a 17 años",
      lugar: "Biblioteca Pública y Parque Cultural Débora Arango",
      fechas: ["24 de noviembre - 2 de diciembre de 2025"],
      sesiones: [],
      ano: 2025,
      imagen: "/cursos/Navidad%20en%20Pixel.jpg",
      subtitulo: "Taller para crear relatos y producciones visuales digitales con temática navideña.",
      descripcion: [
        "Taller orientado a la creación digital y la narrativa visual, donde los participantes desarrollaron historias navideñas en formato digital. A través de herramientas creativas, exploraron la construcción de relatos y producciones visuales para expresar sus ideas de forma innovadora.",
      ],
      trabajado: [
        "Narrativa visual digital",
        "Construcción de historias navideñas",
        "Producción de piezas gráficas",
        "Uso creativo de herramientas tecnológicas",
      ],
      enfoque: "Formación en creación digital para comunicar ideas de manera innovadora.",
      metodologias: ["Aprendizaje por proyectos", "Narrativa digital", "Producción creativa"],
      enfoqueCierre: "Fortalecimiento de expresión digital y pensamiento creativo.",
      competencias: ["Tecnología creativa", "Narrativa visual", "Comunicación", "Creatividad"],
      proyectoFinal: "Producción de una historia visual digital con temática navideña.",
    },
    {
      id: "27",
      titulo: "Reescribiendo la Navidad",
      tematica: "Escritura",
      estado: "Finalizado",
      edad: "12 a 16 años",
      lugar: "Biblioteca Pública y Parque Cultural Débora Arango",
      fechas: ["24 de noviembre - 2 de diciembre de 2025"],
      sesiones: [],
      ano: 2025,
      imagen: "/cursos/Reescribiendo%20la%20Navidad.jpg",
      subtitulo: "Taller de escritura y narración para crear relatos navideños propios.",
      descripcion: [
        "Taller centrado en la creación de historias navideñas a través de la escritura, el sonido y la narración. Los participantes exploraron formas de expresar emociones e ideas, construyendo relatos propios y desarrollando su creatividad narrativa.",
      ],
      trabajado: [
        "Creación de historias navideñas",
        "Narración y expresión oral",
        "Exploración sonora aplicada al relato",
        "Construcción de personajes y ambientes",
      ],
      enfoque: "Desarrollo de la creatividad narrativa desde la escritura y la oralidad.",
      metodologias: ["Taller de escritura", "Narración guiada", "Creación colaborativa"],
      enfoqueCierre: "Fortalecimiento de habilidades comunicativas y expresivas.",
      competencias: ["Escritura creativa", "Narración", "Expresión emocional", "Comunicación"],
      proyectoFinal: "Producción de un relato navideño original con componentes sonoros y narrativos.",
    },
  ];

  const ecardTagStyles: Record<string, string> = {
    tematica: "border-[#11B2AA]/40 bg-[#11B2AA]/12 text-[#0D4B56]",
    fechas: "border-[#FFDE07]/50 bg-[#FFDE07]/18 text-[#182130]",
    estado: "border-[#EC6910]/45 bg-[#EC6910]/14 text-[#182130]",
    edad: "border-[#023A34]/40 bg-[#023A34]/12 text-[#023A34]",
    lugar: "border-[#2D3586]/40 bg-[#2D3586]/12 text-[#2D3586]",
  };

  // Funciones de filtrado
  const toggleFilter = (
    value: string,
    state: string[],
    setState: (state: string[]) => void
  ) => {
    if (state.includes(value)) {
      setState(state.filter((item) => item !== value));
    } else {
      setState([...state, value]);
    }
  };

  const parseEdadRange = (edad: string): { min: number; max: number } | null => {
    const normalized = edad.toLowerCase();

    if (normalized.includes("adultos mayores")) {
      return { min: 60, max: Number.POSITIVE_INFINITY };
    }

    const plusMatch = normalized.match(/(\d+)\s*\+/);
    if (plusMatch) {
      const min = Number(plusMatch[1]);
      return { min, max: Number.POSITIVE_INFINITY };
    }

    const openMatch = normalized.match(/(\d+)\s*(?:en adelante|o mas|o más)/);
    if (openMatch) {
      const min = Number(openMatch[1]);
      return { min, max: Number.POSITIVE_INFINITY };
    }

    const rangeMatch = normalized.match(/(\d+)\s*(?:a|-)\s*(\d+)/);
    if (rangeMatch) {
      const min = Number(rangeMatch[1]);
      const max = Number(rangeMatch[2]);
      return { min: Math.min(min, max), max: Math.max(min, max) };
    }

    return null;
  };

  const rangesOverlap = (
    a: { min: number; max: number },
    b: { min: number; max: number }
  ) => a.min <= b.max && b.min <= a.max;

  const filteredEcards = ecards.filter((ecard) => {
    const ecardEdadRange = parseEdadRange(ecard.edad);
    const selectedTematicaValues = new Set(
      selectedTematicas.flatMap((tematica) => tematicaAliases[tematica] ?? [tematica])
    );
    const matchesSearch = ecard.titulo
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTematica =
      selectedTematicas.length === 0 ||
      selectedTematicaValues.has(ecard.tematica);
    const matchesEstado =
      selectedEstados.length === 0 || selectedEstados.includes(ecard.estado);
    const matchesEdad =
      selectedEdades.length === 0 ||
      (ecardEdadRange && selectedEdades.some((edadSeleccionada) => {
        const bucketRange = edadBuckets[edadSeleccionada];
        if (!bucketRange) return false;
        return rangesOverlap(bucketRange, ecardEdadRange);
      }));
    const matchesLugar =
      selectedLugares.length === 0 ||
      selectedLugares.some((lugarSeleccionado) => {
        const lugarAliasValues = lugarAliases[lugarSeleccionado] ?? [lugarSeleccionado];
        return lugarAliasValues.includes(ecard.lugar);
      });

    return matchesSearch && matchesTematica && matchesEstado && matchesEdad && matchesLugar;
  });

  // Separar por categoría
  const cursosActivos = filteredEcards.filter((e) => e.estado === "En curso");
  const cursos2026 = filteredEcards.filter((e) => e.ano === 2026);
  const cursos2025 = filteredEcards.filter((e) => e.ano === 2025);

  useEffect(() => {
    if (!ecardOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setEcardOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [ecardOpen]);

  // Lógica del calendario
  const activeSessions = ecards
    .filter((e) => e.estado === "En curso" || e.estado === "En inscripciones")
    .flatMap((e) =>
      e.sesiones.map((date) => ({ date, titulo: e.titulo, tematica: e.tematica }))
    );

  const calendarYear = calendarDate.getFullYear();
  const calendarMonth = calendarDate.getMonth();
  const firstDayOfMonth = new Date(calendarYear, calendarMonth, 1).getDay();
  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
  ];
  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  // dias con sesiones en el mes visible
  const sessionsByDay: Record<number, { titulo: string; tematica: string }[]> = {};
  activeSessions.forEach(({ date, titulo, tematica }) => {
    const d = new Date(date + "T00:00:00");
    if (d.getFullYear() === calendarYear && d.getMonth() === calendarMonth) {
      const day = d.getDate();
      if (!sessionsByDay[day]) sessionsByDay[day] = [];
      sessionsByDay[day].push({ titulo, tematica });
    }
  });

  const tematicaColor: Record<string, string> = {
    Robotica: "bg-[#11B2AA]",
    IA: "bg-[#2D3586]",
    "Inteligencia Artificial": "bg-[#2D3586]",
    "Animación": "bg-[#EC6910]",
    Musica: "bg-[#FFDE07]",
    "Diseño": "bg-[#0D4B56]",
    Ciencia: "bg-[#023A34]",
    Fotografia: "bg-[#FFDE07]",
    "Fotografía": "bg-[#FFDE07]",
    "Medio ambiente": "bg-[#11B2AA]",
    Podcast: "bg-[#2D3586]",
    Edicion: "bg-[#EC6910]",
    "Edición": "bg-[#EC6910]",
    Cocina: "bg-[#182130]",
    "Analítica": "bg-[#0D4B56]",
    "Tecnología": "bg-[#2D3586]",
    "Creatividad": "bg-[#EC6910]",
    "Escritura": "bg-[#182130]",
  };

  const wideCardWidthMultiplier = 1.28;
  const normalizeCourseTitle = (value: string) =>
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();

  const wideImageCourseTitles = new Set(
    [
      "STEAMers Kids 2",
      "Stop Motion con Legos",
      "Música y Ciencia",
      "Explorando el territorio",
      "Let's Play Videopodcast Gamer",
      "Fotografía de retrato",
      "Fotografía Experimental",
      "CapCut Creativo",
      "A Fuego Lento",
      "Diseño Creativo en Canva",
      "Retratos con Alma",
      "Excel Power BI",
      "Navidad en movimiento",
      "Montaje Fotográfico",
      "Tarjeta Navideña",
      "Laboratorio Secreto de Navidad",
      "Navidad Creativa",
      "Navidad en 3D",
      "Crea con la naturaleza",
      "Navidad en Pixel",
      "Reescribiendo la Navidad",
    ].map(normalizeCourseTitle)
  );

  // Componente de carrusel
  const Carousel = ({
    title,
    items,
  }: {
    title: string;
    items: ECard[];
  }) => {
    const orderedItems = [...items].reverse();
    const trackRef = useRef<HTMLDivElement | null>(null);
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [pageCount, setPageCount] = useState(1);
    const [visibleCards, setVisibleCards] = useState(4);
    const gapPx = 24;

    const getCardSnapPoints = () => {
      const track = trackRef.current;
      if (!track) return [] as number[];

      const cards = Array.from(
        track.querySelectorAll<HTMLButtonElement>("button[data-ecard-card='true']")
      );

      if (cards.length === 0) return [] as number[];

      const maxScrollLeft = Math.max(0, track.scrollWidth - track.clientWidth);
      const points = cards.map((card) => Math.min(maxScrollLeft, Math.max(0, card.offsetLeft)));

      return Array.from(new Set(points));
    };

    const scrollByCard = (direction: -1 | 1) => {
      const track = trackRef.current;
      if (!track) return;

      const points = getCardSnapPoints();
      if (points.length === 0) return;

      const current = track.scrollLeft;
      const currentIndex = points.reduce((bestIdx, point, idx) => {
        const bestDistance = Math.abs(points[bestIdx] - current);
        const currentDistance = Math.abs(point - current);
        return currentDistance < bestDistance ? idx : bestIdx;
      }, 0);

      const nextIndex = Math.min(points.length - 1, Math.max(0, currentIndex + direction));
      track.scrollTo({ left: points[nextIndex], behavior: "smooth" });
    };

    useEffect(() => {
      const updateVisibleCards = () => {
        if (window.innerWidth >= 1280) {
          setVisibleCards(4);
          return;
        }
        if (window.innerWidth >= 1024) {
          setVisibleCards(3);
          return;
        }
        if (window.innerWidth >= 768) {
          setVisibleCards(2);
          return;
        }
        setVisibleCards(1);
      };

      updateVisibleCards();
      window.addEventListener("resize", updateVisibleCards);
      return () => window.removeEventListener("resize", updateVisibleCards);
    }, []);

    useEffect(() => {
      const track = trackRef.current;
      if (!track) return;

      const syncPagination = () => {
        const nextPageCount = Math.max(1, Math.ceil(track.scrollWidth / track.clientWidth));
        setPageCount(nextPageCount);
        const nextIndex = Math.min(
          nextPageCount - 1,
          Math.max(0, Math.round(track.scrollLeft / track.clientWidth))
        );
        setCarouselIndex(nextIndex);
      };

      syncPagination();
      track.addEventListener("scroll", syncPagination, { passive: true });
      window.addEventListener("resize", syncPagination);

      return () => {
        track.removeEventListener("scroll", syncPagination);
        window.removeEventListener("resize", syncPagination);
      };
    }, [orderedItems.length, visibleCards]);

    const scrollToPage = (page: number) => {
      const track = trackRef.current;
      if (!track) return;
      track.scrollTo({ left: track.clientWidth * page, behavior: "smooth" });
    };

    return (
      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-[#182130]">{title}</h2>
        {orderedItems.length === 0 ? (
          <div className="rounded-lg bg-[#11B2AA]/8 py-12 text-center">
            <BookOpen className="mx-auto mb-2 h-12 w-12 text-[#0D4B56]/70" />
            <p className="text-[#0D4B56]/80">
              No hay cursos disponibles en esta categoría
            </p>
          </div>
        ) : (
          <div className="relative">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label={`Anterior en ${title}`}
              disabled={carouselIndex === 0}
              className="absolute left-0 top-1/2 z-10 -translate-x-3 -translate-y-1/2 rounded-full border border-[#023A34] bg-[#0D4B56] p-2 text-[#FFDE07] shadow-md hover:bg-[#023A34] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label={`Siguiente en ${title}`}
              disabled={carouselIndex >= pageCount - 1}
              className="absolute right-0 top-1/2 z-10 translate-x-3 -translate-y-1/2 rounded-full border border-[#023A34] bg-[#0D4B56] p-2 text-[#FFDE07] shadow-md hover:bg-[#023A34] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div
              ref={trackRef}
              className="snap-x snap-mandatory overflow-x-auto overflow-y-hidden px-6 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <div
                className="flex"
                style={{
                  gap: `${gapPx}px`,
                }}
              >
                {orderedItems.map((ecard) => {
                  const isWideImageCourse = wideImageCourseTitles.has(normalizeCourseTitle(ecard.titulo));

                  return (
                  <button
                    key={ecard.id}
                    data-ecard-card="true"
                    type="button"
                    onClick={() => {
                      setSelectedEcard(ecard);
                      setEcardOpen(true);
                    }}
                    className="group flex h-full snap-start snap-always flex-col overflow-hidden rounded-2xl border border-[#0D4B56]/15 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                    style={{
                      flex: isWideImageCourse
                        ? `0 0 calc(((100% - ${(visibleCards - 1) * gapPx}px) / ${visibleCards}) * ${wideCardWidthMultiplier})`
                        : `0 0 calc((100% - ${(visibleCards - 1) * gapPx}px) / ${visibleCards})`,
                    }}
                    aria-label={`Abrir ${ecard.titulo}`}
                  >
                    <div className="flex h-[22rem] items-start justify-center overflow-hidden bg-[#11B2AA]/6 pt-3 sm:h-[24rem] lg:h-[25rem]">
                      <picture className="contents">
                        <source srcSet={toWebp(ecard.imagen)} type="image/webp" />
                        <img
                          src={ecard.imagen}
                          alt={ecard.titulo}
                          loading="lazy"
                          decoding="async"
                          className={`h-full w-full transition-transform duration-300 group-hover:scale-[1.02] ${
                            isWideImageCourse ? "object-cover object-center" : "object-contain object-top"
                          }`}
                        />
                      </picture>
                    </div>
                    <div className="flex min-h-[11.5rem] flex-1 flex-col bg-[#0D4B56]/[0.04] px-3 py-3">
                      <p className="mb-2 line-clamp-2 text-sm font-bold text-[#182130]">
                        {ecard.titulo}
                      </p>
                      <div className="-ml-0.5 mt-1 flex flex-wrap content-start gap-1.5">
                        <Badge variant="outline" className={`max-w-full whitespace-normal break-words text-xs rounded-full px-2 py-0.5 ${ecardTagStyles.tematica}`}>
                          {ecard.tematica}
                        </Badge>
                        <Badge variant="outline" className={`max-w-full whitespace-normal break-words text-xs rounded-full px-2 py-0.5 ${ecardTagStyles.edad}`}>
                          {ecard.edad}
                        </Badge>
                        <Badge variant="outline" className={`max-w-full whitespace-normal break-words text-xs rounded-full px-2 py-0.5 ${ecardTagStyles.fechas}`}>
                          {ecard.fechas[0]}
                        </Badge>
                        <Badge variant="outline" className={`max-w-full whitespace-normal break-words text-xs rounded-full px-2 py-0.5 ${ecardTagStyles.estado}`}>
                          {ecard.estado}
                        </Badge>
                        <Badge variant="outline" className={`max-w-full whitespace-normal break-words text-xs leading-4 rounded-full px-2 py-0.5 text-left ${ecardTagStyles.lugar}`}>
                          {ecard.lugar}
                        </Badge>
                      </div>
                    </div>
                  </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-2">
              {Array.from({ length: pageCount }, (_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => scrollToPage(idx)}
                  aria-label={`Ir al bloque ${idx + 1} en ${title}`}
                  className={`h-2 rounded-full transition-all ${
                    carouselIndex === idx ? "w-8 bg-[#182130]" : "w-2 bg-[#11B2AA]/50"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#11B2AA]/8 py-8">
      <div className="container">
        <Breadcrumbs items={[{ label: "Formación" }]} />
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold text-[#182130]">Formación Continua</h1>
          <p className="text-xl text-[#0D4B56]/80">
            Cursos, talleres y diplomados para fortalecer competencias educativas
          </p>
        </div>

        {/* CALENDARIO DE SESIONES ACTIVAS */}
        <div className="mb-10 rounded-2xl border border-[#0D4B56]/20 bg-[#0D4B56]/[0.04] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-[#182130]">Próximas sesiones</h2>
              <p className="text-sm text-[#0D4B56]/75">Días con cursos activos este mes</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCalendarDate(new Date(calendarYear, calendarMonth - 1, 1))}
                className="rounded-lg p-2 transition-colors hover:bg-[#FFDE07]/18"
              >
                <ChevronLeft className="h-4 w-4 text-[#182130]" />
              </button>
              <span className="w-36 text-center text-sm font-semibold text-[#182130]">
                {monthNames[calendarMonth]} {calendarYear}
              </span>
              <button
                onClick={() => setCalendarDate(new Date(calendarYear, calendarMonth + 1, 1))}
                className="rounded-lg p-2 transition-colors hover:bg-[#FFDE07]/18"
              >
                <ChevronRight className="h-4 w-4 text-[#182130]" />
              </button>
            </div>
          </div>

          {/* Encabezados de días */}
          <div className="grid grid-cols-7 mb-1">
            {dayNames.map((d) => (
              <div key={d} className="py-2 text-center text-xs font-semibold text-[#0D4B56]/60">{d}</div>
            ))}
          </div>

          {/* Días del mes */}
          <div className="grid grid-cols-7 gap-1">
            {/* Celdas vacías al inicio */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {/* Días */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const sessions = sessionsByDay[day];
              const isToday =
                new Date().getDate() === day &&
                new Date().getMonth() === calendarMonth &&
                new Date().getFullYear() === calendarYear;
              return (
                <div
                  key={day}
                  title={sessions ? sessions.map((s) => s.titulo).join(", ") : undefined}
                  className={`relative flex min-h-[3rem] flex-col items-center justify-start rounded-xl py-2 ${
                    sessions
                      ? "bg-[#2D3586]/12 ring-1 ring-[#2D3586]/28"
                      : isToday
                      ? "bg-[#FFDE07]/18"
                      : "hover:bg-[#11B2AA]/10"
                  }`}
                >
                  <span
                    className={`text-sm font-medium ${
                      isToday ? "font-bold text-[#EC6910]" : sessions ? "text-[#2D3586]" : "text-[#182130]"
                    }`}
                  >
                    {day}
                  </span>
                  {sessions && (
                    <div className="flex flex-wrap justify-center gap-0.5 mt-1">
                      {sessions.map((s, idx) => (
                        <span
                          key={idx}
                          className={`h-1.5 w-1.5 rounded-full ${tematicaColor[s.tematica] ?? "bg-[#0D4B56]"}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Leyenda */}
          {activeSessions.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-4 border-t border-[#0D4B56]/12 pt-4">
              {ecards
                .filter((e) => e.estado === "En curso" || e.estado === "En inscripciones")
                .map((e) => (
                  <div key={e.id} className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${tematicaColor[e.tematica] ?? "bg-[#0D4B56]"}`} />
                    <span className="text-xs text-[#0D4B56]/80">{e.titulo}</span>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* LAYOUT DE DOS COLUMNAS */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* SIDEBAR DE FILTROS - IZQUIERDA */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 rounded-2xl border border-[#0D4B56]/20 bg-[#0D4B56]/[0.04] p-6 shadow-sm">
              <h2 className="mb-6 text-lg font-bold text-[#182130]">Filtros</h2>

              {/* Búsqueda */}
              <div className="mb-8">
                <label className="mb-2 block text-sm font-semibold text-[#182130]">
                  Buscar
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0D4B56]/55" />
                  <input
                    type="text"
                    placeholder="Nombre del curso..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-lg border border-[#0D4B56]/20 bg-[#11B2AA]/[0.05] py-2 pl-9 pr-3 text-sm text-[#182130] focus:border-[#2D3586] focus:outline-none focus:ring-2 focus:ring-[#2D3586]/25"
                  />
                </div>
              </div>

              {/* Filtros por Temática */}
              <div className="mb-8 border-b border-[#0D4B56]/16 pb-8">
                <h3 className="mb-3 text-sm font-semibold text-[#182130]">
                  Temática
                </h3>
                <div className="space-y-2">
                  {tematicas.map((tematica) => (
                    <label
                      key={tematica}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTematicas.includes(tematica)}
                        onChange={() =>
                          toggleFilter(
                            tematica,
                            selectedTematicas,
                            setSelectedTematicas
                          )
                        }
                        className="h-4 w-4 rounded border-[#0D4B56]/30 text-[#11B2AA] focus:ring-2 focus:ring-[#11B2AA]/35"
                      />
                      <span className="text-sm text-[#0D4B56] group-hover:text-[#182130]">
                        {tematica}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filtros por Estado */}
              <div className="mb-8 border-b border-[#0D4B56]/16 pb-8">
                <h3 className="mb-3 text-sm font-semibold text-[#182130]">
                  Estado
                </h3>
                <div className="space-y-2">
                  {estados.map((estado) => (
                    <label
                      key={estado}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedEstados.includes(estado)}
                        onChange={() =>
                          toggleFilter(
                            estado,
                            selectedEstados,
                            setSelectedEstados
                          )
                        }
                        className="h-4 w-4 rounded border-[#0D4B56]/30 text-[#EC6910] focus:ring-2 focus:ring-[#EC6910]/35"
                      />
                      <span className="text-sm text-[#0D4B56] group-hover:text-[#182130]">
                        {estado}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filtros por Edad */}
              <div className="mb-8 border-b border-[#0D4B56]/16 pb-8">
                <h3 className="mb-3 text-sm font-semibold text-[#182130]">
                  Edad
                </h3>
                <div className="space-y-2">
                  {edades.map((edad) => (
                    <label
                      key={edad}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedEdades.includes(edad)}
                        onChange={() =>
                          toggleFilter(
                            edad,
                            selectedEdades,
                            setSelectedEdades
                          )
                        }
                        className="h-4 w-4 rounded border-[#0D4B56]/30 text-[#023A34] focus:ring-2 focus:ring-[#023A34]/35"
                      />
                      <span className="text-sm text-[#0D4B56] group-hover:text-[#182130]">
                        {edad}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filtros por Lugar */}
              <div className="mb-6">
                <h3 className="mb-3 text-sm font-semibold text-[#182130]">
                  Lugar
                </h3>
                <div className="space-y-2">
                  {lugares.map((lugar) => (
                    <label
                      key={lugar}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedLugares.includes(lugar)}
                        onChange={() =>
                          toggleFilter(
                            lugar,
                            selectedLugares,
                            setSelectedLugares
                          )
                        }
                        className="h-4 w-4 rounded border-[#0D4B56]/30 text-[#2D3586] focus:ring-2 focus:ring-[#2D3586]/35"
                      />
                      <span className="line-clamp-2 text-sm text-[#0D4B56] group-hover:text-[#182130]">
                        {lugar}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Botón para limpiar filtros */}
              {(searchTerm ||
                selectedTematicas.length > 0 ||
                selectedEstados.length > 0 ||
                selectedEdades.length > 0 ||
                selectedLugares.length > 0) && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedTematicas([]);
                    setSelectedEstados([]);
                    setSelectedEdades([]);
                    setSelectedLugares([]);
                  }}
                  className="w-full rounded-lg px-3 py-2 text-sm font-medium text-[#0D4B56] transition-colors hover:bg-[#FFDE07]/16 hover:text-[#182130]"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          </div>

          {/* CONTENIDO DE CARROUSELES - DERECHA */}
          <div className="lg:col-span-3">
            <Carousel title="Cursos Activos" items={cursosActivos} />
            <Carousel title="2026" items={cursos2026} />
            <Carousel title="2025" items={cursos2025} />
          </div>
        </div>
      </div>

      {/* MODAL DE DETALLE */}
      {ecardOpen && selectedEcard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden bg-[#182130]/55 p-3 md:p-4"
          onClick={() => setEcardOpen(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-5xl overflow-x-hidden overflow-y-auto rounded-3xl border border-[#0D4B56]/20 bg-[#11B2AA]/[0.06] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative p-5 md:p-8">
              <button
                type="button"
                onClick={() => setEcardOpen(false)}
                className="absolute right-4 top-4 rounded-full p-1.5 text-[#0D4B56] hover:bg-[#FFDE07]/18"
                aria-label="Cerrar información del curso"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid gap-6 md:grid-cols-[320px_minmax(0,1fr)] md:gap-8">
                <div className="max-h-[320px] overflow-hidden rounded-2xl border border-[#0D4B56]/20 bg-[#0D4B56]/[0.04] md:max-h-none">
                  <picture className="contents">
                    <source srcSet={toWebp(selectedEcard.imagen)} type="image/webp" />
                    <img
                      src={selectedEcard.imagen}
                      alt={selectedEcard.titulo}
                      loading="eager"
                      decoding="async"
                      className="h-full w-full object-contain"
                    />
                  </picture>
                </div>

                <div className="md:pr-8">
                  <h3 className="text-2xl font-black text-[#182130] md:text-3xl">
                    {selectedEcard.titulo}
                  </h3>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className={`max-w-full whitespace-normal break-words rounded-full px-3 py-1 text-left text-sm font-semibold ${ecardTagStyles.estado}`}
                    >
                      {selectedEcard.estado}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`max-w-full whitespace-normal break-words rounded-full px-3 py-1 text-left text-sm font-semibold ${ecardTagStyles.tematica}`}
                    >
                      {selectedEcard.tematica}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`max-w-full whitespace-normal break-words rounded-full px-3 py-1 text-left text-sm font-semibold ${ecardTagStyles.edad}`}
                    >
                      {selectedEcard.edad}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`max-w-full whitespace-normal break-words rounded-full px-3 py-1 text-left text-sm font-semibold ${ecardTagStyles.fechas}`}
                    >
                      {selectedEcard.fechas[0]}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`max-w-full whitespace-normal break-words rounded-xl px-3 py-1 text-left text-sm font-semibold ${ecardTagStyles.lugar}`}
                    >
                      {selectedEcard.lugar}
                    </Badge>
                  </div>

                  <div className="mt-5 h-px w-full bg-[#0D4B56]/16" />

                  <div className="mt-5 space-y-4">
                    {selectedEcard.descripcion.map((parrafo) => (
                      <p key={parrafo} className="text-base leading-7 text-[#0D4B56]">
                        {parrafo}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
