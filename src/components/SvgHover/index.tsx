import { Box } from "@chakra-ui/react";

interface Props {
  children: React.ReactElement;
  color?: string;
  target?: string;
}

export default function SvgHover({
  children,
  color = "brand.blue",
  target,
}: Props): JSX.Element {
  const style = {
    cursor: "pointer",
    fill: color,
    transition: "all 200ms",
  };
  
  return (
    <Box
      sx={
        target !== "circle"
          ? {
              "path:hover": {
                ...style,
              },
            }
          : {
              "circle:hover": {
                ...style,
              },
            }
      }
    >
      {children}
    </Box>
  );
};
