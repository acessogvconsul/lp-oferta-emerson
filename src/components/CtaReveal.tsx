import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

interface CtaCtx {
  started: boolean;
  revealed: boolean;
  secondsRemaining: number;
  watchedFraction: number;
  testimonialPlaying: boolean;
  startWatching: () => void;
  pauseWatching: () => void;
  resumeWatching: () => void;
  reportVideoTime: (currentTime: number) => void;
  setTestimonialPlaying: (v: boolean) => void;
}

const REVEAL_DELAY_S = 240; // 4 minutos de tempo realmente assistido do vídeo

const Ctx = createContext<CtaCtx>({
  started: false,
  revealed: false,
  secondsRemaining: REVEAL_DELAY_S,
  watchedFraction: 0,
  testimonialPlaying: false,
  startWatching: () => {},
  pauseWatching: () => {},
  resumeWatching: () => {},
  reportVideoTime: () => {},
  setTestimonialPlaying: () => {},
});

export function CtaRevealProvider({ children }: { children: ReactNode }) {
  const [started, setStarted] = useState(false);
  const [watched, setWatched] = useState(0);
  const [testimonialPlaying, setIsTestimonialPlaying] = useState(false);

  const revealed = watched >= REVEAL_DELAY_S;
  const secondsRemaining = Math.max(0, REVEAL_DELAY_S - watched);
  const watchedFraction = Math.min(1, watched / REVEAL_DELAY_S);

  const startWatching = useCallback(() => {
    setStarted(true);
  }, []);

  const pauseWatching = useCallback(() => {
    /* noop — a contagem segue o tempo real do vídeo */
  }, []);

  const resumeWatching = useCallback(() => {
    setStarted(true);
  }, []);

  const reportVideoTime = useCallback((currentTime: number) => {
    if (!isFinite(currentTime) || currentTime < 0) return;
    setStarted(true);
    setWatched((prev) => Math.min(REVEAL_DELAY_S, Math.max(prev, currentTime)));
  }, []);

  const setTestimonialPlaying = useCallback((v: boolean) => {
    setIsTestimonialPlaying(v);
  }, []);

  return (
    <Ctx.Provider
      value={{
        started,
        revealed,
        secondsRemaining,
        watchedFraction,
        testimonialPlaying,
        startWatching,
        pauseWatching,
        resumeWatching,
        reportVideoTime,
        setTestimonialPlaying,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useCtaReveal() {
  return useContext(Ctx);
}
