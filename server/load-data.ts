import { protectedProcedure } from './_core/trpc';
import { TRPCError } from '@trpc/server';
import * as XLSX from 'xlsx';
import { getDb } from './db';
import { users, centrosInteres, sesiones, asistencia, asesorias } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

export const loadDataProcedure = protectedProcedure.mutation(async ({ ctx }) => {
  // Solo admins pueden cargar datos
  if (ctx.user?.role !== 'admin') {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Solo administradores pueden cargar datos',
    });
  }

  const db = await getDb();
  if (!db) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'No se pudo conectar a la base de datos',
    });
  }

  try {
    console.log('📂 Leyendo archivo Excel...');
    const { readFile, utils: { sheet_to_json } } = XLSX;
    const workbook = readFile('/home/ubuntu/upload/Ejemplo.xlsx');

    // Obtener o crear usuario admin
    console.log('👤 Configurando usuario admin...');
    const adminUser = await db.select().from(users).where(eq(users.email, 'admin@cid.com'));
    
    let adminId = ctx.user.id;
    if (adminUser.length > 0) {
      adminId = adminUser[0].id;
    }

    // Cargar Centros de Interés
    console.log('📚 Cargando Centros de Interés...');
    const centrosSheet = workbook.Sheets['Centros de Interés'];
    const centrosData = sheet_to_json(centrosSheet) as any[];
    
    const centrosMap: Record<string, number> = {};
    for (const row of centrosData) {
      try {
        const result = await db.insert(centrosInteres).values({
          nombre: row['Nombre del centro de interés'],
          correoGestor: row['Correo Gestor'],
          institucionEducativa: row['Institución Educativa'],
          fechaInicio: new Date(row['Fecha de inicio']),
          numeroSesiones: row['Número de sesiones'] || 0,
          lineaTematica: row['Linea Temática'],
          codigoGrupo: row['Código del grupo'],
          grado: String(row['Grado']),
          numeroEstudiantes: row['Número de estudiantes participantes'] || 0,
          numeroDocentes: row['Número de docentes'] || 0,
        });
        centrosMap[row['Nombre del centro de interés']] = result[0].insertId;
        console.log(`  ✓ ${row['Nombre del centro de interés']}`);
      } catch (error) {
        console.log(`  ⚠ Error cargando centro: ${error}`);
      }
    }

    // Cargar Sesiones CDI
    console.log('📅 Cargando Sesiones CDI...');
    const sesionesSheet = workbook.Sheets['Sesiones CDI'];
    const sesionesData = sheet_to_json(sesionesSheet) as any[];
    
    const sesionesMap: Record<string, number> = {};
    for (const row of sesionesData) {
      try {
        const centroId = centrosMap[row['Centro de interés']];
        if (!centroId) {
          console.log(`  ⚠ Centro no encontrado: ${row['Centro de interés']}`);
          continue;
        }
        
        const result = await db.insert(sesiones).values({
          titulo: row['Título'],
          centroInteresId: centroId,
          numeroSesion: row['Nº de sesión'] || 1,
          fechaHora: new Date(row['Fecha y hora de sesión']),
          duracionMinutos: row['Duración de la sesión en minutos'] || 60,
          estado: 'pendiente',
          observaciones: row['Observaciones'],
        });
        sesionesMap[row['Título']] = result[0].insertId;
        console.log(`  ✓ ${row['Título']}`);
      } catch (error) {
        console.log(`  ⚠ Error cargando sesión: ${error}`);
      }
    }

    // Cargar Asistencia
    console.log('✅ Cargando Registros de Asistencia...');
    const asistenciaSheet = workbook.Sheets['Asistencia'];
    const asistenciaData = sheet_to_json(asistenciaSheet) as any[];
    
    let asistenciaCount = 0;
    for (const row of asistenciaData) {
      try {
        const sesionId = sesionesMap[row['Sesión']];
        if (!sesionId) {
          console.log(`  ⚠ Sesión no encontrada: ${row['Sesión']}`);
          continue;
        }
        
        await db.insert(asistencia).values({
          sesionId: sesionId,
          documentoEstudiante: String(row['Documento estudiante']),
        });
        asistenciaCount++;
      } catch (error) {
        console.log(`  ⚠ Error cargando asistencia: ${error}`);
      }
    }
    console.log(`  ✓ ${asistenciaCount} registros de asistencia cargados`);

    // Cargar Asesorías
    console.log('🎓 Cargando Asesorías...');
    const asesoriaSheet = workbook.Sheets['Asesorías'];
    const asesoriaData = sheet_to_json(asesoriaSheet) as any[];
    
    let asesoriaCount = 0;
    for (const row of asesoriaData) {
      try {
        await db.insert(asesorias).values({
          titulo: row['Título'],
          tipoDocumento: row['Tipo de documento del personal de la IE'],
          documentoIdentidad: String(row['Documento de Identidad del personal de la IE']),
          primerNombre: row['Primer Nombre Personal IE'],
          segundoNombre: row['Segundo Nombre Personal IE'],
          primerApellido: row['Primer Apellido Personal IE'],
          segundoApellido: row['Segundo Apellido Personal IE'],
          telefono: row['Teléfono Personal IE'] ? String(row['Teléfono Personal IE']) : null,
          correoElectronico: row['Correo Electrónico Personal IE'],
          institucionEducativa: row['Institución Educativa'],
          rolPersona: row['Rol de la persona asesorada'],
          barrioVereda: row['Barrio/Vereda Personal IE'],
          ruralUrbano: row['Rural/Urbano Personal IE'],
          fechaNacimiento: row['Fecha de Nacimiento Personal IE'] ? new Date(row['Fecha de Nacimiento Personal IE']) : null,
          edad: row['Edad Personal IE'],
          genero: row['Género Personal IE'],
          personasEspecialInteres: row['Personas de especial interés'],
          autoreconocimientoEtnico: row['Autoreconocimiento étnico-racial'],
          orientacionSexual: row['Orientación Sexual'],
          grado: row['Grado'],
          duracionMinutos: row['Duración en minutos'] || 60,
          fechaAsesoria: new Date(row['Fecha de asesoria']),
          tipoAcompanamiento: row['Tipo Acompañamiento'],
          desarrolloAcompanamiento: row['Desarrollo del acompañamiento'],
          gestorInnovacionId: adminId,
        });
        asesoriaCount++;
        console.log(`  ✓ ${row['Título']}`);
      } catch (error) {
        console.log(`  ⚠ Error cargando asesoría: ${error}`);
      }
    }

    return {
      success: true,
      message: '✨ ¡Datos cargados exitosamente!',
      stats: {
        centros: Object.keys(centrosMap).length,
        sesiones: Object.keys(sesionesMap).length,
        asistencias: asistenciaCount,
        asesorias: asesoriaCount,
      },
    };
  } catch (error) {
    console.error('❌ Error:', error);
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: `Error al cargar datos: ${error instanceof Error ? error.message : 'Error desconocido'}`,
    });
  }
});
