import { useEffect, useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import AlejandraImg from "@/assets/Alejandra.webp";
import IsabelImg from "@/assets/Isabel.webp";
import JulianImg from "@/assets/Julian.webp";
import KarenImg from "@/assets/Karen.webp";
import MauricioImg from "@/assets/Mauricio.webp";
import MonicaImg from "@/assets/Mònica.webp";
import NicolasImg from "@/assets/Nicolas.webp";
import SantiagoImg from "@/assets/Santiago.webp";
import TaniaImg from "@/assets/Tania.webp";
import VictorImg from "@/assets/Victor.webp";
import WilmarImg from "@/assets/Wilmar.webp";
import {
  BrainCircuit,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Handshake,
  Landmark,
  Lightbulb,
  MapPinned,
  MousePointerClick,
  Rocket,
  School,
  Sparkles,
  Target,
  Users,
  Waypoints,
  type LucideIcon,
} from "lucide-react";

type Competencia = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type FrenteTrabajo = {
  id: string;
  title: string;
  summary: string;
  icon: LucideIcon;
  acciones: string[];
  impacto: string;
};

type GestorGalleryImage = {
  src: string;
  alt: string;
};

type Gestor = {
  id: number;
  nombre: string;
  profesion: string;
  tipo: "STEM" | "Pedagógica" | "Administrativo" | "Investigación";
  foto: string;
  institucionAsignada?: string | string[];
};

const funcionesGenerales = [
  "Acompañamiento pedagógico a docentes.",
  "Diseño de experiencias de aprendizaje con metodologías activas.",
  "Implementación del enfoque STEM+.",
  "Formación en herramientas tecnológicas y digitales.",
  "Gestión de proyectos educativos innovadores.",
  "Articulación con instituciones, aliados y el ecosistema educativo.",
];

const competenciasSigloXXI = ["Conocimientos", "Habilidades", "Actitudes", "Valores"];

const capacidadesCiudadanas = [
  "Integrar conocimientos, habilidades, actitudes y valores.",
  "Resolver problemas complejos.",
  "Tomar decisiones informadas.",
  "Aportar al desarrollo sostenible del territorio.",
];

const competenciasClave: Competencia[] = [
  {
    title: "Metodologías activas",
    description: "Manejo de ABP, STEAM, Design Thinking y aprendizaje basado en retos.",
    icon: BrainCircuit,
  },
  {
    title: "Liderazgo pedagógico",
    description: "Capacidad para orientar y acompañar a docentes y directivos en procesos de transformación.",
    icon: GraduationCap,
  },
  {
    title: "Habilidades tecnológicas",
    description: "Uso de herramientas digitales, programación, robótica y producción multimedia.",
    icon: Rocket,
  },
  {
    title: "Gestión de proyectos",
    description: "Diseño, ejecución y evaluación de iniciativas educativas con seguimiento real.",
    icon: Target,
  },
  {
    title: "Habilidades blandas",
    description: "Comunicación asertiva, trabajo colaborativo, pensamiento crítico y resolución de problemas.",
    icon: Users,
  },
  {
    title: "Enfoque ético y sostenible",
    description: "Promoción de prácticas responsables con el entorno y orientadas al bien común.",
    icon: CheckCircle2,
  },
  {
    title: "Articulación institucional",
    description: "Trabajo coordinado con instituciones educativas, centros de ciencia y aliados.",
    icon: Waypoints,
  },
];

const frentesTrabajo: FrenteTrabajo[] = [
  {
    id: "cid",
    title: "Trabajo en el Centro de Innovación (CID)",
    summary:
      "En el Centro de Innovación, los gestores desarrollan procesos formativos dirigidos a docentes, estudiantes y comunidad en general.",
    icon: Lightbulb,
    acciones: [
      "Talleres formativos y cursos en tecnología, innovación y STEM.",
      "Clubes y espacios de experimentación con enfoque práctico.",
      "Procesos de alfabetización digital y apropiación del conocimiento.",
      "Diseño de experiencias que luego se trasladan a las instituciones educativas.",
    ],
    impacto:
      "El CID funciona como un laboratorio de aprendizaje donde se exploran metodologías, herramientas y rutas de innovación aplicables al territorio.",
  },
  {
    id: "instituciones",
    title: "Trabajo en Instituciones Educativas",
    summary:
      "En las instituciones educativas públicas fortalecen centros de interés, semilleros de investigación y proyectos STEM.",
    icon: School,
    acciones: [
      "Acompañamiento a centros de interés y proyectos con enfoque territorial.",
      "Impulso a procesos en tecnología, ciencia, robótica, medio ambiente y comunicación.",
      "Planeación de actividades y seguimiento continuo a los procesos.",
      "Promoción del aprendizaje basado en proyectos y la participación activa del estudiante.",
    ],
    impacto:
      "Los estudiantes desarrollan intereses, capacidades y experiencias más significativas dentro de su contexto escolar.",
  },
  {
    id: "docentes",
    title: "Acompañamiento y asesoría a docentes",
    summary:
      "Uno de los pilares del trabajo de los gestores es el acompañamiento directo a docentes dentro del aula.",
    icon: Handshake,
    acciones: [
      "Planeación conjunta de clases y proyectos.",
      "Implementación de metodologías activas e integración del enfoque STEM en el currículo.",
      "Apoyo en el uso de herramientas tecnológicas y evaluación de experiencias de aprendizaje.",
      "Talleres de formación, mentorías personalizadas y espacios de aprendizaje colaborativo.",
    ],
    impacto:
      "El docente gana confianza para innovar, incorporar tecnología y transformar sus dinámicas de enseñanza.",
  },
  {
    id: "territorio",
    title: "Trabajo en el territorio y la comunidad",
    summary:
      "Los gestores extienden su impacto más allá de la escuela, vinculando ciudadanía, comunidad y territorio.",
    icon: MapPinned,
    acciones: [
      "Creación de comunidades de aprendizaje y formación abierta a la ciudadanía.",
      "Procesos de alfabetización digital y diagnósticos sobre el uso de TIC.",
      "Difusión de buenas prácticas educativas, ferias de ciencia y eventos del ecosistema.",
      "Participación en redes de conocimiento que fortalecen el aprendizaje compartido.",
    ],
    impacto:
      "Se consolida un ecosistema educativo innovador donde el conocimiento circula, se transforma y genera impacto social.",
  },
  {
    id: "articulacion",
    title: "Articulación y gestión del sistema educativo",
    summary:
      "También cumplen un rol estratégico en la articulación institucional y el seguimiento de procesos educativos.",
    icon: Landmark,
    acciones: [
      "Apoyo a la transformación del PEI y la planeación de proyectos educativos.",
      "Gestión de alianzas con actores del ecosistema y participación en comités.",
      "Reportes periódicos, registro de actividades y seguimiento a indicadores.",
      "Gestión administrativa que asegura continuidad, trazabilidad y mejora.",
    ],
    impacto:
      "La innovación deja de depender de acciones aisladas y se integra a la gestión institucional con visión de sostenibilidad.",
  },
];

const gestoresGalleryImages: GestorGalleryImage[] = [
  { src: "/Seccion Gestores/1.webp", alt: "Gestores de innovación en actividad formativa 1" },
  { src: "/Seccion Gestores/2.webp", alt: "Gestores de innovación en actividad formativa 2" },
  { src: "/Seccion Gestores/3.webp", alt: "Gestores de innovación en actividad formativa 3" },
  { src: "/Seccion Gestores/4.webp", alt: "Gestores de innovación en actividad formativa 4" },
  { src: "/Seccion Gestores/5.webp", alt: "Gestores de innovación en actividad formativa 5" },
  { src: "/Seccion Gestores/6.webp", alt: "Gestores de innovación en actividad formativa 6" },
  { src: "/Seccion Gestores/7.webp", alt: "Gestores de innovación en actividad formativa 7" },
  { src: "/Seccion Gestores/8.webp", alt: "Gestores de innovación en actividad formativa 8" },
  { src: "/Seccion Gestores/9.webp", alt: "Gestores de innovación en actividad formativa 9" },
  { src: "/Seccion Gestores/10.webp", alt: "Gestores de innovación en actividad formativa 10" },
  { src: "/Seccion Gestores/11.webp", alt: "Gestores de innovación en actividad formativa 11" },
  { src: "/Seccion Gestores/12.webp", alt: "Gestores de innovación en actividad formativa 12" },
  { src: "/Seccion Gestores/13.webp", alt: "Gestores de innovación en actividad formativa 13" },
  { src: "/Seccion Gestores/14.webp", alt: "Gestores de innovación en actividad formativa 14" },
];

const heroImages = gestoresGalleryImages.slice(0, 3);
const stripImages = gestoresGalleryImages.slice(3, 6);
const cierreImages = gestoresGalleryImages.slice(12, 14);

const frenteImagenes: Record<string, GestorGalleryImage> = {
  cid: gestoresGalleryImages[6],
  instituciones: gestoresGalleryImages[7],
  docentes: gestoresGalleryImages[8],
  territorio: gestoresGalleryImages[9],
  articulacion: gestoresGalleryImages[10],
};

const bannerImagen = gestoresGalleryImages[11];

const competenciaAccentStyles = [
  {
    cardClass: "bg-gradient-to-br from-white via-white to-[#11B2AA]/10 ring-[#11B2AA]/15",
    iconClass: "bg-gradient-to-br from-[#11B2AA] to-[#0D4B56] text-white",
  },
  {
    cardClass: "bg-gradient-to-br from-white via-white to-[#2D3586]/10 ring-[#2D3586]/15",
    iconClass: "bg-gradient-to-br from-[#2D3586] to-[#0D4B56] text-white",
  },
];

const cierreEtiquetas = [
  { title: "Transformación educativa", color: "text-[#FFDE07]", body: "Acompañan procesos que cambian la práctica pedagógica." },
  { title: "Tecnología con sentido", color: "text-[#11B2AA]", body: "Integran herramientas y metodologías según las necesidades reales." },
  { title: "Trabajo en red", color: "text-[#EC6910]", body: "Articulan comunidad, instituciones y aliados del ecosistema." },
  { title: "Proyección territorial", color: "text-[#7E8BFF]", body: "Impulsan una educación conectada con el futuro del municipio." },
];

const toWebp = (src: string) => src.replace(/\.(jpe?g|png)$/i, ".webp");

const fotosGaleriaGestores = gestoresGalleryImages.map((image) => image.src);

const institutionImageByName: Record<string, string> = {
  "Institución Educativa La Paz": "/InstituciónEducativaLaPaz.jpg",
  "Institución Educativa Manuel Uribe Ángel": "/InstituciónEducativaManuelUribeÁngel.JPG",
  "Institución Educativa Las Palmas": "/InstituciónEducativaLasPalmas.JPG",
  "Institución Educativa Comercial de Envigado": "/InstituciónEducativaComercialdeEnvigado.jpg",
  "Institución Educativa San Vicente Alto de las Flores": "/InstituciónEducativaSanVicenteAltodelasFlores.jpg",
  "Institución Educativa San Vicente Alto de Las Flores": "/InstituciónEducativaSanVicenteAltodelasFlores.jpg",
  "Institución Educativa El Salado": "/InstituciónEducativaElSalado.jpg",
  "Institución Educativa El Salado Sede Principal": "/InstituciónEducativaElSalado.jpg",
  "Institución Educativa José Manuel Restrepo Vélez": "/InstituciónEducativaJoséManuelRestrepoVélez.jpg",
  "Institución Educativa José Manuel Restrepo": "/InstituciónEducativaJoséManuelRestrepoVélez.jpg",
  "Institución Educativa Darío de Bedout": "/InstituciónEducativaDaríodeBedout.jpg",
  "Institución Educativa Normal Superior de Envigado": "/InstituciónEducativaNormalSuperiordeEnvigado.jpg",
  "Institución Educativa Martín Eduardo Ríos Llano": "/InstituciónEducativaMartínEduardoRíosLlanos.png",
  "Institución Educativa María Poussepin": "/InstituciónEducativaMaríaPoussepin.JPG",
  "Institución Educativa Leticia Arango De Avendaño": "/InstituciónEducativaLeticiaArangodeAvendaño.JPG",
  "Institución Educativa José Miguel de La Calle": "/InstituciónEducativaJoséMigueldelaCalle.png",
  "Institución Educativa Alejandro Vélez Barrientos": "/InstituciónEducativaAlejandroVélezBarrientos.jpg",
};

  const gestoresData: Gestor[] = [
    {
      id: 1,
      nombre: "Alejandra Mora Poveda",
      profesion: "Bióloga con Maestría en Conservación y uso de la Biodiversidad",
      tipo: "Investigación",
      foto: AlejandraImg,
      institucionAsignada: ["Institución Educativa La Paz", "Institución Educativa Manuel Uribe Ángel", "Institución Educativa Las Palmas", "Institución Educativa Comercial de Envigado"]
    },
    {
      id: 2,
      nombre: "Isabel Vega Rodríguez",
      profesion: "Ingeniera Física, Magister en Ingeniería",
      tipo: "STEM",
      foto: IsabelImg,
      institucionAsignada: "Institución Educativa José Manuel Restrepo"
    },
    {
      id: 3,
      nombre: "Julián Darío Parra Gómez",
      profesion: "Ingeniero de Petróleos",
      tipo: "STEM",
      foto: JulianImg,
      institucionAsignada: "Institución Educativa San Vicente Alto de Las Flores"
    },
    {
      id: 4,
      nombre: "Karen Palacio Úsuga",
      profesion: "Licenciada Básica con énfasis en Ciencias Sociales",
      tipo: "Investigación",
      foto: KarenImg,
      institucionAsignada: [
        "Institución Educativa San Vicente Alto de las Flores",
        "Institución Educativa El Salado",
        "Institución Educativa José Manuel Restrepo Vélez",
        "Institución Educativa José Manuel Restrepo Vélez",
        "Institución Educativa Darío de Bedout",
      ]
    },
    {
      id: 5,
      nombre: "Mauricio Valencia Cifuentes",
      profesion: "Licenciado en Educación Básica con énfasis en Matemáticas",
      tipo: "STEM",
      foto: MauricioImg,
      institucionAsignada: "Institución Educativa Darío de Bedout"
    },
    {
      id: 6,
      nombre: "Mónica María Quiceno Taborda",
      profesion: "Licenciada en Ed. Básica con énfasis en Ciencias Naturales y Educación Ambiental",
      tipo: "STEM",
      foto: MonicaImg,
      institucionAsignada: "Institución Educativa El Salado Sede Principal"
    },
    {
      id: 7,
      nombre: "Javier Nicolás Bernal Restrepo",
      profesion: "Ecólogo y Magister en Turismo Sostenible",
      tipo: "STEM",
      foto: NicolasImg,
      institucionAsignada: "Institución Educativa Normal Superior de Envigado"
    },
    {
      id: 8,
      nombre: "Santiago Sierra Yaber",
      profesion: "Astronomo",
      tipo: "STEM",
      foto: SantiagoImg,
      institucionAsignada: "Institución Educativa La Paz"
    },
    {
      id: 9,
      nombre: "Tania Carmona Vasco",
      profesion: "Licenciada en Artes Plásticas",
      tipo: "STEM",
      foto: TaniaImg,
      institucionAsignada: "Institución Educativa José Miguel de La Calle"
    },
    {
      id: 10,
      nombre: "Víctor Tobón Restrepo",
      profesion: "Ciencias Política Politólogo",
      tipo: "STEM",
      foto: VictorImg,
      institucionAsignada: "Institución Educativa Martín Eduardo Ríos Llano"
    },
    {
      id: 11,
      nombre: "William José Pomares Durango",
      profesion: "Ingeniero Electrónico Especialista en Educación",
      tipo: "STEM",
      foto: WilmarImg,
      institucionAsignada: "Institución Educativa Comercial de Envigado"
    },
    {
      id: 12,
      nombre: "Angela María Mejía Celis",
      profesion: "Licenciada en Humanidades y Lengua Castellana",
      tipo: "STEM",
      foto: "/gestores/Angela%202.png",
      institucionAsignada: "Institución Educativa María Poussepin"
    },
    {
      id: 13,
      nombre: "Erika Atehortúa Argaez",
      profesion: "Sociología, Magíster en Innovación y Educación",
      tipo: "STEM",
      foto: "/gestores/Erika.png",
      institucionAsignada: "Institución Educativa Las Palmas"
    },
    {
      id: 14,
      nombre: "Mateo Vásquez Correa",
      profesion: "Ingeniero de Sistemas",
      tipo: "STEM",
      foto: "/gestores/Mateo.png",
      institucionAsignada: "Institución Educativa Manuel Uribe Ángel"
    },
    {
      id: 15,
      nombre: "Ronald Eduardo Gaitán Gelvez",
      profesion: "Ing. Mecatrónico, Ing. Eléctrico, Esp.Telecomunicaciones",
      tipo: "STEM",
      foto: "/gestores/Ronald.png",
      institucionAsignada: "Institución Educativa Leticia Arango De Avendaño"
    },
  ];

function GestoresImageCard({
  image,
  className,
  imageClassName,
}: {
  image: GestorGalleryImage;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/10 shadow-lg ${className ?? ""}`}>
      <picture className="contents">
        <source srcSet={toWebp(image.src)} type="image/webp" />
        <img
          src={image.src}
          alt={image.alt}
          className={`h-full w-full object-cover ${imageClassName ?? ""}`}
          loading="lazy"
          decoding="async"
        />
      </picture>
    </div>
  );
}

export default function Gestores() {
  const [frenteActivo, setFrenteActivo] = useState(frentesTrabajo[0].id);
  const [gestoresCarouselIndex, setGestoresCarouselIndex] = useState(0);
  const [gestoresGaleriaIndex, setGestoresGaleriaIndex] = useState(0);
  const [gestorSeleccionado, setGestorSeleccionado] = useState<Gestor | null>(null);
  const [institucionModalIndex, setInstitucionModalIndex] = useState(0);
  const [directionVisibleCards, setDirectionVisibleCards] = useState(4);
  const [gestoresGapPx, setGestoresGapPx] = useState(20);
  const gestoresTotal = gestoresData.length;
  const gestoresMaxStart = Math.max(0, gestoresTotal - directionVisibleCards);

  const frenteActual = frentesTrabajo.find((frente) => frente.id === frenteActivo) ?? frentesTrabajo[0];
  const IconoFrenteActual = frenteActual.icon;
  const imagenFrenteActual = frenteImagenes[frenteActivo] ?? gestoresGalleryImages[6];

  const goGestoresPrev = () => {
    setGestoresCarouselIndex((prev) => Math.max(0, prev - 1));
  };

  const goGestoresNext = () => {
    setGestoresCarouselIndex((prev) => Math.min(gestoresMaxStart, prev + 1));
  };

  const goGaleriaGestoresPrev = () => {
    setGestoresGaleriaIndex((prev) =>
      (prev - 1 + fotosGaleriaGestores.length) % fotosGaleriaGestores.length
    );
  };

  const goGaleriaGestoresNext = () => {
    setGestoresGaleriaIndex((prev) => (prev + 1) % fotosGaleriaGestores.length);
  };

  const institucionesGestorSeleccionado = gestorSeleccionado
    ? Array.isArray(gestorSeleccionado.institucionAsignada)
      ? gestorSeleccionado.institucionAsignada
      : gestorSeleccionado.institucionAsignada
        ? [gestorSeleccionado.institucionAsignada]
        : []
    : [];

  const institucionModalActual = institucionesGestorSeleccionado[institucionModalIndex];
  const institucionModalImage = institucionModalActual ? institutionImageByName[institucionModalActual] : undefined;

  const goInstitucionModalPrev = () => {
    if (institucionesGestorSeleccionado.length <= 1) return;
    setInstitucionModalIndex((prev) =>
      (prev - 1 + institucionesGestorSeleccionado.length) % institucionesGestorSeleccionado.length
    );
  };

  const goInstitucionModalNext = () => {
    if (institucionesGestorSeleccionado.length <= 1) return;
    setInstitucionModalIndex((prev) => (prev + 1) % institucionesGestorSeleccionado.length);
  };

  useEffect(() => {
    const id = window.setInterval(() => {
      setGestoresGaleriaIndex((prev) => (prev + 1) % fotosGaleriaGestores.length);
    }, 5000);

    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth >= 1536) {
        setDirectionVisibleCards(5);
        setGestoresGapPx(20);
        return;
      }

      if (window.innerWidth >= 1280) {
        setDirectionVisibleCards(4);
        setGestoresGapPx(20);
        return;
      }

      if (window.innerWidth >= 1024) {
        setDirectionVisibleCards(3);
        setGestoresGapPx(16);
        return;
      }

      if (window.innerWidth >= 768) {
        setDirectionVisibleCards(2);
        setGestoresGapPx(14);
        return;
      }

      setDirectionVisibleCards(1);
      setGestoresGapPx(12);
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  useEffect(() => {
    setGestoresCarouselIndex((prev) => Math.min(prev, gestoresMaxStart));
  }, [gestoresMaxStart]);

  useEffect(() => {
    const handleEscClose = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setGestorSeleccionado(null);
      }
    };

    window.addEventListener("keydown", handleEscClose);
    return () => window.removeEventListener("keydown", handleEscClose);
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(17,178,170,0.16),_transparent_24%),linear-gradient(180deg,_#ffffff_0%,_rgba(17,178,170,0.08)_45%,_rgba(13,75,86,0.08)_100%)]">
      <section className="relative w-full overflow-hidden md:h-screen">
        <picture>
          <source srcSet="/banners/Banner%20gestores.webp" type="image/webp" />
          <img
            src="/banners/Banner%20gestores.png"
            alt="Banner principal Gestores de Innovación"
            loading="eager"
            fetchPriority="high"
            decoding="sync"
            className="h-auto w-full object-contain md:h-full md:object-cover md:object-center"
          />
        </picture>
        <div className="absolute inset-0 bg-[#182130]/35" />
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center">
          <h1 className="text-lg font-black leading-tight text-white sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl lg:whitespace-nowrap">
            Gestores de Innovación
          </h1>
        </div>

        {/* Flecha scroll-down */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
          <ChevronLeft className="h-6 w-6 rotate-[-90deg]" />
        </div>
      </section>

      <div className="container py-8">
        <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Gestores de Innovación" }]} />

        <section className="relative mt-6 overflow-hidden rounded-3xl border border-[#182130] bg-gradient-to-r from-[#182130] via-[#0D4B56] to-[#023A34] p-6 text-white shadow-2xl md:p-10 lg:p-14">
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[#11B2AA]/25 blur-2xl" />
          <div className="absolute -bottom-16 left-1/3 h-52 w-52 rounded-full bg-[#2D3586]/25 blur-2xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <Badge className="mb-4 bg-[#EC6910] text-white hover:bg-[#d75f0f]">
                <Sparkles className="mr-2 h-4 w-4" /> Innovación educativa y territorio STEM+
              </Badge>
              <h1 className="max-w-4xl text-3xl font-black leading-tight md:text-5xl">
                Gestores de Innovación Educativa
              </h1>
              <p className="mt-4 max-w-4xl text-sm text-cyan-50 md:text-lg">
                Son profesionales que lideran procesos de transformación en las instituciones educativas,
                promoviendo nuevas formas de enseñar y aprender a través del enfoque STEM+, la tecnología y la
                innovación pedagógica.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-white/15 text-white hover:bg-white/20">
                  Agentes de cambio
                </Badge>
                <Badge variant="secondary" className="bg-white/15 text-white hover:bg-white/20">
                  Acompañamiento pedagógico
                </Badge>
                <Badge variant="secondary" className="bg-white/15 text-white hover:bg-white/20">
                  Innovación con impacto territorial
                </Badge>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 sm:grid-rows-[12rem_12rem] lg:grid-rows-[13rem_13rem]">
              <GestoresImageCard
                image={heroImages[0]}
                className="sm:row-span-2"
                imageClassName="min-h-[18rem] sm:min-h-full"
              />
              <GestoresImageCard image={heroImages[1]} imageClassName="min-h-[12rem]" />
              <GestoresImageCard image={heroImages[2]} imageClassName="min-h-[12rem]" />
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <Card className="border-[#0D4B56]/30 bg-gradient-to-br from-white via-white to-[#11B2AA]/10 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-[#0D4B56]">¿Qué son los gestores?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700">
              <p>
                Se caracterizan por ser agentes de cambio con mentalidad innovadora, capaces de trascender los
                modelos tradicionales de educación y acompañar nuevas formas de aprendizaje.
              </p>
              <p>
                Su enfoque multidisciplinario les permite integrar distintas áreas del conocimiento para trabajar de
                la mano con docentes, directivos y estudiantes en experiencias educativas más dinámicas,
                pertinentes y significativas.
              </p>
              <p>
                Más que capacitadores externos, son aliados en el aula que fortalecen las prácticas pedagógicas
                desde la realidad del territorio.
              </p>
            </CardContent>
          </Card>

          <Card className="border-[#EC6910]/35 bg-gradient-to-br from-[#EC6910]/12 via-white to-[#11B2AA]/12 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-[#182130]">Propósito de los gestores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700">
              <p>
                Su propósito se enmarca en el trabajo de la Dirección de Innovación, que busca liderar, coordinar y
                promover el desarrollo científico, tecnológico y de innovación como motor del progreso social,
                educativo, económico y cultural del municipio.
              </p>
              <p>
                En ese sentido, los gestores conectan conocimiento, comunidad y soluciones a problemáticas reales,
                impulsando procesos educativos alineados con la sostenibilidad y el enfoque de Territorio STEM+
                SMART.
              </p>
              <div className="rounded-2xl border border-[#EC6910]/25 bg-gradient-to-r from-[#EC6910]/8 to-[#11B2AA]/10 p-4">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#EC6910]">
                  Su labor contribuye a formar ciudadanos capaces de:
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {capacidadesCiudadanas.map((capacidad) => (
                    <div key={capacidad} className="rounded-xl border border-[#EC6910]/15 bg-white/90 p-3 text-sm text-slate-700 shadow-sm">
                      {capacidad}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Card className="border-[#0D4B56]/30 bg-gradient-to-br from-white via-white to-[#023A34]/10 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-[#182130]">¿Qué hacen los gestores?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-5 text-slate-700">
                Diseñan, implementan y acompañan procesos educativos innovadores que impactan diferentes niveles del
                sistema educativo y la comunidad.
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                {funcionesGenerales.map((funcion) => (
                  <div key={funcion} className="rounded-2xl border border-[#023A34]/15 bg-gradient-to-br from-white to-[#11B2AA]/8 p-4 text-sm text-slate-700 shadow-sm">
                    {funcion}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#2D3586]/30 bg-gradient-to-br from-[#2D3586]/15 via-white to-[#EC6910]/8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-[#182130]">Competencias que promueven</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {competenciasSigloXXI.map((competencia) => (
                <div key={competencia} className="rounded-2xl border border-[#2D3586]/20 bg-gradient-to-r from-white to-[#2D3586]/10 p-4 text-slate-700 shadow-sm">
                  <p className="font-semibold text-[#182130]">{competencia}</p>
                  <p className="text-sm text-[#0D4B56]">
                    Desarrollo integral para aprender, hacer, convivir y actuar con criterio.
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="mt-12 grid gap-4 md:grid-cols-3">
          {stripImages.map((image, index) => (
            <GestoresImageCard
              key={image.src}
              image={image}
              className={index === 1 ? "md:-translate-y-3" : ""}
              imageClassName="h-64 md:h-72"
            />
          ))}
        </section>

        <section className="mt-12 rounded-[2rem] border border-[#11B2AA]/20 bg-gradient-to-b from-white to-[#11B2AA]/5 p-1">
          <div className="rounded-[1.7rem] bg-white/80 p-5 md:p-6">
          <div className="mb-5 flex items-center gap-3">
            <BrainCircuit className="h-7 w-7 text-[#0D4B56]" />
            <div>
              <h2 className="text-2xl font-bold text-[#182130] md:text-3xl">Perfil y competencias del gestor</h2>
              <p className="text-slate-600">
                El gestor de innovación educativa combina capacidades pedagógicas, tecnológicas y sociales para
                generar impacto real en el entorno educativo.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {competenciasClave.map((competencia, index) => {
              const Icon = competencia.icon;
              const accent = competenciaAccentStyles[index % competenciaAccentStyles.length];

              return (
                <Card key={competencia.title} className={`border-transparent shadow-sm ring-1 ${accent.cardClass}`}>
                  <CardContent className="p-5">
                    <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl shadow-sm ${accent.iconClass}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-[#182130]">{competencia.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{competencia.description}</p>
                  </CardContent>
                </Card>
              );
            })}
            </div>
            </div>
          </section>

          <section className="mt-14 rounded-3xl border border-[#023A34]/20 bg-gradient-to-r from-[#023A34]/15 via-[#11B2AA]/12 to-[#2D3586]/10 p-6 shadow-sm md:p-8">
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div className="flex items-start gap-3">
                <Handshake className="mt-1 h-6 w-6 shrink-0 text-[#023A34]" />
                <div>
                  <h3 className="text-xl font-bold text-[#182130]">¿Cómo trabajan los gestores?</h3>
                  <p className="mt-2 max-w-4xl text-slate-700">
                    Su trabajo combina formación, acompañamiento, trabajo en red y gestión institucional. A continuación
                    puedes explorar los principales escenarios en los que desarrollan su labor.
                  </p>
                </div>
              </div>

              <GestoresImageCard
                image={bannerImagen}
                className="border-[#023A34]/10 bg-white/40"
                imageClassName="h-64 lg:h-72"
              />
            </div>
          </section>

          <section className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <Card className="border-[#2D3586]/20 bg-gradient-to-b from-white to-[#2D3586]/5 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-[#182130]">Frentes de trabajo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {frentesTrabajo.map((frente) => {
                        const Icon = frente.icon;

                        return (
                          <button
                            key={frente.id}
                            type="button"
                            onClick={() => setFrenteActivo(frente.id)}
                            className={`flex w-full items-start gap-3 rounded-2xl border px-4 py-4 text-left transition-colors ${
                              frenteActivo === frente.id
                                ? "border-[#2D3586]/35 bg-gradient-to-r from-[#2D3586]/15 to-[#11B2AA]/10 text-[#182130]"
                                : "border-slate-200 bg-white text-slate-700 hover:border-[#2D3586]/40 hover:bg-[#2D3586]/5"
                            }`}
                          >
                            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#2D3586] to-[#0D4B56] text-white shadow-sm">
                              <Icon className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-semibold">{frente.title}</p>
                              <p className="mt-1 text-sm text-slate-600">{frente.summary}</p>
                            </div>
                          </button>
                        );
                      })}
                    </CardContent>
                  </Card>

                  <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
                    <Card className="border-[#2D3586]/30 bg-[linear-gradient(135deg,rgba(45,53,134,0.16)_0%,rgba(255,255,255,0.96)_38%,rgba(17,178,170,0.16)_100%)] shadow-sm">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#11B2AA] to-[#2D3586] text-white shadow-sm">
                            <IconoFrenteActual className="h-5 w-5" />
                          </div>
                          <div>
                            <CardTitle className="text-xl text-[#182130]">{frenteActual.title}</CardTitle>
                            <p className="mt-1 text-sm text-slate-600">{frenteActual.summary}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#2D3586]">Acciones destacadas</p>
                        <div className="grid gap-3 md:grid-cols-2">
                          {frenteActual.acciones.map((accion) => (
                            <div key={accion} className="rounded-2xl border border-[#11B2AA]/20 bg-white/90 p-4 text-sm text-slate-700 shadow-sm">
                              {accion}
                            </div>
                          ))}
                        </div>
                        <div className="mt-5 rounded-2xl border border-[#0D4B56]/25 bg-gradient-to-r from-[#0D4B56]/10 to-[#11B2AA]/10 p-4 text-sm text-[#182130]">
                          <span className="font-bold text-[#EC6910]">Impacto:</span> {frenteActual.impacto}
                        </div>
                      </CardContent>
                    </Card>

                    <GestoresImageCard
                      image={imagenFrenteActual}
                      className="border-[#2D3586]/15 bg-white/40"
                      imageClassName="h-80 xl:h-full"
                    />
                  </div>
                </section>

        <section className="mt-16 rounded-3xl border border-[#182130]/10 bg-[linear-gradient(145deg,rgba(24,33,48,0.98)_0%,rgba(13,75,86,0.98)_45%,rgba(2,58,52,0.96)_100%)] p-8 text-white shadow-sm">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#11B2AA] to-[#2D3586] text-white">
                <Building2 className="h-6 w-6" />
              </div>
              <p className="mt-3 text-cyan-50">
                Los Gestores de Innovación Educativa son actores clave en la transformación del sistema educativo,
                conectando la escuela con la tecnología, la innovación y las necesidades del territorio.
              </p>
              <p className="mt-3 text-cyan-50">
                Su trabajo no solo impacta el aula; fortalece el ecosistema educativo en su conjunto y promueve una
                educación más pertinente, creativa y orientada al futuro.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {cierreEtiquetas.slice(0, 2).map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                  <p className={`font-semibold ${item.color}`}>{item.title}</p>
                  <p className="mt-1 text-sm text-cyan-50">{item.body}</p>
                </div>
              ))}
              <GestoresImageCard
                image={cierreImages[0]}
                className="border-white/15 bg-white/10"
                imageClassName="h-52"
              />
              <GestoresImageCard
                image={cierreImages[1]}
                className="border-white/15 bg-white/10"
                imageClassName="h-52"
              />
            </div>
          </div>
        </section>



      {/* Gestores de Innovación */}
      <section id="gestores-innovacion" className="pt-10 pb-2 bg-gradient-to-br from-gray-50 to-gray-100 scroll-mt-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-3"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-teal-100 border border-blue-300 rounded-full px-4 py-2 mb-4">
              <Users className="w-4 h-4 text-blue-600" />
              <span className="text-blue-700 text-sm font-semibold">Nuestro Equipo</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Gestores de Innovación - Dirección de Innovación
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Conoce a los profesionales que lideran la innovación educativa en nuestras instituciones
            </p>
          </motion.div>

          {/* Carrusel de fotos de los gestores */}
          <div className="relative mb-2 overflow-hidden rounded-2xl shadow-2xl">
            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
              {fotosGaleriaGestores.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setGestoresGaleriaIndex(idx)}
                  aria-label={`Ir a imagen ${idx + 1} de la galería de gestores`}
                  className={`h-2 rounded-full transition-all ${
                    gestoresGaleriaIndex === idx ? "w-8 bg-white" : "w-2 bg-white/55"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={goGestoresPrev}
              aria-label="Anterior en Gestores de Innovación"
              disabled={gestoresCarouselIndex === 0}
              className="absolute left-0 top-1/2 z-10 -translate-x-3 -translate-y-1/2 rounded-full border border-slate-300 bg-white/95 p-2 text-slate-700 shadow-md hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={goGestoresNext}
              aria-label="Siguiente en Gestores de Innovación"
              disabled={gestoresCarouselIndex >= gestoresMaxStart}
              className="absolute right-0 top-1/2 z-10 translate-x-3 -translate-y-1/2 rounded-full border border-slate-300 bg-white/95 p-2 text-slate-700 shadow-md hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="overflow-hidden px-6">
              <motion.div
                animate={{
                  x: `calc(-${gestoresCarouselIndex} * ((100% - ${(directionVisibleCards - 1) * gestoresGapPx}px) / ${directionVisibleCards} + ${gestoresGapPx}px))`,
                }}
                transition={{ type: "spring", stiffness: 90, damping: 20, mass: 0.8 }}
                className="flex"
                style={{ gap: `${gestoresGapPx}px` }}
              >
                {gestoresData.map((gestor, index) => (
                  <div
                    key={gestor.id}
                    className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white to-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.15)] transition-all duration-300"
                    style={{
                      flex: `0 0 calc((100% - ${(directionVisibleCards - 1) * gestoresGapPx}px) / ${directionVisibleCards})`,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setGestorSeleccionado(gestor);
                        setInstitucionModalIndex(0);
                      }}
                      className="relative w-full overflow-hidden bg-gray-50 text-left shadow-[inset_0_2px_4px_rgba(255,255,255,0.6)] flex items-center justify-center"
                      aria-label={`Ver institución asignada de ${gestor.nombre}`}
                    >
                      <picture className="contents">
                        <source srcSet={toWebp(gestor.foto)} type="image/webp" />
                        <img
                          src={gestor.foto}
                          alt={gestor.nombre}
                          loading={index < 8 || gestor.foto.startsWith("/gestores/") ? "eager" : "lazy"}
                          fetchPriority={index < 8 || gestor.foto.startsWith("/gestores/") ? "high" : "auto"}
                          decoding={index < 8 || gestor.foto.startsWith("/gestores/") ? "sync" : "async"}
                          className="h-[330px] w-full object-cover object-top transition-transform duration-300 group-hover:scale-105 sm:h-[250px] sm:object-cover sm:py-0 lg:h-[280px]"
                        />
                      </picture>
                      <div className="pointer-events-none absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                        <MousePointerClick className="h-3.5 w-3.5" />
                        <span>Toca aqui</span>
                      </div>
                    </button>

                    <div className="px-3 py-2 text-center sm:px-4 sm:py-4">
                      <h3 className="mb-1 text-sm font-bold leading-tight text-gray-900 sm:text-base">{gestor.nombre}</h3>
                      <p className="mb-2 line-clamp-3 text-xs leading-snug text-gray-600 sm:mb-2 sm:line-clamp-3 sm:text-xs">{gestor.profesion}</p>
                      <div className="flex justify-center">
                        <Badge variant={gestor.tipo === "STEM" ? "default" : "secondary"}>
                          {gestor.tipo}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="mt-8 flex justify-center gap-2">
              {Array.from({ length: gestoresMaxStart + 1 }, (_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setGestoresCarouselIndex(idx)}
                  aria-label={`Ir al bloque de gestores ${idx + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    gestoresCarouselIndex === idx ? "w-8 bg-slate-800" : "w-2 bg-slate-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {gestorSeleccionado && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4"
          onClick={() => {
            setGestorSeleccionado(null);
            setInstitucionModalIndex(0);
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Institución asignada del gestor"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-sm rounded-2xl border border-[#0D4B56]/25 bg-white p-5 shadow-2xl"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-[#0D4B56]">Institución asignada</p>
            <h3 className="mt-2 text-lg font-bold text-[#182130]">{gestorSeleccionado.nombre}</h3>

            {institucionesGestorSeleccionado.length > 0 ? (
              <div className="mt-3">
                <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                  {institucionModalImage ? (
                    <img
                      src={institucionModalImage}
                      alt={institucionModalActual}
                      className="h-40 w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="flex h-40 w-full items-center justify-center text-sm text-slate-500">
                      Sin foto disponible
                    </div>
                  )}

                  {institucionesGestorSeleccionado.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={goInstitucionModalPrev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/55 p-1.5 text-white"
                        aria-label="Institución anterior"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={goInstitucionModalNext}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/55 p-1.5 text-white"
                        aria-label="Siguiente institución"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>

                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{institucionModalActual}</p>

                {institucionesGestorSeleccionado.length > 1 && (
                  <div className="mt-2 flex items-center justify-center gap-1.5">
                    {institucionesGestorSeleccionado.map((institucion, index) => (
                      <button
                        key={`${gestorSeleccionado.id}-${institucion}-${index}`}
                        type="button"
                        onClick={() => setInstitucionModalIndex(index)}
                        className={`h-2 rounded-full transition-all ${
                          institucionModalIndex === index ? "w-6 bg-[#0D4B56]" : "w-2 bg-slate-300"
                        }`}
                        aria-label={`Ver institución ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <p className="mt-3 text-sm leading-relaxed text-slate-700">Institución por confirmar</p>
            )}
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setGestorSeleccionado(null);
                  setInstitucionModalIndex(0);
                }}
                className="rounded-lg bg-[#0D4B56] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#023A34]"
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        </div>
      )}

      </div>
    </div>
  );
}
