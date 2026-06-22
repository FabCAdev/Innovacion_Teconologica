/**
 * Catálogo local de residuos — ReciclaFácil
 *
 * Para el demo del Tercer Periodo el catálogo es local y reducido (10
 * residuos), como se documenta en la sección 3.2 del entregable técnico.
 * La integración con MongoDB Atlas queda planificada para una fase
 * posterior (sección 3.5 — Despliegue en la Nube).
 */

export type TipoContenedor = "organico" | "reciclable" | "noreciclable";

export interface Residuo {
  nombre: string;
  contenedor: TipoContenedor;
  colorContenedor: string;
  /** Palabras o variantes adicionales que también deben encontrar este residuo */
  alias?: string[];
}

export const CATALOGO_RESIDUOS: Residuo[] = [
  { nombre: "botella de pet", contenedor: "reciclable", colorContenedor: "Azul", alias: ["botella pet", "botella de plastico", "pet"] },
  { nombre: "lata de aluminio", contenedor: "reciclable", colorContenedor: "Azul", alias: ["lata", "lata de refresco"] },
  { nombre: "carton", contenedor: "reciclable", colorContenedor: "Azul", alias: ["caja de carton"] },
  { nombre: "papel", contenedor: "reciclable", colorContenedor: "Azul", alias: ["hoja de papel"] },
  { nombre: "cascara de fruta", contenedor: "organico", colorContenedor: "Verde", alias: ["cascara", "residuo organico"] },
  { nombre: "restos de comida", contenedor: "organico", colorContenedor: "Verde", alias: ["comida", "sobras"] },
  { nombre: "pila alcalina", contenedor: "noreciclable", colorContenedor: "Gris / Centro de acopio especial", alias: ["pila", "bateria"] },
  { nombre: "colilla de cigarro", contenedor: "noreciclable", colorContenedor: "Gris", alias: ["cigarro"] },
  { nombre: "pañal desechable", contenedor: "noreciclable", colorContenedor: "Gris", alias: ["pañal"] },
  { nombre: "vidrio", contenedor: "reciclable", colorContenedor: "Azul", alias: ["botella de vidrio", "frasco de vidrio"] },
];
