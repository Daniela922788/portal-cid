import { useState } from "react";
import { useLocation } from "wouter";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Camera, ChevronLeft, ChevronRight, GraduationCap, LayoutGrid, Monitor, MousePointerClick, Palette, Sparkles, X } from "lucide-react";

type Sala = {
	nombre: string;
	subtitulo: string;
	descripcion: string;
	espacios: string[];
	color: string;
	icono: typeof GraduationCap;
	galeria: {
		titulo: string;
		descripcion: string;
	}[];
};

const salas: Sala[] = [
	{
		nombre: "Sala 1",
		subtitulo: "Aprendizaje colaborativo",
		descripcion:
			"Espacio flexible para sesiones formativas, encuentros pedagógicos y talleres prácticos.",
		espacios: ["Zona de trabajo en equipo", "Área de proyección", "Estaciones de apoyo"],
		color: "#0D4B56",
		icono: GraduationCap,
		galeria: [
			{ titulo: "Disposición general", descripcion: "Vista amplia del espacio para encuentros, talleres y actividades colaborativas." },
			{ titulo: "Trabajo por equipos", descripcion: "Configuración pensada para aprendizaje activo y construcción conjunta." },
			{ titulo: "Zona de apoyo", descripcion: "Ambiente adaptable para acompañamiento, proyección y circulación de ideas." },
		],
	},
	{
		nombre: "Sala 2",
		subtitulo: "Exploración STEM+",
		descripcion:
			"Ambiente orientado al trabajo por retos y experiencias de innovación educativa.",
		espacios: ["Mesas modulares", "Zona de prototipado", "Área para demostraciones"],
		color: "#2D3586",
		icono: LayoutGrid,
		galeria: [
			{ titulo: "Exploración guiada", descripcion: "Espacio para retos, experimentación y resolución de problemas." },
			{ titulo: "Prototipado", descripcion: "Área adaptable para construir, probar y compartir soluciones." },
			{ titulo: "Demostraciones", descripcion: "Zona preparada para mostrar procesos, proyectos y resultados." },
		],
	},
	{
		nombre: "Sala 3",
		subtitulo: "Formación aplicada",
		descripcion:
			"Sala pensada para cursos, laboratorios de ideas y actividades de apropiación tecnológica.",
		espacios: ["Punto de acompañamiento", "Espacio de mentoría", "Zona de presentaciones"],
		color: "#023A34",
		icono: Monitor,
		galeria: [
			{ titulo: "Formación aplicada", descripcion: "Entorno para procesos formativos con acompañamiento cercano." },
			{ titulo: "Mentoría", descripcion: "Espacio para asesorías, seguimiento y profundización de proyectos." },
			{ titulo: "Presentaciones", descripcion: "Zona donde las ideas se socializan, validan y enriquecen." },
		],
	},
	{
		nombre: "Aula Naranja",
		subtitulo: "Creatividad y diseño",
		descripcion:
			"Entorno para creación, pensamiento visual y dinámicas que conectan arte, tecnología e innovación.",
		espacios: ["Zona creativa", "Espacio para co-creación", "Área para exhibición de resultados"],
		color: "#EC6910",
		icono: Palette,
		galeria: [
			{ titulo: "Creación visual", descripcion: "Ambiente diseñado para explorar ideas desde lo gráfico y lo expresivo." },
			{ titulo: "Co-creación", descripcion: "Espacio para diseñar, iterar y producir en colectivo." },
			{ titulo: "Exhibición", descripcion: "Área donde los resultados toman forma y se comparten con otros." },
		],
	},
	{
		nombre: "Centro de producción audiovisual",
		subtitulo: "Contenido educativo",
		descripcion:
			"Espacio especializado para registrar, producir y comunicar experiencias de aprendizaje.",
		espacios: ["Zona de grabación", "Área de edición", "Estación de contenidos"],
		color: "#182130",
		icono: Camera,
		galeria: [
			{ titulo: "Grabación", descripcion: "Espacio para producción de audio, video y recursos educativos." },
			{ titulo: "Edición", descripcion: "Zona técnica para montaje, ajustes y postproducción de contenidos." },
			{ titulo: "Contenido final", descripcion: "Estación orientada a publicar, distribuir y visibilizar productos audiovisuales." },
		],
	},
	{
		nombre: "Local 4",
		subtitulo: "Aprendizaje híbrido",
		descripcion:
			"Espacio versátil para encuentros, laboratorios de ideas y actividades de formación con apoyo tecnológico.",
		espacios: ["Zona de formación", "Área colaborativa", "Punto de acompañamiento"],
		color: "#11B2AA",
		icono: Monitor,
		galeria: [
			{ titulo: "Vista general", descripcion: "Distribución pensada para sesiones formativas y actividades por grupos." },
			{ titulo: "Trabajo colaborativo", descripcion: "Ambiente flexible para idear, construir y socializar propuestas." },
			{ titulo: "Acompañamiento", descripcion: "Espacio adecuado para mentorías, orientación y seguimiento de procesos." },
		],
	},
];

