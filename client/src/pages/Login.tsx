import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authenticate, saveSession } from "@/lib/database";
import { toast } from "sonner";
import { LogIn, AlertCircle } from "lucide-react";

export default function Login() {
  const [, setLocation] = useLocation();
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);

    setTimeout(() => {
      const usuario = authenticate(correo, contraseña);
      
      if (usuario) {
        saveSession(usuario);
        toast.success(`¡Bienvenido, ${usuario.nombre_completo}!`);
        setLocation("/crm");
      } else {
        toast.error("Correo o contraseña incorrectos");
      }
      
      setCargando(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4">
              <LogIn className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">CRM – CID</CardTitle>
            <CardDescription>Acceso al sistema de gestión de inscripciones</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="correo">Correo Electrónico</Label>
                <Input 
                  id="correo" 
                  type="email"
                  placeholder="usuario@cid.edu.co"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="contraseña">Contraseña</Label>
                <Input 
                  id="contraseña" 
                  type="password"
                  placeholder="••••••••"
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={cargando}>
                {cargando ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
            </form>

            {/* Credenciales de prueba */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">Credenciales de Prueba</p>
              </div>
              <div className="text-xs text-blue-800 dark:text-blue-200 space-y-1 ml-7">
                <p><strong>Admin:</strong> admin@cid.com / admin123</p>
                <p><strong>Gestor:</strong> gestor@cid.com / gestor123</p>
                <p><strong>Master Teacher:</strong> master@cid.com / master123</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
