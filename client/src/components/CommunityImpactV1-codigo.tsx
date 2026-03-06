import { motion } from "framer-motion";
import { BarChart3, Users, TrendingUp, PieChart, LineChart } from "lucide-react";
import { useEffect, useState } from "react";

interface ImpactData {
  category: string;
  subcategory: string;
  gestores: number;
  visitasGuiadas: number;
  impactoMaker: number;
  talentoTech: number;
  tigo: number;
  sena: number;
  total: number;
}

const impactData: ImpactData[] = [
  {
    category: "I.E. PÚBLICAS",
    subcategory: "Estudiantes",
    gestores: 124,
    visitasGuiadas: 0,
    impactoMaker: 105,
    talentoTech: 0,
    tigo: 0,
    sena: 0,
    total: 229,
  },
  {
    category: "I.E. PÚBLICAS",
    subcategory: "Docentes",
    gestores: 81,
    visitasGuiadas: 0,
    impactoMaker: 158,
    talentoTech: 0,
    tigo: 0,
    sena: 0,
    total: 239,
  },
  {
    category: "I.E. PRIVADAS",
    subcategory: "Estudiantes",
    gestores: 37,
    visitasGuiadas: 67,
    impactoMaker: 0,
    talentoTech: 0,
    tigo: 0,
    sena: 0,
    total: 104,
  },
  {
    category: "I.E. PRIVADAS",
    subcategory: "Docentes",
    gestores: 0,
    visitasGuiadas: 0,
    impactoMaker: 48,
    talentoTech: 0,
    tigo: 0,
    sena: 0,
    total: 48,
  },
  {
    category: "COMUNIDAD",
    subcategory: "Funcionarios Alcaldía",
    gestores: 0,
    visitasGuiadas: 0,
    impactoMaker: 21,
    talentoTech: 37,
    tigo: 0,
    sena: 0,
    total: 58,
  },
  {
    category: "COMUNIDAD",
    subcategory: "Adultos",
    gestores: 0,
    visitasGuiadas: 0,
    impactoMaker: 0,
    talentoTech: 223,
    tigo: 0,
    sena: 0,
    total: 270,
  },
  {
    category: "COMUNIDAD",
    subcategory: "Mujeres Conectadas",
    gestores: 0,
    visitasGuiadas: 0,
    impactoMaker: 0,
    talentoTech: 0,
    tigo: 40,
    sena: 0,
    total: 40,
  },
  {
    category: "COMUNIDAD",
    subcategory: "Adulto Mayor",
    gestores: 26,
    visitasGuiadas: 0,
    impactoMaker: 0,
    talentoTech: 0,
    tigo: 0,
    sena: 0,
    total: 26,
  },
];

const AnimatedCounter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;

    const interval = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setCount(value);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [value]);

  return <span>{count.toLocaleString()}</span>;
};

