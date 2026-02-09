import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  getSession, 
  clearSession, 
  getInscripciones, 
  getCursos, 
  getGestores,
  updateInscripcion,
  Gestor
} from "@/lib/database";
import { LogOut, Users, BookOpen, UserCheck, Search } from "lucide-react";
import { toast } from "sonner";

export default function CRM() {
  const [, setLocation] = useLocation();
  const [usuario, setUsuario] = useState<Gestor | null>(null);
  const [inscripciones, setInscripciones] = useState<any[]>([]);
  const [cursos, setCursos] = useState<any[]>([]);
  const [gestores, setGestores] = useState<any[]>([]);
  const [filtros, setFiltros] = useState({
    curso: "",
    estado: "",
    gestor: "",
    busqueda: ""
  });
  const [inscripcionSeleccionada, setInscripcionSeleccionada] = useState<any>(null);

  useEffect(() => {
    const sesion = getSession();
    if (!sesion) {
      setLocation("/login");
      return;
    }
    setUsuario(sesion);
    setInscripciones(getInscripciones());
    setCursos(getCursos());
    setGestores(getGestores());
  }, [setLocation]);

  const handleCerrarSesion = () => {
    clearSession();
    toast.success("Sesión cerrada");
    setLocation("/");
  };

  const inscripcionesFiltradas = inscripciones.filter(insc => {
    const cumpleCurso = !filtros.curso || filtros.curso === "all" || insc.id_curso === filtros.curso;
    const cumpleEstado = !filtros.estado || filtros.estado === "all" || insc.estado_inscripcion === filtros.estado;
    const cumpleGestor = !filtros.gestor || filtros.gestor === "all" || insc.id_gestor_asignado === filtros.gestor;
    const cumpleBusqueda = !filtros.busqueda || 
      insc.nombres_participante.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      insc.documento_participante.includes(filtros.busqueda);
    
    return cumpleCurso && cumpleEstado && cumpleGestor && cumpleBusqueda;
  });

  const handleActualizarInscripcion = (id: string, datos: any) => {
    updateInscripcion(id, datos);
    setInscripciones(getInscripciones());
    setInscripcionSeleccionada(null);
    toast.success("Inscripción actualizada");
  };

  if (!usuario) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-white dark:bg-slate-950 border-b sticky top-0 z-40">
        <div className="container py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">CRM – Gestión de Cursos e Inscripciones CID</h1>
            <p className="text-sm text-muted-foreground">Bienvenido, {usuario.nombre_completo}</p>
          </div>
          <Button variant="outline" onClick={handleCerrarSesion}>
            <LogOut className="h-4 w-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>
      </header>

      <div className="container py-8">
        <Tabs defaultValue="inscripciones" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="inscripciones" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Inscripciones
            </TabsTrigger>
            <TabsTrigger value="cursos" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Cursos
            </TabsTrigger>
            <TabsTrigger value="gestores" className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              Gestores
            </TabsTrigger>
          </TabsList>

          {/* Pestaña Inscripciones */}
          <TabsContent value="inscripciones" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Filtros</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <Label>Buscar por nombre/documento</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Buscar..."
                        value={filtros.busqueda}
                        onChange={(e) => setFiltros({...filtros, busqueda: e.target.value})}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Filtrar por curso</Label>
                    <Select value={filtros.curso} onValueChange={(value) => setFiltros({...filtros, curso: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Todos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        {cursos.map((curso) => (
                          <SelectItem key={curso.id_curso} value={curso.id_curso}>
                            {curso.nombre_curso}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Filtrar por estado</Label>
                    <Select value={filtros.estado} onValueChange={(value) => setFiltros({...filtros, estado: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Todos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="Nuevo">Nuevo</SelectItem>
                        <SelectItem value="Revisado">Revisado</SelectItem>
                        <SelectItem value="Aprobado">Aprobado</SelectItem>
                        <SelectItem value="Rechazado">Rechazado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Filtrar por gestor</Label>
                    <Select value={filtros.gestor} onValueChange={(value) => setFiltros({...filtros, gestor: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Todos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        {gestores.map((gestor) => (
                          <SelectItem key={gestor.id_persona} value={gestor.id_persona}>
                            {gestor.nombre_completo}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inscripciones ({inscripcionesFiltradas.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-2">Participante</th>
                        <th className="text-left py-2 px-2">Curso</th>
                        <th className="text-left py-2 px-2">Estado</th>
                        <th className="text-left py-2 px-2">Gestor</th>
                        <th className="text-left py-2 px-2">IE</th>
                        <th className="text-left py-2 px-2">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inscripcionesFiltradas.map((insc) => {
                        const curso = cursos.find(c => c.id_curso === insc.id_curso);
                        const gestor = gestores.find(g => g.id_persona === insc.id_gestor_asignado);
                        return (
                          <tr key={insc.id_inscripcion} className="border-b hover:bg-muted/50">
                            <td className="py-2 px-2">{insc.nombres_participante} {insc.apellidos_participante}</td>
                            <td className="py-2 px-2">{curso?.nombre_curso || "N/A"}</td>
                            <td className="py-2 px-2">
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                insc.estado_inscripcion === "Aprobado" ? "bg-green-100 text-green-800" :
                                insc.estado_inscripcion === "Rechazado" ? "bg-red-100 text-red-800" :
                                insc.estado_inscripcion === "Revisado" ? "bg-blue-100 text-blue-800" :
                                "bg-yellow-100 text-yellow-800"
                              }`}>
                                {insc.estado_inscripcion}
                              </span>
                            </td>
                            <td className="py-2 px-2">{gestor?.nombre_completo || "Sin asignar"}</td>
                            <td className="py-2 px-2">{insc.institucion_educativa}</td>
                            <td className="py-2 px-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => setInscripcionSeleccionada(insc)}
                                  >
                                    Ver detalle
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                  <DialogHeader>
                                    <DialogTitle>Detalle de Inscripción</DialogTitle>
                                  </DialogHeader>
                                  {inscripcionSeleccionada && (
                                    <div className="space-y-4">
                                      <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                          <Label>Participante</Label>
                                          <p className="font-semibold">{inscripcionSeleccionada.nombres_participante} {inscripcionSeleccionada.apellidos_participante}</p>
                                        </div>
                                        <div>
                                          <Label>Documento</Label>
                                          <p className="font-semibold">{inscripcionSeleccionada.documento_participante}</p>
                                        </div>
                                        <div>
                                          <Label>Institución</Label>
                                          <p className="font-semibold">{inscripcionSeleccionada.institucion_educativa}</p>
                                        </div>
                                        <div>
                                          <Label>Grado</Label>
                                          <p className="font-semibold">{inscripcionSeleccionada.grado_escolar}</p>
                                        </div>
                                      </div>

                                      <div className="border-t pt-4">
                                        <Label className="text-base font-semibold">Cambiar Estado</Label>
                                        <Select 
                                          value={inscripcionSeleccionada.estado_inscripcion}
                                          onValueChange={(value) => {
                                            handleActualizarInscripcion(inscripcionSeleccionada.id_inscripcion, {
                                              estado_inscripcion: value
                                            });
                                          }}
                                        >
                                          <SelectTrigger>
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="Nuevo">Nuevo</SelectItem>
                                            <SelectItem value="Revisado">Revisado</SelectItem>
                                            <SelectItem value="Aprobado">Aprobado</SelectItem>
                                            <SelectItem value="Rechazado">Rechazado</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>

                                      <div>
                                        <Label className="text-base font-semibold">Asignar Gestor</Label>
                                        <Select 
                                          value={inscripcionSeleccionada.id_gestor_asignado || ""}
                                          onValueChange={(value) => {
                                            handleActualizarInscripcion(inscripcionSeleccionada.id_inscripcion, {
                                              id_gestor_asignado: value || undefined
                                            });
                                          }}
                                        >
                                          <SelectTrigger>
                                            <SelectValue placeholder="Selecciona gestor" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            {gestores.map((gestor) => (
                                              <SelectItem key={gestor.id_persona} value={gestor.id_persona}>
                                                {gestor.nombre_completo}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pestaña Cursos */}
          <TabsContent value="cursos">
            <Card>
              <CardHeader>
                <CardTitle>Cursos Disponibles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {cursos.map((curso) => {
                    const inscritos = inscripciones.filter(i => i.id_curso === curso.id_curso).length;
                    return (
                      <Card key={curso.id_curso}>
                        <CardHeader>
                          <CardTitle className="text-lg">{curso.nombre_curso}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div>
                            <p className="text-sm text-muted-foreground">Estado</p>
                            <p className="font-semibold capitalize">{curso.estado_curso}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Inscritos</p>
                            <p className="font-semibold">{inscritos} / {curso.cupos}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Responsable</p>
                            <p className="font-semibold text-sm">
                              {gestores.find(g => g.id_persona === curso.id_gestor_responsable)?.nombre_completo || "N/A"}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pestaña Gestores */}
          <TabsContent value="gestores">
            <Card>
              <CardHeader>
                <CardTitle>Gestores y Master Teachers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {gestores.map((gestor) => {
                    const inscripcionesAsignadas = inscripciones.filter(i => i.id_gestor_asignado === gestor.id_persona).length;
                    return (
                      <Card key={gestor.id_persona}>
                        <CardHeader>
                          <CardTitle className="text-lg">{gestor.nombre_completo}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div>
                            <p className="text-sm text-muted-foreground">Rol</p>
                            <p className="font-semibold capitalize">{gestor.rol.replace("_", " ")}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Institución</p>
                            <p className="font-semibold text-sm">{gestor.institucion}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Inscripciones Asignadas</p>
                            <p className="font-semibold">{inscripcionesAsignadas}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Contacto</p>
                            <p className="font-semibold text-sm">{gestor.correo}</p>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
