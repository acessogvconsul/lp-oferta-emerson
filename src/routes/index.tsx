import { createFileRoute } from "@tanstack/react-router";
import { ShieldAlert } from "lucide-react";
import { CtaRevealProvider } from "@/components/CtaReveal";
import { VideoCta } from "@/components/VideoCta";
import { VslPlayer } from "@/components/VslPlayer";
import { Atmosphere } from "@/components/Atmosphere";
import { Testimonials } from "@/components/Testimonials";


export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "Orientação Espiritual e Emocional — Atendimento Humano" },
      {
        name: "description",
        content:
          "Assista ao vídeo e entenda o que pode estar bloqueando seus caminhos, relacionamentos e paz interior.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
});


function LandingPage() {
  return (
    <CtaRevealProvider>
      <Landing />
    </CtaRevealProvider>
  );
}

function Landing() {
  return (
    <main className="relative min-h-screen text-foreground">
      <Atmosphere />

      {/* HERO + VSL */}
      <section className="relative px-5 pb-10 pt-7">
        <div className="mx-auto flex w-full max-w-md flex-col items-center text-center">
          <h1 className="animate-fade-up font-display text-[2.05rem] font-semibold leading-[1.05] text-balance text-foreground">
            Existe algo travando seu{" "}
            <span className="italic gold-shimmer">amor</span>,{" "}
            <span className="italic gold-shimmer">dinheiro</span> ou{" "}
            <span className="italic gold-shimmer">família</span> e não é coincidência.
          </h1>

          <p
            className="mt-4 max-w-[22rem] animate-fade-up text-balance text-[13.5px] leading-relaxed text-muted-foreground"
            style={{ animationDelay: "0.2s", opacity: 0 }}
          >
            Assista a mensagem abaixo e entenda o que está bloqueando os seus caminhos,{" "}
            <span className="text-gold">antes que se feche de vez</span>.
          </p>


          {/* VSL */}
          <div
            className="mt-4 w-full animate-fade-up"
            style={{ animationDelay: "0.4s", opacity: 0 }}
          >
            <VslPlayer />
          </div>

          {/* CTA do vídeo */}
          <div className="mt-3 w-full">
            <VideoCta />
          </div>

          {/* Prova social */}
          <div className="mt-8 w-full">
            <Testimonials />
          </div>

        </div>
      </section>

      <footer className="relative px-5 pb-8 pt-2">
        <div className="mx-auto flex max-w-md items-center justify-center gap-2 text-center">
          <ShieldAlert className="h-4 w-4 shrink-0 text-gold/70" strokeWidth={1.8} />
          <p className="text-[12px] leading-snug text-muted-foreground">
            Ambiente seguro. Suas informações ficam protegidas durante toda a conversa.
          </p>
        </div>
      </footer>
    </main>
  );
}
