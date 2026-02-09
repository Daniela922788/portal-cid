import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Check } from "lucide-react";

interface Planeta {
  id: number;
  nombre: string;
  distancia: string;
  temperatura: string;
  tipo: string;
  curiosidad: string;
  posicion: { x: number; y: number };
  tamaño: number;
  color: string;
}

const planetas: Planeta[] = [
  {
    id: 1,
    nombre: "Mercurio",
    distancia: "57.9 millones km",
    temperatura: "430°C",
    tipo: "Rocoso",
    curiosidad: "Es el planeta más cercano al Sol y el más rápido.",
    posicion: { x: 15, y: 50 },
    tamaño: 8,
    color: "bg-gray-400"
  },
  {
    id: 2,
    nombre: "Venus",
    distancia: "108.2 millones km",
    temperatura: "465°C",
    tipo: "Rocoso",
    curiosidad: "Tiene la atmósfera más densa de todos los planetas.",
    posicion: { x: 25, y: 50 },
    tamaño: 12,
    color: "bg-yellow-300"
  },
  {
    id: 3,
    nombre: "Tierra",
    distancia: "149.6 millones km",
    temperatura: "15°C",
    tipo: "Rocoso",
    curiosidad: "¡Es nuestro hogar! El único planeta con vida conocida.",
    posicion: { x: 35, y: 50 },
    tamaño: 12,
    color: "bg-blue-500"
  },
  {
    id: 4,
    nombre: "Marte",
    distancia: "227.9 millones km",
    temperatura: "-65°C",
    tipo: "Rocoso",
    curiosidad: "Se le llama el Planeta Rojo por su color.",
    posicion: { x: 45, y: 50 },
    tamaño: 10,
    color: "bg-red-600"
  },
  {
    id: 5,
    nombre: "Júpiter",
    distancia: "778.5 millones km",
    temperatura: "-110°C",
    tipo: "Gaseoso",
    curiosidad: "Es el planeta más grande del Sistema Solar.",
    posicion: { x: 60, y: 50 },
    tamaño: 20,
    color: "bg-orange-400"
  },
  {
    id: 6,
    nombre: "Saturno",
    distancia: "1.434 mil millones km",
    temperatura: "-140°C",
    tipo: "Gaseoso",
    curiosidad: "Tiene anillos espectaculares hechos de hielo y roca.",
    posicion: { x: 75, y: 50 },
    tamaño: 18,
    color: "bg-yellow-200"
  },
  {
    id: 7,
    nombre: "Urano",
    distancia: "2.873 mil millones km",
    temperatura: "-195°C",
    tipo: "Gaseoso",
    curiosidad: "Gira de lado, como si estuviera acostado.",
    posicion: { x: 85, y: 50 },
    tamaño: 14,
    color: "bg-cyan-400"
  },
  {
    id: 8,
    nombre: "Neptuno",
    distancia: "4.495 mil millones km",
    temperatura: "-200°C",
    tipo: "Gaseoso",
    curiosidad: "Tiene los vientos más fuertes del Sistema Solar.",
    posicion: { x: 95, y: 50 },
    tamaño: 14,
    color: "bg-blue-700"
  }
];

