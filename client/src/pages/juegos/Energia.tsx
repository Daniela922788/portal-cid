import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

interface Elemento {
  id: string;
  nombre: string;
  icono: string;
  color: string;
}

interface Energia {
  id: string;
  nombre: string;
  elementos: string[];
  descripcion: string;
  emoji: string;
}

const elementos: Elemento[] = [
  { id: "sol", nombre: "Sol", icono: "☀️", color: "bg-yellow-300" },
  { id: "panel", nombre: "Panel Solar", icono: "⬜", color: "bg-blue-400" },
  { id: "viento", nombre: "Viento", icono: "💨", color: "bg-cyan-300" },
  { id: "turbina", nombre: "Turbina", icono: "🌪️", color: "bg-gray-400" },
  { id: "agua", nombre: "Agua", icono: "💧", color: "bg-blue-500" },
  { id: "represa", nombre: "Represa", icono: "🏗️", color: "bg-amber-700" },
  { id: "generador", nombre: "Generador", icono: "⚙️", color: "bg-orange-400" }
];

const energias: Energia[] = [
  {
    id: "solar",
    nombre: "Energía Solar",
    elementos: ["sol", "panel"],
    descripcion: "El panel solar convierte la luz del sol en electricidad.",
    emoji: "☀️"
  },
  {
    id: "eolica",
    nombre: "Energía Eólica",
    elementos: ["viento", "turbina"],
    descripcion: "La turbina aprovecha la fuerza del viento para generar electricidad.",
    emoji: "💨"
  },
  {
    id: "hidroelectrica",
    nombre: "Energía Hidroeléctrica",
    elementos: ["agua", "represa", "generador"],
    descripcion: "El agua cae desde la represa y hace girar el generador.",
    emoji: "💧"
  }
];

