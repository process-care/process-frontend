import React from "react";
import { Radiobox, NumberInput } from "components/Fields";
import { Flex } from "@chakra-ui/react";
import CommonFields from "./CommonFields";

export const TextareaFields: React.FC = () => {
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
