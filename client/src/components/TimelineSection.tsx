import { useState } from "react";
import { motion } from "framer-motion";
import { TimelineYearCard } from "./TimelineYearCard";
import { EventDetailModal } from "./EventDetailModal";

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

/**
 * TimelineSection - Componente reutilizable de línea de tiempo
 * 
 * Uso:
 * ```tsx
 * import { TimelineSection } from "@/components/TimelineSection";
 * 
 * export default function MyPage() {
 *   return (
 *     <div>
 *       <h1>Mi Página</h1>
 *       <TimelineSection />
 *       <p>Más contenido aquí...</p>
 *     </div>
 *   );
 * }
 * ```
 */
export function TimelineSection() {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Datos estáticos de eventos (puedes conectar a base de datos después)
  const events: TimelineEvent[] = [
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

  const isLoading = false;

  // Agrupar eventos por año
  const eventsByYear = events.reduce<Record<number, TimelineEvent[]>>(
    (acc, event) => {
      const year = event.year;
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(event);
      return acc;
    },
    {}
  );

  // Ordenar años
  const sortedYears = Object.keys(eventsByYear)
    .map(Number)
    .sort((a, b) => a - b);

  const handleEventClick = (event: TimelineEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white py-16 px-4">
      {/* Encabezado */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="inline-block mb-4 px-4 py-2 bg-emerald-100 rounded-full">
          <span className="text-emerald-700 text-sm font-semibold flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
            Línea de Tiempo Interactiva
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Historia del CID
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Descubre la evolución del Centro de Innovación y Desarrollo desde su
          fundación en 2012 hasta hoy. Una travesía de innovación, crecimiento y
          transformación.
        </p>
      </motion.div>

      {/* Línea de tiempo */}
      <motion.div
        className="relative max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Línea vertical conectora */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 rounded-full"></div>

        {/* Eventos agrupados por año */}
        <div className="space-y-12">
          {sortedYears.map((year, index) => (
            <TimelineYearCard
              key={year}
              year={year}
              events={eventsByYear[year]}
              isLeft={index % 2 === 0}
              onEventClick={handleEventClick}
            />
          ))}
        </div>

        {/* Decoración de puntos */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-full h-full pointer-events-none">
          {sortedYears.map((year, index) => (
            <motion.div
              key={`dot-${year}`}
              className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-blue-500 rounded-full"
              style={{
                top: `${(index / sortedYears.length) * 100}%`,
              }}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            />
          ))}
        </div>
      </motion.div>

      {/* Pie de página */}
      <motion.div
        className="text-center mt-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
      >
        <p className="text-gray-600 text-lg">
          Continuamos innovando y creciendo cada día
        </p>
        <div className="flex justify-center gap-2 mt-4">
          <motion.div
            className="w-2 h-2 bg-cyan-400 rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div
            className="w-2 h-2 bg-blue-500 rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="w-2 h-2 bg-purple-600 rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
          />
        </div>
      </motion.div>

      {/* Modal de detalles */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedEvent(null);
          }}
        />
      )}
    </div>
  );
}
