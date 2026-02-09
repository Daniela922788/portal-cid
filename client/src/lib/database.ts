/**
 * BASE DE DATOS SIMULADA - CID Portal
 * Esta es una estructura de datos en memoria para el prototipo.
 * En producción, se reemplazaría con llamadas a una API o BD real.
 */

export interface Curso {
  id_curso: string;
  nombre_curso: string;
  descripcion_corta: string;
  descripcion_larga: string;
  fechas: string[];
  horarios: string[];
  lugar: string;
  cupos: number;
  cupos_disponibles: number;
  estado_curso: "activo" | "cerrado" | "planeacion";
  categoria: string;
  id_gestor_responsable: string;
  id_master_teacher_responsable: string;
  imagen_ecard: string;
  enlace_detalle: string;
  publico_objetivo: string;
  contacto_whatsapp?: string;
}

export interface Gestor {
  id_persona: string;
  nombre_completo: string;
  rol: "admin" | "gestor" | "master_teacher";
  correo: string;
  telefono: string;
  institucion: string;
  notas: string;
}

export interface Inscripcion {
  id_inscripcion: string;
  id_curso: string;
  fecha_inscripcion: string;
  estado_inscripcion: "Nuevo" | "Revisado" | "Aprobado" | "Rechazado";
  id_gestor_asignado?: string;
  notas_seguimiento: string;
  // Datos del participante
  nombres_participante: string;
  apellidos_participante: string;
  documento_participante: string;
  fecha_nacimiento: string;
  edad: number;
  institucion_educativa: string;
  grado_escolar: string;
  genero: string;
  condicion_especial: string;
  grupo_etnico: string;
  // Datos del acudiente
  nombre_acudiente: string;
  tipo_documento_acudiente: string;
  numero_documento_acudiente: string;
  correo_acudiente: string;
  telefono_acudiente: string;
  // Residencia
  municipio: string;
  barrio_zona: string;
  // Horario seleccionado
  horario_seleccionado: string;
}

export interface Evento {
  id_evento: string;
  titulo: string;
  subtitulo?: string;
  descripcion_general: string;
  vivencias: string;
  fecha_inicio: string;
  fecha_fin: string;
  lugar: string;
  imagen_destacada: string;
  galeria_fotos: string[];
  videos: { titulo: string; url: string }[];
  testimonios: { nombre: string; rol: string; institucion: string; texto: string }[];
  agenda: { hora: string; actividad: string; responsable?: string }[];
  memorias_pdf?: string;
}

// ============================================================================
// DATOS DE EJEMPLO - CURSOS NAVIDEÑOS
// ============================================================================

