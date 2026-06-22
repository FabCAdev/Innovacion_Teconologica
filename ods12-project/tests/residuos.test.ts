// tests/residuos.test.ts
// Pruebas unitarias del módulo crítico — Motor de Búsqueda de Residuos
// Cobertura mínima DEV: 60% | Cobertura mínima QA: 80%

import { buscarResiduoLocal, obtenerCatalogo } from "@/utils/residuos";

describe("buscarResiduoLocal — Módulo Crítico", () => {
  // ── Búsquedas que deben encontrar resultado ─────────────────────
  test("encuentra botella de vidrio por palabra clave exacta", () => {
    const res = buscarResiduoLocal("botella");
    expect(res).not.toBeNull();
    expect(res?.contenedor).toBe("Contenedor verde");
  });

  test("encuentra plástico con tilde faltante (plastico)", () => {
    const res = buscarResiduoLocal("plastico");
    expect(res).not.toBeNull();
    expect(res?.contenedor).toBe("Contenedor amarillo");
  });

  test("encuentra cartón con tilde faltante (carton)", () => {
    const res = buscarResiduoLocal("carton");
    expect(res).not.toBeNull();
    expect(res?.contenedor).toBe("Contenedor azul");
  });

  test("encuentra lata por palabra clave", () => {
    const res = buscarResiduoLocal("lata");
    expect(res).not.toBeNull();
    expect(res?.contenedor).toBe("Contenedor amarillo");
  });

  test("encuentra pilas — residuo especial", () => {
    const res = buscarResiduoLocal("pila");
    expect(res).not.toBeNull();
    expect(res?.contenedor).toContain("RAEE");
  });

  test("encuentra medicamentos por palabra clave", () => {
    const res = buscarResiduoLocal("medicamento");
    expect(res).not.toBeNull();
    expect(res?.contenedor).toContain("MEDS");
  });

  // ── Búsqueda sin coincidencia ───────────────────────────────────
  test("retorna null si no encuentra el residuo", () => {
    const res = buscarResiduoLocal("xxxxxxresiduo_inexistente");
    expect(res).toBeNull();
  });

  test("retorna null con query vacío", () => {
    const res = buscarResiduoLocal("");
    expect(res).toBeNull();
  });

  test("retorna null con solo espacios", () => {
    const res = buscarResiduoLocal("   ");
    expect(res).toBeNull();
  });

  // ── Comportamiento esperado ─────────────────────────────────────
  test("el resultado incluye instruccion no vacía", () => {
    const res = buscarResiduoLocal("vidrio");
    expect(res?.instruccion).toBeTruthy();
    expect(res?.instruccion.length).toBeGreaterThan(10);
  });

  test("el resultado incluye emoji", () => {
    const res = buscarResiduoLocal("cartón");
    expect(res?.emoji).toBeTruthy();
  });

  test("búsqueda es case-insensitive", () => {
    const res1 = buscarResiduoLocal("BOTELLA");
    const res2 = buscarResiduoLocal("botella");
    expect(res1?.contenedor).toBe(res2?.contenedor);
  });

  // ── Criterio de aceptación QA #1 ───────────────────────────────
  // DADO un usuario en la pantalla de búsqueda,
  // CUANDO escribe 'botella de vidrio',
  // ENTONCES el sistema devuelve el resultado en < 1.5 segundos
  test("búsqueda completa en menos de 50ms (local, sin red)", () => {
    const inicio = performance.now();
    buscarResiduoLocal("botella de vidrio");
    const fin = performance.now();
    expect(fin - inicio).toBeLessThan(50);
  });
});

describe("obtenerCatalogo", () => {
  test("retorna al menos 5 residuos en el catálogo", () => {
    const catalogo = obtenerCatalogo();
    expect(catalogo.length).toBeGreaterThanOrEqual(5);
  });

  test("cada entrada tiene nombre, contenedor y emoji", () => {
    const catalogo = obtenerCatalogo();
    catalogo.forEach((item) => {
      expect(item.contenedor).toBeTruthy();
      expect(item.emoji).toBeTruthy();
      expect(item.instruccion).toBeTruthy();
    });
  });
});
