import { NumberInput } from "components/Fields";
import React from "react";

import { CommonFields } from "../index";
import { AssociatedSubfields } from "./AssociatedSubfields";

export const AssociatedClassification: React.FC = () => {
  return (
    <>
      <CommonFields noPlacehoder />
      <NumberInput
        placeholder="ex: 4"
        style={{ width: "45%" }}
        label="Nb de répétitions vignettes"
        name="loop_count"
        isCollapsed={false}
      />
      <AssociatedSubfields name="options" />
    </>
  );
};
