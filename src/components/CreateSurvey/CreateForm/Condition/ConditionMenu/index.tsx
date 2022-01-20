import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useAppSelector } from "redux/hooks";
import { t } from "static/condition";
import { Group } from "./Group";
import { ConditionRedux } from "redux/slices/types";
import { selectors } from "redux/slices/scientistData";

interface Props {
  selectedCondition: ConditionRedux;
}

export const ConditionMenu: React.FC<Props> = ({ selectedCondition }) => {
  const isValid = useAppSelector(
    (state) => state.scientistData.conditions.isValid
  );
  const isTypePage = selectedCondition?.attributes.type === "page";

  const currentQuestionConditions = useAppSelector(
    selectors.conditions.getSelectedQuestionsConditions
  );

  const currentPageConditions = (selectedCondition: ConditionRedux) => {
    // The selected page can change to we can't use the selector page's conditions.
    const id = selectedCondition?.attributes.referer_page?.data?.id;
    if (!id) return [];
    return useAppSelector((state) =>
      selectors.conditions.getConditionsByPageId(state, id)
    );
  };

  const currentConditions = isTypePage
    ? currentPageConditions(selectedCondition)
    : currentQuestionConditions;
  const groups = currentConditions.map(
    (c: ConditionRedux) => c?.attributes.group
  );

  return (
    <Box
      border="1px solid"
      h="100%"
      pos="relative"
      w="100%"
      margin="0 auto"
      className="background__grid"
      pt="50px"
      overflowY="auto"
    >
      <Box
        pt={4}
        px={4}
        mb="400px"
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
            ? selectedCondition?.attributes.referer_page?.data?.attributes?.name
            : selectedCondition?.attributes?.referer_question?.data?.attributes
                ?.label}
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
