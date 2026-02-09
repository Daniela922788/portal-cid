import { Link } from "wouter";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Gamepad2, Brain, Rocket, Lightbulb } from "lucide-react";

export default function CIDKids() {
  return (
    <div className="min-h-screen py-8 bg-gradient-to-b from-background to-muted/30">
      <div className="container">
        <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "CID Kids" }]} />
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              CID Kids
            </h1>
            <Sparkles className="h-8 w-8 text-secondary animate-pulse" />
          </div>
          <p className="text-xl text-muted-foreground">
            ¡Aprende jugando! Descubre el mundo de la ciencia y la tecnología
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">🎮 Juegos Educativos</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-xl transition-shadow border-2 border-primary/20">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-3 mx-auto">
                  <Rocket className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-center">Viaje al Espacio</CardTitle>
                <CardDescription className="text-center">
                  Aprende sobre el sistema solar mientras viajas por el espacio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/juegos/espacio">
                  <Button className="w-full" variant="default">
                    <Gamepad2 className="h-4 w-4 mr-2" />
                    Jugar Ahora
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow border-2 border-secondary/20">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-3 mx-auto">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-center">Retos Matemáticos</CardTitle>
                <CardDescription className="text-center">
                  Resuelve problemas matemáticos de forma divertida
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/juegos/matematicas">
                  <Button className="w-full" variant="default">
                    <Gamepad2 className="h-4 w-4 mr-2" />
                    Jugar Ahora
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow border-2 border-green-500/20">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-3 mx-auto">
                  <span className="text-2xl">🌿</span>
                </div>
                <CardTitle className="text-center">Envigado Curioso</CardTitle>
                <CardDescription className="text-center">
                  Descubre la fauna y biodiversidad de Envigado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/juegos/envigado-curioso">
                  <Button className="w-full" variant="default">
                    <Gamepad2 className="h-4 w-4 mr-2" />
                    Jugar Ahora
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow border-2 border-accent/20">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-3 mx-auto">
                  <Lightbulb className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-center">Fábrica de Inventos</CardTitle>
                <CardDescription className="text-center">
                  Construye máquinas increíbles y creativas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/juegos/fabrica-inventos">
                  <Button className="w-full" variant="default">
                    <Gamepad2 className="h-4 w-4 mr-2" />
                    Jugar Ahora
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-center">💡 ¿Sabías que...?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                  Dato Curioso #1
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  ¿Sabías que la luz del Sol tarda aproximadamente 8 minutos en llegar a la Tierra? 
                  ¡Eso significa que cuando miras el Sol, lo estás viendo como era hace 8 minutos!
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-green-600" />
                  Dato Curioso #2
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  ¿Sabías que las abejas pueden reconocer rostros humanos? Usan la misma técnica 
                  que nosotros: reconocen patrones y características únicas.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  Dato Curioso #3
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  ¿Sabías que el corazón humano late aproximadamente 100,000 veces al día? 
                  ¡Eso es más de 35 millones de latidos al año!
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-orange-600" />
                  Dato Curioso #4
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  ¿Sabías que un rayo puede alcanzar temperaturas de hasta 30,000 grados Celsius? 
                  ¡Eso es cinco veces más caliente que la superficie del Sol!
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
