# se asume que ya se hizo previamente pnpm build (ver ./.github/workflows/caprover-deploy.yml)
FROM node:20-alpine

RUN npm i -g pnpm
WORKDIR /app

# en esta app solo se usa el backend ya construido
COPY backend/ ./

RUN pnpm install --frozen-lockfile --prod

EXPOSE 3000

# ejecutar ;)
CMD ["pnpm", "start"]
