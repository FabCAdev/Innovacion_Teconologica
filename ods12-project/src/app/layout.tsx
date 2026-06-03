import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ReciclaFácil — ODS 12",
  description:
    "Plataforma de consumo responsable. Consulta cómo separar tus residuos correctamente.",
  // Open Graph para compartir en redes
  openGraph: {
    title: "ReciclaFácil",
    description: "Separa tus residuos correctamente con ReciclaFácil",
    locale: "es_MX",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // lang="es" — accesibilidad WCAG 2.1
    <html lang="es">
      <body className="min-h-screen bg-white text-gray-900 font-sans">
        {/* Skip nav para accesibilidad de teclado — WCAG 2.1 */}
        <a
          href="#contenido-principal"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-primario-DEFAULT text-white px-4 py-2 rounded"
        >
          Saltar al contenido principal
        </a>
        <main id="contenido-principal">{children}</main>
      </body>
    </html>
  );
}
