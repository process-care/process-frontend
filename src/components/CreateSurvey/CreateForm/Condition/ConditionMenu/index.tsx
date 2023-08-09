import { Box, Text } from "@chakra-ui/react";

import { useAppSelector } from "@/redux/hooks";
import { t } from "@/static/condition";
import { ConditionRedux } from "@/redux/slices/types";
import { selectors } from "@/redux/slices/scientistData";
import Group from "./Group";

interface Props {
  selectedCondition: ConditionRedux;
}

export default function ConditionMenu({ selectedCondition }: Props): JSX.Element {
  const isValid = useAppSelector((state) => state.scientistData.conditions.isValid);
  const isTypePage = selectedCondition?.attributes.type === "page";

  const { currentConditions, groups } = useConditionsAndGroups(selectedCondition, isValid, isTypePage)

  console.log("currentConditions", currentConditions)

  return (
    <Box className="h-full w-[80%]">
      <Box className="p-4 bg-white border border-solid my-6">
        <Text variant="current" textTransform="uppercase">
          {isTypePage ? t.show_page : t.show_input}
        </Text>

        <Text variant="xsMedium">
          {isTypePage
            ? selectedCondition?.attributes.referer_page?.data?.attributes?.name
            : selectedCondition?.attributes?.referer_question?.data?.attributes?.label}
        </Text>

        {!isValid && (
          <Text variant="xs" mt={5} textAlign="left" color="brand.gray.200">
            {t.cant_edit}
          </Text>
        )}
      </Box>
      
      <Group selectedCondition={selectedCondition} currentConditions={currentConditions} groups={groups} />
    </Box>
  );
};

// ---- HOOKS

function useConditionsAndGroups(selectedCondition: ConditionRedux, isValid: boolean, isTypePage: boolean) {
  // The selected page can change to we can't use the selector page's conditions.
  const id = selectedCondition?.attributes.referer_page?.data?.id

  const currentQuestionConditions = useAppSelector(selectors.conditions.selectSelectedQuestionsConditions)
  const currentPageConditions = useAppSelector((state) => selectors.conditions.selectConditionsByPageId(state, { pageId: id }))

  console.log("all fetched conditions : ", currentQuestionConditions, currentPageConditions)
  
  const currentConditions = isTypePage ? currentPageConditions : currentQuestionConditions
  const groups = currentConditions.map((c: ConditionRedux) => c?.attributes.group)

  return {
    currentConditions,
    groups
  }
}