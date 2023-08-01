import { Box } from "@chakra-ui/react";

import { CommonFields } from "../index";
import { NumberInput } from "@/components/Fields";
import TitleDivider from "@/components/TitleDivider";
import AssociatedSubfields from "./AssociatedSubfields";

export default function AssociatedClassificationFields(): JSX.Element {
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
        <NumberInput
          placeholder="ex: 4"
          style={{ width: "45%" }}
          label="Nb de répétitions vignettes"
          name="max_loop"
          isCollapsed={false}
        />
        <AssociatedSubfields name="factors" />
      </Box>
    </>
  );
};
