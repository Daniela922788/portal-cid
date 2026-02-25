import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Zap, Lightbulb, Rocket, Award, Target, CheckCircle, Clock, Sparkles } from "lucide-react";

interface TimelineEvent {
  id: number;
  year: number;
  title: string;
  description: string;
  category?: string;
  location?: string;
  participants?: number;
  eventType?: string;
  imageUrl?: string;
}

interface TimelineYearCardProps {
  year: number;
  events: TimelineEvent[];
  isLeft: boolean;
  onEventClick: (event: TimelineEvent) => void;
}

// Iconos únicos por año
const yearIconMap: Record<number, React.ComponentType<any>> = {
  2012: Zap,        // Rayo - Inicio energético
  2014: Lightbulb,  // Bombilla - Ideas
  2016: Rocket,     // Cohete - Despegue
  2017: Award,      // Premio - Reconocimiento
  2023: Target,     // Objetivo - Enfoque
  2024: CheckCircle,// Check - Validación
  2025: Sparkles,   // Estrellas - Brillo
  2026: Clock,      // Reloj - En proceso
};

// Colores por año
const yearColorMap: Record<number, { gradient: string; borderColor: string; labelBg: string; accentColor: string; textColor: string }> = {
  2012: {
    gradient: "from-orange-400 to-red-500",
    borderColor: "border-orange-300",
    labelBg: "bg-orange-500",
    accentColor: "bg-orange-500",
    textColor: "text-orange-900",
  },
  2014: {
    gradient: "from-yellow-400 to-amber-500",
    borderColor: "border-yellow-300",
    labelBg: "bg-yellow-500",
    accentColor: "bg-yellow-500",
    textColor: "text-yellow-900",
  },
  2016: {
    gradient: "from-green-400 to-emerald-500",
    borderColor: "border-green-300",
    labelBg: "bg-green-500",
    accentColor: "bg-green-500",
    textColor: "text-green-900",
  },
  2017: {
    gradient: "from-emerald-400 to-teal-500",
    borderColor: "border-emerald-300",
    labelBg: "bg-emerald-500",
    accentColor: "bg-emerald-500",
    textColor: "text-emerald-900",
  },
  2023: {
    gradient: "from-cyan-400 to-blue-500",
    borderColor: "border-cyan-300",
    labelBg: "bg-cyan-500",
    accentColor: "bg-cyan-500",
    textColor: "text-cyan-900",
  },
  2024: {
    gradient: "from-blue-400 to-indigo-500",
    borderColor: "border-blue-300",
    labelBg: "bg-blue-500",
    accentColor: "bg-blue-500",
    textColor: "text-blue-900",
  },
  2025: {
    gradient: "from-indigo-400 to-purple-500",
    borderColor: "border-indigo-300",
    labelBg: "bg-indigo-500",
    accentColor: "bg-indigo-500",
    textColor: "text-indigo-900",
  },
  2026: {
    gradient: "from-purple-400 to-pink-500",
    borderColor: "border-purple-300",
    labelBg: "bg-purple-500",
    accentColor: "bg-purple-500",
    textColor: "text-purple-900",
  },
};

