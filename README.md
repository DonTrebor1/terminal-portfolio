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

# 📁 **Portfolio Terminal — DONTREBOR1**

Un portfolio interactivo inspirado en una terminal Linux, diseñado para ofrecer una experiencia inmersiva, elegante y profesional. Construido con **Preact + TypeScript + TailwindCSS + Vite**, con una estética cyberpunk propia (verde + violeta) y soporte bilingüe ES/EN.

## 🚀 **Demo**

[https://dontrebor1.github.io/terminal-portfolio/]

## 🧩 **Características principales**

- **Terminal interactiva real:** Comandos animados, historial, prompt dinámico y formateadores personalizados.
    
- **Login animado estilo hacker:** Escribe usuario y contraseña automáticamente antes de entrar al sistema.
    
- **Fondo cyber grid en canvas:** Rejilla + scanline animada, optimizada para rendimiento.
    
- **Bilingüe ES/EN:** Selector de idioma persistente, con todo el contenido y la UI traducidos.
    
- **Diseño responsive completo:** Adaptado a móvil, tablet y desktop con banners ASCII dinámicos.
    
- **Menú lateral mobile-first:** Navegación rápida mediante comandos predefinidos.
    
- **Código altamente documentado** Comentarios profesionales explicando intención, arquitectura y decisiones.

## 🛠️ **Tecnologías utilizadas**

| Tecnología            | Uso                                      |
| --------------------- | ---------------------------------------- |
| **Preact**            | UI ligera y rápida                       |
| **TypeScript**        | Tipado estático y robustez               |
| **TailwindCSS**       | Estilos utilitarios y diseño consistente |
| **Vite**              | Bundler ultrarrápido                     |
| **Canvas API**        | Fondo cyber grid animado                 |
| **JSON estructurado** | Datos del portfolio                      |

## 📂 **Estructura del proyecto**

```
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
```

- **components/** → UI modular y desacoplada
    
- **core/hooks/** → lógica de negocio (useTerminal)
    
- **data/** → JSON con contenido del portfolio
    
- **utils/** → formateadores y helpers
    
- **styles/** → estilos globales y Tailwind

## 🧱 **Decisiones de arquitectura**

- **Separación estricta UI ↔ lógica:** La terminal funciona mediante un hook central (`useTerminal`) totalmente desacoplado de la UI.
    
- **Formateadores puros:** Cada sección del portfolio tiene su propio formateador, lo que facilita mantenimiento y escalabilidad.
    
- **JSON como fuente de datos:** El contenido del portfolio es editable sin tocar código.
    
- **Canvas independiente:** El fondo animado no afecta al rendimiento de la UI.
    
- **Documentación exhaustiva:** Cada archivo explica intención, no solo funcionamiento.

## 🗺️ **Roadmap**

- [ ] Añadir sección de PROYECTOS
- [ ] Añadir descarga de CV
- [x] Añadir función para cambiar idioma a Inglés
- [x] Cambiar la estética a un tema propio (verde + violeta cyberpunk)
- [ ] Añadir animación de glitch opcional

## 👤 **Autor**

**Robert Bou Poveda** 
Analista de Ciberseguridad · Pentester
[LinkedIn](https://www.linkedin.com/in/robert-bou-poveda-919295248) | [GitHub](https://github.com/DonTrebor1) | robertbp90@gmail.com
