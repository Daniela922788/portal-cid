import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, ExternalLink, Newspaper } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Skeleton } from "@/components/ui/skeleton";

export default function Noticias() {
  const [filtro, setFiltro] = useState<"todas" | "propia" | "mencion" | "evento">("todas");
  const { data: noticias = [], isLoading } = trpc.news.list.useQuery();
  
  // Mapear noticias de la BD a formato de UI
  const noticiasMapeadas = noticias.map(n => ({
    id: n.id,
    titulo: n.titulo,
    fecha: n.createdAt ? new Date(n.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    resumen: n.descripcion || n.contenido || "",
    tipo: n.estado === "publicado" ? "propia" as const : "mencion" as const,
    imagen: n.imagen || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop",
    autor: n.autor
  }));
  
  const noticiasFiltradas = filtro === "todas" 
    ? noticiasMapeadas 
    : noticiasMapeadas.filter(n => n.tipo === filtro);

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <Breadcrumbs items={[{ label: "Noticias" }]} />
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Noticias</h1>
          <p className="text-xl text-muted-foreground">Mantente informado sobre las últimas actividades del CID</p>
        </div>
        <Tabs defaultValue="todas" className="mb-8" onValueChange={(value) => setFiltro(value as any)}>
          <TabsList>
            <TabsTrigger value="todas">Todas</TabsTrigger>
            <TabsTrigger value="propia">Noticias Propias</TabsTrigger>
            <TabsTrigger value="mencion">Menciones Externas</TabsTrigger>
            <TabsTrigger value="evento">Eventos</TabsTrigger>
          </TabsList>
        </Tabs>
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <Skeleton className="h-48 w-full" />
                <CardHeader>
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-16 w-full mb-4" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : noticiasFiltradas.length === 0 ? (
          <div className="text-center py-12">
            <Newspaper className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No hay noticias disponibles</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {noticiasFiltradas.map((noticia) => (
              <Card key={noticia.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img src={noticia.imagen} alt={noticia.titulo} className="w-full h-full object-cover" />
                </div>
                <CardHeader>
                  <Badge variant={noticia.tipo === "propia" ? "default" : "secondary"}>
                    {noticia.tipo === "propia" ? "Noticia Propia" : "Mención Externa"}
                  </Badge>
                  <CardTitle className="line-clamp-2">{noticia.titulo}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(noticia.fecha).toLocaleDateString('es-CO')}
                    {noticia.autor && <span className="ml-2">• {noticia.autor}</span>}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3 mb-4">{noticia.resumen}</p>
                  <Button variant="outline" className="w-full">Leer más</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
