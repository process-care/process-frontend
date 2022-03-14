import React from "react";

import { Box, Flex } from "@chakra-ui/react";
import { NumberInput, Input } from "components/Fields";

import { TitleDivider } from "components/TitleDivider";
import { CommonFields } from "..";

export const NumberInputFields: React.FC = () => {
  return (
    <>
      <TitleDivider title="Contenu" />

      <Box w="100%" m="0 auto" border="1px solid #F7F7F7F7" p="5" backgroundColor="#fdfdfdf1">
        <CommonFields />

        <Input
          style={{ width: "45%" }}
          type="text"
          label="Unité de mesure"
          name="units"
          placeholder="cm,km, années ..."
          helpText="Cette information s'affichera à droite du champ."
          isCollapsed={false}
        />
        <Flex justifyContent="space-between">
          <NumberInput
            style={{ width: "45%" }}
            label="Valeur minimale"
            name="min"
            isCollapsed={false}
            placeholder="Ex:5"
            isRequired
          />
          <NumberInput
            style={{ width: "45%" }}
            label="Valeur maximale"
            name="max"
            isCollapsed={false}
            placeholder="Ex:5"
            isRequired
          />
        </Flex>
      </Box>
    </>
  );
};
