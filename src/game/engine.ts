import { CANVAS, DIFFICULTY, PLAYER, REWARDS, RIVAL, STAR } from "./config";
import type { Entity, GameState, InputState } from "./types";

export function createInitialState(): GameState {
  return {
    player: { x: CANVAS.width / 2, y: CANVAS.groundY },
    entities: [],
    score: 0,
    elapsed: 0,
    nextId: 1,
    spawnTimers: { reward: 0.5, rival: 2 },
    spawnIntervals: {
      reward: STAR.spawnEvery,
      rival: RIVAL.spawnEvery,
    },
    rewardSpeedBoost: 0,
    rivalSpeedBoost: 0,
    difficultyTier: 0,
    over: false,
  };
}

const rand = (min: number, max: number) => min + Math.random() * (max - min);

function pickReward() {
  const total = REWARDS.reduce((s, r) => s + r.weight, 0);
  let roll = Math.random() * total;
  for (const r of REWARDS) {
    if ((roll -= r.weight) <= 0) return r;
  }
  return REWARDS[0];
}

function spawnReward(state: GameState) {
  const def = pickReward();
  const size = def.size ?? 38;
  const hitboxRadius = def.hitboxRadius ?? 18;
  const e: Entity = {
    id: state.nextId++,
    kind: "reward",
    x: rand(40, CANVAS.width - 40),
    y: -size,
    vx: rand(-30, 30),
    vy: rand(140, 220) + state.rewardSpeedBoost,
    size,
    emoji: def.emoji,
    hitboxRadius,
    points: def.points,
    rotation: 0,
    spin: rand(-2, 2),
  };
  state.entities.push(e);
}

function spawnRival(state: GameState) {
  const fromLeft = Math.random() < 0.5;
  const speed = rand(RIVAL.speed[0], RIVAL.speed[1]) + state.rivalSpeedBoost;
  const e: Entity = {
    id: state.nextId++,
    kind: "rival",
    x: fromLeft ? -RIVAL.size : CANVAS.width + RIVAL.size,
    y: CANVAS.groundY + 6,
    vx: fromLeft ? speed : -speed,
    vy: 0,
    size: RIVAL.size,
    emoji: RIVAL.emoji,
    hitboxRadius: RIVAL.hitboxRadius,
    points: 0,
    rotation: fromLeft ? 0 : Math.PI,
    spin: 0,
  };
  state.entities.push(e);
}

function applyDifficulty(state: GameState) {
  const tier = Math.floor(state.elapsed / DIFFICULTY.every);
  if (tier <= state.difficultyTier) return;
  state.difficultyTier = tier;
  state.spawnIntervals.reward = Math.max(
    DIFFICULTY.minStarSpawn,
    state.spawnIntervals.reward * DIFFICULTY.spawnDecay,
  );
  state.spawnIntervals.rival = Math.max(
    DIFFICULTY.minRivalSpawn,
    state.spawnIntervals.rival * DIFFICULTY.spawnDecay,
  );
  state.rewardSpeedBoost += DIFFICULTY.speedBoost;
  state.rivalSpeedBoost += DIFFICULTY.speedBoost;
}

function movePlayer(state: GameState, dt: number, input: InputState) {
  const p = state.player;
  // teclado
  let kbDx = 0;
  if (input.left) kbDx -= PLAYER.keyboardSpeed * dt;
  if (input.right) kbDx += PLAYER.keyboardSpeed * dt;
  p.x += kbDx;

  // mouse (suavizado) — solo si no se está usando teclado activo
  if (input.mouseX !== null && kbDx === 0) {
    p.x += (input.mouseX - p.x) * Math.min(1, PLAYER.mouseEasing * (dt * 60));
  }

  const half = PLAYER.size / 2;
  if (p.x < half) p.x = half;
  if (p.x > CANVAS.width - half) p.x = CANVAS.width - half;
}

function dist2(ax: number, ay: number, bx: number, by: number) {
  const dx = ax - bx;
  const dy = ay - by;
  return dx * dx + dy * dy;
}

export function stepGame(
  state: GameState,
  dt: number,
  input: InputState,
): GameState {
  if (state.over) return state;
  state.elapsed += dt;
  applyDifficulty(state);
  movePlayer(state, dt, input);

  // spawn
  state.spawnTimers.reward -= dt;
  if (state.spawnTimers.reward <= 0) {
    spawnReward(state);
    state.spawnTimers.reward = state.spawnIntervals.reward;
  }
  state.spawnTimers.rival -= dt;
  if (state.spawnTimers.rival <= 0) {
    spawnRival(state);
    state.spawnTimers.rival = state.spawnIntervals.rival;
  }

  // update + colisiones
  const px = state.player.x;
  const py = state.player.y - PLAYER.size / 2; // centro vertical aprox del jugador
  const surviving: Entity[] = [];
  for (const e of state.entities) {
    e.x += e.vx * dt;
    e.y += e.vy * dt;
    e.rotation += e.spin * dt;

    // out of bounds
    if (e.kind === "reward" && e.y > CANVAS.height + e.size) continue;
    if (
      e.kind === "rival" &&
      (e.x < -e.size * 2 || e.x > CANVAS.width + e.size * 2)
    )
      continue;

    // colisión
    const r = e.hitboxRadius + PLAYER.hitboxRadius;
    if (dist2(e.x, e.y, px, py) < r * r) {
      if (e.kind === "reward") {
        state.score += e.points;
        continue; // consumida
      } else {
        state.over = true;
      }
    }
    surviving.push(e);
  }
  state.entities = surviving;
  return state;
}
