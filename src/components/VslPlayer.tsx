import { useEffect, useRef, useState } from "react";
import { VolumeX } from "lucide-react";
import { useCtaReveal } from "./CtaReveal";

const VSL_SRC = "https://pub-413084ab8d6949a3879e2b76a9a9d960.r2.dev/vsl.mp4";

export function VslPlayer() {
  const { startWatching, reportVideoTime, watchedFraction, testimonialPlaying } = useCtaReveal();
  const visualProgress = Math.pow(watchedFraction, 0.6) * 100;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [muted, setMuted] = useState(true);

  const handleUnmute = () => {
    setMuted(false);
    if (videoRef.current) videoRef.current.muted = false;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const startPolling = () => {
      if (pollRef.current) return;
      pollRef.current = setInterval(() => {
        const v = videoRef.current;
        if (!v) return;
        const t = v.currentTime;
        if (isFinite(t) && t > 0) reportVideoTime(t);
      }, 500);
    };

    const stopPolling = () => {
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };

    const onPlay = () => {
      startWatching();
      startPolling();
    };
    const onPause = () => stopPolling();
    const onEnded = () => {
      if (videoRef.current) reportVideoTime(videoRef.current.currentTime);
      stopPolling();
    };

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onEnded);

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onEnded);
      stopPolling();
    };
  }, [startWatching, reportVideoTime]);

  // muta a VSL enquanto um depoimento está tocando, respeitando o estado de mute do usuário
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = muted || testimonialPlaying;
  }, [muted, testimonialPlaying]);

  return (
    <div className="relative">
      {/* soft gold glow */}
      <div
        aria-hidden
        className="absolute -inset-2 rounded-[1.1rem] opacity-50 blur-2xl"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.78 0.13 75 / 0.28), transparent 70%)",
        }}
      />
      {/* hairline frame */}
      <div
        className="relative rounded-[0.9rem] p-[1px]"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.82 0.13 78 / 0.55), oklch(0.4 0.07 70 / 0.1) 45%, oklch(0.82 0.13 78 / 0.35))",
        }}
      >
        <div className="relative overflow-hidden rounded-[0.85rem] bg-black shadow-[0_40px_100px_-40px_oklch(0_0_0/0.95)]">
          <div className="relative aspect-video w-full">
            <video
              ref={videoRef}
              src={VSL_SRC}
              autoPlay
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
              style={{ pointerEvents: "none" }}
              tabIndex={-1}
            />
            {muted && (
              <button
                onClick={handleUnmute}
                className="absolute inset-0 z-20 flex items-center justify-center"
                aria-label="Ativar som"
              >
                <span
                  className="flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium"
                  style={{
                    background: "oklch(0 0 0 / 0.65)",
                    border: "1px solid oklch(0.82 0.13 78 / 0.4)",
                    color: "oklch(0.92 0.06 75)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <VolumeX size={16} />
                  Toque para ativar o som
                </span>
              </button>
            )}
            {watchedFraction > 0 && (
              <div className="absolute inset-x-0 bottom-0 z-10 h-[4px] bg-white/[0.07]">
                <div
                  className="h-full"
                  style={{
                    width: `${visualProgress}%`,
                    transition: "width 0.5s ease-out",
                    background:
                      "linear-gradient(90deg, oklch(0.7 0.08 75), oklch(0.82 0.13 78))",
                    boxShadow: "0 0 8px oklch(0.82 0.13 78 / 0.5)",
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
