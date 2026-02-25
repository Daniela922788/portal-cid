import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Zap, Brain, BarChart3, Users, Cpu, Video, Handshake, Lightbulb } from "lucide-react";

const SIZE = 900; // tamaño fijo del sistema
const CENTER = SIZE / 2;

const thematicLines = [
  { id: 1, title: "Robótica", icon: <Cpu className="w-6 h-6" />, color: "text-yellow-600", bg: "bg-yellow-100" },
  { id: 2, title: "Análisis de datos", icon: <BarChart3 className="w-6 h-6" />, color: "text-pink-600", bg: "bg-pink-100" },
  { id: 3, title: "Visitas guiadas", icon: <Users className="w-6 h-6" />, color: "text-green-600", bg: "bg-green-100" },
  { id: 4, title: "Innovación para emprendedores", icon: <Lightbulb className="w-6 h-6" />, color: "text-cyan-600", bg: "bg-cyan-100" },
  { id: 5, title: "Inteligencia artificial", icon: <Brain className="w-6 h-6" />, color: "text-teal-600", bg: "bg-teal-100" },
  { id: 6, title: "Producción audiovisual", icon: <Video className="w-6 h-6" />, color: "text-emerald-600", bg: "bg-emerald-100" },
  { id: 7, title: "Apropiación TIC", icon: <Handshake className="w-6 h-6" />, color: "text-rose-600", bg: "bg-rose-100" },
  { id: 8, title: "Habilidades blandas", icon: <Zap className="w-6 h-6" />, color: "text-amber-600", bg: "bg-amber-100" },
];

export function ThematicLines() {
  const outerRadius = 320;
  const innerRadius = 140;

  return (
    <section className="py-20 bg-white flex flex-col items-center">

      <h2 className="text-5xl font-bold mb-16 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
        Líneas Temáticas
      </h2>

      <div className="relative w-full max-w-[900px] aspect-square">

        {/* SVG BASE */}
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="absolute inset-0 w-full h-full"
        >
          {/* círculo interior */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={innerRadius}
            fill="none"
            stroke="#f3f4f6"
            strokeWidth="2"
          />

          {/* círculo exterior */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={outerRadius}
            fill="none"
            stroke="#e5e7eb"
            strokeDasharray="6 6"
          />

          {/* líneas radiales */}
          {thematicLines.map((_, index) => {
            const angle = (index * 360) / thematicLines.length;
            const rad = (angle * Math.PI) / 180;

            const x1 = CENTER + innerRadius * Math.cos(rad);
            const y1 = CENTER + innerRadius * Math.sin(rad);
            const x2 = CENTER + outerRadius * Math.cos(rad);
            const y2 = CENTER + outerRadius * Math.sin(rad);

            return (
              <line
                key={index}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#d1d5db"
                opacity="0.4"
              />
            );
          })}
        </svg>

        {/* COHETE */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center shadow-2xl z-10"
        >
          <span className="text-5xl">🚀</span>
        </motion.div>

        {/* ICONOS */}
        {thematicLines.map((item, index) => {
          const angle = (index * 360) / thematicLines.length;
          const rad = (angle * Math.PI) / 180;

          const x = CENTER + outerRadius * Math.cos(rad);
          const y = CENTER + outerRadius * Math.sin(rad);

          return (
            <div
              key={item.id}
              className="absolute"
              style={{
                left: `${(x / SIZE) * 100}%`,
                top: `${(y / SIZE) * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="flex flex-col items-center gap-3">
                <div className={`w-20 h-20 rounded-full ${item.bg} flex items-center justify-center shadow-lg`}>
                  <div className={item.color}>{item.icon}</div>
                </div>
                <p className="text-sm font-semibold bg-white px-3 py-1 rounded-full shadow">
                  {item.title}
                </p>
              </div>
            </div>
          );
        })}

      </div>
    </section>
  );
}