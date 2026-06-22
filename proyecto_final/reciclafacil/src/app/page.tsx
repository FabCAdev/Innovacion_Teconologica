import { BuscadorResiduos } from "~/components/BuscadorResiduos";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">ReciclaFácil</h1>
        <p className="text-gray-500 mt-2">
          Escribe un residuo y te decimos en qué contenedor va.
        </p>
      </div>
      <BuscadorResiduos />
    </main>
  );
}
