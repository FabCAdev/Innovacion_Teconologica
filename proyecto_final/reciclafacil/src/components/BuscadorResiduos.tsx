"use client";

import { useState } from "react";
import { trpc } from "~/app/trpc";

const COLOR_POR_CONTENEDOR: Record<string, string> = {
  organico: "bg-organico",
  reciclable: "bg-reciclable",
  noreciclable: "bg-noreciclable",
};

const ETIQUETA_POR_CONTENEDOR: Record<string, string> = {
  organico: "Orgánico",
  reciclable: "Reciclable",
  noreciclable: "No reciclable",
};

export function BuscadorResiduos() {
  const [query, setQuery] = useState("");
  const [terminoBuscado, setTerminoBuscado] = useState<string | null>(null);

  const resultado = trpc.residuo.buscar.useQuery(
    { query: terminoBuscado ?? "" },
    { enabled: terminoBuscado !== null, retry: false }
  );

  function handleBuscar(e: React.FormEvent) {
    e.preventDefault();
    setTerminoBuscado(query);
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleBuscar} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Ej. "botella de PET"'
          className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-reciclable"
          aria-label="Nombre del residuo"
        />
        <button
          type="submit"
          className="rounded-lg bg-reciclable px-5 py-3 text-white font-semibold hover:opacity-90 transition"
        >
          Buscar
        </button>
      </form>

      <div className="mt-6" aria-live="polite">
        {resultado.isFetching && (
          <p className="text-gray-500 text-sm">Buscando…</p>
        )}

        {resultado.data?.estado === "vacio" && (
          <p className="text-amber-600 bg-amber-50 rounded-lg p-4 text-sm">
            {resultado.data.mensaje}
          </p>
        )}

        {resultado.data?.estado === "no_encontrado" && (
          <p className="text-gray-600 bg-gray-100 rounded-lg p-4 text-sm">
            {resultado.data.mensaje}
          </p>
        )}

        {resultado.data?.estado === "encontrado" && (
          <div className="rounded-xl p-5 border border-gray-200 shadow-sm bg-white">
            <p className="text-sm text-gray-500 mb-1">Deposítalo en:</p>
            <div className="flex items-center gap-3">
              <span
                className={`inline-block w-4 h-4 rounded-full ${
                  COLOR_POR_CONTENEDOR[resultado.data.residuo.contenedor]
                }`}
              />
              <p className="text-xl font-bold">
                Contenedor {ETIQUETA_POR_CONTENEDOR[resultado.data.residuo.contenedor]}
              </p>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Color: {resultado.data.residuo.colorContenedor}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
