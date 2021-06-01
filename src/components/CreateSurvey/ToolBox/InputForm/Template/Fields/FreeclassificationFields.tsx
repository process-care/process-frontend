import React from "react";

import { Radiobox, Select } from "components/Fields";
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
      <Select
        id="freeclassification_responses_count"
        label="Nombre de réponses à proposer"
        placeholder="Choisissez les réponses"
        options={[
          { label: "3 réponses", value: "3" },
          { label: "4 réponses", value: "4" },
          { label: "5 réponses", value: "5" },
          { label: "6 réponses", value: "6" },
        ]}
      />
    </>
  );
};
