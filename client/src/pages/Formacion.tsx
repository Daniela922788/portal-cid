import { useState } from "react";
import { Link } from "wouter";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, BookOpen } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Skeleton } from "@/components/ui/skeleton";

export default function Formacion() {
  const [categoria, setCategoria] = useState("todas");
  const { data: cursos = [], isLoading } = trpc.courses.list.useQuery();
  
  // Filtrar cursos por categoría (usando estado como proxy por ahora)
  const cursosFiltrados = categoria === "todas" 
    ? cursos.filter(c => c.estado === "activo")
    : cursos.filter(c => c.estado === "activo");

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <Breadcrumbs items={[{ label: "Formación" }]} />
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Formación Continua</h1>
          <p className="text-xl text-muted-foreground">
            Cursos, talleres y diplomados para fortalecer competencias educativas
          </p>
        </div>

        <Tabs defaultValue="todas" onValueChange={setCategoria}>
          <TabsList className="mb-8">
            <TabsTrigger value="todas">Todos los Cursos</TabsTrigger>
            <TabsTrigger value="activos">Activos</TabsTrigger>
            <TabsTrigger value="completados">Completados</TabsTrigger>
          </TabsList>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-4 w-20 mb-2" />
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-4 w-32 mb-1" />
                    <Skeleton className="h-4 w-24" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-16 w-full mb-4" />
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : cursosFiltrados.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No hay cursos disponibles</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cursosFiltrados.map((curso) => (
                <Card key={curso.id} className="hover:shadow-lg transition-shadow">
                  {curso.imagen && (
                    <div className="h-48 overflow-hidden">
                      <img src={curso.imagen} alt={curso.titulo} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={curso.estado === "activo" ? "default" : curso.estado === "completado" ? "secondary" : "outline"}>
                        {curso.estado}
                      </Badge>
                    </div>
                    <CardTitle className="line-clamp-2">{curso.titulo}</CardTitle>
                    <CardDescription className="space-y-1 text-sm">
                      {curso.horario && (
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {curso.horario}
                        </div>
                      )}
                      {curso.publicoObjetivo && (
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          {curso.publicoObjetivo}
                        </div>
                      )}
                      {curso.lugar && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          📍 {curso.lugar}
                        </div>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{curso.descripcion || "Sin descripción disponible"}</p>
                    <Link href={`/curso/${curso.id}`}>
                      <Button variant="outline" className="w-full">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Más Información
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </Tabs>
      </div>
    </div>
  );
}
