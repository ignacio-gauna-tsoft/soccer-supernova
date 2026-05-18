import { useEffect, useRef } from "react";
import type { InputState } from "./types";

/**
 * Captura mouse (sobre el canvas) y flechas izquierda/derecha (A/D también).
 * Devuelve una referencia mutable para leer el estado desde el game loop sin re-renderizar.
 */
export function useInput(canvasRef: React.RefObject<HTMLCanvasElement>) {
  const input = useRef<InputState>({ mouseX: null, left: false, right: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onMove = (ev: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      input.current.mouseX = (ev.clientX - rect.left) * scaleX;
    };
    const onLeave = () => {
      input.current.mouseX = null;
    };
    const onKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === "ArrowLeft" || ev.key === "a" || ev.key === "A")
        input.current.left = true;
      if (ev.key === "ArrowRight" || ev.key === "d" || ev.key === "D")
        input.current.right = true;
    };
    const onKeyUp = (ev: KeyboardEvent) => {
      if (ev.key === "ArrowLeft" || ev.key === "a" || ev.key === "A")
        input.current.left = false;
      if (ev.key === "ArrowRight" || ev.key === "d" || ev.key === "D")
        input.current.right = false;
    };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [canvasRef]);

  return input;
}
