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
  const showCoursesCarousel = false;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        <img
          src="/banners/banner-principal.png"
          alt="Banner principal Portal de Innovación Educativa CID"
          loading="eager"
          fetchPriority="high"
          decoding="sync"
          className="w-full h-auto object-cover"
        />
      </section>

      {/* Carrusel de Cursos */}
      {showCoursesCarousel && <CoursesCarouselNew />}

      {/* Misión, Visión, Objetivo */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/nosotros">
              <Card className="h-full cursor-pointer transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Lightbulb className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Que Somos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    La Dirección de Investigación y Desarrollo (CID) es un espacio académico y formativo que promueve la investigación, la innovación y el pensamiento crítico dentro de nuestra institución educativa. Nace con el propósito de fortalecer las competencias científicas, tecnológicas y sociales de nuestros estudiantes, fomentando una cultura investigativa desde edades tempranas.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/formacion">
              <Card className="h-full cursor-pointer transition-shadow hover:shadow-lg">
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
            </Link>

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
                className="h-full hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <Microscope className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Territorio STEM</CardTitle>
                  <CardDescription>
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

      {/* Banner Semana STEM */}
      <section className="relative w-full overflow-hidden">
        <Link href="/semana-stem-complete" aria-label="Ir a la sección Semana STEM" className="group relative block cursor-pointer">
          <img
            src="/banners/Banner-semana.png"
            alt="Banner Semana STEM"
            loading="lazy"
            fetchPriority="high"
            decoding="async"
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.01]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/25"
          />
        </Link>
      </section>

      {/* Logos de Ministerios y Entidades */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-4 items-center gap-3 md:gap-6">
            <a href="https://www.mineducacion.gov.co/portal/" target="_blank" rel="noopener noreferrer">
              <div className="flex flex-col items-center hover:opacity-80 transition-opacity cursor-pointer">
                <img 
                  src={educacionLogo} 
                  alt="Ministerio de Educación" 
                  className="h-14 w-auto object-contain sm:h-20 md:h-24"
                />
              </div>
            </a>

            <a href="https://minciencias.gov.co/" target="_blank" rel="noopener noreferrer">
              <div className="flex flex-col items-center hover:opacity-80 transition-opacity cursor-pointer">
                <img 
                  src={cienciasLogo} 
                  alt="Ciencias" 
                  className="h-14 w-auto object-contain sm:h-20 md:h-24"
                />
              </div>
            </a>

            <a href="https://www.mintic.gov.co/portal/inicio/" target="_blank" rel="noopener noreferrer">
              <div className="flex flex-col items-center hover:opacity-80 transition-opacity cursor-pointer">
                <img 
                  src={ticLogo} 
                  alt="TIC" 
                  className="h-14 w-auto object-contain sm:h-20 md:h-24"
                />
              </div>
            </a>

            <a href="https://www.envigado.gov.co/" target="_blank" rel="noopener noreferrer">
              <div className="flex flex-col items-center hover:opacity-80 transition-opacity cursor-pointer">
                <img 
                  src={alcaldiaLogo} 
                  alt="Alcaldía de Envigado" 
                  className="h-14 w-auto object-contain sm:h-20 md:h-24"
                />
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
