import { useMemo, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Check, Rocket, Sparkles, Star } from "lucide-react";

interface Planeta {
  id: number;
  nombre: string;
  distanciaSol: string;
  curiosidad: string;
  tamanio: number;
  color: string;
}

const planetas: Planeta[] = [
  {
    id: 1,
    nombre: "Mercurio",
    distanciaSol: "57.9 millones de km",
    curiosidad: "Un anio en Mercurio dura solo 88 dias terrestres.",
    tamanio: 36,
    color: "#9CA3AF",
  },
  {
    id: 2,
    nombre: "Venus",
    distanciaSol: "108.2 millones de km",
    curiosidad: "Gira al reves comparado con la mayoria de planetas.",
    tamanio: 44,
    color: "#FCD34D",
  },
  {
    id: 3,
    nombre: "Tierra",
    distanciaSol: "149.6 millones de km",
    curiosidad: "Es el unico planeta conocido con agua liquida abundante.",
    tamanio: 46,
    color: "#3B82F6",
  },
  {
    id: 4,
    nombre: "Marte",
    distanciaSol: "227.9 millones de km",
    curiosidad: "Tiene el volcan mas grande del sistema solar: el Monte Olimpo.",
    tamanio: 40,
    color: "#EF4444",
  },
  {
    id: 5,
    nombre: "Jupiter",
    distanciaSol: "778.5 millones de km",
    curiosidad: "Es tan grande que en su interior cabrian mas de 1,000 Tierras.",
    tamanio: 64,
    color: "#FB923C",
  },
  {
    id: 6,
    nombre: "Saturno",
    distanciaSol: "1,434 millones de km",
    curiosidad: "Sus anillos estan formados por hielo, polvo y rocas.",
    tamanio: 58,
    color: "#FDE68A",
  },
  {
    id: 7,
    nombre: "Urano",
    distanciaSol: "2,873 millones de km",
    curiosidad: "Rota casi acostado, como si rodara por su orbita.",
    tamanio: 52,
    color: "#22D3EE",
  },
  {
    id: 8,
    nombre: "Neptuno",
    distanciaSol: "4,495 millones de km",
    curiosidad: "Tiene vientos que superan los 2,000 km/h.",
    tamanio: 50,
    color: "#1D4ED8",
  },
];

const quizAstronomia = [
  {
    pregunta: "Cual es el planeta mas cercano al Sol?",
    opciones: ["Mercurio", "Marte", "Tierra", "Neptuno"],
    correcta: 0,
  },
  {
    pregunta: "Que planeta es conocido por sus anillos?",
    opciones: ["Urano", "Jupiter", "Saturno", "Venus"],
    correcta: 2,
  },
  {
    pregunta: "Cual es el planeta mas grande del sistema solar?",
    opciones: ["Saturno", "Tierra", "Jupiter", "Neptuno"],
    correcta: 2,
  },
  {
    pregunta: "Que planeta es llamado el Planeta Rojo?",
    opciones: ["Marte", "Mercurio", "Venus", "Urano"],
    correcta: 0,
  },
  {
    pregunta: "En que planeta vivimos?",
    opciones: ["Venus", "Tierra", "Marte", "Saturno"],
    correcta: 1,
  },
];

