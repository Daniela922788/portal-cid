import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Skeleton } from "@/components/ui/skeleton";

export default function Eventos() {
  const { data: eventos = [], isLoading } = trpc.events.list.useQuery();

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Eventos" }]} />
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Eventos en las IE</h1>
          <p className="text-xl text-muted-foreground">
            Experiencias significativas, ferias de ciencia y eventos especiales
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <Skeleton className="h-48 w-full" />
                <CardHeader>
                  <Skeleton className="h-4 w-24 mb-2" />
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
        ) : eventos.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No hay eventos disponibles</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventos.map((evento) => {
              const fechaInicio = evento.fechaInicio ? new Date(evento.fechaInicio).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' }) : "Por definir";
              const fechaFin = evento.fechaFin ? new Date(evento.fechaFin).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' }) : "";
              const fechaDisplay = fechaFin ? `${fechaInicio} - ${fechaFin}` : fechaInicio;
              
              return (
                <Card key={evento.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                  {evento.imagen && (
                    <div className="h-48 overflow-hidden">
                      <img src={evento.imagen} alt={evento.titulo} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <CardHeader className="flex-1">
                    <Badge className="w-fit mb-2" variant={evento.estado === "proximo" ? "default" : evento.estado === "en_curso" ? "secondary" : "outline"}>
                      {evento.estado === "proximo" ? "Próximo" : evento.estado === "en_curso" ? "En Curso" : "Finalizado"}
                    </Badge>
                    <CardTitle className="line-clamp-2">{evento.titulo}</CardTitle>
                    <CardDescription className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {fechaDisplay}
                      </div>
                      {evento.lugar && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {evento.lugar}
                        </div>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{evento.descripcion || "Sin descripción disponible"}</p>
                    <Link href={`/evento/${evento.id}`}>
                      <Button className="w-full" variant="default">
                        Ver Detalles
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
