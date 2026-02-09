import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, RotateCcw } from "lucide-react";

interface Pieza {
  id: string;
  nombre: string;
  icono: string;
  color: string;
}

interface Mision {
  id: string;
  titulo: string;
  descripcion: string;
  piezasRequeridas: string[];
  animacionVictoria: string;
  explicacion: string;
}

const piezas: Pieza[] = [
  { id: "rueda", nombre: "Rueda", icono: "⭕", color: "bg-yellow-400" },
  { id: "brazo", nombre: "Brazo Articulado", icono: "🦾", color: "bg-orange-400" },
  { id: "motor", nombre: "Motor", icono: "⚙️", color: "bg-red-500" },
  { id: "sensor", nombre: "Sensor", icono: "📡", color: "bg-blue-400" },
  { id: "panel", nombre: "Panel Solar", icono: "⬜", color: "bg-green-400" },
  { id: "helice", nombre: "Hélice", icono: "🌀", color: "bg-cyan-400" },
  { id: "bateria", nombre: "Batería", icono: "🔋", color: "bg-purple-400" },
  { id: "tubo", nombre: "Tubo", icono: "📏", color: "bg-pink-400" },
];

const misiones: Mision[] = [
  {
    id: "robot-basura",
    titulo: "🤖 Robot Recolector",
    descripcion: "Construye un robot que recoja basura espacial",
    piezasRequeridas: ["motor", "rueda", "brazo", "sensor"],
    animacionVictoria: "El robot se mueve y recoge basura 🗑️",
    explicacion: "Has creado un invento que usa energía mecánica. El motor convierte electricidad en movimiento, las ruedas lo desplazan, el brazo recoge objetos y el sensor detecta basura."
  },
  {
    id: "catapulta",
    titulo: "🎯 Catapulta Lanzadora",
    descripcion: "Construye una catapulta que lance bolitas",
    piezasRequeridas: ["brazo", "tubo", "motor"],
    animacionVictoria: "¡La catapulta lanza bolitas al aire! 🎪",
    explicacion: "Creaste un invento que usa energía potencial y cinética. El motor proporciona potencia, el brazo articula la palanca y el tubo dirige el lanzamiento."
  },
  {
    id: "maquina-burbujas",
    titulo: "🫧 Máquina de Burbujas",
    descripcion: "Construye una máquina que suelte burbujas",
    piezasRequeridas: ["motor", "helice", "tubo"],
    animacionVictoria: "¡Burbujas de colores salen volando! 🫧✨",
    explicacion: "Inventaste una máquina que usa aire en movimiento. El motor gira la hélice, que empuja aire a través del tubo, creando burbujas mágicas."
  },
  {
    id: "bici-energetica",
    titulo: "🚴 Bicicleta Energética",
    descripcion: "Construye una bicicleta que genera energía",
    piezasRequeridas: ["rueda", "motor", "panel", "bateria"],
    animacionVictoria: "¡La rueda gira y genera energía! ⚡",
    explicacion: "Creaste un generador de energía. Las ruedas giran el motor, que genera electricidad almacenada en la batería y capturada por el panel solar."
  }
];

