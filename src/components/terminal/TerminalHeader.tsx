/**
 * Barra superior de la terminal.
 *
 * Este componente replica la estética clásica de una ventana de terminal:
 *  - Botones estilo macOS (cerrar, minimizar, maximizar)
 *  - Título centrado con el prompt root@portfolio
 *  - Versión de la terminal alineada a la derecha
 *
 * Responsabilidad:
 *  - Es puramente visual
 *  - No contiene lógica de negocio
 *  - No gestiona estado
 *
 * Mantener este componente simple y aislado permite modificar la estética
 * sin afectar al funcionamiento interno de la terminal.
 */

export default function TerminalHeader() {
  return (
    /**
     * Contenedor visual del header.
     *
     * - bg-black → fondo oscuro estilo terminal
     * - border-red-600 → coherencia con el tema Red Team
     * - grid de 3 columnas → distribución perfecta: izquierda / centro / derecha
     */
    <div class="bg-black border-b border-red-600">
      <div class="grid grid-cols-3 items-center px-4 py-2">

        {/**
         * COLUMNA IZQUIERDA — Botones estilo macOS
         *
         * Estos botones no tienen funcionalidad real.
         * Su propósito es reforzar la estética de "ventana de terminal".
         *
         * Colores:
         *  - Rojo → cerrar
         *  - Amarillo → minimizar
         *  - Verde → maximizar
         *
         * Se usan tamaños pequeños para mantener proporción realista.
         */}
        <div class="flex space-x-2">
          <div class="w-3 h-3 rounded-full bg-red-600"></div>
          <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div class="w-3 h-3 rounded-full bg-green-500"></div>
        </div>

        {/**
         * COLUMNA CENTRAL — Título de la terminal
         *
         * Se muestra un prompt estático:
         *   root@portfolio:~#
         *
         * Razón:
         *  - Refuerza la temática hacker
         *  - Mantiene coherencia con el prompt real del TerminalPrompt
         *  - Centrado para estética limpia
         */}
        <div class="flex justify-center">
          <span class="text-[var(--red-accent)] font-mono text-sm">
            root@portfolio:~#
          </span>
        </div>

        {/**
         * COLUMNA DERECHA — Versión de la terminal
         *
         * Mostrar una versión (ej: "Terminal V1.0") es un detalle estético
         * que da sensación de herramienta real.
         *
         * Se alinea a la derecha para equilibrar el diseño.
         */}
        <div class="flex justify-end">
          <span class="text-[var(--grey-accent)] font-mono text-sm">
            Terminal V1.0
          </span>
        </div>

      </div>
    </div>
  );
}
