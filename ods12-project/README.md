# ReciclaFácil — ODS 12

![CI Status](https://github.com/TU-USUARIO/ods12-plataforma-reciclaje/actions/workflows/ci.yml/badge.svg?branch=develop)

Plataforma digital de consumo responsable orientada al ODS 12 de la Agenda 2030.
Permite a ciudadanos con recursos tecnológicos limitados consultar cómo separar
sus residuos correctamente.

## Stack Tecnológico

- **Framework:** Next.js 14 (App Router + SSR)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **API:** tRPC
- **Base de datos:** MongoDB Atlas
- **Despliegue:** Vercel

## Equipo

| Integrante | Rol |
|---|---|
| Jonathan Bonifacio | Líder de Proyecto / Scrum Master |
| Victor Davalos | Arquitecto UX / DevOps |
| Fabricio Cárdenas | Developer Backend |
| Arturo Ygnacio | Analista de Innovación / QA |

## Comandos

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Pruebas unitarias
npm test

# Pruebas con cobertura
npm run test:coverage

# Verificación de tipos
npm run type-check

# Build de producción
npm run build
```

## Estructura del proyecto

```
src/
├── app/           # Páginas con SSR (Next.js App Router)
│   ├── page.tsx          # Página principal
│   └── buscar/page.tsx   # Módulo crítico: buscador de residuos
├── components/    # Componentes React (client components)
└── utils/         # Utilidades puras (sin UI)
    └── residuos.ts       # Catálogo y lógica de búsqueda
tests/             # Pruebas unitarias (Jest)
.github/
├── workflows/ci.yml              # Pipeline CI/CD
└── copilot-instructions.md       # Reglas de gobernanza AIE
```

## Universidad La Salle Bajío · Innovación Tecnológica · ISSC 412 · 2026
