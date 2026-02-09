import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CentroCiencia() {
  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <Breadcrumbs items={[{ label: "Centro de Ciencia" }]} />
        <h1 className="text-4xl font-bold mb-4">Centro de Ciencia</h1>
        <p className="text-xl text-muted-foreground mb-8">Espacio de experimentación y aprendizaje científico</p>
        <div className="grid md:grid-cols-3 gap-6">
          <Card><CardHeader><CardTitle>Qué es</CardTitle></CardHeader>
          <CardContent><p className="text-muted-foreground">Centro equipado con tecnología para investigación</p></CardContent></Card>
          <Card><CardHeader><CardTitle>Proceso</CardTitle></CardHeader>
          <CardContent><p className="text-muted-foreground">Inscripción, inducción y acceso a laboratorios</p></CardContent></Card>
          <Card><CardHeader><CardTitle>Oferta</CardTitle></CardHeader>
          <CardContent><p className="text-muted-foreground">Talleres, experimentos y proyectos guiados</p></CardContent></Card>
        </div>
      </div>
    </div>
  );
}