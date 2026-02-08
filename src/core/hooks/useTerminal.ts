/**
 * Hook principal que gestiona toda la lógica de la terminal.
 *
 * Este hook encapsula:
 *  - Estado del historial de salida
 *  - Animación de escritura del comando
 *  - Ejecución de comandos (router interno)
 *  - Limpieza y helpers de impresión
 *
 * La UI (TerminalBody, TerminalPrompt, etc.) nunca conoce la lógica interna.
 * Esto sigue el principio de separación de responsabilidades (SRP - SOLID).
 */
import { useState } from "preact/hooks";

// Importación de datos estáticos (contenido mostrado en la terminal)
import whoami from "../../data/whoami.json";
import perfil from "../../data/perfil.json";
import estudios from "../../data/estudios.json";
import experiencia from "../../data/experiencia.json";
import skills from "../../data/skills.json";
import certificaciones from "../../data/certificacaiones.json";
import contacto from "../../data/contacto.json";
import ascii from "../../data/ascii.json";

// Importación de formateadores (responsables de convertir JSON → HTML)
import {
  formatWhoami,
  formatPerfil,
  formatEstudios,
  formatExperiencia,
  formatSkills,
  formatCertificaciones,
  formatContacto,
  sectionSeparator,
  textToHtml,
} from "../utils/formatters";

export function useTerminal() {
  /**
   * Selección del banner inicial según tamaño de pantalla.
   * Esto mejora la UX en móvil/tablet/desktop sin duplicar lógica en la UI.
   */
  const width = window.innerWidth;
  let initialBanner = ascii.bannerDesktop;
  if (width < 640) initialBanner = ascii.bannerMobile;
  else if (width < 1024) initialBanner = ascii.bannerTablet;

  /**
   * Estado principal de la terminal.
   * - output: historial de líneas renderizadas
   * - isTyping: indica si se está animando la escritura
   * - isTypingCommand: evita mostrar el prompt mientras se escribe
   * - hasInteracted: controla el mensaje de bienvenida
   */
  type OutputItem = {
    type: "raw" | "html";
    content: string;
  };

  const [output, setOutput] = useState<OutputItem[]>([
    { type: "raw", content: initialBanner },
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const [isTypingCommand, setIsTypingCommand] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  /**
   * Limpia la terminal completamente.
   * Se usa antes de ejecutar cualquier comando para simular comportamiento real.
   */
  function clear() {
    setOutput([]);
  }

  /**
   * Añade una nueva línea al historial.
   * type = "raw" → se respeta formato exacto
   * type = "html" → se interpreta como HTML seguro (contenido controlado)
   */
  function print(text: string, type: "raw" | "html" = "html") {
    setOutput((prev) => [...prev, { type, content: text }]);
  }

  /**
   * Animación de escritura del comando.
   *
   * Esta función:
   *  - Inserta un prompt vacío
   *  - Reemplaza progresivamente su contenido para simular typing
   *  - Controla flags de animación para sincronizar UI
   *
   * Se usa antes de ejecutar cualquier comando real.
   */
  async function typeCommand(cmd: string) {
    setIsTyping(true);
    setIsTypingCommand(true);
    let typed = "";
    const promptStart =
      `<div class="font-mono text-sm leading-tight">` +
      `<div class="text-[var(--red-accent)]">` +
      `┌──(<span class="text-[var(--white-soft)]">kali</span>` +
      `<span class="text-[var(--red-soft)]">㉿</span>` +
      `<span class="text-[var(--white-soft)]">portfolio</span>)-[` +
      `<span class="text-[var(--white-soft)]">~</span>]</div>` +
      `<div class="flex items-center">` +
      `<span class="text-[var(--red-accent)]">└─$</span>` +
      `<span class="ml-2 text-[var(--white-soft)]">`;
    const promptEnd = `</span></div></div>`;

    // Insertamos el prompt vacío
    setOutput((prev) => [
      ...prev,
      { type: "html", content: promptStart + promptEnd },
    ]);

    // Animación carácter por carácter
    for (let i = 0; i < cmd.length; i++) {
      typed = cmd.slice(0, i + 1);
      setOutput((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          type: "html",
          content: promptStart + typed + promptEnd,
        };
        return updated;
      });
      await new Promise((res) => setTimeout(res, 40));
    }
    setIsTyping(false);
    setIsTypingCommand(false);
  }

  /**
   * Composición del comando "ALL INFO".
   *
   * Este comando concatena todas las secciones formateadas.
   * Se mantiene aquí para evitar duplicación en el router.
   */
  function generateAllInfo() {
    return `
${formatWhoami(whoami)}
${sectionSeparator()}

${formatPerfil(perfil)}
${sectionSeparator()}

${formatEstudios(estudios)}
${sectionSeparator()}

${formatExperiencia(experiencia)}
${sectionSeparator()}

${formatSkills(skills)}
${sectionSeparator()}

${formatCertificaciones(certificaciones)}
${sectionSeparator()}

${formatContacto(contacto)}
`;
  }

  /**
   * Router principal de comandos.
   *
   * Cada comando:
   *  - Limpia la terminal
   *  - Ejecuta animación de typing
   *  - Imprime la sección correspondiente
   *
   * Se mantiene simple y explícito para facilitar mantenimiento.
   */
  async function runCommand(cmd: string) {
    setHasInteracted(true);
    clear();
    await typeCommand(cmd);

    switch (cmd) {
      case "whoami":
        print(formatWhoami(whoami), "html");
        break;
      case "cat profile.txt":
        print(formatPerfil(perfil), "html");
        break;
      case "cat edu.txt":
        print(formatEstudios(estudios), "html");
        break;
      case "cat exp.txt":
        print(formatExperiencia(experiencia), "html");
        break;
      case "cat skills.txt":
        print(formatSkills(skills), "html");
        break;
      case "cat certs.txt":
        print(formatCertificaciones(certificaciones), "html");
        break;
      case "cat contact.txt":
        print(formatContacto(contacto), "html");
        break;
      case "whoami && cat *.txt":
        print(generateAllInfo(), "html");
        break;
      default:
        print(textToHtml(`Comando no encontrado: ${cmd}`), "html");
    }
  }

  // API pública del hook
  return {
    output,
    isTyping,
    isTypingCommand,
    hasInteracted,
    runCommand,
    clear,
  };
}
