import { StyleFunctionProps, extendTheme } from "@chakra-ui/react";
import "@fontsource/ibm-plex-sans";

export const mobile = "30em";
export const tablet = "48em";
export const desktop = "62em";
export const bigScreen = "80em";
export const extraBigScreen = "96em";

const theme = extendTheme({
  styles: {
    global: {
      ".slate-a": {
        color: 'brand.blue',
        textDecoration: 'underline',
      }
    }
  },
  fonts: {
    body: "IBM Plex Sans",
    heading: "IBM Plex Sans",
    mono: "IBM Plex Sans",
  },
  colors: {
    brand: {
      blue: "#0084FF",
      gray: "#f7f7f7",
      "gray.100": "#F6F6F6",
      "gray.200": "#9E9E9E",
      red: "#FF4D4F",
      line: "rgb(234, 234, 239)",
      green: "#3EA919",
      alert: "#fedbdc",
    },
  },

  components: {
    FormLabel: {
      baseStyle: {
        fontWeight: "bold",
        fontSize: "14px",
        fontFamily: "IBM Plex Sans",
        marginBottom: "5px",
        marginTop: "10px",
      },
    },
    
    FormHelperText: {
      baseStyle: {
        fontSize: "5px",
        fontFamily: "IBM Plex Sans",
      },
    },

    Textarea: {
      baseStyle: {
        fontWeight: 500,
        fontSize: "14px",
        fontFamily: "IBM Plex Sans",
      },
    },

    Button: {
      sizes: {
        sm: {},
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
          fontSize: "14px",
          lineHeight: "21px",
          _hover: {
            color: "gray.600",
          },
        }),
        box: (props: StyleFunctionProps) => ({
          border: "1px solid",
          borderColor: "black",
          borderRadius: "4px",
          fontSize: "14px",
          lineHeight: "18px",
          padding: 8,
          margin: 2,
          fontWeight: 300,
          color: props.isSelected ? "white" : "black",
          backgroundColor: props.isSelected ? "brand.blue" : "white",

          _hover: {
            borderColor: "brand.blue",
            color: "brand.blue",
            svg: {
              rect: {
                stroke: "brand.blue",
                fill: "transparent",
              },
              circle: {
                stroke: "brand.blue",
                fill: "transparent",
              },
              fill: "brand.blue",
              stoke: "brand.blue",
              line: {
                stroke: "brand.blue",
              },
              path: {
                fill: "brand.blue",
                stroke: "brand.blue",
                line: {
                  stroke: "brand.blue",
                },
              },
            },
            path: {
              fill: "brand.blue",
              stroke: "brand.blue",
              line: {
                stroke: "brand.blue",
              },
            },
          },
        }),
        rounded: ({ size }: StyleFunctionProps) => ({
          bg: "black",
          borderRadius: "4px",
          color: "white",
          padding: size === 'sm' ? "0 20px" : "25px 30px",
          border: "1px solid",
          fontWeight: 600,
          fontSize: "0.75rem",
          height: size === 'sm' ? "30px" : 10,
          _hover: {
            bg: "gray.700",
            color: "white",
            _disabled: {
              bg: 'black',
            }
          },
          [`@media screen and (max-width: ${tablet})`]: {
            fontSize: "14px",
            lineHeight: "18,2px",
          },
        }),
        roundedBlue: () => ({
          bg: "blue",
          borderRadius: "4px",
          color: "white",
          padding: "25px 30px",
          fontWeight: 600,
          fontSize: "0.75rem",
          _hover: {
            bg: "brand.blue",
            color: "white",
            _disabled: {
              bg: "brand.blue",
            },
          },
          [`@media screen and (max-width: ${tablet})`]: {
            fontSize: "14px",
            lineHeight: "18,2px",
          },
        }),
        roundedTransparent: ({ size }: StyleFunctionProps) => ({
          bg: "transparent",
          borderRadius: "4px",
          fontSize: "12px",
          color: "black",
          fontWeight: 300,
          padding: size === 'sm' ? "0 20px" : "25px 30px",
          border: "1px solid",
          height: size === 'sm' ? "30px" : 10,
          _hover: {
            bg: "black",
            color: "white",
            _disabled: {
              border: "1px solid gray",
              color: "gray",
            },
          },
          [`@media screen and (max-width: ${tablet})`]: {
            fontSize: "14px",
            lineHeight: "18,2px",
          },
        }),
      },
    },

    Container: {
      variants: {
        hierarchy: () => ({
          width: "100%",
          margin: "0 auto",
          border: "1px solid #F7F7F7F7",
          padding: "5",
          backgroundColor: "#fdfdfdf1",
        }),
        inputContainer: (props: StyleFunctionProps) => ({
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
        hr: () => ({
          borderTop: "1px solid",
          borderColor: "brand.line",
          width: "100%",
          height: "1px",
        }),
        createformColumn: (props: StyleFunctionProps) => ({
          bg: props.colorMode === "dark" ? "gray.200" : "white",
          color: props.colorMode === "dark" ? "white" : "gray.800",
          height: "100vh",
          overflow: "auto",
          marginBottom: "100px",
          display: "flex",
          justifyContent: "center",
          maxWidth: "unset",
          minWidth: "unset",
        }),
        rightPart: {
          justifyContent: "flex-start",
          p: 0,
          flexDirection: "column",
          borderLeft: "1px solid rgb(234, 234, 239)",
          minW: "300px",
          overflowY: "auto",
          w: "100%",
          maxW: "53%",
          [`@media screen and (max-width: ${tablet})`]: {
            height: "100%",
            maxW: "100%",
            minW: "unset",
            borderLeft: "0px",
          },
        },
      },
    },
    
    Text: {
      variants: {
        xxs: () => ({
          fontWeight: 300,
          fontSize: "10px",
          lineHeight: "13px",
        }),
        xs: () => ({
          fontWeight: 300,
          fontSize: "14px",
          lineHeight: "18px",
          [`@media screen and (max-width: ${tablet})`]: {
            fontSize: "12px",
            lineHeight: "15.6px",
          },
        }),
        xsRegular: () => ({
          fontWeight: 400,
          fontSize: "12px",
          lineHeight: "18px",
          [`@media screen and (max-width: ${tablet})`]: {
            fontSize: "14px",
            lineHeight: "21px",
          },
        }),
        xsMedium: () => ({
          fontWeight: 500,
          fontSize: "12px",
          lineHeight: "15.6px",
          [`@media screen and (max-width: ${tablet})`]: {
            fontSize: "5px",
          },
        }),
        currentLight: () => ({
          fontWeight: 300,
          fontSize: "14px",
          lineHeight: "18.2px",

          // [`@media screen and (max-width: ${sm})`]: {
          //   fontSize: "5px",
          // },
        }),
        current: () => ({
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "21.2px",
        }),
        currentBold: () => ({
          fontWeight: 700,
          fontSize: "14px",
          lineHeight: "18.2px",
        }),
        smallTitle: () => ({
          fontWeight: 300,
          fontSize: "18px",
          lineHeight: "23.4px",
        }),
        smallTitleBold: () => ({
          fontWeight: 500,
          fontSize: "18px",
          lineHeight: "23.4px",
        }),
        titleParaLight: () => ({
          fontWeight: 300,
          fontSize: "20px",
          lineHeight: "26px",
        }),
        baseline: () => ({
          fontWeight: 300,
          fontSize: "25px",
          lineHeight: "32.5px",
        }),
        xl: () => ({
          fontWeight: "300",
          fontSize: "35px",
          lineHeight: "45.5px",
          [`@media screen and (max-width: ${tablet})`]: {
            fontSize: "20px",
            lineHeight: "26px",
          },
        }),
        xlNoMobilVariant: () => ({
          fontWeight: "300",
          fontSize: "35px",
          lineHeight: "45.5px",
        }),
        statsDashboard: () => ({
          fontWeight: 300,
          fontSize: "55px",
          lineHeight: "71.5px",
        }),
        xxl: () => ({
          fontWeight: 300,
          fontSize: "75px",
          lineHeight: "97.5px",
          [`@media screen and (max-width: ${tablet})`]: {
            fontSize: "60px",
            lineHeight: "60px",
          },
        }),
        xxlNoMobilVariant: () => ({
          fontWeight: 300,
          fontSize: "75px",
          lineHeight: "97.5px",
        }),
      },
    },
  },
});

export default theme;
