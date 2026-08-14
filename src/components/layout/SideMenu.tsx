/**
 * Menú lateral de navegación.
 *
 * Este componente está diseñado con enfoque mobile-first:
 *  - En pantallas pequeñas actúa como menú principal
 *  - En pantallas grandes complementa al menú del header
 *
 * Responsabilidades:
 *  - Mostrar/ocultar el menú mediante animaciones CSS
 *  - Renderizar accesos rápidos a los comandos de la terminal
 *  - Cerrar automáticamente al seleccionar una opción
 *  - Mostrar un overlay que bloquea la interacción con el fondo
 *
 * Importante:
 *  - No contiene lógica de negocio
 *  - No interpreta comandos
 *  - Solo delega en runCommand(), que proviene de useTerminal()
 *
 * Esto mantiene la UI completamente desacoplada de la lógica interna (SRP - SOLID).
 */

const LABELS = {
  es: {
    navegacion: "Navegación",
    whoami: "WHOAMI",
    perfil: "PERFIL",
    estudios: "ESTUDIOS",
    experiencia: "EXPERIENCIA",
    habilidades: "HABILIDADES",
    certificaciones: "CERTIFICACIONES",
    contacto: "CONTACTO",
    allInfo: "ALL INFO",
    masOpciones: "Más opciones",
    proximamente: "Próximamente...",
    idioma: "Idioma",
  },
  en: {
    navegacion: "Navigation",
    whoami: "WHOAMI",
    perfil: "PROFILE",
    estudios: "EDUCATION",
    experiencia: "EXPERIENCE",
    habilidades: "SKILLS",
    certificaciones: "CERTIFICATIONS",
    contacto: "CONTACT",
    allInfo: "ALL INFO",
    masOpciones: "More options",
    proximamente: "Coming soon...",
    idioma: "Language",
  },
};

export default function SideMenu({
  open,
  onClose,
  runCommand,
  lang = "es",
  onSetLang,
}: {
  open: boolean;                           // Controla si el menú está visible
  onClose: () => void;                     // Cierra el menú (solo UI)
  runCommand: (cmd: string) => Promise<void>; // Ejecuta comandos en la terminal
  lang?: "es" | "en";                        // Idioma actual
  onSetLang?: (lang: "es" | "en") => void;   // Cambia el idioma
}) {
  const t = LABELS[lang];
  return (
    <>
      {/**
       * OVERLAY OSCURO
       *
       * - Cubre toda la pantalla cuando el menú está abierto
       * - Permite cerrar el menú haciendo clic fuera
       * - Usa pointer-events-none cuando está oculto para evitar capturar clics
       *
       * Animaciones:
       *  - opacity-0 → opacity-100 con transición suave
       */}
      <div
        class={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-40 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>

      {/**
       * MENÚ LATERAL
       *
       * - Posicionado a la derecha
       * - Se desplaza con transform: translate-x-full → translate-x-0
       * - Mantiene estética cyberpunk con bordes cian y fondo oscuro
       *
       * Decisión de diseño:
       *  - Se usa transform en lugar de left/right para animaciones más fluidas
       *  - Se mantiene z-50 para estar por encima del overlay
       */}
      <aside
        class={`fixed top-0 right-0 h-full w-64 bg-[#0a0a0a] border-l border-[var(--accent)] shadow-xl z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div class="p-6 font-mono text-[var(--white-soft)] space-y-8">

          {/**
           * NAVEGACIÓN PRINCIPAL (solo visible en móvil)
           *
           * Cada botón:
           *  - Cierra el menú
           *  - Ejecuta un comando en la terminal
           *
           * Esto permite navegar sin escribir manualmente.
           */}
          <div class="space-y-2 lg:hidden">
            <p class="text-sm text-[var(--gray-terminal)]">{t.navegacion}</p>

            {/* WHOAMI */}
            <button
              class="w-full text-left px-3 py-2 bg-black border border-white-600 rounded hover:bg-[var(--accent)]/20 transition"
              onClick={() => {
                onClose();
                runCommand("whoami");
              }}
            >
              {t.whoami}
            </button>

            {/* PERFIL */}
            <button
              class="w-full text-left px-3 py-2 bg-black border border-white-600 rounded hover:bg-[var(--accent)]/20 transition"
              onClick={() => {
                onClose();
                runCommand("cat profile.txt");
              }}
            >
              {t.perfil}
            </button>

            {/* ESTUDIOS */}
            <button
              class="w-full text-left px-3 py-2 bg-black border border-white-600 rounded hover:bg-[var(--accent)]/20 transition"
              onClick={() => {
                onClose();
                runCommand("cat edu.txt");
              }}
            >
              {t.estudios}
            </button>

            {/* EXPERIENCIA */}
            <button
              class="w-full text-left px-3 py-2 bg-black border border-white-600 rounded hover:bg-[var(--accent)]/20 transition"
              onClick={() => {
                onClose();
                runCommand("cat exp.txt");
              }}
            >
              {t.experiencia}
            </button>

            {/* HABILIDADES */}
            <button
              class="w-full text-left px-3 py-2 bg-black border border-white-600 rounded hover:bg-[var(--accent)]/20 transition"
              onClick={() => {
                onClose();
                runCommand("cat skills.txt");
              }}
            >
              {t.habilidades}
            </button>

            {/* CERTIFICACIONES */}
            <button
              class="w-full text-left px-3 py-2 bg-black border border-white-600 rounded hover:bg-[var(--accent)]/20 transition"
              onClick={() => {
                onClose();
                runCommand("cat certs.txt");
              }}
            >
              {t.certificaciones}
            </button>

            {/* CONTACTO */}
            <button
              class="w-full text-left px-3 py-2 bg-black border border-white-600 rounded hover:bg-[var(--accent)]/20 transition"
              onClick={() => {
                onClose();
                runCommand("cat contact.txt");
              }}
            >
              {t.contacto}
            </button>

            {/* ALL INFO */}
            <button
              class="w-full text-left px-3 py-2 bg-black border border-[var(--accent)] rounded hover:bg-[var(--accent)]/20 transition text-[var(--accent)]"
              onClick={() => {
                onClose();
                runCommand("whoami && cat *.txt");
              }}
            >
              {t.allInfo}
            </button>
          </div>

          {/**
           * SECCIÓN FUTURA
           *
           * Espacio reservado para futuras funcionalidades:
           *  - Cambio de tema (Hacker/Red Team/Blue Team)
           *  - Ajustes de idioma
           *  - ...
           *
           */}
          {/* <div class="space-y-2"> ... </div> */}

          {/**
           * SECCIÓN "Más opciones"
           *
           * Contiene el selector de idioma (ES/EN).
           */}
          <div class="space-y-2">
            <p class="text-sm text-[var(--gray-terminal)]">{t.masOpciones}</p>

            {onSetLang && (
              <div>
                <p class="text-xs text-[var(--gray-terminal)] mb-1">{t.idioma}</p>
                <div class="flex font-mono text-sm border border-[var(--accent)] rounded overflow-hidden">
                  <button
                    class={`flex-1 py-2 transition ${
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
                    class={`flex-1 py-2 transition border-l border-[var(--accent)] ${
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
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
