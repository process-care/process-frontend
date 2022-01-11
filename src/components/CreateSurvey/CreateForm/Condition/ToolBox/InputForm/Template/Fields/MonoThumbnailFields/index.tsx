import { Box } from "@chakra-ui/react";
import { NumberInput, Select } from "components/Fields";
import { TitleDivider } from "components/TitleDivider";
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
      <TitleDivider title="Champs particuliers" />
      <Box
        w="100%"
        m="0 auto"
        border="1px solid #F7F7F7F7"
        p="5"
        backgroundColor="#fdfdfdf1"
      >
        <NumberInput
          placeholder="ex: 4"
          style={{ width: "45%" }}
          label="Nb de répétitions vignettes"
          name="max_loop"
          isCollapsed={false}
        />

        <AssociatedSubfields name="factors" />
        <TitleDivider title="Question associée" />
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
      </Box>
    </>
  );
};
