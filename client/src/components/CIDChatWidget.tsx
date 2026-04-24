import { useState, useRef, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { MessageCircle, X, Minimize2, Sparkles, Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLocation } from "wouter";

type Message = { role: "user" | "assistant"; content: string };
const WHATSAPP_HELP_URL = "https://wa.me/573012577662";

const hasMesaAyudaHint = (text: string) =>
  /mesa de ayuda|\/mesa-ayuda/i.test(text);

const cleanMesaAyudaHint = (text: string) =>
  text
    .replace(/Mesa de Ayuda:\s*\/mesa-ayuda/gi, "")
    .replace(/\/mesa-ayuda/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();

const cleanRouteHints = (text: string) =>
  text
    .replace(/\/?nosotros/gi, "Nosotros")
    .replace(/\s{2,}/g, " ")
    .trim();

export default function CIDChatWidget() {
  const [, setLocation] = useLocation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const chatMutation = trpc.ai.chat.useMutation({
    onSuccess: (data) => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);

      if (data.navigateTo) {
        setLocation(data.navigateTo);
      }
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Lo siento, hubo un problema al procesar tu pregunta. Por favor intenta de nuevo.",
        },
      ]);
    },
  });

  const scrollToBottom = () => {
    const el = scrollRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]"
    ) as HTMLDivElement | null;
    if (el) {
      requestAnimationFrame(() => {
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      });
    }
  };

  useEffect(() => {
    if (open) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || chatMutation.isPending) return;
    const next: Message[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    chatMutation.mutate({ messages: next });
    scrollToBottom();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const SUGGESTED = [
    "¿Qué es el CID?",
    "¿Qué cursos ofrecen?",
    "¿Cómo contactar al CID?",
    "¿Qué es la Semana STEM?",
  ];

  return (
    <>
      {/* ── Floating button ─────────────────────────────── */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar chat" : "Abrir chat con IA"}
        className="fixed bottom-6 left-6 z-[80] flex h-14 w-14 items-center justify-center rounded-full bg-[#0b4f8a] text-white shadow-xl transition hover:scale-105 hover:bg-[#0a3d6e]"
      >
        {open ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>

      {/* ── Chat panel ──────────────────────────────────── */}
      {open && (
        <div className="fixed bottom-24 left-6 z-[80] flex w-[340px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:w-[380px]">
          {/* Header */}
          <div className="flex items-center justify-between bg-[#0b4f8a] px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-bold leading-tight">Asistente CID</p>
                <p className="text-[11px] text-white/70">Inteligencia Artificial</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Minimizar chat"
              className="rounded-lg p-1.5 transition hover:bg-white/20"
            >
              <Minimize2 className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1">
            {messages.length === 0 ? (
              <div className="flex flex-col gap-4 p-4">
                <div className="flex flex-col items-center gap-2 py-4 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0b4f8a]/10">
                    <Sparkles className="h-6 w-6 text-[#0b4f8a]" />
                  </div>
                  <p className="text-sm font-semibold text-slate-800">
                    ¡Hola! Soy el Asistente del CID
                  </p>
                  <p className="text-xs text-slate-500">
                    Pregúntame lo que quieras sobre el Centro de Innovación Digital de Envigado.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {SUGGESTED.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        const next: Message[] = [{ role: "user", content: s }];
                        setMessages(next);
                        chatMutation.mutate({ messages: next });
                      }}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-left text-xs font-medium text-slate-700 transition hover:border-[#0b4f8a]/40 hover:bg-[#0b4f8a]/5 hover:text-[#0b4f8a]"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <ScrollArea className="h-[300px]">
                <div className="flex flex-col gap-3 p-4">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.role === "assistant" && (
                        <div className="mr-2 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0b4f8a]/10">
                          <Sparkles className="h-3 w-3 text-[#0b4f8a]" />
                        </div>
                      )}
                      <div
                        className={`max-w-[82%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "rounded-tr-sm bg-[#0b4f8a] text-white"
                            : "rounded-tl-sm bg-slate-100 text-slate-800"
                        }`}
                      >
                        {msg.role === "assistant" && hasMesaAyudaHint(msg.content) ? (
                          <>
                            <p className="whitespace-pre-line">{cleanRouteHints(cleanMesaAyudaHint(msg.content))}</p>
                            <a
                              href={WHATSAPP_HELP_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2 inline-block font-bold text-blue-700 underline decoration-2 underline-offset-2 hover:text-blue-800"
                            >
                              Comunicate
                            </a>
                          </>
                        ) : (
                          <p className="whitespace-pre-line">{cleanRouteHints(msg.content)}</p>
                        )}
                      </div>
                    </div>
                  ))}
                  {chatMutation.isPending && (
                    <div className="flex justify-start">
                      <div className="mr-2 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0b4f8a]/10">
                        <Sparkles className="h-3 w-3 text-[#0b4f8a]" />
                      </div>
                      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-slate-100 px-4 py-3">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:0ms]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-slate-100 p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-end gap-2"
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribe tu pregunta..."
                rows={1}
                className="flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#0b4f8a]/50 focus:ring-2 focus:ring-[#0b4f8a]/20"
                style={{ maxHeight: "96px" }}
                onInput={(e) => {
                  const t = e.target as HTMLTextAreaElement;
                  t.style.height = "auto";
                  t.style.height = `${Math.min(t.scrollHeight, 96)}px`;
                }}
              />
              <button
                type="submit"
                disabled={!input.trim() || chatMutation.isPending}
                aria-label="Enviar mensaje"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0b4f8a] text-white shadow-sm transition hover:bg-[#0a3d6e] disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <p className="mt-1.5 text-center text-[10px] text-slate-400">
              Powered by Gemini · CID Envigado
            </p>
          </div>
        </div>
      )}
    </>
  );
}
