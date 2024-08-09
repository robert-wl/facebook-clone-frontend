FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm i
RUN pnpm i typescript --save-dev

COPY . ./

ARG VITE_GRAPHQL_BACKEND_URL
ARG VITE_GRAPHQL_BACKEND_WS_URL

RUN echo "VITE_ROOT_URL=$VITE_ROOT_URL" > .env
RUN echo "VITE_GRAPHQL_BACKEND_URL=$VITE_GRAPHQL_BACKEND_URL" >> .env
RUN echo "VITE_GRAPHQL_BACKEND_WS_URL=$VITE_GRAPHQL_BACKEND_WS_URL" >> .env

RUN pnpm run build

EXPOSE 4173

CMD ["pnpm", "preview"]
