import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Matematicas() {
  const [numeroObjetivo, setNumeroObjetivo] = useState(0);
  const [numerosDisponibles, setNumerosDisponibles] = useState<number[]>([]);
  const [seleccionados, setSeleccionados] = useState<number[]>([]);
  const [aciertos, setAciertos] = useState(0);
  const [nivel, setNivel] = useState(1);
  const [mensaje, setMensaje] = useState("");
  const [juegoCompletado, setJuegoCompletado] = useState(false);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [esAcierto, setEsAcierto] = useState(false);

  const generarNuevoProblem = () => {
    const objetivo = Math.floor(Math.random() * 16) + 3; // 3 a 18
    setNumeroObjetivo(objetivo);
    
    // Generar números disponibles (1-9)
    const numeros = Array.from({ length: 9 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
    setNumerosDisponibles(numeros);
    setSeleccionados([]);
    setMostrarMensaje(false);
  };

  useEffect(() => {
    generarNuevoProblem();
  }, []);

  const handleNumeroClick = (numero: number) => {
    if (seleccionados.length < 2 && !seleccionados.includes(numero)) {
      const nuevosSeleccionados = [...seleccionados, numero];
      setSeleccionados(nuevosSeleccionados);

      // Si ya tiene 2 números, verificar
      if (nuevosSeleccionados.length === 2) {
        setTimeout(() => verificarRespuesta(nuevosSeleccionados), 500);
      }
    }
  };

  const verificarRespuesta = (numeros: number[]) => {
    const suma = numeros.reduce((a, b) => a + b, 0);
    
    if (suma === numeroObjetivo) {
      setEsAcierto(true);
      setMensaje("¡Correcto! 🎉");
      const nuevoAciertos = aciertos + 1;
      setAciertos(nuevoAciertos);
      
      if (nuevoAciertos >= 5) {
        setJuegoCompletado(true);
      } else {
        setNivel(Math.floor(nuevoAciertos / 2) + 1);
      }
    } else {
      setEsAcierto(false);
      setMensaje(`¡Incorrecto! La suma es ${suma}, necesitabas ${numeroObjetivo}`);
    }
    
    setMostrarMensaje(true);
    setTimeout(() => {
      generarNuevoProblem();
    }, 2000);
  };

  if (juegoCompletado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-300 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-3xl p-12 shadow-2xl">
          <div className="mb-6 text-7xl animate-bounce">🏆</div>
          <h1 className="text-5xl font-bold text-purple-600 mb-4">
            ¡Eres un Matemático!
          </h1>
          <p className="text-2xl text-gray-600 mb-2">
            Completaste 5 sumas correctas
          </p>
          <p className="text-lg text-gray-500 mb-8">
            ¡Excelente trabajo! Has dominado las sumas.
          </p>
          <Link href="/cid-kids">
            <Button size="lg" className="bg-purple-500 hover:bg-purple-600 text-white text-lg px-8 py-6 rounded-2xl">
              Volver a CID Kids
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-300 p-4 md:p-8">
      <div className="container max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Suma los Números</h1>
            <p className="text-white/90">Encuentra dos números que sumen el número objetivo</p>
          </div>
          <Link href="/cid-kids">
            <Button variant="outline" className="text-white border-white hover:bg-white/20 rounded-full p-3">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 text-center shadow-lg">
            <p className="text-gray-600 text-sm font-semibold">Aciertos</p>
            <p className="text-4xl font-bold text-green-500">{aciertos}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-lg">
            <p className="text-gray-600 text-sm font-semibold">Nivel</p>
            <p className="text-4xl font-bold text-blue-500">{nivel}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-lg">
            <p className="text-gray-600 text-sm font-semibold">Progreso</p>
            <p className="text-4xl font-bold text-purple-500">{aciertos}/5</p>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="mb-8 bg-white rounded-full p-1 shadow-lg">
          <div 
            className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-300"
            style={{ width: `${(aciertos / 5) * 100}%` }}
          />
        </div>

        {/* Número Objetivo */}
        <div className="bg-white rounded-3xl p-8 mb-8 text-center shadow-2xl">
          <p className="text-gray-600 text-lg mb-2">Necesitas sumar:</p>
          <p className="text-7xl font-bold text-purple-600">{numeroObjetivo}</p>
        </div>

        {/* Números disponibles */}
        <div className="bg-white rounded-3xl p-8 mb-8 shadow-2xl">
          <p className="text-gray-600 text-lg mb-6 text-center">Selecciona dos números:</p>
          <div className="grid grid-cols-3 gap-4">
            {numerosDisponibles.map((numero) => (
              <button
                key={numero}
                onClick={() => handleNumeroClick(numero)}
                disabled={seleccionados.includes(numero) || seleccionados.length === 2}
                className={`
                  w-full aspect-square rounded-2xl text-3xl font-bold transition-all duration-200
                  ${seleccionados.includes(numero)
                    ? 'bg-green-500 text-white scale-110 shadow-lg'
                    : 'bg-gradient-to-br from-blue-400 to-purple-500 text-white hover:scale-105 shadow-lg hover:shadow-xl'
                  }
                  ${seleccionados.length === 2 && !seleccionados.includes(numero) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                {numero}
              </button>
            ))}
          </div>
        </div>

        {/* Mensaje de resultado */}
        {mostrarMensaje && (
          <div className={`
            rounded-3xl p-6 text-center text-xl font-bold shadow-2xl mb-8
            ${esAcierto 
              ? 'bg-green-400 text-white animate-bounce' 
              : 'bg-red-400 text-white'
            }
          `}>
            {mensaje}
          </div>
        )}

        {/* Botón de reintentar */}
        {seleccionados.length === 0 && !mostrarMensaje && (
          <div className="text-center">
            <Button 
              onClick={generarNuevoProblem}
              className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6 rounded-2xl font-bold"
            >
              Nuevo Problema
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
