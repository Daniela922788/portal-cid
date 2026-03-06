import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

type SearchTarget = {
  routePath: string;
  sourcePath: string;
  normalizedText: string;
};

let cachedSearchTargets: SearchTarget[] | null = null;

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractSearchableText(source: string): string {
  return normalizeText(
    source
      .replace(/import[\s\S]*?;\s*/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/[{}()[\],.;:+*/\\'"`|<>!?=-]/g, " ")
  );
}

async function loadSearchTargets(): Promise<SearchTarget[]> {
  if (cachedSearchTargets) {
    return cachedSearchTargets;
  }

  const appFilePath = path.resolve(import.meta.dirname, "../../client/src/App.tsx");
  const appFileContent = await readFile(appFilePath, "utf8");

  const componentImportMap = new Map<string, string>();
  const importRegex = /import\s+([A-Za-z0-9_]+)\s+from\s+["']\.\/pages\/([^"']+)["'];/g;
  for (const match of appFileContent.matchAll(importRegex)) {
    componentImportMap.set(match[1], match[2]);
  }

  const routeRegex = /<Route\s+path=["']([^"']+)["']\s+component=\{([A-Za-z0-9_]+)\}\s*\/>/g;
  const routeToFileMap = new Map<string, string>();

  for (const match of appFileContent.matchAll(routeRegex)) {
    const routePath = match[1];
    const componentName = match[2];
    const importPath = componentImportMap.get(componentName);

    if (!importPath) {
      continue;
    }

    const sourcePath = path.resolve(import.meta.dirname, `../../client/src/pages/${importPath}.tsx`);
    routeToFileMap.set(routePath, sourcePath);
  }

  const targets = await Promise.all(
    Array.from(routeToFileMap.entries()).map(async ([routePath, sourcePath]) => {
      try {
        const source = await readFile(sourcePath, "utf8");
        return {
          routePath,
          sourcePath,
          normalizedText: extractSearchableText(source),
        } satisfies SearchTarget;
      } catch {
        return null;
      }
    })
  );

  cachedSearchTargets = targets.filter((target): target is SearchTarget => target !== null);
  return cachedSearchTargets;
}

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  app.get("/api/site-search", async (req, res) => {
    const query = typeof req.query.q === "string" ? req.query.q : "";
    const normalizedQuery = normalizeText(query);

    if (!normalizedQuery) {
      res.json({ matches: [] });
      return;
    }

    const terms = normalizedQuery.split(" ").filter(Boolean);

    try {
      const targets = await loadSearchTargets();
      const matches = targets
        .filter((target) => terms.every((term) => target.normalizedText.includes(term)))
        .map((target) => ({ path: target.routePath }));

      res.json({ matches });
    } catch (error) {
      console.error("Site search failed", error);
      res.status(500).json({ matches: [] });
    }
  });

  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
