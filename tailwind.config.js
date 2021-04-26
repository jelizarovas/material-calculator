const plugin = require("tailwindcss/plugin");

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {},
  plugins: [
    plugin(function ({ addComponents, theme }) {
      const buttons = {
        ".btn": {
          padding: `${theme("spacing.2")} ${theme("spacing.4")}`,
          borderRadius: theme("borderRadius.md"),
          fontWeight: theme("fontWeight.600"),
        },
        ".btn-indigo": {
          backgroundColor: theme("colors.indigo.500"),
          color: theme("colors.white"),
          "&:hover": {
            backgroundColor: theme("colors.indigo.600"),
          },
        },
      };

      addComponents(buttons);
    }),
  ],
};
