# =============================
# 1. Build Stage
# =============================
FROM node:23-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json first for caching
COPY package*.json ./

# Install dependencies (including devDependencies for build process)
RUN npm ci --no-cache

# Copy source files
COPY . .

# Build NestJS application
RUN npm run build

# Remove devDependencies to reduce final image size
RUN npm prune --production

# Download grpc_health_probe binary
RUN wget -O /bin/grpc_health_probe https://github.com/grpc-ecosystem/grpc-health-probe/releases/latest/download/grpc_health_probe-linux-amd64 \
  && chmod +x /bin/grpc_health_probe

# =============================
# 2. Final Runtime Stage
# =============================
FROM node:23-alpine AS runtime

WORKDIR /app

# Set non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Set production environment
ENV HOST=0.0.0.0
ENV PORT=3000

# Copy built app and production dependencies
COPY --from=builder /bin/grpc_health_probe /bin/grpc_health_probe
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json ./

# Expose application port
EXPOSE 3000

# Set default command
CMD ["node", "dist/main.js"]
