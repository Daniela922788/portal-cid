export default function ComingSoon() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "4rem 2rem",
      position: "relative",
      fontFamily: "sans-serif",
    }}>
      {/* Barra de colores superior */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", display: "flex" }}>
        <div style={{ flex: 1, background: "#0D4B56" }} />
        <div style={{ flex: 1, background: "#11B2AA" }} />
        <div style={{ flex: 1, background: "#FFDE07" }} />
        <div style={{ flex: 1, background: "#EC6910" }} />
        <div style={{ flex: 1, background: "#2D3586" }} />
      </div>

      {/* Etiqueta próximamente */}
      <p style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#EC6910", fontWeight: 500, marginBottom: "1.5rem" }}>
        Próximamente
      </p>

      {/* Título */}
      <h1 style={{ fontSize: "clamp(28px, 6vw, 42px)", fontWeight: 500, color: "#0D4B56", textAlign: "center", lineHeight: 1.15, marginBottom: "0.25rem" }}>
        Centro de Innovación
      </h1>
      <h2 style={{ fontSize: "clamp(28px, 6vw, 42px)", fontWeight: 500, color: "#11B2AA", textAlign: "center", marginBottom: "2rem" }}>
        y Desarrollo
      </h2>

      {/* Línea divisora */}
      <div style={{ width: "40px", height: "2px", background: "#FFDE07", margin: "0 auto 1.5rem" }} />

      {/* Descripción */}
      <p style={{ fontSize: "14px", color: "#555", textAlign: "center", lineHeight: 1.8, maxWidth: "440px", marginBottom: "2rem" }}>
        Desde el Centro de Innovación y Desarrollo estamos trabajando para ofrecerte la mejor experiencia. Estamos construyendo algo increíble. El portal del CID estará disponible muy pronto con todo lo que necesitas.
      </p>

      {/* Tags */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
        {[
          { label: "Noticias", color: "#0D4B56" },
          { label: "Formación", color: "#11B2AA" },
          { label: "STEM", color: "#EC6910" },
          { label: "Innovación", color: "#2D3586" },
        ].map(({ label, color }) => (
          <span key={label} style={{ fontSize: "12px", padding: "5px 12px", borderRadius: "20px", border: `1px solid ${color}`, color }}>
            {label}
          </span>
        ))}
      </div>

      {/* Ubicación */}
      <p style={{ marginTop: "2.5rem", fontSize: "11px", color: "#aaa", letterSpacing: "0.06em" }}>
        Envigado · Antioquia · Colombia
      </p>
    </div>
  );
}