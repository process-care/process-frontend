import { Box } from "@chakra-ui/react";

import TitleDivider from "@/components/TitleDivider";
import CommonFields from "./CommonFields";

export default function DatepickerFields(): JSX.Element {
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
      </Box>
    </>
  );
};
