import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { FlipCard3D } from "@/components/FlipCard3D";
import { InteractiveMap } from "@/components/InteractiveMap";
import {
  Cpu,
  Users,
  Video,
  GraduationCap,
  Zap,
  Lightbulb,
  Leaf,
  BookOpen,
} from "lucide-react";

export default function Services() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });


  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const services = [
    {
      title: "Clubes STEM",
      description:
        "Grupos experienciales que exploran STEAM+ mediante actividades prácticas y creativas.",
      icon: <Cpu className="text-gray-900" />,
      color: "bg-yellow-200",
      details: [
        "Innovación en el barrio",
        "Formación docente",
        "Formación complementaria",
      ],
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
    },
    {
      title: "Alianzas",
      description: "Impulsar los procesos de innovación educativa.",
      icon: <Users className="text-gray-900" />,
      color: "bg-orange-200",
      details: [
        "Colaboración institucional",
        "Redes de innovación",
        "Transferencia de conocimiento",
      ],
    },
    {
      title: "Centro de Producción Audiovisual",
      description:
        "Creación de contenido interactivo y accesible, fomentando la comprensión y el interés por la ciencia.",
      icon: <Video className="text-gray-900" />,
      color: "bg-red-200",
      details: [
        "Contenido multimedia",
        "Divulgación científica",
        "Accesibilidad digital",
      ],
    },
    {
      title: "Formación",
      description:
        "Se diseñan y promueven procesos de formación continua para la población del territorio.",
      icon: <GraduationCap className="text-gray-900" />,
      color: "bg-green-200",
      details: [
        "Capacitación continua",
        "Desarrollo profesional",
        "Educación comunitaria",
      ],
    },
  ];

  const pillars = [
    { name: "Innovación", icon: <Zap /> },
    { name: "Creatividad", icon: <Lightbulb /> },
    { name: "Formación", icon: <BookOpen /> },
    { name: "Sostenibilidad", icon: <Leaf /> },
  ];

  const servicesData = [
    { name: "Clubes STEM", icon: <Cpu className="w-16 h-16" />, color: "bg-yellow-400" },
    { name: "Alianzas", icon: <Users className="w-16 h-16" />, color: "bg-orange-400" },
    { name: "Centro Audiovisual", icon: <Video className="w-16 h-16" />, color: "bg-red-400" },
    { name: "Formación", icon: <GraduationCap className="w-16 h-16" />, color: "bg-green-400" },
  ];

  return (
    <div ref={containerRef} className="relative bg-white overflow-hidden">

      {/* Objetivo Section */}
      <section className="relative h-auto flex items-center justify-center py-16 px-4 z-10 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-12 border-2 border-slate-200 shadow-lg"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Horizonte Estratégico
            </h2>
            <p className="text-xl text-gray-800 mb-12 leading-relaxed">
              Gestionar procesos de apropiación social del conocimiento y
              divulgación científica desde la innovación educativa, la cultura,
              la ciencia y la tecnología en el municipio de Envigado.
            </p>

            <div className="grid md:grid-cols-4 gap-8 mt-8">
              {pillars.map((pillar, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.15 }}
                  className="flex flex-col items-center justify-center text-center cursor-pointer"
                >
                  <div className="text-6xl mb-4 flex justify-center text-slate-600 hover:text-slate-800 transition-colors">
                    {pillar.icon}
                  </div>
                  <p className="font-bold text-lg text-gray-900">{pillar.name}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* NUESTROS SERVICIOS CONECTADOS - 4 OPCIONES */}
      <section className="relative z-10 bg-gradient-to-br from-gray-50 to-gray-100 h-auto flex items-center justify-center py-10 px-4">
        <div className="max-w-6xl mx-auto w-full">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-gray-900 mb-4 text-center"
          >
            Nuestros Servicios Conectados
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center text-slate-600 text-xl mb-2 max-w-2xl mx-auto"
          >
            Explora cómo nuestros servicios trabajan juntos para transformar la educación
          </motion.p>

          {/* OPCIÓN 1: Círculos conectados */}
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative flex items-center justify-center py-4"
            >
              <div className="relative z-10 grid grid-cols-4 gap-8 w-full px-4">
                {servicesData.map((service, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.15 }}
                    whileHover={{ scale: 1.15 }}
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <div className={`${service.color} rounded-full p-6 mb-4 shadow-lg hover:shadow-xl transition-shadow`}>
                      <div className="text-white">{service.icon}</div>
                    </div>
                    <p className="font-bold text-gray-900 text-sm text-center">{service.name}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* OPCIÓN 3: Flujo visual horizontal - OCULTO */}
          {false && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-between px-4 py-8 overflow-x-auto"
            >
              {servicesData.map((service, idx) => (
                <div key={idx} className="flex items-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <div className={`${service.color} rounded-full p-5 mb-3 shadow-lg hover:shadow-xl transition-shadow`}>
                      <div className="text-white text-4xl">{service.icon}</div>
                    </div>
                    <p className="font-bold text-gray-900 text-sm text-center w-24">{service.name}</p>
                  </motion.div>
                  {idx < servicesData.length - 1 && (
                    <div className="mx-4 text-3xl text-gray-400">→</div>
                  )}
                </div>
              ))}
            </motion.div>
          )}

          {/* OPCIÓN 4: Grid asimétrico - OCULTO */}
          {false && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-12 gap-6 auto-rows-max"
            >
              {servicesData.map((service, idx) => {
                const sizes = [
                  "col-span-6 row-span-2",
                  "col-span-6 row-span-1",
                  "col-span-6 row-span-1",
                  "col-span-12 row-span-1",
                ];
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className={`${sizes[idx]} ${service.color} rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-xl transition-shadow cursor-pointer`}
                  >
                    <div className="text-white mb-4 text-5xl">{service.icon}</div>
                    <p className="font-bold text-white text-lg">{service.name}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

      {/* Flip Cards Section */}
      <section className="relative h-auto flex items-center justify-center py-12 px-4 z-10 bg-white">
        <div className="max-w-6xl mx-auto w-full">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-gray-900 mb-4 text-center"
          >
            Servicios Principales
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center text-gray-600 text-xl mb-10 max-w-2xl mx-auto"
          >
            Haz clic en cada tarjeta para descubrir más detalles
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <FlipCard3D key={idx} {...service} index={idx} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
