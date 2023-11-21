import { Box } from "@chakra-ui/react";

import { Maybe } from "@/api/graphql/sdk.generated.js"
import { Enum_Question_Type } from "@/api/graphql/types.generated.ts"
import { NumberInput, Select } from "@/components/Fields/index.ts"
import { useAppSelector } from "@/redux/hooks/index.js"
import { selectors } from "@/redux/slices/scientistData.js"

import { CommonFields } from "../../index.ts"
import TitleDivider from "@/components/TitleDivider/index.tsx"
import AssociatedSubfields from "../AssociatedSubfields/index.tsx"
import GradeFields from "./GradeFields/index.tsx"

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
  const selectedQuestion = useAppSelector(selectors.questions.selectSelectedQuestion);

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
        <Select
          label="Type de question à associer"
          id="associated_input.type"
          answers={answers}
          placeholder="Choisir une question"
          defaultValue={answers[0].value ?? ""}
        />

        <GradeFields selectedQuestion={selectedQuestion} />
      </Box>
    </>
  );
};
