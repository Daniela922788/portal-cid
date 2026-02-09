import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { useAuth } from '@/_core/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Loader2, Upload } from 'lucide-react';
import { Link } from 'wouter';

export default function LoadData() {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const loadDataMutation = trpc.loadData.useMutation({
    onSuccess: (data) => {
      setResult(data);
      setError(null);
      setLoading(false);
    },
    onError: (err) => {
      setError(err.message);
      setResult(null);
      setLoading(false);
    },
  });

  const handleLoadData = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    loadDataMutation.mutate();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Acceso Denegado</CardTitle>
            <CardDescription>Debes iniciar sesión para cargar datos</CardDescription>
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

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Permiso Denegado</CardTitle>
            <CardDescription>Solo administradores pueden cargar datos</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/crm-new">
              <Button className="w-full">Ir al CRM</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-6 h-6" />
              Cargar Datos del Excel
            </CardTitle>
            <CardDescription>
              Carga todos los datos del archivo Ejemplo.xlsx a la base de datos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Información */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>Nota:</strong> Este proceso cargará todos los datos de:
              </p>
              <ul className="text-sm text-blue-900 mt-2 ml-4 list-disc">
                <li>Centros de Interés</li>
                <li>Sesiones CDI</li>
                <li>Registros de Asistencia</li>
                <li>Asesorías</li>
              </ul>
            </div>

            {/* Botón de Carga */}
            <Button
              onClick={handleLoadData}
              disabled={loading}
              size="lg"
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Cargando datos...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Cargar Datos Ahora
                </>
              )}
            </Button>

            {/* Resultado Exitoso */}
            {result && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-green-900">{result.message}</p>
                    <div className="mt-2 text-sm text-green-800 space-y-1">
                      <p>✓ Centros de Interés: {result.stats.centros}</p>
                      <p>✓ Sesiones CDI: {result.stats.sesiones}</p>
                      <p>✓ Registros de Asistencia: {result.stats.asistencias}</p>
                      <p>✓ Asesorías: {result.stats.asesorias}</p>
                    </div>
                  </div>
                </div>
                <Link href="/crm-new">
                  <Button variant="outline" className="w-full mt-4">
                    Ir al CRM para Ver los Datos
                  </Button>
                </Link>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-red-900">Error al cargar datos</p>
                    <p className="text-sm text-red-800 mt-1">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Información Adicional */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong>Usuario actual:</strong> {user?.email}
              </p>
              <p className="text-sm text-gray-700 mt-1">
                <strong>Rol:</strong> {user?.role === 'admin' ? 'Administrador' : 'Usuario'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
