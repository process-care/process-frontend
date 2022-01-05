import React from "react";

import { NumberInput, Radiobox } from "components/Fields";
import { CommonFields } from "../index";

export const FreeclassificationFields: React.FC = () => {
  return (
    <>
      <CommonFields />
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
      <NumberInput
        name="freeclassification_responses_count"
        label="Nombre de réponses à proposer"
        placeholder="5"
      />
    </>
  );
};
