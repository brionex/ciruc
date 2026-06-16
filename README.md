<h1 align="center">
  Validador de Cédula y RUC · Ecuador
</h1>

<p align="center">
  <a href="https://ciruc.brionex.xyz/">Accede a la herramienta →</a>
</p>

<p align="center">
  <img src="public/img/readme.png" alt="Captura de pantalla de la aplicación" title="Validador de Cédula y RUC" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License MIT" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite" alt="Vite 6" />
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss" alt="Tailwind CSS 4" />
</p>

## Descripción

Herramienta web para validar cédulas de ciudadanía y RUC ecuatorianos usando los algoritmos oficiales del SRI. La cédula se verifica mediante el **Módulo 10** y el RUC con el **Módulo 11**, cubriendo personas naturales, sociedades y entidades públicas.

## Características

- **Validación de Cédula** — Verifica cédulas ecuatorianas de 10 dígitos usando el algoritmo Módulo 10.
- **Validación de RUC** — Soporta validación para personas naturales, sociedades y entidades públicas usando Módulo 11.
- **100% local** — Sin dependencias CDN, todo se bundlea con Vite.
- **Modo oscuro** — Diseño moderno con tema oscuro.
- **Responsive** — Funciona en cualquier dispositivo.

## Tecnologías

| Herramienta | Propósito |
|---|---|
| [Vite 6](https://vitejs.dev/) | Build tool y dev server |
| [Tailwind CSS 4](https://tailwindcss.com/) | Estilos utilitarios |
| [Font Awesome 7](https://fontawesome.com/) | Iconos |
| [marked](https://marked.js.org/) | Procesamiento de Markdown |
| [Vitest](https://vitest.dev/) | Tests unitarios |

## Empezar

```bash
npm install
npm run dev      # Desarrollo con HMR
npm run build    # Build de producción
npm run preview  # Previsualizar build
npm test         # Ejecutar tests
npm run lint     # ESLint
npm run format   # Prettier
```

## Licencia

MIT — Creado por [brionex](https://brionex.xyz). Basado en el proyecto de [@bymoxb](https://github.com/bymoxb).
