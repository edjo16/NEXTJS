#!/usr/bin/env pwsh
# Script para iniciar el servidor Next.js standalone con todos los archivos necesarios

Write-Host "Preparando servidor Next.js standalone..." -ForegroundColor Cyan

# 1. Verificar que existe el build
if (-not (Test-Path ".next/standalone")) {
    Write-Host "Error: No se encontro el build standalone. Ejecuta 'npm run build' primero." -ForegroundColor Red
    exit 1
}

# 2. Copiar archivos estáticos
Write-Host "Copiando archivos estaticos..." -ForegroundColor Yellow

# Copiar .next/static a standalone
if (Test-Path ".next/static") {
    if (-not (Test-Path ".next/standalone/.next")) {
        New-Item -ItemType Directory -Path ".next/standalone/.next" -Force | Out-Null
    }
    Copy-Item -Path ".next/static" -Destination ".next/standalone/.next/static" -Recurse -Force
    Write-Host "Archivos .next/static copiados" -ForegroundColor Green
}

# Copiar public a standalone
if (Test-Path "public") {
    Copy-Item -Path "public" -Destination ".next/standalone/public" -Recurse -Force
    Write-Host "Archivos public copiados" -ForegroundColor Green
}

# 3. Configurar variables de entorno
$env:NODE_ENV = "production"
if (-not $env:NEXT_PUBLIC_DIRECTUS_URL) {
    $env:NEXT_PUBLIC_DIRECTUS_URL = "https://active-re-web-back-bhgdggh3b4amhsa0.eastus-01.azurewebsites.net"
    Write-Host "Variable NEXT_PUBLIC_DIRECTUS_URL configurada" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Servidor listo. Iniciando..." -ForegroundColor Green
Write-Host ""

# 4. Iniciar el servidor
Set-Location .next/standalone
node server.js
