/**
 * Cuerpo principal de la terminal.
 *
 * Este componente es responsable de:
 *  - Renderizar el historial de salida generado por useTerminal()
 *  - Mostrar el mensaje de bienvenida inicial según el dispositivo
 *  - Renderizar el prompt final cuando no hay animación en curso
 *
 * Importante:
 *  - Este componente NO contiene lógica de negocio.
 *  - Solo interpreta el estado que recibe desde useTerminal().
 *  - Mantiene la UI desacoplada de la lógica interna (SRP - SOLID).
 */
import TerminalPrompt from "./TerminalPrompt";
import ascii from "../../data/ascii.json";

type TerminalOutputItem = {
  type: "raw" | "html"; // RAW → texto literal | HTML → renderizado seguro
  content: string;
};

type TerminalState = {
  output: TerminalOutputItem[]; // Historial de líneas renderizadas
  isTyping: boolean; // Indica si hay animación en curso
  isTypingCommand: boolean; // Evita mostrar prompt durante typing
  hasInteracted: boolean; // Controla si se muestra el mensaje inicial
  runCommand: (cmd: string) => Promise<void>;
  clear: () => void;
};

export default function TerminalBody({
  terminal,
}: {
  terminal: TerminalState;
}) {
  /**
   * Selección del mensaje de bienvenida según tamaño de pantalla.
   * 
   * Esto mejora la UX adaptando el contenido a móvil/tablet/desktop.
   * La lógica se mantiene aquí porque depende del renderizado, no del estado.
   */
  const width = window.innerWidth;

  const welcomeMessage: string | undefined = !terminal.hasInteracted
    ? width < 640
      ? ascii.messageMobile
      : width < 1024
        ? ascii.messageTablet
        : ascii.messageDesktop
    : undefined;

  return (
    /**
     * Contenedor scrollable del historial.
     * 
     * - h-[60vh]: altura fija para simular terminal real
     * - overflow-y-auto: permite scroll vertical
     * - overflow-x-hidden: evita desbordamiento horizontal
     * - font-mono: estética de terminal
     */
    <div class="terminal-scroll p-4 font-mono text-[var(--white-soft)] text-sm h-[60vh] overflow-y-auto overflow-x-hidden">

      {/* Renderizado del historial de salida */}
      {terminal.output.map((item: TerminalOutputItem) =>
        item.type === "raw" ? (
          /**
           * RAW:
           *  - Se respeta el formato exacto
           *  - Se usa <pre> para mantener saltos y espacios
           */
          <pre class="whitespace-pre mb-2">{item.content}</pre>
        ) : (
          /**
           * HTML:
           *  - Se usa dangerouslySetInnerHTML porque el contenido está controlado
           *  - No hay riesgo de XSS ya que los datos vienen de JSON internos
           *  - whitespace-pre-wrap mantiene saltos de línea y evita overflow
           */
          <div
            class="whitespace-pre-wrap break-words mb-2"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        )
      )}

      {/* Prompt final (solo si no se está animando un comando) */}
      {!terminal.isTypingCommand && (
        <div class="mt-4">
          <TerminalPrompt welcomeMessage={welcomeMessage} />
        </div>
      )}
    </div>
  );
}
