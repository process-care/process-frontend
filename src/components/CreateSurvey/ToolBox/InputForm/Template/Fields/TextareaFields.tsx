import React from "react";
import { Flex } from "@chakra-ui/react";

import { Radiobox, NumberInput } from "components/Fields";
import { CommonFields } from "./../index";

export const TextareaFields: React.FC = () => {
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
      <Radiobox
        p="10px 0"
        label="Taille de la zone de réponse"
        radios={[
          { value: "small", labelValue: "Petite" },
          { value: "medium", labelValue: "Moyenne" },
          { value: "large", labelValue: "Grande" },
        ]}
        id="rows_size"
      />
    </>
  );
};
