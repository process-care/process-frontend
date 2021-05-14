import React from "react";

import { Flex } from "@chakra-ui/react";
import { NumberInput, Input } from "components/Fields";

import { CommonFields } from "./../index";

export const NumberInputFields: React.FC = () => {
  return (
    <>
      <CommonFields />
      <Input
        style={{ width: "70%" }}
        type="text"
        label="Unité de mesure"
        name="units"
        placeholder="cm,km, années ..."
        helpText="Cette information s'affichera à droite du champ."
      />
      <Flex justifyContent="space-between">
        <NumberInput
          style={{ width: "45%" }}
          label="Nb de charactères min"
          id="minLength"
          name="minLength"
        />
        <NumberInput
          style={{ width: "45%" }}
          label="Nb de charactères max"
          id="maxLength"
          name="maxLength"
        />
      </Flex>
    </>
  );
};
