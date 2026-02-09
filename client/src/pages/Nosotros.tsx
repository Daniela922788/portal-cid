import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import TimelineCarousel from "@/components/TimelineCarousel";
import PhotoGallery from "@/components/PhotoGallery";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Lightbulb, 
  Target, 
  Eye, 
  Zap,
  Palette,
  Leaf,
  Facebook, 
  Instagram, 
  Youtube,
  MessageCircle
} from "lucide-react";

const pillars = [
  {
    icon: Lightbulb,
    title: "Formación",
    description: "Todo lo que hacemos es con base en la formación; cada proyecto o iniciativa integra TIC como parte esencial.",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: Zap,
    title: "Innovación",
    description: "La innovación cierra brechas, transfiere conocimiento y conecta a las personas.",
    color: "from-yellow-500 to-yellow-600"
  },
  {
    icon: Palette,
    title: "Creatividad",
    description: "La creatividad es la base del pensamiento crítico, la resolución de problemas y la evolución humana.",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: Leaf,
    title: "Sostenibilidad",
    description: "Cada proyecto refleja nuestra calidad, valores y compromiso con la permanencia y continuidad.",
    color: "from-green-500 to-green-600"
  }
];

export default function Nosotros() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen pb-20">
      <div className="container py-8">
        <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Nosotros" }]} />
        
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Portal de Innovación Educativa CID
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transformando la educación a través de la innovación, la investigación y el desarrollo STEM
          </p>
        </div>

        {/* 1. Línea de Tiempo */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-2 text-center">Nuestra Historia</h2>
          <p className="text-muted-foreground text-center mb-8">Evolución del CID desde 2014 hasta hoy</p>
          <TimelineCarousel />
        </section>

        {/* 2. Galería Fotográfica */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-2 text-center">Galería Institucional</h2>
          <p className="text-muted-foreground text-center mb-8">Conoce nuestras instalaciones y actividades</p>
          <PhotoGallery />
        </section>

        {/* 3. Centro de Ciencia */}
        <section className="mb-20">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Centro de Ciencia</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                El Centro de Ciencia es nuestro espacio dedicado a la experimentación y el aprendizaje práctico. 
                Cuenta con aulas especializadas, laboratorios modernos y equipos de última tecnología.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>Propósito:</strong> Facilitar experiencias de aprendizaje significativas donde estudiantes 
                y docentes puedan experimentar, descubrir y crear soluciones innovadoras.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                <strong>Impacto:</strong> Más de 5,000 estudiantes han participado en actividades STEM, 
                desarrollando habilidades de pensamiento crítico y resolución de problemas.
              </p>
              <Button className="rounded-full">Ver más</Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop" alt="Centro de Ciencia" className="rounded-lg w-full h-48 object-cover" />
              <img src="https://images.unsplash.com/photo-1576091160550-112173f7f869?w=400&h=300&fit=crop" alt="Laboratorio" className="rounded-lg w-full h-48 object-cover" />
              <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop" alt="Estudiantes" className="rounded-lg w-full h-48 object-cover" />
              <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop" alt="Robótica" className="rounded-lg w-full h-48 object-cover" />
            </div>
          </div>
        </section>

        {/* 4. Centro Audiovisual */}
        <section className="mb-20 bg-muted/30 rounded-xl p-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="grid grid-cols-2 gap-4 order-2 lg:order-1">
              <img src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=300&fit=crop" alt="Estudio" className="rounded-lg w-full h-48 object-cover" />
              <img src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=300&fit=crop" alt="Edición" className="rounded-lg w-full h-48 object-cover" />
              <img src="https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=400&h=300&fit=crop" alt="Equipos" className="rounded-lg w-full h-48 object-cover" />
              <img src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=300&fit=crop" alt="Producción" className="rounded-lg w-full h-48 object-cover" />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold mb-4">Centro Audiovisual</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Nuestro Centro Audiovisual es un espacio de producción de contenidos educativos de alta calidad. 
                Cuenta con estudios de grabación, cabinas de edición y equipos profesionales.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>Servicios:</strong> Producción de videos educativos, documentales, tutoriales, 
                transmisiones en vivo y contenido multimedia para plataformas digitales.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                <strong>Alcance:</strong> Más de 50,000 visualizaciones de contenido educativo producido 
                en nuestras instalaciones.
              </p>
              <Button className="rounded-full">Ver más</Button>
            </div>
          </div>
        </section>

        {/* 5. Los 4 Pilares */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-2 text-center">Los 4 Pilares del CID</h2>
          <p className="text-muted-foreground text-center mb-12">Principios fundamentales que guían nuestro trabajo</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <Card key={idx} className="hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${pillar.color} flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{pillar.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* 6. Misión, Visión, Objetivos */}
        <section className="mb-20">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Misión</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Promover la innovación educativa y el desarrollo de competencias STEM en las instituciones 
                  educativas oficiales, fortaleciendo las capacidades de docentes y estudiantes para enfrentar 
                  los desafíos del siglo XXI.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-secondary/20">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Visión</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Ser reconocidos como el centro de innovación educativa líder en la región, impulsando la 
                  transformación educativa a través de la investigación, la tecnología y la colaboración 
                  con aliados estratégicos.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/20">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-950 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Objetivos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Fortalecer el ecosistema educativo STEM</li>
                  <li>• Formar gestores de innovación</li>
                  <li>• Crear espacios de aprendizaje significativo</li>
                  <li>• Impactar positivamente la comunidad educativa</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 7. Redes Sociales */}
        <section className="text-center mb-20">
          <h2 className="text-3xl font-bold mb-8">Síguenos en Redes Sociales</h2>
          <div className="flex justify-center gap-8 flex-wrap">
            <a 
              href="https://facebook.com/cidenvig" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group"
            >
              <div className="w-20 h-20 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-all transform group-hover:scale-110 shadow-lg">
                <Facebook className="h-10 w-10 text-white" />
              </div>
              <p className="text-sm mt-3 font-medium">Facebook</p>
            </a>

            <a 
              href="https://instagram.com/cidenvig" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 flex items-center justify-center transition-all transform group-hover:scale-110 shadow-lg">
                <Instagram className="h-10 w-10 text-white" />
              </div>
              <p className="text-sm mt-3 font-medium">Instagram</p>
            </a>

            <a 
              href="https://twitter.com/cidenvig" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group"
            >
              <div className="w-20 h-20 rounded-full bg-black hover:bg-gray-800 flex items-center justify-center transition-all transform group-hover:scale-110 shadow-lg">
                <svg className="h-9 w-9 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </div>
              <p className="text-sm mt-3 font-medium">X (Twitter)</p>
            </a>

            <a 
              href="https://youtube.com/@cidenvig" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group"
            >
              <div className="w-20 h-20 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition-all transform group-hover:scale-110 shadow-lg">
                <Youtube className="h-10 w-10 text-white" />
              </div>
              <p className="text-sm mt-3 font-medium">YouTube</p>
            </a>
          </div>
        </section>
      </div>

      {/* 8. Botón Flotante WhatsApp */}
      <a
        href="https://wa.me/573001234567?text=Hola%20CID,%20necesito%20información"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-all transform hover:scale-110 z-40"
      >
        <MessageCircle className="h-8 w-8 text-white" />
      </a>
    </div>
  );
}
