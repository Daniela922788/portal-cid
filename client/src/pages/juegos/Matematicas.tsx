import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Brain, Timer, Trophy } from "lucide-react";

type TipoReto = "operacion" | "secuencia" | "geometria";

interface RetoMatematico {
  tipo: TipoReto;
  enunciado: string;
  opciones: number[];
  respuesta: number;
  pista: string;
}

const TOTAL_RONDAS = 10;
const TIEMPO_POR_RONDA = 20;

const barajar = <T,>(arr: T[]): T[] => {
  const copia = [...arr];
  for (let i = copia.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
};

const generarOpciones = (correcta: number): number[] => {
  const variaciones = [
    correcta + 1,
    correcta - 1,
    correcta + 2,
    correcta - 2,
    correcta + 3,
    correcta - 3,
    correcta + 5,
    correcta - 5,
  ]
    .filter((n) => n >= 0)
    .filter((n) => n !== correcta);

  const distractores = barajar(variaciones).slice(0, 3);
  return barajar([correcta, ...distractores]);
};

const crearReto = (nivel: number): RetoMatematico => {
  const tipo = ["operacion", "secuencia", "geometria"][Math.floor(Math.random() * 3)] as TipoReto;

  if (tipo === "operacion") {
    const a = Math.floor(Math.random() * (8 + nivel * 2)) + 4;
    const b = Math.floor(Math.random() * (6 + nivel)) + 2;
    const operador = nivel >= 4 && Math.random() > 0.45 ? "x" : Math.random() > 0.5 ? "+" : "-";

    const correcta = operador === "+" ? a + b : operador === "-" ? a - b : a * b;
    return {
      tipo,
      enunciado: `Resuelve: ${a} ${operador} ${b}`,
      opciones: generarOpciones(correcta),
      respuesta: correcta,
      pista: "Hazlo por partes y verifica tu resultado antes de elegir.",
    };
  }

  if (tipo === "secuencia") {
    const inicio = Math.floor(Math.random() * 8) + 2;
    const paso = Math.floor(Math.random() * (2 + nivel)) + 2;
    const secuencia = [inicio, inicio + paso, inicio + paso * 2, inicio + paso * 3];
    const correcta = inicio + paso * 4;
    return {
      tipo,
      enunciado: `Completa la secuencia: ${secuencia.join(", ")}, ...`,
      opciones: generarOpciones(correcta),
      respuesta: correcta,
      pista: "Mira cuánto aumenta de un número al siguiente.",
    };
  }

  const ancho = Math.floor(Math.random() * (nivel + 3)) + 3;
  const alto = Math.floor(Math.random() * (nivel + 2)) + 2;
  const pedirArea = Math.random() > 0.4;
  const correcta = pedirArea ? ancho * alto : 2 * (ancho + alto);

  return {
    tipo,
    enunciado: pedirArea
      ? `Rectángulo de ${ancho} x ${alto}. ¿Cuál es el área?`
      : `Rectángulo de ${ancho} x ${alto}. ¿Cuál es el perímetro?`,
    opciones: generarOpciones(correcta),
    respuesta: correcta,
    pista: pedirArea ? "Área = base x altura" : "Perímetro = 2 x (base + altura)",
  };
};

export default function Matematicas() {
  const [ronda, setRonda] = useState(1);
  const [puntaje, setPuntaje] = useState(0);
  const [aciertos, setAciertos] = useState(0);
  const [vidas, setVidas] = useState(3);
  const [tiempo, setTiempo] = useState(TIEMPO_POR_RONDA);
  const [reto, setReto] = useState<RetoMatematico>(() => crearReto(1));
  const [feedback, setFeedback] = useState<string>("");
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState<number | null>(null);
  const [bloqueado, setBloqueado] = useState(false);
  const [finalizado, setFinalizado] = useState(false);

  const nivel = useMemo(() => Math.ceil(ronda / 2), [ronda]);

  useEffect(() => {
    if (finalizado || bloqueado) return;

    const timer = setInterval(() => {
      setTiempo((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          manejarRespuesta(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [finalizado, bloqueado, ronda]);

  const avanzarRonda = (nuevasVidas: number) => {
    if (nuevasVidas <= 0 || ronda >= TOTAL_RONDAS) {
      setFinalizado(true);
      return;
    }

    const siguiente = ronda + 1;
    setRonda(siguiente);
    setTiempo(TIEMPO_POR_RONDA);
    setReto(crearReto(Math.ceil(siguiente / 2)));
    setRespuestaSeleccionada(null);
  };

  const manejarRespuesta = (opcion: number | null) => {
    if (bloqueado || finalizado) return;

    setBloqueado(true);
    setRespuestaSeleccionada(opcion);

    const correcta = opcion === reto.respuesta;
    if (correcta) {
      const extraTiempo = Math.max(tiempo, 5);
      setAciertos((prev) => prev + 1);
      setPuntaje((prev) => prev + 10 + extraTiempo);
      setFeedback(`Correcto. +${10 + extraTiempo} puntos.`);
      setTimeout(() => {
        setBloqueado(false);
        avanzarRonda(vidas);
      }, 900);
      return;
    }

    const nuevasVidas = vidas - 1;
    setVidas(nuevasVidas);
    setFeedback(
      opcion === null
        ? `Se acabó el tiempo. La respuesta era ${reto.respuesta}.`
        : `No era ${opcion}. La correcta es ${reto.respuesta}.`,
    );
    setTimeout(() => {
      setBloqueado(false);
      avanzarRonda(nuevasVidas);
    }, 1100);
  };

  if (finalizado) {
    const gano = vidas > 0 && ronda >= TOTAL_RONDAS;
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_20%_20%,#ffedd5_0%,#f472b6_45%,#312e81_100%)] p-4">
        <div className="container flex min-h-[85vh] items-center justify-center">
          <Card className="w-full max-w-2xl border-none bg-white/90 shadow-2xl">
            <CardContent className="space-y-4 p-8 text-center">
              <div className="mx-auto w-fit rounded-full bg-pink-100 p-4">
                <Trophy className="h-10 w-10 text-pink-600" />
              </div>
              <h1 className="text-3xl font-black text-slate-800 md:text-4xl">
                {gano ? "Academia Matemática superada" : "Inténtalo una vez más"}
              </h1>
              <p className="text-slate-600">
                {gano
                  ? `Terminaste ${TOTAL_RONDAS} rondas con ${aciertos} aciertos.`
                  : "Llegaste lejos. Cada intento fortalece tu pensamiento lógico."}
              </p>
              <div className="grid grid-cols-3 gap-3 pt-2 text-sm">
                <div className="rounded-xl bg-violet-100 p-3">
                  <p className="text-violet-700">Puntaje</p>
                  <p className="text-xl font-bold text-violet-900">{puntaje}</p>
                </div>
                <div className="rounded-xl bg-sky-100 p-3">
                  <p className="text-sky-700">Aciertos</p>
                  <p className="text-xl font-bold text-sky-900">{aciertos}</p>
                </div>
                <div className="rounded-xl bg-amber-100 p-3">
                  <p className="text-amber-700">Nivel</p>
                  <p className="text-xl font-bold text-amber-900">{nivel}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex justify-center gap-3">
          <Link href="/juegos/matematicas">
            <Button className="bg-violet-600 text-white hover:bg-violet-500">Jugar de nuevo</Button>
          </Link>
          <Link href="/cid-kids">
            <Button variant="outline" className="border-white bg-white/15 text-white hover:bg-white/25">
              Volver a CID Kids
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_15%_15%,#fbcfe8_0%,#c4b5fd_35%,#1e1b4b_100%)] p-4 md:p-8">
      <div className="container max-w-4xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-black text-white md:text-5xl">Matemáticas en Modo Pro</h1>
            <p className="mt-2 text-white/90">Razonamiento numérico, patrones y geometría para mentes curiosas.</p>
          </div>
          <Link href="/cid-kids">
            <Button variant="outline" className="border-white text-white hover:bg-white/20">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Button>
          </Link>
        </div>

        <div className="mb-6 grid gap-3 md:grid-cols-4">
          <div className="rounded-2xl border border-white/30 bg-white/20 p-4 text-white backdrop-blur">
            <p className="text-xs uppercase tracking-wider">Ronda</p>
            <p className="text-2xl font-black">{ronda}/{TOTAL_RONDAS}</p>
          </div>
          <div className="rounded-2xl border border-white/30 bg-white/20 p-4 text-white backdrop-blur">
            <p className="text-xs uppercase tracking-wider">Puntaje</p>
            <p className="text-2xl font-black">{puntaje}</p>
          </div>
          <div className="rounded-2xl border border-white/30 bg-white/20 p-4 text-white backdrop-blur">
            <p className="text-xs uppercase tracking-wider">Vidas</p>
            <p className="text-2xl font-black">{"❤".repeat(vidas)}</p>
          </div>
          <div className="rounded-2xl border border-white/30 bg-white/20 p-4 text-white backdrop-blur">
            <p className="text-xs uppercase tracking-wider">Nivel</p>
            <p className="text-2xl font-black">{nivel}</p>
          </div>
        </div>

        <div className="mb-6 h-3 rounded-full bg-white/30">
          <div className="h-3 rounded-full bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-amber-300" style={{ width: `${(ronda / TOTAL_RONDAS) * 100}%` }} />
        </div>

        <Card className="border-none bg-white/90 shadow-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <Brain className="h-5 w-5 text-violet-600" />
              Reto de la ronda {ronda}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-xl bg-slate-100 p-3">
              <p className="text-sm font-medium text-slate-700">Tipo: {reto.tipo}</p>
              <p className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Timer className="h-4 w-4 text-rose-500" /> {tiempo}s
              </p>
            </div>

            <div className="rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 p-5 text-white">
              <p className="text-xl font-bold md:text-2xl">{reto.enunciado}</p>
              <p className="mt-2 text-sm text-violet-100">Pista: {reto.pista}</p>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {reto.opciones.map((opcion) => {
                const esCorrecta = opcion === reto.respuesta;
                const seleccionada = opcion === respuestaSeleccionada;
                const estado = bloqueado
                  ? esCorrecta
                    ? "bg-emerald-500 text-white"
                    : seleccionada
                      ? "bg-rose-500 text-white"
                      : "bg-slate-200 text-slate-500"
                  : "bg-slate-100 text-slate-800 hover:bg-slate-200";

                return (
                  <button
                    key={`${ronda}-${opcion}`}
                    type="button"
                    onClick={() => manejarRespuesta(opcion)}
                    disabled={bloqueado}
                    className={`rounded-xl px-4 py-4 text-left text-lg font-bold transition ${estado}`}
                  >
                    {opcion}
                  </button>
                );
              })}
            </div>

            <div className="rounded-xl bg-amber-100/70 p-3 text-sm text-amber-900">
              Conocimiento útil: practicar operaciones, secuencias y geometría mejora el pensamiento lógico para programación, robótica y ciencia de datos.
            </div>
          </CardContent>
        </Card>

        <div className="mt-4 flex items-center gap-2 rounded-xl bg-white/20 p-3 text-white backdrop-blur">
          <Trophy className="h-4 w-4" />
          <p className="text-sm">{feedback || "Elige la respuesta correcta antes de que se acabe el tiempo."}</p>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl bg-white/20 p-3 text-white backdrop-blur">
            <p className="text-xs uppercase tracking-wide">Aciertos</p>
            <p className="text-2xl font-black">{aciertos}</p>
          </div>
          <div className="rounded-xl bg-white/20 p-3 text-white backdrop-blur">
            <p className="text-xs uppercase tracking-wide">Precisión</p>
            <p className="text-2xl font-black">{Math.round((aciertos / Math.max(ronda, 1)) * 100)}%</p>
          </div>
          <div className="rounded-xl bg-white/20 p-3 text-white backdrop-blur">
            <p className="text-xs uppercase tracking-wide">Meta</p>
            <p className="text-sm font-semibold">Termina las {TOTAL_RONDAS} rondas con al menos 1 vida.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
