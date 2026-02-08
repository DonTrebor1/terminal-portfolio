/**
 * Fondo animado estilo "Matrix" usando <canvas>.
 *
 * Este componente:
 *  - Renderiza un efecto de caída de caracteres (01) en bucle
 *  - Se ejecuta completamente fuera del árbol de renderizado de Preact
 *  - No provoca re-renders (usa canvas imperativo)
 *  - Está optimizado para rendimiento en pantallas grandes
 *
 * Decisiones de diseño:
 *  - Se usa <canvas> porque permite animaciones fluidas sin afectar la UI
 *  - La animación se ejecuta dentro de useEffect para evitar recreaciones
 *  - pointer-events-none evita interferencias con la interacción del usuario
 *  - blur ligero para un efecto más elegante y menos distractor
 *
 * Este componente es completamente autónomo y no depende del estado global.
 */

import { useEffect, useRef } from "preact/hooks";

export default function MatrixBackground() {
  /**
   * Referencia al elemento <canvas>.
   * Se usa useRef porque el canvas se manipula de forma imperativa.
   */
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    /**
     * Inicialización del canvas y contexto 2D.
     * Se asume que el canvas siempre existe porque el componente lo renderiza.
     */
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    /**
     * Ajuste del tamaño del canvas al tamaño de la ventana.
     * Esto garantiza que el fondo cubra toda la pantalla.
     */
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    /**
     * Caracteres usados en la animación.
     * Se mantiene simple (01) para reforzar estética hacker minimalista.
     */
    const letters = "01";
    const fontSize = 14;

    /**
     * Número de columnas basado en el ancho del canvas.
     * Cada columna representa una "línea" de caracteres cayendo.
     */
    const columns = Math.floor(canvas.width / fontSize);

    /**
     * Array que almacena la posición vertical de cada columna.
     * Cada valor representa la fila actual donde se dibuja el carácter.
     */
    const drops = Array(columns)
      .fill(0)
      .map(() => Math.floor(Math.random() * canvas.height / fontSize));

    /**
     * Función principal de dibujo.
     * Se ejecuta en intervalos regulares para animar el efecto.
     */
    function draw() {
      /**
       * Fondo semitransparente:
       * - Crea el efecto de "rastro" característico del Matrix rain
       * - El alpha bajo (0.05) suaviza la animación
       */
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      /**
       * Estilo del texto.
       * Se usa rojo (#ff0033) para mantener coherencia con el tema Red Team.
       */
      ctx.fillStyle = "#ff0033";
      ctx.font = `${fontSize}px monospace`;

      /**
       * Dibujo de cada columna.
       * Cada iteración:
       *  - Selecciona un carácter aleatorio
       *  - Lo dibuja en la posición correspondiente
       *  - Incrementa la posición vertical
       *  - Reinicia la columna aleatoriamente al llegar al final
       */
      drops.forEach((y, i) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);

        // Reinicio aleatorio cuando la columna sale de pantalla
        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      });
    }

    /**
     * Intervalo de animación.
     * 50ms ≈ 20 FPS → suficiente para un efecto suave sin consumir demasiados recursos.
     */
    const interval = setInterval(draw, 50);

    /**
     * Limpieza del intervalo al desmontar el componente.
     * Evita fugas de memoria y animaciones huérfanas.
     */
    return () => clearInterval(interval);
  }, []);

  return (
    /**
     * El canvas cubre toda la pantalla:
     *  - fixed + inset-0 → ocupa todo el viewport
     *  - pointer-events-none → no bloquea clics ni scroll
     *  - blur → suaviza el efecto para no distraer del contenido principal
     *  - z-index:0 → siempre detrás del resto de la UI
     */
    <canvas
      ref={canvasRef}
      class="fixed inset-0 pointer-events-none blur-[1.3px]"
      style="z-index:0"
    />
  );
}
