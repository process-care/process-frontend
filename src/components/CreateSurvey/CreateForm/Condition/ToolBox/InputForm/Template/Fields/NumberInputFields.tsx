import React from "react";

import { Flex } from "@chakra-ui/react";
import { NumberInput, Input } from "components/Fields";

import { CommonFields } from "../index";

export const NumberInputFields: React.FC = () => {
  return (
    <>
      <CommonFields />
      <Input
        style={{ width: "100%" }}
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
          label="Nombre min"
          name="min"
          isCollapsed={false}
          placeholder="Ex:5"
          isRequired
        />
        <NumberInput
          style={{ width: "45%" }}
          label="Nombre max"
          name="max"
          isCollapsed={false}
          placeholder="Ex:5"
          isRequired
        />
      </Flex>
    </>
  );
};
