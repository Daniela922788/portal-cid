import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Gestor {
  id: number;
  nombre: string;
  tipo: "STEM" | "Investigación";
  foto: string;
}

const gestoresData: Gestor[] = [
  { id: 1, nombre: "María González", tipo: "STEM", foto: "https://i.pravatar.cc/150?img=1" },
  { id: 2, nombre: "Carlos Ramírez", tipo: "Investigación", foto: "https://i.pravatar.cc/150?img=12" },
  { id: 3, nombre: "Ana Martínez", tipo: "STEM", foto: "https://i.pravatar.cc/150?img=5" },
  { id: 4, nombre: "Luis Pérez", tipo: "STEM", foto: "https://i.pravatar.cc/150?img=13" },
  { id: 5, nombre: "Sandra López", tipo: "Investigación", foto: "https://i.pravatar.cc/150?img=9" },
  { id: 6, nombre: "Jorge Henao", tipo: "STEM", foto: "https://i.pravatar.cc/150?img=14" }
];

export default function Gestores() {

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Gestores de Innovación" }]} />
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Gestores de Innovación</h1>
          <p className="text-xl text-muted-foreground">
            Conoce a los docentes que lideran la innovación educativa en nuestras instituciones
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {gestoresData.map((gestor) => (
            <Card 
              key={gestor.id} 
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader className="text-center">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-muted">
                  <img src={gestor.foto} alt={gestor.nombre} className="w-full h-full object-cover" />
                </div>
                <CardTitle className="text-lg">{gestor.nombre}</CardTitle>
                <Badge variant={gestor.tipo === "STEM" ? "default" : "secondary"} className="mx-auto">{gestor.tipo}</Badge>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

    </div>
  );
}
