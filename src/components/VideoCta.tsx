import { useEffect, useState } from "react";
import { useCtaReveal } from "./CtaReveal";

const WHATSAPP_URL =
  "https://wa.me/5575991975618?text=" +
  encodeURIComponent(
    "Pai José, vi seu vídeo e preciso da sua orientação. Pode me ouvir agora?",
  );

function trackLeadClick() {
  if (typeof window === "undefined") return;
  const w = window as unknown as { fbq?: (...args: unknown[]) => void };
  try {
    w.fbq?.("track", "Lead", { content_name: "whatsapp_unlock" });
  } catch {
    /* noop */
  }
}

function getPhaseMessage(fraction: number): string {
  if (fraction >= 0.7) return "Quase lá... continue até o final";
  if (fraction >= 0.3) return "Continue assistindo, sua orientação está sendo preparada";
  return "Assista até o fim para receber sua orientação";
}

export function VideoCta() {
  const { revealed, watchedFraction } = useCtaReveal();
  const message = getPhaseMessage(watchedFraction);

  const [displayed, setDisplayed] = useState(message);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (message === displayed) return;
    setVisible(false);
    const t = setTimeout(() => {
      setDisplayed(message);
      setVisible(true);
    }, 300);
    return () => clearTimeout(t);
  }, [message, displayed]);

  return (
    <div className="w-full text-center">
      {!revealed && (
        <p
          className="text-[13px] leading-relaxed text-gold-soft transition-opacity duration-300"
          style={{ opacity: visible ? 1 : 0 }}
        >
          {displayed}
        </p>
      )}

      {revealed && (
        <div
          className="mt-1 animate-fade-up"
          style={{ animationDuration: "0.5s", animationFillMode: "both" }}
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackLeadClick}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-whatsapp/60 bg-whatsapp px-4 py-3.5 text-white animate-pulse-soft hover:scale-[1.01] active:scale-[0.99] transition-transform"
            style={{
              boxShadow:
                "0 16px 60px -12px var(--whatsapp-glow), inset 0 1px 0 oklch(1 0 0 / 0.2)",
            }}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 fill-current" aria-hidden>
              <path d="M19.05 4.91A10 10 0 0 0 4.7 18.27L3 22l3.83-1.66a10 10 0 0 0 14.5-8.74 9.93 9.93 0 0 0-2.28-6.69Zm-7.05 15.3a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-2.27.98.78-2.22-.2-.32a8.27 8.27 0 1 1 6.17 2.89Zm4.52-6.18c-.25-.13-1.47-.72-1.7-.8-.22-.09-.39-.13-.55.12-.16.25-.63.79-.77.95-.14.16-.28.18-.53.06-.25-.13-1.05-.39-2-1.23a7.4 7.4 0 0 1-1.37-1.7c-.14-.25 0-.38.11-.5.11-.11.25-.28.37-.42.13-.14.17-.25.25-.41.08-.16.04-.31-.02-.43-.06-.13-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.74 2.74 0 0 0-.86 2.05c0 1.2.88 2.37 1 2.53.12.16 1.74 2.66 4.22 3.73a14.45 14.45 0 0 0 1.41.52 3.4 3.4 0 0 0 1.56.1c.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.3Z" />
            </svg>
            <div>
              <div className="text-[15px] font-bold uppercase tracking-[0.08em]">
                Falar agora com o Pai José
              </div>
              <div className="text-[11px] text-white/80">
                Acesso liberado — toque para continuar
              </div>
            </div>
          </a>
        </div>
      )}
    </div>
  );
}