export default function CommunityImpactV1() {
  const totalImpactados = 1014;
  const totalImpactados2024 = 458;

  return (
    <div className="min-h-screen bg-white pt-16 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="flex justify-center mb-4">
          <div className="relative inline-block">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent relative px-2">
              Comunidad Impactada en el Centro de Ciencia
            </h1>
          </div>
        </div>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto px-4">
          Entre 2024 y 2025 hemos logrado acercar los procesos de ciencia, tecnología e innovación a diferentes sectores de la sociedad
        </p>
      </motion.div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total 2025 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg p-8 text-white shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-4xl font-bold text-black">
                  <AnimatedCounter value={totalImpactados} />
                </span>
              </div>
              <div>
                <p className="text-sm opacity-90">Personas Impactadas</p>
                <p className="text-2xl font-bold">Año 2025</p>
              </div>
            </div>
          </motion.div>

          {/* Total 2024 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-lime-400 to-lime-500 rounded-lg p-8 text-white shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-4xl font-bold text-black">
                  <AnimatedCounter value={totalImpactados2024} />
                </span>
              </div>
              <div>
                <p className="text-sm opacity-90">Personas Impactadas</p>
                <p className="text-2xl font-bold">Año 2024</p>
              </div>
            </div>
          </motion.div>

          {/* Growth */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-orange-500 to-red-500 rounded-lg p-8 text-white shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-black">
                  +
                  <AnimatedCounter value={totalImpactados - totalImpactados2024} />
                </span>
              </div>
              <div>
                <p className="text-sm opacity-90">Crecimiento</p>
                <p className="text-2xl font-bold">2024 a 2025</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-4 mb-16"
      >
        <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-teal-600" />
            Distribución por Programa
          </h2>

          <div className="space-y-6">
            {[
              { label: "Gestores", value: 268, color: "bg-blue-500" },
              { label: "Visitas Guiadas", value: 67, color: "bg-cyan-500" },
              { label: "Impacto Maker", value: 332, color: "bg-teal-500" },
              { label: "Talento Tech", value: 260, color: "bg-green-500" },
              { label: "Tigo", value: 40, color: "bg-lime-500" },
              { label: "SENA", value: 47, color: "bg-yellow-500" },
            ].map((program, index) => (
              <motion.div
                key={program.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-32 font-semibold text-gray-700">{program.label}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(program.value / 332) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className={`${program.color} h-full flex items-center justify-end pr-3`}
                    >
                      <span className="text-white font-bold text-sm">
                        <AnimatedCounter value={program.value} />
                      </span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Donut and Growth Charts */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Donut Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg p-8 shadow-lg border-l-4 border-teal-500"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-teal-600" />
              Distribución Circular por Programa
            </h2>

            <div className="flex flex-col items-center">
              {/* Donut SVG */}
              <svg viewBox="0 0 200 200" className="w-48 h-48 mb-6">
                {[
                  { label: "Gestores", value: 268, color: "#3b82f6" },
                  { label: "Visitas Guiadas", value: 67, color: "#06b6d4" },
                  { label: "Impacto Maker", value: 332, color: "#14b8a6" },
                  { label: "Talento Tech", value: 260, color: "#22c55e" },
                  { label: "Tigo", value: 40, color: "#84cc16" },
                  { label: "SENA", value: 47, color: "#eab308" },
                ].map((program, index) => {
                  const programs = [
                    { label: "Gestores", value: 268, color: "#3b82f6" },
                    { label: "Visitas Guiadas", value: 67, color: "#06b6d4" },
                    { label: "Impacto Maker", value: 332, color: "#14b8a6" },
                    { label: "Talento Tech", value: 260, color: "#22c55e" },
                    { label: "Tigo", value: 40, color: "#84cc16" },
                    { label: "SENA", value: 47, color: "#eab308" },
                  ];
                  const total = programs.reduce((sum, p) => sum + p.value, 0);
                  const percentage = (program.value / total) * 100;
                  const circumference = 2 * Math.PI * 90;
                  const offset = circumference * (1 - percentage / 100);
                  const rotation = programs
                    .slice(0, index)
                    .reduce((sum, p) => sum + (p.value / total) * 360, 0);

                  return (
                    <motion.circle
                      key={program.label}
                      cx="100"
                      cy="100"
                      r="90"
                      fill="none"
                      stroke={program.color}
                      strokeWidth="20"
                      strokeDasharray={circumference * (percentage / 100)}
                      strokeDashoffset={offset}
                      transform={`rotate(${rotation} 100 100)`}
                      initial={{ strokeDashoffset: circumference }}
                      whileInView={{
                        strokeDashoffset: offset,
                      }}
                      transition={{ duration: 1.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    />
                  );
                })}
              </svg>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-3 w-full">
                {[
                  { label: "Gestores", value: 268, dotClass: "bg-blue-500" },
                  { label: "Visitas Guiadas", value: 67, dotClass: "bg-cyan-500" },
                  { label: "Impacto Maker", value: 332, dotClass: "bg-teal-500" },
                  { label: "Talento Tech", value: 260, dotClass: "bg-green-500" },
                  { label: "Tigo", value: 40, dotClass: "bg-lime-500" },
                  { label: "SENA", value: 47, dotClass: "bg-yellow-500" },
                ].map((program) => (
                  <div key={program.label} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${program.dotClass}`} />
                    <span className="text-sm text-gray-600">
                      {program.label}: {program.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Growth Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg p-8 shadow-lg border-l-4 border-orange-500"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <LineChart className="w-5 h-5 text-orange-600" />
              Crecimiento 2024-2025
            </h2>

            <div className="flex items-end justify-center gap-8 h-64">
              {[
                { year: "2024", value: totalImpactados2024, color: "from-purple-400 to-purple-600" },
                { year: "2025", value: totalImpactados, color: "from-green-400 to-green-600" },
              ].map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${(item.value / totalImpactados) * 100}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`w-24 bg-gradient-to-t ${item.color} rounded-t-lg shadow-lg flex flex-col items-center justify-end pb-4`}
                >
                  <span className="text-white font-bold text-lg">
                    <AnimatedCounter value={item.value} />
                  </span>
                  <span className="text-white text-sm mt-2">{item.year}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <p className="text-sm text-gray-700">
                <span className="font-bold text-green-600">
                  Crecimiento de +<AnimatedCounter value={totalImpactados - totalImpactados2024} />
                </span>
                {" "}personas impactadas, representando un incremento del{" "}
                <span className="font-bold">
                  {Math.round(((totalImpactados - totalImpactados2024) / totalImpactados2024) * 100)}%
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Data Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-4"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Users className="w-6 h-6 text-orange-600" />
          Desglose Detallado por Sector
        </h2>

        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-teal-600 to-teal-700 text-white">
                <th className="px-4 py-3 text-left font-semibold">Sector</th>
                <th className="px-4 py-3 text-left font-semibold">Público</th>
                <th className="px-4 py-3 text-center font-semibold">Gestores</th>
                <th className="px-4 py-3 text-center font-semibold">Visitas</th>
                <th className="px-4 py-3 text-center font-semibold">Impacto Maker</th>
                <th className="px-4 py-3 text-center font-semibold">Talento Tech</th>
                <th className="px-4 py-3 text-center font-semibold">Tigo</th>
                <th className="px-4 py-3 text-center font-semibold">SENA</th>
                <th className="px-4 py-3 text-center font-semibold bg-orange-600">Total</th>
              </tr>
            </thead>
            <tbody>
              {impactData.map((row, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className={`border-b transition-colors hover:bg-teal-50 ${
                    index % 2 === 0 ? "bg-teal-50" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-3 font-semibold text-gray-800">{row.subcategory}</td>
                  <td className="px-4 py-3 text-gray-600">{row.category}</td>
                  <td className="px-4 py-3 text-center text-gray-700">
                    {row.gestores > 0 ? row.gestores : "-"}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-700">
                    {row.visitasGuiadas > 0 ? row.visitasGuiadas : "-"}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-700">
                    {row.impactoMaker > 0 ? row.impactoMaker : "-"}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-700">
                    {row.talentoTech > 0 ? row.talentoTech : "-"}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-700">
                    {row.tigo > 0 ? row.tigo : "-"}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-700">
                    {row.sena > 0 ? row.sena : "-"}
                  </td>
                  <td className="px-4 py-3 text-center font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded">
                    {row.total}
                  </td>
                </motion.tr>
              ))}
              <tr className="bg-gradient-to-r from-teal-700 to-teal-800 text-white font-bold text-lg">
                <td colSpan={2} className="px-4 py-3">
                  TOTAL 2025
                </td>
                <td className="px-4 py-3 text-center">268</td>
                <td className="px-4 py-3 text-center">67</td>
                <td className="px-4 py-3 text-center">332</td>
                <td className="px-4 py-3 text-center">260</td>
                <td className="px-4 py-3 text-center">40</td>
                <td className="px-4 py-3 text-center">47</td>
                <td className="px-4 py-3 text-center bg-orange-600 rounded">1014</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
