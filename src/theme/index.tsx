import { extendTheme } from "@chakra-ui/react";
const theme = extendTheme({
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
          padding: 10,
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
