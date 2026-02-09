import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { useAuth } from '@/_core/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { LogOut, Search, Plus, Edit2, Trash2, Eye, Download } from 'lucide-react';
import { Link } from 'wouter';
import { CreateCentroInteresDialog, CreateSesionDialog, CreateAsesoriaDialog } from '@/components/CRMDialogs';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function CRMNew() {
  const { user, logout, isAuthenticated } = useAuth();
  const [searchCentros, setSearchCentros] = useState('');
  const [searchSesiones, setSearchSesiones] = useState('');
  const [searchAsesorias, setSearchAsesorias] = useState('');
  const [openCreateCentro, setOpenCreateCentro] = useState(false);
  const [openCreateSesion, setOpenCreateSesion] = useState(false);
  const [openCreateAsesoria, setOpenCreateAsesoria] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{ type: 'centro' | 'sesion' | 'asesoria' | null; id: number | null }>({ type: null, id: null });

  // Queries
  const { data: centros = [], isLoading: loadingCentros, refetch: refetchCentros } = trpc.centrosInteres.list.useQuery();
  const { data: sesiones = [], isLoading: loadingSesiones, refetch: refetchSesiones } = trpc.sesiones.list.useQuery();
  const { data: asesorias = [], isLoading: loadingAsesorias, refetch: refetchAsesorias } = trpc.asesorias.list.useQuery();

  // Mutations
  const deleteCentro = trpc.centrosInteres.delete.useMutation({
    onSuccess: () => {
      toast.success('Centro de interés eliminado');
      refetchCentros();
      setDeleteDialog({ type: null, id: null });
    },
    onError: (error) => {
      toast.error(`Error al eliminar: ${error.message}`);
    },
  });

  const deleteSesion = trpc.sesiones.delete.useMutation({
    onSuccess: () => {
      toast.success('Sesión eliminada');
      refetchSesiones();
      setDeleteDialog({ type: null, id: null });
    },
    onError: (error) => {
      toast.error(`Error al eliminar: ${error.message}`);
    },
  });

  const deleteAsesoria = trpc.asesorias.delete.useMutation({
    onSuccess: () => {
      toast.success('Asesoría eliminada');
      refetchAsesorias();
      setDeleteDialog({ type: null, id: null });
    },
    onError: (error) => {
      toast.error(`Error al eliminar: ${error.message}`);
    },
  });

  const handleDelete = () => {
    if (!deleteDialog.id) return;
    
    if (deleteDialog.type === 'centro') {
      deleteCentro.mutate(deleteDialog.id);
    } else if (deleteDialog.type === 'sesion') {
      deleteSesion.mutate(deleteDialog.id);
    } else if (deleteDialog.type === 'asesoria') {
      deleteAsesoria.mutate(deleteDialog.id);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Acceso Restringido</CardTitle>
            <CardDescription>Debes iniciar sesión para acceder al CRM</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/">
              <Button className="w-full">Volver al Inicio</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Filtrar datos
  const centrosFiltrados = centros.filter(c =>
    c.nombre.toLowerCase().includes(searchCentros.toLowerCase()) ||
    c.institucionEducativa.toLowerCase().includes(searchCentros.toLowerCase())
  );

  const sesionesFiltradas = sesiones.filter(s =>
    s.titulo.toLowerCase().includes(searchSesiones.toLowerCase())
  );

  const asesoriasFiltradas = asesorias.filter(a =>
    a.titulo.toLowerCase().includes(searchAsesorias.toLowerCase()) ||
    a.institucionEducativa.toLowerCase().includes(searchAsesorias.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-8 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">CRM - Centro de Innovación Educativa CID</h1>
              <p className="text-blue-100">Gestión de Centros de Interés, Sesiones, Asistencia y Asesorías</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-blue-100">Bienvenido</p>
                <p className="font-semibold">{user?.name || 'Usuario'}</p>
                <p className="text-xs text-blue-100 capitalize">{user?.role === 'admin' ? 'Administrador' : 'Gestor'}</p>
              </div>
              <Button
                variant="outline"
                className="text-white border-white hover:bg-white/20"
                onClick={() => logout()}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-8 px-4">
        <Tabs defaultValue="centros" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="centros">Centros de Interés</TabsTrigger>
            <TabsTrigger value="sesiones">Sesiones CDI</TabsTrigger>
            <TabsTrigger value="asistencia">Asistencia</TabsTrigger>
            <TabsTrigger value="asesorias">Asesorías</TabsTrigger>
          </TabsList>

          {/* CENTROS DE INTERÉS */}
          <TabsContent value="centros" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex-1 flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Buscar por nombre o institución..."
                    value={searchCentros}
                    onChange={(e) => setSearchCentros(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button className="ml-2" onClick={() => setOpenCreateCentro(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Centro
              </Button>
            </div>

            {loadingCentros ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-gray-500">Cargando...</p>
                </CardContent>
              </Card>
            ) : centrosFiltrados.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-gray-500">No hay centros de interés</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {centrosFiltrados.map((centro) => (
                  <Card key={centro.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{centro.nombre}</CardTitle>
                          <CardDescription>{centro.institucionEducativa}</CardDescription>
                        </div>
                        <Badge variant={centro.estado === 'activo' ? 'default' : 'secondary'}>
                          {centro.estado}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Gestor</p>
                          <p className="font-semibold">{centro.correoGestor}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Línea Temática</p>
                          <p className="font-semibold">{centro.lineaTematica}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Estudiantes</p>
                          <p className="font-semibold">{centro.numeroEstudiantes}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Sesiones</p>
                          <p className="font-semibold">{centro.numeroSesiones}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Ver
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit2 className="w-4 h-4 mr-2" />
                          Editar
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-600"
                          onClick={() => setDeleteDialog({ type: 'centro', id: centro.id })}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Eliminar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* SESIONES CDI */}
          <TabsContent value="sesiones" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex-1 flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Buscar por título de sesión..."
                    value={searchSesiones}
                    onChange={(e) => setSearchSesiones(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button className="ml-2" onClick={() => setOpenCreateSesion(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Nueva Sesión
              </Button>
            </div>

            {loadingSesiones ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-gray-500">Cargando...</p>
                </CardContent>
              </Card>
            ) : sesionesFiltradas.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-gray-500">No hay sesiones</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {sesionesFiltradas.map((sesion) => (
                  <Card key={sesion.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{sesion.titulo}</CardTitle>
                          <CardDescription>Sesión #{sesion.numeroSesion}</CardDescription>
                        </div>
                        <Badge variant={sesion.estado === 'completada' ? 'default' : 'secondary'}>
                          {sesion.estado}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Fecha y Hora</p>
                          <p className="font-semibold">{new Date(sesion.fechaHora).toLocaleString('es-CO')}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Duración</p>
                          <p className="font-semibold">{sesion.duracionMinutos} min</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Ver
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit2 className="w-4 h-4 mr-2" />
                          Editar
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-600"
                          onClick={() => setDeleteDialog({ type: 'centro', id: centro.id })}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Eliminar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* ASISTENCIA */}
          <TabsContent value="asistencia" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Registro de Asistencia</CardTitle>
                <CardDescription>Selecciona una sesión para ver y gestionar la asistencia</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sesionesFiltradas.length > 0 ? (
                    <div className="grid gap-4">
                      {sesionesFiltradas.map((sesion) => (
                        <Card key={sesion.id} className="cursor-pointer hover:shadow-md transition-shadow">
                          <CardHeader>
                            <CardTitle className="text-base">{sesion.titulo}</CardTitle>
                            <CardDescription>Sesión #{sesion.numeroSesion}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Button>Ver Asistencia</Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500">No hay sesiones disponibles</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ASESORÍAS */}
          <TabsContent value="asesorias" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex-1 flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Buscar por título o institución..."
                    value={searchAsesorias}
                    onChange={(e) => setSearchAsesorias(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button className="ml-2" onClick={() => setOpenCreateAsesoria(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Nueva Asesoría
              </Button>
            </div>

            {loadingAsesorias ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-gray-500">Cargando...</p>
                </CardContent>
              </Card>
            ) : asesoriasFiltradas.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-gray-500">No hay asesorías</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {asesoriasFiltradas.map((asesoria) => (
                  <Card key={asesoria.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{asesoria.titulo}</CardTitle>
                          <CardDescription>{asesoria.institucionEducativa}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Persona</p>
                          <p className="font-semibold">{asesoria.primerNombre} {asesoria.primerApellido}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Rol</p>
                          <p className="font-semibold">{asesoria.rolPersona}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Tipo Acompañamiento</p>
                          <p className="font-semibold">{asesoria.tipoAcompanamiento}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Fecha</p>
                          <p className="font-semibold">{new Date(asesoria.fechaAsesoria).toLocaleDateString('es-CO')}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Ver
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit2 className="w-4 h-4 mr-2" />
                          Editar
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-600"
                          onClick={() => setDeleteDialog({ type: 'asesoria', id: asesoria.id })}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Eliminar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Diálogos */}
      <CreateCentroInteresDialog
        open={openCreateCentro}
        onOpenChange={setOpenCreateCentro}
        onSuccess={() => refetchCentros()}
      />

      <CreateSesionDialog
        open={openCreateSesion}
        onOpenChange={setOpenCreateSesion}
        centros={centros}
        onSuccess={() => refetchSesiones()}
      />

      <CreateAsesoriaDialog
        open={openCreateAsesoria}
        onOpenChange={setOpenCreateAsesoria}
        onSuccess={() => refetchAsesorias()}
      />

      {/* Dialog de confirmación de eliminación */}
      <AlertDialog open={deleteDialog.type !== null} onOpenChange={(open) => !open && setDeleteDialog({ type: null, id: null })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente el registro.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
