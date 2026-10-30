# Mi Tarjeta

Tarjeta de presentación personal construida con React y Vite. Muestra el perfil, una breve biografía, intereses y un enlace a Instagram, con temas claro y oscuro y un contador de "me gusta" persistente.

## Stack

- React 19
- Vite 8
- JavaScript (JSX)
- Oxlint

## Comandos

```bash
npm install      # Instalar dependencias
npm run dev      # Servidor de desarrollo con HMR
npm run lint     # Analizar el código con Oxlint
npm run build    # Generar la versión de producción en dist/
npm run preview  # Previsualizar la build de producción
```

## Estructura

```text
.
├── index.html                 # Documento base y aplicación inicial del tema
├── public/
│   └── favicon.svg
├── src/
│   ├── main.jsx               # Punto de entrada de React
│   ├── App.jsx                # Tarjeta: perfil, intereses, like y tema
│   ├── App.css                # Estilos de la tarjeta
│   ├── design-tokens.css      # Tokens de color, tipografía y radios
│   ├── index.css              # Reset, estilos globales y accesibilidad
│   └── assets/
│       └── mifoto.jpeg
├── AGENTS.md                  # Directrices de diseño y flujo de trabajo
└── vite.config.js
```

## Diseño

La interfaz sigue un enfoque minimalista, semántico y accesible, según lo descrito en `AGENTS.md`.

- **Temas**: oscuro por defecto y claro opcional; la preferencia se guarda en `localStorage`.
- **Paleta**: grises neutros con acento verde neón (`#c8f751`).
- **Persistencia**: tema, cantidad de likes y estado del like se conservan entre visitas.
- **Accesibilidad**: HTML semántico, enlace para saltar al contenido, foco visible, textos alternativos, `aria-live` en el contador y soporte para `prefers-reduced-motion`.

## Personalización

Los colores y demás decisiones visuales viven en `src/design-tokens.css`. El contenido del perfil se edita en la constante `PROFILE` de `src/App.jsx`, y el enlace de Instagram en `INSTAGRAM_URL`.
