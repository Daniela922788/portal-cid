import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';

// ============================================
// DIÁLOGO CREAR/EDITAR CENTRO DE INTERÉS
// ============================================

interface CreateCentroInteresDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CreateCentroInteresDialog({ open, onOpenChange, onSuccess }: CreateCentroInteresDialogProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    correoGestor: '',
    institucionEducativa: '',
    fechaInicio: '',
    numeroSesiones: '',
    lineaTematica: '',
    codigoGrupo: '',
    grado: '',
    numeroEstudiantes: '',
    numeroDocentes: '',
  });
  const [selectedGestores, setSelectedGestores] = useState<number[]>([]);
  const [showGestoresDropdown, setShowGestoresDropdown] = useState(false);
  
  // Obtener lista de gestores
  const { data: gestoresList = [] } = trpc.gestores.list.useQuery();

  const createMutation = trpc.centrosInteres.create.useMutation({
    onSuccess: () => {
      toast.success('Centro de interés creado exitosamente');
      setFormData({
        nombre: '',
        correoGestor: '',
        institucionEducativa: '',
        fechaInicio: '',
        numeroSesiones: '',
        lineaTematica: '',
        codigoGrupo: '',
        grado: '',
        numeroEstudiantes: '',
        numeroDocentes: '',
      });
      setSelectedGestores([]);
      onOpenChange(false);
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.nombre || !formData.institucionEducativa || !formData.fechaInicio) {
      toast.error('Por favor completa los campos requeridos');
      return;
    }

    if (selectedGestores.length === 0) {
      toast.error('Selecciona al menos un gestor');
      return;
    }
    
    createMutation.mutate({
      ...formData,
      fechaInicio: new Date(formData.fechaInicio),
      numeroSesiones: parseInt(formData.numeroSesiones) || 0,
      numeroEstudiantes: parseInt(formData.numeroEstudiantes) || 0,
      numeroDocentes: parseInt(formData.numeroDocentes) || 0,
      gestoresIds: selectedGestores,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Centro de Interés</DialogTitle>
          <DialogDescription>
            Completa los siguientes campos para crear un nuevo centro de interés
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nombre">Nombre del Centro *</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                placeholder="Ej: STEAM Talkers"
                required
              />
            </div>

            <div>
              <Label htmlFor="codigoGrupo">Código del Grupo *</Label>
              <Input
                id="codigoGrupo"
                value={formData.codigoGrupo}
                onChange={(e) => setFormData({ ...formData, codigoGrupo: e.target.value })}
                placeholder="Ej: AVB_STEAM"
                required
              />
            </div>

            <div>
              <Label htmlFor="institucionEducativa">Institución Educativa *</Label>
              <Input
                id="institucionEducativa"
                value={formData.institucionEducativa}
                onChange={(e) => setFormData({ ...formData, institucionEducativa: e.target.value })}
                placeholder="Ej: Alejandro Vélez Barrientos"
                required
              />
            </div>

            <div>
              <Label htmlFor="lineaTematica">Línea Temática *</Label>
              <Input
                id="lineaTematica"
                value={formData.lineaTematica}
                onChange={(e) => setFormData({ ...formData, lineaTematica: e.target.value })}
                placeholder="Ej: STEM Talkers"
                required
              />
            </div>

            <div>
              <Label htmlFor="correoGestor">Correo del Gestor *</Label>
              <Input
                id="correoGestor"
                type="email"
                value={formData.correoGestor}
                onChange={(e) => setFormData({ ...formData, correoGestor: e.target.value })}
                placeholder="Ej: gestor@cid.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="fechaInicio">Fecha de Inicio *</Label>
              <Input
                id="fechaInicio"
                type="date"
                value={formData.fechaInicio}
                onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="grado">Grado(s) *</Label>
              <Input
                id="grado"
                value={formData.grado}
                onChange={(e) => setFormData({ ...formData, grado: e.target.value })}
                placeholder="Ej: 8°, 9°, 10°"
                required
              />
            </div>

            <div>
              <Label htmlFor="numeroSesiones">Número de Sesiones *</Label>
              <Input
                id="numeroSesiones"
                type="number"
                value={formData.numeroSesiones}
                onChange={(e) => setFormData({ ...formData, numeroSesiones: e.target.value })}
                placeholder="Ej: 6"
                required
              />
            </div>

            <div>
              <Label htmlFor="numeroEstudiantes">Número de Estudiantes *</Label>
              <Input
                id="numeroEstudiantes"
                type="number"
                value={formData.numeroEstudiantes}
                onChange={(e) => setFormData({ ...formData, numeroEstudiantes: e.target.value })}
                placeholder="Ej: 25"
                required
              />
            </div>

            <div>
              <Label htmlFor="numeroDocentes">Número de Docentes *</Label>
              <Input
                id="numeroDocentes"
                type="number"
                value={formData.numeroDocentes}
                onChange={(e) => setFormData({ ...formData, numeroDocentes: e.target.value })}
                placeholder="Ej: 2"
                required
              />
            </div>
          </div>

          {/* Selector de Gestores */}
          <div className="border-t pt-4">
            <Label className="mb-3 block">Selecciona Gestor(es) *</Label>
            <div className="space-y-2 max-h-48 overflow-y-auto border rounded p-3 bg-muted/50">
              {gestoresList.length === 0 ? (
                <p className="text-sm text-muted-foreground">Cargando gestores...</p>
              ) : (
                gestoresList.map((gestor: any) => (
                  <div key={gestor.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`gestor-${gestor.id}`}
                      checked={selectedGestores.includes(gestor.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedGestores([...selectedGestores, gestor.id]);
                        } else {
                          setSelectedGestores(selectedGestores.filter(id => id !== gestor.id));
                        }
                      }}
                    />
                    <Label htmlFor={`gestor-${gestor.id}`} className="cursor-pointer text-sm font-normal">
                      {gestor.nombre}
                    </Label>
                  </div>
                ))
              )}
            </div>
            {selectedGestores.length > 0 && (
              <p className="text-xs text-muted-foreground mt-2">
                {selectedGestores.length} gestor(es) seleccionado(s)
              </p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={createMutation.isPending}>
              {createMutation.isPending ? 'Creando...' : 'Crear Centro'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ============================================
// DIÁLOGO CREAR SESIÓN CDI
// ============================================

interface CreateSesionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  centros: any[];
  onSuccess?: () => void;
}

export function CreateSesionDialog({ open, onOpenChange, centros, onSuccess }: CreateSesionDialogProps) {
  const [formData, setFormData] = useState({
    titulo: '',
    centroInteresId: '',
    numeroSesion: '',
    fechaHora: '',
    duracionMinutos: '',
  });

  const createMutation = trpc.sesiones.create.useMutation({
    onSuccess: () => {
      toast.success('Sesión creada exitosamente');
      setFormData({
        titulo: '',
        centroInteresId: '',
        numeroSesion: '',
        fechaHora: '',
        duracionMinutos: '',
      });
      onOpenChange(false);
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.titulo || !formData.centroInteresId || !formData.fechaHora) {
      toast.error('Por favor completa los campos requeridos');
      return;
    }

    createMutation.mutate({
      titulo: formData.titulo,
      centroInteresId: parseInt(formData.centroInteresId),
      numeroSesion: parseInt(formData.numeroSesion) || 1,
      fechaHora: new Date(formData.fechaHora),
      duracionMinutos: parseInt(formData.duracionMinutos) || 60,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Crear Nueva Sesión CDI</DialogTitle>
          <DialogDescription>
            Completa los siguientes campos para crear una nueva sesión
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="centroInteres">Centro de Interés *</Label>
            <Select value={formData.centroInteresId} onValueChange={(value) => setFormData({ ...formData, centroInteresId: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un centro de interés" />
              </SelectTrigger>
              <SelectContent>
                {centros.map((centro) => (
                  <SelectItem key={centro.id} value={String(centro.id)}>
                    {centro.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="titulo">Título de la Sesión *</Label>
            <Input
              id="titulo"
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              placeholder="Ej: Sesión 1: ¿Qué es investigar?"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="numeroSesion">Número de Sesión *</Label>
              <Input
                id="numeroSesion"
                type="number"
                value={formData.numeroSesion}
                onChange={(e) => setFormData({ ...formData, numeroSesion: e.target.value })}
                placeholder="1"
                required
              />
            </div>

            <div>
              <Label htmlFor="fechaHora">Fecha y Hora *</Label>
              <Input
                id="fechaHora"
                type="datetime-local"
                value={formData.fechaHora}
                onChange={(e) => setFormData({ ...formData, fechaHora: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="duracionMinutos">Duración (min) *</Label>
              <Input
                id="duracionMinutos"
                type="number"
                value={formData.duracionMinutos}
                onChange={(e) => setFormData({ ...formData, duracionMinutos: e.target.value })}
                placeholder="60"
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={createMutation.isPending}>
              {createMutation.isPending ? 'Creando...' : 'Crear Sesión'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ============================================
// DIÁLOGO CREAR ASESORÍA
// ============================================

interface CreateAsesoriaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CreateAsesoriaDialog({ open, onOpenChange, onSuccess }: CreateAsesoriaDialogProps) {
  const [formData, setFormData] = useState({
    titulo: '',
    tipoDocumento: 'CC',
    documentoIdentidad: '',
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    telefono: '',
    correoElectronico: '',
    institucionEducativa: '',
    rolPersona: '',
    barrioVereda: '',
    ruralUrbano: 'Urbano',
    fechaNacimiento: '',
    edad: '',
    genero: 'Otro',
    grado: '',
    duracionMinutos: '',
    fechaAsesoria: '',
    tipoAcompanamiento: '',
  });

  const createMutation = trpc.asesorias.create.useMutation({
    onSuccess: () => {
      toast.success('Asesoría creada exitosamente');
      setFormData({
        titulo: '',
        tipoDocumento: 'CC',
        documentoIdentidad: '',
        primerNombre: '',
        segundoNombre: '',
        primerApellido: '',
        segundoApellido: '',
        telefono: '',
        correoElectronico: '',
        institucionEducativa: '',
        rolPersona: '',
        barrioVereda: '',
        ruralUrbano: 'Urbano',
        fechaNacimiento: '',
        edad: '',
        genero: 'Otro',
        grado: '',
        duracionMinutos: '',
        fechaAsesoria: '',
        tipoAcompanamiento: '',
      });
      onOpenChange(false);
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.titulo || !formData.primerNombre || !formData.primerApellido || !formData.institucionEducativa) {
      toast.error('Por favor completa los campos requeridos');
      return;
    }

    createMutation.mutate({
      titulo: formData.titulo,
      tipoDocumento: formData.tipoDocumento,
      documentoIdentidad: formData.documentoIdentidad,
      primerNombre: formData.primerNombre,
      segundoNombre: formData.segundoNombre || undefined,
      primerApellido: formData.primerApellido,
      segundoApellido: formData.segundoApellido || undefined,
      telefono: formData.telefono || undefined,
      correoElectronico: formData.correoElectronico || undefined,
      institucionEducativa: formData.institucionEducativa,
      rolPersona: formData.rolPersona,
      barrioVereda: formData.barrioVereda || undefined,
      ruralUrbano: formData.ruralUrbano as 'Rural' | 'Urbano',
      fechaNacimiento: formData.fechaNacimiento ? new Date(formData.fechaNacimiento) : undefined,
      edad: formData.edad ? parseInt(formData.edad) : undefined,
      genero: formData.genero as 'Hombre' | 'Mujer' | 'Otro',
      grado: formData.grado || undefined,
      duracionMinutos: parseInt(formData.duracionMinutos) || 60,
      fechaAsesoria: new Date(formData.fechaAsesoria),
      tipoAcompanamiento: formData.tipoAcompanamiento,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Crear Nueva Asesoría</DialogTitle>
          <DialogDescription>
            Completa los siguientes campos para registrar una nueva asesoría
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Información de la Asesoría */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Información de la Asesoría</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="titulo">Título de la Asesoría *</Label>
                <Input
                  id="titulo"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  placeholder="Ej: Proyecto de investigación"
                  required
                />
              </div>
              <div>
                <Label htmlFor="tipoAcompanamiento">Tipo de Acompañamiento *</Label>
                <Input
                  id="tipoAcompanamiento"
                  value={formData.tipoAcompanamiento}
                  onChange={(e) => setFormData({ ...formData, tipoAcompanamiento: e.target.value })}
                  placeholder="Ej: Acompañamiento en oficina individual"
                  required
                />
              </div>
              <div>
                <Label htmlFor="fechaAsesoria">Fecha de Asesoría *</Label>
                <Input
                  id="fechaAsesoria"
                  type="datetime-local"
                  value={formData.fechaAsesoria}
                  onChange={(e) => setFormData({ ...formData, fechaAsesoria: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="duracionMinutos">Duración (minutos) *</Label>
                <Input
                  id="duracionMinutos"
                  type="number"
                  value={formData.duracionMinutos}
                  onChange={(e) => setFormData({ ...formData, duracionMinutos: e.target.value })}
                  placeholder="60"
                  required
                />
              </div>
            </div>
          </div>

          {/* Información Personal */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Información Personal</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="tipoDocumento">Tipo de Documento *</Label>
                <Select value={formData.tipoDocumento} onValueChange={(value) => setFormData({ ...formData, tipoDocumento: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CC">Cédula de Ciudadanía</SelectItem>
                    <SelectItem value="CE">Cédula de Extranjería</SelectItem>
                    <SelectItem value="TI">Tarjeta de Identidad</SelectItem>
                    <SelectItem value="PP">Pasaporte</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <Label htmlFor="documentoIdentidad">Documento de Identidad *</Label>
                <Input
                  id="documentoIdentidad"
                  value={formData.documentoIdentidad}
                  onChange={(e) => setFormData({ ...formData, documentoIdentidad: e.target.value })}
                  placeholder="Ej: 1234567890"
                  required
                />
              </div>
              <div>
                <Label htmlFor="primerNombre">Primer Nombre *</Label>
                <Input
                  id="primerNombre"
                  value={formData.primerNombre}
                  onChange={(e) => setFormData({ ...formData, primerNombre: e.target.value })}
                  placeholder="Ej: Juan"
                  required
                />
              </div>
              <div>
                <Label htmlFor="segundoNombre">Segundo Nombre</Label>
                <Input
                  id="segundoNombre"
                  value={formData.segundoNombre}
                  onChange={(e) => setFormData({ ...formData, segundoNombre: e.target.value })}
                  placeholder="Ej: Carlos"
                />
              </div>
              <div>
                <Label htmlFor="primerApellido">Primer Apellido *</Label>
                <Input
                  id="primerApellido"
                  value={formData.primerApellido}
                  onChange={(e) => setFormData({ ...formData, primerApellido: e.target.value })}
                  placeholder="Ej: Pérez"
                  required
                />
              </div>
              <div>
                <Label htmlFor="segundoApellido">Segundo Apellido</Label>
                <Input
                  id="segundoApellido"
                  value={formData.segundoApellido}
                  onChange={(e) => setFormData({ ...formData, segundoApellido: e.target.value })}
                  placeholder="Ej: García"
                />
              </div>
              <div>
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  placeholder="Ej: 3001234567"
                />
              </div>
              <div>
                <Label htmlFor="correoElectronico">Correo Electrónico</Label>
                <Input
                  id="correoElectronico"
                  type="email"
                  value={formData.correoElectronico}
                  onChange={(e) => setFormData({ ...formData, correoElectronico: e.target.value })}
                  placeholder="Ej: juan@example.com"
                />
              </div>
              <div>
                <Label htmlFor="genero">Género</Label>
                <Select value={formData.genero} onValueChange={(value) => setFormData({ ...formData, genero: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hombre">Hombre</SelectItem>
                    <SelectItem value="Mujer">Mujer</SelectItem>
                    <SelectItem value="Otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
                <Input
                  id="fechaNacimiento"
                  type="date"
                  value={formData.fechaNacimiento}
                  onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edad">Edad</Label>
                <Input
                  id="edad"
                  type="number"
                  value={formData.edad}
                  onChange={(e) => setFormData({ ...formData, edad: e.target.value })}
                  placeholder="Ej: 35"
                />
              </div>
            </div>
          </div>

          {/* Información Institucional */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Información Institucional</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="institucionEducativa">Institución Educativa *</Label>
                <Input
                  id="institucionEducativa"
                  value={formData.institucionEducativa}
                  onChange={(e) => setFormData({ ...formData, institucionEducativa: e.target.value })}
                  placeholder="Ej: Darío de Bedout"
                  required
                />
              </div>
              <div>
                <Label htmlFor="rolPersona">Rol de la Persona *</Label>
                <Input
                  id="rolPersona"
                  value={formData.rolPersona}
                  onChange={(e) => setFormData({ ...formData, rolPersona: e.target.value })}
                  placeholder="Ej: Docente"
                  required
                />
              </div>
              <div>
                <Label htmlFor="barrioVereda">Barrio/Vereda</Label>
                <Input
                  id="barrioVereda"
                  value={formData.barrioVereda}
                  onChange={(e) => setFormData({ ...formData, barrioVereda: e.target.value })}
                  placeholder="Ej: Barrio La Sebastiana"
                />
              </div>
              <div>
                <Label htmlFor="ruralUrbano">Rural/Urbano</Label>
                <Select value={formData.ruralUrbano} onValueChange={(value) => setFormData({ ...formData, ruralUrbano: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Rural">Rural</SelectItem>
                    <SelectItem value="Urbano">Urbano</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="grado">Grado</Label>
                <Input
                  id="grado"
                  value={formData.grado}
                  onChange={(e) => setFormData({ ...formData, grado: e.target.value })}
                  placeholder="Ej: 8°"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={createMutation.isPending}>
              {createMutation.isPending ? 'Creando...' : 'Crear Asesoría'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
