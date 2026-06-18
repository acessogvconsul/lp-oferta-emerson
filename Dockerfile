FROM node:22-slim

WORKDIR /app

# Instala o Bun (package manager do projeto)
RUN npm install -g bun@latest

# Copia lockfiles antes do source para aproveitar cache de camadas
COPY package.json bun.lock bunfig.toml ./
RUN bun install

# Copia o restante do source e builda
# (public/*.mp4 excluídos via .dockerignore — vídeos vêm do R2)
COPY . .
RUN bun run build

# vite preview com @cloudflare/vite-plugin serve via Wrangler/Workerd (runtime CF)
EXPOSE 4173

ENV WRANGLER_SEND_METRICS=false \
    WRANGLER_HOME=/tmp/wrangler

CMD ["node", "node_modules/.bin/wrangler", "dev", "--local", "--ip", "0.0.0.0", "--port", "4173", "dist/server/server.js", "--assets", "dist/client"]
