import { Box } from "@chakra-ui/react";
import { NumberInput, Select } from "components/Fields";
import React from "react";
import IQuestion from "types/form/question";

import { CommonFields } from "../index";
import { AssociatedSubfields } from "./AssociatedSubfields";

interface Option {
  label: string;
  value: IQuestion["type"];
}

const answers: Option[] = [
  { label: "Slider", value: "slider" },
  { label: "Input Number", value: "number_input" },
  { label: "Checkbox", value: "checkbox" },
  { label: "Radio", value: "radio" },
];

export const GradeClassificationFields: React.FC = () => {
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
      <Box w="45%">
        <Select
          label="Merci de selectionner le type de question à associer"
          id="grade_classification_input"
          answers={answers}
        />
      </Box>
    </>
  );
};
