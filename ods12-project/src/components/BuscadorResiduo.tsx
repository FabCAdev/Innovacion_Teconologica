"use client";

import { useState } from "react";
import type { ResultadoBusqueda } from "@/utils/residuos";
import { buscarResiduoLocal } from "@/utils/residuos";

export default function BuscadorResiduo() {
  const [query, setQuery] = useState("");
  const [resultado, setResultado] = useState<ResultadoBusqueda | null>(null);
  const [buscando, setBuscando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleBuscar(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    setBuscando(true);
    setError(null);
    setResultado(null);

    try {
      // Búsqueda en catálogo local primero (offline-first)
      const res = buscarResiduoLocal(query);
      if (res) {
        setResultado(res);
      } else {
        setError(
          "No encontramos ese residuo en nuestro catálogo. Intenta con otro nombre o revisa la ortografía."
        );
      }
    } catch {
      // Mensaje de error en español claro — copilot-instructions
      setError(
        "Ocurrió un problema al buscar. Verifica tu conexión e intenta de nuevo."
      );
    } finally {
      setBuscando(false);
    }
  }

  return (
    <div>
      {/* Formulario de búsqueda */}
      <form onSubmit={handleBuscar} role="search" aria-label="Buscar residuo">
        <label
          htmlFor="input-residuo"
          className="block text-base font-medium text-gray-800 mb-2"
        >
          ¿Qué residuo quieres separar?
        </label>
        <div className="flex gap-2">
          <input
            id="input-residuo"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ej: botella de vidrio, cartón, pila..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-4 focus:ring-primario-muy_claro focus:border-primario-DEFAULT"
            // Accesibilidad — aria-label para lectores de pantalla
            aria-label="Nombre del residuo a buscar"
            autoComplete="off"
            disabled={buscando}
          />
          <button
            type="submit"
            disabled={buscando || !query.trim()}
            className="bg-primario-DEFAULT text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50 hover:bg-primario-claro transition-colors focus:outline-none focus:ring-4 focus:ring-primario-muy_claro"
            aria-label="Buscar"
          >
            {buscando ? "Buscando..." : "Buscar"}
          </button>
        </div>
      </form>

      {/* Error */}
      {error && (
        <div
          role="alert"
          aria-live="polite"
          className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-base"
        >
          ⚠️ {error}
        </div>
      )}

      {/* Resultado */}
      {resultado && (
        <div
          role="region"
          aria-label="Resultado de búsqueda"
          aria-live="polite"
          className="mt-6 p-6 rounded-xl border-2 border-primario-DEFAULT bg-primario-muy_claro"
        >
          <p className="text-sm text-primario-DEFAULT font-medium mb-1">
            Resultado para: <strong>{resultado.nombre}</strong>
          </p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-4xl" aria-hidden="true">
              {resultado.emoji}
            </span>
            <div>
              <p className="text-xl font-bold text-primario-DEFAULT">
                {resultado.contenedor}
              </p>
              <p className="text-base text-gray-700 mt-1">
                {resultado.instruccion}
              </p>
            </div>
          </div>
          {resultado.consejo && (
            <p className="mt-3 text-sm text-gray-600 italic">
              💡 {resultado.consejo}
            </p>
          )}
        </div>
      )}

      {/* Estado vacío */}
      {!resultado && !error && !buscando && (
        <p className="mt-6 text-center text-gray-400 text-base">
          Escribe el nombre de cualquier residuo para saber dónde separarlo.
        </p>
      )}
    </div>
  );
}
