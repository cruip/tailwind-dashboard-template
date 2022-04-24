const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        DEFAULT:
          "0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px 0 rgba(0, 0, 0, 0.02)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.02)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.01)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.01)",
      },
      outline: {
        blue: "2px solid rgba(0, 112, 244, 0.5)",
      },
      fontFamily: {
        gilroy: "Gilroy",
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.5" }],
        sm: ["0.875rem", { lineHeight: "1.5715" }],
        base: ["1rem", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
        lg: ["1.125rem", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
        xl: ["1.25rem", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
        "2xl": ["1.5rem", { lineHeight: "1.33", letterSpacing: "-0.01em" }],
        "3xl": ["1.88rem", { lineHeight: "1.33", letterSpacing: "-0.01em" }],
        "4xl": ["2.25rem", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
        "5xl": ["3rem", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
        "6xl": ["3.75rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
      },
      colors: {
        primary: {
          100: "#C8F0FA",
          200: "#93DDF6",
          300: "#5CBBE9",
          400: "#3396D1",
          500: "#0065B3",
          600: "#005099",
          700: "#003B81",
          800: "#002967",
          900: "#001D55",
        },
        secondary: {
          100: "#FFFACC",
          200: "#FFF39A",
          300: "#FFEB67",
          400: "#FFE241",
          500: "#FFD503",
          600: "#DBB302",
          700: "#B79201",
          800: "#937300",
          900: "#7A5D00",
        },
        info: {
          100: "#C8FCFE",
          200: "#96F3FB",
          300: "#61DEF4",
          400: "#3AC4E9",
          500: "#009EDD",
          600: "#007ABE",
          700: "#005C9F",
          800: "#00427F",
          900: "#002E6A",
        },
        warning: {
          100: "#FCF8CB",
          200: "#FBF096",
          300: "#F6E362",
          400: "#ECD33B",
          500: "#E3BD00",
          600: "#C19F00",
          700: "#A38201",
          800: "#836600",
          900: "#6C5300",
        },
        neutral: {
          100: "#E8EEF5",
          200: "#D2DCEB",
          300: "#A5B1C4",
          400: "#6F788A",
          500: "#2D323D",
          600: "#202634",
          700: "#161B2B",
          800: "#0E1223",
          900: "#080C1D",
        },
        danger: {
          100: "#FEE9D8",
          200: "#FECDB1",
          300: "#FCAB8A",
          400: "#FA8A6C",
          500: "#F8553D",
          600: "#D5342C",
          700: "#B21E23",
          800: "#8F1321",
          900: "#770B1F",
        },
        succes: {
          100: "#E0FAD3",
          200: "#BCF6A9",
          300: "#8AE679",
          400: "#5ECD55",
          500: "#25AD27",
          600: "#1B9528",
          700: "#137C27",
          800: "#0B6424",
          900: "#075322",
        },
      },
      screens: {
        xs: "480px",
      },
      borderWidth: {
        3: "3px",
      },
      minWidth: {
        36: "9rem",
        44: "11rem",
        56: "14rem",
        60: "15rem",
        72: "18rem",
        80: "20rem",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
      zIndex: {
        60: "60",
      },
    },
  },
  plugins: [
    // eslint-disable-next-line global-require
    require("@tailwindcss/forms"),
    // add custom variant for expanding sidebar
    plugin(({ addVariant, e }) => {
      addVariant("sidebar-expanded", ({ modifySelectors, separator }) => {
        modifySelectors(
          ({ className }) =>
            `.sidebar-expanded .${e(
              `sidebar-expanded${separator}${className}`
            )}`
        );
      });
    }),
  ],
};
