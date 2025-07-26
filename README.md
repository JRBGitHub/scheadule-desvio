# Investment Schedule API

Una aplicación web moderna para la programación y gestión de operaciones de inversión, construida con Next.js y TypeScript.

## 🎯 Propósito

Esta aplicación permite a los usuarios programar y gestionar operaciones de inversión mediante:
- Programación de eventos en diferentes días de la semana
- Configuración de intervalos de tiempo personalizables
- Gestión de RICs (Reuters Instrument Codes)
- Seguimiento del estado de las programaciones

## 🔧 Pre-requisitos

- Node.js (versión recomendada: >=18)
- pnpm (gestor de paquetes)
- Git

## 🚀 Inicio Rápido

```bash
# Clonar el repositorio
git clone https://github.com/JRBGitHub/scheadule-desvio.git

# Instalar dependencias
pnpm install

# Iniciar el servidor de desarrollo
pnpm dev

# Construir para producción
pnpm build

# Iniciar en modo producción
pnpm start
```

## 🏗️ Arquitectura

### Estructura del Proyecto
```
├── app/                  # App Router de Next.js
│   ├── globals.css      # Estilos globales
│   ├── layout.tsx       # Layout principal
│   └── page.tsx         # Página principal
├── components/          # Componentes React
│   ├── schedule-form.tsx  # Formulario de programación
│   ├── schedule-list.tsx  # Lista de programaciones
│   └── ui/              # Componentes UI reutilizables
├── hooks/               # Custom hooks
├── lib/                 # Utilidades y funciones
├── public/             # Archivos estáticos
├── styles/             # Estilos adicionales
└── types/              # Definiciones de tipos TypeScript
```

## 📚 Tecnologías Principales

### Frontend
- **Next.js** (v15.2.4) - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework CSS utilitario

### UI Components
- **Radix UI** - Biblioteca de componentes accesibles
  - Accordion
  - Alert Dialog
  - Avatar
  - Calendar
  - Dialog
  - y más...
- **Next Themes** - Gestión de temas
- **Lucide React** - Iconos

### Utilidades
- **date-fns** - Manipulación de fechas
- **class-variance-authority** - Estilos condicionales
- **clsx** - Utilidad de composición de clases CSS

## 🔄 Funcionalidades Principales

### Programación de Eventos
- **Intervalos de Tiempo Disponibles:**
  - Cada 15 minutos
  - Cada 30 minutos
  - Cada hora
  - Cada 2 horas
  - Cada 4 horas
  - Diario
  - Semanal

### Gestión de Programaciones
- Creación y edición de programaciones
- Estado activo/inactivo
- Descripción opcional
- Seguimiento de fecha de creación

## 📋 Estructura de Datos

### Schedule (Programación)
```typescript
interface Schedule {
  id: string
  day: string
  time: string
  iterationTime: string
  ric: string
  description?: string
  isActive: boolean
  createdAt: Date
}
```

## 🛠️ Scripts Disponibles

- `pnpm dev` - Inicia el servidor de desarrollo
- `pnpm build` - Construye la aplicación para producción
- `pnpm start` - Inicia la aplicación en modo producción
- `pnpm lint` - Ejecuta el linter

## 🤝 Contribución

1. Fork el proyecto
2. Crea tu rama de características (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