export const cursosData: Curso[] = [
  {
    id_curso: "curso-nav-001",
    nombre_curso: "Navidad en Pixel",
    descripcion_corta: "Taller sobre creación digital y narrativa visual",
    descripcion_larga: "Convierte tu historia navideña en una aventura digital. Aprende, crea y comparte una versión creativa de la navidad hecha por ti.",
    fechas: ["2025-11-24", "2025-11-25", "2025-11-26", "2025-11-27", "2025-11-28", "2025-11-29", "2025-11-30", "2025-12-01", "2025-12-02"],
    horarios: ["2:00 PM - 4:00 PM"],
    lugar: "Parque Biblioteca Débora Arango - Sala 1",
    cupos: 30,
    cupos_disponibles: 18,
    estado_curso: "activo",
    categoria: "Navidad",
    id_gestor_responsable: "gestor-001",
    id_master_teacher_responsable: "teacher-001",
    imagen_ecard: "/cursos/navidad-pixel.jpg",
    enlace_detalle: "/curso/curso-nav-001",
    publico_objetivo: "Jóvenes 11-17 años",
    contacto_whatsapp: "301 2577662"
  },
  {
    id_curso: "curso-nav-002",
    nombre_curso: "Aventura en Código",
    descripcion_corta: "Aprende a programar videojuegos navideños",
    descripcion_larga: "Diseña y programa tu propio videojuego navideño. Desde la idea hasta la ejecución, descubre el mundo de la programación de forma divertida.",
    fechas: ["2025-11-24", "2025-11-25", "2025-11-26", "2025-11-27", "2025-11-28", "2025-11-29", "2025-11-30", "2025-12-01", "2025-12-02"],
    horarios: ["10:00 AM - 12:00 PM"],
    lugar: "Parque Biblioteca Débora Arango - Sala 3",
    cupos: 25,
    cupos_disponibles: 12,
    estado_curso: "activo",
    categoria: "Navidad",
    id_gestor_responsable: "gestor-001",
    id_master_teacher_responsable: "teacher-001",
    imagen_ecard: "/cursos/aventura-codigo.jpg",
    enlace_detalle: "/curso/curso-nav-002",
    publico_objetivo: "Jóvenes 12-17 años",
    contacto_whatsapp: "301 2577662"
  },
  {
    id_curso: "curso-nav-003",
    nombre_curso: "Robótica Navideña",
    descripcion_corta: "Construye y programa robots para la navidad",
    descripcion_larga: "Crea robots navideños que se mueven, brillan y hacen magia. Aprende robótica de forma práctica y creativa.",
    fechas: ["2025-11-24", "2025-11-25", "2025-11-26", "2025-11-27", "2025-11-28", "2025-11-29", "2025-11-30", "2025-12-01", "2025-12-02"],
    horarios: ["10:00 AM - 12:00 PM"],
    lugar: "Parque Biblioteca Débora Arango - Laboratorio",
    cupos: 20,
    cupos_disponibles: 15,
    estado_curso: "activo",
    categoria: "Navidad",
    id_gestor_responsable: "gestor-001",
    id_master_teacher_responsable: "teacher-001",
    imagen_ecard: "/cursos/robotica-navidena.jpg",
    enlace_detalle: "/curso/curso-nav-003",
    publico_objetivo: "Niños 8-14 años",
    contacto_whatsapp: "301 2577662"
  },
  {
    id_curso: "curso-nav-004",
    nombre_curso: "Realidad Aumentada Navideña",
    descripcion_corta: "Crea experiencias navideñas en realidad aumentada",
    descripcion_larga: "Diseña filtros y experiencias en realidad aumentada. Haz que la navidad sea aún más mágica con tecnología.",
    fechas: ["2025-12-04", "2025-12-05"],
    horarios: ["10:00 AM - 12:00 PM", "2:00 PM - 4:00 PM"],
    lugar: "Parque Biblioteca Débora Arango - Sala 1",
    cupos: 28,
    cupos_disponibles: 20,
    estado_curso: "activo",
    categoria: "Navidad",
    id_gestor_responsable: "gestor-001",
    id_master_teacher_responsable: "teacher-001",
    imagen_ecard: "/cursos/realidad-aumentada.jpg",
    enlace_detalle: "/curso/curso-nav-004",
    publico_objetivo: "Jóvenes 13-17 años",
    contacto_whatsapp: "301 2577662"
  },
  {
    id_curso: "curso-nav-005",
    nombre_curso: "Podcast Navideño",
    descripcion_corta: "Crea tu propio podcast con historias navideñas",
    descripcion_larga: "Graba, edita y comparte tu podcast navideño. Aprende a contar historias de forma profesional.",
    fechas: ["2025-12-04", "2025-12-05"],
    horarios: ["10:00 AM - 12:00 PM", "2:00 PM - 4:00 PM"],
    lugar: "Parque Biblioteca Débora Arango - Estudio de Audio",
    cupos: 18,
    cupos_disponibles: 10,
    estado_curso: "activo",
    categoria: "Navidad",
    id_gestor_responsable: "gestor-001",
    id_master_teacher_responsable: "teacher-001",
    imagen_ecard: "/cursos/podcast-navideno.jpg",
    enlace_detalle: "/curso/curso-nav-005",
    publico_objetivo: "Jóvenes 10-17 años",
    contacto_whatsapp: "301 2577662"
  },
  {
    id_curso: "curso-nav-006",
    nombre_curso: "Animación Stop Motion",
    descripcion_corta: "Crea películas navideñas con técnica stop motion",
    descripcion_larga: "Aprende a crear películas animadas cuadro a cuadro. Tus personajes navideños cobrarán vida.",
    fechas: ["2025-12-04", "2025-12-05"],
    horarios: ["10:00 AM - 12:00 PM", "2:00 PM - 4:00 PM"],
    lugar: "Parque Biblioteca Débora Arango - Sala 2",
    cupos: 22,
    cupos_disponibles: 14,
    estado_curso: "activo",
    categoria: "Navidad",
    id_gestor_responsable: "gestor-001",
    id_master_teacher_responsable: "teacher-001",
    imagen_ecard: "/cursos/stop-motion.jpg",
    enlace_detalle: "/curso/curso-nav-006",
    publico_objetivo: "Niños 7-11 años",
    contacto_whatsapp: "301 2577662"
  },
  {
    id_curso: "curso-nav-007",
    nombre_curso: "Tarjeta Navideña",
    descripcion_corta: "Diseña tu propia tarjeta familiar en canva",
    descripcion_larga: "En este taller crearás una tarjeta navideña única, hecha por ti y para tu familia. Aprenderás a combinar diseño, color y un toque de creatividad.",
    fechas: ["2025-12-04", "2025-12-05"],
    horarios: ["10:00 AM - 12:00 PM", "2:00 PM - 4:00 PM"],
    lugar: "Parque Biblioteca Débora Arango - Sala 2",
    cupos: 25,
    cupos_disponibles: 7,
    estado_curso: "activo",
    categoria: "Navidad",
    id_gestor_responsable: "gestor-001",
    id_master_teacher_responsable: "teacher-001",
    imagen_ecard: "/cursos/tarjeta-navidena.jpg",
    enlace_detalle: "/curso/curso-nav-007",
    publico_objetivo: "Jóvenes 11-17 años",
    contacto_whatsapp: "301 2577662"
  },
  {
    id_curso: "curso-nav-008",
    nombre_curso: "Montaje Fotográfico",
    descripcion_corta: "Hackea la Navidad usando tu celular",
    descripcion_larga: "Este taller es un hack donde aprenderás cómo crear imágenes surrealistas y de apariencia profesional usando solo la herramienta que ya tienes en el bolsillo: tu celular.",
    fechas: ["2025-12-04", "2025-12-05"],
    horarios: ["10:00 AM - 12:00 PM", "2:00 PM - 4:00 PM"],
    lugar: "Parque Biblioteca Débora Arango - Aula Audiovisual",
    cupos: 20,
    cupos_disponibles: 8,
    estado_curso: "activo",
    categoria: "Navidad",
    id_gestor_responsable: "gestor-001",
    id_master_teacher_responsable: "teacher-001",
    imagen_ecard: "/cursos/montaje-fotografico.jpg",
    enlace_detalle: "/curso/curso-nav-008",
    publico_objetivo: "Jóvenes 14-17 años",
    contacto_whatsapp: "301 2577662"
  },
  {
    id_curso: "curso-nav-009",
    nombre_curso: "Laboratorio Secreto de Navidad",
    descripcion_corta: "Creación e invención con materiales y animación",
    descripcion_larga: "Imagina, diseña y crea tu propio invento navideño. Un espacio para experimentar, construir y soñar con la magia de tus ideas.",
    fechas: ["2025-11-24", "2025-11-25", "2025-11-26", "2025-11-27", "2025-11-28", "2025-11-29", "2025-11-30", "2025-12-01", "2025-12-02"],
    horarios: ["2:00 PM - 4:00 PM"],
    lugar: "Parque Biblioteca Débora Arango - Sala 2",
    cupos: 24,
    cupos_disponibles: 7,
    estado_curso: "activo",
    categoria: "Navidad",
    id_gestor_responsable: "gestor-001",
    id_master_teacher_responsable: "teacher-001",
    imagen_ecard: "/cursos/laboratorio-secreto.jpg",
    enlace_detalle: "/curso/curso-nav-009",
    publico_objetivo: "Niños 7-11 años",
    contacto_whatsapp: "301 2577662"
  }
];

