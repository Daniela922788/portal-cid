import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import XLSX from 'xlsx';
import { users, centrosInteres, sesiones, asistencia, asesorias } from './drizzle/schema';
import { eq } from 'drizzle-orm';
import dotenv from 'dotenv';

dotenv.config();

// Configuración de conexión
const pool = mysql.createPool({
  host: process.env.DATABASE_URL?.split('@')[1]?.split('/')[0] || 'localhost',
  user: process.env.DATABASE_URL?.split('://')[1]?.split(':')[0] || 'root',
  password: process.env.DATABASE_URL?.split(':')[2]?.split('@')[0] || '',
  database: process.env.DATABASE_URL?.split('/')[3] || 'portal_cid',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const db = drizzle(pool);

async function loadExcelData() {
  try {
    console.log('📂 Leyendo archivo Excel...');
    const { readFile, utils: { sheet_to_json } } = XLSX;
    const workbook = readFile('/home/ubuntu/upload/Ejemplo.xlsx');
    
    // Crear usuario admin si no existe
    console.log('👤 Creando usuario admin@cid.com...');
    const adminUser = await db.select().from(users).where(eq(users.email, 'admin@cid.com'));
    
    let adminId = 1;
    if (adminUser.length === 0) {
      const result = await db.insert(users).values({
        email: 'admin@cid.com',
        name: 'Administrador CID',
        role: 'admin',
        openId: 'admin-cid-001',
      });
      adminId = result[0].insertId;
      console.log(`✅ Usuario admin creado con ID: ${adminId}`);
    } else {
      adminId = adminUser[0].id;
      console.log(`✅ Usuario admin ya existe con ID: ${adminId}`);
    }

    // Cargar Centros de Interés
    console.log('\n📚 Cargando Centros de Interés...');
    const centrosSheet = workbook.Sheets['Centros de Interés'];
    const centrosData = sheet_to_json(centrosSheet);
    
    const centrosMap = {};
    for (const row of centrosData) {
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
        gestorId: adminId,
        estado: 'activo',
      });
      centrosMap[row['Nombre del centro de interés']] = result[0].insertId;
      console.log(`  ✓ ${row['Nombre del centro de interés']}`);
    }

    // Cargar Sesiones CDI
    console.log('\n📅 Cargando Sesiones CDI...');
    const sesionesSheet = workbook.Sheets['Sesiones CDI'];
    const sesionesData = sheet_to_json(sesionesSheet);
    
    const sesionesMap = {};
    for (const row of sesionesData) {
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
    }

    // Cargar Asistencia
    console.log('\n✅ Cargando Registros de Asistencia...');
    const asistenciaSheet = workbook.Sheets['Asistencia'];
    const asistenciaData = sheet_to_json(asistenciaSheet);
    
    for (const row of asistenciaData) {
      const sesionId = sesionesMap[row['Sesión']];
      if (!sesionId) {
        console.log(`  ⚠ Sesión no encontrada: ${row['Sesión']}`);
        continue;
      }
      
      await db.insert(asistencia).values({
        sesionId: sesionId,
        documentoEstudiante: String(row['Documento estudiante']),
      });
    }
    console.log(`  ✓ ${asistenciaData.length} registros de asistencia cargados`);

    // Cargar Asesorías
    console.log('\n🎓 Cargando Asesorías...');
    const asesoriaSheet = workbook.Sheets['Asesorías'];
    const asesoriaData = sheet_to_json(asesoriaSheet);
    
    for (const row of asesoriaData) {
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
      console.log(`  ✓ ${row['Título']}`);
    }

    console.log('\n✨ ¡Datos cargados exitosamente!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

loadExcelData();
