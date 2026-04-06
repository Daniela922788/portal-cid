import { Link } from "wouter";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Palette, Leaf, ArrowRight, Sparkles, Calendar, MapPin, Users, ChevronLeft, ChevronRight, Building2, GraduationCap, Handshake, MapPinned, Rocket, School, Waypoints } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import lineasTematicasImg from "@/assets/Líneas Temáticas.png";
import serviciosImg from "@/assets/Servicios.png";
import comunidadImpactadaImg from "@/assets/Comunidad impactada.png";
import equipoCIDImg from "@/assets/Equipo CID.jpg";
import centroCienciaImg from "@/assets/Centro-de-Ciencia.jfif";
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
import AlexImg from "@/assets/Alex.webp";
import AngelaImg from "@/assets/Angela.webp";
import CamiloImg from "@/assets/Camilo.webp";
import CaroImg from "@/assets/Caro.webp";
import DanielaImg from "@/assets/Daniela.webp";
import DubielImg from "@/assets/Dubiel.webp";
import HernanImg from "@/assets/Hernan.webp";
import JairoImg from "@/assets/Jairo.webp";
import JhonImg from "@/assets/Jhon.webp";
import JohnImg from "@/assets/John.webp";
import JorgeImg from "@/assets/Jorge.webp";
import YethyImg from "@/assets/Yethy.webp";
import { TimelineSection } from "@/components/TimelineSection";
import ServicesSection from "@/components/ServicesSection";
import { ThematicLines } from "@/components/ThematicLines";
import CommunityImpactSectionV1 from "@/components/CommunityImpactV1-codigo";
import CommunityImpactV2 from "@/components/CommunityImpactV2-codigo";


interface TimelineEvent {
  id: number;
  year: number;
  title: string;
  description: string;
  category?: string;
  location?: string;
  participants?: number;
  imageUrl?: string;
}

interface Gestor {
  id: number;
  nombre: string;
  profesion: string;
  tipo: "STEM" | "Pedagógica" | "Administrativo" | "Investigación";
  foto: string;
}

const toWebp = (src: string) => (typeof src === "string" ? src.replace(/\.(jpe?g|png)$/i, ".webp") : src);

