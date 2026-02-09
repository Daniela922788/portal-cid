import { drizzle } from 'drizzle-orm/mysql2';
import { gestores } from './drizzle/schema';
import dotenv from 'dotenv';

dotenv.config();

const gestoresList = [
  'Víctor Arley Tobón Restrepo',
  'William Jose Pomares Durango',
  'Mauricio Valencia Cifuentes',
  'Mónica María Quiceno Taborda',
  'Paula Andrea Ramírez Rodríguez',
  'Dahyana Restrepo',
  'José Hamilton Posada Ortiz',
  'Carolina Giraldo Martínez',
  'María Alejandra Mora Poveda',
  'Jorge Mario Guzmán Ruiz',
  'Julian Dario Parra Gomez',
  'Diana Cristina Penagos Tejada',
  'Javier Nicolas Bernal Restrepo',
  'Karen Astrid Palacio Úsuga',
  'Isabel Margarita Vega Rodríguez',
  'Paulina Arroyave Muriel',
];

async function insertGestores() {
  try {
    const db = drizzle(process.env.DATABASE_URL);
    
    console.log('📝 Insertando gestores...');
    for (const nombre of gestoresList) {
      try {
        await db.insert(gestores).values({
          nombre,
          estado: 'activo',
        });
        console.log(`  ✓ ${nombre}`);
      } catch (error) {
        console.log(`  ⚠ ${nombre} (posiblemente ya existe)`);
      }
    }
    
    console.log('✅ Gestores insertados exitosamente');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

insertGestores();
