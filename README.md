# Active Re - Web Frontend

Sitio web corporativo de Active Re construido con Next.js 14, TypeScript y Tailwind CSS.

## 📋 Tabla de Contenidos

- [Tecnologías](#tecnologías)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Desarrollo Local](#desarrollo-local)
- [Build y Producción](#build-y-producción)
- [Docker](#docker)
- [Deployment a Azure](#deployment-a-azure)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Variables de Entorno](#variables-de-entorno)
- [Scripts Disponibles](#scripts-disponibles)

## 🚀 Tecnologías

- **Framework:** Next.js 15.1.4 (App Router)
- **Lenguaje:** TypeScript 5.7
- **Runtime:** React 19.0
- **Estilos:** Tailwind CSS
- **Animaciones:** Framer Motion
- **CMS:** Directus
- **Deployment:** Azure App Service + Docker
- **CI/CD:** Azure Pipelines
- **Dev Server:** Turbopack (por defecto)

## 📦 Requisitos Previos

- Node.js 20.x o superior
- npm o yarn
- Docker (para producción local o deployment)
- Git

## 🔧 Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone <tu-repositorio>
   cd Active_Re_-_Next_Front
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   
   Crear archivo `.env.local` en la raíz del proyecto:
   ```bash
   NEXT_PUBLIC_DIRECTUS_URL=https://active-re-web-back-bhgdggh3b4amhsa0.eastus-01.azurewebsites.net
   ```

## 💻 Desarrollo Local

### Modo de desarrollo estándar:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Hot Reload
El servidor de desarrollo incluye hot reload automático. Los cambios en archivos se reflejan instantáneamente.

### Debugging
- VS Code: Usa la configuración de debug incluida
- Chrome DevTools: Abre las herramientas de desarrollo del navegador

## 🏗️ Build y Producción

### Build Local (Standalone)

```bash
# 1. Construir la aplicación
npm run build

# 2. Iniciar en modo producción (Windows)
npm run start:standalone

# 2. O iniciar en modo producción (Linux/Mac)
./start-standalone.sh
```

El build standalone incluye:
- Servidor Node.js optimizado
- Archivos estáticos pre-compilados
- Sin necesidad de `node_modules` completo

### Build Tradicional

```bash
# Build
npm run build

# Start
npm start
```

Abre [http://localhost:3000](http://localhost:3000)

## 🐳 Docker

### Construcción de la imagen

```bash
# Build de la imagen
docker build -t active-re-web .

# Con argumentos de construcción
docker build \
  --build-arg NEXT_PUBLIC_DIRECTUS_URL=https://tu-backend.com \
  -t active-re-web .
```

### Ejecutar el contenedor

```bash
# Ejecución básica
docker run -p 8080:8080 active-re-web

# Con variables de entorno
docker run \
  -p 8080:8080 \
  -e NEXT_PUBLIC_DIRECTUS_URL=https://tu-backend.com \
  -e NODE_ENV=production \
  -e TYPEENV=production \
  active-re-web
```

Abre [http://localhost:8080](http://localhost:8080)

### Docker Multi-stage Build

El Dockerfile utiliza un build multi-stage:
1. **Builder stage:** Instala dependencias y construye la app
2. **Runner stage:** Imagen final optimizada solo con archivos necesarios

Beneficios:
- Imagen final más pequeña (~200MB vs ~1GB)
- Más seguro (usuario no-root)
- Mejor rendimiento

## ☁️ Deployment a Azure

### Opción 1: Azure Pipelines (RECOMENDADO)

El proyecto incluye configuración de Azure Pipelines en `azure-static-web-apps-gentle-cliff-0f6504410.yml`

**Proceso automático:**
1. Push a rama `main`
2. Pipeline se ejecuta automáticamente
3. Build de la aplicación
4. Deploy a Azure App Service

**Configuración necesaria en Azure DevOps:**
- Service Connection: `web_front_connection`
- App Service: `active-re-next-web-front`
- Variable: `envDirectusUrl`

### Opción 2: Docker Manual a Azure

```bash
# 1. Login a Azure
az login

# 2. Build y push a Azure Container Registry (si lo usas)
az acr login --name <tu-registry>
docker build -t <tu-registry>.azurecr.io/active-re-web:latest .
docker push <tu-registry>.azurecr.io/active-re-web:latest

# 3. Deploy a App Service
az webapp config container set \
  --name active-re-next-web-front \
  --resource-group <tu-resource-group> \
  --docker-custom-image-name <tu-registry>.azurecr.io/active-re-web:latest
```

### Opción 3: Deploy Directo (Sin Docker)

```bash
# 1. Build local
npm run build

# 2. Comprimir archivos standalone
zip -r deploy.zip .next/standalone .next/static public

# 3. Deploy a Azure
az webapp deployment source config-zip \
  --resource-group <tu-resource-group> \
  --name active-re-next-web-front \
  --src deploy.zip
```

### Variables de Entorno en Azure

Configurar en Azure Portal o con CLI:

```bash
az webapp config appsettings set \
  --name active-re-next-web-front \
  --resource-group <tu-resource-group> \
  --settings \
    NODE_ENV=production \
    TYPEENV=production \
    NEXT_PUBLIC_DIRECTUS_URL=https://tu-backend.com \
    WEBSITES_PORT=8080
```

**IMPORTANTE:** 
- `TYPEENV=production` es necesario para activar HSTS (seguridad)
- `WEBSITES_PORT=8080` es requerido por Azure App Service

## 📁 Estructura del Proyecto

```
Active_Re_-_Next_Front/
├── app/                      # App Router de Next.js
│   ├── news/                # Página de noticias
│   │   ├── page.tsx        # Server Component
│   │   └── NewsListClient.tsx  # Client Component
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Página de inicio
├── components/              # Componentes reutilizables
│   └── common/             # Componentes comunes
├── context/                 # Context API de React
├── hooks/                   # Custom hooks
├── lib/                     # Utilidades y configuraciones
│   └── directus.ts         # Cliente de Directus
├── public/                  # Archivos estáticos
├── styles/                  # Estilos globales
├── types/                   # Definiciones de TypeScript
├── utils/                   # Funciones auxiliares
├── docs/                    # Documentación
│   └── SECURITY-HEADERS.md # Documentación de seguridad
├── Dockerfile              # Configuración de Docker
├── next.config.ts          # Configuración de Next.js
├── tailwind.config.js      # Configuración de Tailwind
├── tsconfig.json           # Configuración de TypeScript
├── .env.local              # Variables de entorno (no commitear)
└── package.json            # Dependencias y scripts
```


## 🔐 Variables de Entorno

### Desarrollo (`.env.local`)

```bash
NEXT_PUBLIC_DIRECTUS_URL=https://active-re-web-back-bhgdggh3b4amhsa0.eastus-01.azurewebsites.net
```

### Producción (Azure App Service)

```bash
NODE_ENV=production
TYPEENV=production
NEXT_PUBLIC_DIRECTUS_URL=https://active-re-web-back-bhgdggh3b4amhsa0.eastus-01.azurewebsites.net
WEBSITES_PORT=8080
```

**Nota:** Variables que empiezan con `NEXT_PUBLIC_` son públicas y se incluyen en el bundle del cliente.

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo (puerto 3000)

# Build
npm run build            # Build de producción
npm run build:static     # Build estático (experimental)

# Producción
npm start                # Servidor de producción estándar
npm run start:standalone # Servidor standalone (Windows)
./start-standalone.sh    # Servidor standalone (Linux/Mac)

# Calidad de código
npm run lint             # ESLint
```

## 🛡️ Seguridad

El proyecto incluye headers de seguridad configurados en `next.config.ts`:

- **HSTS** (HTTP Strict Transport Security)
- **X-Frame-Options:** DENY
- **X-Content-Type-Options:** nosniff
- **Referrer-Policy:** no-referrer
- **X-XSS-Protection:** Activado

Ver `docs/SECURITY-HEADERS.md` para más detalles.

## 🐛 Troubleshooting

### Problema: Build falla

```bash
# Limpiar cache y reinstalar
rm -rf .next node_modules
npm install
npm run build
```

### Problema: Puerto en uso

```bash
# Cambiar puerto en desarrollo
PORT=3001 npm run dev
```

### Problema: Docker no inicia

```bash
# Verificar logs
docker logs <container-id>

# Verificar puerto
docker ps -a
```

## 📞 Soporte

Para más información consulta:
- `DEPLOYMENT.md` - Guía detallada de deployment
- `docs/SECURITY-HEADERS.md` - Configuración de seguridad

## 📝 Licencia

Proyecto privado de Active Re.