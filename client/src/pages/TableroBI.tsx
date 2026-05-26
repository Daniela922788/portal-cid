import { useState } from "react";

export default function TableroBI() {
  const [cargando, setCargando] = useState(true);

  return (
    <div style={{ minHeight: "100vh", background: "#f8f8f7", fontFamily: "sans-serif" }}>
      {/* Header */}
      <div style={{
        background: "#fff",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        padding: "1.5rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
            <div style={{
              width: "32px", height: "32px", borderRadius: "8px",
              background: "#0D4B56", display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </div>
            <h1 style={{ margin: 0, fontSize: "18px", fontWeight: 600, color: "#0D4B56" }}>
              Tablero de Indicadores
            </h1>
          </div>
          <p style={{ margin: 0, fontSize: "13px", color: "#858481" }}>
            Centro de Innovación y Desarrollo · Envigado
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            width: "8px", height: "8px", borderRadius: "50%",
            background: cargando ? "#FFDE07" : "#11B2AA",
            boxShadow: cargando ? "0 0 0 3px rgba(255,222,7,0.2)" : "0 0 0 3px rgba(17,178,170,0.2)",
          }} />
          <span style={{ fontSize: "12px", color: "#858481" }}>
            {cargando ? "Cargando tablero..." : "Tablero activo"}
          </span>
        </div>
      </div>

      {/* Barra de colores */}
      <div style={{ display: "flex", height: "3px" }}>
        <div style={{ flex: 2, background: "#0D4B56" }} />
        <div style={{ flex: 1, background: "#11B2AA" }} />
        <div style={{ flex: 1, background: "#FFDE07" }} />
        <div style={{ flex: 1, background: "#EC6910" }} />
        <div style={{ flex: 1, background: "#2D3586" }} />
      </div>

      {/* Contenido */}
      <div style={{ padding: "2rem", maxWidth: "1400px", margin: "0 auto" }}>

        {/* Info card */}
        <div style={{
          background: "#fff",
          borderRadius: "12px",
          border: "1px solid rgba(0,0,0,0.06)",
          padding: "1rem 1.5rem",
          marginBottom: "1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#11B2AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p style={{ margin: 0, fontSize: "13px", color: "#5e5e5b" }}>
            Puedes interactuar con el tablero directamente — filtra, explora y navega entre las visualizaciones.
          </p>
        </div>

        {/* iframe container */}
        <div style={{
          background: "#fff",
          borderRadius: "16px",
          border: "1px solid rgba(0,0,0,0.06)",
          overflow: "hidden",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          position: "relative",
        }}>
          {/* Loading overlay */}
          {cargando && (
            <div style={{
              position: "absolute", inset: 0, background: "#fff",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              gap: "16px", zIndex: 10,
            }}>
              <div style={{
                width: "40px", height: "40px", borderRadius: "50%",
                border: "3px solid rgba(13,75,86,0.1)",
                borderTopColor: "#0D4B56",
                animation: "spin 0.8s linear infinite",
              }} />
              <p style={{ margin: 0, fontSize: "14px", color: "#858481" }}>Cargando tablero de Power BI...</p>
            </div>
          )}

          <iframe
            title="Tablero 2.0 CID"
            src="https://app.powerbi.com/reportEmbed?reportId=1d0bdab8-480c-4f60-a82b-90a013a9e63c&autoAuth=true&ctid=3b7df3ce-cf6b-4d94-8057-cb101dd242eb&actionBarEnabled=true"
            frameBorder={0}
            allowFullScreen
            onLoad={() => setCargando(false)}
            style={{
              width: "100%",
              height: "calc(100vh - 220px)",
              minHeight: "600px",
              display: "block",
              border: "none",
            }}
          />
        </div>

        {/* Footer */}
        <p style={{ textAlign: "center", marginTop: "1rem", fontSize: "12px", color: "#b9b9b7" }}>
          Datos proporcionados por Microsoft Power BI · Centro de Innovación y Desarrollo
        </p>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
