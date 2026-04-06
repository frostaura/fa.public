FROM node:22-alpine AS build
WORKDIR /app

ARG VITE_API_BASE_URL=/api
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

COPY package.json package-lock.json ./
COPY tsconfig.json tsconfig.node.json vite.config.ts index.html ./
COPY src/web ./src/web

RUN npm ci
RUN npm run build:web

FROM nginx:1.29-alpine AS runtime
WORKDIR /usr/share/nginx/html

COPY src/web/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist ./

EXPOSE 80
