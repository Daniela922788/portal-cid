import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Clock3, MapPinned, Trophy } from "lucide-react";

interface BarrioPoint {
  nombre: string;
  x: number;
  y: number;
}

const MAP_WIDTH = 960;
const MAP_HEIGHT = 645;
const SEGUNDOS_POR_PREGUNTA = 12;
const TOTAL_PREGUNTAS = 12;
const MODO_AJUSTE_BOTONES = true;

const BARRIOS: BarrioPoint[] = [
  { nombre: "Las Vegas", x: 300, y: 245 },
  { nombre: "El Portal", x: 372, y: 225 },
  { nombre: "San Marcos", x: 405, y: 229 },
  { nombre: "Jardines", x: 416, y: 182 },
  { nombre: "Pontevedra", x: 462, y: 199 },
  { nombre: "La Magnolia", x: 458, y: 223 },
  { nombre: "Bucarest", x: 462, y: 247 },
  { nombre: "El Obrero", x: 462, y: 268 },
  { nombre: "Zona Centro", x: 416, y: 292 },
  { nombre: "Mesa", x: 438, y: 333 },
  { nombre: "Los Naranjos", x: 483, y: 291 },
  { nombre: "Alcala", x: 351, y: 284 },
  { nombre: "Milan-Vallejuelos", x: 305, y: 326 },
  { nombre: "Primavera", x: 260, y: 375 },
  { nombre: "Las Casitas", x: 214, y: 401 },
  { nombre: "Loma del Barro", x: 250, y: 454 },
  { nombre: "El Trianon", x: 335, y: 452 },
  { nombre: "Las Antillas", x: 386, y: 471 },
  { nombre: "La Paz", x: 309, y: 395 },
  { nombre: "El Dorado", x: 385, y: 372 },
  { nombre: "San Jose", x: 460, y: 397 },
  { nombre: "San Rafael", x: 423, y: 469 },
  { nombre: "La Mina", x: 458, y: 492 },
  { nombre: "El Chingui", x: 545, y: 486 },
  { nombre: "El Salado", x: 528, y: 528 },
  { nombre: "Loma de Las Brujas", x: 534, y: 425 },
  { nombre: "La Pradera", x: 538, y: 364 },
  { nombre: "Inmaculada", x: 595, y: 318 },
  { nombre: "El Chocho", x: 674, y: 352 },
  { nombre: "La Sebastiana", x: 533, y: 285 },
  { nombre: "Uribe Angel", x: 534, y: 262 },
  { nombre: "Las Flores", x: 525, y: 230 },
  { nombre: "La Orquidea", x: 500, y: 170 },
  { nombre: "Alto de Misael", x: 548, y: 226 },
  { nombre: "El Esmeraldal", x: 621, y: 258 },
  { nombre: "Loma El Atravesado", x: 689, y: 286 },
  { nombre: "Zuniga", x: 612, y: 194 },
  { nombre: "Villagrande", x: 448, y: 156 },
  { nombre: "Bosques de Zuniga", x: 490, y: 112 },
];