export default function Energia() {
  const [elementosSeleccionados, setElementosSeleccionados] = useState<string[]>([]);
  const [energiasGeneradas, setEnergiasGeneradas] = useState<string[]>([]);
  const [progreso, setProgreso] = useState(0);
  const [juegoCompletado, setJuegoCompletado] = useState(false);
  const [mensajeActual, setMensajeActual] = useState("");

  const handleElementoDrag = (elemento: Elemento) => {
    const nuevosSeleccionados = [...elementosSeleccionados, elemento.id];
    setElementosSeleccionados(nuevosSeleccionados);

    // Verificar si forma una combinación válida
    verificarCombinacion(nuevosSeleccionados);
  };

  const verificarCombinacion = (seleccionados: string[]) => {
    for (const energia of energias) {
      // Verificar si tiene exactamente los elementos requeridos
      const tieneElementos = energia.elementos.every(e => seleccionados.includes(e));
      const noTieneExtras = seleccionados.every(e => energia.elementos.includes(e));
      
      if (tieneElementos && noTieneExtras && !energiasGeneradas.includes(energia.id)) {
        // ¡Combinación correcta!
        setMensajeActual(`¡Generaste ${energia.nombre}! 🎉`);
        const nuevasEnergias = [...energiasGeneradas, energia.id];
        setEnergiasGeneradas(nuevasEnergias);
        const nuevoProgreso = (nuevasEnergias.length / energias.length) * 100;
        setProgreso(nuevoProgreso);

        if (nuevasEnergias.length === energias.length) {
          setJuegoCompletado(true);
        }

        // Limpiar selección después de 1.5 segundos
        setTimeout(() => {
          setElementosSeleccionados([]);
          setMensajeActual("");
        }, 1500);
        return;
      }
    }
  };

  const limpiarSeleccion = () => {
    setElementosSeleccionados([]);
    setMensajeActual("");
  };

  if (juegoCompletado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-300 to-teal-400 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-3xl p-12 shadow-2xl">
          <div className="mb-6 text-7xl animate-bounce">⚡</div>
          <h1 className="text-5xl font-bold text-green-600 mb-4">
            ¡Ciudad Iluminada!
          </h1>
          <p className="text-2xl text-gray-600 mb-2">
            Generaste todas las fuentes de energía
          </p>
          <p className="text-lg text-gray-500 mb-8">
            ¡Excelente! Has generado suficiente energía para encender la ciudad.
          </p>
          <Link href="/cid-kids">
            <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-6 rounded-2xl">
              Volver a CID Kids
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-300 to-teal-400 p-4 md:p-8">
      <div className="container max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Laboratorio de Energía</h1>
            <p className="text-white/90">Arrastra elementos para crear fuentes de energía</p>
          </div>
          <Link href="/cid-kids">
            <Button variant="outline" className="text-white border-white hover:bg-white/20 rounded-full p-3">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
        </div>

        {/* Progreso */}
        <div className="mb-8 bg-white rounded-2xl p-4 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-gray-700">Progreso: {energiasGeneradas.length}/{energias.length} energías generadas</span>
            <span className="text-green-600 font-bold">{Math.round(progreso)}%</span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progreso}%` }}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Área de trabajo */}
          <div className="lg:col-span-2">
            <Card className="bg-white/90 rounded-3xl shadow-2xl min-h-96 p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-700 mb-2">Mesa de Laboratorio</h2>
                <p className="text-gray-600">Arrastra elementos aquí para combinarlos</p>
              </div>

              {/* Área de combinación */}
              <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl p-8 min-h-64 border-4 border-dashed border-green-500 flex flex-col items-center justify-center">
                {elementosSeleccionados.length === 0 ? (
                  <div className="text-center">
                    <p className="text-4xl mb-4">🔬</p>
                    <p className="text-gray-600 text-lg">Selecciona elementos para combinar</p>
                  </div>
                ) : (
                  <div className="w-full">
                    <div className="flex flex-wrap gap-4 justify-center mb-6">
                      {elementosSeleccionados.map((id, idx) => {
                        const elemento = elementos.find(e => e.id === id);
                        return elemento ? (
                          <div 
                            key={idx}
                            className={`${elemento.color} rounded-2xl p-4 text-center shadow-lg`}
                          >
                            <p className="text-4xl">{elemento.icono}</p>
                            <p className="text-sm font-bold text-gray-800 mt-2">{elemento.nombre}</p>
                          </div>
                        ) : null;
                      })}
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-700 mb-4">⚡ Combinando...</p>
                      <Button 
                        onClick={limpiarSeleccion}
                        className="bg-red-500 hover:bg-red-600 text-white rounded-xl"
                      >
                        Limpiar
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mensaje */}
              {mensajeActual && (
                <div className="mt-6 bg-green-400 text-white rounded-2xl p-4 text-center text-lg font-bold animate-bounce">
                  {mensajeActual}
                </div>
              )}
            </Card>
          </div>

          {/* Panel de elementos y energías */}
          <div className="space-y-6">
            {/* Elementos disponibles */}
            <Card className="bg-white/90 rounded-3xl shadow-2xl p-6">
              <h3 className="text-lg font-bold text-gray-700 mb-4">Elementos</h3>
              <div className="space-y-2">
                {elementos.map((elemento) => (
                  <button
                    key={elemento.id}
                    onClick={() => handleElementoDrag(elemento)}
                    className={`w-full ${elemento.color} rounded-xl p-3 text-center font-bold text-gray-800 hover:scale-105 transition-transform shadow-md hover:shadow-lg`}
                  >
                    <span className="text-2xl mr-2">{elemento.icono}</span>
                    {elemento.nombre}
                  </button>
                ))}
              </div>
            </Card>

            {/* Energías generadas */}
            <Card className="bg-white/90 rounded-3xl shadow-2xl p-6">
              <h3 className="text-lg font-bold text-gray-700 mb-4">Energías Generadas</h3>
              <div className="space-y-3">
                {energias.map((energia) => (
                  <div
                    key={energia.id}
                    className={`rounded-xl p-3 transition-all ${
                      energiasGeneradas.includes(energia.id)
                        ? 'bg-green-300 border-2 border-green-600'
                        : 'bg-gray-200 opacity-50'
                    }`}
                  >
                    <p className="font-bold text-gray-800">
                      <span className="text-xl mr-2">{energia.emoji}</span>
                      {energia.nombre}
                    </p>
                    <p className="text-sm text-gray-700 mt-1">{energia.descripcion}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
