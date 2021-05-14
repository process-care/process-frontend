import React from "react";

import { Input, NumberInput } from "components/Fields";
import { Flex } from "@chakra-ui/react";

import CommonFields from "./CommonFields";

export const InputFields: React.FC = () => {
  return (
    <>
      <CommonFields />
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
      <Input
        style={{ width: "70%" }}
        type="text"
        label="Unité de mesure"
        id="units"
        name="units"
        placeholder="cm,km, années ..."
        helpText="Cette information s'affichera à droite du champ."
      />
    </>
  );
};
