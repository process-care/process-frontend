import { NumberInput } from "components/Fields";
import React from "react";

import { CommonFields } from "../index";
import { AssociatedSubfields } from "./AssociatedSubfields";

export const AssociatedClassificationFields: React.FC = () => {
  return (
    <>
      <CommonFields noPlacehoder />
      <NumberInput
        placeholder="ex: 4"
        style={{ width: "45%" }}
        label="Nb de répétitions vignettes"
        name="max_loop"
        isCollapsed={false}
      />
      <AssociatedSubfields name="factors" />
    </>
  );
};
