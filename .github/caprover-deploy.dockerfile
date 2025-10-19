# se asume que ya se hizo previamente pnpm build (ver ./workflows/caprover-deploy.yml)
FROM node:20-alpine

RUN npm i -g pnpm
WORKDIR /app

COPY ./ ./

RUN pnpm install --frozen-lockfile --prod

EXPOSE 3000

# ejecutar ;)
CMD ["pnpm", "start"]
