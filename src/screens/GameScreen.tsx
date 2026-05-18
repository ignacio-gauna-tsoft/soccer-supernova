import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CANVAS } from "../game/config";
import { createInitialState, stepGame } from "../game/engine";
import { renderGame } from "../game/render";
import { useGameLoop } from "../game/useGameLoop";
import { useInput } from "../game/useInput";
import GameOverModal from "../components/GameOverModal";

interface Props {
  onExit: () => void;
}

export default function GameScreen({ onExit }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef(createInitialState());
  const input = useInput(canvasRef);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  // Reinicia al cambiar resetKey
  useEffect(() => {
    stateRef.current = createInitialState();
    setScore(0);
    setGameOver(false);
  }, [resetKey]);

  useGameLoop(!gameOver, (dt) => {
    const s = stepGame(stateRef.current, dt, input.current);
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) renderGame(ctx, s);
    setScore(s.score);
    if (s.over) setGameOver(true);
  });

  return (
    <div style={styles.wrap}>
      <motion.div
        style={styles.hud}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div style={styles.scoreBadge}>
          <span style={styles.scoreLabel}>SCORE</span>
          <span style={styles.scoreValue}>{score}</span>
        </div>
        <button style={styles.exitBtn} onClick={onExit}>
          ← Menú
        </button>
      </motion.div>

      <motion.canvas
        ref={canvasRef}
        width={CANVAS.width}
        height={CANVAS.height}
        style={styles.canvas}
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      <p style={styles.hint}>
        Movete con el <b>mouse</b> o las <b>flechas ← →</b> · esquivá las
        barridas
      </p>

      <AnimatePresence>
        {gameOver && (
          <GameOverModal
            score={score}
            onRetry={() => setResetKey((k) => k + 1)}
            onMenu={onExit}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    background: "radial-gradient(circle at 50% 0%, #1a2347 0%, #05070f 70%)",
    padding: 16,
  },
  hud: {
    width: "min(960px, 95vw)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scoreBadge: {
    display: "flex",
    alignItems: "baseline",
    gap: 10,
    padding: "10px 18px",
    borderRadius: 14,
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.14)",
    backdropFilter: "blur(8px)",
  },
  scoreLabel: { fontSize: 12, letterSpacing: 2, opacity: 0.7 },
  scoreValue: { fontSize: 28, fontWeight: 800, color: "#ffd84a" },
  exitBtn: {
    padding: "10px 16px",
    borderRadius: 12,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.18)",
    fontWeight: 600,
  },
  canvas: {
    width: "min(960px, 95vw)",
    aspectRatio: `${CANVAS.width} / ${CANVAS.height}`,
    height: "auto",
    borderRadius: 18,
    boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
    border: "1px solid rgba(255,255,255,0.08)",
    cursor: "none",
  },
  hint: {
    fontSize: 13,
    opacity: 0.65,
    letterSpacing: 0.5,
  },
};