export default function SistemaSolar() {
  const [planetaSeleccionado, setPlanetaSeleccionado] = useState<Planeta | null>(null);
  const [retosCompletados, setRetosCompletados] = useState<number[]>([]);
  const [juegoCompletado, setJuegoCompletado] = useState(false);

  const handlePlanetaClick = (planeta: Planeta) => {
    setPlanetaSeleccionado(planeta);
  };

  const completarReto = (planetaId: number) => {
    if (!retosCompletados.includes(planetaId)) {
      const nuevosRetos = [...retosCompletados, planetaId];
      setRetosCompletados(nuevosRetos);
      
      if (nuevosRetos.length === planetas.length) {
        setJuegoCompletado(true);
      }
    }
  };

  if (juegoCompletado) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="mb-6 text-6xl animate-bounce">🚀</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            ¡Bien hecho, explorador!
          </h1>
          <p className="text-xl text-blue-200 mb-8">
            Has recorrido todo el Sistema Solar y completado todos los retos.
          </p>
          <Link href="/cid-kids">
            <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white">
              Volver a CID Kids
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 p-4 md:p-8">
      <div className="container max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Sistema Solar Interactivo</h1>
            <p className="text-blue-200">Haz clic en cada planeta para aprender y completar retos</p>
          </div>
          <Link href="/cid-kids">
            <Button variant="outline" className="text-white border-white hover:bg-white/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </Link>
        </div>

        {/* Progreso */}
        <div className="mb-8 bg-blue-900/50 rounded-lg p-4 border border-blue-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-semibold">Progreso: {retosCompletados.length}/{planetas.length} planetas explorados</span>
            <span className="text-blue-200">{Math.round((retosCompletados.length / planetas.length) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(retosCompletados.length / planetas.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Vista del Sistema Solar */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 rounded-lg p-8 border border-blue-500/20 min-h-96 relative overflow-hidden">
              {/* Sol */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50" />
              
              {/* Órbita */}
              <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
                {planetas.map((p, i) => (
                  <circle
                    key={`orbit-${i}`}
                    cx="5%"
                    cy="50%"
                    r={`${p.posicion.x}%`}
                    fill="none"
                    stroke="rgba(59, 130, 246, 0.2)"
                    strokeDasharray="5,5"
                  />
                ))}
              </svg>

              {/* Planetas */}
              <div className="absolute inset-0">
                {planetas.map((planeta) => (
                  <button
                    key={planeta.id}
                    onClick={() => handlePlanetaClick(planeta)}
                    className={`absolute top-1/2 -translate-y-1/2 rounded-full transition-all duration-300 cursor-pointer hover:scale-125 ${planeta.color} shadow-lg hover:shadow-xl`}
                    style={{
                      left: `${planeta.posicion.x}%`,
                      width: `${planeta.tamaño}px`,
                      height: `${planeta.tamaño}px`,
                      border: retosCompletados.includes(planeta.id) ? '3px solid #22c55e' : '2px solid rgba(255,255,255,0.3)'
                    }}
                    title={planeta.nombre}
                  >
                    {retosCompletados.includes(planeta.id) && (
                      <Check className="absolute inset-0 m-auto h-4 w-4 text-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Panel de Información y Reto */}
          {planetaSeleccionado ? (
            <Card className="bg-slate-800 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-white">{planetaSeleccionado.nombre}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-blue-300 mb-1">Distancia al Sol</p>
                  <p className="text-white font-semibold">{planetaSeleccionado.distancia}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-300 mb-1">Temperatura</p>
                  <p className="text-white font-semibold">{planetaSeleccionado.temperatura}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-300 mb-1">Tipo</p>
                  <p className="text-white font-semibold">{planetaSeleccionado.tipo}</p>
                </div>
                <div className="bg-blue-900/30 rounded p-3 border border-blue-500/20">
                  <p className="text-sm text-blue-300 mb-1">💡 Dato Curioso</p>
                  <p className="text-white text-sm">{planetaSeleccionado.curiosidad}</p>
                </div>

                {!retosCompletados.includes(planetaSeleccionado.id) ? (
                  <Button
                    onClick={() => completarReto(planetaSeleccionado.id)}
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                  >
                    ✓ Completar Reto
                  </Button>
                ) : (
                  <div className="w-full bg-green-500/20 text-green-400 rounded p-3 text-center border border-green-500/50">
                    ¡Reto completado!
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-slate-800 border-blue-500/30 flex items-center justify-center">
              <CardContent className="text-center py-12">
                <p className="text-blue-300 text-lg">Haz clic en un planeta para aprender más</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
