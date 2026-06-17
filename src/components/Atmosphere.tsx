import silhouette from "@/assets/silhouette.webp";
import grain from "@/assets/grain.webp";

/**
 * Lightweight cinematic background. Single static silhouette + grain layer
 * over a CSS gradient. Animated layers removed to cut paint cost on mobile.
 */
export function Atmosphere() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% 0%, oklch(0.22 0.08 18) 0%, oklch(0.12 0.02 20) 55%, oklch(0.06 0.005 20) 100%)",
        }}
      />
      {/* Side silhouette */}
      <div
        className="absolute -right-24 top-8 h-[70vh] w-[80vw] bg-contain bg-right bg-no-repeat opacity-[0.18] mix-blend-screen"
        style={{ backgroundImage: `url(${silhouette})` }}
      />
      {/* Static grain */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url(${grain})`,
          backgroundSize: "cover",
          mixBlendMode: "screen",
        }}
      />
      {/* Soft top glow */}
      <div
        className="absolute inset-x-0 top-0 h-64 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, oklch(0.78 0.13 75 / 0.25) 0%, transparent 70%)",
        }}
      />
      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, oklch(0.05 0.005 20 / 0.9) 100%)",
        }}
      />
    </div>
  );
}
