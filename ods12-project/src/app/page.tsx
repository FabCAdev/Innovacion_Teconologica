// SSR — obligatorio según copilot-instructions
// Esta página se renderiza en el servidor, minimizando JS al cliente
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header
        className="bg-primario-DEFAULT text-white px-6 py-4"
        role="banner"
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">♻️ ReciclaFácil</h1>
          <span className="text-sm opacity-80">ODS 12</span>
        </div>
      </header>

      {/* Hero */}
      <section
        className="max-w-4xl mx-auto px-6 py-12 text-center"
        aria-labelledby="titulo-hero"
      >
        <h2
          id="titulo-hero"
          className="text-3xl font-bold text-primario-DEFAULT mb-4"
          style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)" }}
        >
          ¿No sabes dónde va tu basura?
        </h2>
        <p className="text-lg text-gray-700 mb-8 max-w-xl mx-auto">
          Busca cualquier residuo y te decimos en qué contenedor va en menos de
          2 segundos. Sin registros. Sin esperas.
        </p>
        <Link
          href="/buscar"
          className="inline-block bg-primario-DEFAULT text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primario-claro transition-colors focus:outline-none focus:ring-4 focus:ring-primario-muy_claro"
          aria-label="Ir al buscador de residuos"
        >
          Buscar residuo ahora
        </Link>
      </section>

      {/* Features */}
      <section
        className="max-w-4xl mx-auto px-6 py-8"
        aria-labelledby="titulo-funciones"
      >
        <h2 id="titulo-funciones" className="sr-only">
          Funciones principales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              emoji: "🔍",
              titulo: "Búsqueda rápida",
              desc: "Escribe el nombre del residuo y obtén el resultado al instante.",
            },
            {
              emoji: "📄",
              titulo: "Reporte mensual",
              desc: "Genera tu reporte de impacto ambiental en PDF cuando quieras.",
            },
            {
              emoji: "📍",
              titulo: "Centros de acopio",
              desc: "Encuentra el punto de reciclaje más cercano a tu ubicación.",
            },
          ].map((item) => (
            <article
              key={item.titulo}
              className="border border-gray-200 rounded-xl p-6 text-center hover:shadow-md transition-shadow"
            >
              <span className="text-4xl" aria-hidden="true">
                {item.emoji}
              </span>
              <h3 className="font-semibold text-lg mt-3 mb-2 text-primario-DEFAULT">
                {item.titulo}
              </h3>
              <p className="text-gray-600 text-base">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <footer
        className="text-center text-sm text-gray-500 py-6 border-t border-gray-100 mt-8"
        role="contentinfo"
      >
        <p>ReciclaFácil · ODS 12 · La Salle Bajío 2026</p>
      </footer>
    </div>
  );
}
