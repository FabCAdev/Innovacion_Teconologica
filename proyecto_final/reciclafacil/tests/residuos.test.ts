import { buscarResiduoLocal } from "~/server/buscarResiduo";

describe("buscarResiduoLocal — módulo crítico de ReciclaFácil", () => {
  // CA-01: tiempo de respuesta
  test("CA-01: responde en menos de 1.5 segundos (objetivo real: < 50ms)", () => {
    const resultado = buscarResiduoLocal("botella de pet");
    expect(resultado.estado).toBe("encontrado");
    if (resultado.estado === "encontrado") {
      expect(resultado.tiempoMs).toBeLessThan(1500);
      // Criterio QA reforzado por Act01_P3: < 50ms en ejecución local
      expect(resultado.tiempoMs).toBeLessThan(50);
    }
  });

  // Caso encontrado exacto
  test("encuentra un residuo por coincidencia exacta", () => {
    const resultado = buscarResiduoLocal("carton");
    expect(resultado.estado).toBe("encontrado");
    if (resultado.estado === "encontrado") {
      expect(resultado.residuo.contenedor).toBe("reciclable");
    }
  });

  // Case-insensitive
  test("encuentra un residuo sin distinguir mayúsculas y minúsculas", () => {
    const resultado = buscarResiduoLocal("CASCARA DE FRUTA");
    expect(resultado.estado).toBe("encontrado");
    if (resultado.estado === "encontrado") {
      expect(resultado.residuo.contenedor).toBe("organico");
    }
  });

  // CA-02: tolerancia a errores tipográficos
  test("CA-02: tolera un error de escritura menor (bottella -> botella)", () => {
    const resultado = buscarResiduoLocal("bottella de pet");
    expect(resultado.estado).toBe("encontrado");
    if (resultado.estado === "encontrado") {
      expect(resultado.residuo.nombre).toBe("botella de pet");
    }
  });

  test("CA-02: tolera un alias con error de escritura (pila -> pilaa)", () => {
    const resultado = buscarResiduoLocal("pilaa");
    expect(resultado.estado).toBe("encontrado");
    if (resultado.estado === "encontrado") {
      expect(resultado.residuo.contenedor).toBe("noreciclable");
    }
  });

  // CA-03: búsqueda vacía
  test("CA-03: maneja una búsqueda vacía sin lanzar error", () => {
    const resultado = buscarResiduoLocal("");
    expect(resultado.estado).toBe("vacio");
  });

  test("CA-03: maneja una búsqueda compuesta solo de espacios", () => {
    const resultado = buscarResiduoLocal("    ");
    expect(resultado.estado).toBe("vacio");
  });

  // CA-04: residuo no encontrado
  test("CA-04: informa con claridad cuando el residuo no existe en el catálogo", () => {
    const resultado = buscarResiduoLocal("electrodomestico descompuesto");
    expect(resultado.estado).toBe("no_encontrado");
    if (resultado.estado === "no_encontrado") {
      expect(resultado.mensaje).toContain("No encontramos");
    }
  });
});
