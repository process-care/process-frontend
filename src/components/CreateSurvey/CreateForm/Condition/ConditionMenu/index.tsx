import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useAppSelector } from "redux/hooks";
import { t } from "static/condition";
import { Group } from "./Group";
import ICondition from "types/form/condition";
import { selectors } from "redux/slices/scientistData";

interface Props {
  selectedCondition: ICondition;
}
export const ConditionMenu: React.FC<Props> = ({ selectedCondition }) => {
  const isValid = useAppSelector(
    (state) => state.scientistData.conditions.isValid
  );
  const isTypePage = selectedCondition.type === "page";

  const currentQuestionConditions = useAppSelector(
    selectors.conditions.getSelectedQuestionsConditions
  );

  const currentPageConditions = (selectedCondition: ICondition) => {
    // The selected page can change to we can't use the selector page's conditions.
    const id = selectedCondition.referer_page?.id;
    if (!id) return [];
    return useAppSelector((state) =>
      selectors.conditions.getConditionsByPageId(state, id)
    );
  };

  const currentConditions = isTypePage
    ? currentPageConditions(selectedCondition)
    : currentQuestionConditions;
  const groups = currentConditions.map((c: ICondition) => c.group);

  return (
    <Box
      h="100%"
      pos="relative"
      w="100%"
      margin="0 auto"
      pt="10"
      className="background__grid"
    >
      <Box
        px={4}
        pt={4}
        pb={10}
        mb="100px"
        backgroundColor="white"
        w="80%"
        margin="0 auto"
        border="1px solid"
      >
        <Text variant="current" textTransform="uppercase">
          {isTypePage ? t.show_page : t.show_input}
        </Text>
        <Text variant="xsMedium">
          {isTypePage
            ? selectedCondition.referer_page?.name
            : selectedCondition.referer_question?.label}
        </Text>
        {!isValid && (
          <Text variant="xs" mt={5} textAlign="left" color="brand.gray.200">
            {t.cant_edit}
          </Text>
        )}
        <Group
          selectedCondition={selectedCondition}
          currentConditions={currentConditions}
          groups={groups}
        />
      </Box>
    </Box>
  );
};
