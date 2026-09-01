#!/bin/bash
# Script para iniciar el servidor Next.js standalone con todos los archivos necesarios

echo "Preparando servidor Next.js standalone..."

# 1. Verificar que existe el build
if [ ! -d ".next/standalone" ]; then
    echo "Error: No se encontro el build standalone. Ejecuta 'npm run build' primero."
    exit 1
fi

# 2. Copiar archivos estáticos
echo "Copiando archivos estaticos..."

# Copiar .next/static a standalone
if [ -d ".next/static" ]; then
    mkdir -p .next/standalone/.next
    cp -r .next/static .next/standalone/.next/static
    echo "Archivos .next/static copiados"
fi

# Copiar public a standalone
if [ -d "public" ]; then
    cp -r public .next/standalone/public
    echo "Archivos public copiados"
fi

# 3. Configurar variables de entorno
export NODE_ENV=production
if [ -z "$NEXT_PUBLIC_DIRECTUS_URL" ]; then
    export NEXT_PUBLIC_DIRECTUS_URL="https://active-re-web-back-bhgdggh3b4amhsa0.eastus-01.azurewebsites.net"
    echo "Variable NEXT_PUBLIC_DIRECTUS_URL configurada"
fi
if [ -z "$NEXT_PUBLIC_DOWNLOAD_EMAIL_ENDPOINT" ]; then
    export NEXT_PUBLIC_DOWNLOAD_EMAIL_ENDPOINT=""
    echo "Variable NEXT_PUBLIC_DOWNLOAD_EMAIL_ENDPOINT configurada"
fi

echo ""
echo "Servidor listo. Iniciando..."
echo ""

# 4. Iniciar el servidor
cd .next/standalone
exec node server.js
