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

# Nitro node-server: servidor Node.js HTTP nativo, tudo bundlado em dist/server/
EXPOSE 3000

ENV PORT=3000

CMD ["node", "dist/server/index.mjs"]
