import { PropsWithChildren } from "react";
import { useFormikContext } from "formik";
import { Box, Flex } from "@chakra-ui/react";
import Image from "next/image";

import { colors } from "./utils";

import COLOR_1 from "./../assets/A.svg";
import COLOR_2 from "./../assets/B.svg";
import COLOR_3 from "./../assets/C.svg";
import COLOR_4 from "./../assets/D.svg";
import COLOR_5 from "./../assets/E.svg";
import COLOR_6 from "./../assets/F.svg";
import COLOR_7 from "./../assets/G.svg";
import COLOR_8 from "./../assets/H.svg";
import COLOR_9 from "./../assets/I.svg";
import COLOR_10 from "./../assets/J.svg";
import COLOR_11 from "./../assets/K.svg";
import COLOR_12 from "./../assets/L.svg";

// -- BORDER

type BorderProps = PropsWithChildren<{}>;

function Border({ children }: BorderProps) {
  return (
    <Box
      display="flex"
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

// ---- COMPONENT

export default function ColorPicker(): JSX.Element {
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
    <Box w="100%" mb={6}>
      <Flex w="100%" justifyContent="flex-start" mt="4" flexWrap="wrap">
        {list.map((el, i) => {
          return (
            <Border key={i}>
              <Image src={el} alt="Color" onClick={() => setFieldValue("color_theme", colors[i])} />
            </Border>
          );
        })}
      </Flex>
    </Box>
  );
};
