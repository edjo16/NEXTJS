#!/bin/sh

# Script de inicio para Azure App Service (sin Docker)

# Instalar dependencias si no existen
if [ ! -d "node_modules" ]; then
  echo "Instalando dependencias..."
  npm ci --production=false
fi

# Construir la aplicación
echo "Construyendo la aplicación..."
npm run build

# Iniciar el servidor
echo "Iniciando Next.js..."
npm start
