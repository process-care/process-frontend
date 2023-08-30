import { useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";

import { QuestionRedux } from "@/redux/slices/types";
import { RepeatedFields } from "../../..";
import { useFormikContext } from "formik";
import { Enum_Question_Rows } from "@/api/graphql/types.generated";
import { useAppSelector } from "@/redux/hooks";
import { selectors as formBuilderSelectors } from "@/redux/slices/formBuilder";
import { Input, NumberInput, Textarea } from "@/components/Fields";

const ID = "associated_input";
interface Props {
  selectedQuestion: QuestionRedux | undefined;
}

export default function GradeFields({ selectedQuestion }: Props): JSX.Element {
  const isEditing = useAppSelector(formBuilderSelectors.isEditing);

  const { resetForm, touched } = useFormikContext<QuestionRedux["attributes"]>();
  const savedType = selectedQuestion?.attributes.associated_input?.type;

  useEffect(() => {
    if (savedType && Object.keys(touched).length > 0) {
      resetForm({
        values: {
          ...selectedQuestion.attributes,
          associated_input: {
            type: savedType,
            label: "",
          },
        },
      });
    }
  }, [savedType, isEditing, touched, resetForm, selectedQuestion?.attributes]);

  return (
    <Box mt="5">
      <Textarea
        isCollapsed={false}
        rows={Enum_Question_Rows.Small}
        label="Label de la question"
        placeholder="Ex: Noter cette proposition de 0 à 10"
        id={`${ID}.label`}
        isRequired={true}
      />
      {renderTemplate(selectedQuestion)}
    </Box>
  );
};

const renderTemplate = (selectedQuestion: QuestionRedux | undefined) => {
  switch (selectedQuestion?.attributes?.associated_input?.type) {
    case "number_input":
      return (
        <Flex justifyContent="space-between">
          <NumberInput
            style={{ width: "45%" }}
            label="Valeur minimale"
            name={`${ID}.min`}
            isCollapsed={false}
            placeholder="Ex:0"
          />
          <NumberInput
            style={{ width: "45%" }}
            label="Valeur maximale"
            name={`${ID}.max`}
            isCollapsed={false}
            placeholder="Ex:10"
          />
        </Flex>
      );
      break;
    case "slider":
      return (
        <Box>
          <Flex justifyContent="space-between" w="100%">
            <Box w="45%">
              <Input
                type="number"
                isRequired
                label="Valeur minimale"
                name={`${ID}.min`}
                isCollapsed={false}
                placeholder="1"
              />
            </Box>
            <Box w="45%">
              <Input
                type="number"
                isRequired
                label="Valeur maximale"
                name={`${ID}.max`}
                isCollapsed={false}
                placeholder="1"
              />
            </Box>
          </Flex>
          <Flex justifyContent="space-between" w="100%" mb={5}>
            <Box w="45%">
              <Input
                type="number"
                isRequired
                label="Intervalles entre deux graduations"
                name={`${ID}.step`}
                isCollapsed={false}
                placeholder="1"
              />
            </Box>
          </Flex>
        </Box>
      );
      break;
    case "radio":
      return <RepeatedFields name={`${ID}.options`} />;
      break;
    default:
      break;
  }
};
