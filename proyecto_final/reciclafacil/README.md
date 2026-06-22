# ReciclaFácil — ODS 12

![CI Status](https://github.com/equipo-ods12/reciclafacil/actions/workflows/ci.yml/badge.svg?branch=develop)

Plataforma digital de consumo responsable orientada al ODS 12 de la Agenda 2030. Permite a ciudadanos con recursos tecnológicos limitados consultar cómo separar sus residuos correctamente.

## Stack Tecnológico

- **Framework:** Next.js 14 (App Router + SSR)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **API:** tRPC
- **Base de datos (planeada):** MongoDB Atlas
- **Despliegue (planeado):** Vercel

## Equipo

| Integrante | Rol |
|---|---|
| Jonathan Abraham Bonifacio Moreno | Líder de Proyecto |
| Victor Sebastien Davalos Leon | Arquitecto UX / DevOps |
| Fabricio Cárdenas Araiza | Developer Backend |
| Arturo Ygnacio Del Rio Rayas | Analista de Innovación / QA |

## Cómo correr el proyecto en local

```bash
# 1. Clonar el repositorio
git clone https://github.com/equipo-ods12/reciclafacil.git
cd reciclafacil

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local

# 4. Levantar el servidor de desarrollo
npm run dev

# 5. Abrir en el navegador
# http://localhost:3000
```

## Comandos disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Levanta el servidor de desarrollo en localhost:3000 |
| `npm run build` | Genera el build de producción |
| `npm run lint` | Corre ESLint |
| `npm run type-check` | Verifica tipos de TypeScript sin compilar |
| `npm test` | Corre las pruebas unitarias con Jest |

## Entornos

Ver [`ENVIRONMENTS.md`](./ENVIRONMENTS.md) para la definición completa de las reglas de DEV, QA y PROD.

## Módulo crítico

El buscador de residuos (`src/server/buscarResiduo.ts`) es el Contexto Delimitado crítico del sistema. Toda su lógica está cubierta por pruebas unitarias en `tests/residuos.test.ts`.