export default function SistemaSolar() {
  const [planetaSeleccionado, setPlanetaSeleccionado] = useState<Planeta | null>(null);
  const [descubiertos, setDescubiertos] = useState<number[]>([]);
  const [esperado, setEsperado] = useState(1);
  const [vidas, setVidas] = useState(3);
  const [feedback, setFeedback] = useState<string>("Haz clic en Mercurio para iniciar la mision.");
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizRespondido, setQuizRespondido] = useState(false);

  const fondoEstrellas = useMemo(
    () =>
      Array.from({ length: 48 }, (_, i) => ({
        id: i,
        left: `${(i * 37) % 100}%`,
        top: `${(i * 29) % 100}%`,
        size: (i % 3) + 1,
        delay: `${(i % 6) * 0.5}s`,
      })),
    [],
  );

  const misionPlanetasCompleta = descubiertos.length === planetas.length;
  const misionQuizCompleta = quizIndex >= quizAstronomia.length;
  const juegoCompletado = misionPlanetasCompleta && misionQuizCompleta;

  const manejarPlaneta = (planeta: Planeta) => {
    if (misionPlanetasCompleta || vidas <= 0) return;

    setPlanetaSeleccionado(planeta);
    if (planeta.id === esperado) {
      setDescubiertos((prev) => [...prev, planeta.id]);
      setEsperado((prev) => prev + 1);
      setFeedback(`Excelente: ${planeta.nombre} esta en la posicion correcta.`);
      return;
    }

    setVidas((prev) => Math.max(prev - 1, 0));
    const planetaEsperado = planetas.find((p) => p.id === esperado)?.nombre;
    setFeedback(`Casi. Debes seleccionar ${planetaEsperado} antes de ${planeta.nombre}.`);
  };

  const responderQuiz = (opcion: number) => {
    if (quizRespondido || !misionPlanetasCompleta || misionQuizCompleta) return;

    const actual = quizAstronomia[quizIndex];
    setQuizRespondido(true);

    if (opcion === actual.correcta) {
      setQuizScore((prev) => prev + 1);
      setFeedback("Respuesta correcta. Tu nave sigue acumulando energia estelar.");
    } else {
      setFeedback(`Buena tentativa. La respuesta correcta era: ${actual.opciones[actual.correcta]}.`);
    }

    setTimeout(() => {
      setQuizIndex((prev) => prev + 1);
      setQuizRespondido(false);
    }, 1100);
  };

  if (juegoCompletado || vidas === 0) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_20%_20%,#312e81_0%,#0f172a_45%,#020617_100%)] p-4 md:p-8">
        {fondoEstrellas.map((star) => (
          <span
            key={star.id}
            className="absolute animate-pulse rounded-full bg-white/80"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size * 2}px`,
              height: `${star.size * 2}px`,
              animationDelay: star.delay,
            }}
          />
        ))}

        <div className="container relative flex min-h-[80vh] items-center justify-center">
          <Card className="w-full max-w-2xl border-white/20 bg-slate-950/70 text-center shadow-2xl backdrop-blur">
            <CardContent className="space-y-5 p-8 md:p-10">
              <div className="mx-auto w-fit rounded-full bg-white/10 p-4">
                {vidas === 0 ? <Star className="h-10 w-10 text-yellow-300" /> : <Rocket className="h-10 w-10 text-cyan-300" />}
              </div>
              <h1 className="text-3xl font-black text-white md:text-4xl">
                {vidas === 0 ? "Mision incompleta" : "Mision galactica completada"}
              </h1>
              <p className="text-lg text-blue-100">
                {vidas === 0
                  ? "Te quedaste sin vidas. Vuelve a intentarlo para dominar el orden de los planetas."
                  : `Completaste las 2 fases: orden planetario + quiz astronomico (${quizScore}/${quizAstronomia.length}).`}
              </p>
              <p className="text-sm text-blue-200">Puntaje final: {descubiertos.length * 10 + quizScore * 12} puntos</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 flex justify-center gap-3">
          <Link href="/juegos/espacio">
            <Button className="bg-cyan-500 text-slate-950 hover:bg-cyan-400">Jugar de nuevo</Button>
          </Link>
          <Link href="/cid-kids">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Volver a CID Kids
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_20%_20%,#312e81_0%,#0f172a_45%,#020617_100%)] p-4 md:p-8">
      {fondoEstrellas.map((star) => (
        <span
          key={star.id}
          className="absolute animate-pulse rounded-full bg-white/80"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size * 2}px`,
            height: `${star.size * 2}px`,
            animationDelay: star.delay,
          }}
        />
      ))}

      <div className="container relative max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white md:text-5xl">Mision Astronomia 360</h1>
            <p className="mt-2 text-blue-100">Nivel 10+: ordena planetas, responde quiz y desbloquea tu insignia de comandante.</p>
          </div>
          <Link href="/cid-kids">
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Button>
          </Link>
        </div>

        <Card className="mb-6 border-white/20 bg-slate-900/60 backdrop-blur">
          <CardContent className="grid gap-4 p-5 md:grid-cols-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-blue-200">Fase 1</p>
              <p className="text-xl font-bold text-white">{descubiertos.length}/8 planetas</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-blue-200">Fase 2</p>
              <p className="text-xl font-bold text-white">{quizIndex}/{quizAstronomia.length} preguntas</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-blue-200">Vidas</p>
              <p className="text-xl font-bold text-white">{"❤".repeat(vidas)}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-blue-200">Puntaje</p>
              <p className="text-xl font-bold text-white">{descubiertos.length * 10 + quizScore * 12}</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="border-white/20 bg-slate-900/60 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white">Fase 1: Ordena los planetas desde el Sol</CardTitle>
              <p className="text-sm text-blue-100">
                Debes hacer clic en el planeta correcto segun su orden. Objetivo actual: <strong>{planetas.find((p) => p.id === esperado)?.nombre ?? "Completado"}</strong>
              </p>
            </CardHeader>
            <CardContent>
              <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-14 w-14 rounded-full bg-yellow-300 shadow-[0_0_45px_rgba(253,224,71,0.65)]" />
                  <p className="font-semibold text-yellow-100">Sol</p>
                </div>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {planetas.map((planeta) => {
                    const descubierto = descubiertos.includes(planeta.id);
                    return (
                      <button
                        key={planeta.id}
                        type="button"
                        onClick={() => manejarPlaneta(planeta)}
                        className="group rounded-xl border border-white/10 bg-slate-900/80 p-3 text-left transition hover:-translate-y-1 hover:border-cyan-300/70 hover:shadow-xl"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <span
                            className="inline-block rounded-full"
                            style={{
                              width: `${planeta.tamanio}px`,
                              height: `${planeta.tamanio}px`,
                              backgroundColor: planeta.color,
                              boxShadow: `0 0 24px ${planeta.color}66`,
                            }}
                          />
                          {descubierto && <Check className="h-5 w-5 text-emerald-400" />}
                        </div>
                        <p className="font-bold text-white">{planeta.nombre}</p>
                        <p className="text-xs text-blue-200">{planeta.distanciaSol}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {planetaSeleccionado && (
                <div className="mt-4 rounded-xl border border-cyan-300/20 bg-cyan-400/10 p-4">
                  <p className="font-bold text-cyan-100">Dato de {planetaSeleccionado.nombre}</p>
                  <p className="text-sm text-cyan-50">{planetaSeleccionado.curiosidad}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-white/20 bg-slate-900/60 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-white">Bitacora de mision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="rounded-xl border border-blue-400/20 bg-blue-500/10 p-4 text-sm text-blue-100">{feedback}</p>

                <div className="mt-4 flex items-center gap-2 text-yellow-300">
                  <Sparkles className="h-4 w-4" />
                  <p className="text-sm">Cada respuesta correcta aumenta tu puntaje y tu dominio cientifico.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/20 bg-slate-900/60 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-white">Fase 2: Quiz estelar</CardTitle>
              </CardHeader>
              <CardContent>
                {!misionPlanetasCompleta ? (
                  <p className="text-sm text-blue-100">Primero completa la fase de orden planetario para desbloquear el quiz.</p>
                ) : misionQuizCompleta ? (
                  <div className="rounded-xl border border-emerald-300/30 bg-emerald-400/10 p-4 text-emerald-100">
                    Quiz superado: {quizScore}/{quizAstronomia.length}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm text-blue-200">Pregunta {quizIndex + 1} de {quizAstronomia.length}</p>
                    <p className="font-semibold text-white">{quizAstronomia[quizIndex].pregunta}</p>
                    <div className="space-y-2">
                      {quizAstronomia[quizIndex].opciones.map((opcion, index) => (
                        <Button
                          key={`${quizIndex}-${opcion}`}
                          type="button"
                          disabled={quizRespondido}
                          onClick={() => responderQuiz(index)}
                          className="w-full justify-start bg-white/10 text-left text-white hover:bg-white/20"
                        >
                          {opcion}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-blue-300/20 bg-blue-500/10 p-4 text-blue-50">
          <p className="text-sm">
            Aprendizaje clave: el orden correcto de los planetas desde el Sol es Mercurio, Venus, Tierra, Marte, Jupiter, Saturno, Urano y Neptuno.
          </p>
        </div>
      </div>
    </div>
  );
}
