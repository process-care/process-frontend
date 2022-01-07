import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import IQuestion from "types/form/question";
import { useAppSelector } from "redux/hooks";
import { selectors } from "redux/slices/scientistData";
import { Input, NumberInput, Textarea } from "components/Fields";
import { RepeatedFields } from "../../..";

export const GradeFields: React.FC = () => {
  const selectedQuestion = useAppSelector(
    selectors.questions.getSelectedQuestion
  );

  return (
    <Box backgroundColor="brand.gray.100" p="10" borderRadius="5" mt="5">
      <Textarea
        isCollapsed={false}
        rows="small"
        label="Label de la question"
        placeholder="Ex: Noter cette proposition de 0 à 10"
        id="dsd"
        isRequired={true}
      />
      {renderTemplate(selectedQuestion)}
    </Box>
  );
};

const renderTemplate = (selectedQuestion: IQuestion) => {
  switch (selectedQuestion?.mono_thumbnail_input) {
    case "number_input":
      return (
        <Flex justifyContent="space-between">
          <NumberInput
            style={{ width: "45%" }}
            label="Nombre min"
            name="min"
            isCollapsed={false}
            placeholder="Ex:0"
          />
          <NumberInput
            style={{ width: "45%" }}
            label="Nombre max"
            name="max"
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
                label="Borne min"
                name="min"
                isCollapsed={false}
                placeholder="1"
              />
            </Box>
            <Box w="45%">
              <Input
                type="number"
                isRequired
                label="Borne max"
                name="max"
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
                label="Intervalles"
                name="step"
                isCollapsed={false}
                placeholder="1"
              />
            </Box>
          </Flex>
        </Box>
      );
      break;
    case "radio":
      return <RepeatedFields name="options" />;
      break;
    default:
      break;
  }
};