// ============================================================================
// DATOS DE EJEMPLO - GESTORES
// ============================================================================

export const gestoresData: Gestor[] = [
  {
    id_persona: "admin-001",
    nombre_completo: "Carlos López Rodríguez",
    rol: "admin",
    correo: "admin@cid.com",
    telefono: "301 2577662",
    institucion: "CID Envigado",
    notas: "Administrador del Portal"
  },
  {
    id_persona: "gestor-001",
    nombre_completo: "María García López",
    rol: "gestor",
    correo: "gestor@cid.com",
    telefono: "301 2577662",
    institucion: "CID Envigado",
    notas: "Responsable de gestión de cursos navideños"
  },
  {
    id_persona: "teacher-001",
    nombre_completo: "Juan Pérez Martínez",
    rol: "master_teacher",
    correo: "master@cid.com",
    telefono: "301 2577662",
    institucion: "CID Envigado",
    notas: "Master Teacher - Formación Digital"
  }
];

// ============================================================================
// DATOS DE EJEMPLO - INSCRIPCIONES
// ============================================================================

export const inscripcionesData: Inscripcion[] = [
  {
    id_inscripcion: "insc-001",
    id_curso: "curso-nav-001",
    fecha_inscripcion: "2025-11-15",
    estado_inscripcion: "Aprobado",
    id_gestor_asignado: "gestor-001",
    notas_seguimiento: "Inscripción confirmada",
    nombres_participante: "Juan",
    apellidos_participante: "Pérez García",
    documento_participante: "1234567890",
    fecha_nacimiento: "2015-05-20",
    edad: 10,
    institucion_educativa: "IE Envigado",
    grado_escolar: "5to",
    genero: "M",
    condicion_especial: "Ninguna",
    grupo_etnico: "Mestizo",
    nombre_acudiente: "María García",
    tipo_documento_acudiente: "CC",
    numero_documento_acudiente: "9876543210",
    correo_acudiente: "maria@email.com",
    telefono_acudiente: "300 1234567",
    municipio: "Envigado",
    barrio_zona: "Centro",
    horario_seleccionado: "2:00 PM - 4:00 PM"
  }
];

