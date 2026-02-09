import { useState, useMemo } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChevronRight, Search } from "lucide-react";

interface Proyecto {
  id: string;
  titulo: string;
  tematica: "medioambiente" | "diseño" | "robotica" | "fotografia";
  tipo: "STEM" | "Investigación";
  descripcion: string;
  explicacion: string;
  abordaje: string;
  edadesMin: number;
  edadesMax: number;
  contenido: {
    tipo: "video" | "foto";
    url: string;
  }[];
  impacto: string;
}

const proyectosData: Proyecto[] = [
  // Medio Ambiente
  {
    id: "1",
    titulo: "Huerta Urbana Sostenible",
    tematica: "medioambiente",
    tipo: "STEM",
    descripcion: "Proyecto de cultivo en espacios urbanos",
    explicacion: "Desarrollo de huertos verticales en instituciones educativas para promover la sostenibilidad ambiental y la seguridad alimentaria.",
    abordaje: "Metodología participativa con estudiantes diseñando y construyendo estructuras de cultivo, aprendiendo sobre ciclos biológicos y sostenibilidad.",
    edadesMin: 8,
    edadesMax: 16,
    contenido: [
      { tipo: "foto", url: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=500&h=500&fit=crop" },
      { tipo: "foto", url: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=500&h=500&fit=crop" }
    ],
    impacto: "Reducción de 40% en residuos orgánicos y aumento de conciencia ambiental"
  },
  {
    id: "2",
    titulo: "Monitoreo de Calidad del Aire",
    tematica: "medioambiente",
    tipo: "Investigación",
    descripcion: "Sistema de sensores para medir contaminación",
    explicacion: "Instalación de estaciones de monitoreo ambiental con sensores IoT para medir calidad del aire en tiempo real.",
    abordaje: "Estudiantes recopilan datos, los analizan estadísticamente y presentan reportes a autoridades locales.",
    edadesMin: 12,
    edadesMax: 18,
    contenido: [
      { tipo: "foto", url: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=500&fit=crop" }
    ],
    impacto: "Datos utilizados por la alcaldía para políticas ambientales"
  },
  // Diseño
  {
    id: "3",
    titulo: "Diseño de Mobiliario Inclusivo",
    tematica: "diseño",
    tipo: "STEM",
    descripcion: "Muebles adaptados para personas con discapacidad",
    explicacion: "Proyecto de diseño y fabricación de mobiliario accesible usando tecnología CAD y fabricación digital.",
    abordaje: "Equipos multidisciplinarios diseñan, prototipos con impresoras 3D, y prueban con usuarios reales.",
    edadesMin: 10,
    edadesMax: 17,
    contenido: [
      { tipo: "foto", url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500&h=500&fit=crop" },
      { tipo: "foto", url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop" }
    ],
    impacto: "3 prototipos implementados en instituciones educativas"
  },
  {
    id: "4",
    titulo: "Identidad Visual Comunitaria",
    tematica: "diseño",
    tipo: "Investigación",
    descripcion: "Creación de marca para iniciativas locales",
    explicacion: "Estudiantes investigan identidades culturales y crean marcas visuales para organizaciones comunitarias.",
    abordaje: "Talleres de investigación etnográfica, diseño colaborativo y presentación a stakeholders.",
    edadesMin: 14,
    edadesMax: 18,
    contenido: [
      { tipo: "foto", url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop" }
    ],
    impacto: "5 marcas creadas para organizaciones locales"
  },
  // Robótica
  {
    id: "5",
    titulo: "Robot Rescatista Autónomo",
    tematica: "robotica",
    tipo: "STEM",
    descripcion: "Robot para operaciones de búsqueda y rescate",
    explicacion: "Construcción de robot autónomo con sensores y programación para simular misiones de rescate.",
    abordaje: "Equipos construyen, programan en Python y participan en competencias de robótica.",
    edadesMin: 11,
    edadesMax: 17,
    contenido: [
      { tipo: "foto", url: "https://images.unsplash.com/photo-1561837588-106d586a4e5e?w=500&h=500&fit=crop" },
      { tipo: "foto", url: "https://images.unsplash.com/photo-1485827404703-674cf945244a?w=500&h=500&fit=crop" }
    ],
    impacto: "Primer lugar en Torneo Nacional de Robótica"
  },
  {
    id: "6",
    titulo: "Domótica para Hogares Inteligentes",
    tematica: "robotica",
    tipo: "Investigación",
    descripcion: "Sistema de automatización del hogar",
    explicacion: "Investigación sobre IoT y automatización del hogar para mejorar calidad de vida.",
    abordaje: "Estudiantes diseñan sistemas, implementan prototipos y evalúan impacto en eficiencia energética.",
    edadesMin: 13,
    edadesMax: 18,
    contenido: [
      { tipo: "foto", url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop" }
    ],
    impacto: "Reducción de 35% en consumo de energía"
  },
  // Fotografía
  {
    id: "7",
    titulo: "Fotoperiodismo Social",
    tematica: "fotografia",
    tipo: "Investigación",
    descripcion: "Documentación de historias comunitarias",
    explicacion: "Proyecto de fotografía documental que captura historias de impacto social en la comunidad.",
    abordaje: "Talleres de técnica fotográfica, ética periodística y presentación de exposiciones.",
    edadesMin: 12,
    edadesMax: 18,
    contenido: [
      { tipo: "foto", url: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=500&fit=crop" },
      { tipo: "foto", url: "https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=500&h=500&fit=crop" }
    ],
    impacto: "Exposición en museo local con 500+ visitantes"
  },
  {
    id: "8",
    titulo: "Fotografía 360° para Patrimonio",
    tematica: "fotografia",
    tipo: "STEM",
    descripcion: "Documentación digital de patrimonio cultural",
    explicacion: "Uso de tecnología 360° para crear tours virtuales de sitios históricos y culturales.",
    abordaje: "Estudiantes aprenden fotografía 360°, crean tours virtuales y los publican en plataformas web.",
    edadesMin: 10,
    edadesMax: 16,
    contenido: [
      { tipo: "foto", url: "https://images.unsplash.com/photo-1606986628025-35d57e735ae0?w=500&h=500&fit=crop" }
    ],
    impacto: "10 sitios patrimoniales documentados digitalmente"
  }
];

const tematicas = [
  { id: "medioambiente", label: "Medio Ambiente", color: "bg-green-100 text-green-800" },
  { id: "diseño", label: "Diseño", color: "bg-purple-100 text-purple-800" },
  { id: "robotica", label: "Robótica", color: "bg-blue-100 text-blue-800" },
  { id: "fotografia", label: "Fotografía", color: "bg-amber-100 text-amber-800" }
];

export default function Proyectos() {
  const [filtros, setFiltros] = useState({
    nombre: "",
    tematica: "all",
    tipo: "all"
  });
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState<Proyecto | null>(null);

  const proyectosFiltrados = useMemo(() => {
    return proyectosData.filter(p => {
      const cumpleNombre = p.titulo.toLowerCase().includes(filtros.nombre.toLowerCase());
      const cumpleTematica = filtros.tematica === "all" || p.tematica === filtros.tematica;
      const cumpleTipo = filtros.tipo === "all" || p.tipo === filtros.tipo;
      return cumpleNombre && cumpleTematica && cumpleTipo;
    });
  }, [filtros]);

  const proyectosPorTematica = tematicas.map(t => ({
    ...t,
    proyectos: proyectosFiltrados.filter(p => p.tematica === t.id)
  }));

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <Breadcrumbs items={[{ label: "Proyectos" }]} />
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Proyectos de Innovación</h1>
          <p className="text-xl text-muted-foreground">
            Explora proyectos innovadores desarrollados por estudiantes y docentes del CID
          </p>
        </div>

        {/* Filtros */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-green-50">
          <CardHeader>
            <CardTitle className="text-lg">Filtrar Proyectos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Buscar por nombre</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Ej: Huerta, Robot..."
                    className="pl-10"
                    value={filtros.nombre}
                    onChange={(e) => setFiltros({ ...filtros, nombre: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Temática</label>
                <Select value={filtros.tematica} onValueChange={(v) => setFiltros({ ...filtros, tematica: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las temáticas</SelectItem>
                    {tematicas.map(t => (
                      <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Tipo</label>
                <Select value={filtros.tipo} onValueChange={(v) => setFiltros({ ...filtros, tipo: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los tipos</SelectItem>
                    <SelectItem value="STEM">STEM</SelectItem>
                    <SelectItem value="Investigación">Investigación</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Proyectos por Temática */}
        {proyectosPorTematica.map(tematica => (
          tematica.proyectos.length > 0 && (
            <div key={tematica.id} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-4 h-4 rounded-full ${tematica.color.split(" ")[0]}`}></div>
                <h2 className="text-2xl font-bold">{tematica.label}</h2>
                <span className="text-sm text-muted-foreground ml-auto">
                  {tematica.proyectos.length} proyecto{tematica.proyectos.length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tematica.proyectos.map(proyecto => (
                  <Card
                    key={proyecto.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setProyectoSeleccionado(proyecto)}
                  >
                    <div className="relative h-48 bg-muted overflow-hidden">
                      {proyecto.contenido[0] && (
                        <img
                          src={proyecto.contenido[0].url}
                          alt={proyecto.titulo}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      )}
                      <div className="absolute top-3 right-3">
                        <Badge variant={proyecto.tipo === "STEM" ? "default" : "secondary"}>
                          {proyecto.tipo}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="font-bold text-lg mb-2">{proyecto.titulo}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{proyecto.descripcion}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Edades: {proyecto.edadesMin}-{proyecto.edadesMax} años</span>
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )
        ))}

        {proyectosFiltrados.length === 0 && (
          <Card className="text-center py-12">
            <p className="text-muted-foreground">No se encontraron proyectos con los filtros seleccionados</p>
          </Card>
        )}
      </div>

      {/* Modal de Detalle */}
      {proyectoSeleccionado && (
        <Dialog open={!!proyectoSeleccionado} onOpenChange={() => setProyectoSeleccionado(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">{proyectoSeleccionado.titulo}</DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              {/* Galería de imágenes/videos */}
              <div className="grid grid-cols-2 gap-3">
                {proyectoSeleccionado.contenido.map((item, idx) => (
                  <div key={idx} className="relative h-40 bg-muted rounded-lg overflow-hidden">
                    {item.tipo === "foto" ? (
                      <img src={item.url} alt={`${proyectoSeleccionado.titulo} ${idx}`} className="w-full h-full object-cover" />
                    ) : (
                      <iframe
                        src={item.url}
                        className="w-full h-full"
                        allowFullScreen
                      ></iframe>
                    )}
                  </div>
                ))}
              </div>

              {/* Información */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold mb-2">Tipo de Proyecto</h3>
                  <Badge variant={proyectoSeleccionado.tipo === "STEM" ? "default" : "secondary"}>
                    {proyectoSeleccionado.tipo}
                  </Badge>
                </div>

                <div>
                  <h3 className="font-bold mb-2">Explicación</h3>
                  <p className="text-sm text-muted-foreground">{proyectoSeleccionado.explicacion}</p>
                </div>

                <div>
                  <h3 className="font-bold mb-2">Abordaje Metodológico</h3>
                  <p className="text-sm text-muted-foreground">{proyectoSeleccionado.abordaje}</p>
                </div>

                <div>
                  <h3 className="font-bold mb-2">Rango de Edades</h3>
                  <p className="text-sm text-muted-foreground">
                    {proyectoSeleccionado.edadesMin} a {proyectoSeleccionado.edadesMax} años
                  </p>
                </div>

                <div>
                  <h3 className="font-bold mb-2">Impacto</h3>
                  <p className="text-sm text-muted-foreground">{proyectoSeleccionado.impacto}</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
