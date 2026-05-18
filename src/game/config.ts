/**
 * Configuración central del juego.
 * Todos los valores tuneables (tamaños, velocidades, spawn, emojis) viven acá.
 * Cambiá estas constantes para modificar el balance, los assets o agregar recompensas.
 */

export const CANVAS = {
  width: 960,
  height: 600,
  // Altura del "piso" (donde camina el jugador), medida desde el top.
  groundY: 520,
  // Color de fondo del canvas (degradé via render.ts).
  skyTop: "#0b1d3a",
  skyBottom: "#1d4a8c",
  groundColor: "#2f7a3a",
  groundStripe: "#286a32",
};

export const PLAYER = {
  // Emoji del jugador. Reemplazá por una imagen siguiendo la GUIA.txt.
  emoji: "🏃",
  ballEmoji: "⚽",
  size: 56, // tamaño en px del emoji del jugador
  ballSize: 28, // tamaño en px de la pelota a sus pies
  // Velocidad horizontal con flechas (px/segundo).
  keyboardSpeed: 520,
  // Suavizado al seguir el mouse (0 = instantáneo, 1 = nunca llega). 0.15 = natural.
  mouseEasing: 0.18,
  // Radio de colisión efectivo (más chico que el sprite para que sea justo).
  hitboxRadius: 22,
};

export const STAR = {
  emoji: "⭐",
  size: 38,
  // Velocidad de caída inicial (px/s) [min, max].
  fallSpeed: [140, 220] as const,
  // Cada cuántos segundos aparece una estrella al inicio.
  spawnEvery: 0.9,
  // Puntos otorgados al recolectarla.
  points: 10,
  hitboxRadius: 18,
};

export const RIVAL = {
  emoji: "🦵",
  size: 52,
  // Velocidad lateral (px/s) [min, max].
  speed: [260, 420] as const,
  // Cada cuántos segundos aparece un rival al inicio.
  spawnEvery: 2.6,
  hitboxRadius: 24,
};

/**
 * Aumento de dificultad: cada `every` segundos, multiplicamos los intervalos
 * de spawn por `decay` (más spawns) y sumamos `speedBoost` a las velocidades.
 */
export const DIFFICULTY = {
  every: 8,
  spawnDecay: 0.88,
  speedBoost: 18,
  minStarSpawn: 0.35,
  minRivalSpawn: 0.9,
};

/**
 * Catálogo de recompensas. Para sumar una nueva recompensa:
 * 1. Agregá un objeto a este array con un id único, emoji, puntos y peso.
 * 2. El "weight" controla la probabilidad relativa de aparición.
 * 3. (Opcional) ajustá `size` o `hitboxRadius` si querés que sea más fácil/difícil de agarrar.
 *
 * Ejemplo: { id: "trophy", emoji: "🏆", points: 50, weight: 1, size: 44, hitboxRadius: 22 }
 */
export interface RewardDef {
  id: string;
  emoji: string;
  points: number;
  weight: number;
  size?: number;
  hitboxRadius?: number;
}

export const REWARDS: RewardDef[] = [
  { id: "star", emoji: "⭐", points: 10, weight: 8 },
  { id: "gem", emoji: "💎", points: 25, weight: 2 },
  { id: "trophy", emoji: "🏆", points: 50, weight: 1 },
];
