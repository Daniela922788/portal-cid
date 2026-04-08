import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, FileText } from "lucide-react";

const publicaciones = [
  { titulo: "Innovación Educativa en Envigado", tipo: "Libro", año: "2024" },
  { titulo: "Revista STEM Educativa", tipo: "Revista", año: "2024" }
];

export default function Publicaciones() {
  return (
    <div className="min-h-screen">
      <section className="relative w-full overflow-hidden bg-[linear-gradient(122deg,#182130_0%,#0D4B56_52%,#11B2AA_100%)] text-white">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#FFDE07]/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-[#EC6910]/15 blur-3xl" />
        <div className="pointer-events-none absolute right-1/3 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-[#11B2AA]/20 blur-2xl" />

        <div className="relative z-10 container flex min-h-[460px] flex-col justify-end pb-8 md:pb-10">
          <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/35 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]">
            <FileText className="h-4 w-4 text-[#FFDE07]" />
            Biblioteca CID
          </div>

          <h1 className="text-5xl font-extrabold leading-tight lg:text-6xl">Publicaciones</h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/85 lg:text-lg">
            Recursos editoriales, revistas y contenidos académicos que reflejan el trabajo en innovación educativa del territorio.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/12 px-4 py-2 font-medium backdrop-blur-sm">
              <BookOpen className="h-4 w-4" />
              {publicaciones.length} publicaciones
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/12 px-4 py-2 font-medium backdrop-blur-sm">
              Catálogo abierto
            </span>
          </div>
        </div>
      </section>

      <div className="py-8">
        <div className="container">
          <Breadcrumbs items={[{ label: "Publicaciones" }]} />
          <h2 className="text-3xl font-bold mb-8 text-[#182130]">Catálogo de publicaciones</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {publicaciones.map((p, i) => (
              <Card key={i}>
                <CardHeader>
                  <BookOpen className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>{p.titulo}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{p.tipo} - {p.año}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}