import { Box, Divider } from "@chakra-ui/react";
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
  { label: "Question curseur", value: "slider" },
  { label: "Question Nombre", value: "number_input" },
  { label: "Question bouton radio", value: "radio" },
];

export const MonoThumbnailFields: React.FC = () => {
  return (
    <>
      <CommonFields noPlacehoder />
      <Divider my="5" />
      <NumberInput
        placeholder="ex: 4"
        style={{ width: "45%" }}
        label="Nb de répétitions vignettes"
        name="max_loop"
        isCollapsed={false}
      />

      <AssociatedSubfields name="factors" />
      <Divider my="5" />
      <Box w="45%">
        <Select
          label="Merci de selectionner le type de question à associer"
          id="mono_thumbnail_input"
          answers={answers}
          placeholder="Choisir une question"
          defaultValue={answers[0].value}
        />
      </Box>
    </>
  );
};
