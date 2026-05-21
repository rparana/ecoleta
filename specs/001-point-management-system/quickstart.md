# Quickstart: Waste Collection Point Management

## Prerequisites
- Node.js 18+
- pnpm
- Prisma CLI (`pnpm dlx prisma`)

## Setup
1. **Install dependencies**:
   ```bash
   pnpm install
   ```
2. **Setup Database**:
   ```bash
   pnpm dlx prisma migrate dev --name init
   ```
3. **Seed Items**:
   ```bash
   pnpm dlx prisma db seed
   ```

## Development
1. **Start server**:
   ```bash
   pnpm dev
   ```
2. **Access API**: `http://localhost:3333`

## Key Commands
- `pnpm dlx prisma studio`: Visualize data in a browser.
- `pnpm dlx prisma generate`: Update Prisma Client after schema changes.
- `pnpm test`: Run Jest tests.