const barajar = <T,>(arr: T[]): T[] => {
  const copia = [...arr];
  for (let i = copia.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
};

const toPercentX = (x: number) => `${(x / MAP_WIDTH) * 100}%`;
const toPercentY = (y: number) => `${(y / MAP_HEIGHT) * 100}%`;

export default function EnvigadoCurioso() {
  const ordenPreguntas = useMemo(() => barajar(BARRIOS).slice(0, TOTAL_PREGUNTAS), []);

  const [indicePregunta, setIndicePregunta] = useState(0);
  const [tiempo, setTiempo] = useState(SEGUNDOS_POR_PREGUNTA);
  const [puntaje, setPuntaje] = useState(0);
  const [vidas, setVidas] = useState(3);
  const [racha, setRacha] = useState(0);
  const [bloqueado, setBloqueado] = useState(false);
  const [feedback, setFeedback] = useState("Haz clic en el punto correcto del barrio pedido.");
  const [seleccionado, setSeleccionado] = useState<string | null>(null);
  const [objetivoVisible, setObjetivoVisible] = useState<string | null>(null);
  const [ultimoBotonOprimido, setUltimoBotonOprimido] = useState<string | null>(null);

  const finalizado = vidas <= 0 || indicePregunta >= ordenPreguntas.length;
  const preguntaActual = ordenPreguntas[indicePregunta];

  const siguientePregunta = (delay: number) => {
    setTimeout(() => {
      setSeleccionado(null);
      setObjetivoVisible(null);
      setIndicePregunta((prev) => prev + 1);
      setTiempo(SEGUNDOS_POR_PREGUNTA);
      setBloqueado(false);
    }, delay);
  };

  useEffect(() => {
    if (finalizado || bloqueado || !preguntaActual) return;

    const timer = setInterval(() => {
      setTiempo((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setBloqueado(true);
          setVidas((v) => Math.max(0, v - 1));
          setRacha(0);
          setObjetivoVisible(preguntaActual.nombre);
          setFeedback(`Se acabo el tiempo. El barrio correcto era ${preguntaActual.nombre}.`);
          siguientePregunta(1400);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [finalizado, bloqueado, preguntaActual]);

  const seleccionarPunto = (barrio: BarrioPoint) => {
    if (bloqueado || finalizado || !preguntaActual) return;

    setBloqueado(true);
    setSeleccionado(barrio.nombre);
    setUltimoBotonOprimido(barrio.nombre);
    const acierto = barrio.nombre === preguntaActual.nombre;

    if (acierto) {
      const nuevaRacha = racha + 1;
      const bonusRacha = Math.min(8, nuevaRacha * 2);
      const bonusTiempo = tiempo;
      const ganados = 10 + bonusRacha + bonusTiempo;

      setRacha(nuevaRacha);
      setPuntaje((prev) => prev + ganados);
      setFeedback(`Seleccionaste ${barrio.nombre}. Correcto. +${ganados} puntos.`);
      siguientePregunta(900);
      return;
    }

    setVidas((prev) => Math.max(0, prev - 1));
    setRacha(0);
    setObjetivoVisible(preguntaActual.nombre);
    setFeedback(`Seleccionaste ${barrio.nombre}. Error: debias marcar ${preguntaActual.nombre}. Te queda${vidas - 1 === 1 ? "" : "n"} ${Math.max(vidas - 1, 0)} vida${vidas - 1 === 1 ? "" : "s"}.`);
    siguientePregunta(1400);
  };

  return (
    <div className="min-h-screen bg-[#d9d9d9] px-2 py-4 md:px-4 md:py-6">
      <div className="mx-auto w-full max-w-5xl rounded-xl border-2 border-[#2f6f06] bg-[#cfcfcf] shadow-[inset_0_0_0_2px_rgba(255,255,255,0.35)]">
        <div className="rounded-t-lg bg-[#5fa30c] px-4 py-2 text-white">
          <div className="flex items-center justify-between">
            <Link href="/cid-kids">
              <Button variant="ghost" className="h-8 px-2 text-white hover:bg-white/20">
                <ArrowLeft className="mr-1 h-4 w-4" /> Volver
              </Button>
            </Link>

            <h1 className="text-xl font-bold md:text-4xl">Barrios de Envigado</h1>

            <div className="rounded-md bg-[#4f8909] px-3 py-1 text-right">
              <p className="text-[10px] font-bold uppercase tracking-wide">Puntos</p>
              <p className="text-2xl font-black leading-none">{puntaje.toString().padStart(3, "0")}</p>
            </div>
          </div>
        </div>

        <div className="border-y-2 border-[#7ea644] bg-[#ececec] px-4 py-4 text-center">
          <p className="text-3xl font-black text-slate-800">{preguntaActual ? preguntaActual.nombre : "Juego terminado"}</p>
          <p className="text-lg font-semibold text-slate-700">Selecciona el punto del barrio correcto</p>
          {!finalizado && (
            <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#6aaa1f] px-4 py-1 text-sm font-bold text-white">
              <MapPinned className="h-4 w-4" /> Pulsa en el punto que corresponda
            </span>
          )}
        </div>

        <div className="px-3 py-3 md:px-4">
          <div className="rounded-lg border border-[#8ca273] bg-[#cfcfcf] p-2">
            <div className="mx-auto w-full max-w-[860px]">
              <div className="relative">
                <img
                  src="/Mapa_sin_letras.png"
                  alt="Mapa de barrios de Envigado"
                  className="w-full rounded-md"
                  loading="eager"
                  decoding="async"
                />

                {BARRIOS.map((barrio) => {
                  const esSeleccionado = seleccionado === barrio.nombre;
                  const esObjetivo = objetivoVisible === barrio.nombre;
                  const colorPunto = esSeleccionado ? "#c43d22" : esObjetivo ? "#4ea012" : "#2c4f1d";

                  return (
                    <button
                      key={barrio.nombre}
                      type="button"
                      aria-label={`Seleccionar ${barrio.nombre}`}
                      title={barrio.nombre}
                      disabled={bloqueado || finalizado}
                      onClick={() => seleccionarPunto(barrio)}
                      className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#d4f1b4] shadow-md transition-transform hover:scale-110 disabled:cursor-default"
                      style={{
                        left: toPercentX(barrio.x),
                        top: toPercentY(barrio.y),
                        width: esSeleccionado || esObjetivo ? "22px" : "16px",
                        height: esSeleccionado || esObjetivo ? "22px" : "16px",
                        backgroundColor: colorPunto,
                      }}
                    >
                      <span className="block h-1.5 w-1.5 rounded-full bg-[#f3ffe6] mx-auto" />
                    </button>
                  );
                })}

                {MODO_AJUSTE_BOTONES &&
                  BARRIOS.map((barrio) => (
                    <div
                      key={`label-${barrio.nombre}`}
                      className="pointer-events-none absolute -translate-x-1/2 -translate-y-[145%] rounded bg-black/65 px-1.5 py-0.5 text-[10px] font-semibold text-white"
                      style={{ left: toPercentX(barrio.x), top: toPercentY(barrio.y) }}
                    >
                      {barrio.nombre}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="mt-3 rounded-lg border border-[#8ca273] bg-[#f1f8e4] px-4 py-3 text-sm font-semibold text-[#355522]">
            {feedback}
          </div>

          {ultimoBotonOprimido && (
            <div className="mt-2 rounded-lg border border-[#8ca273] bg-[#e9f2d8] px-4 py-2 text-sm font-bold text-[#355522]">
              Boton oprimido: {ultimoBotonOprimido}
            </div>
          )}

          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-[#8ca273] bg-[#e9f2d8] p-3">
              <p className="text-xs font-bold uppercase text-[#2f6f06]">Pregunta</p>
              <p className="text-2xl font-black text-slate-800">{Math.min(indicePregunta + 1, ordenPreguntas.length)} / {ordenPreguntas.length}</p>
            </div>

            <div className="rounded-lg border border-[#8ca273] bg-[#e9f2d8] p-3">
              <p className="text-xs font-bold uppercase text-[#2f6f06]">Tiempo</p>
              <p className="flex items-center gap-2 text-2xl font-black text-slate-800">
                <Clock3 className="h-5 w-5 text-[#2f6f06]" /> {tiempo}s
              </p>
            </div>

            <div className="rounded-lg border border-[#8ca273] bg-[#e9f2d8] p-3">
              <p className="text-xs font-bold uppercase text-[#2f6f06]">Vidas / Racha</p>
              <p className="text-lg font-black text-slate-800">{"❤".repeat(Math.max(vidas, 0))} · {racha}</p>
            </div>
          </div>

          {MODO_AJUSTE_BOTONES && (
            <div className="mt-3 rounded-lg border border-[#8ca273] bg-[#fffbe7] px-4 py-3 text-xs text-[#5d4a00]">
              Modo ajuste activo: reubica cada boton cambiando los valores x, y de BARRIOS en este archivo.
            </div>
          )}

          {finalizado && (
            <Card className="mt-4 border border-[#8ca273] bg-[linear-gradient(90deg,#5fa30c_0%,#78c41a_100%)] text-white shadow-none">
              <CardContent className="p-5">
                <div className="mb-2 flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  <p className="text-2xl font-black">Resultado final</p>
                </div>
                <p className="text-lg">Puntaje: {puntaje}</p>
                <p className="text-sm text-emerald-50">
                  {vidas > 0
                    ? "Completaste el reto de ubicacion de barrios. Excelente trabajo."
                    : "Cometiste 3 errores y perdiste. Reintenta para mejorar tu precision territorial."}
                </p>
                <div className="mt-4">
                  <Link href="/juegos/envigado-curioso">
                    <Button className="bg-white text-[#2f6f06] hover:bg-emerald-50">Jugar otra vez</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
