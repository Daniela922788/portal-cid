import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 320);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Volver arriba"
      className={`fixed bottom-6 right-6 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-lg transition-all hover:bg-slate-50 hover:shadow-xl ${
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
}
