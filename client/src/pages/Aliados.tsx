import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const aliados = [
  { nombre: "Microsoft", descripcion: "Tecnología y formación digital" },
  { nombre: "Universidad Pontificia Bolivariana", descripcion: "Investigación y desarrollo" },
  { nombre: "Instituto Colombiano de Bienestar", descripcion: "Programas sociales" }
];

export default function Aliados() {
  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <Breadcrumbs items={[{ label: "Aliados" }]} />
        <h1 className="text-4xl font-bold mb-8">Aliados Estratégicos</h1>
        <div className="grid md:grid-cols-3 gap-6">
          {aliados.map((a, i) => (
            <Card key={i}><CardHeader><CardTitle>{a.nombre}</CardTitle></CardHeader>
            <CardContent><p className="text-muted-foreground">{a.descripcion}</p></CardContent></Card>
          ))}
        </div>
      </div>
    </div>
  );
}