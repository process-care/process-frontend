import { extendTheme } from "@chakra-ui/react";
import "@fontsource/ibm-plex-sans";

const theme = extendTheme({
  fonts: {
    body: "IBM Plex Sans",
    heading: "IBM Plex Sans",
    mono: "IBM Plex Sans",
  },
  colors: {
    brand: {
      blue: "#0084FF",
    },
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
    FormLabel: {
      baseStyle: {
        fontWeight: 500,
        fontSize: "14px",
        fontFamily: "IBM Plex Sans",
      },
    },

    Button: {
      sizes: {
        xl: {
          h: "56px",
          fontSize: "lg",
          px: "32px",
        },
      },

      variants: {
        link: () => ({
          color: "black",
          textDecoration: "underline",
          fontWeight: "regular",
          _hover: {
            color: "gray.600",
          },
        }),
        box: () => ({
          borderRadius: "none",
          border: "1px solid",
          borderColor: "#E5E5E5",
          textTransform: "uppercase",
          fontSize: "12px",
          lineHeight: "16px",
          padding: 10,
          margin: 2,
          fontWeight: "normal",
          backgroundColor: "#F6F6F6",
          _hover: {
            bg: "gray.200",
          },
        }),
        rounded: () => ({
          bg: "black",
          borderRadius: "50px",
          color: "white",
          padding: "0 30px",
          border: "1px solid",
          fontWeight: "bold",
          _hover: {
            bg: "gray.800",
            color: "black",
          },
        }),
        roundedBlue: () => ({
          bg: "brand.blue",
          borderRadius: "50px",
          color: "white",
          padding: "0 30px",
          fontWeight: "regular",
          _hover: {
            bg: "blue",
            color: "white",
          },
        }),
        roundedTransparent: () => ({
          bg: "transparent",
          borderRadius: "50px",
          fontSize: "12px",
          color: "black",
          padding: "0 20px",
          border: "1px solid",
          _hover: {
            bg: "black",
            color: "white",
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
