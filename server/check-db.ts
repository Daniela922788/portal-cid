/**
 * Script para verificar la conexión a MySQL.
 * Ejecutar: pnpm run db:check
 */
import "dotenv/config";
import { getDb } from "./db";
import { sql } from "drizzle-orm";

async function checkConnection() {
  console.log("🔍 Verificando conexión a la base de datos...\n");

  if (!process.env.DATABASE_URL) {
    console.error("❌ ERROR: No está definida la variable DATABASE_URL en el archivo .env");
    console.log("\nAsegúrate de tener en tu .env algo como:");
    console.log('  DATABASE_URL="mysql://usuario:contraseña@localhost:3306/nombre_bd"');
    process.exit(1);
  }

  // Ocultar contraseña al mostrar la URL (solo para debug)
  const urlSafe = process.env.DATABASE_URL.replace(/:[^:@]+@/, ":****@");
  console.log("   URL configurada:", urlSafe);

  try {
    const db = await getDb();
    if (!db) {
      console.error("\n❌ No se pudo crear el cliente de base de datos.");
      process.exit(1);
    }

    // Ejecutar una consulta simple para probar la conexión real
    await db.execute(sql`SELECT 1`);
    console.log("\n✅ Conexión exitosa. La base de datos responde correctamente.\n");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error al conectar con la base de datos:\n");
    console.error(error);
    console.log("\nRevisa:");
    console.log("  • Que MySQL esté en ejecución");
    console.log("  • Usuario y contraseña en DATABASE_URL");
    console.log("  • Host (localhost o 127.0.0.1) y puerto (3306)");
    console.log("  • Que exista la base de datos indicada en la URL");
    process.exit(1);
  }
}

checkConnection();
