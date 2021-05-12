import React from "react";
import { Radiobox } from "components/Fields";
import CommonFields from "./CommonFields";

export const TextareaFields: React.FC = () => {
  return (
    <>
      <CommonFields />
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
