/**
 * Fondo animado estilo "cyber grid" usando <canvas>.
 *
 * Este componente:
 *  - Renderiza una rejilla sutil en movimiento + una línea de escaneo (CRT scan)
 *  - Se ejecuta completamente fuera del árbol de renderizado de Preact
 *  - No provoca re-renders (usa canvas imperativo)
 *  - Está optimizado para rendimiento en pantallas grandes
 *
 * Decisiones de diseño:
 *  - Se sustituye el clásico "Matrix rain" (lluvia de caracteres, muy manida
 *    en este tipo de portfolios) por una rejilla + scanline en verde, con
 *    movimiento propio y menos genérico que la lluvia tradicional
 *  - Se usa <canvas> porque permite animaciones fluidas sin afectar la UI
 *  - pointer-events-none evita interferencias con la interacción del usuario
 *  - blur ligero para un efecto más elegante y menos distractor
 */

import { useEffect, useRef } from "preact/hooks";

export default function CyberGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const spacing = 42; // separación de la rejilla
    let gridOffset = 0; // desplazamiento vertical de la rejilla (efecto de suelo infinito)
    let scanY = 0; // posición vertical de la línea de escaneo

    function draw() {
      const { width, height } = canvas;

      // Fondo casi opaco: deja un rastro muy sutil para suavizar el movimiento
      ctx.fillStyle = "rgba(13, 13, 13, 0.18)";
      ctx.fillRect(0, 0, width, height);

      // Rejilla verde, muy tenue, con desplazamiento vertical lento
      ctx.strokeStyle = "rgba(0, 230, 118, 0.07)";
      ctx.lineWidth = 1;

      for (let x = 0; x <= width; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = -spacing + (gridOffset % spacing); y <= height; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      gridOffset += 0.25;

      // Línea de escaneo estilo CRT, con degradado verde y núcleo lima brillante
      const scanHeight = 140;
      const gradient = ctx.createLinearGradient(0, scanY - scanHeight, 0, scanY + scanHeight);
      gradient.addColorStop(0, "rgba(0, 230, 118, 0)");
      gradient.addColorStop(0.5, "rgba(57, 255, 20, 0.14)");
      gradient.addColorStop(1, "rgba(0, 230, 118, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, scanY - scanHeight, width, scanHeight * 2);

      scanY += 1.6;
      if (scanY > height + scanHeight) scanY = -scanHeight;
    }

    const interval = setInterval(draw, 33); // ~30 FPS

    return () => clearInterval(interval);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      class="fixed inset-0 pointer-events-none blur-[0.6px]"
      style="z-index:0"
    />
  );
}
