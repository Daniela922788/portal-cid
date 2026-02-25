import { motion } from "framer-motion";
import { ReactNode, useState } from "react";

interface FlipCard3DProps {
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
  details?: string[];
  index: number;
}

export function FlipCard3D({
  title,
  description,
  icon,
  color,
  details,
  index,
}: FlipCard3DProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="h-80 cursor-pointer perspective"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
        className="w-full h-full relative"
      >
        {/* Front */}
        <motion.div
          style={{
            backfaceVisibility: "hidden",
          }}
          className={`${color} rounded-2xl p-8 h-full flex flex-col justify-between shadow-2xl absolute w-full`}
        >
          <div>
            <motion.div
              className="text-5xl mb-4"
              whileHover={{ scale: 1.2, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {icon}
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-800 text-sm leading-relaxed">
              {description}
            </p>
          </div>
          <div className="relative z-10 flex items-center justify-between">
            <motion.div
              className="text-sm font-semibold text-gray-900 opacity-70"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Haz clic para más detalles
            </motion.div>
            <motion.div
              animate={{ rotateY: [0, 180, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-2xl"
            >
              ⇆
            </motion.div>
          </div>
        </motion.div>

        {/* Back */}
        <motion.div
          style={{
            backfaceVisibility: "hidden",
            rotateY: 180,
          }}
          className={`${color} rounded-2xl p-8 h-full flex flex-col justify-between shadow-2xl absolute w-full`}
        >
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
            {details && details.length > 0 && (
              <ul className="space-y-3">
                {details.map((detail, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="text-sm text-gray-800 flex items-start"
                  >
                    <span className="mr-2 font-bold text-lg">✓</span>
                    <span>{detail}</span>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
          <motion.div
            className="text-sm font-semibold text-gray-900 opacity-70"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ← Haz clic para volver
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