export function TimelineYearCard({
  year,
  events,
  isLeft,
  onEventClick,
}: TimelineYearCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [expandedEventId, setExpandedEventId] = useState<number | null>(null);

  const config = yearColorMap[year] || yearColorMap[2012];
  const YearIcon = yearIconMap[year] || Sparkles;

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const cardVariants = {
    rest: {
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      scale: 1,
    },
    hover: {
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)",
      scale: 1.02,
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`flex ${isLeft ? "flex-row" : "flex-row-reverse"} gap-6 md:gap-12 mb-16 md:mb-24 items-center`}
    >
      {/* Content Card */}
      <motion.div
        className="flex-1"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <motion.div
          variants={cardVariants}
          initial="rest"
          animate={isHovered ? "hover" : "rest"}
          className={`relative overflow-hidden rounded-2xl border-2 ${config.borderColor} bg-gradient-to-r ${config.gradient} backdrop-blur-xl p-6 md:p-8 cursor-pointer group transition-all duration-300`}
        >
          {/* Glow Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            className={`absolute inset-0 bg-gradient-to-r ${config.gradient} opacity-10 blur-xl`}
          />

          {/* Animated Border Glow */}
          <motion.div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${config.gradient} opacity-0 blur-md`}
            animate={isHovered ? { opacity: 0.2 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          <div className="relative z-10">
            {/* Header with Year and Icon */}
            <motion.div
              className="flex items-center justify-between mb-6"
              animate={isHovered ? { x: 5 } : { x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className={`bg-gradient-to-r ${config.gradient} text-white px-6 py-3 rounded-full font-bold text-2xl md:text-3xl shadow-lg`}
                animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {year}
              </motion.div>

              {/* Year Icon with Animation */}
              <motion.div
                animate={isHovered ? { scale: 1.3, rotate: 15 } : { scale: 1, rotate: 0 }}
                transition={{ duration: 0.3 }}
                className={`${config.accentColor} text-white p-3 rounded-lg`}
              >
                <YearIcon className="w-6 h-6 md:w-8 md:h-8" />
              </motion.div>
            </motion.div>

            {/* Events List */}
            <div className="space-y-3">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => {
                    setExpandedEventId(expandedEventId === event.id ? null : event.id);
                    onEventClick(event);
                  }}
                  className="cursor-pointer"
                >
                  {/* Event Title */}
                  <motion.h4
                    className={`text-lg md:text-xl font-bold ${config.textColor} leading-tight hover:opacity-80 transition-opacity`}
                    animate={isHovered ? { x: 5 } : { x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {event.title}
                  </motion.h4>

                  {/* Event Description */}
                  {event.description && (
                    <motion.p
                      className={`${config.textColor} opacity-80 text-sm md:text-base leading-relaxed mt-1`}
                      animate={isHovered ? { opacity: 1 } : { opacity: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      {event.description}
                    </motion.p>
                  )}

                  {/* Image Preview on Hover */}
                  {event.imageUrl && isHovered && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 rounded-lg overflow-hidden border-2 border-white/30 shadow-lg"
                    >
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-40 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </motion.div>
                  )}

                  {/* Divider between events */}
                  {index < events.length - 1 && (
                    <div className={`mt-3 pt-3 border-t border-white/20`} />
                  )}
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              className="flex items-center gap-2 text-sm font-semibold mt-6 pt-4 border-t border-white/20"
              animate={isHovered ? { x: 8 } : { x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span className={config.textColor}>Ver detalles</span>
              <motion.div
                animate={isHovered ? { x: 4 } : { x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className={`w-4 h-4 ${config.accentColor.replace("bg-", "text-")}`} />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Timeline Dot and Connector */}
      <div className="flex flex-col items-center">
        {/* Animated Outer Ring */}
        <motion.div
          className={`absolute w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r ${config.gradient} opacity-20`}
          animate={isHovered ? { scale: 1.5, opacity: 0 } : { scale: 1, opacity: 0.2 }}
          transition={{ duration: 0.4 }}
        />

        {/* Main Dot */}
        <motion.div
          className={`relative w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-r ${config.gradient} shadow-xl ring-4 ring-white dark:ring-slate-900 z-20`}
          animate={isHovered ? { scale: 1.3 } : { scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {/* Inner Sparkle */}
          <motion.div
            className="absolute inset-1 rounded-full bg-white opacity-30"
            animate={isHovered ? { scale: 0.8 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>

        {/* Vertical Connector Line */}
        <motion.div
          className={`w-1 h-16 md:h-20 mt-3 bg-gradient-to-b from-current to-transparent opacity-40`}
          style={{
            background: `linear-gradient(to bottom, rgb(var(--color-start)), transparent)`,
          }}
        />
      </div>
    </motion.div>
  );
}
