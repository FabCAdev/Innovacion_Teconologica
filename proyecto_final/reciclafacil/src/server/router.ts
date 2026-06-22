import { z } from "zod";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { buscarResiduoLocal } from "~/server/buscarResiduo";

const t = initTRPC.create({ transformer: superjson });

/**
 * Router de residuos — expone el módulo crítico de búsqueda al frontend.
 * Este es el único endpoint que el demo del Tercer Periodo necesita.
 */
export const residuoRouter = t.router({
  buscar: t.procedure
    .input(z.object({ query: z.string() }))
    .query(({ input }) => {
      return buscarResiduoLocal(input.query);
    }),
});

export const appRouter = t.router({
  residuo: residuoRouter,
});

export type AppRouter = typeof appRouter;