// ============================================================================
// FUNCIONES CRUD SIMULADAS
// ============================================================================

// Funciones de autenticación
export function authenticate(correo: string, contraseña: string): Gestor | null {
  // Credenciales hardcodeadas para demo
  const usuarios = [
    { correo: "admin@cid.com", contraseña: "admin123", rol: "admin" },
    { correo: "gestor@cid.com", contraseña: "gestor123", rol: "gestor" },
    { correo: "master@cid.com", contraseña: "master123", rol: "master_teacher" }
  ];
  
  const usuario = usuarios.find(u => u.correo === correo && u.contraseña === contraseña);
  if (usuario) {
    // Retornar el gestor que coincida con el correo
    const gestor = gestoresData.find(g => g.correo === correo);
    if (gestor) {
      return gestor;
    }
  }
  return null;
}

export function saveSession(usuario: Gestor): void {
  localStorage.setItem("sesion_usuario", JSON.stringify(usuario));
}

export function getSession(): Gestor | null {
  const sesion = localStorage.getItem("sesion_usuario");
  return sesion ? JSON.parse(sesion) : null;
}

export function clearSession(): void {
  localStorage.removeItem("sesion_usuario");
}

export function getCursos(): Curso[] {
  return cursosData;
}

export function getCursoById(id: string): Curso | undefined {
  return cursosData.find(c => c.id_curso === id);
}

export function getGestores(): Gestor[] {
  return gestoresData;
}

export function getGestorById(id: string): Gestor | undefined {
  return gestoresData.find(g => g.id_persona === id);
}

export function getInscripciones(): Inscripcion[] {
  return inscripcionesData;
}

export function getInscripcionesByCurso(idCurso: string): Inscripcion[] {
  return inscripcionesData.filter(i => i.id_curso === idCurso);
}

export function addInscripcion(inscripcion: Inscripcion): void {
  inscripcionesData.push(inscripcion);
}

export function updateInscripcion(id: string, updates: Partial<Inscripcion>): void {
  const index = inscripcionesData.findIndex(i => i.id_inscripcion === id);
  if (index !== -1) {
    inscripcionesData[index] = { ...inscripcionesData[index], ...updates };
  }
}
