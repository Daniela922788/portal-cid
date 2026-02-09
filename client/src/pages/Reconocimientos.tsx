import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Users, Trophy } from "lucide-react";

const reconocimientos = {
  ciudad_aprendizaje: {
    titulo: "Ciudad del Aprendizaje",
    descripcion: "Reconocimiento a instituciones y proyectos que impulsan el aprendizaje continuo en la comunidad",
    icono: Award,
    premios: [
      {
        id: 1,
        nombre: "Institución Educativa Oficial",
        ganador: "IE Parque Biblioteca Débora Arango",
        fecha: "Octubre 2024",
        imagen: "https://images.unsplash.com/photo-1427504494785-cdfc993f38ae?w=400&h=300&fit=crop"
      },
      {
        id: 2,
        nombre: "Proyecto Comunitario",
        ganador: "Centro de Innovación Educativa CID",
        fecha: "Octubre 2024",
        imagen: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
      },
      {
        id: 3,
        nombre: "Docente Innovador",
        ganador: "Mg. Carlos Rodríguez López",
        fecha: "Octubre 2024",
        imagen: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
      }
    ]
  },
  semana_stem: {
    titulo: "Ganadores Semana STEM",
    descripcion: "Reconocimiento a estudiantes y proyectos destacados en la Semana de Ciencia, Tecnología, Ingeniería y Matemáticas",
    icono: Trophy,
    premios: [
      {
        id: 1,
        nombre: "Primer Lugar - Categoría Robótica",
        ganador: "Equipo Innovadores del Futuro",
        fecha: "Septiembre 2024",
        imagen: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop"
      },
      {
        id: 2,
        nombre: "Primer Lugar - Categoría Investigación",
        ganador: "Proyecto: Energías Renovables en Envigado",
        fecha: "Septiembre 2024",
        imagen: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop"
      },
      {
        id: 3,
        nombre: "Mención de Honor - Categoría Diseño",
        ganador: "Equipo Diseñadores Creativos",
        fecha: "Septiembre 2024",
        imagen: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop"
      },
      {
        id: 4,
        nombre: "Primer Lugar - Categoría Fotografía",
        ganador: "Proyecto: Biodiversidad Local",
        fecha: "Septiembre 2024",
        imagen: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop"
      }
    ]
  },
  colombia_lider: {
    titulo: "Colombia Líder",
    descripcion: "Reconocimiento a iniciativas que posicionan a Colombia como líder en innovación educativa",
    icono: Users,
    premios: [
      {
        id: 1,
        nombre: "Iniciativa Educativa Destacada",
        ganador: "Programa STEM+ Envigado",
        fecha: "Noviembre 2024",
        imagen: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
      },
      {
        id: 2,
        nombre: "Liderazgo en Innovación",
        ganador: "Centro de Ciencia CID",
        fecha: "Noviembre 2024",
        imagen: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop"
      },
      {
        id: 3,
        nombre: "Transformación Educativa",
        ganador: "Red de Gestores de Innovación",
        fecha: "Noviembre 2024",
        imagen: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
      }
    ]
  }
};

export default function Reconocimientos() {
  const [selectedTab, setSelectedTab] = useState("ciudad_aprendizaje");

  const tabActual = reconocimientos[selectedTab as keyof typeof reconocimientos];
  const IconComponent = tabActual.icono;

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <Breadcrumbs items={[{ label: "Contenido" }, { label: "Reconocimientos" }]} />

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Reconocimientos</h1>
          <p className="text-xl text-muted-foreground">
            Celebramos los logros y contribuciones de nuestros aliados, docentes, estudiantes e instituciones
          </p>
        </div>

        {/* Tabs de Reconocimientos */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="ciudad_aprendizaje">Ciudad del Aprendizaje</TabsTrigger>
            <TabsTrigger value="semana_stem">Semana STEM</TabsTrigger>
            <TabsTrigger value="colombia_lider">Colombia Líder</TabsTrigger>
          </TabsList>

          {Object.entries(reconocimientos).map(([key, data]) => (
            <TabsContent key={key} value={key} className="space-y-8">
              {/* Encabezado de la sección */}
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 border border-primary/20">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{data.titulo}</h2>
                    <p className="text-lg text-muted-foreground">{data.descripcion}</p>
                  </div>
                </div>
              </div>

              {/* Grid de Premios */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.premios.map((premio) => (
                  <Card key={premio.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    {/* Imagen */}
                    <div className="h-48 overflow-hidden bg-muted">
                      <img
                        src={premio.imagen}
                        alt={premio.nombre}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Contenido */}
                    <CardHeader>
                      <CardTitle className="text-lg">{premio.nombre}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Ganador/Proyecto</p>
                        <p className="font-semibold text-primary">{premio.ganador}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Fecha de Reconocimiento</p>
                        <p className="font-medium">{premio.fecha}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Sección de Información Adicional */}
        <div className="mt-16 bg-muted/30 rounded-lg p-8 border border-border">
          <h3 className="text-2xl font-bold mb-4">¿Cómo Participar?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-primary">1</span>
              </div>
              <h4 className="font-semibold mb-2">Conoce los Criterios</h4>
              <p className="text-muted-foreground">Revisa los requisitos y categorías de reconocimiento disponibles en cada convocatoria.</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-secondary">2</span>
              </div>
              <h4 className="font-semibold mb-2">Prepara tu Candidatura</h4>
              <p className="text-muted-foreground">Documenta tu proyecto o iniciativa con evidencia de impacto y resultados.</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-accent">3</span>
              </div>
              <h4 className="font-semibold mb-2">Envía tu Propuesta</h4>
              <p className="text-muted-foreground">Completa el formulario de candidatura durante los períodos de convocatoria abierta.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
