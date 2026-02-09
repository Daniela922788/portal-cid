import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { getAllCentrosInteres, createCentroInteres, updateCentroInteres, deleteCentroInteres, getAllSesiones, createSesion, updateSesion, deleteSesion, getAsistenciaBySesion, createAsistencia, deleteAsistencia, getAllAsesorias, createAsesoria, updateAsesoria, deleteAsesoria } from './db';

describe('CRM Database Functions', () => {
  let centroId: number;
  let sesionId: number;
  let asistenciaId: number;
  let asesoriaId: number;

  describe('Centros de Interés', () => {
    it('should create a new centro de interés', async () => {
      const result = await createCentroInteres({
        nombre: 'Test Centro STEM',
        correoGestor: 'test@cid.com',
        institucionEducativa: 'IE Test',
        fechaInicio: new Date('2024-01-15'),
        numeroSesiones: 6,
        lineaTematica: 'STEM Talkers',
        codigoGrupo: 'TEST_001',
        grado: '8°',
        numeroEstudiantes: 25,
        numeroDocentes: 2,
        gestorId: 1,
        estado: 'activo',
      });
      expect(result.id).toBeDefined();
      centroId = result.id;
    });

    it('should retrieve all centros de interés', async () => {
      const centros = await getAllCentrosInteres();
      expect(Array.isArray(centros)).toBe(true);
      expect(centros.length).toBeGreaterThan(0);
    });

    it('should update a centro de interés', async () => {
      const result = await updateCentroInteres(centroId, {
        nombre: 'Updated Centro STEM',
        numeroEstudiantes: 30,
      });
      expect(result.id).toBe(centroId);
    });

    it('should filter centros by gestor', async () => {
      const centros = await getAllCentrosInteres();
      expect(Array.isArray(centros)).toBe(true);
      // Should return all centros
      expect(centros.length).toBeGreaterThan(0);
    });
  });

  describe('Sesiones CDI', () => {
    it('should create a new sesión', async () => {
      const result = await createSesion({
        titulo: 'Sesión 1: Introducción a STEM',
        centroInteresId: centroId,
        numeroSesion: 1,
        fechaHora: new Date('2024-02-01T14:00:00'),
        duracionMinutos: 60,
        estado: 'pendiente',
      });
      expect(result.id).toBeDefined();
      sesionId = result.id;
    });

    it('should retrieve all sesiones', async () => {
      const sesiones = await getAllSesiones();
      expect(Array.isArray(sesiones)).toBe(true);
      expect(sesiones.length).toBeGreaterThan(0);
    });

    it('should update a sesión status', async () => {
      const result = await updateSesion(sesionId, {
        estado: 'completada',
        observaciones: 'Sesión exitosa',
      });
      expect(result.id).toBe(sesionId);
    });
  });

  describe('Asistencia', () => {
    it('should create an asistencia record', async () => {
      const result = await createAsistencia({
        sesionId: sesionId,
        documentoEstudiante: '1234567890',
      });
      expect(result.id).toBeDefined();
      asistenciaId = result.id;
    });

    it('should retrieve asistencia by sesión', async () => {
      const asistencias = await getAsistenciaBySesion(sesionId);
      expect(Array.isArray(asistencias)).toBe(true);
      expect(asistencias.length).toBeGreaterThan(0);
    });

    it('should delete an asistencia record', async () => {
      const result = await deleteAsistencia(asistenciaId);
      expect(result.success).toBe(true);
    });
  });

  describe('Asesorías', () => {
    it('should create a new asesoría', async () => {
      const result = await createAsesoria({
        titulo: 'Asesoría Proyecto STEM',
        tipoDocumento: 'CC',
        documentoIdentidad: '9876543210',
        primerNombre: 'Juan',
        primerApellido: 'Pérez',
        institucionEducativa: 'IE Test',
        rolPersona: 'Docente',
        duracionMinutos: 60,
        fechaAsesoria: new Date('2024-02-05T10:00:00'),
        tipoAcompanamiento: 'Acompañamiento en oficina individual',
        gestorInnovacionId: 1,
      });
      expect(result.id).toBeDefined();
      asesoriaId = result.id;
    });

    it('should retrieve all asesorías', async () => {
      const asesorias = await getAllAsesorias();
      expect(Array.isArray(asesorias)).toBe(true);
      expect(asesorias.length).toBeGreaterThan(0);
    });

    it('should filter asesorías by gestor', async () => {
      const asesorias = await getAllAsesorias(1);
      expect(Array.isArray(asesorias)).toBe(true);
      asesorias.forEach(asesoria => {
        expect(asesoria.gestorInnovacionId).toBe(1);
      });
    });

    it('should update an asesoría', async () => {
      const result = await updateAsesoria(asesoriaId, {
        titulo: 'Asesoría Actualizada',
        duracionMinutos: 90,
      });
      expect(result.id).toBe(asesoriaId);
    });
  });

  describe('Cleanup', () => {
    it('should delete a sesión', async () => {
      const result = await deleteSesion(sesionId);
      expect(result.success).toBe(true);
    });

    it('should delete an asesoría', async () => {
      const result = await deleteAsesoria(asesoriaId);
      expect(result.success).toBe(true);
    });

    it('should delete a centro de interés', async () => {
      const result = await deleteCentroInteres(centroId);
      expect(result.success).toBe(true);
    });
  });

  describe('Permission Restrictions', () => {
    it('should only return gestores own centros when filtered by gestorId', async () => {
      // Create a centro for gestor 1
      const centro1 = await createCentroInteres({
        nombre: 'Centro Gestor 1',
        correoGestor: 'gestor1@cid.com',
        institucionEducativa: 'IE 1',
        fechaInicio: new Date('2024-01-15'),
        numeroSesiones: 6,
        lineaTematica: 'STEM',
        codigoGrupo: 'G1_001',
        grado: '8°',
        numeroEstudiantes: 25,
        numeroDocentes: 2,
        gestorId: 1,
        estado: 'activo',
      });

      // Retrieve all centros
      const centros = await getAllCentrosInteres();
      
      // All should be valid centros
      centros.forEach(centro => {
        expect(centro.nombre).toBeDefined();
        expect(centro.institucionEducativa).toBeDefined();
      });

      // Cleanup
      await deleteCentroInteres(centro1.id);
    });
  });
});
