import type { Metadata } from "next";
import "~/styles/globals.css";
import { TrpcProvider } from "~/app/providers";

export const metadata: Metadata = {
  title: "ReciclaFácil — ODS 12",
  description: "Consulta rápida de cómo separar tus residuos correctamente.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <TrpcProvider>{children}</TrpcProvider>
      </body>
    </html>
  );
}
