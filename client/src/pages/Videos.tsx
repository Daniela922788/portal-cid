import { useState } from "react";

const SHORTS = [
  { id: "spMFXEUCEX8", title: "Artemis III — no es soñar, es llegar" },
  { id: "R3-OXQd-Fp4", title: "Lunar Gateway — la estación orbital lunar" },
  { id: "QLJqKHyzcnU", title: "¿Quiénes irán a la Luna?" },
  { id: "4qF9yJWZRcU", title: "El traje espacial de Artemis" },
  { id: "vnCAia6v0bE", title: "Día del Árbol — plantar para el futuro" },
  { id: "VGjz_9NKYZc", title: "Auroras Boreales — la danza del cielo" },
  { id: "vq614P1SONs", title: "Visita Renault — innovación en movimiento" },
];

const VIDEOS = [
  {
    id: "CceKZW0xxTk",
    title: "TOM — El documental completo",
    channel: "Centro de Innovación Y Desarrollo",
    views: "198 vistas",
  },
];

const YT_CHANNEL = "https://www.youtube.com/@CentrodeInnovaci%C3%B3nyDesarrollo";

function PlayIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
      <polygon points="5,3 19,12 5,21" />
    </svg>
  );
}

function YTIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={Math.round(size * 0.72)} viewBox="0 0 18 13" fill="white">
      <path d="M17.6 2.0a2.26 2.26 0 0 0-1.6-1.6C14.6 0 9 0 9 0S3.4 0 1.96.39A2.26 2.26 0 0 0 .4 2C0 3.46 0 6.5 0 6.5s0 3.04.4 4.5a2.26 2.26 0 0 0 1.56 1.6C3.4 13 9 13 9 13s5.6 0 7.04-.4A2.26 2.26 0 0 0 17.6 11C18 9.54 18 6.5 18 6.5s0-3.04-.4-4.5z" />
      <polygon fill="#cc0000" points="7.25,9.25 11.75,6.5 7.25,3.75" />
    </svg>
  );
}

function ShortCard({ s }: { s: typeof SHORTS[0] }) {
  const [hovered, setHovered] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${s.id}/hqdefault.jpg`;
  const url = `https://youtube.com/shorts/${s.id}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ flex: "0 0 162px", textDecoration: "none", color: "inherit", display: "block" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          width: 162,
          height: 288,
          borderRadius: 12,
          overflow: "hidden",
          background: "#272727",
          position: "relative",
        }}
      >
        <img
          src={thumb}
          alt={s.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <div
          style={{
            position: "absolute",
            top: 8,
            left: 8,
            background: "rgba(0,0,0,0.75)",
            borderRadius: 4,
            padding: "2px 7px",
            fontSize: 11,
            fontWeight: 700,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <YTIcon size={12} />
          Shorts
        </div>
        {hovered && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PlayIcon size={18} />
            </div>
          </div>
        )}
      </div>
      <p
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: "#f1f1f1",
          marginTop: 8,
          lineHeight: 1.4,
          paddingLeft: 2,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical" as const,
          overflow: "hidden",
        }}
      >
        {s.title}
      </p>
      <p style={{ fontSize: 12, color: "#aaa", marginTop: 2, paddingLeft: 2 }}>
        Centro de Innovación
      </p>
    </a>
  );
}

function VideoCard({ v }: { v: typeof VIDEOS[0] }) {
  const [hovered, setHovered] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`;
  const url = `https://youtu.be/${v.id}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          width: "100%",
          aspectRatio: "16/9",
          borderRadius: 10,
          overflow: "hidden",
          background: "#272727",
          position: "relative",
        }}
      >
        <img
          src={thumb}
          alt={v.title}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        {hovered && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PlayIcon size={26} />
            </div>
          </div>
        )}
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 10, alignItems: "flex-start" }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "#ff0000",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <YTIcon size={18} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "#f1f1f1",
              lineHeight: 1.4,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical" as const,
              overflow: "hidden",
              margin: 0,
            }}
          >
            {v.title}
          </p>
          <p style={{ fontSize: 12, color: "#aaa", margin: "4px 0 0" }}>{v.channel}</p>
          <p style={{ fontSize: 12, color: "#aaa", margin: "2px 0 0" }}>{v.views}</p>
        </div>
      </div>
    </a>
  );
}

