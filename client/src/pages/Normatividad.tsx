import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";

const acuerdos = [
  { nombre: "Acuerdo Municipal 001", fecha: "2023-01-15", descripcion: "Acuerdo sobre políticas de innovación educativa" }
];

const leyes = [
  { nombre: "Ley 115 de 1994", fecha: "1994-02-08", descripcion: "Ley General de Educación" }
];

const resoluciones = [
  { nombre: "Resolución 001 de 2023", fecha: "2023-02-01", descripcion: "Resolución de funcionamiento del Centro de Innovación" }
];

const circulares = [
  { nombre: "Circular 001 de 2023", fecha: "2023-03-01", descripcion: "Circular informativa sobre programas de innovación" }
];

const normasCID = [
  { nombre: "Reglamento Interno CID", fecha: "2023-01-15", descripcion: "Normas de funcionamiento del Centro de Innovación" },
  { nombre: "Manual de Convivencia", fecha: "2023-02-01", descripcion: "Lineamientos para el uso de espacios del CID" }
];

interface Norma {
  nombre: string;
  fecha: string;
  descripcion: string;
}

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
            <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" />Descargar</Button>
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
