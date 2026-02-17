<p align="center">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Preact-673AB8?style=for-the-badge&logo=preact&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
</p>
<p align="center">
  <img src="https://img.shields.io/badge/GitHub%20Pages-Deployed-0A0A0A?style=for-the-badge&logo=github&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge" />
</p>

🖥️ Terminal Portfolio — DONTREBOR1

Portfolio interactivo con estética de terminal Linux, diseñado para simular una experiencia real de consola orientada al mundo de la ciberseguridad ofensiva.

Construido con Preact + TypeScript + TailwindCSS + Vite, con una ambientación visual inspirada en entornos Red Team / Kali Linux.

🌐 Demo en vivo

👉 https://dontrebor1.github.io/terminal-portfolio/

✨ Funcionalidades destacadas

🔹 Simulación de terminal real
Sistema de comandos con historial, prompt dinámico, animaciones de escritura y renderizado personalizado de contenido.

🔹 Acceso estilo hacker automatizado
Pantalla de login animada que introduce usuario y contraseña automáticamente antes de iniciar la sesión.

🔹 Background tipo Matrix
Animación desarrollada con Canvas API, optimizada para no afectar el rendimiento principal.

🔹 Diseño completamente responsive
Interfaz adaptable a móvil, tablet y escritorio, incluyendo banners ASCII dinámicos según resolución.

🔹 Navegación rápida en dispositivos móviles
Menú lateral optimizado con acceso directo a comandos frecuentes.

🔹 Código estructurado y comentado profesionalmente
Cada módulo incluye comentarios que explican la intención arquitectónica y las decisiones técnicas.

🧰 Stack tecnológico
Tecnología	Rol dentro del proyecto
Preact	Librería ligera para la interfaz
TypeScript	Tipado estático y robustez del código
TailwindCSS	Sistema de estilos utilitarios
Vite	Entorno de desarrollo y build ultrarrápido
Canvas API	Animación de fondo estilo Matrix
JSON estructurado	Fuente dinámica del contenido del portfolio
📦 Organización del proyecto
src/
 ├── components/
 │    ├── terminal/
 │    ├── layout/
 │    ├── login/
 │    └── background/
 ├── core/
 │    └── hooks/
 ├── data/
 ├── styles/
 └── utils/

Descripción general

components/ → Elementos visuales desacoplados

core/hooks/ → Lógica central (incluye useTerminal)

data/ → Contenido editable del portfolio

utils/ → Funciones auxiliares y formateadores

styles/ → Configuración global y Tailwind

🏗️ Enfoque arquitectónico

🔸 Separación clara entre interfaz y lógica de negocio.

🔸 Hook central (useTerminal) responsable del motor de la terminal.

🔸 Formateadores independientes por sección para facilitar escalabilidad.

🔸 Datos gestionados mediante JSON para permitir edición sin modificar lógica.

🔸 Animación Canvas aislada para mantener rendimiento óptimo.

🔸 Código documentado con enfoque profesional, explicando el por qué, no solo el cómo.

📌 Próximas mejoras

 Incorporar sección de proyectos detallados

 Añadir descarga directa de CV

 Implementar selector de idioma (ES / EN)

 Sistema de cambio de tema:

🟢 Hacker (verde)

🔴 Red Team (actual)

🔵 Blue Team

 Activar efecto glitch opcional

👤 **Autor**

**Robert Bou Poveda** 
Analista de Ciberseguridad · Pentester
[LinkedIn](www.linkedin.com/in/robert-bou-poveda-919295248/) | [GitHub](https://github.com/DonTrebor1) | robertbp90@gmail.com
