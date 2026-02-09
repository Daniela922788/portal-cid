import * as XLSX from 'xlsx';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Parsear DATABASE_URL
const dbUrl = process.env.DATABASE_URL;
const urlObj = new URL(dbUrl);
const [user, password] = urlObj.username + ':' + urlObj.password;

const pool = mysql.createPool({
  connectionLimit: 5,
  host: urlObj.hostname,
  port: parseInt(urlObj.port) || 3306,
  user: urlObj.username,
  password: urlObj.password,
  database: urlObj.pathname.slice(1).split('?')[0],
  waitForConnections: true,
  enableKeepAlive: true,
  keepAliveInitialDelayMs: 0,
  ssl: 'Amazon RDS',
});

async function loadData() {
  const connection = await pool.getConnection();
  
  try {
    console.log('📚 Cargando datos desde Excel...');
    
    // Leer el archivo Excel
    const workbook = XLSX.readFile('/home/ubuntu/upload/Ejemplo.xlsx');
    
    // ===== CARGAR CENTROS DE INTERÉS =====
    console.log('\n📌 Cargando Centros de Interés...');
    const centrosSheet = workbook.Sheets['Centros de Interés'];
    const centrosData = XLSX.utils.sheet_to_json(centrosSheet);
    
    const gestores = {};
    for (const row of centrosData) {
      const gestorNombre = row['Gestor'];
      const gestorCorreo = row['Correo Gestor'];
      
      // Crear gestor si no existe (usando correo como identificador único)
      if (!gestores[gestorCorreo]) {
        const [userResult] = await connection.query(
          'INSERT INTO users (openId, name, email, role) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)',
          [gestorCorreo, gestorNombre, gestorCorreo, 'user']
        );
        gestores[gestorCorreo] = userResult.insertId;
      }
      
      const gestorId = gestores[gestorCorreo];
      
      await connection.query(
        `INSERT INTO centros_interes 
        (nombre, gestorId, correoGestor, institucionEducativa, fechaInicio, numeroSesiones, lineaTematica, codigoGrupo, grado, numeroEstudiantes, numeroDocentes, estado)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          row['Nombre del centro de interés'],
          gestorId,
          gestorCorreo,
          row['Institución Educativa'],
          row['Fecha de inicio'],
          row['Número de sesiones'],
          row['Linea Temática'],
          row['Código del grupo'],
          row['Grado'],
          row['Número de estudiantes participantes'],
          row['Número de docentes'],
          'activo'
        ]
      );
    }
    console.log(`✅ ${centrosData.length} centros de interés cargados`);
    
    // ===== CARGAR SESIONES CDI =====
    console.log('\n📌 Cargando Sesiones CDI...');
    const sesionesSheet = workbook.Sheets['Sesiones CDI'];
    const sesionesData = XLSX.utils.sheet_to_json(sesionesSheet);
    
    // Crear mapa de centros de interés por nombre
    const [centros] = await connection.query('SELECT id, nombre FROM centros_interes');
    const centrosMap = {};
    for (const centro of centros) {
      centrosMap[centro.nombre] = centro.id;
    }
    
    for (const row of sesionesData) {
      const centroNombre = row['Centro de interés'];
      const centroId = centrosMap[centroNombre];
      
      if (!centroId) {
        console.warn(`⚠️  Centro de interés no encontrado: ${centroNombre}`);
        continue;
      }
      
      await connection.query(
        `INSERT INTO sesiones 
        (titulo, centroInteresId, numeroSesion, fechaHora, duracionMinutos, estado, observaciones)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          row['Título'],
          centroId,
          row['Nº de sesión'],
          row['Fecha y hora de sesión'],
          row['Duración de la sesión en minutos'],
          'pendiente',
          row['Observaciones'] || null
        ]
      );
    }
    console.log(`✅ ${sesionesData.length} sesiones cargadas`);
    
    // ===== CARGAR ASISTENCIA =====
    console.log('\n📌 Cargando Asistencia...');
    const asistenciaSheet = workbook.Sheets['Asistencia'];
    const asistenciaData = XLSX.utils.sheet_to_json(asistenciaSheet);
    
    // Crear mapa de sesiones por título
    const [sesionesDB] = await connection.query('SELECT id, titulo FROM sesiones');
    const sesionesMap = {};
    for (const sesion of sesionesDB) {
      sesionesMap[sesion.titulo] = sesion.id;
    }
    
    for (const row of asistenciaData) {
      const sesionTitulo = row['Sesión'];
      const sesionId = sesionesMap[sesionTitulo];
      
      if (!sesionId) {
        console.warn(`⚠️  Sesión no encontrada: ${sesionTitulo}`);
        continue;
      }
      
      await connection.query(
        `INSERT INTO asistencia (sesionId, documentoEstudiante)
        VALUES (?, ?)`,
        [sesionId, String(row['Documento estudiante'])]
      );
    }
    console.log(`✅ ${asistenciaData.length} registros de asistencia cargados`);
    
    // ===== CARGAR ASESORÍAS =====
    console.log('\n📌 Cargando Asesorías...');
    const aseoriasSheet = workbook.Sheets['Asesorías'];
    const aseoriasData = XLSX.utils.sheet_to_json(aseoriasSheet);
    
    for (const row of aseoriasData) {
      const gestorNombre = row['Gestor de Innovación'];
      const gestorCorreo = row['Correo Electrónico Personal IE'] || `${gestorNombre.toLowerCase().replace(/\s+/g, '.')}@cid.com`;
      
      // Obtener o crear gestor
      let gestorId = gestores[gestorCorreo];
      if (!gestorId) {
        const [userResult] = await connection.query(
          'INSERT INTO users (openId, name, email, role) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)',
          [gestorCorreo, gestorNombre, gestorCorreo, 'user']
        );
        gestorId = userResult.insertId;
        gestores[gestorCorreo] = gestorId;
      }
      
      await connection.query(
        `INSERT INTO asesorias 
        (titulo, tipoDocumento, documentoIdentidad, primerNombre, segundoNombre, primerApellido, segundoApellido, 
         telefono, correoElectronico, institucionEducativa, rolPersona, barrioVereda, ruralUrbano, 
         fechaNacimiento, edad, genero, personasEspecialInteres, autoreconocimientoEtnico, orientacionSexual, 
         grado, gestorInnovacionId, duracionMinutos, fechaAsesoria, tipoAcompanamiento, desarrolloAcompanamiento)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          row['Título'],
          row['Tipo de documento del personal de la IE'],
          String(row['Documento de Identidad del personal de la IE']),
          row['Primer Nombre Personal IE'],
          row['Segundo Nombre Personal IE'] || null,
          row['Primer Apellido Personal IE'],
          row['Segundo Apellido Personal IE'] || null,
          row['Teléfono Personal IE'] ? String(row['Teléfono Personal IE']) : null,
          row['Correo Electrónico Personal IE'] || null,
          row['Institución Educativa'],
          row['Rol de la persona asesorada'],
          row['Barrio/Vereda Personal IE'] || null,
          row['Rural/Urbano Personal IE'] || null,
          row['Fecha de Nacimiento Personal IE'] || null,
          row['Edad Personal IE'] || null,
          row['Género Personal IE'] || null,
          row['Personas de especial interés'] || null,
          row['Autoreconocimiento étnico-racial'] || null,
          row['Orientación Sexual'] || null,
          row['Grado'] || null,
          gestorId,
          row['Duración en minutos'],
          row['Fecha de asesoria'],
          row['Tipo Acompañamiento'],
          row['Desarrollo del acompañamiento'] || null
        ]
      );
    }
    console.log(`✅ ${aseoriasData.length} asesorías cargadas`);
    
    console.log('\n✨ ¡Datos cargados exitosamente!');
    
  } catch (error) {
    console.error('❌ Error al cargar datos:', error.message);
    throw error;
  } finally {
    await connection.release();
    await pool.end();
  }
}

loadData().catch(console.error);
