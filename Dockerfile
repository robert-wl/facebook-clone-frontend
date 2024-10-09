FROM node:18-alpine AS builder

WORKDIR /app

ARG VITE_ROOT_URL
ARG VITE_GRAPHQL_BACKEND_URL
ARG VITE_GRAPHQL_BACKEND_WS_URL

ENV VITE_ROOT_URL=$VITE_ROOT_URL
ENV VITE_GRAPHQL_BACKEND_URL=$VITE_GRAPHQL_BACKEND_URL
ENV VITE_GRAPHQL_BACKEND_WS_URL=$VITE_GRAPHQL_BACKEND_WS_URL

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm \
    && pnpm fetch

RUN pnpm install --prefer-offline

COPY . ./

RUN pnpm run build

FROM nginx:1.21-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /var/www/html/facebook/

EXPOSE 3000

ENTRYPOINT ["nginx","-g","daemon off;"]
