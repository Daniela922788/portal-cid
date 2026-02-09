import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, MapPin, Phone, Video, ExternalLink } from "lucide-react";

const faqs = [
  {
    pregunta: "¿Cómo me inscribo en un curso?",
    respuesta: "Puedes inscribirte directamente desde la página del curso. Haz clic en 'Inscribirse' y completa el formulario con tus datos."
  },
  {
    pregunta: "¿Cuál es el costo de los cursos?",
    respuesta: "La mayoría de nuestros cursos son gratuitos. Algunos diplomados pueden tener un costo específico que se indica en la descripción del curso."
  },
  {
    pregunta: "¿Recibo certificado al terminar?",
    respuesta: "Sí, al completar un curso recibirás un certificado digital que podrás descargar desde tu perfil."
  },
  {
    pregunta: "¿Puedo cambiar mi horario de clase?",
    respuesta: "Sí, puedes solicitar cambio de horario enviándonos un mensaje a través de nuestros canales de atención."
  },
  {
    pregunta: "¿Cómo contacto al CID?",
    respuesta: "Puedes contactarnos por correo electrónico o visitando nuestras oficinas. Ver detalles en la sección de canales de atención."
  }
];

const canales = [
  {
    nombre: "Correo Electrónico SAC",
    descripcion: "Para consultas sobre trámites",
    contacto: "sacenvigado@envigado.gov.co",
    icono: Mail,
    color: "bg-blue-100 text-blue-700"
  },
  {
    nombre: "Teléfono SAC",
    descripcion: "Atención telefónica",
    contacto: "3394000 exts 4123-4124",
    icono: Phone,
    color: "bg-green-100 text-green-700"
  },
  {
    nombre: "Correo Electrónico CID",
    descripcion: "Para consultas generales",
    contacto: "info@cidenvigado.edu.co",
    icono: Mail,
    color: "bg-purple-100 text-purple-700"
  },
  {
    nombre: "Ubicación",
    descripcion: "Visítanos en nuestras oficinas",
    contacto: "Parque Biblioteca Débora Arango, Envigado",
    icono: MapPin,
    color: "bg-red-100 text-red-700"
  }
];

export default function MesaAyuda() {
  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <Breadcrumbs items={[{ label: "Contactanos" }]} />
        
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Contáctanos</h1>
          <p className="text-xl text-muted-foreground">
            Estamos aquí para ayudarte. Resuelve tus dudas o comunícate con nosotros
          </p>
        </div>

        {/* Botón SAC Grande */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Sistema de Atención al Ciudadano (SAC)</h2>
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-lg border-2 border-blue-300">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <img src="/logo-sac.png" alt="Logo SAC" className="h-32 w-auto" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3">Accede al Sistema de Atención al Ciudadano</h3>
                <p className="text-gray-700 mb-6">Aquí puedes realizar tus trámites y consultas de forma digital. Ingresa con tu usuario y contraseña.</p>
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

        {/* Video Instructivo */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Video Instructivo: Cómo crear usuario en SAC</h2>
          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <div className="flex items-center gap-4 mb-6">
              <Video className="h-8 w-8 text-red-600" />
              <div>
                <h3 className="text-xl font-bold">Aprende a crear tu usuario en el SAC</h3>
                <p className="text-gray-600">Sigue este video paso a paso para registrarte en el sistema</p>
              </div>
            </div>
            <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/gYKoRaxQ8H8"
                title="Video instructivo de usuario SAC"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        {/* Preguntas Frecuentes */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Preguntas Frecuentes</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  {faq.pregunta}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {faq.respuesta}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Canales de Atención */}
        <div>
          <h2 className="text-3xl font-bold mb-8">Otros Canales de Atención</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {canales.map((canal, index) => {
              const IconComponent = canal.icono;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${canal.color}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg">{canal.nombre}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{canal.descripcion}</p>
                    <p className="font-semibold text-primary">{canal.contacto}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
