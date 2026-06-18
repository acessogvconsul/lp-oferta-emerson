// Captura o HTML da rota / gerado pelo servidor SSR e salva como index.html estático.
// Rodado uma única vez durante o Docker build (após `node dist/server/index.mjs &`).
import { writeFileSync } from "node:fs";

const PORT = process.env.PRERENDER_PORT || "19823";
const URL = `http://localhost:${PORT}/`;
const OUT = "dist/client/index.html";
const MAX_ATTEMPTS = 30;

for (let i = 1; i <= MAX_ATTEMPTS; i++) {
  await new Promise((r) => setTimeout(r, 1000));
  try {
    const res = await fetch(URL);
    if (res.ok) {
      writeFileSync(OUT, await res.text(), "utf-8");
      console.log(`[prerender] ${OUT} gerado com sucesso.`);
      process.exit(0);
    }
  } catch {
    // servidor ainda não pronto
  }
  console.log(`[prerender] aguardando servidor... (${i}/${MAX_ATTEMPTS})`);
}

console.error("[prerender] servidor não respondeu a tempo.");
process.exit(1);
