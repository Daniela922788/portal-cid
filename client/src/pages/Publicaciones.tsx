import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

const publicaciones = [
  { titulo: "Innovación Educativa en Envigado", tipo: "Libro", año: "2024" },
  { titulo: "Revista STEM Educativa", tipo: "Revista", año: "2024" }
];

export default function Publicaciones() {
  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <Breadcrumbs items={[{ label: "Publicaciones" }]} />
        <h1 className="text-4xl font-bold mb-8">Publicaciones</h1>
        <div className="grid md:grid-cols-3 gap-6">
          {publicaciones.map((p, i) => (
            <Card key={i}><CardHeader><BookOpen className="h-8 w-8 text-primary mb-2" />
            <CardTitle>{p.titulo}</CardTitle></CardHeader>
            <CardContent><p className="text-muted-foreground">{p.tipo} - {p.año}</p></CardContent></Card>
          ))}
        </div>
      </div>
    </div>
  );
}