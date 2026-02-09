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
                <CardTitle>Misión</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Promover la innovación educativa y el desarrollo de competencias STEM en las instituciones educativas oficiales, fortaleciendo las capacidades de docentes y estudiantes para enfrentar los desafíos del siglo XXI.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>Visión</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ser reconocidos como el centro de innovación educativa líder en la región, impulsando la transformación educativa a través de la investigación, la tecnología y la colaboración con aliados estratégicos.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Objetivo</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Fortalecer el ecosistema educativo mediante la implementación de proyectos innovadores, la formación continua de gestores de innovación y la creación de espacios de aprendizaje significativo.
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
            <Link href="/proyectos">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <Microscope className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Proyectos STEM</CardTitle>
                  <CardDescription>
                    Explora proyectos de investigación e innovación
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/noticias">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-3 group-hover:bg-secondary/20 transition-colors">
                    <Newspaper className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle className="text-lg">Noticias</CardTitle>
                  <CardDescription>
                    Mantente informado sobre nuestras actividades
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/territorio-stem">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-3 group-hover:bg-accent/20 transition-colors">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-lg">Territorio STEM</CardTitle>
                  <CardDescription>
                    Conoce el ecosistema STEM de Envigado
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/gestores">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Gestores de Innovación</CardTitle>
                  <CardDescription>
                    Conoce a nuestros gestores y sus experiencias
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/ie-oficiales">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-3 group-hover:bg-secondary/20 transition-colors">
                    <BookOpen className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle className="text-lg">IE Oficiales</CardTitle>
                  <CardDescription>
                    Instituciones educativas participantes
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/eventos">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-3 group-hover:bg-accent/20 transition-colors">
                    <Calendar className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-lg">Eventos</CardTitle>
                  <CardDescription>
                    Ferias, experiencias y actividades
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/cid-kids">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">CID Kids</CardTitle>
                  <CardDescription>
                    Juegos educativos y trivia STEM
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/mesa-ayuda">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-3 group-hover:bg-secondary/20 transition-colors">
                    <HeartHandshake className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle className="text-lg">Mesa de Ayuda</CardTitle>
                  <CardDescription>
                    Soporte y atención PQRS
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
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
