import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, ExternalLink, LifeBuoy, ChevronDown, MessageCircle } from "lucide-react";

const canales = [
  {
    nombre: "Teléfono",
    descripcion: "Atención telefónica",
    contacto: "(+57) 301 2577662",
    icono: Phone,
    color: "bg-green-100 text-green-700"
  },
  {
    nombre: "Correo Electrónico",
    descripcion: "Para consultas generales",
    contacto: "Innovacion@envigado.edu.co",
    icono: Mail,
    color: "bg-purple-100 text-purple-700"
  },
  {
    nombre: "Ubicación",
    descripcion: "Visítanos en nuestras oficinas",
    contacto: "Biblioteca Pública y Parque Cultural Débora Arango, Envigado",
    icono: MapPin,
    color: "bg-red-100 text-red-700"
  }
];

const preguntasFrecuentes = [
  {
    pregunta: "¿Con cuánta frecuencia ofertan cursos nuevos?",
    respuesta:
      "De manera periódica se publica una nueva oferta de cursos y procesos de formación para la comunidad.",
    mostrarBotonWhatsApp: false,
  },
  {
    pregunta: "¿Tienen oferta para vacaciones?",
    respuesta:
      "Sí. Durante las temporadas de vacaciones contamos con cursos, talleres y actividades.",
    mostrarBotonWhatsApp: false,
  },
  {
    pregunta: "¿Para qué tipo de público tienen oferta de formación?",
    respuesta:
      "Nuestra oferta de formación está dirigida a todo tipo de público, incluyendo niños, adolescentes, adultos y adultos mayores.",
    mostrarBotonWhatsApp: false,
  },
  {
    pregunta: "¿Los cursos tienen algún costo?",
    respuesta:
      "No. Todos nuestros cursos y procesos de formación son completamente gratuitos.",
    mostrarBotonWhatsApp: false,
  },
  {
    pregunta: "¿Cómo puedo enterarme de nuevas convocatorias?",
    respuesta:
      "Puedes conocer nuestra oferta en la sección de formación de nuestra página web",
    mostrarBotonWhatsApp: true,
  },
  {
    pregunta: "¿Tienen oferta activa los fines de semana?",
    respuesta:
      "No. Actualmente la oferta está activa de lunes a viernes",
    mostrarBotonWhatsApp: false,
  },
];

export default function MesaAyuda() {
  const totalCanales = 2;
  const [faqAbierta, setFaqAbierta] = useState<number | null>(0);

  return (
    <div className="min-h-screen">
      <section className="relative w-full overflow-hidden bg-[linear-gradient(122deg,#182130_0%,#0D4B56_52%,#11B2AA_100%)] text-white">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#FFDE07]/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-[#EC6910]/15 blur-3xl" />

        <div className="relative z-10 container flex min-h-[480px] flex-col justify-end pb-8 md:pb-10">
          <h1 className="text-5xl font-extrabold leading-tight lg:text-6xl">Contactanos</h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/85 lg:text-lg">
            Estamos para apoyarte. Resuelve tus dudas y gestiona tus solicitudes mediante nuestros canales de atencion.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/12 px-4 py-2 font-medium backdrop-blur-sm">
              <Phone className="h-4 w-4" />
              {totalCanales} canales disponibles
            </span>
          </div>
        </div>
      </section>

      <div className="py-8">
        <div className="container">
          <Breadcrumbs items={[{ label: "Contactanos" }]} />

        {/* Bloque de Contacto Superior */}
        <div className="grid md:grid-cols-2 gap-12 mb-16 py-10 border-b border-gray-200">
          {/* Izquierda - Título y descripción */}
          <div>
            <h2 className="text-4xl font-bold mb-6 text-[#182130]">Canales de contacto</h2>
            <p className="text-gray-600 leading-relaxed">
              Estamos aquí para ayudarte. Resuelve tus dudas o comunícate con nosotros a través de nuestros múltiples canales de atención. Nuestro equipo está disponible para brindarte el apoyo que necesitas.
            </p>
          </div>

          {/* Derecha - Información de contacto en columnas */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Dirección */}
            <div>
              <h3 className="text-gray-400 text-sm font-semibold mb-3">
                	Dirección de Innovación y Desarrollo

              </h3>

              <p className="text-gray-900 font-medium leading-relaxed">
                CAM (Centro Administrativo Municipal)
                <br />
                Carrera 43 N.° 38 Sur-35
                <br />
                Torre sur - Piso 6
              </p>
            </div>

            {/* Centro */}
            <div>
              <h3 className="text-gray-400 text-sm font-semibold mb-3">
                Centro de Innovación
              </h3>

              <p className="text-gray-900 font-medium leading-relaxed">
                Biblioteca Pública y Parque Cultural Débora Arango
                <br />
                Cl. 37 Sur # 45 B-27, Zona 8
                <br />
                Piso 3
              </p>
            </div>

            {/* Email */}
            <div>
              <h3 className="text-gray-400 text-sm font-semibold mb-3">Email</h3>
              <p className="text-blue-600 font-medium">innovacion@envigado.edu.co</p>
            </div>

            {/* Teléfono */}
            <div>
              <h3 className="text-gray-400 text-sm font-semibold mb-3">Whatsapp</h3>
              <p className="text-gray-900 font-medium">(+57) 301 2577662</p>
            </div>
          </div>
        </div>

        {/* Preguntas Frecuentes */}
        <section className="mb-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h3 className="text-3xl font-bold text-[#182130]">Preguntas frecuentes</h3>
              <p className="mt-2 text-gray-600">
                Resuelve las dudas más comunes antes de usar los canales de contacto.
              </p>
            </div>
            <a
              href="https://sac2.gestionsecretariasdeeducacion.gov.co/Ciu_PreguntasFrecuentesAreas_Busqueda/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex"
            >
            </a>
          </div>

          <div className="space-y-3">
            {preguntasFrecuentes.map((item, index) => (
              <div
                key={item.pregunta}
                className={`rounded-xl border bg-white p-5 shadow-sm transition-colors ${
                  faqAbierta === index ? "border-[#0D4B56]/35 bg-[#F8FBFB]" : "border-slate-200"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setFaqAbierta((prev) => (prev === index ? null : index))}
                  className="flex w-full items-center justify-between gap-4 text-left"
                  aria-expanded={faqAbierta === index}
                >
                  <span className="pr-2 text-base font-semibold text-[#182130]">{item.pregunta}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[#0D4B56] transition-transform ${
                      faqAbierta === index ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                {faqAbierta === index && (
                  <div className="mt-3">
                    <p className="text-sm leading-relaxed text-slate-700">{item.respuesta}</p>
                    {item.mostrarBotonWhatsApp && (
                      <a
                        href="https://wa.me/573012577662"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex"
                      >
                        <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">
                          Contactar por WhatsApp
                          <MessageCircle className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <a
            href="https://sac2.gestionsecretariasdeeducacion.gov.co/Ciu_PreguntasFrecuentesAreas_Busqueda/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex md:hidden"
          >
            <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
              Banco oficial SAC
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </section>

        {/* Canales de Atención */}
        </div>
      </div>

      {/* Mapa Banner */}
      <div className="w-full bg-gray-100">
        <div className="container">
          <div className="rounded-lg overflow-hidden shadow-lg h-[600px]">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521663942176!2d-75.59108397116457!3d6.172525366026548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f15!3m3!1m2!1sMarcador%20CID!2s6.172525366026548%2C-75.59108397116461!5e0!3m2!1ses!2sco!4v1711425600000"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
