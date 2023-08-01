import { Box } from "@chakra-ui/react";

import { Maybe } from "@/api/graphql/sdk.generated";
import { Enum_Question_Type } from "@/api/graphql/types.generated";
import { NumberInput, Select } from "@/components/Fields";
import { useAppSelector } from "@/redux/hooks";
import { selectors } from "@/redux/slices/scientistData";

import { CommonFields } from "../../index";
import TitleDivider from "@/components/TitleDivider";
import AssociatedSubfields from "../AssociatedSubfields";
import GradeFields from "./GradeFields";

export interface Option {
  label: string;
  value: Maybe<Enum_Question_Type> | undefined;
}

const answers: Option[] = [
  { label: "Question curseur", value: Enum_Question_Type.Slider },
  { label: "Question Nombre", value: Enum_Question_Type.NumberInput },
  { label: "Question bouton radio", value: Enum_Question_Type.Radio },
];

export default function MonoThumbnailFields(): JSX.Element {
  const selectedQuestion = useAppSelector(selectors.questions.getSelectedQuestion);

  return (
    <>
      <TitleDivider title="Contenu" />
      <Box w="100%" m="0 auto" border="1px solid #F7F7F7F7" p="5" backgroundColor="#fdfdfdf1">
        <CommonFields noPlacehoder />
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
            id="associated_input.type"
            answers={answers}
            placeholder="Choisir une question"
            defaultValue={answers[0].value ?? ""}
          />
        </Box>

        <GradeFields selectedQuestion={selectedQuestion} />
      </Box>
    </>
  );
};
