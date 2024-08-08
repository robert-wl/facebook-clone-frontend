FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm i

RUN pnpm i typescript --save-dev

COPY . ./

RUN pnpm run build

EXPOSE 4173

CMD ["pnpm", "preview"]
