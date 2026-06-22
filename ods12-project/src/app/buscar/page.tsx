// MÓDULO CRÍTICO — Motor de Búsqueda de Residuos
// SSR obligatorio — copilot-instructions
// Este módulo corre como microservicio independiente

import { Suspense } from "react";
import BuscadorResiduo from "@/components/BuscadorResiduo";

// Metadata con SSR
export const metadata = {
  title: "Buscar residuo — ReciclaFácil",
  description:
    "Busca cómo separar cualquier residuo correctamente para reciclarlo.",
};

export default function BuscarPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-primario-DEFAULT text-white px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <a
            href="/"
            className="text-white hover:text-primario-muy_claro transition-colors"
            aria-label="Regresar al inicio"
          >
            ← Inicio
          </a>
          <h1 className="text-lg font-semibold">Buscar residuo</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8" id="contenido-principal">
        <Suspense
          fallback={
            <p className="text-center text-gray-500" role="status">
              Cargando buscador...
            </p>
          }
        >
          <BuscadorResiduo />
        </Suspense>
      </main>
    </div>
  );
}
