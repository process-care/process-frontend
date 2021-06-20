import React from "react";
import { Flex } from "@chakra-ui/react";

import { Radiobox, NumberInput } from "components/Fields";
import { CommonFields } from "../index";

export const TextareaFields: React.FC = () => {
  return (
    <>
      <CommonFields />

      <Flex justifyContent="space-between">
        <NumberInput
          style={{ width: "45%" }}
          placeholder="ex: 5"
          label="Nb de charactères min"
          name="min_length"
          isCollapsed={false}
        />
        <NumberInput
          placeholder="ex: 5"
          style={{ width: "45%" }}
          label="Nb de charactères max"
          name="max_length"
          isCollapsed={false}
        />
      </Flex>
      <Radiobox
        p="10px 0"
        label="Taille de la zone de réponse"
        radios={[
          { value: "small", label: "Petite" },
          { value: "medium", label: "Moyenne" },
          { value: "large", label: "Grande" },
        ]}
        id="rows"
      />
    </>
  );
};
