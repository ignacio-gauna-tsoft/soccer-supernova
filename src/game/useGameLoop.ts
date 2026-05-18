import { useEffect, useRef } from "react";

/**
 * Bucle de juego basado en requestAnimationFrame.
 * El callback recibe `dt` en segundos (capeado a 0.05 para evitar saltos al perder foco).
 */
export function useGameLoop(running: boolean, onTick: (dt: number) => void) {
  const onTickRef = useRef(onTick);
  onTickRef.current = onTick;

  useEffect(() => {
    if (!running) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      onTickRef.current(dt);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running]);
}
