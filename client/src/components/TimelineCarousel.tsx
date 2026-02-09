import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface TimelineItem {
  year: number;
  title: string;
  description: string;
  image: string;
}

const timelineData: TimelineItem[] = [
  {
    year: 2014,
    title: "Fundación del CID",
    description: "Se crea el Centro de Innovación Educativa dedicado a promover la excelencia en educación STEM",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
  },
  {
    year: 2015,
    title: "Primer Laboratorio STEM",
    description: "Se inaugura el primer laboratorio de robótica y programación en las instituciones educativas",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop"
  },
  {
    year: 2016,
    title: "Expansión a 5 IE",
    description: "El programa se expande a 5 instituciones educativas del municipio de Envigado",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
  },
  {
    year: 2017,
    title: "Centro de Ciencia",
    description: "Se inaugura el Centro de Ciencia con aulas especializadas y laboratorios modernos",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop"
  },
  {
    year: 2018,
    title: "Centro Audiovisual",
    description: "Creación del Centro Audiovisual para producción de contenidos educativos",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=400&fit=crop"
  },
  {
    year: 2019,
    title: "Territorio STEM Envigado",
    description: "Lanzamiento del Territorio STEM Envigado con participación de 12 instituciones",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
  },
  {
    year: 2020,
    title: "Adaptación Digital",
    description: "Transición exitosa a educación virtual durante la pandemia manteniendo calidad",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop"
  },
  {
    year: 2021,
    title: "Reconocimiento Nacional",
    description: "El CID recibe reconocimiento nacional como modelo de innovación educativa",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
  },
  {
    year: 2022,
    title: "Territorio STEM+ Itagüí",
    description: "Expansión del modelo a Itagüí con 6 nuevas instituciones educativas",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop"
  }
];

export default function TimelineCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 3;
  const maxIndex = Math.max(0, timelineData.length - itemsPerView);

  const handlePrev = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex(Math.min(maxIndex, currentIndex + 1));
  };

  const visibleItems = timelineData.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <div className="space-y-8">
      <div className="relative">
        {/* Carrusel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleItems.map((item, idx) => (
            <Card key={item.year} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-yellow-400 text-black font-bold px-4 py-2 rounded-lg text-lg">
                  {item.year}
                </div>
              </div>
              <CardContent className="pt-6">
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Flechas de navegación */}
        <Button
          variant="outline"
          size="icon"
          className="absolute -left-12 top-1/2 -translate-y-1/2 hidden lg:flex"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute -right-12 top-1/2 -translate-y-1/2 hidden lg:flex"
          onClick={handleNext}
          disabled={currentIndex === maxIndex}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Puntos indicadores */}
      <div className="flex justify-center gap-2">
        {Array.from({ length: Math.ceil(timelineData.length / itemsPerView) }).map((_, idx) => (
          <button
            key={idx}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === Math.floor(currentIndex / itemsPerView)
                ? "bg-primary w-8"
                : "bg-muted-foreground/30"
            }`}
            onClick={() => setCurrentIndex(Math.min(idx * itemsPerView, maxIndex))}
          />
        ))}
      </div>
    </div>
  );
}
