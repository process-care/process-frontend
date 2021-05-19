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
          name="min_length"
          placeholder="ex: 4"
        />
        <NumberInput
          placeholder="ex: 4"
          style={{ width: "45%" }}
          label="Nb de charactères max"
          name="max_length"
        />
      </Flex>
      <Input
        type="text"
        label="Unité de mesure"
        name="units"
        placeholder="cm,km, années ..."
        helpText="Cette information s'affichera à droite du champ."
      />
    </>
  );
};
