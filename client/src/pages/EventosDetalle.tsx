import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Play, Calendar, MapPin, Users } from "lucide-react";

export default function EventosDetalle() {
  const [fotoActual, setFotoActual] = useState(0);
  const [testimonioActual, setTestimonioActual] = useState(0);

  const evento = {
    titulo: "Semana STEM 2025",
    subtitulo: "Primera edición del evento más importante de innovación educativa",
    fechas: "15 - 19 de Marzo, 2025",
    lugar: "Centro de Innovación CID, Envigado",
    imagen: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop",
    descripcion: "La Semana STEM es un evento anual que reúne a estudiantes, docentes, gestores y expertos en innovación educativa. Durante cinco días, participantes de todas las instituciones educativas del Territorio STEM+ Itagüí presentan proyectos, participan en talleres, y comparten experiencias significativas en torno a la educación STEM.",
    objetivos: [
      "Promover la innovación educativa en el Territorio STEM+",
      "Crear espacios de intercambio de experiencias y buenas prácticas",
      "Motivar a estudiantes a explorar carreras STEM",
      "Fortalecer la red de colaboración entre instituciones"
    ],
    publico: "Estudiantes de 6º a 11º grado, docentes, gestores educativos y comunidad en general",
    importancia: "Este evento es fundamental para visibilizar el trabajo realizado en el Territorio STEM+ y demostrar el impacto de la innovación educativa en nuestras comunidades."
  };

  const vivencias = `Durante la Semana STEM 2024, vivimos momentos inolvidables. Más de 500 estudiantes participaron en talleres de robótica, programación, diseño 3D y ciencia experimental. Vimos cómo jóvenes de diferentes instituciones colaboraban en proyectos innovadores, rompiendo barreras y creando soluciones a problemas reales de sus comunidades.

Uno de los momentos más impactantes fue la presentación de proyectos finales, donde estudiantes de primaria hasta undécimo grado mostraron trabajos de investigación aplicada. Desde sistemas de riego automático hasta aplicaciones móviles para la educación, los proyectos reflejaban el potencial de nuestra juventud.

Los docentes también tuvieron su espacio, compartiendo metodologías innovadoras y recursos pedagógicos. La colaboración entre maestros de diferentes instituciones generó nuevas alianzas y planes de trabajo conjunto.`;

  const galeria = [
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop"
  ];

  const videos = [
    { titulo: "Resumen Semana STEM 2024", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { titulo: "Testimonios de Participantes", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { titulo: "Proyectos Destacados", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
  ];

  const testimonios = [
    {
      nombre: "Sofía Rodríguez",
      rol: "Estudiante",
      institucion: "IE Itagüí Código",
      texto: "La Semana STEM fue transformadora. Aprendí que la tecnología puede cambiar el mundo y que yo puedo ser parte de ese cambio.",
      avatar: "👩‍🎓"
    },
    {
      nombre: "Prof. Carlos Mendoza",
      rol: "Docente de Tecnología",
      institucion: "IE Dinamarca",
      texto: "Ver a nuestros estudiantes presentar proyectos de calidad fue gratificante. El evento nos motivó a seguir innovando en el aula.",
      avatar: "👨‍🏫"
    },
    {
      nombre: "Rector Miguel Ángel",
      rol: "Rector",
      institucion: "IE Nuestra Señora de Fátima",
      texto: "La Semana STEM fortalece nuestra comunidad educativa. Es un espacio donde la innovación es protagonista.",
      avatar: "👨‍💼"
    }
  ];

  const agenda = [
    { hora: "8:00 AM", actividad: "Registro y Bienvenida", responsable: "Equipo CID" },
    { hora: "8:30 AM", actividad: "Inauguración oficial", responsable: "Rectores" },
    { hora: "9:00 AM", actividad: "Taller 1: Robótica Educativa", responsable: "Master Teachers" },
    { hora: "10:30 AM", actividad: "Receso", responsable: "" },
    { hora: "11:00 AM", actividad: "Taller 2: Programación Python", responsable: "Gestores" },
    { hora: "12:30 PM", actividad: "Almuerzo", responsable: "" },
    { hora: "2:00 PM", actividad: "Taller 3: Diseño 3D y Fabricación", responsable: "Master Teachers" },
    { hora: "3:30 PM", actividad: "Presentación de Proyectos", responsable: "Estudiantes" },
    { hora: "5:00 PM", actividad: "Cierre y Premiación", responsable: "Equipo CID" }
  ];

  const siguienteFoto = () => {
    setFotoActual((prev) => (prev + 1) % galeria.length);
  };

  const fotoAnterior = () => {
    setFotoActual((prev) => (prev - 1 + galeria.length) % galeria.length);
  };

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
          { label: "Eventos", href: "/eventos" },
          { label: evento.titulo }
        ]} />

        {/* A) Encabezado */}
        <section className="mb-12">
          <div className="rounded-lg overflow-hidden mb-6">
            <img 
              src={evento.imagen} 
              alt={evento.titulo}
              className="w-full h-96 object-cover"
            />
          </div>
          <h1 className="text-4xl font-bold mb-2">{evento.titulo}</h1>
          <p className="text-xl text-muted-foreground mb-6">{evento.subtitulo}</p>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-3 bg-muted p-4 rounded-lg">
              <Calendar className="h-6 w-6 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Fechas</p>
                <p className="font-semibold">{evento.fechas}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-muted p-4 rounded-lg">
              <MapPin className="h-6 w-6 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Lugar</p>
                <p className="font-semibold">{evento.lugar}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-muted p-4 rounded-lg">
              <Users className="h-6 w-6 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Público</p>
                <p className="font-semibold">500+ participantes</p>
              </div>
            </div>
          </div>
        </section>

        {/* B) Descripción General */}
        <section className="mb-12 bg-muted/30 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Acerca del Evento</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">{evento.descripcion}</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-lg mb-3">Objetivos</h3>
              <ul className="space-y-2">
                {evento.objetivos.map((obj, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span className="text-muted-foreground">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3">Información Clave</h3>
              <p className="text-muted-foreground mb-3"><strong>Público Objetivo:</strong> {evento.publico}</p>
              <p className="text-muted-foreground"><strong>Importancia:</strong> {evento.importancia}</p>
            </div>
          </div>
        </section>

        {/* C) Vivencias del Evento */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Vivencias del Evento</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{vivencias}</p>
            </CardContent>
          </Card>
        </section>

        {/* D) Galería de Fotos */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Galería de Fotos</h2>
          
          <div className="mb-6">
            <div className="relative h-96 rounded-lg overflow-hidden mb-4">
              <img 
                src={galeria[fotoActual]} 
                alt={`Foto ${fotoActual + 1}`}
                className="w-full h-full object-cover"
              />
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full"
                onClick={fotoAnterior}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full"
                onClick={siguienteFoto}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-2">
            {galeria.map((foto, idx) => (
              <Dialog key={`foto-${idx}`}>
                <DialogTrigger asChild>
                  <img 
                    src={foto} 
                    alt={`Miniatura ${idx + 1}`}
                    className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-75 transition-opacity"
                  />
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <img src={foto} alt="Foto ampliada" className="w-full rounded" />
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </section>

        {/* E) Videos del Evento */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Videos del Evento</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {videos.map((video, idx) => (
              <Dialog key={`video-${idx}`}>
                <DialogTrigger asChild>
                  <div className="relative group cursor-pointer rounded-lg overflow-hidden bg-black h-48">
                    <img 
                      src={galeria[idx % galeria.length]} 
                      alt={video.titulo}
                      className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
                      <Play className="h-12 w-12 text-white" />
                    </div>
                    <p className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 text-sm font-semibold">
                      {video.titulo}
                    </p>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <iframe
                    width="100%"
                    height="400"
                    src={video.url}
                    title={video.titulo}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </section>

        {/* F) Testimonios */}
        <section className="mb-12 bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-8 text-center">Testimonios</h2>
          
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
                />
              ))}
            </div>
          </div>
        </section>

        {/* G) Calendario del Evento */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Calendario del Evento</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-7 gap-2 mb-6">
                {["L", "M", "M", "J", "V", "S", "D"].map((dia, idx) => (
                  <div key={`dia-${idx}`} className="text-center font-bold text-sm">{dia}</div>
                ))}
                {Array.from({ length: 14 }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`p-3 text-center rounded text-sm ${
                      idx >= 14 && idx <= 18 
                        ? "bg-primary text-white font-bold" 
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {idx + 1}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Marzo 2025 - Días destacados: 15-19 (Semana STEM)
              </p>
            </CardContent>
          </Card>
        </section>

        {/* H) Agenda / Cronograma */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Agenda del Evento (Hora a Hora)</h2>
          <div className="space-y-3">
            {agenda.map((item, idx) => (
              <Card key={idx}>
                <CardContent className="pt-4 pb-4">
                  <div className="grid md:grid-cols-4 gap-4 items-center">
                    <div className="font-bold text-lg text-primary">{item.hora}</div>
                    <div className="md:col-span-2">
                      <p className="font-semibold">{item.actividad}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">{item.responsable}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* J) Memorias */}
        <section className="mb-12 bg-muted/30 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Memorias del Evento</h2>
          <p className="text-muted-foreground mb-6">
            Descarga la memoria completa del evento con fotos, estadísticas y conclusiones.
          </p>
          <Button size="lg">
            📄 Descargar Memorias (PDF)
          </Button>
          
          <div className="mt-6">
            <h3 className="font-bold mb-3">Documentos Adicionales</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-primary">📋</span>
                <a href="#" className="text-primary hover:underline">Resumen Ejecutivo</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">📊</span>
                <a href="#" className="text-primary hover:underline">Estadísticas de Participación</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">🏆</span>
                <a href="#" className="text-primary hover:underline">Proyectos Ganadores</a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
