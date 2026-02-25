import { Link } from "wouter";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Palette, Leaf, ArrowRight, Sparkles, Calendar, MapPin, Users } from "lucide-react";
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

export default function Nosotros() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  
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
  ];

  const equipoImagenes = [
    { id: 5, nombre: "Daniela", foto: DanielaImg },
    { id: 1, nombre: "Alex", foto: AlexImg },
    { id: 12, nombre: "Yethy", foto: YethyImg },
    { id: 2, nombre: "Angela", foto: AngelaImg },
    { id: 4, nombre: "Caro", foto: CaroImg },
    { id: 9, nombre: "Jhon", foto: JhonImg },
    { id: 3, nombre: "Camilo", foto: CamiloImg },
    { id: 6, nombre: "Dubiel", foto: DubielImg },
    { id: 7, nombre: "Hernan", foto: HernanImg },
    { id: 8, nombre: "Jairo", foto: JairoImg },
    { id: 10, nombre: "John", foto: JohnImg },
    { id: 11, nombre: "Jorge", foto: JorgeImg },
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

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section
        style={{ opacity, scale }}
        className="relative -mt-4 md:-mt-6 h-[46vh] md:h-[56vh] flex items-center justify-center z-10 bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-10 left-10 w-32 h-32 bg-yellow-200 rounded-full blur-3xl"
          />
        </div>

        <div className="text-center px-4 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg"
          >
            Nosotros
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white max-w-2xl mx-auto drop-shadow-md"
          >
            Conoce la historia, misión y visión del Centro de Innovación y Desarrollo (CID)
          </motion.p>
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-10 text-white text-4xl font-bold drop-shadow-lg"
          >
            ↓
          </motion.div>
        </div>
      </motion.section>

      {/* Nuestro ADN */}
      <section className="pt-10 pb-2 bg-white">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center">Nuestro ADN</h2>
          
          {/* Dirección de Innovación */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-6 text-blue-600">La Dirección de Innovación</h3>
            <p className="text-lg text-gray-700 mb-6">
              La Dirección de Innovación es una dependencia estratégica de la Secretaría de Educación de Envigado, cuyo propósito principal es liderar, coordinar y promover el desarrollo científico, tecnológico y de innovación como motores del progreso social, económico, educativo y cultural.
            </p>
            <p className="text-lg text-gray-700">
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
            <h3 className="text-3xl font-bold mb-8 text-center text-teal-600">Nuestro Equipo</h3>
            <p className="text-lg text-gray-700 mb-12 text-center">
              Contamos con un equipo multidisciplinario que hace posible el diseño, la ejecución y el acompañamiento de nuestras iniciativas
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-0 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-600">Equipo Administrativo</CardTitle>
                  <p className="text-sm text-gray-600 mt-2">(7 personas)</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">Lidera los procesos estratégicos que dan vida a los proyectos.</p>
                </CardContent>
              </Card>
              <Card className="border-0 bg-gradient-to-br from-teal-50 to-green-50 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-teal-600">Gestores de Innovación e Investigación</CardTitle>
                  <p className="text-sm text-gray-600 mt-2">(14 personas)</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">Acompaña procesos pedagógicos innovadores y de investigación que fortalecen la transformación educativa.</p>
                </CardContent>
              </Card>
              <Card className="border-0 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-purple-600">Equipo de Tecnología</CardTitle>
                  <p className="text-sm text-gray-600 mt-2">(5 personas)</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">Implementa soluciones digitales para nuestras iniciativas educativas.</p>
                </CardContent>
              </Card>
              <Card className="border-0 bg-gradient-to-br from-orange-50 to-yellow-50 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-orange-600">Técnicos Audiovisuales</CardTitle>
                  <p className="text-sm text-gray-600 mt-2">(2 personas)</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">Generan experiencias mediante narrativas visuales de alto impacto.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Lo que hacemos */}
      <section className="pt-20 pb-2 bg-gradient-to-br from-gray-50 to-white">
        <div className="container">
          <h2 className="text-4xl font-bold mb-16 text-center">Lo que Hacemos y Cómo Impactamos</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="border-0 bg-gradient-to-br from-blue-50 to-teal-50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-600">Innovación Educativa</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Transformación de las dinámicas educativas, desde la implementación del enfoque STEM y desarrollos propios.</p>
              </CardContent>
            </Card>
            <Card className="border-0 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-600">Investigación Digital</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Proceso de innovación disruptiva que busca soluciones digitales más eficientes y pertinentes.</p>
              </CardContent>
            </Card>
            <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-green-600">Investigación Educativa</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Fortalecimiento de los procesos educativos en las instituciones educativas.</p>
              </CardContent>
            </Card>
            <Card className="border-0 bg-gradient-to-br from-orange-50 to-yellow-50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-orange-600">Centro de Ciencia</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Busca la transformación del territorio con base en la ciencia, la tecnología y la innovación.</p>
              </CardContent>
            </Card>
          </div>
          <div className="bg-gray-100 rounded-2xl px-8 py-10 md:px-14 md:py-14 border-l-4 border-gray-400">
            <p className="text-5xl md:text-7xl font-bold text-gray-800 leading-tight mb-4">
              Somos el CID:
            </p>
            <p className="text-4xl md:text-7xl font-light text-gray-800 leading-tight">
              un lugar donde la innovación cobra vida.
            </p>
          </div>
        </div>
      </section>

      {/* Centro de Ciencia - MEN */}
      <section className="pt-10 pb-2 bg-gradient-to-br from-blue-50 to-teal-50">
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
              <h2 className="text-4xl font-bold mb-6">Centro de Ciencia - MEN</h2>
              <p className="text-lg text-gray-700 mb-6">Los Centros de Ciencia, se definen como instituciones de carácter público, privado o mixto, sin ánimo de lucro, con personería jurídica o dependientes de otra organización, con una planta física abierta al público de manera permanente y que tienen la apropiación social del conocimiento como parte integral de su misión u objeto social.</p>
              <p className="text-lg text-gray-700">Asimismo, reconocen la diversidad cultural, económica y social de las comunidades, promueven los principios de acceso democrático a la información y al conocimiento, y contribuyen a fortalecer la cultura de ciencia y tecnología en el país mediante programas y actividades educativas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Centro de Ciencia - MEN (Propuesta 2) */}
      <section className="pt-10 pb-2 bg-white">
        <div className="container">
          <div className="max-w-6xl mx-auto mb-10">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src="https://www.youtube.com/embed/7sFJn3IfaGY?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1"
                title="Centro de Ciencia - Video"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Línea del Tiempo */}
      <section className="pt-10 pb-2 bg-white">
        <div className="container">
          
          {/* Línea de Tiempo Interactiva */}
          <div className="mt-16 relative">
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

            {/* Timeline vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 top-36 bottom-40 bg-gradient-to-b from-blue-500 via-teal-500 to-green-500 opacity-30" />

            

            {/* Events */}
            <div className="space-y-12">
              {sortedYears.map((year, yearIndex) => {
                const yearEvents = eventsByYear.get(year) || [];
                return (
                  <motion.div
                    key={year}
                    initial={{ opacity: 0, x: yearIndex % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className={`flex items-center gap-8 ${yearIndex % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    {/* Year Badge */}
                    <div className={`flex-1 flex ${yearIndex % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-bold px-6 py-3 rounded-full shadow-lg">
                        <Calendar className="w-5 h-5" />
                        <span className="text-xl">{year}</span>
                      </div>
                    </div>

                    {/* Timeline dot */}
                    <div className="relative z-10">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 border-4 border-white shadow-lg" />
                    </div>

                    {/* Events */}
                    <div className="flex-1">
                      <div className="space-y-4">
                        {yearEvents.map((event, eventIndex) => (
                          <motion.div
                            key={event.id}
                            whileHover={{ scale: 1.02, y: -4 }}
                            onClick={() => setSelectedEvent(event)}
                            className="bg-gradient-to-br from-blue-50 to-teal-50 p-6 rounded-xl border border-blue-200 hover:border-blue-400 cursor-pointer shadow-md hover:shadow-xl transition-all"
                          >
                            <h4 className="text-xl font-bold text-blue-900 mb-2">{event.title}</h4>
                            <p className="text-gray-700 mb-3">{event.description}</p>
                            {event.category && (
                              <span className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                                {event.category}
                              </span>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer Message */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mt-16 pt-12 border-t border-gray-200"
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
      <section className="pt-10 pb-2 bg-gradient-to-br from-gray-50 to-gray-100">
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

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {equipoImagenes.map((persona, index) => (
              <motion.div
                key={persona.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.15)] transition-all duration-300"
              >
                <div className="relative overflow-hidden shadow-[inset_0_2px_4px_rgba(255,255,255,0.6)] bg-gray-50 flex items-center justify-center">
                  <img
                    src={persona.foto}
                    alt={persona.nombre}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300 py-6"
                  />
                </div>

                <div className="px-6 py-6 text-center">
                  <h3 className="text-lg font-bold text-gray-900">{persona.nombre}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gestores de Innovación */}
      <section className="pt-10 pb-2 bg-gradient-to-br from-gray-50 to-gray-100">
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

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {gestoresData.map((gestor, index) => (
              <motion.div
                key={gestor.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.15)] transition-all duration-300"
              >
                {/* Imagen sin cortar - completa */}
                <div className="relative overflow-hidden shadow-[inset_0_2px_4px_rgba(255,255,255,0.6)] bg-gray-50 flex items-center justify-center">
                  <img
                    src={gestor.foto}
                    alt={gestor.nombre}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300 py-6"
                  />
                </div>

                {/* Contenido */}
                <div className="px-6 py-6 text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{gestor.nombre}</h3>
                  <p className="text-sm text-gray-600 mb-3">{gestor.profesion}</p>
                  <div className="flex justify-center">
                    <Badge variant={gestor.tipo === "STEM" ? "default" : "secondary"}>
                      {gestor.tipo}
                    </Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Event Detail Modal */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 flex items-center justify-center text-white font-bold text-lg">
                  {selectedEvent.year}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedEvent.title}</h3>
                  {selectedEvent.category && (
                    <span className="text-sm text-blue-600 font-semibold">{selectedEvent.category}</span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {selectedEvent.description}
            </p>
            {(selectedEvent.location || selectedEvent.participants) && (
              <div className="flex gap-6 pt-4 border-t border-gray-200">
                {selectedEvent.location && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span>{selectedEvent.location}</span>
                  </div>
                )}
                {selectedEvent.participants && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-5 h-5" />
                    <span>{selectedEvent.participants} participantes</span>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* Horizonte Estratégico */}
      <section className="mt-16 pt-20 pb-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container">
          <h2 className="text-4xl font-bold mb-16 text-center">Horizonte Estratégico</h2>
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 text-blue-600">Objetivo</h3>
              <p className="text-gray-700">Gestionar procesos de apropiación social del conocimiento y divulgación científica desde la innovación educativa, la cultura, la ciencia y la tecnología en el municipio de Envigado.</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6 text-center text-teal-600">Pilares</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                  <span className="text-gray-700">Innovación</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                  <span className="text-gray-700">Creatividad</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                  <span className="text-gray-700">Formación</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                  <span className="text-gray-700">Sostenibilidad</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6 text-center text-green-600">Enfoque</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-gray-700">Colaborativo y participativo</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-gray-700">Experimental</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-gray-700">Inclusivo</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-gray-700">STEM+</span>
                </li>
              </ul>
            </div>
            {/* Servicios */}
            <div className="mt-24 w-full md:col-span-3">
              <h3 className="text-3xl font-bold text-center mb-16 text-gray-800">
                Servicios
              </h3>

              {/* Servicios principales */}
              <div className="grid md:grid-cols-4 gap-10 mb-16">

                <div>
                  <h4 className="text-xl font-bold text-yellow-600">Clubes STEM</h4>
                  <p className="text-gray-700 mt-3">
                    Grupos experienciales que exploran STEAM+ mediante actividades prácticas y creativas.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-orange-600">Alianzas</h4>
                  <p className="text-gray-700 mt-3">
                    Impulsar los procesos de innovación educativa.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-red-600">
                    Centro de Producción Audiovisual
                  </h4>
                  <p className="text-gray-700 mt-3">
                    Creación de contenido interactivo y accesible, fomentando la comprensión y el interés por la ciencia en diversos públicos.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-green-600">Formación</h4>
                  <p className="text-gray-700 mt-3">
                    Se diseñan y promueven procesos de formación continua para la población del territorio.
                  </p>
                </div>

              </div>

              {/* Líneas de acción - ancho completo */}
              <div className="bg-green-100 rounded-2xl p-10 shadow-md w-full">
                <h4 className="text-2xl font-bold mb-8 text-green-700 text-center">
                  Líneas de acción
                </h4>

                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <span className="w-3 h-3 bg-green-600 rounded-full"></span>
                    <span className="text-gray-800 font-medium">
                      Innovación en el barrio
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-3">
                    <span className="w-3 h-3 bg-green-600 rounded-full"></span>
                    <span className="text-gray-800 font-medium">
                      Formación docente
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-3">
                    <span className="w-3 h-3 bg-green-600 rounded-full"></span>
                    <span className="text-gray-800 font-medium">
                      Formación complementaria
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServicesSection />

      {/* Líneas Estratégicas */}
      <section className="pt-10 pb-2 bg-white">
        <div className="container">
          <h2 className="text-4xl font-bold mb-16 text-center">Líneas Estratégicas del Centro de Ciencia</h2>
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <Card className="border-0 bg-gradient-to-br from-teal-50 to-cyan-50 shadow-lg hover:shadow-xl transition-all">
              <CardHeader>
                <CardTitle className="text-2xl text-teal-600">Apropiación Social del Conocimiento</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Busca conectar la investigación con las realidades y necesidades de la sociedad, haciendo que el conocimiento sea accesible y relevante para todos.</p>
              </CardContent>
            </Card>
            <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg hover:shadow-xl transition-all">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-600">Divulgación Pública de la Ciencia</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Acercar la ciencia y la tecnología a la sociedad de manera clara, accesible y atractiva, fomentando una cultura científica en la comunidad.</p>
              </CardContent>
            </Card>
          </div>

          {/* Placeholder - Comunidad Impactada */}
        </div>
      </section>




      <CommunityImpactSectionV1 />


      {/* Lo que el mundo ve en nosotros */}
      <section className="pt-10 pb-2 bg-gradient-to-br from-gray-50 to-white">
        <div className="container">
          <h2 className="text-4xl font-bold mb-16 text-center">Lo que el Mundo Ve en Nosotros</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {logrosData.map((logro, idx) => (
              <div key={idx} className="flex gap-4 p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 hover:border-green-300 transition-all">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <p className="text-gray-700">{logro}</p>
              </div>
            ))}
          </div>

          {/* Placeholder - Líneas Temáticas */}
        </div>
      </section>

      <ThematicLines />

      {/* El camino que soñamos */}
      <section className="pt-10 pb-2 bg-gradient-to-br from-blue-600 via-teal-500 to-green-500 text-white">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center">El Camino que Soñamos para el Centro de Ciencia</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:border-white/40 transition-all">
              <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center mb-6">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">Consolidación Académica</h3>
              <p>Contribuir con la consolidación del sector académico – científico para responder a los retos del siglo XXI.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:border-white/40 transition-all">
              <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center mb-6">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">Articulación Sectorial</h3>
              <p>Articular la ciencia, la tecnología y la innovación con el sector productivo de Envigado.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:border-white/40 transition-all">
              <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center mb-6">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">Territorio STEM+</h3>
              <p>Incentivar la apropiación social de la CTI en actores clave para impulsar el territorio STEM+.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pt-10 pb-6 bg-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">¿Quieres Ser Parte de Esta Transformación?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Únete a nuestro ecosistema de innovación y contribuye al desarrollo científico y tecnológico de Envigado.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contactanos">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white">
                Contáctanos <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/proyectos">
              <Button size="lg" variant="outline">
                Explorar Proyectos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      
    </div>
  );
}
