import React from "react";

import { Radiobox } from "components/Fields";
import { CommonFields } from "../index";

export const TextareaFields: React.FC = () => {
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
    </>
  );
};
