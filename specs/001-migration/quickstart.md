# Quickstart: Waste Collection Point Management Migration

## Local Setup

1. **Install Dependencies**:
   ```bash
   pnpm install
   ```
2. **Database Setup**:
   ```bash
   pnpm prisma migrate dev
   pnpm prisma db seed
   ```
3. **Run Dev Server**:
   ```bash
   pnpm dev
   ```

## Docker Setup

1. **Build Image**:
   ```bash
   docker build -t ecoleta-server .
   ```
2. **Run Container**:
   ```bash
   docker run -p 3333:3333 ecoleta-server
   ```

## Verification

Run integration tests using the Given-When-Then pattern:
```bash
pnpm test
```
