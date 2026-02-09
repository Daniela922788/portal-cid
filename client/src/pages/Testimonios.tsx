import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const testimonios = [
  { nombre: "María González", rol: "Rectora", texto: "El CID ha transformado nuestra institución" },
  { nombre: "Carlos Ramírez", rol: "Docente", texto: "Excelente apoyo para proyectos innovadores" }
];

export default function Testimonios() {
  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <Breadcrumbs items={[{ label: "Testimonios" }]} />
        <h1 className="text-4xl font-bold mb-8">Testimonios STEM</h1>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonios.map((t, i) => (
            <Card key={i}><CardHeader><CardTitle>{t.nombre}</CardTitle>
            <Badge>{t.rol}</Badge></CardHeader>
            <CardContent><p className="text-muted-foreground italic">"{t.texto}"</p></CardContent></Card>
          ))}
        </div>
      </div>
    </div>
  );
}