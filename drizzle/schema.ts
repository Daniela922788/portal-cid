import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Tabla de Cursos
export const courses = mysqlTable("courses", {
  id: int("id").autoincrement().primaryKey(),
  titulo: varchar("titulo", { length: 255 }).notNull(),
  descripcion: text("descripcion"),
  imagen: varchar("imagen", { length: 500 }),
  fechaInicio: timestamp("fechaInicio"),
  fechaFin: timestamp("fechaFin"),
  horario: varchar("horario", { length: 100 }),
  lugar: varchar("lugar", { length: 255 }),
  cupos: int("cupos"),
  publicoObjetivo: varchar("publicoObjetivo", { length: 255 }),
  responsable: varchar("responsable", { length: 255 }),
  estado: mysqlEnum("estado", ["activo", "inactivo", "completado"]).default("activo"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Course = typeof courses.$inferSelect;
export type InsertCourse = typeof courses.$inferInsert;

// Tabla de Inscripciones
export const enrollments = mysqlTable("enrollments", {
  id: int("id").autoincrement().primaryKey(),
  courseId: int("courseId").notNull(),
  nombreParticipante: varchar("nombreParticipante", { length: 255 }).notNull(),
  apellidoParticipante: varchar("apellidoParticipante", { length: 255 }).notNull(),
  emailParticipante: varchar("emailParticipante", { length: 320 }).notNull(),
  telefonoParticipante: varchar("telefonoParticipante", { length: 20 }),
  edadParticipante: int("edadParticipante"),
  institucion: varchar("institucion", { length: 255 }),
  nombreAcudiente: varchar("nombreAcudiente", { length: 255 }),
  emailAcudiente: varchar("emailAcudiente", { length: 320 }),
  telefonoAcudiente: varchar("telefonoAcudiente", { length: 20 }),
  residencia: varchar("residencia", { length: 255 }),
  horarioPreferido: varchar("horarioPreferido", { length: 100 }),
  estado: mysqlEnum("estado", ["nuevo", "revisado", "aprobado", "rechazado"]).default("nuevo"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Enrollment = typeof enrollments.$inferSelect;
export type InsertEnrollment = typeof enrollments.$inferInsert;

// Tabla de Solicitudes PQRS
export const pqrsTable = mysqlTable("pqrs", {
  id: int("id").autoincrement().primaryKey(),
  tipo: mysqlEnum("tipo", ["peticion", "queja", "reclamo", "sugerencia", "felicitacion", "denuncia", "solicitud_info", "solicitud_datos", "agenda_cita"]).notNull(),
  nombre: varchar("nombre", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  telefono: varchar("telefono", { length: 20 }),
  asunto: varchar("asunto", { length: 255 }).notNull(),
  descripcion: text("descripcion").notNull(),
  estado: mysqlEnum("estado", ["nuevo", "en_proceso", "resuelto", "cerrado"]).default("nuevo"),
  respuesta: text("respuesta"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PQRS = typeof pqrsTable.$inferSelect;
export type InsertPQRS = typeof pqrsTable.$inferInsert;

// Tabla de Noticias
export const news = mysqlTable("news", {
  id: int("id").autoincrement().primaryKey(),
  titulo: varchar("titulo", { length: 255 }).notNull(),
  descripcion: text("descripcion"),
  contenido: text("contenido"),
  imagen: varchar("imagen", { length: 500 }),
  autor: varchar("autor", { length: 255 }),
  estado: mysqlEnum("estado", ["borrador", "publicado", "archivado"]).default("borrador"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type News = typeof news.$inferSelect;
export type InsertNews = typeof news.$inferInsert;

// Tabla de Eventos
export const events = mysqlTable("events", {
  id: int("id").autoincrement().primaryKey(),
  titulo: varchar("titulo", { length: 255 }).notNull(),
  descripcion: text("descripcion"),
  imagen: varchar("imagen", { length: 500 }),
  fechaInicio: timestamp("fechaInicio"),
  fechaFin: timestamp("fechaFin"),
  lugar: varchar("lugar", { length: 255 }),
  estado: mysqlEnum("estado", ["proximo", "en_curso", "finalizado"]).default("proximo"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Event = typeof events.$inferSelect;
export type InsertEvent = typeof events.$inferInsert;

// Tabla de Proyectos
export const projects = mysqlTable("projects", {
  id: int("id").autoincrement().primaryKey(),
  titulo: varchar("titulo", { length: 255 }).notNull(),
  descripcion: text("descripcion"),
  imagen: varchar("imagen", { length: 500 }),
  institucion: varchar("institucion", { length: 255 }),
  responsable: varchar("responsable", { length: 255 }),
  estado: mysqlEnum("estado", ["activo", "completado", "archivado"]).default("activo"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;
// ============================================
// NUEVAS TABLAS PARA EL CRM
// ============================================

// Tabla de Gestores de Innovación
export const gestores = mysqlTable("gestores", {
  id: int("id").autoincrement().primaryKey(),
  nombre: varchar("nombre", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 320 }),
  estado: mysqlEnum("estado", ["activo", "inactivo"]).default("activo"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Gestor = typeof gestores.$inferSelect;
export type InsertGestor = typeof gestores.$inferInsert;

// Tabla de Relación: Centros de Interés - Gestores (muchos a muchos)
export const centrosGestores = mysqlTable("centros_gestores", {
  id: int("id").autoincrement().primaryKey(),
  centroInteresId: int("centroInteresId").notNull(),
  gestorId: int("gestorId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CentroGestor = typeof centrosGestores.$inferSelect;
export type InsertCentroGestor = typeof centrosGestores.$inferInsert;

// Tabla de Centros de Interés
export const centrosInteres = mysqlTable("centros_interes", {
  id: int("id").autoincrement().primaryKey(),
  nombre: varchar("nombre", { length: 255 }).notNull(),
  correoGestor: varchar("correoGestor", { length: 320 }).notNull(),
  institucionEducativa: varchar("institucionEducativa", { length: 255 }).notNull(),
  fechaInicio: timestamp("fechaInicio").notNull(),
  numeroSesiones: int("numeroSesiones").notNull(),
  lineaTematica: varchar("lineaTematica", { length: 255 }).notNull(),
  codigoGrupo: varchar("codigoGrupo", { length: 100 }).notNull(),
  grado: text("grado"), // Puede contener múltiples grados separados por comas
  numeroEstudiantes: int("numeroEstudiantes").notNull(),
  numeroDocentes: int("numeroDocentes").notNull(),
  estado: mysqlEnum("estado", ["activo", "inactivo", "completado"]).default("activo"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CentroInteres = typeof centrosInteres.$inferSelect;
export type InsertCentroInteres = typeof centrosInteres.$inferInsert;

// Tabla de Sesiones CDI
export const sesiones = mysqlTable("sesiones", {
  id: int("id").autoincrement().primaryKey(),
  titulo: varchar("titulo", { length: 255 }).notNull(),
  centroInteresId: int("centroInteresId").notNull(), // Referencia a Centro de Interés
  numeroSesion: int("numeroSesion").notNull(),
  fechaHora: timestamp("fechaHora").notNull(),
  duracionMinutos: int("duracionMinutos").notNull(),
  estado: mysqlEnum("estado", ["pendiente", "completada", "cancelada"]).default("pendiente"),
  observaciones: text("observaciones"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Sesion = typeof sesiones.$inferSelect;
export type InsertSesion = typeof sesiones.$inferInsert;

// Tabla de Asistencia
export const asistencia = mysqlTable("asistencia", {
  id: int("id").autoincrement().primaryKey(),
  sesionId: int("sesionId").notNull(), // Referencia a Sesión
  documentoEstudiante: varchar("documentoEstudiante", { length: 50 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Asistencia = typeof asistencia.$inferSelect;
export type InsertAsistencia = typeof asistencia.$inferInsert;

// Tabla de Asesorías
export const asesorias = mysqlTable("asesorias", {
  id: int("id").autoincrement().primaryKey(),
  titulo: varchar("titulo", { length: 255 }).notNull(),
  tipoDocumento: varchar("tipoDocumento", { length: 50 }).notNull(),
  documentoIdentidad: varchar("documentoIdentidad", { length: 50 }).notNull(),
  primerNombre: varchar("primerNombre", { length: 100 }).notNull(),
  segundoNombre: varchar("segundoNombre", { length: 100 }),
  primerApellido: varchar("primerApellido", { length: 100 }).notNull(),
  segundoApellido: varchar("segundoApellido", { length: 100 }),
  telefono: varchar("telefono", { length: 20 }),
  correoElectronico: varchar("correoElectronico", { length: 320 }),
  institucionEducativa: varchar("institucionEducativa", { length: 255 }).notNull(),
  rolPersona: varchar("rolPersona", { length: 100 }).notNull(),
  barrioVereda: varchar("barrioVereda", { length: 255 }),
  ruralUrbano: mysqlEnum("ruralUrbano", ["Rural", "Urbano"]),
  fechaNacimiento: timestamp("fechaNacimiento"),
  edad: int("edad"),
  genero: mysqlEnum("genero", ["Hombre", "Mujer", "Otro"]),
  personasEspecialInteres: text("personasEspecialInteres"),
  autoreconocimientoEtnico: varchar("autoreconocimientoEtnico", { length: 255 }),
  orientacionSexual: varchar("orientacionSexual", { length: 255 }),
  grado: varchar("grado", { length: 50 }),
  gestorInnovacionId: int("gestorInnovacionId").notNull(), // Referencia al usuario gestor
  duracionMinutos: int("duracionMinutos").notNull(),
  fechaAsesoria: timestamp("fechaAsesoria").notNull(),
  tipoAcompanamiento: varchar("tipoAcompanamiento", { length: 255 }).notNull(),
  desarrolloAcompanamiento: text("desarrolloAcompanamiento"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Asesoria = typeof asesorias.$inferSelect;
export type InsertAsesoria = typeof asesorias.$inferInsert;
