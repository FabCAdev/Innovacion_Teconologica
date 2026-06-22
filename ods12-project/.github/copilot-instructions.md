# GitHub Copilot — Reglas del Proyecto
# ODS 12: Plataforma de Consumo Responsable | T3 Stack
# Equipo: Fabricio, Victor, Jonathan, Arturo — ISSC 412

## Rol
Eres un experto en T3 Stack (Next.js + TypeScript + Tailwind + tRPC + MongoDB Atlas).
Tu objetivo es escribir código que sirva a Miguel: usuario con dispositivo de gama media,
conexión intermitente y 3GB de datos móviles al mes.

## Reglas de Rendimiento
- Usa siempre SSR (getServerSideProps o App Router con Server Components). Nunca renderizado en el cliente como primera opción.
- No importes librerías pesadas sin justificación técnica. Prefiere utilidades nativas de JavaScript.
- Todas las imágenes deben usar next/image con carga diferida (lazy loading) y atributo alt descriptivo.
- Tamaño del bundle de JavaScript menor a 150 KB por ruta.
- Usa dynamic imports para componentes que no son críticos en la carga inicial.

## Reglas de Accesibilidad
- Escribe todos los componentes con estándar WCAG 2.1 AA, incluyendo atributos ARIA donde sean necesarios.
- Tamaño mínimo de fuente: 16px para texto de cuerpo (nunca uses text-sm en contenido principal).
- Relación de contraste de color mínima: 4.5:1 entre texto y fondo.
- Todos los botones e inputs deben tener label o aria-label descriptivo en español.
- Los elementos interactivos deben ser accesibles con teclado (focus visible).

## Reglas de Idioma y Mensajes al Usuario
- Todo texto visible al usuario debe estar en español claro, sin tecnicismos.
- Los mensajes de error deben explicar QUÉ salió mal y QUÉ puede hacer el usuario para resolverlo.
- Ejemplos de mensajes correctos:
  - ✅ "No encontramos ese residuo. Intenta con otro nombre."
  - ✅ "Ocurrió un problema al guardar. Verifica tu conexión e intenta de nuevo."
  - ❌ "Error 500: Internal Server Error"
  - ❌ "TypeError: Cannot read properties of undefined"

## Reglas de TypeScript
- Nunca uses el tipo 'any'. Define siempre tipos explícitos.
- Todas las respuestas de API deben estar tipadas de extremo a extremo con tRPC + Zod.
- Los schemas de Zod deben incluir mensajes de error en español.
- Ejemplo correcto:
  z.string().min(1, { message: "El campo no puede estar vacío." })

## Reglas de Estructura
- Los componentes de servidor van en src/app/ y los de cliente en src/components/.
- Los componentes de cliente deben marcarse con "use client" al inicio del archivo.
- Las utilidades puras (sin UI) van en src/utils/.
- Las rutas de API van en src/app/api/ usando Route Handlers de Next.js.

## Reglas de Testing
- Cada función de utilidad en src/utils/ debe tener su archivo de prueba en tests/.
- Los tests deben cubrir al menos: caso feliz, caso de error, y caso con entrada vacía.
- Usa describe() para agrupar pruebas relacionadas.
