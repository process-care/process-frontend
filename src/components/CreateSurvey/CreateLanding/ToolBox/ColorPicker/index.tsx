import { PropsWithChildren } from "react"
import { useFormikContext } from "formik"
import { Box, Flex } from "@chakra-ui/react"

import { colors } from "./utils/index.ts"

import * as Palette from './Colors.tsx'

const ColorList = [
  Palette.ColorA,
  Palette.ColorB,
  Palette.ColorC,
  Palette.ColorD,
  Palette.ColorE,
  Palette.ColorF,
  Palette.ColorG,
  Palette.ColorH,
  Palette.ColorI,
  Palette.ColorJ,
  Palette.ColorK,
  Palette.ColorL,
];

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

  return (
    <Box w="100%" mb={6}>
      <Flex w="100%" justifyContent="flex-start" mt="4" flexWrap="wrap">
        {ColorList.map((Element, i) => {
          return (
            <Border key={i}>
              <Element onClick={() => setFieldValue("color_theme", colors[i])} />
            </Border>
          );
        })}
      </Flex>
    </Box>
  );
};
