import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
}

const courses: Course[] = [
  {
    id: 1,
    title: "Introducción a la Robótica",
    description: "Aprende los fundamentos de la robótica educativa con Arduino y Scratch",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop"
  },
  {
    id: 2,
    title: "Pensamiento Computacional",
    description: "Desarrolla habilidades de resolución de problemas con programación",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop"
  },
  {
    id: 3,
    title: "Ciencia de Datos para Educadores",
    description: "Analiza y visualiza datos educativos para mejorar tu práctica docente",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
  },
  {
    id: 4,
    title: "Diseño 3D y Fabricación Digital",
    description: "Crea objetos tridimensionales y aprende sobre impresión 3D",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop"
  },
  {
    id: 5,
    title: "Metodologías Activas de Aprendizaje",
    description: "Transforma tu aula con estrategias innovadoras y participativas",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop"
  }
];

export default function CoursesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % courses.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + courses.length) % courses.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full py-12 bg-gradient-to-b from-muted/30 to-background">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Cursos Destacados</h2>
          <p className="text-muted-foreground">Explora nuestra oferta de formación continua</p>
        </div>

        <div className="relative">
          {/* Carrusel */}
          <div className="overflow-hidden">
            <div className="flex items-center justify-center gap-4 px-4">
              {/* Mostrar 3 tarjetas en desktop, 2 en tablet, 1 en móvil */}
              <div className="hidden lg:block lg:w-1/4 opacity-60">
                {courses[(currentIndex - 1 + courses.length) % courses.length] && (
                  <Card className="h-full">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={courses[(currentIndex - 1 + courses.length) % courses.length].image} 
                        alt={courses[(currentIndex - 1 + courses.length) % courses.length].title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg line-clamp-1">
                        {courses[(currentIndex - 1 + courses.length) % courses.length].title}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                )}
              </div>

              {/* Tarjeta principal (centrada) */}
              <div className="w-full md:w-1/2 lg:w-1/3">
                <Card className="border-2 border-primary shadow-xl transform scale-105">
                  <div className="h-56 overflow-hidden">
                    <img 
                      src={courses[currentIndex].image} 
                      alt={courses[currentIndex].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{courses[currentIndex].title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{courses[currentIndex].description}</p>
                    <Button className="w-full">Ver Curso</Button>
                  </CardContent>
                </Card>
              </div>

              {/* Tarjeta derecha (solo desktop) */}
              <div className="hidden lg:block lg:w-1/4 opacity-60">
                {courses[(currentIndex + 1) % courses.length] && (
                  <Card className="h-full">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={courses[(currentIndex + 1) % courses.length].image} 
                        alt={courses[(currentIndex + 1) % courses.length].title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg line-clamp-1">
                        {courses[(currentIndex + 1) % courses.length].title}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                )}
              </div>
            </div>
          </div>

          {/* Flechas de navegación */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full shadow-lg"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full shadow-lg"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Indicadores (puntos) */}
          <div className="flex justify-center gap-2 mt-6">
            {courses.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex 
                    ? "bg-primary w-8" 
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Ir al curso ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
