import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Zap, Users, BookOpen, Award } from "lucide-react";

export default function TerritorioStemItagui() {
  const [testimonioActual, setTestimonioActual] = useState(0);

  const ieParticipantes = [
    { nombre: "IE Itagüí Código", logo: "🏫", enfoque: "Robótica y Programación" },
    { nombre: "IE Nuestra Señora de Fátima", logo: "✝️", enfoque: "Ciencia y Tecnología" },
    { nombre: "IE Dinamarca", logo: "🌍", enfoque: "Innovación Educativa" },
    { nombre: "IE Jaime Salazar Robledo", logo: "📚", enfoque: "STEM+ Integral" },
    { nombre: "IE Presbitero Juan J. Escobar", logo: "⛪", enfoque: "Pensamiento Computacional" },
    { nombre: "IE San Alonso de Orozco", logo: "🎓", enfoque: "Diseño y Fabricación" }
  ];

  const aliados = [
    { nombre: "Microsoft", color: "bg-blue-100", textColor: "text-blue-900" },
    { nombre: "ICB - Instituto Colombiano de Bienestar Familiar", color: "bg-green-100", textColor: "text-green-900" },
    { nombre: "UPB - Universidad Pontificia Bolivariana", color: "bg-purple-100", textColor: "text-purple-900" },
    { nombre: "Secretaría de Educación Itagüí", color: "bg-orange-100", textColor: "text-orange-900" }
  ];

  const recursos = [
    { 
      titulo: "Kits de Robótica", 
      descripcion: "Arduino, LEGO Mindstorms y componentes electrónicos para proyectos prácticos",
      icono: "🤖"
    },
    { 
      titulo: "Laboratorio de Programación", 
      descripcion: "Espacios equipados con computadores para desarrollo de software y aplicaciones",
      icono: "💻"
    },
    { 
      titulo: "Impresoras 3D", 
      descripcion: "Tecnología de fabricación digital para diseño y prototipado",
      icono: "🖨️"
    },
    { 
      titulo: "Materiales STEM+", 
      descripcion: "Recursos educativos, libros, guías y materiales de apoyo pedagógico",
      icono: "📖"
    }
  ];

  const testimonios = [
    {
      nombre: "Rector Juan Carlos Pérez",
      rol: "Rector - IE Itagüí Código",
      institucion: "IE Itagüí Código",
      texto: "El Territorio STEM+ ha transformado la forma en que enseñamos. Nuestros estudiantes ahora tienen acceso a tecnología de punta y metodologías innovadoras que los preparan para el futuro.",
      avatar: "👨‍💼"
    },
    {
      nombre: "Dra. María González",
      rol: "Docente de Ciencias",
      institucion: "IE Nuestra Señora de Fátima",
      texto: "La colaboración entre instituciones ha permitido compartir mejores prácticas y recursos. Mis estudiantes están más motivados y comprometidos con el aprendizaje STEM.",
      avatar: "👩‍🏫"
    },
    {
      nombre: "Carlos López",
      rol: "Estudiante de 10º grado",
      institucion: "IE Dinamarca",
      texto: "Gracias al Territorio STEM+, descubrí mi pasión por la programación. Ahora participo en proyectos reales que hacen diferencia en mi comunidad.",
      avatar: "👨‍🎓"
    },
    {
      nombre: "Dra. Laura Martínez",
      rol: "Coordinadora de Innovación",
      institucion: "IE Jaime Salazar Robledo",
      texto: "La red de colaboración nos ha permitido acceder a formación continua y recursos que antes eran inaccesibles. El impacto en nuestros estudiantes es evidente.",
      avatar: "👩‍💼"
    }
  ];

  const noticias = [
    {
      titulo: "Feria STEM+ 2025",
      fecha: "15 de Marzo, 2025",
      descripcion: "Evento anual donde estudiantes presentan proyectos innovadores de todas las IE participantes.",
      icono: "🎉"
    },
    {
      titulo: "Capacitación en IA Educativa",
      fecha: "20 de Febrero, 2025",
      descripcion: "Taller para docentes sobre integración de inteligencia artificial en el aula.",
      icono: "🤖"
    },
    {
      titulo: "Hackathon Educativo",
      fecha: "10 de Abril, 2025",
      descripcion: "Competencia de programación y diseño para estudiantes de secundaria.",
      icono: "💡"
    }
  ];

  const siguienteTestimonio = () => {
    setTestimonioActual((prev) => (prev + 1) % testimonios.length);
  };

  const testimonioAnterior = () => {
    setTestimonioActual((prev) => (prev - 1 + testimonios.length) % testimonios.length);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <Breadcrumbs items={[
          { label: "Inicio", href: "/" },
          { label: "Territorio STEM+ Itagüí" }
        ]} />

        {/* Encabezado */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-8 text-white">
            <h1 className="text-4xl font-bold mb-4">Territorio STEM+ Itagüí</h1>
            <p className="text-lg mb-4">
              Una red colaborativa de instituciones educativas oficiales de Itagüí comprometidas con la innovación, 
              la investigación y el desarrollo de competencias STEM+ en nuestros estudiantes.
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Users className="h-6 w-6" />
                <span>6 Instituciones</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-6 w-6" />
                <span>Enfoque STEM+</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-6 w-6" />
                <span>Excelencia Educativa</span>
              </div>
            </div>
          </div>
        </section>

        {/* Instituciones Educativas Participantes */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Instituciones Participantes</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {ieParticipantes.map((ie, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-5xl mb-3">{ie.logo}</div>
                    <h3 className="font-bold text-lg mb-2">{ie.nombre}</h3>
                    <p className="text-sm text-muted-foreground">{ie.enfoque}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Aliados Estratégicos */}
        <section className="mb-12 bg-muted/30 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-6">Aliados Estratégicos</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {aliados.map((aliado, idx) => (
              <div key={idx} className={`${aliado.color} ${aliado.textColor} p-6 rounded-lg text-center font-semibold`}>
                {aliado.nombre}
              </div>
            ))}
          </div>
        </section>

        {/* Recursos STEM+ */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Recursos Disponibles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {recursos.map((recurso, idx) => (
              <Card key={idx}>
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="text-4xl">{recurso.icono}</div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">{recurso.titulo}</h3>
                      <p className="text-muted-foreground">{recurso.descripcion}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Novedades */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Novedades y Eventos</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {noticias.map((noticia, idx) => (
              <Card key={idx}>
                <CardContent className="pt-6">
                  <div className="text-3xl mb-3">{noticia.icono}</div>
                  <h3 className="font-bold text-lg mb-2">{noticia.titulo}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{noticia.fecha}</p>
                  <p className="text-sm">{noticia.descripcion}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Testimonios - Voces STEM+ */}
        <section className="mb-12 bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-8 text-center">Voces STEM+ - Testimonios</h2>
          
          <div className="relative max-w-2xl mx-auto">
            <Card>
              <CardContent className="pt-8 pb-8">
                <div className="text-center">
                  <div className="text-6xl mb-4">{testimonios[testimonioActual].avatar}</div>
                  <p className="text-lg italic mb-6 leading-relaxed">
                    "{testimonios[testimonioActual].texto}"
                  </p>
                  <div>
                    <p className="font-bold text-lg">{testimonios[testimonioActual].nombre}</p>
                    <p className="text-sm text-muted-foreground">{testimonios[testimonioActual].rol}</p>
                    <p className="text-sm text-primary">{testimonios[testimonioActual].institucion}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Controles del carrusel */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 rounded-full"
              onClick={testimonioAnterior}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 rounded-full"
              onClick={siguienteTestimonio}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Indicadores */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonios.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setTestimonioActual(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === testimonioActual 
                      ? "bg-primary w-8" 
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Ir al testimonio ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-primary text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">¿Quieres ser parte del Territorio STEM+?</h2>
          <p className="mb-6">Únete a nuestra red de innovación educativa y transforma la educación en tu institución.</p>
          <Button variant="secondary" size="lg">
            Contáctanos
          </Button>
        </section>
      </div>
    </div>
  );
}
