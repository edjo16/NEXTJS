# Etapa 1: Construcción
FROM node:20-alpine AS builder

WORKDIR /app

# Argumentos de construcción
ARG NEXT_PUBLIC_DIRECTUS_URL=https://active-re-web-back-bhgdggh3b4amhsa0.eastus-01.azurewebsites.net
ENV NEXT_PUBLIC_DIRECTUS_URL=${NEXT_PUBLIC_DIRECTUS_URL}
ARG NEXT_PUBLIC_DOWNLOAD_EMAIL_ENDPOINT
ENV NEXT_PUBLIC_DOWNLOAD_EMAIL_ENDPOINT=${NEXT_PUBLIC_DOWNLOAD_EMAIL_ENDPOINT}

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el resto del código
COPY . .

# Construir la aplicación Next.js
# NODE_TLS_REJECT_UNAUTHORIZED=0 is scoped to this build step only — needed because
# the backend uses a self-signed cert chain and generateStaticParams/SSG fetches run at build time.
RUN NODE_TLS_REJECT_UNAUTHORIZED=0 npm run build

# Etapa 2: Producción
FROM node:20-alpine AS runner

WORKDIR /app
ARG NEXT_PUBLIC_DIRECTUS_URL
ENV NEXT_PUBLIC_DIRECTUS_URL=NEXT_PUBLIC_DIRECTUS_URL
# Variables de entorno de producción
ENV NODE_ENV=production
ENV PORT=8080

# Crear usuario no-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar archivos necesarios desde builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Cambiar permisos
RUN chown -R nextjs:nodejs /app

# Cambiar a usuario no-root
USER nextjs

# Exponer puerto
EXPOSE 8080

# Comando de inicio
# CMD ["node", "server.js"]
CMD ["node", "server.js"]