import { Box } from "@chakra-ui/react";
import React from "react";

interface Props {
  children: React.ReactElement;
  color?: string;
  target?: string;
}

export const SvgHover: React.FC<Props> = ({
  children,
  color = "brand.blue",
  target,
}) => {
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
      }>
      {children}
    </Box>
  );
};
