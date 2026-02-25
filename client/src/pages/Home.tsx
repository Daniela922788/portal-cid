import { Link } from "wouter";
import CoursesCarouselNew from "@/components/CoursesCarouselNew";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Lightbulb, 
  Users, 
  BookOpen, 
  Award, 
  Newspaper, 
  Calendar,
  Microscope,
  GraduationCap,
  Sparkles,
  HeartHandshake
} from "lucide-react";
 
import educacionLogo from "@/assets/educacion-logo.png";
import alcaldiaLogo from "@/assets/alcaldia-envigado-logo.png";
import cienciasLogo from "@/assets/ciencias-logo.png";
import ticLogo from "@/assets/tic-logo.png";
export default function Home() {
  // Authentication state is managed by the app context
  // Users can login via the header button

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-secondary text-white py-20 md:py-32">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Portal de Innovación Educativa CID
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-50">
              Transformando la educación a través de la innovación, la investigación y el desarrollo STEM
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/proyectos">
                <Button size="lg" variant="secondary" className="text-lg">
                  Explorar Proyectos
                </Button>
              </Link>
              <Link href="/mesa-ayuda">
                <Button size="lg" variant="outline" className="text-lg bg-white/10 hover:bg-white/20 text-white border-white">
                  Contáctanos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Carrusel de Cursos */}
      <CoursesCarouselNew />

      {/* Misión, Visión, Objetivo */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Que Somos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  El Centro de Investigación y Desarrollo (CID) es un espacio académico y formativo que promueve la investigación, la innovación y el pensamiento crítico dentro de nuestra institución educativa. Nace con el propósito de fortalecer las competencias científicas, tecnológicas y sociales de nuestros estudiantes, fomentando una cultura investigativa desde edades tempranas.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>Formación General</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  El Centro de Investigación y Desarrollo promueve la formación integral de los estudiantes, fortaleciendo el pensamiento crítico, la responsabilidad social y las habilidades necesarias para su desarrollo académico y personal.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Convocatorias</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Espacio donde se publican las oportunidades para participar en proyectos, investigaciones y actividades del Centro de Investigación y Desarrollo.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Accesos Rápidos */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explora Nuestras Secciones</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubre todo lo que el CID tiene para ofrecer a la comunidad educativa
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <Link href="/territorio-stem">
              <Card
                className="h-full hover:shadow-lg transition-shadow cursor-pointer group overflow-hidden relative"
                style={{
                  backgroundImage: "image-set( url('/images/Fondoprueba@1600.avif') type('image/avif'), url('/images/Fondoprueba@1600.webp') type('image/webp'), url('/images/Fondoprueba.png') type('image/png') ), url('https://files.manuscdn.com/user_upload_by_module/session_file/310519663221068197/QLvxXkXmkaeIKFpu.png')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <div className="absolute inset-0 bg-black/40"></div>
                <CardHeader className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center mb-3 group-hover:bg-white/30 transition-colors">
                    <Microscope className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg text-white">Territorio STEM</CardTitle>
                  <CardDescription className="text-white/80">
                    Conoce el ecosistema STEM de Envigado, sus actores, proyectos y oportunidades para estudiantes y docentes. 
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/reconocimientos">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-3 group-hover:bg-secondary/20 transition-colors">
                    <Newspaper className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle className="text-lg">Premios y reconocimientos</CardTitle>
                  <CardDescription>
                    Explora los reconocimientos que reflejan nuestro compromiso con la excelencia.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/aliados">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-3 group-hover:bg-accent/20 transition-colors">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-lg">Aliados</CardTitle>
                  <CardDescription>
                    Descubre a nuestros aliados estratégicos que impulsan la innovación educativa en nuestra comunidad.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/cid-kids">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">CID Kids</CardTitle>
                  <CardDescription>
                    Conoce nuestro programa diseñado para fomentar la curiosidad y el amor por la ciencia en los más pequeños.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

{/* Banner de Innovación con Robot */}
      <section className="relative py-20 md:py-24 overflow-hidden" style={{
        backgroundImage: 'linear-gradient(135deg, #0ea5a5 0%, #10b981 100%)',
        minHeight: '350px'
      }}>
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Contenido de texto */}
            <div className="text-white z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                La innovación es el futuro de la educación
              </h2>
              <p className="text-lg md:text-xl mb-8 text-white/90">
                Descubre cómo la tecnología y la creatividad transforman la manera de aprender y enseñar en nuestras instituciones educativas.
              </p>
              <Link href="/noticias">
                <Button size="lg" variant="secondary" className="text-lg">
                  Leer Noticias
                </Button>
              </Link>
            </div>
            
            {/* Imagen del robot */}
            <div className="flex justify-center md:justify-end">
              <img 
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663221068197/DkTNcWRuzslfqEVB.png" 
                alt="Robot de Innovación" 
                className="w-full max-w-md h-auto drop-shadow-lg"
                style={{ maxHeight: '350px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Logos de Ministerios y Entidades */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <a href="https://www.mineducacion.gov.co/portal/" target="_blank" rel="noopener noreferrer">
              <div className="flex flex-col items-center hover:opacity-80 transition-opacity cursor-pointer">
                <img 
                  src={educacionLogo} 
                  alt="Ministerio de Educación" 
                  className="h-32 w-auto object-contain"
                />
              </div>
            </a>

            <a href="https://minciencias.gov.co/" target="_blank" rel="noopener noreferrer">
              <div className="flex flex-col items-center hover:opacity-80 transition-opacity cursor-pointer">
                <img 
                  src={cienciasLogo} 
                  alt="Ciencias" 
                  className="h-32 w-auto object-contain"
                />
              </div>
            </a>

            <a href="https://www.mintic.gov.co/portal/inicio/" target="_blank" rel="noopener noreferrer">
              <div className="flex flex-col items-center hover:opacity-80 transition-opacity cursor-pointer">
                <img 
                  src={ticLogo} 
                  alt="TIC" 
                  className="h-32 w-auto object-contain"
                />
              </div>
            </a>

            <a href="https://www.envigado.gov.co/" target="_blank" rel="noopener noreferrer">
              <div className="flex flex-col items-center hover:opacity-80 transition-opacity cursor-pointer">
                <img 
                  src={alcaldiaLogo} 
                  alt="Alcaldía de Envigado" 
                  className="h-32 w-auto object-contain"
                />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-primary to-secondary text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Quieres ser parte del cambio educativo?
          </h2>
          <p className="text-xl mb-8 text-blue-50 max-w-2xl mx-auto">
            Únete a nuestra comunidad de innovadores educativos y transforma la manera de enseñar y aprender
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/formacion">
              <Button size="lg" variant="secondary" className="text-lg">
                Ver Formación
              </Button>
            </Link>
            <Link href="/convocatorias">
              <Button size="lg" variant="outline" className="text-lg bg-white/10 hover:bg-white/20 text-white border-white">
                Convocatorias Abiertas
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
