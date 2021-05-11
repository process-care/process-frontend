import { extendTheme } from "@chakra-ui/react";
const theme = extendTheme({
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
      },
    },
  },
});
export default theme;
