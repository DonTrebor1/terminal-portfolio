/**
 * Sistema de formateo para la terminal.
 *
 * Este archivo define funciones puras que transforman datos JSON
 * en bloques de texto/HTML listos para ser renderizados en la terminal.
 *
 * Decisiones de diseño:
 *  - Cada sección del portfolio tiene su propio formateador
 *  - Se evita mezclar lógica de UI con lógica de datos
 *  - Los formateadores devuelven strings listos para imprimir
 *  - Se permite HTML controlado para enriquecer la presentación
 *
 * Este enfoque mantiene:
 *  - Separación estricta de responsabilidades (SRP - SOLID)
 *  - Código fácil de mantener y extender
 *  - TerminalBody libre de lógica compleja
 */


/**
 * Aplica color a un icono usando estilos inline.
 *
 * Razón:
 *  - Los JSON contienen iconos simples (ej: [+])
 *  - Cada icono puede tener un color asociado
 *  - La terminal soporta HTML seguro, así que se usa <span>
 *
 * No se usa Tailwind aquí porque:
 *  - Los formateadores generan HTML dinámico
 *  - Tailwind no procesa clases generadas en tiempo de ejecución
 */
function colorIcon(icon: string, color: string): string {
  const colors: any = {
    green: "#00ff00",
    orange: "#ff9900",
    red: "#ff3333",
    blue: "#3399ff",
    yellow: "#ffff66",
    white: "#ffffff",
  };

  const hex = colors[color] || "#ffffff";

  return `<span style="color:${hex}">${icon}</span>`;
}


/**
 * Separador visual entre secciones.
 *
 * Se mantiene simple para conservar estética de terminal.
 */
export function sectionSeparator() {
  return "-----------------------------------------";
}


/**
 * Formateador para WHOAMI.
 *
 * Este es el más simple: solo inserta valores del JSON.
 * Se permite HTML en name y role.
 */
export function formatWhoami(data: any): string {
  return `
Nombre: ${data.name}
Rol: ${data.role}

${data.text}
`;
}


/**
 * Formateador para PERFIL.
 *
 * - Convierte listas de especialización y objetivos en líneas con iconos
 * - Permite HTML en títulos y descripciones
 * - Mantiene estructura clara tipo "sección"
 */
export function formatPerfil(data: any): string {
  const specialization = data.specialization
    .map((item: any) => `${colorIcon(item.icon, item.color)} ${item.text}`)
    .join("\n");

  const goals = data.goals
    .map((item: any) => `${colorIcon(item.icon, item.color)} ${item.text}`)
    .join("\n");

  return `
=== ${data.title.toUpperCase()} ===

${data.description}

=== ESPECIALIZACIÓN ===
${specialization}

=== OBJETIVOS ===
${goals}
`;
}


/**
 * Formateador para ESTUDIOS.
 *
 * - Recorre cada bloque de estudios
 * - Inserta iconos coloreados en los temas
 * - Mantiene indentación manual para simular formato CLI
 *
 * Importante:
 *  No se toca la indentación interna del template literal.
 */
export function formatEstudios(data: any): string {
  return `
=== ${data.title.toUpperCase()} ===
${data.items
    .map(
      (item: any) => `
${item.id} ${item.titulo} (${item.inicio} - ${item.fin})
     • Centro: ${item.centro}
     • Ubicación: ${item.ubicacion}
${item.temas
  .map(
    (t: any) =>
      `     ${t.icon ? colorIcon(t.icon, t.color) : "-"} ${t.text}`
  )
  .join("\n")}
`
    )
    .join("\n")}
`;
}


/**
 * Formateador para EXPERIENCIA.
 *
 * - Similar a estudios, pero con responsabilidades, logros y stack
 * - Se respeta indentación manual para mantener estética CLI
 */
export function formatExperiencia(data: any): string {
  return `
=== ${data.title.toUpperCase()} ===
${data.items
    .map((item: any) => {

      return `
${item.id} ${item.puesto} (${item.inicio} - ${item.fin})
     • Empresa: ${item.empresa}
     • Ubicación: ${item.ubicacion}

     • Responsabilidades:
${item.responsabilidades
  .map(
    (r: any) =>
      `     ${r.icon ? colorIcon(r.icon, r.color) : "-"} ${r.text}`
  )
  .join("\n")}

     • Logros:
${item.logros
  .map(
    (l: any) =>
      `     ${colorIcon(l.icon, l.color)} ${l.text}`
  )
  .join("\n")}

     • Stack:
${item.stackGroups
  .map(
    (group: any) =>
      `     ${colorIcon(group.icon, group.color)} ${group.title}: ${group.items.join(", ")}`
  )
  .join("\n")}
`;
    })
    .join("\n")}
`;
}



