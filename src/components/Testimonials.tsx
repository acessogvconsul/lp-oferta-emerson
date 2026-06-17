import { useState } from "react";
import { Play } from "lucide-react";
import { useCtaReveal } from "./CtaReveal";

const ITEMS = [
  { name: "Carlos", city: "SP", video: "/depoimento-1.mp4", poster: "/depoimento-1.jpg" },
  { name: "Roberto", city: "MG", video: "/depoimento-2.mp4", poster: "/depoimento-2.jpg" },
  { name: "Ana",    city: "RJ", video: "/depoimento-3.mp4", poster: "/depoimento-3.jpg" },
];

export function Testimonials() {
  const [active, setActive] = useState<number | null>(null);
  const { setTestimonialPlaying } = useCtaReveal();

  const handleCardClick = (i: number) => {
    setTestimonialPlaying(false); // libera brevemente durante a troca de card
    setActive(i);
    // setTestimonialPlaying(true) é chamado pelo onPlay do novo vídeo
  };

  return (
    <>
      <p className="mb-3 text-center text-[11px] uppercase tracking-[0.2em] text-gold-soft/70">
        Quem já transformou sua vida com a orientação
      </p>

      <div className="grid grid-cols-3 gap-2">
        {ITEMS.map((item, i) => (
          <div
            key={i}
            className="relative aspect-[9/16] w-full overflow-hidden rounded-lg border border-gold/20 bg-black"
          >
            {active === i ? (
              <video
                key={i}
                src={item.video}
                poster={item.poster}
                controls
                autoPlay
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
                onPlay={() => setTestimonialPlaying(true)}
                onPause={() => setTestimonialPlaying(false)}
                onEnded={() => {
                  setTestimonialPlaying(false);
                  setActive(null);
                }}
              />
            ) : (
              <button
                type="button"
                aria-label={`Ver depoimento de ${item.name}, ${item.city}`}
                onClick={() => handleCardClick(i)}
                className="absolute inset-0 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
              >
                <img
                  src={item.poster}
                  alt={`Depoimento de ${item.name}`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 backdrop-blur-sm">
                    <Play className="ml-0.5 h-4 w-4 fill-white text-white" strokeWidth={0} />
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2 pb-2 pt-6">
                  <p className="text-left text-[11px] font-medium text-white/90">
                    {item.name}, {item.city}
                  </p>
                </div>
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
