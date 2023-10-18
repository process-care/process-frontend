import { Box } from "@chakra-ui/react";

import { CommonFields, RepeatedFields } from "../index.ts"
import TitleDivider from "@/components/TitleDivider/index.tsx"

export default function RadioboxFields(): JSX.Element {
  return (
    <>
      <TitleDivider title="Contenu" />
      <Box
        w="100%"
        m="0 auto"
        border="1px solid #F7F7F7F7"
        p="5"
        backgroundColor="#fdfdfdf1"
      >
        <CommonFields noPlacehoder />
        <RepeatedFields name="options" />
      </Box>
    </>
  );
};
