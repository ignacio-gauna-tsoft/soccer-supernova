import { CANVAS, PLAYER } from "./config";
import type { GameState } from "./types";

function drawBackground(ctx: CanvasRenderingContext2D) {
  const sky = ctx.createLinearGradient(0, 0, 0, CANVAS.groundY);
  sky.addColorStop(0, CANVAS.skyTop);
  sky.addColorStop(1, CANVAS.skyBottom);
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, CANVAS.width, CANVAS.groundY);

  // piso
  ctx.fillStyle = CANVAS.groundColor;
  ctx.fillRect(0, CANVAS.groundY, CANVAS.width, CANVAS.height - CANVAS.groundY);

  // franjas del campo
  ctx.fillStyle = CANVAS.groundStripe;
  const stripeH = 18;
  for (let y = CANVAS.groundY; y < CANVAS.height; y += stripeH * 2) {
    ctx.fillRect(0, y, CANVAS.width, stripeH);
  }

  // línea de horizonte
  ctx.strokeStyle = "rgba(255,255,255,0.35)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, CANVAS.groundY);
  ctx.lineTo(CANVAS.width, CANVAS.groundY);
  ctx.stroke();
}

function drawEmoji(
  ctx: CanvasRenderingContext2D,
  emoji: string,
  x: number,
  y: number,
  size: number,
  rotation = 0,
) {
  ctx.save();
  ctx.translate(x, y);
  if (rotation) ctx.rotate(rotation);
  ctx.font = `${size}px "Segoe UI Emoji", "Apple Color Emoji", sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(emoji, 0, 0);
  ctx.restore();
}

export function renderGame(ctx: CanvasRenderingContext2D, state: GameState) {
  drawBackground(ctx);

  // sombra del jugador
  ctx.fillStyle = "rgba(0,0,0,0.35)";
  ctx.beginPath();
  ctx.ellipse(
    state.player.x,
    CANVAS.groundY + 6,
    PLAYER.size * 0.35,
    8,
    0,
    0,
    Math.PI * 2,
  );
  ctx.fill();

  // entidades
  for (const e of state.entities) {
    if (e.kind === "rival") {
      // sombra rival
      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.beginPath();
      ctx.ellipse(e.x, CANVAS.groundY + 6, e.size * 0.4, 6, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    drawEmoji(ctx, e.emoji, e.x, e.y, e.size, e.rotation);
  }

  // jugador (cuerpo + pelota)
  const px = state.player.x;
  const py = state.player.y;
  drawEmoji(ctx, PLAYER.emoji, px, py - PLAYER.size / 2, PLAYER.size);
  drawEmoji(
    ctx,
    PLAYER.ballEmoji,
    px + PLAYER.size * 0.35,
    py - PLAYER.ballSize / 2,
    PLAYER.ballSize,
  );
}
