import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CoursesCarouselNew() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🔥 Cargar automáticamente todas las imágenes de la carpeta
  const images = useMemo(() => {
    const modules = import.meta.glob("/public/carousel/*.{jpg,jpeg,png,webp}", {
      eager: true,
      as: "url",
    });

    return Object.values(modules);
  }, []);

  if (!images || images.length === 0) return null;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full py-12 bg-gradient-to-b from-muted/30 to-background">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Cursos Destacados</h2>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div className="flex items-center justify-center gap-4 px-4">

              {/* Imagen izquierda (solo desktop) */}
              <div className="hidden lg:block lg:w-1/5 opacity-60">
                <div
                  className="rounded-lg overflow-hidden"
                  style={{ aspectRatio: "1080/1350" }}
                >
                  <img
                    src={images[(currentIndex - 1 + images.length) % images.length]}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Imagen central */}
              <div className="w-full md:w-2/3 lg:w-2/5">
                <div
                  className="rounded-lg shadow-xl transform scale-105 hover:scale-110 transition-transform duration-300 overflow-hidden"
                  style={{ aspectRatio: "1080/1350" }}
                >
                  <img
                    src={images[currentIndex]}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Imagen derecha (solo desktop) */}
              <div className="hidden lg:block lg:w-1/5 opacity-60">
                <div
                  className="rounded-lg overflow-hidden"
                  style={{ aspectRatio: "1080/1350" }}
                >
                  <img
                    src={images[(currentIndex + 1) % images.length]}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Flechas */}
          {images.length > 1 && (
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

          {/* Indicadores */}
          {images.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-primary w-8"
                      : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}