import { useState, useRef } from "react";
import { useLocation } from "wouter";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Camera, ChevronLeft, ChevronRight, GraduationCap, LayoutGrid, Monitor, MousePointerClick, Palette, Sparkles, X } from "lucide-react";

type Sala = {
	nombre: string;
	subtitulo: string;
	descripcion: string;
	capacidadMaxima: number;
	espacios: string[];
	color: string;
	icono: typeof GraduationCap;
	galeria: {
		titulo: string;
		descripcion: string;
		imagen: string;
	}[];
};

const salas: Sala[] = [
	{
		nombre: "Sala 1",
		subtitulo: "Sala de computadores",
		descripcion:
			"Sala de computadores equipada para procesos formativos, talleres prácticos y actividades de aprendizaje digital.",
		capacidadMaxima: 32,
		espacios: [
			"32 computadores",
			"Podio con computador, micrófono y conexiones HDMI y de red",
			"Televisor interactivo",
			"Tablero",
			"Aire acondicionado",
			"Wifi",
		],
		color: "#0D4B56",
		icono: GraduationCap,
		galeria: [
			{ titulo: "Sala 1", descripcion: "Vista general de la sala.", imagen: "/Salas/Sala 1/1.webp" },
			{ titulo: "Sala 1", descripcion: "Detalle del espacio y equipamiento.", imagen: "/Salas/Sala 1/2.webp" },
			{ titulo: "Sala 1", descripcion: "Distribución para procesos formativos.", imagen: "/Salas/Sala 1/3.webp" },
			{ titulo: "Sala 1", descripcion: "Ambiente de trabajo y aprendizaje digital.", imagen: "/Salas/Sala 1/4.webp" },
		],
	},
	{
		nombre: "Sala 2",
		subtitulo: "Capacitación tecnológica",
		descripcion:
			"Sala de computadores ideal para capacitaciones, cursos y formación tecnológica.",
		capacidadMaxima: 32,
		espacios: [
			"32 computadores",
			"Podio con computador, micrófono y conexiones HDMI y de red",
			"Televisor interactivo",
			"Aire acondicionado",
			"Wifi",
		],
		color: "#2D3586",
		icono: LayoutGrid,
		galeria: [
			{ titulo: "Sala 2", descripcion: "Vista general de la sala.", imagen: "/Salas/Sala 2/1.webp" },
			{ titulo: "Sala 2", descripcion: "Equipamiento para capacitaciones y cursos.", imagen: "/Salas/Sala 2/2.webp" },
			{ titulo: "Sala 2", descripcion: "Espacio para formación tecnológica.", imagen: "/Salas/Sala 2/3.webp" },
		],
	},
	{
		nombre: "Sala 3",
		subtitulo: "Trabajo colaborativo",
		descripcion:
			"Sala de computadores con mesa de reuniones, perfecta para formaciones, trabajo colaborativo y encuentros de equipo.",
		capacidadMaxima: 20,
		espacios: [
			"20 computadores",
			"Mesa de reuniones con capacidad para 11 personas (11 sillas)",
			"Podio con computador, micrófono y conexiones HDMI y de red",
			"Televisor y videobeam",
			"Aire acondicionado",
			"Wifi",
		],
		color: "#023A34",
		icono: Monitor,
		galeria: [
			{ titulo: "Sala 3", descripcion: "Vista general de la sala.", imagen: "/Salas/Sala 3/1.webp" },
			{ titulo: "Sala 3", descripcion: "Zona de computadores y colaboración.", imagen: "/Salas/Sala 3/2.webp" },
			{ titulo: "Sala 3", descripcion: "Mesa de reuniones y área de trabajo.", imagen: "/Salas/Sala 3/3.webp" },
			{ titulo: "Sala 3", descripcion: "Ambiente para encuentros de equipo.", imagen: "/Salas/Sala 3/4.webp" },
			{ titulo: "Sala 3", descripcion: "Detalle del espacio formativo.", imagen: "/Salas/Sala 3/5.webp" },
		],
	},
	{
		nombre: "Aula Multimedia",
		subtitulo: "Presentaciones y sesiones",
		descripcion:
			"Espacio flexible para actividades grupales, presentaciones y sesiones de aprendizaje.",
		capacidadMaxima: 16,
		espacios: ["16 sillas", "8 mesas pequeñas", "Televisor", "Aire acondicionado", "Wifi"],
		color: "#EC6910",
		icono: Palette,
		galeria: [
			{ titulo: "Aula Multimedia", descripcion: "Vista del espacio multimedia.", imagen: "/Salas/Aula Multimedia/1.webp" },
		],
	},
	{
		nombre: "Aula de Experimentación Audiovisual",
		subtitulo: "Centro de producción",
		descripcion:
			"Espacio especializado para la creación de contenido audiovisual y procesos de formación en medios digitales.",
		capacidadMaxima: 15,
		espacios: [
			"Grabadoras de sonido profesionales de 4 canales",
			"2 cámaras de video Full HD",
			"Parrilla de luces de televisión",
			"Estudio insonorizado",
			"Fondo croma azul",
			"Trípodes para video y fotografía",
		],
		color: "#182130",
		icono: Camera,
		galeria: [
			{ titulo: "Centro de producción", descripcion: "Área de producción audiovisual.", imagen: "/Salas/Aula de Experimentación Audiovisual/1.webp" },
			{ titulo: "Centro de producción", descripcion: "Detalle de equipamiento técnico.", imagen: "/Salas/Aula de Experimentación Audiovisual/2.webp" },
		],
	},
	{
		nombre: "Local 4",
		subtitulo: "Reuniones y trabajo",
		descripcion:
			"Espacio para reuniones, encuentros de trabajo y sesiones colaborativas.",
		capacidadMaxima: 9,
		espacios: ["9 sillas", "Televisor", "Aire acondicionado", "Wifi"],
		color: "#11B2AA",
		icono: Monitor,
		galeria: [
			{ titulo: "Local 4", descripcion: "Espacio para reuniones de trabajo.", imagen: "/Salas/Local 4/2.webp" },
			{ titulo: "Local 4", descripcion: "Vista general del local.", imagen: "/Salas/Local 4/1.webp" },
			{ titulo: "Local 4", descripcion: "Ambiente colaborativo.", imagen: "/Salas/Local 4/3.webp" },
		],
	},
];