export default function Videos() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const filteredShorts = q
    ? SHORTS.filter((s) => s.title.toLowerCase().includes(q))
    : SHORTS;

  const filteredVideos = q
    ? VIDEOS.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.channel.toLowerCase().includes(q)
      )
    : VIDEOS;

  const noResults = q.length > 0 && filteredShorts.length === 0 && filteredVideos.length === 0;

  return (
    <div
      style={{
        fontFamily: "'Roboto', Arial, sans-serif",
        background: "#0f0f0f",
        minHeight: "100vh",
        color: "#f1f1f1",
      }}
    >
      {/* NAV */}
      <nav
        style={{
          background: "#0f0f0f",
          borderBottom: "1px solid #272727",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 1280,
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "0 24px",
            height: 56,
          }}
        >
          {/* Logo → canal */}
          <a
            href={YT_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}
          >
            <div
              style={{
                background: "#ff0000",
                width: 32,
                height: 22,
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <YTIcon size={18} />
            </div>
            <span style={{ fontSize: 15, fontWeight: 700, color: "#fff", letterSpacing: "-0.3px" }}>
              Centro de Innovación
            </span>
          </a>

          {/* Barra de búsqueda funcional */}
          <div
            style={{
              flex: 1,
              minWidth: 0,
              height: 40,
              border: `1px solid ${query ? "#717171" : "#272727"}`,
              borderRadius: 9999,
              background: "#121212",
              display: "flex",
              alignItems: "center",
              padding: "0 14px",
              gap: 8,
            }}
          >
            <svg width="14" height="14" fill="none" stroke="#717171" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Buscar videos..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#f1f1f1",
                fontSize: 14,
                minWidth: 0,
              }}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#717171",
                  fontSize: 18,
                  lineHeight: 1,
                  padding: 0,
                  flexShrink: 0,
                }}
                aria-label="Limpiar búsqueda"
              >
                ×
              </button>
            )}
          </div>

          {/* Botón suscribirse → canal */}
          <a
            href={`${YT_CHANNEL}?sub_confirmation=1`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginLeft: "auto",
              background: "#fff",
              color: "#0f0f0f",
              fontSize: 13,
              fontWeight: 600,
              padding: "10px 18px",
              borderRadius: 9999,
              textDecoration: "none",
              whiteSpace: "nowrap",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            Suscribirse
          </a>
        </div>
      </nav>

      {/* CONTENT */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 24px 48px" }}>

        {/* Shorts header */}
        {filteredShorts.length > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#ff0000">
              <path d="M10 9l5 3-5 3V9z" />
              <path
                d="M21.6 7.2A2.85 2.85 0 0 0 19.6 5.2C18.1 4.8 12 4.8 12 4.8s-6.1 0-7.6.4A2.85 2.85 0 0 0 2.4 7.2C2 8.7 2 12 2 12s0 3.3.4 4.8a2.85 2.85 0 0 0 2 2c1.5.4 7.6.4 7.6.4s6.1 0 7.6-.4a2.85 2.85 0 0 0 2-2C22 15.3 22 12 22 12s0-3.3-.4-4.8z"
                fill="none"
                stroke="#ff0000"
                strokeWidth="1.5"
              />
            </svg>
            <span style={{ fontSize: 16, fontWeight: 600 }}>Shorts</span>
            <span
              style={{
                background: "#272727",
                color: "#f1f1f1",
                fontSize: 12,
                fontWeight: 500,
                padding: "3px 10px",
                borderRadius: 8,
              }}
            >
              # Shorts
            </span>
          </div>
        )}

        {/* Shorts horizontal scroll */}
        {filteredShorts.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: 8,
              overflowX: "auto",
              paddingBottom: 8,
              msOverflowStyle: "none",
              scrollbarWidth: "none" as const,
            }}
          >
            {filteredShorts.map((s) => (
              <ShortCard key={s.id} s={s} />
            ))}
          </div>
        )}

        {/* Sin resultados */}
        {noResults && (
          <div style={{ textAlign: "center", padding: "64px 0", color: "#717171" }}>
            <svg width="48" height="48" fill="none" stroke="#444" strokeWidth="1.5" viewBox="0 0 24 24" style={{ display: "block", margin: "0 auto 16px" }}>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <p style={{ fontSize: 16, color: "#aaa", margin: "0 0 6px" }}>No se encontraron resultados</p>
            <p style={{ fontSize: 13, color: "#555", margin: 0 }}>Intenta con otro término de búsqueda</p>
          </div>
        )}

        {/* Divider */}
        {filteredVideos.length > 0 && (
          <div style={{ borderTop: "1px solid #272727", margin: "28px 0" }} />
        )}

        {/* Videos header */}
        {filteredVideos.length > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <svg width="20" height="20" fill="none" stroke="#f1f1f1" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="2" y="4" width="20" height="14" rx="2" />
              <path d="M8 20h8M12 18v2" />
            </svg>
            <span style={{ fontSize: 16, fontWeight: 600 }}>Videos</span>
          </div>
        )}

        {/* Videos grid */}
        {filteredVideos.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            {filteredVideos.map((v) => (
              <VideoCard key={v.id} v={v} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}