FROM node:22-alpine AS builder

WORKDIR /app

COPY . .

RUN npm i && npm run build


FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/dist /app

EXPOSE 80

RUN npm i http-server

CMD ["npx", "http-server", "/app", "--host", "--port", "80"]
