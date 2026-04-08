import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, ExternalLink, LifeBuoy } from "lucide-react";

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

export default function MesaAyuda() {
  const totalCanales = 2;

  return (
    <div className="min-h-screen">
      <section className="relative w-full overflow-hidden bg-[linear-gradient(122deg,#182130_0%,#0D4B56_52%,#11B2AA_100%)] text-white">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#FFDE07]/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-[#EC6910]/15 blur-3xl" />

        <div className="relative z-10 container flex min-h-[480px] flex-col justify-end pb-8 md:pb-10">
          <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/35 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]">
            <LifeBuoy className="h-4 w-4 text-[#FFDE07]" />
            Mesa de ayuda CID
          </div>

          <h1 className="text-5xl font-extrabold leading-tight lg:text-6xl">Contactanos</h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/85 lg:text-lg">
            Estamos para apoyarte. Resuelve tus dudas y gestiona tus solicitudes mediante nuestros canales de atencion.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/12 px-4 py-2 font-medium backdrop-blur-sm">
              <Phone className="h-4 w-4" />
              {totalCanales} canales disponibles
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/12 px-4 py-2 font-medium backdrop-blur-sm">
              <ExternalLink className="h-4 w-4" />
              Atencion digital SAC
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
              <h3 className="text-gray-400 text-sm font-semibold mb-3">Dirección</h3>
              <p className="text-gray-900 font-medium">Biblioteca Pública y Parque Cultural Débora Arango, Envigado</p>
            </div>

            {/* Email */}
            <div>
              <h3 className="text-gray-400 text-sm font-semibold mb-3">Email</h3>
              <p className="text-blue-600 font-medium">innovacion@envigado.edu.co</p>
            </div>

            {/* Teléfono */}
            <div>
              <h3 className="text-gray-400 text-sm font-semibold mb-3">Teléfono</h3>
              <p className="text-gray-900 font-medium">(+57) 301 2577662</p>
            </div>
          </div>
        </div>

        {/* Botón SAC */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-lg border-2 border-blue-300">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-3">Sistema de Atención al Ciudadano (SAC)</h3>
                <p className="text-gray-700">Aquí puedes realizar tus trámites y consultas de forma digital.</p>
              </div>
              <div className="flex-shrink-0">
                <a href="https://sac2.gestionsecretariasdeeducacion.gov.co/app_Login/?sec=31" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg flex items-center gap-2">
                    Ingresar a SAC
                    <ExternalLink className="h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Preguntas Frecuentes */}
        <div className="mb-16">
          <div className="mb-8 rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 via-cyan-50 to-teal-50 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-blue-900">Preguntas Frecuentes</h3>
                <p className="mt-1 text-sm text-blue-800">
                  Consulta el banco oficial de preguntas frecuentes del SAC.
                </p>
              </div>
              <a
                href="https://sac2.gestionsecretariasdeeducacion.gov.co/Ciu_PreguntasFrecuentesAreas_Busqueda/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                  Ver preguntas frecuentes
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>

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
