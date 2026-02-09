import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const enlaces = [
  { nombre: "Ministerio de Educación", url: "https://www.mineducacion.gov.co", descripcion: "Portal oficial del MEN" },
  { nombre: "MinTIC", url: "https://www.mintic.gov.co", descripcion: "Ministerio de Tecnologías de la Información" },
  { nombre: "MinCiencias", url: "https://minciencias.gov.co", descripcion: "Ministerio de Ciencia, Tecnología e Innovación" },
  { nombre: "STEM Latam", url: "https://stemlatam.org", descripcion: "Red STEM Latinoamérica" }
];

export default function Enlaces() {
  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <Breadcrumbs items={[{ label: "Enlaces de Interés" }]} />
        <h1 className="text-4xl font-bold mb-8">Enlaces de Interés</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enlaces.map((enlace, i) => (
            <Card key={i} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="h-5 w-5 text-primary" />
                  {enlace.nombre}
                </CardTitle>
                <CardDescription>{enlace.descripcion}</CardDescription>
              </CardHeader>
              <CardContent>
                <a href={enlace.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Visitar sitio web
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}