export default function Salas() {
	const [, navigate] = useLocation();
	const [salaSeleccionada, setSalaSeleccionada] = useState<Sala | null>(null);
	const [slideIndex, setSlideIndex] = useState(0);

	const slideActual = salaSeleccionada ? salaSeleccionada.galeria[slideIndex] : null;

	const goPrev = () => {
		if (!salaSeleccionada) return;
		setSlideIndex((prev) => (prev - 1 + salaSeleccionada.galeria.length) % salaSeleccionada.galeria.length);
	};

	const goNext = () => {
		if (!salaSeleccionada) return;
		setSlideIndex((prev) => (prev + 1) % salaSeleccionada.galeria.length);
	};

	return (
		<div className="min-h-screen bg-white">
			<section className="relative overflow-hidden bg-[linear-gradient(122deg,#182130_0%,#0D4B56_48%,#11B2AA_100%)] text-white">
				<div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#FFDE07]/20 blur-3xl" />
				<div className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-[#EC6910]/20 blur-3xl" />

				<div className="container relative z-10 flex min-h-[460px] flex-col justify-end pb-10">
					<div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/35 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]">
						<Building2 className="h-4 w-4 text-[#FFDE07]" />
						Infraestructura educativa CID
					</div>

					<h1 className="text-5xl font-extrabold leading-tight lg:text-6xl">Salas para la educación</h1>
					<p className="mt-3 max-w-3xl text-base leading-relaxed text-white/85 lg:text-lg">
						Contamos con seis espacios que impulsan formación, creatividad, tecnología y producción de conocimiento.
						Cada sala está pensada para vivir experiencias de aprendizaje con enfoque innovador.
					</p>

					<div className="mt-6 flex flex-wrap gap-3 text-sm">
						<span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/12 px-4 py-2 font-medium backdrop-blur-sm">
							<Sparkles className="h-4 w-4" />
							6 espacios protagonistas
						</span>
						<span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/12 px-4 py-2 font-medium backdrop-blur-sm">
							Formación, creatividad y producción
						</span>
					</div>
				</div>
			</section>

			<div className="container py-8">
				<Breadcrumbs items={[{ label: "Salas" }]} />

                <section className="relative left-1/2 w-screen -translate-x-1/2 bg-[#023A34] py-10 md:py-14">
					<div className="container">
						<h2 className="mb-8 text-center text-4xl font-bold text-white md:mb-10 md:text-6xl">
							Nuestros espacios en acción
						</h2>
						<div className="mx-auto max-w-8xl overflow-hidden rounded-2xl shadow-2xl">
							<div className="relative aspect-video w-full bg-black">
								<iframe
									src="https://www.youtube.com/embed/R6ffTBIieCw?autoplay=1&mute=1&loop=1&playlist=R6ffTBIieCw&playsinline=1"
									title="Somos el CID - Video"
									loading="lazy"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
									referrerPolicy="strict-origin-when-cross-origin"
									allowFullScreen
									className="absolute inset-0 h-full w-full"
								/>
							</div>
						</div>
					</div>
				</section>

				<section className="mt-6 rounded-3xl border border-[#0D4B56]/15 bg-[linear-gradient(120deg,rgba(13,75,86,0.06)_0%,rgba(17,178,170,0.08)_45%,rgba(255,222,7,0.12)_100%)] p-6 md:p-8">
					<h2 className="text-2xl font-bold text-[#182130] md:text-3xl">Nuestros espacios de aprendizaje</h2>
					<p className="mt-2 max-w-4xl text-[#0D4B56]">
						Estas salas permiten desarrollar actividades formativas, trabajo por proyectos y experiencias de innovación
						educativa con metodologías activas en un entorno preparado para el aprendizaje.
					</p>
				</section>

				<section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
					{salas.map((sala) => {
						const Icono = sala.icono;

						return (
							<Card
								key={sala.nombre}
								className="h-full overflow-hidden border-none shadow-[0_16px_40px_rgba(24,33,48,0.10)] ring-1 ring-[#182130]/10 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(24,33,48,0.16)]"
							>
								<button
									type="button"
									onClick={() => {
										if (sala.nombre === "Centro de producción audiovisual") {
											navigate("/centro");
											requestAnimationFrame(() => {
												window.scrollTo({ top: 0, behavior: "auto" });
											});
											return;
										}
										setSalaSeleccionada(sala);
										setSlideIndex(0);
									}}
									className="flex h-full w-full flex-col text-left"
									aria-label={
										sala.nombre === "Centro de producción audiovisual"
											? `Ir a la sección Centro desde ${sala.nombre}`
											: `Ver galería de ${sala.nombre}`
									}
								>
									<div className="h-1.5 w-full" style={{ backgroundColor: sala.color }} />
									<CardHeader className="pt-5 pb-3">
										<div className="flex items-start justify-between gap-3">
											<div>
												<CardTitle className="text-xl text-[#182130]">{sala.nombre}</CardTitle>
												<p className="mt-1 text-sm font-medium" style={{ color: sala.color }}>
													{sala.subtitulo}
												</p>
											</div>

											<div
												className="flex h-10 w-10 items-center justify-center rounded-xl"
												style={{ backgroundColor: `${sala.color}1A`, color: sala.color }}
											>
												<Icono className="h-5 w-5" />
											</div>
										</div>
									</CardHeader>

									<CardContent className="flex flex-1 flex-col space-y-4">
										<p className="text-sm leading-relaxed text-slate-700">{sala.descripcion}</p>

										<div className="flex flex-wrap gap-2">
											{sala.espacios.map((item) => (
												<Badge
													key={`${sala.nombre}-${item}`}
													variant="secondary"
													className="border border-[#0D4B56]/15 bg-white text-[#0D4B56]"
												>
													{item}
												</Badge>
											))}
										</div>

										<div className="mt-auto inline-flex items-center gap-2 rounded-full bg-[#182130] px-3 py-1.5 text-xs font-semibold text-white">
											<MousePointerClick className="h-3.5 w-3.5" />
											{sala.nombre === "Centro de producción audiovisual"
												? "Haz click para ir al Centro"
												: "Haz click para ver galería"}
										</div>
									</CardContent>
								</button>
							</Card>
						);
					})}
				</section>
			</div>

			{salaSeleccionada && slideActual && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6"
					onClick={() => setSalaSeleccionada(null)}
					role="dialog"
					aria-modal="true"
					aria-label={`Galería de ${salaSeleccionada.nombre}`}
				>
					<div
						onClick={(event) => event.stopPropagation()}
						className="w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-2xl"
					>
						<div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
							<div>
								<p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0D4B56]">Galería de espacios</p>
								<h3 className="text-xl font-bold text-[#182130]">{salaSeleccionada.nombre}</h3>
							</div>
							<button
								type="button"
								onClick={() => setSalaSeleccionada(null)}
								className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100"
								aria-label="Cerrar galería"
							>
								<X className="h-5 w-5" />
							</button>
						</div>

						<div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
							<div className="relative min-h-[320px] bg-[linear-gradient(135deg,#182130_0%,#0D4B56_45%,#11B2AA_100%)] p-6 md:min-h-[480px] md:p-8">
								<div
									className="absolute inset-0 opacity-10"
									style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "24px 24px" }}
								/>
								<div className="relative flex h-full flex-col justify-between rounded-[1.75rem] border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
									<div>
										<p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#FFDE07]">
											{slideIndex + 1} / {salaSeleccionada.galeria.length}
										</p>
										<h4 className="mt-4 text-3xl font-black leading-tight text-white md:text-4xl">{slideActual.titulo}</h4>
										<p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 md:text-base">
											{slideActual.descripcion}
										</p>
									</div>

									<div className="flex flex-wrap gap-2">
										{salaSeleccionada.espacios.map((item) => (
											<span
												key={`${salaSeleccionada.nombre}-${slideActual.titulo}-${item}`}
												className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90"
											>
												{item}
											</span>
										))}
									</div>
								</div>

								{salaSeleccionada.galeria.length > 1 && (
									<>
										<button
											type="button"
											onClick={goPrev}
											className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/45 p-2 text-white transition-colors hover:bg-black/60"
											aria-label="Foto anterior"
										>
											<ChevronLeft className="h-5 w-5" />
										</button>
										<button
											type="button"
											onClick={goNext}
											className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/45 p-2 text-white transition-colors hover:bg-black/60"
											aria-label="Siguiente foto"
										>
											<ChevronRight className="h-5 w-5" />
										</button>
									</>
								)}
							</div>

							<div className="flex flex-col justify-between bg-[#F8FBFB] p-6">
								<div>
									<p className="text-sm font-semibold text-[#0D4B56]">{salaSeleccionada.subtitulo}</p>
									<p className="mt-3 text-sm leading-relaxed text-slate-700">{salaSeleccionada.descripcion}</p>
								</div>

								<div className="mt-6 flex flex-wrap gap-2 lg:mt-0">
									{salaSeleccionada.galeria.map((slide, index) => (
										<button
											key={`${salaSeleccionada.nombre}-${slide.titulo}`}
											type="button"
											onClick={() => setSlideIndex(index)}
											className={`rounded-2xl border px-4 py-3 text-left transition-all ${
												slideIndex === index
													? "border-[#0D4B56] bg-white text-[#182130] shadow-sm"
													: "border-slate-200 bg-white/80 text-slate-600 hover:border-[#11B2AA]"
											}`}
										>
											<p className="text-sm font-semibold">{slide.titulo}</p>
										</button>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
