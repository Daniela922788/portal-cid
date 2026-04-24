import { useEffect, useState } from "react";

const FONT_SCALE_KEY = "accessibility-font-scale";
const HIGH_CONTRAST_KEY = "accessibility-high-contrast";
const DEFAULT_FONT_SCALE = 1;
const MIN_FONT_SCALE = 0.9;
const MAX_FONT_SCALE = 1.3;
const FONT_SCALE_STEP = 0.1;

const clampScale = (value: number) => Math.min(MAX_FONT_SCALE, Math.max(MIN_FONT_SCALE, value));

const applyFontScale = (scale: number) => {
  if (typeof document === "undefined") return;
  document.documentElement.style.fontSize = `${Math.round(scale * 100)}%`;
};

const applyHighContrast = (enabled: boolean) => {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("high-contrast", enabled);
  document.body.classList.toggle("high-contrast", enabled);
};

export default function AccessibilityToolbar() {
  const [fontScale, setFontScale] = useState(DEFAULT_FONT_SCALE);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedScaleRaw = window.localStorage.getItem(FONT_SCALE_KEY);
    const parsedScale = Number(savedScaleRaw);
    const initialScale = Number.isFinite(parsedScale)
      ? clampScale(parsedScale)
      : DEFAULT_FONT_SCALE;

    const savedContrast = window.localStorage.getItem(HIGH_CONTRAST_KEY) === "true";

    setFontScale(initialScale);
    setHighContrast(savedContrast);
    applyFontScale(initialScale);
    applyHighContrast(savedContrast);
  }, []);

  const toggleContrast = () => {
    const nextValue = !highContrast;
    setHighContrast(nextValue);
    applyHighContrast(nextValue);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(HIGH_CONTRAST_KEY, String(nextValue));
    }
  };

  const updateScale = (delta: number) => {
    const nextScale = clampScale(fontScale + delta);
    setFontScale(nextScale);
    applyFontScale(nextScale);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(FONT_SCALE_KEY, String(nextScale));
    }
  };

  return (
    <aside
      className="fixed right-3 top-1/2 z-[70] -translate-y-1/2 rounded-2xl bg-[#0b4f8a] p-2 shadow-xl"
      aria-label="Controles de accesibilidad"
    >
      <div className="flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={toggleContrast}
          title="Cambiar contraste"
          aria-label="Cambiar contraste"
          className={`h-10 w-10 rounded-md text-base font-semibold transition hover:scale-105 ${
            highContrast
              ? "bg-[#0b4f8a] text-white ring-2 ring-white"
              : "bg-white text-[#0b4f8a] hover:bg-slate-100"
          }`}
        >
          C
        </button>

        <button
          type="button"
          onClick={() => updateScale(FONT_SCALE_STEP)}
          title="Aumentar tamano de letra"
          aria-label="Aumentar tamano de letra"
          className="h-10 w-10 rounded-md bg-white text-lg font-bold text-[#0b4f8a] transition hover:scale-105 hover:bg-slate-100"
        >
          A+
        </button>

        <button
          type="button"
          onClick={() => updateScale(-FONT_SCALE_STEP)}
          title="Reducir tamano de letra"
          aria-label="Reducir tamano de letra"
          className="h-10 w-10 rounded-md bg-white text-lg font-bold text-[#0b4f8a] transition hover:scale-105 hover:bg-slate-100"
        >
          A-
        </button>

        <a
          href="https://ticsinbarreras.mintic.gov.co/791/w3-propertyvalue-339742.html"
          target="_blank"
          rel="noopener noreferrer"
          title="Ir al Centro de relevo"
          aria-label="Ir al Centro de relevo"
          className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-xs font-semibold text-[#0b4f8a] transition hover:scale-105 hover:bg-slate-100"
        >
          CR
        </a>
      </div>
    </aside>
  );
}
