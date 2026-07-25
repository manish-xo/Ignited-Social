module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-bricolage)"],
        mono: ["var(--font-jetbrains)"],
        body: ["var(--font-sfPro)", "sans-serif"],
      },
      color: {
        canvas: "#FAF9F6",
        ink: "#221F1B",
        // action: "#5A4CE0",

        secondary: "#5E5C58", // 700 · secondary body text, captions, metadata
        muted: "#858380", // 500 · large text/icons/UI accents only
        placeholder: "#9F9D9A", // 400 · input placeholders, disabled text
        "border-strong": "#CFCDCA", // 300 · input outlines, visible dividers
        border: "#E0DFDC", // 200 · default card borders, table lines
        hairline: "#EBEAE7", // 100 · subtle separators, low-contrast dividers
        "subtle-bg": "#F2F1EE", // 50  · raised panels, hover rows, code blocks

        action: {
          Default: "#5A4CEO",
          hover: "#5145C0",
          active: "#493EA5",
          shadow: "#3D357A",
          large: "#6A5EE3",
          subtle: "#7E73E7",
          "on-dark-border": "#9F97ED",
          "on-dark": "#BAB4F2",
          tint: "#DAD6F2",
          "tint-bg": "#EDEBF4",
        },
      },
    },
  },
  plugins: [],
};
