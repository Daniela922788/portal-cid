import { useEffect, useState } from "react";
import { Link } from "wouter";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, BookOpen, X, Search, ChevronRight, ChevronLeft } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Skeleton } from "@/components/ui/skeleton";

interface ECard {
  id: string;
  titulo: string;
  tematica: string;
  estado: string;
  lugar: string;
  fechas: string[];
  sesiones: string[]; // ISO dates: "2026-03-20"
  ano: number;
  imagen: string;
  subtitulo: string;
  descripcion: string[];
  trabajado: string[];
  enfoque: string;
  metodologias: string[];
  enfoqueCierre: string;
  competencias: string[];
  proyectoFinal: string;
}

export default function Formacion() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTematicas, setSelectedTematicas] = useState<string[]>([]);
  const [selectedEstados, setSelectedEstados] = useState<string[]>([]);
  const [selectedLugares, setSelectedLugares] = useState<string[]>([]);
  const [ecardOpen, setEcardOpen] = useState(false);
  const [selectedEcard, setSelectedEcard] = useState<ECard | null>(null);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const { data: cursos = [], isLoading } = trpc.courses.list.useQuery();

  // Opciones de filtros
  const tematicas = ["Robotica", "IA", "Musica", "Ciencia", "Fotografia", "Edicion"];
  const estados = ["En inscripciones", "En curso", "Cerrado"];
  const lugares = [
    "Biblioteca Pública y Parque Cultural Débora Arango",
    "Lugar X",
    "Lugar Y",
  ];

  // Datos de ejemplo de ECards
  const ecards: ECard[] = [
    {
      id: "1",
      titulo: "Semillero STEAMers Kids 2025",
      tematica: "Robotica",
      estado: "Cerrado",
      lugar: "Biblioteca Pública y Parque Cultural Débora Arango",
      fechas: [
        "22 de abril - 20 de mayo de 2025",
        "5 sesiones presenciales (1 sesión semanal de 1 hora y 30 minutos)",
      ],
      ano: 2025,
      imagen: "/Formacion/Ecard%20STEAMER%20KIDS.jpeg",
      subtitulo:
        "Espacio formativo para explorar Ciencia, Tecnología, Ingeniería, Arte y Matemáticas (STEAM) con experiencias prácticas y basadas en el juego.",
      descripcion: [
        "El Semillero STEAMers Kids fue un espacio formativo dirigido a estudiantes de primaria para explorar las áreas de Ciencia, Tecnología, Ingeniería, Arte y Matemáticas (STEAM) mediante experiencias prácticas y basadas en el juego.",
        "A través del uso de herramientas digitales, actividades creativas y proyectos de robótica artesanal, los estudiantes se acercaron a conceptos de programación básica, pensamiento computacional y experimentación, fortaleciendo su curiosidad científica y su capacidad para resolver problemas.",
        "El curso fue diseñado para principiantes, por lo que no se requirieron conocimientos previos.",
      ],
      trabajado: [
        "Exploraron el pensamiento computacional mediante actividades desconectadas.",
        "Aprendieron programación por bloques a través de retos interactivos.",
        "Realizaron modelado 3D utilizando la plataforma Tinkercad.",
        "Diseñaron y construyeron robots artesanales con materiales accesibles.",
        "Participaron en una actividad final para poner a prueba sus robots.",
      ],
      enfoque:
        "El semillero se desarrolló bajo el enfoque educativo STEAM+, que promueve el aprendizaje activo y la integración de múltiples áreas del conocimiento.",
      metodologias: [
        "Design Thinking",
        "Gamificación",
        "Aprendizaje basado en retos",
      ],
      enfoqueCierre:
        "Estas estrategias permitieron que los estudiantes aprendieran experimentando, creando y colaborando con otros compañeros.",
      competencias: [
        "Pensamiento computacional",
        "Creatividad e innovación",
        "Resolución de problemas",
        "Trabajo en equipo y colaboración",
        "Interés por la ciencia y la tecnología",
      ],
      sesiones: [],
      proyectoFinal:
        "Como cierre del semillero, los estudiantes diseñaron, construyeron y perfeccionaron robots artesanales, los cuales fueron puestos a prueba en una actividad colaborativa donde aplicaron los conocimientos adquiridos durante las sesiones.",
    },
    {
      id: "2",
      titulo: "IA para Educadores",
      tematica: "IA",
      estado: "En curso",
      lugar: "Lugar X",
      fechas: ["15 de marzo - 30 de abril de 2026"],
      sesiones: [
        "2026-03-20",
        "2026-03-27",
        "2026-04-03",
        "2026-04-17",
        "2026-04-24",
      ],
      ano: 2026,
      imagen: "/Formacion/Ecard%20STEAMER%20KIDS.jpeg",
      subtitulo: "Curso sobre aplicaciones de inteligencia artificial en educación.",
      descripcion: ["Contenido del curso..."],
      trabajado: ["Tema 1", "Tema 2"],
      enfoque: "Enfoque pedagógico...",
      metodologias: ["Método 1", "Método 2"],
      enfoqueCierre: "Conclusión...",
      competencias: ["Competencia 1"],
      proyectoFinal: "Proyecto final...",
    },
  ];

  const ecardTagStyles: Record<string, string> = {
    tematica: "border-cyan-200 bg-cyan-50 text-cyan-800",
    fechas: "border-amber-200 bg-amber-50 text-amber-800",
    estado: "border-rose-200 bg-rose-50 text-rose-800",
    lugar: "border-violet-200 bg-violet-50 text-violet-800",
  };

  // Funciones de filtrado
  const toggleFilter = (
    value: string,
    state: string[],
    setState: (state: string[]) => void
  ) => {
    if (state.includes(value)) {
      setState(state.filter((item) => item !== value));
    } else {
      setState([...state, value]);
    }
  };

  const filteredEcards = ecards.filter((ecard) => {
    const matchesSearch = ecard.titulo
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTematica =
      selectedTematicas.length === 0 ||
      selectedTematicas.includes(ecard.tematica);
    const matchesEstado =
      selectedEstados.length === 0 || selectedEstados.includes(ecard.estado);
    const matchesLugar =
      selectedLugares.length === 0 || selectedLugares.includes(ecard.lugar);

    return matchesSearch && matchesTematica && matchesEstado && matchesLugar;
  });

  // Separar por categoría
  const cursosActivos = filteredEcards.filter((e) => e.estado === "En curso");
  const cursos2026 = filteredEcards.filter((e) => e.ano === 2026);
  const cursos2025 = filteredEcards.filter((e) => e.ano === 2025);

  useEffect(() => {
    if (!ecardOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setEcardOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [ecardOpen]);

  // Lógica del calendario
  const activeSessions = ecards
    .filter((e) => e.estado === "En curso" || e.estado === "En inscripciones")
    .flatMap((e) =>
      e.sesiones.map((date) => ({ date, titulo: e.titulo, tematica: e.tematica }))
    );

  const calendarYear = calendarDate.getFullYear();
  const calendarMonth = calendarDate.getMonth();
  const firstDayOfMonth = new Date(calendarYear, calendarMonth, 1).getDay();
  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
  ];
  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  // dias con sesiones en el mes visible
  const sessionsByDay: Record<number, { titulo: string; tematica: string }[]> = {};
  activeSessions.forEach(({ date, titulo, tematica }) => {
    const d = new Date(date + "T00:00:00");
    if (d.getFullYear() === calendarYear && d.getMonth() === calendarMonth) {
      const day = d.getDate();
      if (!sessionsByDay[day]) sessionsByDay[day] = [];
      sessionsByDay[day].push({ titulo, tematica });
    }
  });

  const tematicaColor: Record<string, string> = {
    Robotica: "bg-cyan-400",
    IA: "bg-violet-400",
    Musica: "bg-pink-400",
    Ciencia: "bg-emerald-400",
    Fotografia: "bg-amber-400",
    Edicion: "bg-orange-400",
  };

  // Componente de carrusel
  const Carousel = ({
    title,
    items,
  }: {
    title: string;
    items: ECard[];
  }) => (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-slate-900">{title}</h2>
      {items.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-lg">
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
          <p className="text-muted-foreground">
            No hay cursos disponibles en esta categoría
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-6 w-min md:w-full">
            {items.map((ecard) => (
              <button
                key={ecard.id}
                type="button"
                onClick={() => {
                  setSelectedEcard(ecard);
                  setEcardOpen(true);
                }}
                className="group block flex-shrink-0 w-80 overflow-hidden rounded-2xl shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl text-left"
                aria-label={`Abrir ${ecard.titulo}`}
              >
                <img
                  src={ecard.imagen}
                  alt={ecard.titulo}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div className="bg-white px-4 py-3">
                  <p className="mb-2 text-sm font-bold text-slate-900 line-clamp-2">
                    {ecard.titulo}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="outline" className={`text-xs rounded-full px-2 py-0.5 ${ecardTagStyles.tematica}`}>
                      {ecard.tematica}
                    </Badge>
                    <Badge variant="outline" className={`text-xs rounded-full px-2 py-0.5 ${ecardTagStyles.fechas}`}>
                      {ecard.fechas[0]}
                    </Badge>
                    <Badge variant="outline" className={`text-xs rounded-full px-2 py-0.5 ${ecardTagStyles.estado}`}>
                      {ecard.estado}
                    </Badge>
                    <Badge variant="outline" className={`text-xs rounded-full px-2 py-0.5 ${ecardTagStyles.lugar}`}>
                      {ecard.lugar}
                    </Badge>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen py-8 bg-slate-50">
      <div className="container">
        <Breadcrumbs items={[{ label: "Formación" }]} />
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Formación Continua</h1>
          <p className="text-xl text-muted-foreground">
            Cursos, talleres y diplomados para fortalecer competencias educativas
          </p>
        </div>

        {/* CALENDARIO DE SESIONES ACTIVAS */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Próximas sesiones</h2>
              <p className="text-sm text-slate-500">Días con cursos activos este mes</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCalendarDate(new Date(calendarYear, calendarMonth - 1, 1))}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <ChevronLeft className="h-4 w-4 text-slate-600" />
              </button>
              <span className="text-sm font-semibold text-slate-800 w-36 text-center">
                {monthNames[calendarMonth]} {calendarYear}
              </span>
              <button
                onClick={() => setCalendarDate(new Date(calendarYear, calendarMonth + 1, 1))}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <ChevronRight className="h-4 w-4 text-slate-600" />
              </button>
            </div>
          </div>

          {/* Encabezados de días */}
          <div className="grid grid-cols-7 mb-1">
            {dayNames.map((d) => (
              <div key={d} className="text-center text-xs font-semibold text-slate-400 py-2">{d}</div>
            ))}
          </div>

          {/* Días del mes */}
          <div className="grid grid-cols-7 gap-1">
            {/* Celdas vacías al inicio */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {/* Días */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const sessions = sessionsByDay[day];
              const isToday =
                new Date().getDate() === day &&
                new Date().getMonth() === calendarMonth &&
                new Date().getFullYear() === calendarYear;
              return (
                <div
                  key={day}
                  title={sessions ? sessions.map((s) => s.titulo).join(", ") : undefined}
                  className={`relative flex flex-col items-center justify-start rounded-xl py-2 min-h-[3rem] ${
                    sessions
                      ? "bg-blue-50 ring-1 ring-blue-200"
                      : isToday
                      ? "bg-slate-100"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <span
                    className={`text-sm font-medium ${
                      isToday ? "text-blue-600 font-bold" : sessions ? "text-blue-800" : "text-slate-700"
                    }`}
                  >
                    {day}
                  </span>
                  {sessions && (
                    <div className="flex flex-wrap justify-center gap-0.5 mt-1">
                      {sessions.map((s, idx) => (
                        <span
                          key={idx}
                          className={`h-1.5 w-1.5 rounded-full ${tematicaColor[s.tematica] ?? "bg-slate-400"}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Leyenda */}
          {activeSessions.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-4">
              {ecards
                .filter((e) => e.estado === "En curso" || e.estado === "En inscripciones")
                .map((e) => (
                  <div key={e.id} className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${tematicaColor[e.tematica] ?? "bg-slate-400"}`} />
                    <span className="text-xs text-slate-600">{e.titulo}</span>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* LAYOUT DE DOS COLUMNAS */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* SIDEBAR DE FILTROS - IZQUIERDA */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-6">Filtros</h2>

              {/* Búsqueda */}
              <div className="mb-8">
                <label className="text-sm font-semibold text-slate-900 mb-2 block">
                  Buscar
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Nombre del curso..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Filtros por Temática */}
              <div className="mb-8 pb-8 border-b border-slate-200">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">
                  Temática
                </h3>
                <div className="space-y-2">
                  {tematicas.map((tematica) => (
                    <label
                      key={tematica}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTematicas.includes(tematica)}
                        onChange={() =>
                          toggleFilter(
                            tematica,
                            selectedTematicas,
                            setSelectedTematicas
                          )
                        }
                        className="w-4 h-4 rounded border-slate-300 text-cyan-500 focus:ring-2 focus:ring-cyan-500"
                      />
                      <span className="text-sm text-slate-700 group-hover:text-slate-900">
                        {tematica}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filtros por Estado */}
              <div className="mb-8 pb-8 border-b border-slate-200">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">
                  Estado
                </h3>
                <div className="space-y-2">
                  {estados.map((estado) => (
                    <label
                      key={estado}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedEstados.includes(estado)}
                        onChange={() =>
                          toggleFilter(
                            estado,
                            selectedEstados,
                            setSelectedEstados
                          )
                        }
                        className="w-4 h-4 rounded border-slate-300 text-rose-500 focus:ring-2 focus:ring-rose-500"
                      />
                      <span className="text-sm text-slate-700 group-hover:text-slate-900">
                        {estado}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filtros por Lugar */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">
                  Lugar
                </h3>
                <div className="space-y-2">
                  {lugares.map((lugar) => (
                    <label
                      key={lugar}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedLugares.includes(lugar)}
                        onChange={() =>
                          toggleFilter(
                            lugar,
                            selectedLugares,
                            setSelectedLugares
                          )
                        }
                        className="w-4 h-4 rounded border-slate-300 text-violet-500 focus:ring-2 focus:ring-violet-500"
                      />
                      <span className="text-sm text-slate-700 group-hover:text-slate-900 line-clamp-2">
                        {lugar}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Botón para limpiar filtros */}
              {(searchTerm ||
                selectedTematicas.length > 0 ||
                selectedEstados.length > 0 ||
                selectedLugares.length > 0) && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedTematicas([]);
                    setSelectedEstados([]);
                    setSelectedLugares([]);
                  }}
                  className="w-full py-2 px-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          </div>

          {/* CONTENIDO DE CARROUSELES - DERECHA */}
          <div className="lg:col-span-3">
            <Carousel title="Cursos Activos" items={cursosActivos} />
            <Carousel title="2026" items={cursos2026} />
            <Carousel title="2025" items={cursos2025} />
          </div>
        </div>
      </div>

      {/* MODAL DE DETALLE */}
      {ecardOpen && selectedEcard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4"
          onClick={() => setEcardOpen(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-5 py-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {selectedEcard.titulo}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEcardOpen(false)}
                className="rounded-full p-1.5 text-slate-600 hover:bg-slate-100"
                aria-label="Cerrar información del curso"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 md:p-8">
              <div className="mb-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                <img
                  src={selectedEcard.imagen}
                  alt={selectedEcard.titulo}
                  loading="eager"
                  decoding="async"
                  className="w-full object-cover"
                />
              </div>

              <h4 className="text-2xl font-black text-slate-900">
                {selectedEcard.titulo}
              </h4>
              <p className="mt-2 text-base leading-7 text-slate-700">
                {selectedEcard.subtitulo}
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-5">
                  <h5 className="text-base font-bold text-emerald-800">
                    Estado del curso
                  </h5>
                  <p className="mt-2 text-sm font-medium text-emerald-900">
                    {selectedEcard.estado}
                  </p>
                </div>
                <div className="rounded-xl border border-amber-100 bg-amber-50 p-5">
                  <h5 className="text-base font-bold text-amber-800">
                    Fechas de realización
                  </h5>
                  <div className="mt-2 space-y-1 text-sm text-amber-900">
                    {selectedEcard.fechas.map((fecha) => (
                      <p key={fecha}>{fecha}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                {selectedEcard.descripcion.map((parrafo) => (
                  <p key={parrafo} className="text-base leading-7 text-slate-700">
                    {parrafo}
                  </p>
                ))}
              </div>

              <div className="mt-7 rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h5 className="text-lg font-bold text-slate-900">
                  ¿Qué se trabajó en el semillero?
                </h5>
                <ul className="mt-3 space-y-2">
                  {selectedEcard.trabajado.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm leading-6 text-slate-700"
                    >
                      <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-fuchsia-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-5">
                  <h5 className="text-base font-bold text-emerald-800">
                    Enfoque pedagógico
                  </h5>
                  <p className="mt-2 text-sm leading-6 text-emerald-900">
                    {selectedEcard.enfoque}
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                    Metodologías aplicadas
                  </p>
                  <ul className="mt-3 space-y-1 text-sm font-medium text-emerald-900">
                    {selectedEcard.metodologias.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                  <p className="mt-3 text-sm leading-6 text-emerald-900">
                    {selectedEcard.enfoqueCierre}
                  </p>
                </div>

                <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-5">
                  <h5 className="text-base font-bold text-indigo-800">
                    Habilidades desarrolladas
                  </h5>
                  <ul className="mt-3 space-y-1 text-sm text-indigo-900">
                    {selectedEcard.competencias.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-fuchsia-100 bg-fuchsia-50 p-5">
                <h5 className="text-base font-bold text-fuchsia-800">
                  Proyecto final
                </h5>
                <p className="mt-2 text-sm leading-6 text-fuchsia-900">
                  {selectedEcard.proyectoFinal}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
