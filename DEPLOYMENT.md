# Guía de Despliegue - Next.js en Azure App Service 

## Opción 1: Con Docker (RECOMENDADO)

### Pasos:

1. **Modifica next.config.ts**:
   - Descomenta la línea: `output: 'standalone'`
   - Comenta o elimina: `output: 'export'`

2. **Construye la imagen Docker localmente** (opcional, para probar):
   ```bash
   docker build -t active-re-web .
   docker run -p 8080:8080 active-re-web
   ```

3. **Crea el App Service con Container**:
   ```bash
   # Crear un recurso de Container Registry (si no tienes uno)
   az acr create --name <tu-registry> --resource-group <tu-rg> --sku Basic --admin-enabled true
   
   # Construir y subir la imagen
   az acr build --registry <tu-registry> --image active-re-web:latest .
   
   # Crear App Service con la imagen
   az webapp create \
     --resource-group <tu-rg> \
     --plan <tu-plan> \
     --name <tu-app-name> \
     --deployment-container-image-name <tu-registry>.azurecr.io/active-re-web:latest
   ```

4. **Configurar variables de entorno en el App Service**:
   - Ve al Portal de Azure → App Service → Configuration
   - Agrega las variables necesarias (API URLs, etc.)

---

## Opción 2: Sin Docker (Deployment Directo)

### Pasos:

1. **Configuración de App Service**:
   ```bash
   # Crear App Service con Node.js 20
   az webapp create \
     --resource-group <tu-rg> \
     --plan <tu-plan> \
     --name <tu-app-name> \
     --runtime "NODE:20-lts"
   ```

2. **Configurar comandos de inicio**:
   - En el Portal: Configuration → General Settings → Startup Command
   - Agregar: `npm install && npm run build && npm start`
   
   O en CLI:
   ```bash
   az webapp config set \
     --resource-group <tu-rg> \
     --name <tu-app-name> \
     --startup-file "npm install && npm run build && npm start"
   ```

3. **Desplegar desde local**:
   ```bash
   # Comprimir el proyecto
   zip -r deploy.zip . -x "node_modules/*" ".git/*" ".next/*"
   
   # Desplegar
   az webapp deployment source config-zip \
     --resource-group <tu-rg> \
     --name <tu-app-name> \
     --src deploy.zip
   ```

4. **O desplegar desde GitHub**:
   ```bash
   az webapp deployment source config \
     --name <tu-app-name> \
     --resource-group <tu-rg> \
     --repo-url https://github.com/<tu-usuario>/<tu-repo> \
     --branch main \
     --manual-integration
   ```

---

## Opción 3: Con GitHub Actions

1. **Obtener el perfil de publicación**:
   ```bash
   az webapp deployment list-publishing-profiles \
     --name <tu-app-name> \
     --resource-group <tu-rg> \
     --xml > publish-profile.xml
   ```

2. **Agregar secret en GitHub**:
   - Ve a tu repositorio → Settings → Secrets → New repository secret
   - Nombre: `AZURE_WEBAPP_PUBLISH_PROFILE`
   - Valor: el contenido del archivo publish-profile.xml

3. **Crea `.github/workflows/azure-webapps-node.yml`** (ya incluido en los archivos creados)

---

## Configuración Recomendada de App Service

### Variables de Entorno (Application Settings):
```bash
az webapp config appsettings set \
  --resource-group <tu-rg> \
  --name <tu-app-name> \
  --settings \
    NODE_ENV=production \
    PORT=8080 \
    WEBSITE_NODE_DEFAULT_VERSION=20-lts
```

### Para mejor rendimiento:
- Habilita "Always On" en Configuration → General Settings
- Configura "Health check path": `/`
- Ajusta el tamaño del plan según tráfico esperado

---

## Solución de Problemas

### Ver logs:
```bash
az webapp log tail --name <tu-app-name> --resource-group <tu-rg>
```

### SSH al contenedor (si usas Docker):
```bash
az webapp ssh --name <tu-app-name> --resource-group <tu-rg>
```

### Verificar estado:
```bash
az webapp show --name <tu-app-name> --resource-group <tu-rg> --query state
```

---

## Notas Importantes

- El puerto debe ser **8080** (o usar la variable de entorno `PORT`)
- Asegúrate de que `package.json` tenga los scripts correctos
- Para producción, considera usar **Premium Plans** para mejor rendimiento
- Configura un dominio personalizado si es necesario
- Habilita HTTPS/TLS
