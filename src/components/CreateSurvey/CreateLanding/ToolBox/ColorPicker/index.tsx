import { Box, Flex } from "@chakra-ui/react";
import React from "react";

import { ReactComponent as COLOR_1 } from "./../assets/A.svg";
import { ReactComponent as COLOR_2 } from "./../assets/B.svg";
import { ReactComponent as COLOR_3 } from "./../assets/C.svg";
import { ReactComponent as COLOR_4 } from "./../assets/D.svg";
import { ReactComponent as COLOR_5 } from "./../assets/E.svg";
import { ReactComponent as COLOR_6 } from "./../assets/F.svg";
import { ReactComponent as COLOR_7 } from "./../assets/G.svg";
import { ReactComponent as COLOR_8 } from "./../assets/H.svg";
import { ReactComponent as COLOR_9 } from "./../assets/I.svg";
import { ReactComponent as COLOR_10 } from "./../assets/J.svg";
import { ReactComponent as COLOR_11 } from "./../assets/K.svg";
import { ReactComponent as COLOR_12 } from "./../assets/L.svg";
import { colors } from "./utils";
import { useFormikContext } from "formik";

const Border: React.FC = ({ children }) => {
  return (
    <Box
      d="flex"
      flex="1 0 15%"
      border="1px solid"
      borderRadius="3px"
      borderColor="transparent"
      p="3px"
      maxW="43px"
      _hover={{
        border: "1px solid gray",
        maxWidth: "43px",
        borderRadius: "100%",
        padding: "3px",
        cursor: "pointer",
      }}
    >
      {children}
    </Box>
  );
};

export const ColorPicker: React.FC = () => {
  const { setFieldValue } = useFormikContext();

  const list = [
    COLOR_1,
    COLOR_2,
    COLOR_3,
    COLOR_4,
    COLOR_5,
    COLOR_6,
    COLOR_7,
    COLOR_8,
    COLOR_9,
    COLOR_10,
    COLOR_11,
    COLOR_12,
  ];
  return (
    <Box w="100%">
      <Flex w="100%" justifyContent="flex-start" mt="4" flexWrap="wrap">
        {list.map((el, i) => {
          const Component = list[i];
          return (
            <Border key={i}>
              <Component
                onClick={() => setFieldValue("color_theme", colors[i])}
              />
            </Border>
          );
        })}
      </Flex>
    </Box>
  );
};
