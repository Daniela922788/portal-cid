import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Building2, Lightbulb, Award } from "lucide-react";

export default function TerritorioStem() {
  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <Breadcrumbs items={[{ label: "Territorio STEM Envigado" }]} />
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Territorio STEM Envigado</h1>
          <p className="text-xl text-muted-foreground">
            Envigado es reconocido como Territorio STEM+ por su compromiso con la educación en ciencia, tecnología, ingeniería y matemáticas
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">14</CardTitle>
              <p className="text-sm text-muted-foreground">Instituciones Educativas</p>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-3">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <CardTitle className="text-2xl">14</CardTitle>
              <p className="text-sm text-muted-foreground">Gestores de Innovación</p>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                <Lightbulb className="h-6 w-6 text-accent" />
              </div>
              <CardTitle className="text-2xl">120</CardTitle>
              <p className="text-sm text-muted-foreground">Proyectos STEM</p>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">8</CardTitle>
              <p className="text-sm text-muted-foreground">Reconocimientos</p>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