export default function Nosotros() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [directionCarouselIndex, setDirectionCarouselIndex] = useState(0);
  const [directionVisibleCards, setDirectionVisibleCards] = useState(4);
  const [gestoresCarouselIndex, setGestoresCarouselIndex] = useState(0);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [timelineMobileIndex, setTimelineMobileIndex] = useState(0);

  const quickSections = [
    { id: "lo-que-hacemos", title: "Lo que Hacemos y Cómo Impactamos" },
    { id: "centro-ciencia-men", title: "Centro de Ciencia - MEN" },
    { id: "historia-detalle", title: "Nuestra Historia en Detalle" },
    { id: "direccion-innovacion", title: "Dirección de Innovación" },
    { id: "gestores-innovacion", title: "Gestores de Innovación - Dirección de Innovación" },
    { id: "horizonte-estrategico", title: "Horizonte Estratégico" },
    { id: "comunidad-impactada", title: "Comunidad Impactada en el Centro de Ciencia" },
    { id: "mundo-ve", title: "Lo que el Mundo Ve en Nosotros" },
    { id: "lineas-tematicas", title: "Líneas Temáticas" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  
  const timelineEvents: TimelineEvent[] = [
    { 
      id: 1, 
      year: 2012, 
      title: "Alianza Innovatic Cier Occidente", 
      description: "Inicio de la alianza estratégica Innovatic para fortalecer la innovación en la región occidental", 
      category: "Fundación",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663221068197/pLEPvleZOyJMEzts.jpg"
    },
    { 
      id: 2, 
      year: 2014, 
      title: "Creación de los 5 Cier", 
      description: "Establecimiento de los cinco Centros de Innovación Educativa Regional", 
      category: "Expansión",
      imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop"
    },
    { 
      id: 3, 
      year: 2016, 
      title: "Firma de convenio con el MEN", 
      description: "Acuerdo con el Ministerio de Educación Nacional para fortalecer la educación innovadora", 
      category: "Alianza",
      imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop"
    },
    { 
      id: 4, 
      year: 2017, 
      title: "Creación Dirección de Innovación Educativa", 
      description: "Se establece la Dirección de Innovación Educativa para coordinar iniciativas pedagógicas", 
      category: "Institucional",
      imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop"
    },
    { 
      id: 5, 
      year: 2017, 
      title: "Envigado acoge el CID", 
      description: "El municipio de Envigado se convierte en sede del Centro de Innovación y Desarrollo", 
      category: "Institucional",
      imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop"
    },
    { 
      id: 6, 
      year: 2017, 
      title: "Convenio IUE", 
      description: "Alianza con la Institución Universitaria de Envigado para fortalecer la investigación y desarrollo", 
      category: "Institucional",
      imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop"
    },
    { 
      id: 7, 
      year: 2023, 
      title: "Finaliza convenio MEN", 
      description: "Culminación del convenio con el Ministerio de Educación Nacional", 
      category: "Transición",
      imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop"
    },
    { 
      id: 8, 
      year: 2023, 
      title: "Finaliza convenio IUE", 
      description: "Culminación del convenio con la Institución Universitaria de Envigado", 
      category: "Transición",
      imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop"
    },
    { 
      id: 9, 
      year: 2024, 
      title: "Postulación como centro de ciencia", 
      description: "El CID se postula oficialmente como Centro de Ciencia ante el Ministerio de Ciencia, Tecnología e Innovación", 
      category: "Logro",
      imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop"
    },
    { 
      id: 10, 
      year: 2025, 
      title: "Visita de pares del ministerio de ciencia tecnología e innovación", 
      description: "Visita de pares evaluadores del Ministerio de Ciencia, Tecnología e Innovación", 
      category: "Evaluación",
      imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
    },
    { 
      id: 11, 
      year: 2025, 
      title: "A la espera de respuesta", 
      description: "En proceso de espera de la respuesta oficial sobre la certificación como Centro de Ciencia", 
      category: "Evaluación",
      imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
    },
    { 
      id: 12, 
      year: 2026, 
      title: "En proceso", 
      description: "Continuamos trabajando en la consolidación del CID como Centro de Ciencia reconocido", 
      category: "Actualidad",
      imageUrl: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=400&fit=crop"
    },
  ];

  const gestoresData: Gestor[] = [
    {
      id: 1,
      nombre: "Alejandra Mora",
      profesion: "Bióloga con Maestría en Conservación y uso de la Biodiversidad",
      tipo: "Investigación",
      foto: AlejandraImg
    },
    {
      id: 2,
      nombre: "Isabel Vega",
      profesion: "Ingeniera Física, Magister en Ingeniería",
      tipo: "STEM",
      foto: IsabelImg
    },
    {
      id: 3,
      nombre: "Julián Parra",
      profesion: "Ingeniero de Petróleos",
      tipo: "STEM",
      foto: JulianImg
    },
    {
      id: 4,
      nombre: "Karen Palacio",
      profesion: "Licenciada Básica con énfasis en Ciencias Sociales",
      tipo: "Investigación",
      foto: KarenImg
    },
    {
      id: 5,
      nombre: "Mauricio Valencia",
      profesion: "Licenciado en Educación Básica con énfasis en Matemáticas",
      tipo: "STEM",
      foto: MauricioImg
    },
    {
      id: 6,
      nombre: "Mónica Quiceno",
      profesion: "Licenciada en Ed. Básica con énfasis en Ciencias Naturales y Educación Ambiental",
      tipo: "STEM",
      foto: MonicaImg
    },
    {
      id: 7,
      nombre: "Nicolás Bernal",
      profesion: "Ecólogo y Magister en Turismo Sostenible",
      tipo: "STEM",
      foto: NicolasImg
    },
    {
      id: 8,
      nombre: "Santiago Sierra",
      profesion: "Astronomo",
      tipo: "STEM",
      foto: SantiagoImg
    },
    {
      id: 9,
      nombre: "Tania Carmona",
      profesion: "Licenciada en Artes Plásticas",
      tipo: "STEM",
      foto: TaniaImg
    },
    {
      id: 10,
      nombre: "Víctor Tobón",
      profesion: "Ciencias Política Politólogo",
      tipo: "STEM",
      foto: VictorImg
    },
    {
      id: 11,
      nombre: "William Pomares",
      profesion: "Ingeniero Electrónico Especialista en Educación",
      tipo: "STEM",
      foto: WilmarImg
    },
    {
      id: 12,
      nombre: "Angela María Mejía Celis",
      profesion: "Licenciada en Humanidades y Lengua Castellana",
      tipo: "STEM",
      foto: "/gestores/Angela%202.png"
    },
    {
      id: 13,
      nombre: "Erika Atehortúa Argaez",
      profesion: "Sociología, Magíster en Innovación y Educación",
      tipo: "STEM",
      foto: "/gestores/Erika.png"
    },
    {
      id: 14,
      nombre: "Mateo Vásquez Correa",
      profesion: "Ingeniero de Sistemas",
      tipo: "STEM",
      foto: "/gestores/Mateo.png"
    },
    {
      id: 15,
      nombre: "Ronald Eduardo Gaitán Gelvez",
      profesion: "Ing. Mecatrónico, Ing. Eléctrico, Esp.Telecomunicaciones",
      tipo: "STEM",
      foto: "/gestores/Ronald.png"
    },
  ];

  const equipoImagenes = [
    { id: 5, nombre: "Daniela Jaramillo Hoyos", cargo: "Directora de Innovación", foto: DanielaImg },
    { id: 1, nombre: "Alexander Heredia Heredia", cargo: "Profesional Universitario", foto: AlexImg },
    { id: 12, nombre: "Yethy Gisela Granda Zapata", cargo: "Coordinadora Gestores Innovación - UPB", foto: YethyImg },
    { id: 2, nombre: "Angela María González Valencia", cargo: "Asistente Administrativa - UPB", foto: AngelaImg },
    { id: 4, nombre: "Carolina Tabres Isaza", cargo: "Técnico Operativo", foto: CaroImg },
    { id: 9, nombre: "Jhon Fredy Ríos Montoya", cargo: "Profesional Universitario", foto: JhonImg },
    { id: 3, nombre: "Juan Camilo Álvarez Bedoya", cargo: "Contratista", foto: CamiloImg },
    { id: 6, nombre: "Dubiel Enrique Restrepo Marulanda", cargo: "Contratista", foto: DubielImg },
    { id: 8, nombre: "Jairo Alberto Muñoz Díaz", cargo: "Contratista", foto: JairoImg },
    { id: 13, nombre: "Daniela Serna Gallego", cargo: "Programadora - UPB", foto: "/gestores/Daniela%20SG.png" },
    { id: 10, nombre: "John Fredis Carmona Calderin", cargo: "Técnico Audiovisual - UPB", foto: JohnImg },
    { id: 11, nombre: "Jorge Guzmán Ruiz", cargo: "Técnico Audiovisual - UPB", foto: JorgeImg },
    { id: 7, nombre: "Hernán Alberto Maury Andrade", cargo: "Soporte Técnico de Tigo", foto: HernanImg },
  ];

  const eventsByYear = new Map<number, TimelineEvent[]>();
  timelineEvents.forEach((event) => {
    if (!eventsByYear.has(event.year)) {
      eventsByYear.set(event.year, []);
    }
    eventsByYear.get(event.year)!.push(event);
  });
  
  const sortedYears = Array.from(eventsByYear.keys()).sort((a, b) => b - a);
  
  const logrosData = [
    "Primer lugar del equipo de la Institución Educativa Normal Superior de Envigado en el concurso Robojam. (2024 y 2025)",
    "Segundo lugar del equipo de la Institución Educativa Las Palmas en el Robojam. (2024)",
    "Tercer lugar del equipo de la Institución Educativa Darío de Bedout en Robojam. (2025)",
    "IE Normal Superior de Envigado, ganadora del concurso Retos EIA con el proyecto Barco de Palas. (2024)",
    "IE Manuel Uribe Ángel, sede Marceliano Vélez, ganadora del concurso Enviaseo. (2024)",
    "Campeonato internacional de cohetería deportiva obtenido por el equipo de la IE Manuel Uribe Ángel. (2024)",
    "Séptimo puesto a nivel internacional en cohetería deportiva para el equipo de la IE Normal Superior de Envigado. (2024)",
    "Participación internacional de estudiantes en las Olimpiadas Latinoamericanas de Ciencia y Tecnología en Tlaxcala, México. (2024)",
  ];

  const trabajoBloquesGestores = [
    {
      title: "Acompañamiento a instituciones educativas",
      description: "Apoyan la implementación de estrategias STEM+ y procesos de innovación en contextos reales.",
      icon: School,
    },
    {
      title: "Fortalecimiento de capacidades",
      description: "Orientan a docentes y estudiantes en metodologías, herramientas y pensamiento innovador.",
      icon: GraduationCap,
    },
    {
      title: "Gestión de proyectos",
      description: "Promueven, estructuran y hacen seguimiento a iniciativas de ciencia, tecnología e innovación.",
      icon: Rocket,
    },
    {
      title: "Articulación del ecosistema",
      description: "Conectan actores del sector público, privado, académico y comunitario.",
      icon: Waypoints,
    },
    {
      title: "Dinamización del territorio",
      description: "Llevan la innovación a aulas, bibliotecas, parques culturales y espacios comunitarios.",
      icon: MapPinned,
    },
  ];

  const centrosInteresInstitucionesGestores = [
    "/InstituciónEducativaComercialdeEnvigado.jpg",
    "/InstituciónEducativaElSalado.jpg",
    "/InstituciónEducativaLaPaz.jpg",
    "/InstituciónEducativaNormalSuperiordeEnvigado.jpg",
    "/InstituciónEducativaDaríodeBedout.jpg",
    "/InstituciónEducativaManuelUribeÁngel.JPG",
  ];

  const cursosTerritorioGestores = [
    "/STEM/1.webp",
    "/STEM/2.webp",
    "/STEM/3.webp",
    "/STEM/4.webp",
    "/ciudadaprendizaje/1.webp",
    "/ciudadaprendizaje/2.webp",
  ];

  useEffect(() => {
    const updateVisibleCards = () => {
      setIsMobileViewport(window.innerWidth < 768);

      if (window.innerWidth >= 1280) {
        setDirectionVisibleCards(4);
        return;
      }

      if (window.innerWidth >= 1024) {
        setDirectionVisibleCards(3);
        return;
      }

      if (window.innerWidth >= 768) {
        setDirectionVisibleCards(2);
        return;
      }

      setDirectionVisibleCards(2);
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const directionTotal = equipoImagenes.length;
  const directionGapPx = directionVisibleCards === 2 ? 12 : 32;
  const directionMaxStart = Math.max(0, directionTotal - directionVisibleCards);

  const goDirectionPrev = () => {
    setDirectionCarouselIndex((prev) => Math.max(0, prev - 1));
  };

  const goDirectionNext = () => {
    setDirectionCarouselIndex((prev) => Math.min(directionMaxStart, prev + 1));
  };

  const gestoresTotal = gestoresData.length;
  const gestoresGapPx = isMobileViewport ? 12 : 32;
  const gestoresMaxStart = Math.max(0, gestoresTotal - directionVisibleCards);
  const timelineMobileMaxIndex = Math.max(0, sortedYears.length - 1);

  const goGestoresPrev = () => {
    setGestoresCarouselIndex((prev) => Math.max(0, prev - 1));
  };

  const goGestoresNext = () => {
    setGestoresCarouselIndex((prev) => Math.min(gestoresMaxStart, prev + 1));
  };

  const goTimelineMobilePrev = () => {
    setTimelineMobileIndex((prev) => Math.max(0, prev - 1));
  };

  const goTimelineMobileNext = () => {
    setTimelineMobileIndex((prev) => Math.min(timelineMobileMaxIndex, prev + 1));
  };

  useEffect(() => {
    setDirectionCarouselIndex((prev) => Math.min(prev, directionMaxStart));
  }, [directionMaxStart]);

  useEffect(() => {
    setGestoresCarouselIndex((prev) => Math.min(prev, gestoresMaxStart));
  }, [gestoresMaxStart]);

  useEffect(() => {
    setTimelineMobileIndex((prev) => Math.min(prev, timelineMobileMaxIndex));
  }, [timelineMobileMaxIndex]);

  useEffect(() => {
    const priorityGestores = [
      "/gestores/Angela%202.png",
      "/gestores/Erika.png",
      "/gestores/Mateo.png",
      "/gestores/Ronald.png",
    ];

    const preloadLinks = priorityGestores.map((href) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = href;
      document.head.appendChild(link);
      return link;
    });

    return () => {
      preloadLinks.forEach((link) => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      });
    };
  }, []);

  useEffect(() => {
    const scriptId = "genially-embed-js";

    if (document.getElementById(scriptId)) {
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.src = "https://view.genially.com/static/embed/embed.js";
    document.body.appendChild(script);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Banner Principal Nosotros */}
      <section className="relative w-full overflow-hidden md:h-screen">
        <img
          src="/Nosotros/Banner%20principal.png"
          alt="Banner principal Nosotros"
          loading="eager"
          fetchPriority="high"
          decoding="sync"
          className="w-full h-auto object-contain md:h-full md:object-cover md:object-center"
        />
      </section>

      {/* Nuestro ADN */}
      <section className="pt-10 pb-2 bg-white">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center text-[#2D3586]">Nuestro ADN</h2>
          
          {/* Dirección de Innovación */}
          <div className="mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-[#0D4B56]">Dirección de Innovación</h3>
            <p className="text-base sm:text-lg text-gray-700 mb-6">
              La Dirección de Innovación es una dependencia estratégica de la Secretaría de Educación de Envigado, cuyo propósito principal es liderar, coordinar y promover el desarrollo científico, tecnológico y de innovación como motores del progreso social, económico, educativo y cultural.
            </p>
            <p className="text-base sm:text-lg text-gray-700">
              Esta dirección actúa como puente entre la comunidad, el conocimiento científico y las soluciones innovadoras a problemáticas reales del entorno.
            </p>
          </div>

          {/* Foto del Equipo */}
          <img 
            src={equipoCIDImg}
            alt="Equipo CID"
            loading="lazy"
            decoding="async"
            className="rounded-2xl shadow-2xl w-full h-auto object-cover mb-16"
          />

          {/* Nuestro Equipo */}
          <div className="mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-teal-600">Nuestro Equipo</h3>
            <p className="text-base sm:text-lg text-gray-700 mb-12 text-center">
              Contamos con un equipo multidisciplinario que hace posible el diseño, la ejecución y el acompañamiento de nuestras iniciativas
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
              <Card className="border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
                <CardHeader className="space-y-1.5 p-3 sm:space-y-3 sm:p-6">
                  <div className="h-1.5 w-10 rounded-full bg-blue-500 sm:w-14" />
                  <CardTitle className="text-sm leading-tight text-slate-900 sm:text-xl">Equipo Administrativo</CardTitle>
                  <p className="text-xs font-medium text-slate-500 sm:text-sm">7 personas</p>
                </CardHeader>
                <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
                  <p className="text-xs leading-snug text-slate-700 sm:text-base">Lidera los procesos estratégicos que dan vida a los proyectos.</p>
                </CardContent>
              </Card>

              <Card className="border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
                <CardHeader className="space-y-1.5 p-3 sm:space-y-3 sm:p-6">
                  <div className="h-1.5 w-10 rounded-full bg-teal-500 sm:w-14" />
                  <CardTitle className="text-sm leading-tight text-slate-900 sm:text-xl">Gestores de Innovación e Investigación</CardTitle>
                  <p className="text-xs font-medium text-slate-500 sm:text-sm">16 personas</p>
                </CardHeader>
                <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
                  <p className="text-xs leading-snug text-slate-700 sm:text-base">Acompaña procesos pedagógicos innovadores y de investigación que fortalecen la transformación educativa.</p>
                </CardContent>
              </Card>

              <Card className="border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
                <CardHeader className="space-y-1.5 p-3 sm:space-y-3 sm:p-6">
                  <div className="h-1.5 w-10 rounded-full bg-cyan-500 sm:w-14" />
                  <CardTitle className="text-sm leading-tight text-slate-900 sm:text-xl">Equipo de Tecnología</CardTitle>
                  <p className="text-xs font-medium text-slate-500 sm:text-sm">5 personas</p>
                </CardHeader>
                <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
                  <p className="text-xs leading-snug text-slate-700 sm:text-base">Implementa soluciones digitales para nuestras iniciativas educativas.</p>
                </CardContent>
              </Card>

              <Card className="border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
                <CardHeader className="space-y-1.5 p-3 sm:space-y-3 sm:p-6">
                  <div className="h-1.5 w-10 rounded-full bg-emerald-500 sm:w-14" />
                  <CardTitle className="text-sm leading-tight text-slate-900 sm:text-xl">Técnicos Audiovisuales</CardTitle>
                  <p className="text-xs font-medium text-slate-500 sm:text-sm">2 personas</p>
                </CardHeader>
                <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
                  <p className="text-xs leading-snug text-slate-700 sm:text-base">Generan experiencias mediante narrativas visuales de alto impacto.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#023A34] py-10 md:py-14">
        <div className="container">
          <h2 className="mb-8 text-center text-4xl font-bold text-white md:mb-10 md:text-6xl">
            Somos el CID
          </h2>
          <div className="mx-auto max-w-8xl overflow-hidden rounded-2xl shadow-2xl">
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src="https://www.youtube.com/embed/R6ffTBIieCw?autoplay=1&mute=1&loop=1&playlist=R6ffTBIieCw&playsinline=1"
                title="Somos el CID - Video"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Centro de Ciencia - MEN */}
      <section id="centro-ciencia-men" className="pt-10 pb-2 bg-gradient-to-br from-blue-50 to-teal-50 scroll-mt-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <img 
              src={centroCienciaImg}
              alt="Centro de Ciencia"
              loading="lazy"
              decoding="async"
              className="rounded-2xl shadow-2xl w-full h-auto object-cover"
            />
            <div>
              <h2 className="text-2xl sm:text-4xl font-bold mb-6 whitespace-nowrap sm:whitespace-normal">Centro de Ciencia - MEN</h2>
              <p className="text-base sm:text-lg text-gray-700 mb-6">Los Centros de Ciencia, se definen como instituciones de carácter público, privado o mixto, sin ánimo de lucro, con personería jurídica o dependientes de otra organización, con una planta física abierta al público de manera permanente y que tienen la apropiación social del conocimiento como parte integral de su misión u objeto social.</p>
              <p className="text-base sm:text-lg text-gray-700">Asimismo, reconocen la diversidad cultural, económica y social de las comunidades, promueven los principios de acceso democrático a la información y al conocimiento, y contribuyen a fortalecer la cultura de ciencia y tecnología en el país mediante programas y actividades educativas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Línea del Tiempo */}
      <section className="pt-4 sm:pt-10 pb-2 bg-white">
        <div className="container">
          
          {/* Línea de Tiempo Interactiva */}
          <div className="mt-8 sm:mt-16 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-teal-100 border border-blue-300 rounded-full px-4 py-2 mb-4">
                <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
                <span className="text-blue-700 text-sm font-semibold">Línea de Tiempo Interactiva</span>
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-teal-600 to-green-600 bg-clip-text text-transparent">
                Nuestra Historia en Detalle
              </h3>
            </motion.div>

            {/* Timeline carrusel móvil */}
            <div className="relative left-1/2 w-screen -translate-x-1/2 px-3 md:hidden">
              <div className="relative">
                <div className="pointer-events-none absolute left-3 right-3 top-[18px] h-1 rounded-full bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 opacity-35" />

                <div className="relative z-10 mb-3 flex items-center justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={goTimelineMobilePrev}
                    disabled={timelineMobileIndex === 0}
                    aria-label="Año anterior"
                    className="h-8 w-8 rounded-full"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <span className="text-xs font-semibold text-slate-600">
                    {timelineMobileIndex + 1} / {sortedYears.length}
                  </span>

                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={goTimelineMobileNext}
                    disabled={timelineMobileIndex === timelineMobileMaxIndex}
                    aria-label="Año siguiente"
                    className="h-8 w-8 rounded-full"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                {sortedYears.length > 0 && (
                  <motion.div
                    key={sortedYears[timelineMobileIndex]}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                    className="w-full"
                  >
                    <div className="relative z-10 mb-3 flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-4 border-white bg-gradient-to-r from-blue-500 to-teal-500 shadow" />
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 px-3 py-1.5 text-white shadow-lg">
                        <Calendar className="h-3.5 w-3.5" />
                        <span className="text-sm font-bold">{sortedYears[timelineMobileIndex]}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {(eventsByYear.get(sortedYears[timelineMobileIndex]) || []).map((event) => (
                        <motion.div
                          key={event.id}
                          whileHover={{ scale: 1.01, y: -2 }}
                          onClick={() => setSelectedEvent(event)}
                          className="cursor-pointer rounded-lg border border-blue-200 bg-gradient-to-br from-blue-50 to-teal-50 p-3 shadow-sm transition-all hover:border-blue-400 hover:shadow-md"
                        >
                          <h4 className="mb-1 text-sm font-bold text-blue-900">{event.title}</h4>
                          <p className="mb-2 text-xs leading-relaxed text-gray-700">{event.description}</p>
                          {event.category && (
                            <span className="inline-block rounded-full bg-blue-600 px-2 py-0.5 text-[10px] text-white">
                              {event.category}
                            </span>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Timeline desktop */}
            <div className="relative left-1/2 hidden w-screen -translate-x-1/2 px-3 md:block md:px-6 lg:px-8">
              <div className="relative">
                <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 opacity-35" />

                <div className="grid grid-cols-4 gap-4 lg:grid-cols-8 lg:gap-3">
                  {sortedYears.map((year, yearIndex) => {
                    const yearEvents = eventsByYear.get(year) || [];
                    const showTopCards = yearIndex % 2 === 0;

                    return (
                      <motion.div
                        key={year}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.45, delay: yearIndex * 0.04 }}
                        className="grid min-h-[190px] grid-rows-[1fr_auto_1fr]"
                      >
                        <div className="flex h-full flex-col justify-end space-y-3 pb-3">
                          {showTopCards &&
                            yearEvents.map((event) => (
                              <motion.div
                                key={event.id}
                                whileHover={{ scale: 1.02, y: -3 }}
                                onClick={() => setSelectedEvent(event)}
                                className="cursor-pointer rounded-lg border border-blue-200 bg-gradient-to-br from-blue-50 to-teal-50 p-3 shadow-sm transition-all hover:border-blue-400 hover:shadow-md"
                              >
                                <h4 className="mb-1 text-sm font-bold text-blue-900">{event.title}</h4>
                                <p className="mb-2 text-xs leading-relaxed text-gray-700">{event.description}</p>
                                {event.category && (
                                  <span className="inline-block rounded-full bg-blue-600 px-2 py-0.5 text-[10px] text-white">
                                    {event.category}
                                  </span>
                                )}
                              </motion.div>
                            ))}
                        </div>

                        <div className="relative z-10 flex flex-col items-center py-3">
                          <div className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 px-4 py-2 text-white shadow-lg">
                            <Calendar className="h-3.5 w-3.5" />
                            <span className="text-base font-bold">{year}</span>
                          </div>
                          <div className="mt-2 h-4 w-4 rounded-full border-4 border-white bg-gradient-to-r from-blue-500 to-teal-500 shadow" />
                        </div>

                        <div className="space-y-3 pt-2">
                          {!showTopCards &&
                            yearEvents.map((event) => (
                              <motion.div
                                key={event.id}
                                whileHover={{ scale: 1.02, y: -3 }}
                                onClick={() => setSelectedEvent(event)}
                                className="cursor-pointer rounded-lg border border-blue-200 bg-gradient-to-br from-blue-50 to-teal-50 p-3 shadow-sm transition-all hover:border-blue-400 hover:shadow-md"
                              >
                                <h4 className="mb-1 text-sm font-bold text-blue-900">{event.title}</h4>
                                <p className="mb-2 text-xs leading-relaxed text-gray-700">{event.description}</p>
                                {event.category && (
                                  <span className="inline-block rounded-full bg-blue-600 px-2 py-0.5 text-[10px] text-white">
                                    {event.category}
                                  </span>
                                )}
                              </motion.div>
                            ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer Message */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="-mt-10 border-t border-gray-200 text-center"
            >
              <p className="text-gray-600 text-lg font-semibold mb-4">
                Continuamos innovando y creciendo cada día
              </p>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex justify-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                <div className="w-2 h-2 rounded-full bg-teal-400" />
                <div className="w-2 h-2 rounded-full bg-green-400" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nuevo Grid de Imágenes */}
      <section id="direccion-innovacion" className="pt-2 sm:pt-4 pb-2 bg-gradient-to-br from-gray-50 to-gray-100 scroll-mt-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-teal-100 border border-blue-300 rounded-full px-4 py-2 mb-4">
              <Users className="w-4 h-4 text-blue-600" />
              <span className="text-blue-700 text-sm font-semibold">Nuestro Equipo</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Dirección de Innovación
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Conoce a los profesionales que conforman el equipo de Innovación 
            </p>
          </motion.div>

          <div className="relative">
            <button
              type="button"
              onClick={goDirectionPrev}
              aria-label="Anterior en Dirección de Innovación"
              disabled={directionCarouselIndex === 0}
              className="absolute left-0 top-1/2 z-10 -translate-x-3 -translate-y-1/2 rounded-full border border-slate-300 bg-white/95 p-2 text-slate-700 shadow-md hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={goDirectionNext}
              aria-label="Siguiente en Dirección de Innovación"
              disabled={directionCarouselIndex >= directionMaxStart}
              className="absolute right-0 top-1/2 z-10 translate-x-3 -translate-y-1/2 rounded-full border border-slate-300 bg-white/95 p-2 text-slate-700 shadow-md hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="overflow-hidden px-6">
              <motion.div
                animate={{
                  x: `calc(-${directionCarouselIndex} * ((100% - ${(directionVisibleCards - 1) * directionGapPx}px) / ${directionVisibleCards} + ${directionGapPx}px))`,
                }}
                transition={{ type: "spring", stiffness: 90, damping: 20, mass: 0.8 }}
                className="flex"
                style={{ gap: `${directionGapPx}px` }}
              >
                {equipoImagenes.map((persona) => (
                  <div
                    key={persona.id}
                    className="group relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-white to-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.15)] transition-all duration-300"
                    style={{
                      flex: `0 0 calc((100% - ${(directionVisibleCards - 1) * directionGapPx}px) / ${directionVisibleCards})`,
                    }}
                  >
                    <div className="relative overflow-hidden shadow-[inset_0_2px_4px_rgba(255,255,255,0.6)] bg-gray-50 flex items-center justify-center">
                      <picture className="contents">
                        <source srcSet={toWebp(persona.foto)} type="image/webp" />
                        <img
                          src={persona.foto}
                          alt={persona.nombre}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300 py-3 sm:py-6"
                        />
                      </picture>
                    </div>

                    <div className="px-4 py-4 text-center sm:px-6 sm:py-6">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900">{persona.nombre}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">{persona.cargo}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="mt-8 flex justify-center gap-2">
              {Array.from({ length: directionMaxStart + 1 }, (_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setDirectionCarouselIndex(idx)}
                  aria-label={`Ir al bloque ${idx + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    directionCarouselIndex === idx ? "w-8 bg-slate-800" : "w-2 bg-slate-400"
                  }`}
                />
              ))}
            </div>
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
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-teal-100 border border-blue-300 rounded-full px-4 py-2 mb-4">
              <Users className="w-4 h-4 text-blue-600" />
              <span className="text-blue-700 text-sm font-semibold">Nuestro Equipo</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Gestores de Innovación - Dirección de Innovación
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Conoce a los docentes y profesionales que lideran la innovación educativa en nuestras instituciones
            </p>
          </motion.div>

          {/* Imagen del equipo de gestores */}
          <div className="mb-16 overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/Fotogestores.jpg"
              alt="Equipo de gestores de innovación"
              loading="lazy"
              decoding="async"
              className="h-auto w-full object-cover"
            />
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
                    <div className="relative overflow-hidden shadow-[inset_0_2px_4px_rgba(255,255,255,0.6)] bg-gray-50 flex items-center justify-center">
                      <picture className="contents">
                        <source srcSet={toWebp(gestor.foto)} type="image/webp" />
                        <img
                          src={gestor.foto}
                          alt={gestor.nombre}
                          loading={index < 8 || gestor.foto.startsWith("/gestores/") ? "eager" : "lazy"}
                          fetchPriority={index < 8 || gestor.foto.startsWith("/gestores/") ? "high" : "auto"}
                          decoding={index < 8 || gestor.foto.startsWith("/gestores/") ? "sync" : "async"}
                          className="h-[170px] w-full object-cover object-top transition-transform duration-300 group-hover:scale-105 sm:h-auto sm:object-contain sm:py-6"
                        />
                      </picture>
                    </div>

                    <div className="px-3 py-3 text-center sm:px-6 sm:py-6">
                      <h3 className="mb-1 text-base font-bold leading-tight text-gray-900 sm:text-lg">{gestor.nombre}</h3>
                      <p className="mb-2 line-clamp-4 text-xs leading-snug text-gray-600 sm:mb-3 sm:line-clamp-none sm:text-sm">{gestor.profesion}</p>
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

      <div style={{ width: "100%" }}>
        <div
          style={{
            position: "relative",
            paddingBottom: "56.25%",
            paddingTop: 0,
            height: 0,
          }}
        >
          <iframe
            title="Horizonte Estratégico"
            frameBorder={0}
            width="1200"
            height="675"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            src="https://view.genially.com/69bc5e2ee9f2206b8c7e204d"
            allowFullScreen
            scrolling="yes"
          />
        </div>
      </div>
    </div>
  );
}
