import { extendTheme } from "@chakra-ui/react";
const theme = extendTheme({
  fonts: {
    body: "system-ui, sans-serif",
    heading: "Georgia, serif",
    mono: "Menlo, monospace",
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem",
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  lineHeights: {
    normal: "normal",
    none: 1,
    shorter: 1.25,
    short: 1.375,
    base: 1.5,
    tall: 1.625,
    taller: "2",
    "3": ".75rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "7": "1.75rem",
    "8": "2rem",
    "9": "2.25rem",
    "10": "2.5rem",
  },
  letterSpacings: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
  components: {
    Button: {
      sizes: {
        xl: {
          h: "56px",
          fontSize: "lg",
          px: "32px",
        },
      },

      variants: {
        box: (props) => ({
          bg: "transparent",
          borderRadius: "none",
          padding: 5,
          border: "1px solid",
          fontSize: "25px",
          minWidth: "220px",
          margin: 2,
          fontWeight: "bold",
          borderColor: props.colorMode === "dark" ? "white" : "gray.800",
          _hover: {
            bg: props.colorMode === "dark" ? "white" : "gray.800",
            color: props.colorMode === "dark" ? "gray.800" : "white",
          },
        }),
        rounded: (props) => ({
          bg: "black",
          borderRadius: "50px",
          color: "white",
          padding: "0 30px",
          border: "1px solid",
          fontWeight: "bold",
          _hover: {
            bg: props.colorMode === "dark" ? "white" : "gray.800",
            color: props.colorMode === "dark" ? "gray.800" : "white",
          },
        }),
      },
    },
    Container: {
      variants: {
        inputContainer: (props) => ({
          margin: 5,
          border: "1px",
          padding: 4,
          borderRadius: 5,
          borderColor: props.colorMode === "dark" ? "white" : "gray.300",
          backgroundColor: "white",
          width: "-webkit-fill-available",
          maxWidth: "unset",
          _hover: {
            cursor: "grab",
          },
        }),
        createformColumn: (props) => ({
          bg: props.colorMode === "dark" ? "gray.100" : "white",
          color: props.colorMode === "dark" ? "white" : "gray.800",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          maxWidth: "unset",
          minWidth: "unset",
        }),
      },
    },
    Text: {
      variants: {
        label: () => ({
          fontSize: "14px",
          fontWeight: "bold",
        }),
      },
    },
  },
});
export default theme;
