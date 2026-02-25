import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Clock, Award, Calendar, MapPin, Sparkles } from "lucide-react";

interface TimelineEventType {
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

interface EventDetailModalProps {
  event: TimelineEventType | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EventDetailModal({
  event,
  isOpen,
  onClose,
}: EventDetailModalProps) {
  if (!event) return null;

  const getEventConfig = () => {
    switch (event.eventType) {
      case "founding":
        return {
          icon: Zap,
          gradient: "from-amber-400 via-orange-500 to-red-600",
          bgGradient: "from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950",
          accentColor: "bg-amber-500",
          label: "Fundación",
          labelBg: "bg-gradient-to-r from-amber-400 to-orange-500",
        };
      case "pending":
        return {
          icon: Clock,
          gradient: "from-blue-400 via-cyan-500 to-teal-600",
          bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950",
          accentColor: "bg-blue-500",
          label: "Pendiente",
          labelBg: "bg-gradient-to-r from-blue-400 to-cyan-500",
        };
      default:
        return {
          icon: Award,
          gradient: "from-emerald-400 via-green-500 to-teal-600",
          bgGradient: "from-emerald-50 to-green-50 dark:from-emerald-950 dark:to-green-950",
          accentColor: "bg-emerald-500",
          label: "Hito",
          labelBg: "bg-gradient-to-r from-emerald-400 to-green-500",
        };
    }
  };

  const config = getEventConfig();
  const Icon = config.icon;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              className={`w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl ${config.bgGradient}`}
            >
              {/* Header with Gradient Background */}
              <div className={`relative bg-gradient-to-r ${config.gradient} p-8 text-white overflow-hidden`}>
                {/* Animated Background Elements */}
                <motion.div
                  className="absolute inset-0 opacity-20"
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                />

                {/* Sparkles */}
                <motion.div
                  className="absolute top-4 right-4"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Sparkles className="w-6 h-6" />
                </motion.div>

                <div className="relative z-10 flex items-start justify-between">
                  <div className="flex-1">
                    <motion.div
                      custom={0}
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      className="flex items-center gap-3 mb-4"
                    >
                      <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-bold bg-white/20 px-3 py-1 rounded-full">
                        {config.label}
                      </span>
                    </motion.div>

                    <motion.h2
                      custom={1}
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      className="text-3xl md:text-4xl font-bold mb-2"
                    >
                      {event.title}
                    </motion.h2>

                    <motion.div
                      custom={2}
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      className="flex items-center gap-2 text-white/80"
                    >
                      <Calendar className="w-4 h-4" />
                      <span className="text-lg font-semibold">{event.year}</span>
                    </motion.div>
                  </div>

                  {/* Close Button */}
                  <motion.button
                    onClick={onClose}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-md p-2 rounded-xl transition-colors ml-4"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {event.description && (
                  <motion.div
                    custom={3}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                      Descripción
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base mb-6">
                      {event.description}
                    </p>
                  </motion.div>
                )}

                {/* Event Details Grid */}
                <motion.div
                  custom={4}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-2 gap-4 mb-6"
                >
                  <div className={`${config.accentColor} bg-opacity-10 rounded-xl p-4`}>
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-1">
                      Año
                    </p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {event.year}
                    </p>
                  </div>
                  <div className={`${config.accentColor} bg-opacity-10 rounded-xl p-4`}>
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-1">
                      Tipo
                    </p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {config.label}
                    </p>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  custom={5}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex gap-3"
                >
                  <motion.button
                    onClick={onClose}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-1 bg-gradient-to-r ${config.gradient} text-white font-bold py-3 rounded-xl transition-all`}
                  >
                    Cerrar
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
