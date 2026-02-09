import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, courses, enrollments, InsertEnrollment, pqrsTable, InsertPQRS, news, events, projects, centrosInteres, InsertCentroInteres, sesiones, InsertSesion, asistencia, InsertAsistencia, asesorias, InsertAsesoria, gestores, InsertGestor, centrosGestores, InsertCentroGestor } from "../drizzle/schema";
import { ENV } from './_core/env';
import { eq, and } from "drizzle-orm";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(users).where(eq(users.openId, openId));
  return result[0] || null;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.role) {
      values.role = user.role;
      updateSet.role = user.role;
    }

    // Upsert: insert if not exists, update if exists
    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Error upserting user:", error);
    throw error;
  }
}

export async function getAllCourses() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(courses);
}

export async function getCourseById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(courses).where(eq(courses.id, id));
  return result[0] || null;
}

export async function createCourse(data: InsertCourse) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(courses).values(data);
  return { id: result[0].insertId };
}

export async function updateCourse(id: number, data: Partial<InsertCourse>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(courses).set(data).where(eq(courses.id, id));
  return { id };
}

export async function deleteCourse(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(courses).where(eq(courses.id, id));
  return { success: true };
}

export async function createEnrollment(data: InsertEnrollment) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(enrollments).values(data);
  return { id: result[0].insertId };
}

export async function getAllPQRS() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(pqrsTable);
}

export async function createPQRS(data: InsertPQRS) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(pqrsTable).values(data);
  return { id: result[0].insertId };
}

export async function getAllNews() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(news);
}

export async function getAllEvents() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(events);
}

export async function getEventById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(events).where(eq(events.id, id));
  return result[0] || null;
}

export async function getAllProjects() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(projects);
}

export async function getProjectById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(projects).where(eq(projects.id, id));
  return result[0] || null;
}

// ============================================
// NUEVAS FUNCIONES PARA EL CRM
// ============================================

// CENTROS DE INTERÉS
export async function getAllCentrosInteres() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(centrosInteres);
}

export async function getCentroInteresById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(centrosInteres).where(eq(centrosInteres.id, id));
  return result[0] || null;
}

export async function createCentroInteres(data: Omit<InsertCentroInteres, 'gestorId'>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(centrosInteres).values(data);
  return { id: result[0].insertId };
}

// GESTORES
export async function getAllGestores() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(gestores).where(eq(gestores.estado, 'activo'));
}

export async function createGestor(data: InsertGestor) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(gestores).values(data);
  return { id: result[0].insertId };
}

// RELACIÓN CENTROS-GESTORES
export async function addGestorToCentro(centroId: number, gestorId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(centrosGestores).values({
    centroInteresId: centroId,
    gestorId: gestorId,
  });
  return { id: result[0].insertId };
}

export async function getGestoresByCentro(centroId: number) {
  const db = await getDb();
  if (!db) return [];
  const result = await db.select({
    id: gestores.id,
    nombre: gestores.nombre,
    email: gestores.email,
  }).from(centrosGestores)
    .innerJoin(gestores, eq(centrosGestores.gestorId, gestores.id))
    .where(eq(centrosGestores.centroInteresId, centroId));
  return result;
}

export async function removeGestorFromCentro(centroId: number, gestorId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(centrosGestores)
    .where(and(eq(centrosGestores.centroInteresId, centroId), eq(centrosGestores.gestorId, gestorId)));
  return { success: true };
}

export async function updateCentroInteres(id: number, data: Partial<InsertCentroInteres>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(centrosInteres).set(data).where(eq(centrosInteres.id, id));
  return { id };
}

export async function deleteCentroInteres(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(centrosInteres).where(eq(centrosInteres.id, id));
  return { success: true };
}

// SESIONES CDI
export async function getAllSesiones(gestorId?: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(sesiones);
}

export async function getSesionById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(sesiones).where(eq(sesiones.id, id));
  return result[0] || null;
}

export async function createSesion(data: InsertSesion) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(sesiones).values(data);
  return { id: result[0].insertId };
}

export async function updateSesion(id: number, data: Partial<InsertSesion>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(sesiones).set(data).where(eq(sesiones.id, id));
  return { id };
}

export async function deleteSesion(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(sesiones).where(eq(sesiones.id, id));
  return { success: true };
}

// ASISTENCIA
export async function getAsistenciaBySesion(sesionId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(asistencia).where(eq(asistencia.sesionId, sesionId));
}

export async function createAsistencia(data: InsertAsistencia) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(asistencia).values(data);
  return { id: result[0].insertId };
}

export async function deleteAsistencia(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(asistencia).where(eq(asistencia.id, id));
  return { success: true };
}

// ASESORÍAS
export async function getAllAsesorias() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(asesorias);
}

export async function getAsesoriaById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(asesorias).where(eq(asesorias.id, id));
  return result[0] || null;
}

export async function createAsesoria(data: InsertAsesoria) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(asesorias).values(data);
  return { id: result[0].insertId };
}

export async function updateAsesoria(id: number, data: Partial<InsertAsesoria>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(asesorias).set(data).where(eq(asesorias.id, id));
  return { id };
}

export async function deleteAsesoria(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(asesorias).where(eq(asesorias.id, id));
  return { success: true };
}
