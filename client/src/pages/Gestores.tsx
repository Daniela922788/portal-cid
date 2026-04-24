import { useEffect, useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
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
  X,
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
    title: "Centro de Innovación (CID)",
    summary: "Procesos formativos dirigidos a docentes, estudiantes y comunidad.",
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
    title: "Instituciones Educativas",
    summary: "Fortalecen centros de interés, semilleros de investigación y proyectos STEM.",
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
    title: "Acompañamiento a Docentes",
    summary: "Acompañamiento directo a docentes dentro del aula.",
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
    title: "Territorio y Comunidad",
    summary: "Impacto más allá de la escuela, vinculando ciudadanía y territorio.",
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
    title: "Articulación Institucional",
    summary: "Rol estratégico en articulación y seguimiento de procesos educativos.",
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

const institutionImageByName: Record<string, string> = {
  "Institución Educativa La Paz": "/instituciones-foto/institucion-la-paz.webp",
  "Institución Educativa Manuel Uribe Ángel": "/instituciones-foto/institucion-manuel-uribe-angel.webp",
  "Institución Educativa Las Palmas": "/instituciones-foto/institucion-las-palmas.webp",
  "Institución Educativa Comercial de Envigado": "/instituciones-foto/institucion-comercial-envigado.webp",
  "Institución Educativa San Vicente Alto de las Flores": "/instituciones-foto/institucion-san-vicente-flores.webp",
  "Institución Educativa San Vicente Alto de Las Flores": "/instituciones-foto/institucion-san-vicente-flores.webp",
  "Institución Educativa El Salado": "/instituciones-foto/institucion-el-salado.webp",
  "Institución Educativa El Salado Sede Principal": "/instituciones-foto/institucion-el-salado.webp",
  "Institución Educativa José Manuel Restrepo Vélez": "/instituciones-foto/institucion-jose-manuel-restrepo-velez.webp",
  "Institución Educativa José Manuel Restrepo": "/instituciones-foto/institucion-jose-manuel-restrepo-velez.webp",
  "Institución Educativa Darío de Bedout": "/instituciones-foto/institucion-dario-de-bedout.webp",
  "Institución Educativa Normal Superior de Envigado": "/instituciones-foto/institucion-normal-superior-envigado.webp",
  "Institución Educativa Martín Eduardo Ríos Llano": "/instituciones-foto/institucion-martin-eduardo-rios-llanos.webp",
  "Institución Educativa Martín Eduardo Ríos Llanos": "/instituciones-foto/institucion-martin-eduardo-rios-llanos.webp",
  "Institución Educativa María Poussepin": "/instituciones-foto/institucion-maria-poussepin.webp",
  "Institución Educativa Leticia Arango De Avendaño": "/instituciones-foto/institucion-leticia-arango-avendano.webp",
  "Institución Educativa Leticia Arango de Avendaño": "/instituciones-foto/institucion-leticia-arango-avendano.webp",
  "Institución Educativa José Miguel de La Calle": "/instituciones-foto/institucion-jose-miguel-calle.webp",
  "Institución Educativa José Miguel de la Calle": "/instituciones-foto/institucion-jose-miguel-calle.webp",
  "Institución Educativa Alejandro Vélez Barrientos": "/instituciones-foto/institucion-alejandro-velez-barrientos.webp",
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
    profesion: "Astrónomo",
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
    foto: "/gestores/Angela%202.webp",
    institucionAsignada: "Institución Educativa María Poussepin"
  },
  {
    id: 13,
    nombre: "Erika Atehortúa Argaez",
    profesion: "Sociología, Magíster en Innovación y Educación",
    tipo: "STEM",
    foto: "/gestores/Erika.webp",
    institucionAsignada: "Institución Educativa Las Palmas"
  },
  {
    id: 14,
    nombre: "Mateo Vásquez Correa",
    profesion: "Ingeniero de Sistemas",
    tipo: "STEM",
    foto: "/gestores/Mateo.webp",
    institucionAsignada: "Institución Educativa Manuel Uribe Ángel"
  },
  {
    id: 15,
    nombre: "Ronald Eduardo Gaitán Gelvez",
    profesion: "Ing. Mecatrónico, Ing. Eléctrico, Esp. Telecomunicaciones",
    tipo: "STEM",
    foto: "/gestores/Ronald.webp",
    institucionAsignada: "Institución Educativa Leticia Arango De Avendaño"
  },
];