export default function Salas() {
	const [, navigate] = useLocation();
	const formRef = useRef<HTMLFormElement>(null);
	const [salaSeleccionada, setSalaSeleccionada] = useState<Sala | null>(null);
	const [slideIndex, setSlideIndex] = useState(0);
	const [reservaAbierta, setReservaAbierta] = useState(false);
	const [enviandoReserva, setEnviandoReserva] = useState(false);
	const [reservaValidationError, setReservaValidationError] = useState("");
	const [showReservaValidationFeedback, setShowReservaValidationFeedback] = useState(false);

	const slideActual = salaSeleccionada ? salaSeleccionada.galeria[slideIndex] : null;

	const goPrev = () => {
		if (!salaSeleccionada) return;
		setSlideIndex((prev) => (prev - 1 + salaSeleccionada.galeria.length) % salaSeleccionada.galeria.length);
	};

	const goNext = () => {
		if (!salaSeleccionada) return;
		setSlideIndex((prev) => (prev + 1) % salaSeleccionada.galeria.length);
	};

	const abrirReserva = () => {
		if (!salaSeleccionada) return;
		setReservaValidationError("");
		setShowReservaValidationFeedback(false);
		setReservaAbierta(true);
	};

	const cerrarReserva = () => {
		setReservaValidationError("");
		setShowReservaValidationFeedback(false);
		setReservaAbierta(false);
	};

	const handleReservaSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setShowReservaValidationFeedback(true);

		if (!salaSeleccionada) return;

		if (!event.currentTarget.checkValidity()) {
			setReservaValidationError("Faltan campos obligatorios. Revisa los campos resaltados en rojo.");
			event.currentTarget
				.querySelector<HTMLElement>("input:invalid, select:invalid, textarea:invalid")
				?.focus();
			return;
		}

		setReservaValidationError("");

		const formData = new FormData(event.currentTarget);
		const getValue = (key: string) => String(formData.get(key) ?? "").trim();

		const payload = {
			entidadSolicitante: getValue("entidadSolicitante"),
			tipoDocumento: getValue("tipoDocumento"),
			numeroDocumento: getValue("numeroDocumento"),
			solicitanteNombre: getValue("solicitanteNombre"),
			celular: getValue("celular"),
			correoElectronico: getValue("correoElectronico"),
			nombreEvento: getValue("nombreEvento"),
			tipoEvento: getValue("tipoEvento"),
			objetivoEvento: getValue("objetivoEvento"),
			descripcionEvento: getValue("objetivoEvento"),
			fechaEvento: getValue("fechaEvento"),
			horaInicio: getValue("horaInicio"),
			horaFin: getValue("horaFin"),
			numeroAsistentes: getValue("numeroAsistentes"),
			observaciones: getValue("observaciones"),
			espacioSolicitado: salaSeleccionada.nombre,
		};

		try {
			setEnviandoReserva(true);
			const response = await fetch("/api/salas/reservas", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				const data = (await response.json().catch(() => ({}))) as { message?: string };
				throw new Error(data.message || "No se pudo enviar la solicitud.");
			}

			setReservaValidationError("");
			setShowReservaValidationFeedback(false);
			setReservaAbierta(false);
			window.alert("Solicitud enviada correctamente. Pronto recibirás respuesta por correo.");
			if (formRef.current) {
				formRef.current.reset();
			}
		} catch (error) {
			const message = error instanceof Error ? error.message : "No se pudo enviar la solicitud.";
			window.alert(message);
		} finally {
			setEnviandoReserva(false);
		}
	};

	return (
		<div className="min-h-screen bg-white">
			<section className="relative overflow-hidden bg-[linear-gradient(122deg,#182130_0%,#0D4B56_48%,#11B2AA_100%)] text-white">
				<div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#FFDE07]/20 blur-3xl" />
				<div className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-[#EC6910]/20 blur-3xl" />

				<div className="container relative z-10 flex min-h-[460px] flex-col justify-end pb-10 pt-24 md:pt-0">
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
					className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 px-4 py-6 sm:items-center"
					onClick={() => {
						setSalaSeleccionada(null);
						setReservaAbierta(false);
					}}
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
							<div className="relative min-h-[320px] bg-slate-900 md:min-h-[480px]">
								<img
									src={slideActual.imagen}
									alt={`${salaSeleccionada.nombre} - ${slideActual.titulo}`}
									className="h-full w-full object-cover"
								/>
								<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent p-5 text-white">
									<p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#FFDE07]">
										{slideIndex + 1} / {salaSeleccionada.galeria.length}
									</p>
									<h4 className="mt-2 text-xl font-bold leading-tight md:text-2xl">{slideActual.titulo}</h4>
									<p className="mt-2 text-sm leading-relaxed text-white/90">{slideActual.descripcion}</p>
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
									<div className="mt-4 rounded-2xl border border-[#0D4B56]/15 bg-white p-4">
										<p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0D4B56]">Equipamiento</p>
										<ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-slate-700">
											{salaSeleccionada.espacios.map((item) => (
												<li key={`${salaSeleccionada.nombre}-equipamiento-${item}`}>{item}</li>
											))}
										</ul>
									</div>
									<p className="mt-3 inline-flex rounded-full border border-[#0D4B56]/20 bg-white px-3 py-1 text-xs font-semibold text-[#0D4B56]">
										Máximo hasta {salaSeleccionada.capacidadMaxima} personas por sala
									</p>
								</div>

								<div className="mt-6 lg:mt-auto">
									<button
										type="button"
										onClick={abrirReserva}
										className="inline-flex w-full items-center justify-center rounded-full bg-[#0D4B56] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0A3A42]"
									>
										Reservar este espacio
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			{reservaAbierta && salaSeleccionada && (
				<div
					className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 px-4 py-6"
					role="dialog"
					aria-modal="true"
					aria-label={`Formulario de reserva para ${salaSeleccionada.nombre}`}
				>
					<div
						onClick={(event) => event.stopPropagation()}
						className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl md:p-8"
					>
						<div className="mb-4 flex items-start justify-between gap-4">
							<div>
								<p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0D4B56]">Solicitud de préstamo</p>
								<h3 className="mt-1 text-2xl font-bold text-[#182130]">SOLICITUD PARA PRÉSTAMO DE ESPACIOS</h3>
								<p className="mt-2 text-sm text-slate-600">
									Si deseas hacer uso de alguno de los espacios lee atentamente la siguiente información y diligencia el formulario.
								</p>
							</div>
							<button
								type="button"
								onClick={cerrarReserva}
								className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100"
								aria-label="Cerrar formulario de reserva"
							>
								<X className="h-5 w-5" />
							</button>
						</div>

						<div className="mb-6 rounded-2xl border border-[#0D4B56]/15 bg-[#F8FBFB] p-5">
							<h4 className="text-base font-bold text-[#182130]">Información importante</h4>
							<ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
								<li>
									El uso de los espacios debe ser exclusivamente para actividades relacionadas con la educación, 
									formación, innovación o producción de conocimiento.
								</li>
								<li>
									El Centro de Innovación y Desarrollo dará respuesta a la solicitud en un máximo de 5 días hábiles,
									mediante correo electrónico desde la cuenta correo@envigado.edu.co, aceptando o rechazando la petición.
								</li>
								<li>
									En caso de cancelarse el evento, favor comunicarlo al Centro de Innovación y Desarrollo mínimo 24 horas
									antes de la fecha y hora aprobadas.
								</li>
								<li>
									La reserva de los espacios a través de este formulario se cerrará los días viernes de cada semana y se abrirá
									los lunes nuevamente para retomar la respuesta de las solicitudes y en orden cronológico en que estas llegan.
								</li>
								<li>
									Tenga en cuenta que solo se realiza el préstamo de los espacios, no incluye otros servicios
									(parqueadero, refrigerio, estación de café, almuerzo, adaptadores, extensiones, usb, cargadores, etc.) u operación de eventos.
								</li>
								<li>
									Los espacios cuentan con cámaras de seguridad las cuales son monitoreadas por el personal del CID, sin embargo, 
									el CID no se hace responsable por objetos personales o equipos que sean llevados a las salas.
								</li>
								<li>
									Tenga en cuenta que no es permitido el ingreso de alimentos o bebidas a las salas, 
									ni el consumo de cigarrillos o sustancias psicoactivas al interior de las instalaciones del CID.
								</li>
								<li>
									El horario de uso de los espacios es de lunes a viernes entre las 8:00 a.m. a 12:00 p.m. y de la 1:00 p.m. a 5:00 p.m.
								</li>
								<li>
									Solamente cuando reciba el correo de aprobación a su solicitud desde la cuenta correo@envigado.edu.co,
									usted tendrá su reserva confirmada.
								</li>
							</ul>
						</div>

						<form
							ref={formRef}
							onSubmit={handleReservaSubmit}
							noValidate
							onInputCapture={() => {
								if (reservaValidationError) setReservaValidationError("");
							}}
							className={`space-y-4 ${
								showReservaValidationFeedback
									? "[&_input:invalid]:border-red-500 [&_input:invalid]:ring-1 [&_input:invalid]:ring-red-200 [&_select:invalid]:border-red-500 [&_select:invalid]:ring-1 [&_select:invalid]:ring-red-200 [&_textarea:invalid]:border-red-500 [&_textarea:invalid]:ring-1 [&_textarea:invalid]:ring-red-200"
									: ""
							}`}
						>
							{reservaValidationError && (
								<p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
									{reservaValidationError}
								</p>
							)}
							<div className="grid gap-4 md:grid-cols-2">
								<label className="text-sm font-medium text-slate-700 flex flex-col">
									<span>Nombres y apellidos del solicitante <span className="text-red-600">*</span></span>
									<input
										type="text"
										name="entidadSolicitante"
										required
										className="mt-1 h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none transition focus:border-[#0D4B56]"
									/>
								</label>
								<label className="text-sm font-medium text-slate-700 flex flex-col">
									<span>Tipo de documento <span className="text-red-600">*</span></span>
									<select
										name="tipoDocumento"
										required
										defaultValue=""
										className="mt-1 h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-[#0D4B56]"
									>
										<option value="" disabled>
											Seleccione una opción
										</option>
										<option value="nit">Nit</option>
										<option value="cc">Cédula de ciudadanía</option>
										<option value="ce">Cédula de extranjería</option>
									</select>
								</label>
								<label className="text-sm font-medium text-slate-700 flex flex-col">
									<span>Número de documento <span className="text-red-600">*</span></span>
									<input
										type="text"
										name="numeroDocumento"
										required
										className="mt-1 h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none transition focus:border-[#0D4B56]"
									/>
								</label>
								<label className="text-sm font-medium text-slate-700 flex flex-col">
									Nombre de la entidad que solicita la reserva
									<input
										type="text"
										name="solicitanteNombre"
										className="mt-1 h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none transition focus:border-[#0D4B56]"
									/>
								</label>
								<label className="text-sm font-medium text-slate-700 flex flex-col">
									<span>Número de celular <span className="text-red-600">*</span></span>
									<input
										type="tel"
										name="celular"
										required
										className="mt-1 h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none transition focus:border-[#0D4B56]"
									/>
								</label>
								<label className="text-sm font-medium text-slate-700 flex flex-col">
									<span>Correo electrónico <span className="text-red-600">*</span></span>
									<input
										type="email"
										name="correoElectronico"
										required
										className="mt-1 h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none transition focus:border-[#0D4B56]"
									/>
								</label>
								<label className="text-sm font-medium text-slate-700 flex flex-col">
									<span>Nombre del evento <span className="text-red-600">*</span></span>
									<input
										type="text"
										name="nombreEvento"
										required
										className="mt-1 h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none transition focus:border-[#0D4B56]"
									/>
								</label>
								<label className="text-sm font-medium text-slate-700 flex flex-col">
									<span>Tipo de evento <span className="text-red-600">*</span></span>
									<select
										name="tipoEvento"
										required
										defaultValue=""
										className="mt-1 h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-[#0D4B56]"
									>
										<option value="" disabled>
											Seleccione una opción
										</option>
										<option value="conferencias">Conferencias, charlas o conversatorios</option>
										<option value="reuniones">Reuniones de equipo</option>
										<option value="congreso">Congreso, seminario, foro o simposio</option>
										<option value="institucional">Actividad institucional</option>
										<option value="otras">Otras</option>
									</select>
								</label>
								<label className="text-sm font-medium text-slate-700 flex flex-col">
									<span>Fecha evento <span className="text-red-600">*</span></span>
									<input
										type="date"
										name="fechaEvento"
										required
										className="mt-1 h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none transition focus:border-[#0D4B56]"
									/>
								</label>
								<label className="text-sm font-medium text-slate-700 flex flex-col">
									<span>Hora de inicio del evento <span className="text-red-600">*</span></span>
									<input
										type="time"
										name="horaInicio"
										required
										className="mt-1 h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none transition focus:border-[#0D4B56]"
									/>
								</label>
								<label className="text-sm font-medium text-slate-700 flex flex-col">
									<span>Hora de finalización del evento <span className="text-red-600">*</span></span>
									<input
										type="time"
										name="horaFin"
										required
										className="mt-1 h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none transition focus:border-[#0D4B56]"
									/>
								</label>
								<label className="text-sm font-medium text-slate-700 flex flex-col">
									<span>Número de asistentes <span className="text-red-600">*</span></span>
									<input
										type="number"
										name="numeroAsistentes"
										min={1}
										required
										className="mt-1 h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none transition focus:border-[#0D4B56]"
									/>
								</label>
							</div>

							<label className="block text-sm font-medium text-slate-700">
								<span>Objetivo y descripción del evento<span className="text-red-600">*</span></span>
								<textarea
									name="objetivoEvento"
									required
									rows={6}
									className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-[#0D4B56]"
								/>
							</label>

							<label className="block text-sm font-medium text-slate-700">
								<span>Observaciones </span>
								<textarea
									name="observaciones"
									rows={3}
									className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-[#0D4B56]"
								/>
							</label>

							<label className="block text-sm font-medium text-slate-700">
								Espacio solicitado
								<input
									type="text"
									name="espacioSolicitado"
									value={salaSeleccionada.nombre}
									readOnly
									className="mt-1 h-10 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 text-sm text-slate-700"
								/>
							</label>

							<div className="flex justify-end gap-3 pt-2">
								<button
									type="button"
									onClick={cerrarReserva}
									className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
								>
									Cancelar
								</button>
								<button
									type="submit"
									disabled={enviandoReserva}
									className="rounded-full bg-[#0D4B56] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0A3A42]"
								>
									{enviandoReserva ? "Enviando..." : "Enviar solicitud"}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}
