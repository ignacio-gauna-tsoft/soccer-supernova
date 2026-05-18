import { motion } from "framer-motion";

interface Props {
  score: number;
  onRetry: () => void;
  onMenu: () => void;
}

export default function GameOverModal({ score, onRetry, onMenu }: Props) {
  return (
    <motion.div
      style={styles.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        style={styles.card}
        initial={{ scale: 0.85, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
      >
        <motion.div
          initial={{ rotate: -20, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 180 }}
          style={styles.emoji}
        >
          🥅
        </motion.div>
        <h2 style={styles.title}>¡Te quitaron la pelota!</h2>
        <p style={styles.label}>Tu puntaje</p>
        <motion.div
          style={styles.score}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.25, type: "spring", stiffness: 200 }}
        >
          {score}
        </motion.div>
        <div style={styles.actions}>
          <motion.button
            onClick={onRetry}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            style={{ ...styles.btn, ...styles.btnPrimary }}
          >
            ↻ Volver a jugar
          </motion.button>
          <motion.button
            onClick={onMenu}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            style={{ ...styles.btn, ...styles.btnGhost }}
          >
            ⌂ Menú de inicio
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(2, 4, 12, 0.72)",
    backdropFilter: "blur(10px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  card: {
    width: "min(420px, 92vw)",
    padding: "32px 28px",
    borderRadius: 24,
    background:
      "linear-gradient(160deg, rgba(40,55,110,0.95), rgba(15,20,45,0.95))",
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
    textAlign: "center",
  },
  emoji: { fontSize: 64, marginBottom: 8 },
  title: { fontSize: 24, fontWeight: 800, marginBottom: 18 },
  label: { fontSize: 12, letterSpacing: 3, opacity: 0.65 },
  score: {
    fontSize: 72,
    fontWeight: 900,
    color: "#ffd84a",
    marginTop: 4,
    marginBottom: 24,
    textShadow: "0 6px 30px rgba(255,216,74,0.5)",
  },
  actions: { display: "flex", flexDirection: "column", gap: 10 },
  btn: {
    width: "100%",
    padding: "14px 18px",
    borderRadius: 12,
    fontWeight: 700,
    fontSize: 15,
    letterSpacing: 1,
  },
  btnPrimary: {
    background: "linear-gradient(135deg, #ff8a3d, #ffd84a)",
    color: "#0a0f24",
  },
  btnGhost: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.18)",
    color: "#f5f7ff",
  },
};
