# Stage 1: Base
FROM node:20-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Stage 2: Dependencies
FROM base AS deps

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Stage 3: Build
FROM base AS build

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm dlx prisma generate
RUN pnpm build

# Stage 4: Production Dependencies (Pruned)
FROM base AS prod-deps

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile
# Re-run prisma generate for the production client
COPY prisma ./prisma
RUN pnpm dlx prisma generate

# Stage 5: Release
FROM node:20-alpine AS release

WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Create a non-root user for security
RUN addgroup -S nodejs && adduser -S nodejs -G nodejs

# Copy only necessary files
COPY --from=build --chown=nodejs:nodejs /app/dist ./dist
COPY --from=prod-deps --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=nodejs:nodejs /app/prisma ./prisma
COPY --from=build --chown=nodejs:nodejs /app/package.json ./package.json

USER nodejs

EXPOSE 3333

CMD ["node", "dist/server.js"]
