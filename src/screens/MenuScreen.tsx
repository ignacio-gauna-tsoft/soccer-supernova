import { motion } from "framer-motion";

interface Props {
  onPlay: () => void;
}

const TITLE = "SOCCER NOVA";

export default function MenuScreen({ onPlay }: Props) {
  return (
    <div style={styles.wrap}>
      <AnimatedBackdrop />

      <div style={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={styles.kicker}
        >
          ⚽ ARCADE
        </motion.div>

        <h1 style={styles.title} aria-label={TITLE}>
          {TITLE.split("").map((ch, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60, rotate: -8 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.2 + i * 0.05,
                type: "spring",
                stiffness: 140,
                damping: 14,
              }}
              style={{
                display: "inline-block",
                whiteSpace: "pre",
                background:
                  ch === " "
                    ? "transparent"
                    : "linear-gradient(180deg, #ffffff 0%, #ffd84a 60%, #ff8a3d 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: ch === " " ? "transparent" : "transparent",
                backgroundClip: "text",
              }}
            >
              {ch}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          style={styles.subtitle}
        >
          Recolectá estrellas, esquivá las barridas y rompé tu récord.
        </motion.p>

        <motion.button
          onClick={onPlay}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.97 }}
          style={styles.playBtn}
        >
          <span style={styles.playBtnInner}>JUGAR</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          style={styles.controls}
        >
          <span>🖱️ Mouse</span>
          <span style={styles.dot}>·</span>
          <span>⌨️ ← →</span>
        </motion.div>
      </div>
    </div>
  );
}

function AnimatedBackdrop() {
  return (
    <>
      <motion.div
        style={styles.glowA}
        animate={{ x: [0, 60, -40, 0], y: [0, -40, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        style={styles.glowB}
        animate={{ x: [0, -50, 40, 0], y: [0, 30, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <div style={styles.stars}>
        {Array.from({ length: 18 }).map((_, i) => {
          const left = (i * 53) % 100;
          const delay = (i * 0.7) % 6;
          const size = 14 + ((i * 7) % 18);
          const duration = 6 + ((i * 3) % 8);
          return (
            <motion.span
              key={i}
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: "110vh", opacity: [0, 1, 1, 0] }}
              transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                position: "absolute",
                left: `${left}%`,
                fontSize: size,
                filter: "drop-shadow(0 0 6px rgba(255,216,74,0.6))",
              }}
            >
              ⭐
            </motion.span>
          );
        })}
      </div>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    background:
      "radial-gradient(ellipse at top, #1b2a5b 0%, #0a0f24 55%, #03050d 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: 24,
  },
  kicker: {
    fontSize: 13,
    letterSpacing: 6,
    opacity: 0.8,
    marginBottom: 18,
    padding: "6px 14px",
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: 999,
    background: "rgba(255,255,255,0.04)",
  },
  title: {
    fontSize: "clamp(54px, 11vw, 140px)",
    fontWeight: 900,
    letterSpacing: -2,
    lineHeight: 0.95,
    margin: 0,
    textShadow: "0 8px 40px rgba(255,138,61,0.35)",
  },
  subtitle: {
    marginTop: 18,
    fontSize: "clamp(14px, 1.6vw, 18px)",
    maxWidth: 520,
    lineHeight: 1.5,
  },
  playBtn: {
    marginTop: 36,
    padding: "0",
    borderRadius: 999,
    background:
      "linear-gradient(135deg, #ff8a3d 0%, #ffd84a 50%, #59ffb1 100%)",
    boxShadow:
      "0 12px 40px rgba(255,138,61,0.45), inset 0 1px 0 rgba(255,255,255,0.4)",
  },
  playBtnInner: {
    display: "inline-block",
    padding: "16px 56px",
    fontSize: 22,
    fontWeight: 800,
    letterSpacing: 4,
    color: "#0a0f24",
  },
  controls: {
    marginTop: 30,
    display: "flex",
    gap: 14,
    alignItems: "center",
    fontSize: 14,
    letterSpacing: 1.5,
  },
  dot: { opacity: 0.4 },
  glowA: {
    position: "absolute",
    top: "-15%",
    left: "10%",
    width: 520,
    height: 520,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(255,138,61,0.35) 0%, transparent 70%)",
    filter: "blur(20px)",
  },
  glowB: {
    position: "absolute",
    bottom: "-20%",
    right: "5%",
    width: 600,
    height: 600,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(89,255,177,0.25) 0%, transparent 70%)",
    filter: "blur(20px)",
  },
  stars: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    opacity: 0.7,
  },
};