/**
 * Formateador para SKILLS.
 *
 * - Recorre categorías
 * - Inserta iconos coloreados
 * - Mantiene estructura simple y clara
 */
export function formatSkills(data: any): string {
  return `
=== ${data.title.toUpperCase()} ===
${data.categorias
    .map(
      (cat: any) => `
${cat.nombre}
${cat.items
  .map(
    (i: any) =>
      `${i.icon ? colorIcon(i.icon, i.color) : "-"} ${i.text}`
  )
  .join("\n")}
`
    )
    .join("\n")}
`;
}


/**
 * Formateador para CERTIFICACIONES.
 *
 * - Divide en tres bloques: obtenidas, en preparación, objetivos
 * - Usa linkify para convertir URLs en enlaces clicables
 * - Mantiene indentación manual
 */
export function formatCertificaciones(data: any): string {
  const safeList = (v: any) => (Array.isArray(v) ? v : []);
  const safeStr = (v: any) => (typeof v === "string" ? v : "");

  const renderCert = (c: any) => {
    const nombre = safeStr(c?.nombre);
    const anio = safeStr(c?.anio);
    const id = safeStr(c?.id);
    const url = safeStr(c?.url);
    const detalles = safeList(c?.detalles);

    return `     ${c?.icon ? colorIcon(c.icon, c.color) : "-"} ${nombre}${anio ? ` (${anio})` : ""}${
      id ? `\n       ID: ${id}` : ""
    }${url ? `
       URL: <a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>` : ""}${
      detalles.length
        ? `\n${detalles.map((d: any) => `       - ${d}`).join("\n")}`
        : ""
    }`;
  };

  return `
=== ${safeStr(data?.title).toUpperCase()} ===

• OBTENIDAS:
${safeList(data?.obtenidas).map(renderCert).join("\n\n") || "     -"}

• EN CURSO:
${safeList(data?.enPreparacion).map(renderCert).join("\n\n") || "     -"}

• OBJETIVOS:
${safeList(data?.objetivos)
  .map((o: any) => `     ${o?.icon ? colorIcon(o.icon, o.color) : "-"} ${safeStr(o?.nombre)}`)
  .join("\n") || "     -"}
`;
}



/**
 * Convierte URLs en enlaces HTML clicables.
 *
 * Razón:
 *  - Los JSON contienen URLs en texto plano
 *  - La terminal soporta HTML seguro
 *  - Esto permite abrir enlaces sin romper la estética CLI
 */
function linkify(text: string): string {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(
    urlRegex,
    (url) => `<a href="${url}" target="_blank" style="color:#3399ff">${url}</a>`
  );
}


/**
 * Formateador para CONTACTO.
 *
 * - Inserta iconos coloreados
 * - Convierte URLs en enlaces
 * - Mantiene estructura clara por secciones
 */
export function formatContacto(data: any): string {
  const safeList = (v: any) => (Array.isArray(v) ? v : []);
  const safeStr = (v: any) => (typeof v === "string" ? v : "");

  const linkify = (value: string) => {
    const v = safeStr(value);
    if (v.startsWith("http://") || v.startsWith("https://")) {
      return `<a href="${v}" target="_blank" rel="noopener noreferrer">${v}</a>`;
    }
    return v;
  };

  const items = safeList(data?.items)
    .map((i: any) => {
      const icon = i?.icon ? colorIcon(i.icon, i.color) : "-";
      const label = safeStr(i?.label);
      const value = linkify(i?.value);
      return `     ${icon} ${label}: ${value}`;
    })
    .join("\n");

  const disp = safeList(data?.disponibilidad)
    .map((d: any) => {
      const icon = d?.icon ? colorIcon(d.icon, d.color) : "-";
      return `     ${icon} ${safeStr(d?.text)}`;
    })
    .join("\n");

  // idiomas ya NO se pintan aquí (los has movido a skills)
  return `
=== ${safeStr(data?.title).toUpperCase()} ===

${items || "     -"}

${disp ? "\n• DISPONIBILIDAD:\n" + disp : ""}
`;
}



/**
 * Convierte saltos de línea en <br>.
 *
 * Se usa para mensajes RAW o errores.
 */
export function textToHtml(text: string): string {
  return text.replace(/\n/g, "<br>");
}
