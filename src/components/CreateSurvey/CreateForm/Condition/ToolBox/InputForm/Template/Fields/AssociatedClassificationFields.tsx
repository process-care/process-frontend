import { Box } from "@chakra-ui/react";
import { NumberInput } from "components/Fields";
import { TitleDivider } from "components/TitleDivider";
import React from "react";

import { CommonFields } from "../index";
import { AssociatedSubfields } from "./AssociatedSubfields";

export const AssociatedClassificationFields: React.FC = () => {
  return (
    <>
      <TitleDivider title="Champs particuliers" />
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
