import { motion } from "framer-motion";
import { useState } from "react";
import { Cpu, Users, Video, GraduationCap } from "lucide-react";

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
  icon: React.ReactNode;
  description: string;
}

export function InteractiveMap() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const nodes: Node[] = [
    {
      id: "stem",
      label: "Clubes STEM",
      x: 20,
      y: 50,
      color: "from-yellow-400 to-yellow-500",
      icon: <Cpu className="w-8 h-8" />,
      description: "Grupos experienciales STEAM+",
    },
    {
      id: "alianzas",
      label: "Alianzas",
      x: 50,
      y: 20,
      color: "from-orange-400 to-orange-500",
      icon: <Users className="w-8 h-8" />,
      description: "Innovación educativa",
    },
    {
      id: "audiovisual",
      label: "Centro Audiovisual",
      x: 80,
      y: 50,
      color: "from-red-400 to-red-500",
      icon: <Video className="w-8 h-8" />,
      description: "Contenido interactivo",
    },
    {
      id: "formacion",
      label: "Formación",
      x: 50,
      y: 80,
      color: "from-green-400 to-green-500",
      icon: <GraduationCap className="w-8 h-8" />,
      description: "Procesos continuos",
    },
  ];

  const connections = [
    { from: "stem", to: "alianzas" },
    { from: "alianzas", to: "audiovisual" },
    { from: "audiovisual", to: "formacion" },
    { from: "formacion", to: "stem" },
    { from: "stem", to: "audiovisual" },
    { from: "alianzas", to: "formacion" },
  ];

  const getNodeCoords = (node: Node) => {
    return {
      x: (node.x / 100) * 100 + "%",
      y: (node.y / 100) * 100 + "%",
    };
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 overflow-hidden flex items-center justify-center">
      {/* SVG Lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(147, 51, 234, 0.3)" />
            <stop offset="100%" stopColor="rgba(236, 72, 153, 0.3)" />
          </linearGradient>
        </defs>

        {connections.map((conn, idx) => {
          const fromNode = nodes.find((n) => n.id === conn.from);
          const toNode = nodes.find((n) => n.id === conn.to);
          if (!fromNode || !toNode) return null;

          const fromX = (fromNode.x / 100) * window.innerWidth;
          const fromY = (fromNode.y / 100) * window.innerHeight;
          const toX = (toNode.x / 100) * window.innerWidth;
          const toY = (toNode.y / 100) * window.innerHeight;

          return (
            <motion.line
              key={idx}
              x1={fromX}
              y1={fromY}
              x2={toX}
              y2={toY}
              stroke="url(#lineGradient)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, delay: idx * 0.2 }}
              viewport={{ once: true }}
            />
          );
        })}
      </svg>

      {/* Nodes */}
      <div className="absolute inset-0 w-full h-full" style={{ zIndex: 2 }}>
        {nodes.map((node) => {
          const coords = getNodeCoords(node);
          const isHovered = hoveredNode === node.id;

          return (
            <motion.div
              key={node.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: coords.x,
                top: coords.y,
              }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {/* Glow effect */}
              <motion.div
                className={`absolute inset-0 rounded-full bg-gradient-to-r ${node.color} blur-lg`}
                animate={{
                  scale: isHovered ? 1.5 : 1,
                  opacity: isHovered ? 0.8 : 0.4,
                }}
                transition={{ duration: 0.3 }}
                style={{
                  width: "120px",
                  height: "120px",
                  left: "-60px",
                  top: "-60px",
                }}
              />

              {/* Node circle */}
              <motion.div
                className={`relative w-20 h-20 rounded-full bg-gradient-to-r ${node.color} flex items-center justify-center shadow-2xl cursor-pointer border-4 border-white/20 text-white`}
                animate={{
                  scale: isHovered ? 1.3 : 1,
                  boxShadow: isHovered
                    ? "0 0 40px rgba(147, 51, 234, 0.8)"
                    : "0 0 20px rgba(147, 51, 234, 0.4)",
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  animate={{ rotate: isHovered ? 360 : 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {node.icon}
                </motion.div>
              </motion.div>

              {/* Label */}
              <motion.div
                className="absolute top-24 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-white font-bold text-sm"
                animate={{ opacity: isHovered ? 1 : 0.7 }}
                transition={{ duration: 0.3 }}
              >
                {node.label}
              </motion.div>

              {/* Tooltip */}
              <motion.div
                className="absolute top-32 left-1/2 transform -translate-x-1/2 bg-gray-900 border-2 border-purple-500 rounded-lg p-3 whitespace-nowrap text-white text-xs pointer-events-none"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 1 : 0.8,
                }}
                transition={{ duration: 0.2 }}
              >
                <p className="font-bold">{node.description}</p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Center text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="text-center">
          <h2 className="text-5xl font-bold text-white mb-4">
            Nuestros Servicios Conectados
          </h2>
          <p className="text-xl text-purple-300">
            Explora cómo nuestros servicios trabajan juntos para transformar la educación
          </p>
        </div>
      </motion.div>
    </div>
  );
}