const toWebp = (src: string) => src.replace(/\.(jpe?g|png)$/i, ".webp");
const fotosGaleriaGestores = gestoresGalleryImages.map((image) => image.src);

// ─── Stat Counter Component ───────────────────────────────────────────────────
function StatCard({ number, label, accent }: { number: string; label: string; accent: string }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-2xl border border-white/10 bg-white/8 px-5 py-4 text-center backdrop-blur-sm">
      <span className={`text-3xl font-black ${accent}`}>{number}</span>
      <span className="text-xs font-medium text-white/70 leading-tight max-w-[80px]">{label}</span>
    </div>
  );
}

// ─── Image Card ───────────────────────────────────────────────────────────────
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
    <div className={`overflow-hidden rounded-2xl border border-white/12 bg-white/10 shadow-lg ${className ?? ""}`}>
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

// ─── Frente Tab Button ────────────────────────────────────────────────────────
function FrenteTab({
  frente,
  isActive,
  onClick,
}: {
  frente: FrenteTrabajo;
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = frente.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200 ${
        isActive
          ? "border-[#11B2AA]/40 bg-gradient-to-r from-[#0D4B56]/10 to-[#11B2AA]/10 shadow-sm"
          : "border-transparent bg-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50"
      }`}
    >
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
          isActive ? "bg-[#0D4B56] text-white" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
        }`}
      >
        <Icon className="h-4 w-4" />
      </div>
      <span className={`text-sm font-semibold leading-tight ${isActive ? "text-[#0D4B56]" : ""}`}>
        {frente.title}
      </span>
      {isActive && <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-[#11B2AA]" />}
    </button>
  );
}

// ─── Gestor Card ──────────────────────────────────────────────────────────────
function GestorCard({ gestor, onSelect }: { gestor: Gestor; onClick?: () => void; onSelect: (g: Gestor) => void }) {
  const tipoColor =
    gestor.tipo === "STEM"
      ? "bg-[#0D4B56]/10 text-[#0D4B56] border-[#0D4B56]/20"
      : "bg-[#EC6910]/10 text-[#EC6910] border-[#EC6910]/20";

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-[#11B2AA]/40">
      <button
        type="button"
        onClick={() => onSelect(gestor)}
        className="relative overflow-hidden"
        aria-label={`Ver institución de ${gestor.nombre}`}
      >
        <picture className="contents">
          <source srcSet={toWebp(gestor.foto)} type="image/webp" />
          <img
            src={gestor.foto}
            alt={gestor.nombre}
            loading="lazy"
            decoding="async"
            className="h-[300px] w-full object-cover object-[center_10%] transition-transform duration-500 group-hover:scale-105 lg:h-[280px]"
          />
        </picture>
        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#0D4B56]/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex w-full items-center justify-center gap-2 pb-4 text-sm font-semibold text-white">
            <MousePointerClick className="h-4 w-4" />
            Ver institución
          </div>
        </div>
      </button>

      <div className="flex flex-1 flex-col gap-1.5 px-4 py-3">
        <h3 className="text-sm font-bold leading-snug text-slate-900">{gestor.nombre}</h3>
        <p className="line-clamp-2 text-xs leading-relaxed text-slate-500">{gestor.profesion}</p>
        <div className="mt-auto pt-2">
          <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${tipoColor}`}>
            {gestor.tipo}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Gestores() {
  const [frenteActivo, setFrenteActivo] = useState(frentesTrabajo[0].id);
  const [gestoresCarouselIndex, setGestoresCarouselIndex] = useState(0);
  const [gestorSeleccionado, setGestorSeleccionado] = useState<Gestor | null>(null);
  const [institucionModalIndex, setInstitucionModalIndex] = useState(0);
  const [directionVisibleCards, setDirectionVisibleCards] = useState(4);
  const [gestoresGapPx, setGestoresGapPx] = useState(20);

  const gestoresTotal = gestoresData.length;
  const gestoresMaxStart = Math.max(0, gestoresTotal - directionVisibleCards);

  const frenteActual = frentesTrabajo.find((f) => f.id === frenteActivo) ?? frentesTrabajo[0];
  const IconoFrenteActual = frenteActual.icon;
  const imagenFrenteActual = frenteImagenes[frenteActivo] ?? gestoresGalleryImages[6];

  const institucionesGestorSeleccionado = gestorSeleccionado
    ? Array.isArray(gestorSeleccionado.institucionAsignada)
      ? gestorSeleccionado.institucionAsignada
      : gestorSeleccionado.institucionAsignada
        ? [gestorSeleccionado.institucionAsignada]
        : []
    : [];
  const institucionModalActual = institucionesGestorSeleccionado[institucionModalIndex];
  const institucionModalImage = institucionModalActual ? institutionImageByName[institucionModalActual] : undefined;

  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1536) { setDirectionVisibleCards(5); setGestoresGapPx(20); }
      else if (window.innerWidth >= 1280) { setDirectionVisibleCards(4); setGestoresGapPx(20); }
      else if (window.innerWidth >= 1024) { setDirectionVisibleCards(3); setGestoresGapPx(16); }
      else if (window.innerWidth >= 768) { setDirectionVisibleCards(2); setGestoresGapPx(14); }
      else { setDirectionVisibleCards(1); setGestoresGapPx(12); }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    setGestoresCarouselIndex((prev) => Math.min(prev, gestoresMaxStart));
  }, [gestoresMaxStart]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setGestorSeleccionado(null); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden md:h-screen">
        <picture>
          <source srcSet="/banners/Banner%20gestores.webp" type="image/webp" />
          <img
            src="/banners/Banner%20gestores.webp"
            alt="Banner principal Gestores de Innovación"
            loading="eager"
            fetchPriority="high"
            decoding="sync"
            className="h-auto w-full object-contain md:h-full md:object-cover md:object-center"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1F2D]/80 via-[#0D1F2D]/40 to-transparent" />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#11B2AA]/50 bg-[#11B2AA]/15 px-4 py-1.5 text-sm font-semibold text-[#11B2AA] backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" /> Innovación Educativa · Envigado
            </span>
            <h1 className="mt-3 text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Gestores de<br />
              <span className="text-[#11B2AA]">Innovación</span>
            </h1>
            <p className="mt-4 max-w-xl text-base text-white/75 md:text-lg">
              Profesionales que lideran la transformación educativa a través del enfoque STEM+ en Envigado.
            </p>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-10 flex flex-wrap justify-center gap-3"
          >
            <StatCard number="16" label="Gestores activos" accent="text-[#11B2AA]" />
            <StatCard number="14" label="Instituciones educativas" accent="text-[#FFDE07]" />
          </motion.div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-white/40">
          <ChevronLeft className="h-6 w-6 rotate-[-90deg]" />
        </div>
      </section>

      <div className="container py-8">
        <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Gestores de Innovación" }]} />

        {/* ── ¿QUÉ SON? + PROPÓSITO ────────────────────────────────────────── */}
        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Left: Quiénes son */}
          <div className="relative overflow-hidden rounded-2xl bg-[#0D1F2D] p-8 text-white">
            <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#11B2AA]/20 blur-2xl" />
            <div className="relative">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#11B2AA]/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#11B2AA]">
                ¿Quiénes son?
              </span>
              <h2 className="mt-3 text-2xl font-black leading-tight md:text-3xl">
                Agentes de cambio<br />en el aula
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/75">
                Son profesionales con mentalidad innovadora, capaces de trascender los modelos tradicionales y
                acompañar nuevas formas de aprendizaje. Su enfoque multidisciplinario integra distintas áreas
                del conocimiento.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/75">
                Más que capacitadores externos, son <strong className="text-white">aliados en el aula</strong> que
                fortalecen las prácticas pedagógicas desde la realidad del territorio.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-2">
                {["Agentes de cambio", "Acompañamiento pedagógico", "Innovación territorial", "Enfoque STEM+"].map((tag) => (
                  <div key={tag} className="rounded-lg border border-white/10 bg-white/8 px-3 py-2 text-xs font-medium text-white/80">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Propósito + imágenes */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EC6910]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#EC6910]">
                Propósito
              </span>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Conectan conocimiento, comunidad y soluciones a problemáticas reales, impulsando procesos
                educativos alineados con la sostenibilidad y el enfoque de <strong>Territorio STEM+ SMART</strong>.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {capacidadesCiudadanas.map((cap) => (
                  <div key={cap} className="flex items-start gap-2 rounded-xl bg-slate-50 p-3">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#11B2AA]" />
                    <span className="text-xs leading-relaxed text-slate-600">{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Strip images */}
            <div className="grid grid-cols-3 gap-3">
              {heroImages.map((img) => (
                <div key={img.src} className="overflow-hidden rounded-xl">
                  <picture className="contents">
                    <source srcSet={toWebp(img.src)} type="image/webp" />
                    <img src={img.src} alt={img.alt} className="h-28 w-full object-cover" loading="lazy" decoding="async" />
                  </picture>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ¿QUÉ HACEN? + COMPETENCIAS ───────────────────────────────────── */}
        <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-xl font-black text-slate-900">¿Qué hacen los gestores?</h2>
            <p className="mb-5 text-sm text-slate-500">
              Diseñan, implementan y acompañan procesos educativos innovadores en múltiples niveles del sistema.
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {funcionesGenerales.map((fn, i) => (
                <div key={fn} className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3.5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#0D4B56] text-[10px] font-black text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs leading-relaxed text-slate-700">{fn}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#2D3586]/20 bg-gradient-to-br from-[#2D3586]/5 to-white p-6 shadow-sm">
            <h2 className="mb-1 text-xl font-black text-slate-900">Competencias S. XXI</h2>
            <p className="mb-5 text-sm text-slate-500">Desarrollo integral para el ciudadano del futuro.</p>
            <div className="flex flex-col gap-3">
              {competenciasSigloXXI.map((comp, i) => {
                const colors = ["#11B2AA", "#EC6910", "#2D3586", "#0D4B56"];
                return (
                  <div key={comp} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3.5 shadow-sm">
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-black text-white"
                      style={{ backgroundColor: colors[i] }}
                    >
                      {comp[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{comp}</p>
                      <p className="text-xs text-slate-500">Aprender, hacer, convivir y actuar.</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── STRIP IMAGES ─────────────────────────────────────────────────── */}
        <section className="mt-8 grid grid-cols-3 gap-3 overflow-hidden rounded-2xl">
          {stripImages.map((img, i) => (
            <div key={img.src} className={`overflow-hidden rounded-xl transition-transform ${i === 1 ? "-translate-y-2" : ""}`}>
              <picture className="contents">
                <source srcSet={toWebp(img.src)} type="image/webp" />
                <img src={img.src} alt={img.alt} className="h-56 w-full object-cover md:h-64" loading="lazy" decoding="async" />
              </picture>
            </div>
          ))}
        </section>

        {/* ── PERFIL Y COMPETENCIAS CLAVE ───────────────────────────────────── */}
        <section className="mt-10">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0D4B56] text-white">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">Perfil y competencias del gestor</h2>
              <p className="text-sm text-slate-500">Capacidades pedagógicas, tecnológicas y sociales para generar impacto real.</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {competenciasClave.map((comp, i) => {
              const Icon = comp.icon;
              const accents = [
                { bg: "bg-[#11B2AA]/10", icon: "bg-[#11B2AA] text-white", border: "border-[#11B2AA]/20" },
                { bg: "bg-[#EC6910]/10", icon: "bg-[#EC6910] text-white", border: "border-[#EC6910]/20" },
                { bg: "bg-[#2D3586]/10", icon: "bg-[#2D3586] text-white", border: "border-[#2D3586]/20" },
                { bg: "bg-[#0D4B56]/10", icon: "bg-[#0D4B56] text-white", border: "border-[#0D4B56]/20" },
              ];
              const a = accents[i % accents.length];
              return (
                <div key={comp.title} className={`rounded-2xl border ${a.border} ${a.bg} p-5`}>
                  <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${a.icon}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{comp.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{comp.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── FRENTES DE TRABAJO ───────────────────────────────────────────── */}
        <section className="mt-12">
          <div className="mb-6">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2D3586]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#2D3586]">
              Frentes de trabajo
            </span>
            <h2 className="mt-2 text-2xl font-black text-slate-900 md:text-3xl">¿Cómo trabajan los gestores?</h2>
            <p className="mt-1 max-w-xl text-sm text-slate-500">
              Explora los cinco escenarios principales en los que desarrollan su labor transformadora.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
            {/* Tabs sidebar */}
            <div className="flex flex-col gap-1 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm lg:self-start">
              {frentesTrabajo.map((frente) => (
                <FrenteTab
                  key={frente.id}
                  frente={frente}
                  isActive={frenteActivo === frente.id}
                  onClick={() => setFrenteActivo(frente.id)}
                />
              ))}
            </div>

            {/* Content panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={frenteActivo}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
                className="grid gap-4 xl:grid-cols-[1fr_280px]"
              >
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0D4B56] text-white">
                      <IconoFrenteActual className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900">{frenteActual.title}</h3>
                      <p className="text-sm text-slate-500">{frenteActual.summary}</p>
                    </div>
                  </div>

                  <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#0D4B56]">Acciones destacadas</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {frenteActual.acciones.map((accion, i) => (
                      <div key={accion} className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3.5">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#11B2AA] text-[9px] font-black text-white">
                          {i + 1}
                        </span>
                        <span className="text-xs leading-relaxed text-slate-700">{accion}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-[#EC6910]/25 bg-[#EC6910]/5 p-4">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#EC6910]" />
                    <p className="text-sm text-slate-700">
                      <strong className="text-[#EC6910]">Impacto: </strong>
                      {frenteActual.impacto}
                    </p>
                  </div>
                </div>

                <GestoresImageCard
                  image={imagenFrenteActual}
                  className="border-slate-200"
                  imageClassName="h-72 xl:h-full"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ── CIERRE / IMPACTO ─────────────────────────────────────────────── */}
        <section className="mt-12 overflow-hidden rounded-2xl bg-[#0D1F2D]">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 md:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#11B2AA]/20 text-[#11B2AA]">
                <Building2 className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-2xl font-black leading-tight text-white md:text-3xl">
                Transformando la educación<br />
                <span className="text-[#11B2AA]">desde adentro</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                Los Gestores de Innovación conectan la escuela con la tecnología, la innovación y las
                necesidades reales del territorio, generando un impacto que va más allá del aula.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  { label: "Transformación educativa", color: "text-[#FFDE07]", desc: "Cambian la práctica pedagógica desde adentro." },
                  { label: "Tecnología con sentido", color: "text-[#11B2AA]", desc: "Integran herramientas según necesidades reales." },
                  { label: "Trabajo en red", color: "text-[#EC6910]", desc: "Articulan comunidad, instituciones y aliados." },
                  { label: "Proyección territorial", color: "text-[#A78BFA]", desc: "Educación conectada con el futuro del municipio." },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-white/8 bg-white/6 p-4">
                    <p className={`text-sm font-bold ${item.color}`}>{item.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-white/60">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 p-4 lg:p-6">
              {cierreImages.map((img) => (
                <div key={img.src} className="overflow-hidden rounded-xl">
                  <picture className="contents">
                    <source srcSet={toWebp(img.src)} type="image/webp" />
                    <img src={img.src} alt={img.alt} className="h-full w-full object-cover" style={{ minHeight: "200px" }} loading="lazy" decoding="async" />
                  </picture>
                </div>
              ))}
              <div className="col-span-2 overflow-hidden rounded-xl">
                <GestoresImageCard image={bannerImagen} imageClassName="h-48 w-full" />
              </div>
            </div>
          </div>
        </section>

        {/* ── CARRUSEL GESTORES ─────────────────────────────────────────────── */}
        <section id="gestores-innovacion" className="mt-14 scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex flex-col items-start gap-2 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0D4B56]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0D4B56]">
                <Users className="h-3.5 w-3.5" /> Nuestro equipo
              </span>
              <h2 className="mt-2 text-3xl font-black text-slate-900 md:text-4xl">Conoce a los Gestores</h2>
              <p className="mt-1 text-sm text-slate-500 max-w-md">
                Profesionales comprometidos con la innovación educativa en Envigado.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setGestoresCarouselIndex((p) => Math.max(0, p - 1))}
                disabled={gestoresCarouselIndex === 0}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:opacity-30"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setGestoresCarouselIndex((p) => Math.min(gestoresMaxStart, p + 1))}
                disabled={gestoresCarouselIndex >= gestoresMaxStart}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:opacity-30"
                aria-label="Siguiente"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>

          <div className="overflow-hidden">
            <motion.div
              animate={{
                x: `calc(-${gestoresCarouselIndex} * ((100% - ${(directionVisibleCards - 1) * gestoresGapPx}px) / ${directionVisibleCards} + ${gestoresGapPx}px))`,
              }}
              transition={{ type: "spring", stiffness: 90, damping: 20, mass: 0.8 }}
              className="flex"
              style={{ gap: `${gestoresGapPx}px` }}
            >
              {gestoresData.map((gestor) => (
                <div
                  key={gestor.id}
                  style={{
                    flex: `0 0 calc((100% - ${(directionVisibleCards - 1) * gestoresGapPx}px) / ${directionVisibleCards})`,
                  }}
                >
                  <GestorCard gestor={gestor} onSelect={(g) => { setGestorSeleccionado(g); setInstitucionModalIndex(0); }} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dots */}
          <div className="mt-6 flex justify-center gap-1.5">
            {Array.from({ length: gestoresMaxStart + 1 }, (_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setGestoresCarouselIndex(idx)}
                aria-label={`Grupo ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  gestoresCarouselIndex === idx ? "w-8 bg-[#0D4B56]" : "w-1.5 bg-slate-300"
                }`}
              />
            ))}
          </div>
        </section>
      </div>

      {/* ── MODAL INSTITUCIÓN ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {gestorSeleccionado && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
            onClick={() => setGestorSeleccionado(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#11B2AA]">Institución asignada</p>
                  <h3 className="mt-0.5 text-base font-black text-slate-900">{gestorSeleccionado.nombre}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setGestorSeleccionado(null)}
                  className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Cerrar"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-5">
                {institucionesGestorSeleccionado.length > 0 ? (
                  <>
                    <div className="relative overflow-hidden rounded-xl bg-slate-100">
                      {institucionModalImage ? (
                        <img
                          src={institucionModalImage}
                          alt={institucionModalActual}
                          className="h-56 w-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className="flex h-56 items-center justify-center text-sm text-slate-400">
                          Sin foto disponible
                        </div>
                      )}
                      {institucionesGestorSeleccionado.length > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={() => setInstitucionModalIndex((p) => (p - 1 + institucionesGestorSeleccionado.length) % institucionesGestorSeleccionado.length)}
                            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white backdrop-blur-sm transition hover:bg-black/70"
                            aria-label="Anterior institución"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setInstitucionModalIndex((p) => (p + 1) % institucionesGestorSeleccionado.length)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white backdrop-blur-sm transition hover:bg-black/70"
                            aria-label="Siguiente institución"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                    <p className="mt-3 text-sm font-semibold text-slate-800">{institucionModalActual}</p>
                    {institucionesGestorSeleccionado.length > 1 && (
                      <div className="mt-2 flex justify-center gap-1.5">
                        {institucionesGestorSeleccionado.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setInstitucionModalIndex(idx)}
                            className={`h-1.5 rounded-full transition-all ${idx === institucionModalIndex ? "w-6 bg-[#0D4B56]" : "w-1.5 bg-slate-300"}`}
                            aria-label={`Institución ${idx + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-slate-500">Institución por confirmar.</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
