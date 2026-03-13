import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface Norma {
  tipo: "Ley" | "Acuerdo" | "Resolución" | "Circular" | "Normatividad";
  nombre: string;
  fecha: string;
  descripcion: string;
  urlDescarga?: string;
  textoBoton?: string;
}

const acuerdos: Norma[] = [];

const leyes: Norma[] = [
  {
    tipo: "Ley",
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
    tipo: "Normatividad",
    nombre: "Plan Nacional Decenal de Educación 2016-2026",
    fecha: "2016-01-01",
    descripcion: "Política pública que orienta el desarrollo educativo en Colombia.",
    urlDescarga: "https://www.mineducacion.gov.co/1780/articles-392871_recurso_1.pdf",
  },
  {
    tipo: "Normatividad",
    nombre: "Plan de Desarrollo Municipal de Envigado 2024-2027",
    fecha: "2024-01-01",
    descripcion: "Instrumento de planificación del municipio que incluye el programa de Innovación Educativa.",
    urlDescarga: "https://www.envigado.gov.co/planes/plan-de-desarrollo-20242027",
    textoBoton: "Ver",
  },
  {
    tipo: "Normatividad",
    nombre: "Objetivos de Desarrollo Sostenible (ODS) - Naciones Unidas (2018)",
    fecha: "2018-01-01",
    descripcion: "Marco internacional para el desarrollo sostenible.",
    urlDescarga: "https://www.un.org/sustainabledevelopment/es/sustainable-development-goals/",
    textoBoton: "Ver",
  },
  {
    tipo: "Normatividad",
    nombre: "Documento CONPES 4069 - Política Nacional de Ciencia, Tecnología e Innovación 2022-2031",
    fecha: "2021-12-20",
    descripcion: "Marco estratégico que orienta el fortalecimiento de la ciencia, la tecnología y la innovación en Colombia para impulsar el desarrollo social, económico y sostenible.",
    urlDescarga: "https://minciencias.gov.co/sites/default/files/upload/paginas/conpes_4069.pdf",
    textoBoton: "Ver",
  },
  {
    tipo: "Normatividad",
    nombre: "Documento CONPES 4144 - Política Nacional de Inteligencia Artificial",
    fecha: "2025-02-14",
    descripcion: "Lineamientos para el desarrollo y uso ético de la inteligencia artificial en Colombia, promoviendo la innovación, la competitividad y el aprovechamiento responsable de los datos.",
    urlDescarga: "https://colaboracion.dnp.gov.co/CDT/Conpes/Econ%C3%B3micos/4144.pdf",
    textoBoton: "Ver",
  },
  {
    tipo: "Normatividad",
    nombre: "Política Pública de Apropiación Social del Conocimiento en el marco de la CTeI",
    fecha: "2021-01-01",
    descripcion: "Estrategia que promueve la participación ciudadana en la ciencia, la tecnología y la innovación, fortaleciendo el diálogo entre conocimiento, sociedad y territorio.",
    urlDescarga: "https://minciencias.gov.co/sites/default/files/politica_publica_de_apropiacion_social_del_conocimiento.pdf",
    textoBoton: "Ver",
  },
  {
    tipo: "Normatividad",
    nombre: "Orientaciones para el fomento de la innovación educativa como estrategia de desarrollo escolar",
    fecha: "2020-01-01",
    descripcion: "Guía del sector educativo que impulsa la innovación pedagógica y el uso de nuevas metodologías para fortalecer los procesos de enseñanza y aprendizaje.",
    urlDescarga: "https://www.colombiaaprende.edu.co/sites/default/files/files_public/archivos_contenidos/OrientacionesInnovacion_v2.pdf",
    textoBoton: "Ver",
  },
];

const todasLasNormas: Norma[] = [...acuerdos, ...leyes, ...resoluciones, ...circulares, ...normasCID].sort(
  (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
);

const renderNormas = (normas: Norma[]) => (
  <div className="space-y-4">
    {normas.map((norma, i) => (
      <Card
        key={i}
        className={norma.urlDescarga ? "transition-shadow hover:shadow-md" : undefined}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <Badge variant="secondary" className="mb-2">
                {norma.tipo}
              </Badge>
              <CardTitle>{norma.nombre}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{new Date(norma.fecha).toLocaleDateString('es-CO')}</p>
            </div>
            {norma.urlDescarga ? (
              <Button variant="outline" size="sm" asChild>
                <a href={norma.urlDescarga} target="_blank" rel="noopener noreferrer">
                  <Eye className="h-4 w-4 mr-2" />
                  Ver
                </a>
              </Button>
            ) : (
              <Button variant="outline" size="sm" disabled>
                <Eye className="h-4 w-4 mr-2" />
                Ver
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <a
            href={norma.urlDescarga}
            target="_blank"
            rel="noopener noreferrer"
            className={norma.urlDescarga ? "block text-muted-foreground hover:text-foreground transition-colors" : "block text-muted-foreground"}
          >
            {norma.descripcion}
          </a>
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
        {renderNormas(todasLasNormas)}
      </div>
    </div>
  );
}