export default function FabricaInventos() {
  const [misionActual, setMisionActual] = useState(0);
  const [piezasSeleccionadas, setPiezasSeleccionadas] = useState<string[]>([]);
  const [juegoCompletado, setJuegoCompletado] = useState(false);
  const [mostrarVictoria, setMostrarVictoria] = useState(false);
  const [draggedPieza, setDraggedPieza] = useState<string | null>(null);

  const mision = misiones[misionActual];
  const progreso = (piezasSeleccionadas.length / mision.piezasRequeridas.length) * 100;

  const handleDragStart = (piezaId: string) => {
    setDraggedPieza(piezaId);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedPieza) return;

    // Verificar si la pieza es requerida
    if (mision.piezasRequeridas.includes(draggedPieza)) {
      if (!piezasSeleccionadas.includes(draggedPieza)) {
        const nuevasPiezas = [...piezasSeleccionadas, draggedPieza];
        setPiezasSeleccionadas(nuevasPiezas);

        // Reproducir sonido de click
        reproducirSonido("click");

        // Verificar si se completó la misión
        if (nuevasPiezas.length === mision.piezasRequeridas.length) {
          setTimeout(() => {
            reproducirSonido("victoria");
            setMostrarVictoria(true);
          }, 500);
        }
      }
    } else {
      // Sonido de error
      reproducirSonido("error");
    }
    setDraggedPieza(null);
  };

  const reproducirSonido = (tipo: string) => {
    // Simulación de sonidos con emojis y animaciones
    // En una aplicación real, usarías Web Audio API
    console.log(`Sonido: ${tipo}`);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const completarMision = () => {
    if (misionActual < misiones.length - 1) {
      // Siguiente misión
      setMisionActual(misionActual + 1);
      setPiezasSeleccionadas([]);
      setMostrarVictoria(false);
    } else {
      // Juego completado
      setJuegoCompletado(true);
    }
  };

  const reiniciarMision = () => {
    setPiezasSeleccionadas([]);
    setMostrarVictoria(false);
  };

  const removerPieza = (piezaId: string) => {
    setPiezasSeleccionadas(piezasSeleccionadas.filter(p => p !== piezaId));
    setMostrarVictoria(false);
  };

  if (juegoCompletado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-3xl p-12 shadow-2xl max-w-md">
          <div className="mb-6 text-7xl animate-bounce">🎉</div>
          <h1 className="text-5xl font-bold text-purple-600 mb-4">
            ¡Increíble!
          </h1>
          <p className="text-2xl text-gray-700 mb-2">
            Completaste todas las misiones
          </p>
          <p className="text-lg text-gray-600 mb-8">
            Eres un inventor extraordinario. ¡Sigue creando máquinas increíbles en la Fábrica de Inventos!
          </p>
          <Link href="/cid-kids">
            <Button size="lg" className="bg-purple-500 hover:bg-purple-600 text-white text-lg px-8 py-6 rounded-2xl w-full">
              Volver a CID Kids
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 p-4 md:p-8">
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">🏭 Fábrica de Inventos</h1>
            <p className="text-white/90">Construye máquinas increíbles usando piezas mágicas</p>
          </div>
          <Link href="/cid-kids">
            <Button variant="outline" className="text-white border-white hover:bg-white/20 rounded-full p-3">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
        </div>

        {/* Progreso de misiones */}
        <div className="mb-8 bg-white rounded-2xl p-4 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-gray-700">Misión {misionActual + 1}/{misiones.length}</span>
            <span className="text-purple-600 font-bold">{Math.round(((misionActual + (piezasSeleccionadas.length / mision.piezasRequeridas.length)) / misiones.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-pink-500 to-purple-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${((misionActual + (piezasSeleccionadas.length / mision.piezasRequeridas.length)) / misiones.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Panel de misión */}
          <div className="lg:col-span-1">
            <Card className="bg-white/95 rounded-3xl shadow-2xl h-full">
              <CardContent className="p-6">
                <div className="text-5xl mb-4 text-center">{mision.titulo.split(" ")[0]}</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{mision.titulo}</h2>
                <p className="text-gray-700 mb-6">{mision.descripcion}</p>
                
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl p-4 mb-6">
                  <p className="text-sm font-bold text-gray-700 mb-3">Piezas necesarias:</p>
                  <div className="space-y-2">
                    {mision.piezasRequeridas.map(piezaId => {
                      const pieza = piezas.find(p => p.id === piezaId);
                      const completada = piezasSeleccionadas.includes(piezaId);
                      return (
                        <div key={piezaId} className={`flex items-center gap-2 p-2 rounded-lg ${completada ? 'bg-green-300' : 'bg-gray-200'}`}>
                          <span className="text-2xl">{pieza?.icono}</span>
                          <span className={`text-sm font-bold ${completada ? 'text-green-800 line-through' : 'text-gray-700'}`}>
                            {pieza?.nombre}
                          </span>
                          {completada && <span className="ml-auto text-lg">✓</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-lg font-bold text-purple-600 mb-2">Progreso</p>
                  <p className="text-3xl font-bold text-purple-600">{piezasSeleccionadas.length}/{mision.piezasRequeridas.length}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Área de trabajo */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Zona de ensamblaje */}
              <Card className="bg-white/90 rounded-3xl shadow-2xl">
                <CardContent className="p-8">
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 rounded-2xl p-12 min-h-64 border-4 border-dashed border-orange-400 flex flex-col items-center justify-center"
                  >
                    {piezasSeleccionadas.length === 0 ? (
                      <div className="text-center">
                        <p className="text-6xl mb-4">🔧</p>
                        <p className="text-xl font-bold text-gray-700">Arrastra piezas aquí</p>
                        <p className="text-gray-600">para construir tu invento</p>
                      </div>
                    ) : (
                      <div className="w-full">
                        <div className="flex flex-wrap gap-4 justify-center mb-6">
                          {piezasSeleccionadas.map((piezaId, idx) => {
                            const pieza = piezas.find(p => p.id === piezaId);
                            return pieza ? (
                              <div
                                key={idx}
                                className={`${pieza.color} rounded-2xl p-4 text-center shadow-lg hover:scale-110 transition-transform cursor-pointer relative group`}
                                onClick={() => removerPieza(piezaId)}
                              >
                                <p className="text-4xl">{pieza.icono}</p>
                                <p className="text-xs font-bold text-gray-800 mt-2">{pieza.nombre}</p>
                                <div className="absolute inset-0 bg-black/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <p className="text-white font-bold">Quitar</p>
                                </div>
                              </div>
                            ) : null;
                          })}
                        </div>

                        {mostrarVictoria && (
                          <div className="text-center">
                            <p className="text-2xl font-bold text-green-600 mb-4 animate-bounce">
                              ✨ {mision.animacionVictoria} ✨
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Barra de progreso de construcción */}
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-gray-700">Construcción</span>
                      <span className="text-purple-600 font-bold">{Math.round(progreso)}%</span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-4">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-emerald-600 h-4 rounded-full transition-all duration-300"
                        style={{ width: `${progreso}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Piezas disponibles */}
              <Card className="bg-white/90 rounded-3xl shadow-2xl">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-700 mb-4">Piezas Disponibles</h3>
                  <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                    {piezas.map((pieza) => (
                      <div
                        key={pieza.id}
                        draggable
                        onDragStart={() => handleDragStart(pieza.id)}
                        className={`${pieza.color} rounded-xl p-3 text-center cursor-move hover:scale-110 transition-transform shadow-md hover:shadow-lg ${
                          piezasSeleccionadas.includes(pieza.id) ? 'opacity-50 line-through' : ''
                        }`}
                      >
                        <p className="text-3xl">{pieza.icono}</p>
                        <p className="text-xs font-bold text-gray-800 mt-1">{pieza.nombre}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Panel educativo y botones */}
              {mostrarVictoria && (
                <Card className="bg-gradient-to-br from-green-200 to-emerald-200 rounded-3xl shadow-2xl">
                  <CardContent className="p-6">
                    <div className="bg-white rounded-xl p-4 mb-6">
                      <p className="text-lg font-bold text-gray-800 mb-2">💡 Explicación Educativa</p>
                      <p className="text-gray-700">{mision.explicacion}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        onClick={reiniciarMision}
                        className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold py-3"
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reintentar
                      </Button>
                      <Button
                        onClick={completarMision}
                        className="bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold py-3"
                      >
                        {misionActual < misiones.length - 1 ? "Siguiente Misión →" : "Completar"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
