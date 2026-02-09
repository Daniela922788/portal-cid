import { useState } from "react";
import { useRoute } from "wouter";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { MessageCircle, MapPin, Users, Clock, Target, Calendar } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function CursoDetalle() {
  const [, params] = useRoute("/curso/:id");
  const cursoId = params?.id ? parseInt(params.id) : null;
  
  const { data: curso, isLoading } = trpc.courses.getById.useQuery(cursoId!, {
    enabled: !!cursoId,
  });
  
  const createEnrollment = trpc.enrollments.create.useMutation({
    onSuccess: () => {
      toast.success("¡Inscripción completada! Te contactaremos pronto.");
      resetForm();
    },
    onError: (error) => {
      toast.error(`Error al procesar la inscripción: ${error.message}`);
    },
  });

  const [formData, setFormData] = useState({
    nombreParticipante: "",
    apellidoParticipante: "",
    emailParticipante: "",
    telefonoParticipante: "",
    edadParticipante: "",
    institucion: "",
    nombreAcudiente: "",
    emailAcudiente: "",
    telefonoAcudiente: "",
    residencia: "",
    horarioPreferido: "",
  });

  const resetForm = () => {
    setFormData({
      nombreParticipante: "",
      apellidoParticipante: "",
      emailParticipante: "",
      telefonoParticipante: "",
      edadParticipante: "",
      institucion: "",
      nombreAcudiente: "",
      emailAcudiente: "",
      telefonoAcudiente: "",
      residencia: "",
      horarioPreferido: "",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-8">
        <div className="container">
          <Skeleton className="h-96 w-full mb-6" />
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-full mb-8" />
        </div>
      </div>
    );
  }

  if (!curso) {
    return (
      <div className="min-h-screen py-8">
        <div className="container text-center">
          <h1 className="text-3xl font-bold mb-4">Curso no encontrado</h1>
          <p className="text-muted-foreground">El curso que buscas no existe o ha sido eliminado.</p>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cursoId) {
      toast.error("Error: ID de curso no válido");
      return;
    }

    createEnrollment.mutate({
      courseId: cursoId,
      nombreParticipante: formData.nombreParticipante,
      apellidoParticipante: formData.apellidoParticipante,
      emailParticipante: formData.emailParticipante,
      telefonoParticipante: formData.telefonoParticipante || undefined,
      edadParticipante: formData.edadParticipante ? parseInt(formData.edadParticipante) : undefined,
      institucion: formData.institucion || undefined,
      nombreAcudiente: formData.nombreAcudiente || undefined,
      emailAcudiente: formData.emailAcudiente || undefined,
      telefonoAcudiente: formData.telefonoAcudiente || undefined,
      residencia: formData.residencia || undefined,
      horarioPreferido: formData.horarioPreferido || undefined,
    });
  };

  const fechaInicio = curso.fechaInicio ? new Date(curso.fechaInicio).toLocaleDateString('es-CO') : "Por definir";
  const fechaFin = curso.fechaFin ? new Date(curso.fechaFin).toLocaleDateString('es-CO') : "Por definir";

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <Breadcrumbs items={[
          { label: "Formación", href: "/formacion" },
          { label: curso.titulo }
        ]} />

        {/* A) Encabezado */}
        <section className="mb-12">
          {curso.imagen && (
            <div className="rounded-lg overflow-hidden mb-6">
              <img 
                src={curso.imagen} 
                alt={curso.titulo}
                className="w-full h-96 object-cover"
              />
            </div>
          )}
          <h1 className="text-4xl font-bold mb-2">{curso.titulo}</h1>
          <p className="text-xl text-muted-foreground mb-6">{curso.descripcion || "Sin descripción disponible"}</p>
          
          {/* Información clave */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Fechas</p>
                    <p className="font-semibold text-sm">{fechaInicio} - {fechaFin}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {curso.horario && (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Horario</p>
                      <p className="font-semibold text-sm">{curso.horario}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {curso.lugar && (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Lugar</p>
                      <p className="font-semibold text-sm">{curso.lugar}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {curso.cupos !== null && (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Cupos</p>
                      <p className="font-semibold">{curso.cupos}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* B) Descripción general */}
        <section className="mb-12 bg-muted/30 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Acerca del curso</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">{curso.descripcion || "Descripción no disponible"}</p>
          <div className="grid md:grid-cols-2 gap-6">
            {curso.publicoObjetivo && (
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Público Objetivo
                </h3>
                <p className="text-muted-foreground">{curso.publicoObjetivo}</p>
              </div>
            )}
            {curso.responsable && (
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Responsable
                </h3>
                <p className="text-muted-foreground">{curso.responsable}</p>
              </div>
            )}
          </div>
        </section>

        {/* C) Formulario de inscripción */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Formulario de Inscripción</h2>
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Información del participante */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">1. Información del Participante</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nombres">Nombres *</Label>
                      <Input 
                        id="nombres" 
                        value={formData.nombreParticipante}
                        onChange={(e) => setFormData({...formData, nombreParticipante: e.target.value})}
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="apellidos">Apellidos *</Label>
                      <Input 
                        id="apellidos" 
                        value={formData.apellidoParticipante}
                        onChange={(e) => setFormData({...formData, apellidoParticipante: e.target.value})}
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Correo Electrónico *</Label>
                      <Input 
                        id="email" 
                        type="email"
                        value={formData.emailParticipante}
                        onChange={(e) => setFormData({...formData, emailParticipante: e.target.value})}
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="telefono">Teléfono</Label>
                      <Input 
                        id="telefono" 
                        value={formData.telefonoParticipante}
                        onChange={(e) => setFormData({...formData, telefonoParticipante: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="edad">Edad</Label>
                      <Input 
                        id="edad" 
                        type="number"
                        value={formData.edadParticipante}
                        onChange={(e) => setFormData({...formData, edadParticipante: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="institucion">Institución Educativa</Label>
                      <Input 
                        id="institucion" 
                        value={formData.institucion}
                        onChange={(e) => setFormData({...formData, institucion: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {/* Información del acudiente */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">2. Información del Acudiente (si aplica)</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="acudiente">Nombre Completo</Label>
                      <Input 
                        id="acudiente" 
                        value={formData.nombreAcudiente}
                        onChange={(e) => setFormData({...formData, nombreAcudiente: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="correo-acudiente">Correo Electrónico</Label>
                      <Input 
                        id="correo-acudiente" 
                        type="email"
                        value={formData.emailAcudiente}
                        onChange={(e) => setFormData({...formData, emailAcudiente: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="telefono-acudiente">Teléfono</Label>
                      <Input 
                        id="telefono-acudiente" 
                        value={formData.telefonoAcudiente}
                        onChange={(e) => setFormData({...formData, telefonoAcudiente: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {/* Información de residencia */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">3. Información de Residencia</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="residencia">Residencia</Label>
                      <Input 
                        id="residencia" 
                        value={formData.residencia}
                        onChange={(e) => setFormData({...formData, residencia: e.target.value})}
                        placeholder="Municipio, Barrio/Zona"
                      />
                    </div>
                    {curso.horario && (
                      <div>
                        <Label htmlFor="horario">Horario Preferido</Label>
                        <Input 
                          id="horario" 
                          value={formData.horarioPreferido}
                          onChange={(e) => setFormData({...formData, horarioPreferido: e.target.value})}
                          placeholder={curso.horario}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Botón enviar */}
                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={createEnrollment.isPending}
                >
                  {createEnrollment.isPending ? "Enviando..." : "Enviar Inscripción"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
