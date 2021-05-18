import React from "react";

import { Input, NumberInput } from "components/Fields";
import { Flex } from "@chakra-ui/react";

import { CommonFields } from "./../index";

export const InputFields: React.FC = () => {
  return (
    <>
      <CommonFields />
      <Flex justifyContent="space-between">
        <NumberInput
          style={{ width: "45%" }}
          label="Nb de charactères min"
          id="min_length"
          name="min_length"
        />
        <NumberInput
          style={{ width: "45%" }}
          label="Nb de charactères max"
          id="max_length"
          name="max_length"
        />
      </Flex>
      <Input
        style={{ width: "70%" }}
        type="text"
        label="Unité de mesure"
        name="units"
        placeholder="cm,km, années ..."
        helpText="Cette information s'affichera à droite du champ."
      />
    </>
  );
};
