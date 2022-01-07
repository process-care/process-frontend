import { Box, Divider } from "@chakra-ui/react";
import { NumberInput, Select } from "components/Fields";
import React, { useState, useEffect } from "react";
import { useAppSelector } from "redux/hooks";
import { selectors } from "redux/slices/scientistData";
import IQuestion from "types/form/question";

import { CommonFields } from "../../index";
import { AssociatedSubfields } from "../AssociatedSubfields";
import { GradeFields } from "./GradeFields";

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
  const [state, setState] = useState(true);
  const selectedQuestion = useAppSelector(
    selectors.questions.getSelectedQuestion
  );
  useEffect(() => {
    // Force re render to reset the field on select change
    setState(true);
  }, [selectedQuestion.mono_thumbnail_input?.type]);

  if (!state) return <></>;
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
          id="mono_thumbnail_input.type"
          answers={answers}
          placeholder="Choisir une question"
          defaultValue={answers[0].value}
        />
      </Box>
      <GradeFields selectedQuestion={selectedQuestion} />
    </>
  );
};
