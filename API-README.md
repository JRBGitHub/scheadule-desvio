# Investment Schedule Alert API Documentation

## 📌 Descripción General
API RESTful para la gestión de schedules (programaciones) de alertas para instrumentos financieros. Permite crear, consultar, actualizar y eliminar configuraciones de alertas basadas en códigos RIC (Reuters Instrument Codes) con frecuencias personalizables.

## 🌐 Servidores Disponibles
- Producción: `https://api.investment-alerts.com/v1`
- Staging: `https://staging-api.investment-alerts.com/v1`
- Desarrollo: `http://localhost:3000/v1`

## 🔐 Autenticación
La API utiliza autenticación JWT (JSON Web Token)
```http
Authorization: Bearer <tu_token>
```

## 📋 Endpoints Principales

### Schedules

#### 1. Listar Schedules
```http
GET /schedules
```
**Parámetros de Query:**
- `page`: Número de página (default: 1)
- `limit`: Elementos por página (1-100, default: 10)
- `isActive`: Filtrar por estado (boolean)
- `ric`: Filtrar por código RIC
- `day`: Filtrar por día (Lunes-Domingo)

#### 2. Crear Schedule
```http
POST /schedules
```
**Ejemplo de Payload:**
```json
{
  "day": "Lunes",
  "time": "09:30",
  "iterationTime": "1h",
  "ric": "AAPL.O",
  "description": "Alertas para Apple Inc."
}
```

#### 3. Obtener Schedule por ID
```http
GET /schedules/{id}
```

#### 4. Actualizar Schedule
```http
PUT /schedules/{id}
```

#### 5. Actualización Parcial
```http
PATCH /schedules/{id}
```

#### 6. Eliminar Schedule
```http
DELETE /schedules/{id}
```

#### 7. Activar/Desactivar Schedule
```http
PATCH /schedules/{id}/toggle
```

#### 8. Eliminación Masiva
```http
DELETE /schedules/bulk
```
**Payload:**
```json
{
  "ids": ["uuid1", "uuid2", "uuid3"]
}
```

### Instrumentos Financieros

#### 1. Validar RIC
```http
POST /instruments/validate
```
**Payload:**
```json
{
  "ric": "AAPL.O"
}
```

#### 2. Búsqueda de Instrumentos
```http
GET /instruments/search?query=AAPL
```

### Alertas

#### 1. Historial de Alertas
```http
GET /alerts
```
**Parámetros de Query:**
- `scheduleId`: Filtrar por ID de schedule
- `ric`: Filtrar por RIC
- `startDate`: Fecha inicio
- `endDate`: Fecha fin
- `page`: Número de página
- `limit`: Elementos por página

### Estadísticas

#### 1. Estadísticas de Schedules
```http
GET /schedules/stats
```

## 📊 Modelos de Datos

### Schedule
```typescript
{
  id: string (UUID)
  day: "Lunes" | "Martes" | "Miércoles" | "Jueves" | "Viernes" | "Sábado" | "Domingo"
  time: string (HH:MM)
  iterationTime: "15min" | "30min" | "1h" | "2h" | "4h" | "daily" | "weekly"
  ric: string
  description?: string
  isActive: boolean
  createdAt: string (ISO 8601)
  updatedAt: string (ISO 8601)
  lastExecuted?: string (ISO 8601)
  nextExecution?: string (ISO 8601)
}
```

### Instrument
```typescript
{
  ric: string
  name: string
  exchange: string
  currency: string
  type: string
  sector: string
}
```

### Alert
```typescript
{
  id: string (UUID)
  scheduleId: string (UUID)
  ric: string
  message: string
  data: object
  sentAt: string (ISO 8601)
  status: "sent" | "failed" | "pending"
}
```

## 🔄 Respuestas Comunes

### Éxito
```json
{
  "success": true,
  "data": {},
  "message": "Operación exitosa"
}
```

### Error
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Descripción del error",
    "details": [
      {
        "field": "campo",
        "message": "mensaje de error"
      }
    ]
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## 📝 Paginación
Las respuestas paginadas incluyen:
```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## ⚡ Frecuencias Disponibles
- `15min`: Cada 15 minutos
- `30min`: Cada 30 minutos
- `1h`: Cada hora
- `2h`: Cada 2 horas
- `4h`: Cada 4 horas
- `daily`: Diario
- `weekly`: Semanal

## 🛠️ Herramientas para Visualizar y Probar la API

### Swagger UI
Para probar la API usando Swagger UI:

1. Accede a la URL de Swagger UI (típicamente `/swagger` o `/api-docs`)
2. Haz clic en el botón "Authorize" e ingresa tu token JWT
3. Selecciona el endpoint que deseas probar
4. Completa los parámetros requeridos
5. Haz clic en "Execute" para realizar la llamada

### Importar el archivo YAML

Puedes importar el archivo `investment-schedule-api.yaml` en las siguientes herramientas:

#### 1. Postman
1. Abre Postman
2. Haz clic en "Import"
3. Arrastra el archivo YAML o selecciónalo desde tu sistema
4. Postman creará automáticamente una colección con todos los endpoints

#### 2. Insomnia
1. Abre Insomnia
2. Haz clic en "Create" → "Import From" → "File"
3. Selecciona el archivo YAML
4. Todos los endpoints se importarán como una nueva colección

#### 3. SwaggerHub
1. Ve a [SwaggerHub](https://app.swaggerhub.com)
2. Crea una cuenta o inicia sesión
3. Haz clic en "Create New" → "Import and Document API"
4. Sube el archivo YAML
5. Podrás visualizar, editar y compartir la documentación

#### 4. Stoplight Studio
1. Descarga [Stoplight Studio](https://stoplight.io/studio)
2. Abre la aplicación
3. Crea un nuevo proyecto e importa el archivo YAML
4. Proporciona una interfaz visual para editar y probar la API

#### 5. Visual Studio Code
1. Instala la extensión "Swagger Viewer"
   ```bash
   ext install Swagger.swagger-viewer
   ```
2. Abre el archivo YAML
3. Presiona `Shift + Alt + P`
4. Selecciona "Preview Swagger"

Cada una de estas herramientas ofrece diferentes funcionalidades:
- **Postman/Insomnia**: Ideales para pruebas y desarrollo
- **SwaggerHub**: Mejor para documentación y colaboración
- **Stoplight Studio**: Excelente para diseño y modelado de APIs
- **VS Code + Swagger Viewer**: Perfecta para desarrollo local

## ⚠️ Códigos de Error Comunes
- `400`: Bad Request - Parámetros inválidos
- `401`: Unauthorized - Token inválido o expirado
- `404`: Not Found - Recurso no encontrado
- `422`: Validation Error - Datos de entrada inválidos
- `500`: Internal Server Error - Error interno del servidor

## 🔍 Ejemplos de Uso

### Crear un Nuevo Schedule
```bash
curl -X POST https://api.investment-alerts.com/v1/schedules \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "day": "Lunes",
    "time": "09:30",
    "iterationTime": "1h",
    "ric": "AAPL.O",
    "description": "Alertas para Apple Inc."
  }'
```

### Buscar Schedules Activos
```bash
curl -X GET "https://api.investment-alerts.com/v1/schedules?isActive=true" \
  -H "Authorization: Bearer <token>"
```

## 📈 Límites y Consideraciones
- Máximo 50 IDs para eliminación masiva
- Límite de 100 elementos por página
- Longitud máxima de descripción: 500 caracteres
- Los RICs deben seguir el patrón: ^[A-Z0-9]+\.[A-Z]+$
