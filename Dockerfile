# Multi-stage hardened build for Node.js Docs-as-Code Wiki Portal
FROM node:18-alpine AS builder

WORKDIR /app
COPY app/package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS runner

WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY app/ .

EXPOSE 3000

USER node
CMD ["npm", "start"]
