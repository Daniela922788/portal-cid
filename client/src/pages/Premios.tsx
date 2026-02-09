import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";

const premios = [
  { titulo: "Territorio STEM+", descripcion: "Reconocimiento MinCiencias" },
  { titulo: "Ciudad del Aprendizaje", descripcion: "UNESCO" },
  { titulo: "Mejor Ecosistema Educativo", descripcion: "Premio Nacional" }
];

export default function Premios() {
  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <Breadcrumbs items={[{ label: "Premios y Reconocimientos" }]} />
        <h1 className="text-4xl font-bold mb-8">Premios y Reconocimientos</h1>
        <div className="grid md:grid-cols-3 gap-6">
          {premios.map((p, i) => (
            <Card key={i} className="text-center">
              <CardHeader>
                <Award className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>{p.titulo}</CardTitle>
              </CardHeader>
              <CardContent><p className="text-muted-foreground">{p.descripcion}</p></CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}