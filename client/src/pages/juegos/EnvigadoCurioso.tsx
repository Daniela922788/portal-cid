import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";

interface Animal {
  id: string;
  nombre: string;
  emoji: string;
  veredas: string[];
  avistamientos: number;
}

const animales: Animal[] = [
  { id: "pava", nombre: "Pava Cariazul", emoji: "🦅", veredas: ["Pantanillo", "Perico", "Las Palmas", "Santa Catalina", "El Escobero", "El Vallano"], avistamientos: 1269 },
  { id: "ardilla", nombre: "Ardilla Colirroja", emoji: "🐿️", veredas: ["Las Palmas", "Santa Catalina", "El Escobero", "El Vallano"], avistamientos: 696 },
  { id: "zorro", nombre: "Zorro Perro", emoji: "🦊", veredas: ["Las Palmas", "El Vallano", "Perico"], avistamientos: 584 },
  { id: "zarigueya", nombre: "Zarigüeya Común", emoji: "🐭", veredas: ["Pantanillo", "Santa Catalina", "El Vallano"], avistamientos: 566 },
  { id: "paloma", nombre: "Paloma Lineada", emoji: "🕊️", veredas: ["Perico", "El Escobero", "El Vallano"], avistamientos: 381 },
  { id: "puma", nombre: "Puma", emoji: "🐱", veredas: ["Pantanillo", "Perico", "Las Palmas", "Santa Catalina", "El Vallano"], avistamientos: 341 },
  { id: "gorriom", nombre: "Gorrión de Montes", emoji: "🐦", veredas: ["Pantanillo", "Las Palmas", "Santa Catalina", "El Escobero", "El Vallano"], avistamientos: 270 },
  { id: "perdiz", nombre: "Perdiz Colorada", emoji: "🦃", veredas: ["Pantanillo", "Perico", "Las Palmas", "El Escobero", "El Vallano"], avistamientos: 226 },
];

const triviaPreguntas = [
  { pregunta: "¿Cuál es la especie más avistada en todo Envigado?", opciones: ["Pava Cariazul", "Puma", "Taira"], correcta: 0 },
  { pregunta: "¿Qué vereda tiene más avistamientos de puma?", opciones: ["Pantanillo", "Santa Catalina", "Las Palmas"], correcta: 1 },
  { pregunta: "¿Cuál es la vereda con más avistamientos totales?", opciones: ["El Vallano", "Pantanillo", "Santa Catalina"], correcta: 2 },
  { pregunta: "¿Cuál vereda es famosa por tener muchos zorros perro?", opciones: ["Perico", "Las Palmas", "El Escobero"], correcta: 1 },
  { pregunta: "¿Cuál es la línea productiva más común en Envigado?", opciones: ["Ganadería", "Avicultura", "Piscicultura"], correcta: 1 },
];

const sabiasQue = [
  "La Pava Cariazul es el ave más avistada en Envigado con 1,269 registros.",
  "Santa Catalina es la vereda con mayor biodiversidad, con 1,778 avistamientos totales.",
  "El Puma tiene presencia en todas las veredas de Envigado, especialmente en Santa Catalina.",
  "La Ardilla Colirroja es el mamífero más visto en Envigado con 696 avistamientos.",
  "En Envigado hay 172 productores pecuarios, siendo la Avicultura la más común.",
  "Pantanillo es una zona de bosque alto ideal para observar aves de montaña.",
];

// Coordenadas de los centros de cada vereda en el mapa (valores de 0-100 en porcentaje)
const veredaCenters: Record<string, { x: number; y: number }> = {
  "Santa Catalina": { x: 20, y: 20 },
  "Perico": { x: 55, y: 18 },
  "Pantanillo": { x: 65, y: 40 },
  "Las Palmas": { x: 40, y: 35 },
  "El Escobero": { x: 20, y: 50 },
  "El Vallano": { x: 25, y: 75 },
};

