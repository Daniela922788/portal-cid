import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Skeleton } from "@/components/ui/skeleton";

export default function CoursesCarouselNew() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: cursos = [], isLoading } = trpc.courses.list.useQuery();
  
  // Filtrar solo cursos activos y con imagen
  const cursosActivos = cursos.filter(c => c.estado === "activo" && c.imagen);

  const nextSlide = () => {
    if (cursosActivos.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cursosActivos.length);
  };

  const prevSlide = () => {
    if (cursosActivos.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cursosActivos.length) % cursosActivos.length);
  };

  const goToSlide = (index: number) => {
    if (index >= 0 && index < cursosActivos.length) {
      setCurrentIndex(index);
    }
  };

  if (isLoading) {
    return (
      <div className="relative w-full py-12 bg-gradient-to-b from-muted/30 to-background">
        <div className="container">
          <div className="text-center mb-8">
            <Skeleton className="h-8 w-64 mx-auto mb-2" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>
          <div className="flex justify-center">
            <Skeleton className="w-full md:w-2/3 lg:w-2/5" style={{ aspectRatio: '1080/1350' }} />
          </div>
        </div>
      </div>
    );
  }

  if (cursosActivos.length === 0) {
    return null; // No mostrar carrusel si no hay cursos
  }

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
            <div className="flex items-center justify-center gap-4 px-4 transition-all duration-700 ease-in-out" style={{
              transform: `translateX(0)`,
              transition: 'transform 700ms cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
              {/* Tarjeta izquierda (solo desktop) */}
              <div className="hidden lg:block lg:w-1/5 opacity-60">
                {cursosActivos[(currentIndex - 1 + cursosActivos.length) % cursosActivos.length] && (
                  <Link href={`/curso/${cursosActivos[(currentIndex - 1 + cursosActivos.length) % cursosActivos.length].id}`}>
                    <div className="cursor-pointer rounded-lg overflow-hidden" style={{ aspectRatio: '1080/1350' }}>
                      <img 
                        src={cursosActivos[(currentIndex - 1 + cursosActivos.length) % cursosActivos.length].imagen || "/placeholder-course.jpg"} 
                        alt={cursosActivos[(currentIndex - 1 + cursosActivos.length) % cursosActivos.length].titulo}
                        className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                )}
              </div>

              {/* Tarjeta central (principal) */}
              <div className="w-full md:w-2/3 lg:w-2/5">
                <Link href={`/curso/${cursosActivos[currentIndex].id}`}>
                  <div className="cursor-pointer rounded-lg shadow-xl transform scale-105 hover:scale-110 transition-transform duration-300 overflow-hidden" style={{ aspectRatio: '1080/1350' }}>
                    <img 
                      src={cursosActivos[currentIndex].imagen || "/placeholder-course.jpg"} 
                      alt={cursosActivos[currentIndex].titulo}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </Link>
              </div>

              {/* Tarjeta derecha (solo desktop) */}
              <div className="hidden lg:block lg:w-1/5 opacity-60">
                {cursosActivos[(currentIndex + 1) % cursosActivos.length] && (
                  <Link href={`/curso/${cursosActivos[(currentIndex + 1) % cursosActivos.length].id}`}>
                    <div className="cursor-pointer rounded-lg overflow-hidden" style={{ aspectRatio: '1080/1350' }}>
                      <img 
                        src={cursosActivos[(currentIndex + 1) % cursosActivos.length].imagen || "/placeholder-course.jpg"} 
                        alt={cursosActivos[(currentIndex + 1) % cursosActivos.length].titulo}
                        className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Flechas de navegación */}
          {cursosActivos.length > 1 && (
            <>
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
            </>
          )}

          {/* Indicadores (puntos) */}
          {cursosActivos.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {cursosActivos.map((_, index) => (
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
          )}
        </div>
      </div>
    </div>
  );
}
