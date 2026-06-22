/**
 * buscarResiduoLocal — Módulo crítico de ReciclaFácil
 *
 * Este módulo es el Contexto Delimitado crítico definido desde el
 * Periodo 2: debe responder rápido, tolerar errores de escritura y
 * nunca fallar de forma silenciosa, incluso con conexiones inestables
 * como las de Miguel, nuestro usuario simulado.
 *
 * Criterios de aceptación que esta función debe cumplir (sección 3.2):
 *  CA-01: responde en menos de 1.5 segundos (en la práctica, < 50ms local).
 *  CA-02: tolera errores tipográficos menores.
 *  CA-03: maneja búsquedas vacías sin lanzar error.
 *  CA-04: informa con claridad cuando el residuo no existe en el catálogo.
 */

import { CATALOGO_RESIDUOS, type Residuo } from "./catalogo";

export type ResultadoBusqueda =
  | { estado: "encontrado"; residuo: Residuo; tiempoMs: number }
  | { estado: "vacio"; mensaje: string }
  | { estado: "no_encontrado"; mensaje: string; tiempoMs: number };

/**
 * Distancia de Levenshtein simple, usada para tolerar errores de
 * escritura menores (ej. "bottella" -> "botella").
 */
function distanciaLevenshtein(a: string, b: string): number {
  const matriz: number[][] = Array.from({ length: a.length + 1 }, () =>
    new Array<number>(b.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i++) matriz[i]![0] = i;
  for (let j = 0; j <= b.length; j++) matriz[0]![j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const costo = a[i - 1] === b[j - 1] ? 0 : 1;
      matriz[i]![j] = Math.min(
        matriz[i - 1]![j]! + 1, // eliminación
        matriz[i]![j - 1]! + 1, // inserción
        matriz[i - 1]![j - 1]! + costo // sustitución
      );
    }
  }

  return matriz[a.length]![b.length]!;
}

function normalizar(texto: string): string {
  return texto
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // quita acentos para comparar
}

/** Umbral de tolerancia: distancia máxima aceptada como "coincidencia cercana" */
const UMBRAL_TOLERANCIA = 2;

export function buscarResiduoLocal(query: string): ResultadoBusqueda {
  const inicio = performance.now();

  // CA-03: búsqueda vacía
  if (!query || normalizar(query).length === 0) {
    return {
      estado: "vacio",
      mensaje: "Por favor escribe el nombre de un residuo para buscar.",
    };
  }

  const queryNormalizada = normalizar(query);

  // 1. Coincidencia exacta (nombre o alias), case-insensitive (CA cubierto implícitamente)
  let encontrado = CATALOGO_RESIDUOS.find((r) => {
    if (normalizar(r.nombre) === queryNormalizada) return true;
    return r.alias?.some((a) => normalizar(a) === queryNormalizada) ?? false;
  });

  // 2. Coincidencia parcial (la query está contenida en el nombre o alias)
  if (!encontrado) {
    encontrado = CATALOGO_RESIDUOS.find((r) => {
      if (normalizar(r.nombre).includes(queryNormalizada)) return true;
      return r.alias?.some((a) => normalizar(a).includes(queryNormalizada)) ?? false;
    });
  }

  // CA-02: coincidencia tolerante a errores tipográficos (Levenshtein)
  if (!encontrado) {
    let mejorDistancia = Infinity;
    for (const r of CATALOGO_RESIDUOS) {
      const candidatos = [r.nombre, ...(r.alias ?? [])];
      for (const candidato of candidatos) {
        const distancia = distanciaLevenshtein(queryNormalizada, normalizar(candidato));
        if (distancia < mejorDistancia) {
          mejorDistancia = distancia;
          if (distancia <= UMBRAL_TOLERANCIA) {
            encontrado = r;
          }
        }
      }
    }
  }

  const tiempoMs = performance.now() - inicio;

  // CA-04: residuo no encontrado
  if (!encontrado) {
    return {
      estado: "no_encontrado",
      mensaje: `No encontramos "${query}" en el catálogo. Intenta con otro nombre.`,
      tiempoMs,
    };
  }

  // CA-01: encontrado y dentro del tiempo esperado
  return {
    estado: "encontrado",
    residuo: encontrado,
    tiempoMs,
  };
}
