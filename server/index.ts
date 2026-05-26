import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Headers de seguridad HTTP (XSS, clickjacking, sniffing, etc.)
  app.use(helmet());

  // CORS: solo permite peticiones desde tu dominio
  app.use(
    cors({
      origin: process.env.ALLOWED_ORIGIN || "http://localhost:5173",
      credentials: true,
    })
  );

  // Límite de tamaño de peticiones (evita ataques de payload grande)
  app.use(express.json({ limit: "1mb" }));

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);