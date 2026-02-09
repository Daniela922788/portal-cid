import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ExternalLink } from "lucide-react";

interface Convocatoria {
  id: number;
  titulo: string;
  entidad: string;
  fechaApertura: string;
  fechaCierre: string;
  descripcion: string;
  vigente: boolean;
}

const convocatoriasData: Convocatoria[] = [
  {
    id: 1,
    titulo: "Convocatoria Proyectos STEM 2025",
    entidad: "CID Envigado",
    fechaApertura: "2024-11-01",
    fechaCierre: "2024-12-15",
    descripcion: "Financiación para proyectos de ciencia, tecnología, ingeniería y matemáticas en IE oficiales",
    vigente: true
  },
  {
    id: 2,
    titulo: "Becas Formación Docente en Innovación",
    entidad: "MEN",
    fechaApertura: "2024-11-10",
    fechaCierre: "2024-12-20",
    descripcion: "Programa de becas para docentes que deseen especializarse en innovación educativa",
    vigente: true
  },
  {
    id: 3,
    titulo: "Premios Experiencias Significativas",
    entidad: "EJC",
    fechaApertura: "2024-10-01",
    fechaCierre: "2024-11-30",
    descripcion: "Reconocimiento a las mejores experiencias pedagógicas del año",
    vigente: false
  }
];

export default function Convocatorias() {
  const vigentes = convocatoriasData.filter(c => c.vigente);
  const anteriores = convocatoriasData.filter(c => !c.vigente);

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <Breadcrumbs items={[{ label: "Convocatorias" }]} />
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Convocatorias</h1>
          <p className="text-xl text-muted-foreground">
            Oportunidades de financiación y reconocimiento para la comunidad educativa
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-primary">Convocatorias Vigentes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {vigentes.map((conv) => (
              <Card key={conv.id} className="border-2 border-primary/30 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="default" className="animate-pulse">Vigente</Badge>
                    <Badge variant="outline">{conv.entidad}</Badge>
                  </div>
                  <CardTitle>{conv.titulo}</CardTitle>
                  <CardDescription className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Apertura: {new Date(conv.fechaApertura).toLocaleDateString('es-CO')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Cierre: {new Date(conv.fechaCierre).toLocaleDateString('es-CO')}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{conv.descripcion}</p>
                  <Button className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver Detalles
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Convocatorias Anteriores</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {anteriores.map((conv) => (
              <Card key={conv.id} className="opacity-75">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary">Cerrada</Badge>
                    <Badge variant="outline">{conv.entidad}</Badge>
                  </div>
                  <CardTitle>{conv.titulo}</CardTitle>
                  <CardDescription>
                    Cerró: {new Date(conv.fechaCierre).toLocaleDateString('es-CO')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{conv.descripcion}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
