import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createHmac, createHash, timingSafeEqual } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import nodemailer from "nodemailer";
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

const RESERVAS_DESTINO = "daniela.sernag@envigado.edu.co";
const RESERVAS_DIRECCION_DEFAULT =
  "Biblioteca y Parque Cultural Debora Arango - Centro de Innovacion y Desarrollo (CID), Envigado.";
const SALAS_CAPACIDAD_MAXIMA: Record<string, number> = {
  "Sala 1": 32,
  "Sala 2": 32,
  "Sala 3": 20,
  "Aula Multimedia": 16,
  "Aula de Experimentación Audiovisual": 15,
  "Local 4": 9,
};

type ReservaDecisionPayload = {
  correoElectronico: string;
  entidadSolicitante: string;
  nombreEvento: string;
  fechaEvento: string;
  horaInicio: string;
  horaFin: string;
  espacioSolicitado: string;
  exp: number;
};

const reservaDecisionState = new Map<string, "processing" | "authorize" | "deny">();

function getEnv(name: string): string {
  return String(process.env[name] ?? "").trim();
}

function buildReservaMailTransport() {
  const host = getEnv("SMTP_HOST");
  const port = Number(getEnv("SMTP_PORT") || "587");
  const user = getEnv("SMTP_USER");
  const pass = getEnv("SMTP_PASS");
  const secure = getEnv("SMTP_SECURE") === "true";

  if (!host || !port || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getReservaActionSecret(): string {
  return getEnv("RESERVAS_ACTION_SECRET") || getEnv("SMTP_PASS");
}

function signReservaDecisionToken(payload: ReservaDecisionPayload): string | null {
  const secret = getReservaActionSecret();
  if (!secret) {
    return null;
  }

  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", secret).update(encodedPayload).digest("base64url");
  return `${encodedPayload}.${signature}`;
}

function verifyReservaDecisionToken(token: string): ReservaDecisionPayload | null {
  const secret = getReservaActionSecret();
  if (!secret) {
    return null;
  }

  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = createHmac("sha256", secret).update(encodedPayload).digest("base64url");

  if (signature.length !== expectedSignature.length) {
    return null;
  }

  const signatureBuffer = Buffer.from(signature);
  const expectedSignatureBuffer = Buffer.from(expectedSignature);
  if (!timingSafeEqual(signatureBuffer, expectedSignatureBuffer)) {
    return null;
  }

  try {
    const parsed = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as ReservaDecisionPayload;
    if (!parsed?.correoElectronico || !parsed?.fechaEvento || !parsed?.espacioSolicitado || !parsed?.exp) {
      return null;
    }
    if (Date.now() > parsed.exp) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function hashReservaDecisionToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

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

  app.post("/api/salas/reservas", async (req, res) => {
    const body = req.body as Record<string, unknown>;

    const payload = {
      entidadSolicitante: String(body.entidadSolicitante ?? "").trim(),
      tipoDocumento: String(body.tipoDocumento ?? "").trim(),
      numeroDocumento: String(body.numeroDocumento ?? "").trim(),
      solicitanteNombre: String(body.solicitanteNombre ?? "").trim(),
      celular: String(body.celular ?? "").trim(),
      correoElectronico: String(body.correoElectronico ?? "").trim(),
      nombreEvento: String(body.nombreEvento ?? "").trim(),
      tipoEvento: String(body.tipoEvento ?? "").trim(),
      objetivoEvento: String(body.objetivoEvento ?? "").trim(),
      descripcionEvento: String(body.descripcionEvento ?? "").trim(),
      fechaEvento: String(body.fechaEvento ?? "").trim(),
      horaInicio: String(body.horaInicio ?? "").trim(),
      horaFin: String(body.horaFin ?? "").trim(),
      numeroAsistentes: String(body.numeroAsistentes ?? "").trim(),
      observaciones: String(body.observaciones ?? "").trim(),
      espacioSolicitado: String(body.espacioSolicitado ?? "").trim(),
    };

    const requiredFields = [
      "entidadSolicitante",
      "tipoDocumento",
      "numeroDocumento",
      "celular",
      "correoElectronico",
      "nombreEvento",
      "tipoEvento",
      "objetivoEvento",
      "descripcionEvento",
      "fechaEvento",
      "horaInicio",
      "horaFin",
      "numeroAsistentes",
      "espacioSolicitado",
    ] as const;

    const missing = requiredFields.filter((field) => !payload[field]);

    if (missing.length > 0) {
      res.status(400).json({ message: "Faltan campos obligatorios del formulario." });
      return;
    }

    const capacidadSala = SALAS_CAPACIDAD_MAXIMA[payload.espacioSolicitado];
    if (!capacidadSala) {
      res.status(400).json({ message: "El espacio solicitado no es válido." });
      return;
    }

    const numeroAsistentes = Number(payload.numeroAsistentes);
    if (!Number.isInteger(numeroAsistentes) || numeroAsistentes < 1) {
      res.status(400).json({ message: "El número de asistentes no es válido." });
      return;
    }

    if (numeroAsistentes > capacidadSala) {
      res.status(400).json({
        message: `La sala ${payload.espacioSolicitado} permite máximo ${capacidadSala} asistentes.`,
      });
      return;
    }

    const transporter = buildReservaMailTransport();
    const fromAddress = getEnv("SMTP_FROM") || getEnv("SMTP_USER");
    const baseUrl = getEnv("PUBLIC_BASE_URL") || `${req.protocol}://${req.get("host") || "localhost:3000"}`;

    if (!transporter || !fromAddress) {
      res.status(500).json({
        message:
          "El servidor no tiene configuración SMTP. Define SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS y opcionalmente SMTP_SECURE/SMTP_FROM.",
      });
      return;
    }

    const actionToken = signReservaDecisionToken({
      correoElectronico: payload.correoElectronico,
      entidadSolicitante: payload.entidadSolicitante,
      nombreEvento: payload.nombreEvento,
      fechaEvento: payload.fechaEvento,
      horaInicio: payload.horaInicio,
      horaFin: payload.horaFin,
      espacioSolicitado: payload.espacioSolicitado,
      exp: Date.now() + 1000 * 60 * 60 * 24 * 7,
    });

    if (!actionToken) {
      res.status(500).json({
        message: "No se pudo generar el flujo de autorizacion para la reserva.",
      });
      return;
    }

    const autorizarUrl = `${baseUrl}/api/salas/reservas/decision?decision=authorize&token=${encodeURIComponent(actionToken)}`;
    const negarUrl = `${baseUrl}/api/salas/reservas/decision?decision=deny&token=${encodeURIComponent(actionToken)}`;

    const rows = [
      ["Nombre de la entidad o persona que solicita la reserva", payload.entidadSolicitante],
      ["Tipo de documento", payload.tipoDocumento],
      ["Número de documento", payload.numeroDocumento],
      ["Nombres y apellidos del solicitante", payload.solicitanteNombre],
      ["Número de celular", payload.celular],
      ["Correo electrónico", payload.correoElectronico],
      ["Nombre del evento", payload.nombreEvento],
      ["Tipo de evento", payload.tipoEvento],
      ["Objetivo del evento", payload.objetivoEvento],
      ["Descripción detallada del evento a realizar", payload.descripcionEvento],
      ["Fecha evento", payload.fechaEvento],
      ["Hora de inicio del evento", payload.horaInicio],
      ["Hora de finalización del evento", payload.horaFin],
      ["Número de asistentes", payload.numeroAsistentes],
      ["Observaciones", payload.observaciones || "(Sin observaciones)"],
      ["Espacio solicitado", payload.espacioSolicitado],
    ];

    const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
    const html = `
      <h2>Solicitud para préstamo de espacios</h2>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px;">
        <tbody>
          ${rows
            .map(
              ([label, value]) =>
                `<tr><th align="left" style="background:#f3f4f6;">${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>`
            )
            .join("")}
        </tbody>
      </table>
      <p style="font-family: Arial, sans-serif; font-size: 14px; margin-top: 16px;">Selecciona una accion para responder al solicitante:</p>
      <table cellpadding="0" cellspacing="0" style="margin-top: 8px;">
        <tr>
          <td style="padding-right: 8px;">
            <a href="${escapeHtml(autorizarUrl)}" style="display:inline-block; background:#0d4b56; color:#ffffff; text-decoration:none; font-family:Arial,sans-serif; font-size:14px; font-weight:700; padding:10px 16px; border-radius:999px;">Autorizar</a>
          </td>
          <td>
            <a href="${escapeHtml(negarUrl)}" style="display:inline-block; background:#b42318; color:#ffffff; text-decoration:none; font-family:Arial,sans-serif; font-size:14px; font-weight:700; padding:10px 16px; border-radius:999px;">Negar</a>
          </td>
        </tr>
      </table>
    `;

    try {
      await transporter.sendMail({
        from: fromAddress,
        to: RESERVAS_DESTINO,
        subject: `Nueva solicitud de reserva - ${payload.espacioSolicitado}`,
        replyTo: payload.correoElectronico,
        text,
        html,
      });

      res.status(200).json({ message: "Solicitud enviada correctamente." });
    } catch (error) {
      console.error("Error enviando correo de reserva", error);
      res.status(500).json({ message: "No se pudo enviar la solicitud por correo." });
    }
  });

  app.get("/api/salas/reservas/decision", async (req, res) => {
    const decision = String(req.query.decision ?? "").trim();
    const token = String(req.query.token ?? "").trim();

    if (!token || (decision !== "authorize" && decision !== "deny")) {
      res.status(400).send("Solicitud invalida.");
      return;
    }

    const tokenHash = hashReservaDecisionToken(token);
    const currentDecisionState = reservaDecisionState.get(tokenHash);
    if (currentDecisionState === "processing") {
      res.status(409).send("Esta solicitud ya se esta procesando.");
      return;
    }
    if (currentDecisionState === "authorize" || currentDecisionState === "deny") {
      res.status(409).send("Esta solicitud ya fue procesada y no puede volver a decidirse.");
      return;
    }

    const decisionPayload = verifyReservaDecisionToken(token);
    if (!decisionPayload) {
      res.status(400).send("El enlace no es valido o ha expirado.");
      return;
    }

    reservaDecisionState.set(tokenHash, "processing");

    const transporter = buildReservaMailTransport();
    const fromAddress = getEnv("SMTP_FROM") || getEnv("SMTP_USER");
    const direccionBiblioteca = getEnv("RESERVAS_DIRECCION") || RESERVAS_DIRECCION_DEFAULT;

    if (!transporter || !fromAddress) {
      res.status(500).send("No hay configuracion SMTP disponible para enviar la respuesta.");
      return;
    }

    const esAutorizacion = decision === "authorize";
    const subject = esAutorizacion
      ? `Solicitud autorizada - ${decisionPayload.espacioSolicitado}`
      : `Solicitud no autorizada - ${decisionPayload.espacioSolicitado}`;

    const text = esAutorizacion
      ? [
          `Hola, ${decisionPayload.entidadSolicitante}.`,
          "",
          "Tu solicitud de prestamo de espacio fue autorizada.",
          `Espacio: ${decisionPayload.espacioSolicitado}`,
          `Fecha: ${decisionPayload.fechaEvento}`,
          `Horario: ${decisionPayload.horaInicio} a ${decisionPayload.horaFin}`,
          `Direccion: ${direccionBiblioteca}`,
          "",
          "Por favor llega puntual para iniciar el uso del espacio a la hora programada.",
          "",
          "Centro de Innovacion y Desarrollo (CID)",
        ].join("\n")
      : [
          `Hola, ${decisionPayload.entidadSolicitante}.`,
          "",
          "Tu solicitud de prestamo de espacio fue negada para la fecha y horario solicitados.",
          `Espacio solicitado: ${decisionPayload.espacioSolicitado}`,
          `Fecha: ${decisionPayload.fechaEvento}`,
          `Horario: ${decisionPayload.horaInicio} a ${decisionPayload.horaFin}`,
          "",
          "Si lo deseas, puedes realizar una nueva solicitud con otra fecha u horario.",
          "",
          "Centro de Innovacion y Desarrollo (CID)",
        ].join("\n");

    const html = esAutorizacion
      ? `
          <div style="font-family: Arial, sans-serif; font-size: 14px; color: #182130; line-height: 1.6;">
            <p>Hola, ${escapeHtml(decisionPayload.entidadSolicitante)}.</p>
            <p>Tu solicitud de prestamo de espacio fue <strong>autorizada</strong>.</p>
            <ul>
              <li><strong>Espacio:</strong> ${escapeHtml(decisionPayload.espacioSolicitado)}</li>
              <li><strong>Fecha:</strong> ${escapeHtml(decisionPayload.fechaEvento)}</li>
              <li><strong>Horario:</strong> ${escapeHtml(decisionPayload.horaInicio)} a ${escapeHtml(decisionPayload.horaFin)}</li>
              <li><strong>Direccion:</strong> ${escapeHtml(direccionBiblioteca)}</li>
            </ul>
            <p>Por favor llega puntual para iniciar el uso del espacio a la hora programada.</p>
            <p>Centro de Innovacion y Desarrollo (CID)</p>
          </div>
        `
      : `
          <div style="font-family: Arial, sans-serif; font-size: 14px; color: #182130; line-height: 1.6;">
            <p>Hola, ${escapeHtml(decisionPayload.entidadSolicitante)}.</p>
            <p>Tu solicitud de prestamo de espacio fue <strong>negada</strong> para la fecha y horario solicitados.</p>
            <ul>
              <li><strong>Espacio solicitado:</strong> ${escapeHtml(decisionPayload.espacioSolicitado)}</li>
              <li><strong>Fecha:</strong> ${escapeHtml(decisionPayload.fechaEvento)}</li>
              <li><strong>Horario:</strong> ${escapeHtml(decisionPayload.horaInicio)} a ${escapeHtml(decisionPayload.horaFin)}</li>
            </ul>
            <p>Si lo deseas, puedes realizar una nueva solicitud con otra fecha u horario.</p>
            <p>Centro de Innovacion y Desarrollo (CID)</p>
          </div>
        `;

    try {
      await transporter.sendMail({
        from: fromAddress,
        to: decisionPayload.correoElectronico,
        subject,
        text,
        html,
      });

      reservaDecisionState.set(tokenHash, decision as "authorize" | "deny");

      res
        .status(200)
        .send(
          esAutorizacion
            ? "Respuesta enviada: solicitud autorizada."
            : "Respuesta enviada: solicitud negada."
        );
    } catch (error) {
      reservaDecisionState.delete(tokenHash);
      console.error("Error enviando respuesta automatica de reserva", error);
      res.status(500).send("No se pudo enviar la respuesta al solicitante.");
    }
  });

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
