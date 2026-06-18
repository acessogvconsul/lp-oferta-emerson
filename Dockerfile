# ── Stage 1: build ────────────────────────────────────────────────────────────
FROM node:22-slim AS builder

WORKDIR /app

RUN npm install -g bun@latest

COPY package.json bun.lock bunfig.toml ./
RUN bun install

# (public/*.mp4 excluídos via .dockerignore — vídeos vêm do R2)
COPY . .

# Gera dist/client/ (assets) + dist/server/index.mjs (servidor SSR self-contained)
RUN bun run build

# Inicia o servidor SSR em background e usa scripts/prerender.mjs para capturar
# a saída de / como HTML estático em dist/client/index.html.
# Porta 19823 evita conflito com serviços externos durante o build.
RUN PORT=19823 node dist/server/index.mjs & PRERENDER_PORT=19823 node scripts/prerender.mjs

# ── Stage 2: serve ────────────────────────────────────────────────────────────
FROM nginx:alpine

COPY --from=builder /app/dist/client /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
