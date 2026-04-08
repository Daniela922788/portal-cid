import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, BookOpen, FileText, Scale } from "lucide-react";

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
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative w-full overflow-hidden bg-[linear-gradient(122deg,#182130_0%,#0D4B56_52%,#11B2AA_100%)] text-white">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#FFDE07]/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-[#EC6910]/15 blur-3xl" />
        <div className="pointer-events-none absolute right-1/3 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-[#11B2AA]/20 blur-2xl" />

        <div className="relative z-10 container flex min-h-[480px] flex-col justify-start pb-3 pt-28 md:justify-end md:pt-0 md:pb-10">
          <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/35 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]">
            <Scale className="h-4 w-4 text-[#FFDE07]" />
            Marco legal CID
          </div>

          <h1 className="text-5xl font-extrabold leading-tight lg:text-6xl">Normatividad</h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-white/80 lg:text-lg">
            Leyes, documentos CONPES, políticas públicas y lineamientos que enmarcan la labor del Centro de Innovación y Desarrollo.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/12 px-4 py-2 font-medium backdrop-blur-sm">
              <FileText className="h-4 w-4" />
              {todasLasNormas.length} documentos
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/12 px-4 py-2 font-medium backdrop-blur-sm">
              <BookOpen className="h-4 w-4" />
              Acceso libre
            </span>
          </div>
        </div>
      </section>

      <div className="py-8">
        <div className="container">
          <Breadcrumbs items={[{ label: "Normatividad" }]} />
          {renderNormas(todasLasNormas)}
        </div>
      </div>
    </div>
  );
}