export default function EnvigadoCurioso() {
  const [draggedAnimal, setDraggedAnimal] = useState<string | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{ animal: string; correct: boolean; message: string } | null>(null);
  const [triviaIndex, setTriviaIndex] = useState(0);
  const [triviaScore, setTriviaScore] = useState(0);
  const [triviaAnswered, setTriviaAnswered] = useState(false);
  const [sabiasIndex, setSabiasIndex] = useState(0);
  const [placedAnimals, setPlacedAnimals] = useState<Record<string, string>>({});

  const handleDragStart = (animalId: string) => {
    if (!correctAnswers.includes(animalId)) {
      setDraggedAnimal(animalId);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropOnVereda = (veredaNombre: string) => {
    if (!draggedAnimal) return;

    const animal = animales.find(a => a.id === draggedAnimal);
    if (!animal) return;

    const isCorrect = animal.veredas.includes(veredaNombre);
    
    if (isCorrect && !correctAnswers.includes(draggedAnimal)) {
      setCorrectAnswers([...correctAnswers, draggedAnimal]);
      setPlacedAnimals({ ...placedAnimals, [draggedAnimal]: veredaNombre });
      setFeedback({
        animal: animal.nombre,
        correct: true,
        message: `¡Muy bien! ${animal.nombre} vive en ${veredaNombre}.`
      });
    } else if (!isCorrect) {
      setFeedback({
        animal: animal.nombre,
        correct: false,
        message: `Ups, ${animal.nombre} no vive en ${veredaNombre}. ¡Intenta otro!`
      });
    }

    setDraggedAnimal(null);
    setTimeout(() => setFeedback(null), 2000);
  };

  const handleTriviaAnswer = (index: number) => {
    if (triviaAnswered) return;
    
    const pregunta = triviaPreguntas[triviaIndex];
    if (index === pregunta.correcta) {
      setTriviaScore(triviaScore + 1);
    }
    
    setTriviaAnswered(true);
    setTimeout(() => {
      if (triviaIndex < triviaPreguntas.length - 1) {
        setTriviaIndex(triviaIndex + 1);
        setTriviaAnswered(false);
      }
    }, 1500);
  };

  const resetTrivia = () => {
    setTriviaIndex(0);
    setTriviaScore(0);
    setTriviaAnswered(false);
  };

  const nextSabiasQue = () => {
    setSabiasIndex((sabiasIndex + 1) % sabiasQue.length);
  };

  const prevSabiasQue = () => {
    setSabiasIndex((sabiasIndex - 1 + sabiasQue.length) % sabiasQue.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 py-12">
      <div className="container">
        <Link href="/cid-kids">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a CID Kids
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">🌿 Envigado Curioso</h1>
          <p className="text-xl text-muted-foreground">Descubre la fauna y biodiversidad de nuestro municipio</p>
        </div>

        {/* SECCIÓN DEL JUEGO */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>🎮 Juego: Arrastra los animales a su vereda correcta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Mapa con zonas interactivas */}
            <div className="bg-white p-6 rounded-lg border-2 border-green-200 relative" style={{ minHeight: "500px" }}>
              <img 
                src="/mapa-envigado-realista.png" 
                alt="Mapa de Envigado" 
                className="w-full h-auto rounded"
                style={{ minHeight: "400px" }}
              />
              
              {/* Zonas interactivas invisibles */}
              <div className="absolute inset-6 pointer-events-none">
                {/* Santa Catalina */}
                <div
                  onDragOver={handleDragOver}
                  onDrop={() => handleDropOnVereda("Santa Catalina")}
                  className="absolute pointer-events-auto cursor-drop hover:bg-blue-200 hover:opacity-30 transition-all"
                  style={{ left: "10%", top: "10%", width: "20%", height: "25%", borderRadius: "10px" }}
                  title="Vereda Santa Catalina"
                />
                
                {/* Perico */}
                <div
                  onDragOver={handleDragOver}
                  onDrop={() => handleDropOnVereda("Perico")}
                  className="absolute pointer-events-auto cursor-drop hover:bg-pink-200 hover:opacity-30 transition-all"
                  style={{ left: "45%", top: "8%", width: "25%", height: "22%", borderRadius: "10px" }}
                  title="Vereda Perico"
                />
                
                {/* Pantanillo */}
                <div
                  onDragOver={handleDragOver}
                  onDrop={() => handleDropOnVereda("Pantanillo")}
                  className="absolute pointer-events-auto cursor-drop hover:bg-purple-200 hover:opacity-30 transition-all"
                  style={{ left: "55%", top: "28%", width: "30%", height: "35%", borderRadius: "10px" }}
                  title="Vereda Pantanillo"
                />
                
                {/* Las Palmas */}
                <div
                  onDragOver={handleDragOver}
                  onDrop={() => handleDropOnVereda("Las Palmas")}
                  className="absolute pointer-events-auto cursor-drop hover:bg-rose-200 hover:opacity-30 transition-all"
                  style={{ left: "25%", top: "28%", width: "28%", height: "28%", borderRadius: "10px" }}
                  title="Vereda Las Palmas"
                />
                
                {/* El Escobero */}
                <div
                  onDragOver={handleDragOver}
                  onDrop={() => handleDropOnVereda("El Escobero")}
                  className="absolute pointer-events-auto cursor-drop hover:bg-yellow-200 hover:opacity-30 transition-all"
                  style={{ left: "10%", top: "45%", width: "20%", height: "30%", borderRadius: "10px" }}
                  title="Vereda El Escobero"
                />
                
                {/* El Vallano */}
                <div
                  onDragOver={handleDragOver}
                  onDrop={() => handleDropOnVereda("El Vallano")}
                  className="absolute pointer-events-auto cursor-drop hover:bg-blue-300 hover:opacity-30 transition-all"
                  style={{ left: "8%", top: "65%", width: "28%", height: "35%", borderRadius: "10px" }}
                  title="Vereda El Vallano"
                />
              </div>

              {/* Animales colocados */}
              <div className="absolute inset-6 pointer-events-none">
                {Object.entries(placedAnimals).map(([animalId, veredaNombre]) => {
                  const animal = animales.find(a => a.id === animalId);
                  const center = veredaCenters[veredaNombre];
                  if (!animal || !center) return null;
                  
                  return (
                    <div
                      key={animalId}
                      className="absolute text-4xl drop-shadow-lg"
                      style={{
                        left: `${center.x}%`,
                        top: `${center.y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      {animal.emoji}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Animales para arrastrar */}
            <div>
              <h3 className="font-bold mb-3">Animales para arrastrar:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {animales.map((animal) => (
                  <div
                    key={animal.id}
                    draggable={!correctAnswers.includes(animal.id)}
                    onDragStart={() => handleDragStart(animal.id)}
                    className={`p-4 rounded-lg border-2 text-center transition-all ${
                      correctAnswers.includes(animal.id)
                        ? "bg-green-100 border-green-500 opacity-50 cursor-not-allowed"
                        : "bg-white border-blue-300 hover:border-blue-500 cursor-grab active:cursor-grabbing"
                    }`}
                  >
                    <div className="text-3xl mb-2">{animal.emoji}</div>
                    <div className="text-sm font-medium">{animal.nombre}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feedback */}
            {feedback && (
              <div className={`p-4 rounded-lg flex items-center gap-3 ${feedback.correct ? "bg-green-100 border-green-500" : "bg-red-100 border-red-500"} border-2`}>
                {feedback.correct ? <CheckCircle2 className="h-6 w-6 text-green-600" /> : <XCircle className="h-6 w-6 text-red-600" />}
                <div>
                  <p className="font-bold">{feedback.correct ? "¡Correcto!" : "Intenta de nuevo"}</p>
                  <p>{feedback.message}</p>
                </div>
              </div>
            )}

            {/* Progreso */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="font-bold">Progreso: {correctAnswers.length}/{animales.length} animales ubicados</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${(correctAnswers.length / animales.length) * 100}%` }}></div>
              </div>
            </div>

            {correctAnswers.length === animales.length && (
              <div className="bg-gradient-to-r from-green-400 to-blue-400 text-white p-6 rounded-lg text-center">
                <p className="text-2xl font-bold">¡Felicidades, explorador!</p>
                <p className="mt-2">Has ubicado correctamente todos los animales de Envigado.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* SECCIÓN DE TRIVIA Y SABÍAS QUE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* TRIVIA */}
          <Card>
            <CardHeader>
              <CardTitle>🧠 Trivia de Fauna y Territorio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {triviaIndex < triviaPreguntas.length ? (
                <>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Pregunta {triviaIndex + 1} de {triviaPreguntas.length}</p>
                    <p className="text-lg font-bold mt-2">{triviaPreguntas[triviaIndex].pregunta}</p>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {triviaPreguntas[triviaIndex].opciones.map((opcion, index) => (
                      <Button
                        key={index}
                        onClick={() => handleTriviaAnswer(index)}
                        disabled={triviaAnswered}
                        className={`p-4 h-auto text-left justify-start ${
                          triviaAnswered
                            ? index === triviaPreguntas[triviaIndex].correcta
                              ? "bg-green-500 hover:bg-green-500"
                              : "bg-red-500 hover:bg-red-500"
                            : ""
                        }`}
                      >
                        {opcion}
                      </Button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="bg-gradient-to-r from-blue-400 to-green-400 text-white p-6 rounded-lg text-center">
                  <p className="text-2xl font-bold">¡Trivia completada!</p>
                  <p className="mt-2 text-lg">Obtuviste {triviaScore} de {triviaPreguntas.length} respuestas correctas.</p>
                  <Button
                    onClick={resetTrivia}
                    className="mt-4 bg-white text-blue-600 hover:bg-gray-100"
                  >
                    Intentar de nuevo
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* SABÍAS QUE */}
          <Card>
            <CardHeader>
              <CardTitle>💡 Datos Curiosos de Envigado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-yellow-200 to-orange-200 p-8 rounded-lg text-center min-h-48 flex flex-col items-center justify-center">
                <p className="text-2xl mb-4">🔍</p>
                <p className="text-lg font-bold text-gray-800">{sabiasQue[sabiasIndex]}</p>
              </div>

              <div className="flex gap-3 justify-center">
                <Button
                  onClick={prevSabiasQue}
                  variant="outline"
                >
                  ← Anterior
                </Button>
                <Button onClick={nextSabiasQue} className="bg-green-500 hover:bg-green-600">
                  Siguiente →
                </Button>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                Dato {sabiasIndex + 1} de {sabiasQue.length}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
