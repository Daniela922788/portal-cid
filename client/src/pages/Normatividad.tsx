import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";

interface Norma {
  nombre: string;
  fecha: string;
  descripcion: string;
  urlDescarga?: string;
  textoBoton?: string;
}

const acuerdos: Norma[] = [];

const leyes: Norma[] = [
  {
    nombre: "Ley 115 de 1994",
    fecha: "1994-02-08",
    descripcion: "Ley General de Educación.",
    urlDescarga: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma_pdf.php?i=292",
  }
];

const resoluciones: Norma[] = [];

const circulares: Norma[] = [];

const normasCID: Norma[] = [
  {
    nombre: "Plan Nacional Decenal de Educación 2016-2026",
    fecha: "2016-01-01",
    descripcion: "Política pública que orienta el desarrollo educativo en Colombia.",
    urlDescarga: "https://www.mineducacion.gov.co/1780/articles-392871_recurso_1.pdf",
  },
  {
    nombre: "Plan de Desarrollo Municipal de Envigado 2024-2027",
    fecha: "2024-01-01",
    descripcion: "Instrumento de planificación del municipio que incluye el programa de Innovación Educativa.",
    urlDescarga: "https://www.envigado.gov.co/planes/plan-de-desarrollo-20242027",
    textoBoton: "Ver",
  },
  {
    nombre: "Objetivos de Desarrollo Sostenible (ODS) - Naciones Unidas (2018)",
    fecha: "2018-01-01",
    descripcion: "Marco internacional para el desarrollo sostenible.",
    urlDescarga: "https://www.un.org/sustainabledevelopment/es/sustainable-development-goals/",
    textoBoton: "Ver",
  },
];

const renderNormas = (normas: Norma[]) => (
  <div className="space-y-4">
    {normas.map((norma, i) => (
      <Card key={i}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{norma.nombre}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{new Date(norma.fecha).toLocaleDateString('es-CO')}</p>
            </div>
            {norma.urlDescarga ? (
              <Button variant="outline" size="sm" asChild>
                <a href={norma.urlDescarga} target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4 mr-2" />
                  {norma.textoBoton ?? "Descargar"}
                </a>
              </Button>
            ) : (
              <Button variant="outline" size="sm" disabled>
                <Download className="h-4 w-4 mr-2" />
                Descargar
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{norma.descripcion}</p>
        </CardContent>
      </Card>
    ))}
  </div>
);

export default function Normatividad() {
  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <Breadcrumbs items={[{ label: "Normatividad" }]} />
        <h1 className="text-4xl font-bold mb-8">Normatividad</h1>
        <Tabs defaultValue="acuerdos">
          <TabsList className="mb-6">
            <TabsTrigger value="acuerdos">Acuerdos</TabsTrigger>
            <TabsTrigger value="leyes">Leyes</TabsTrigger>
            <TabsTrigger value="resoluciones">Resoluciones</TabsTrigger>
            <TabsTrigger value="circulares">Circulares</TabsTrigger>
            <TabsTrigger value="cid">Normatividad CID</TabsTrigger>
          </TabsList>
          <TabsContent value="acuerdos">
            {renderNormas(acuerdos)}
          </TabsContent>
          <TabsContent value="leyes">
            {renderNormas(leyes)}
          </TabsContent>
          <TabsContent value="resoluciones">
            {renderNormas(resoluciones)}
          </TabsContent>
          <TabsContent value="circulares">
            {renderNormas(circulares)}
          </TabsContent>
          <TabsContent value="cid">
            {renderNormas(normasCID)}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
