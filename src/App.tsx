import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MenuScreen from "./screens/MenuScreen";
import GameScreen from "./screens/GameScreen";

type Screen = "menu" | "game";

export default function App() {
  const [screen, setScreen] = useState<Screen>("menu");

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={screen}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        style={{ width: "100%", height: "100%" }}
      >
        {screen === "menu" ? (
          <MenuScreen onPlay={() => setScreen("game")} />
        ) : (
          <GameScreen onExit={() => setScreen("menu")} />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
