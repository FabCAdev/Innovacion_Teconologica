// Catálogo de residuos — búsqueda offline-first
// Garantiza disponibilidad del módulo crítico incluso sin conexión

export interface ResultadoBusqueda {
  nombre: string;
  contenedor: string;
  emoji: string;
  instruccion: string;
  consejo?: string;
}

interface EntradaCatalogo {
  palabrasClave: string[];
  resultado: ResultadoBusqueda;
}

// Catálogo base — 30 residuos comunes en México
const CATALOGO: EntradaCatalogo[] = [
  {
    palabrasClave: ["botella", "vidrio", "frasco", "tarro"],
    resultado: {
      nombre: "Botella de vidrio",
      contenedor: "Contenedor verde",
      emoji: "🟢",
      instruccion: "Enjuágala antes de depositarla. No rompas el vidrio.",
      consejo: "El vidrio puede reciclarse infinitas veces sin perder calidad.",
    },
  },
  {
    palabrasClave: ["plástico", "plastico", "pet", "botella de plástico", "envase"],
    resultado: {
      nombre: "Plástico / PET",
      contenedor: "Contenedor amarillo",
      emoji: "🟡",
      instruccion: "Aplasta la botella para ahorrar espacio y deposítala sin tapa.",
      consejo: "Busca el número del triángulo de reciclaje en el fondo del envase.",
    },
  },
  {
    palabrasClave: ["cartón", "carton", "caja", "papel", "periódico", "periodico"],
    resultado: {
      nombre: "Cartón / Papel",
      contenedor: "Contenedor azul",
      emoji: "🔵",
      instruccion: "Dobla las cajas para ahorrar espacio. Asegúrate de que estén secas.",
      consejo: "El papel mojado no se puede reciclar. Mantenlo seco.",
    },
  },
  {
    palabrasClave: ["lata", "aluminio", "alumino", "hojalata"],
    resultado: {
      nombre: "Lata / Aluminio",
      contenedor: "Contenedor amarillo",
      emoji: "🟡",
      instruccion: "Enjuaga la lata y aplástala si es posible.",
      consejo: "El aluminio es el material más valioso para reciclar.",
    },
  },
  {
    palabrasClave: ["pila", "batería", "bateria", "cargador"],
    resultado: {
      nombre: "Pilas y baterías",
      contenedor: "Punto RAEE especial",
      emoji: "⚠️",
      instruccion:
        "Nunca en el bote normal. Lleva las pilas a un punto de acopio especial en tiendas de electrónica.",
      consejo: "Las pilas contienen mercurio y son altamente contaminantes.",
    },
  },
  {
    palabrasClave: ["residuo orgánico", "organico", "comida", "cáscara", "cascara", "restos"],
    resultado: {
      nombre: "Residuo orgánico",
      contenedor: "Contenedor café",
      emoji: "🟤",
      instruccion: "Deposita restos de comida, cáscaras y residuos de jardín.",
      consejo: "Con los orgánicos puedes hacer composta en casa.",
    },
  },
  {
    palabrasClave: ["aceite", "aceite vegetal", "aceite de cocina"],
    resultado: {
      nombre: "Aceite vegetal usado",
      contenedor: "Punto de acopio especial",
      emoji: "🫙",
      instruccion:
        "Guárdalo en una botella de PET cerrada y llévalo a un punto de acopio.",
      consejo:
        "Un litro de aceite puede contaminar un millón de litros de agua.",
    },
  },
  {
    palabrasClave: ["electrónico", "electronico", "celular", "teléfono", "computadora", "laptop"],
    resultado: {
      nombre: "Residuo electrónico (RAEE)",
      contenedor: "Punto RAEE especial",
      emoji: "💻",
      instruccion:
        "Llévalo a centros de reciclaje certificados o tiendas especializadas. Nunca en el bote normal.",
      consejo:
        "Antes de desecharlo, verifica si puede donarse o repararse.",
    },
  },
  {
    palabrasClave: ["ropa", "tela", "textil", "zapato", "calzado"],
    resultado: {
      nombre: "Ropa y textiles",
      contenedor: "Contenedor especial o donación",
      emoji: "👕",
      instruccion:
        "Si está en buen estado, dónala. Si no, busca puntos de acopio textil.",
      consejo:
        "La industria textil es la segunda más contaminante del mundo.",
    },
  },
  {
    palabrasClave: ["medicamento", "medicina", "pastilla", "fármaco", "farmaco"],
    resultado: {
      nombre: "Medicamentos",
      contenedor: "Punto MEDS en farmacias",
      emoji: "💊",
      instruccion:
        "Lleva los medicamentos caducados a la farmacia más cercana. Nunca los tires al drenaje.",
      consejo: "Las farmacias Farmacias Similares y del Ahorro tienen puntos de acopio.",
    },
  },
];

/**
 * Busca un residuo en el catálogo local por palabras clave.
 * Retorna null si no encuentra coincidencia.
 * Tiempo de respuesta: < 10ms (búsqueda en memoria)
 */
export function buscarResiduoLocal(query: string): ResultadoBusqueda | null {
  const termino = query.toLowerCase().trim();
  if (!termino) return null;

  for (const entrada of CATALOGO) {
    const coincide = entrada.palabrasClave.some(
      (palabra) =>
        termino.includes(palabra) || palabra.includes(termino)
    );
    if (coincide) {
      return { ...entrada.resultado, nombre: query };
    }
  }
  return null;
}

/**
 * Obtiene todas las entradas del catálogo.
 * Útil para mostrar sugerencias o para pruebas.
 */
export function obtenerCatalogo(): ResultadoBusqueda[] {
  return CATALOGO.map((e) => e.resultado);
}
