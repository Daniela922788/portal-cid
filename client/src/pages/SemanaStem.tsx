import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SemanaStem() {
  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <Breadcrumbs items={[{ label: "Semana STEM" }]} />
        <h1 className="text-4xl font-bold mb-4">Semana STEM 2024</h1>
        <p className="text-xl text-muted-foreground mb-8">Evento anual que congrega a más de 2,000 estudiantes</p>
        <Card><CardHeader><CardTitle>Programación</CardTitle></CardHeader>
        <CardContent><p className="text-muted-foreground">Talleres, ferias y competencias STEM</p></CardContent></Card>
      </div>
    </div>
  );
}