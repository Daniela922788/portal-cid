import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface Photo {
  id: string;
  category: string;
  title: string;
  image: string;
}

const photos: Photo[] = [
  // Centro de Ciencia
  { id: "1", category: "Centro de Ciencia", title: "Laboratorio de Física", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop" },
  { id: "2", category: "Centro de Ciencia", title: "Aula de Biología", image: "https://images.unsplash.com/photo-1576091160550-112173f7f869?w=800&h=600&fit=crop" },
  { id: "3", category: "Centro de Ciencia", title: "Estudiantes experimentando", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop" },
  
  // Centro Audiovisual
  { id: "4", category: "Centro Audiovisual", title: "Estudio de grabación", image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&h=600&fit=crop" },
  { id: "5", category: "Centro Audiovisual", title: "Cabina de edición", image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=600&fit=crop" },
  { id: "6", category: "Centro Audiovisual", title: "Equipos profesionales", image: "https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=800&h=600&fit=crop" },
  
  // Historia CID
  { id: "7", category: "Historia CID", title: "Fundación 2014", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop" },
  { id: "8", category: "Historia CID", title: "Primeros proyectos", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop" },
  { id: "9", category: "Historia CID", title: "Crecimiento institucional", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop" },
  
  // Actividades Institucionales
  { id: "10", category: "Actividades institucionales", title: "Semana STEM", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop" },
  { id: "11", category: "Actividades institucionales", title: "Feria de Ciencia", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop" },
  { id: "12", category: "Actividades institucionales", title: "Competencia de Robótica", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop" }
];

const categories = ["Centro de Ciencia", "Centro Audiovisual", "Historia CID", "Actividades institucionales"];

export default function PhotoGallery() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  
  const filteredPhotos = photos.filter(photo => photo.category === selectedCategory);
  const selectedIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto?.id);

  const handlePrevPhoto = () => {
    if (selectedIndex > 0) {
      setSelectedPhoto(filteredPhotos[selectedIndex - 1]);
    }
  };

  const handleNextPhoto = () => {
    if (selectedIndex < filteredPhotos.length - 1) {
      setSelectedPhoto(filteredPhotos[selectedIndex + 1]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Filtros de categoría */}
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => {
              setSelectedCategory(category);
              setSelectedPhoto(null);
            }}
            className="rounded-full"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Grid de fotos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            className="relative overflow-hidden rounded-lg cursor-pointer group"
            onClick={() => setSelectedPhoto(photo)}
          >
            <img
              src={photo.image}
              alt={photo.title}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end p-4">
              <h3 className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                {photo.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 border-0">
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          {selectedPhoto && (
            <div className="relative w-full h-full flex flex-col items-center justify-center bg-black">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="max-w-full max-h-[70vh] object-contain"
              />
              
              <div className="w-full p-6 bg-black/80 text-white text-center">
                <h2 className="text-2xl font-bold mb-2">{selectedPhoto.title}</h2>
                <p className="text-sm text-gray-300">{selectedPhoto.category}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {selectedIndex + 1} de {filteredPhotos.length}
                </p>
              </div>

              {/* Navegación */}
              <button
                onClick={handlePrevPhoto}
                disabled={selectedIndex === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 disabled:opacity-30 text-white p-2 rounded-full transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={handleNextPhoto}
                disabled={selectedIndex === filteredPhotos.length - 1}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 disabled:opacity-30 text-white p-2 rounded-full transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
