/**
 * Header principal de la aplicación en modo terminal.
 *
 * Este componente cumple varias funciones clave:
 *  - Mostrar la identidad visual del portfolio (logo estilo hacker)
 *  - Ofrecer navegación rápida mediante comandos predefinidos
 *  - Gestionar el menú lateral en dispositivos móviles
 *
 * Importante:
 *  - Este componente NO ejecuta lógica de negocio.
 *  - Solo delega en runCommand(), que proviene de useTerminal().
 *  - Mantiene la UI desacoplada de la lógica interna (SRP - SOLID).
 *
 * Diseño:
 *  - Mobile-first: en pantallas pequeñas se oculta el menú central
 *  - Desktop: se muestra navegación completa
 *  - Botón hamburguesa siempre visible para UX consistente
 */

const LABELS = {
  es: {
    whoami: "WHOAMI",
    perfil: "PERFIL",
    estudios: "ESTUDIOS",
    experiencia: "EXPERIENCIA",
    habilidades: "HABILIDADES",
    certificaciones: "CERTIFICACIONES",
    contacto: "CONTACTO",
    allInfo: "ALL INFO",
  },
  en: {
    whoami: "WHOAMI",
    perfil: "PROFILE",
    estudios: "EDUCATION",
    experiencia: "EXPERIENCE",
    habilidades: "SKILLS",
    certificaciones: "CERTIFICATIONS",
    contacto: "CONTACT",
    allInfo: "ALL INFO",
  },
};

export default function PageHeader({
  onMenuToggle,
  runCommand,
  lang = "es",
  onSetLang,
}: {
  onMenuToggle: () => void;                 // Abre el menú lateral (solo UI)
  runCommand: (cmd: string) => Promise<void>; // Ejecuta comandos en la terminal
  lang?: "es" | "en";                         // Idioma actual
  onSetLang?: (lang: "es" | "en") => void;    // Cambia el idioma
}) {
  const t = LABELS[lang];
  return (
    /**
     * Header fijo en la parte superior.
     * 
     * - bg-black/80 + backdrop-blur-sm → efecto de cristal oscuro
     * - border-[var(--accent)] → coherencia con la estética cyberpunk
     * - fixed + z-50 → siempre visible por encima del contenido
     */
    <header class="w-full bg-black/80 border-b border-[var(--accent)] backdrop-blur-sm fixed top-0 left-0 z-50">
      <nav class="max-w-7xl mx-auto px-6 py-4 flex items-center">

        {/** 
         * LOGO (columna izquierda)
         *
         * Representa la identidad del portfolio.
         * Se usa tipografía monoespaciada y colores rojos para mantener
         * coherencia visual con el resto de la interfaz.
         */}
        <div class="flex-shrink-0">
          <div class="text-[var(--accent)] font-mono font-bold text-lg">
            <span class="text-[var(--accent-soft)] mr-2">&gt;</span>DONTREBOR1
          </div>
        </div>

        {/**
         * MENÚ CENTRAL (solo visible en pantallas grandes)
         *
         * Cada botón ejecuta un comando en la terminal.
         * Esto permite navegar por el portfolio sin escribir manualmente.
         *
         * Decisión de diseño:
         *  - Se usa runCommand() directamente para mantener la UI simple.
         *  - No se usa router ni lógica adicional.
         */}
        <div class="hidden lg:flex flex-1 justify-center space-x-6 font-mono text-sm">
          <button class="nav-btn" onClick={() => runCommand("whoami")}>
            {t.whoami}
          </button>
          <button class="nav-btn" onClick={() => runCommand("cat profile.txt")}>
            {t.perfil}
          </button>
          <button class="nav-btn" onClick={() => runCommand("cat edu.txt")}>
            {t.estudios}
          </button>
          <button class="nav-btn" onClick={() => runCommand("cat exp.txt")}>
            {t.experiencia}
          </button>
          <button class="nav-btn" onClick={() => runCommand("cat skills.txt")}>
            {t.habilidades}
          </button>
          <button class="nav-btn" onClick={() => runCommand("cat certs.txt")}>
            {t.certificaciones}
          </button>
          <button class="nav-btn" onClick={() => runCommand("cat contact.txt")}>
            {t.contacto}
          </button>

          {/**
           * ALL INFO:
           * Ejecuta un comando compuesto que concatena todas las secciones.
           * Útil para reclutadores que quieren una visión completa.
           */}
          <button
            class="nav-btn text-[var(--accent)]"
            onClick={() => runCommand("whoami && cat *.txt")}
          >
            {t.allInfo}
          </button>
        </div>

        {/**
         * COLUMNA DERECHA
         *
         * Contiene:
         *  - Botón de idioma ES/EN
         *  - Botón hamburguesa (siempre visible)
         *
         * Decisión de diseño:
         *  - El botón hamburguesa se mantiene visible incluso en desktop
         *    para mantener consistencia visual y accesibilidad.
         */}
        <div class="flex items-center space-x-4 ml-auto flex-shrink-0">
          {onSetLang && (
            <div class="flex font-mono text-xs border border-[var(--accent)] rounded overflow-hidden">
              <button
                class={`px-2 py-1 transition ${
                  lang === "es"
                    ? "bg-[var(--accent)] text-black font-bold"
                    : "text-[var(--accent)] hover:bg-[var(--accent)]/20"
                }`}
                onClick={() => onSetLang("es")}
                aria-pressed={lang === "es"}
              >
                ES
              </button>
              <button
                class={`px-2 py-1 transition border-l border-[var(--accent)] ${
                  lang === "en"
                    ? "bg-[var(--accent)] text-black font-bold"
                    : "text-[var(--accent)] hover:bg-[var(--accent)]/20"
                }`}
                onClick={() => onSetLang("en")}
                aria-pressed={lang === "en"}
              >
                EN
              </button>
            </div>
          )}
          <button class="flex flex-col space-y-1" onClick={onMenuToggle}>
            <span class="block w-6 h-[2px] bg-[var(--accent-soft)]"></span>
            <span class="block w-6 h-[2px] bg-[var(--accent-soft)]"></span>
            <span class="block w-6 h-[2px] bg-[var(--accent-soft)]"></span>
          </button>
        </div>
      </nav>
    </header>
  );
}
