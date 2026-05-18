export type EntityKind = "reward" | "rival";

export interface Entity {
  id: number;
  kind: EntityKind;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  emoji: string;
  hitboxRadius: number;
  points: number; // 0 para rivales
  rotation: number;
  spin: number;
}

export interface PlayerState {
  x: number;
  y: number;
}

export interface InputState {
  mouseX: number | null;
  left: boolean;
  right: boolean;
}

export interface GameState {
  player: PlayerState;
  entities: Entity[];
  score: number;
  elapsed: number;
  nextId: number;
  spawnTimers: { reward: number; rival: number };
  spawnIntervals: { reward: number; rival: number };
  rewardSpeedBoost: number;
  rivalSpeedBoost: number;
  difficultyTier: number;
  over: boolean;
}
