import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { t } from "static/condition";
import { Group } from "./Group";
import ICondition from "types/form/condition";
import { selectors, actions } from "redux/slices/formEditor/condition-editor";

interface Props {
  selectedCondition: ICondition;
}
export const ConditionMenu: React.FC<Props> = ({ selectedCondition }) => {
  const dispatch = useAppDispatch();

  const isValid = useAppSelector(selectors.getValidity);
  const isTypePage = selectedCondition.type === "page";

  const currentQuestionConditions = useAppSelector(
    selectors.getSelectedQuestionsConditions
  );
  const currentPageConditions = (selectedCondition: ICondition) => {
    // The selected page can change to we can't use the selector page's conditions.
    const id = selectedCondition.referer_page?.id;
    if (!id) return [];
    return useAppSelector((state) =>
      selectors.getConditionsByPageId(state, id)
    );
  };

  const currentConditions = isTypePage
    ? currentPageConditions(selectedCondition)
    : currentQuestionConditions;
  const groups = currentConditions.map((c: ICondition) => c.group);

  const onCancel = () => {
    if (!isValid) {
      dispatch(actions.delete(selectedCondition.id));
    } else {
      dispatch(actions.setSelectedCondition(""));
    }
  };

  return (
    <Box h="100%" pos="relative">
      <Box px={4} pt={4} mb="100px">
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

      <Box pos="absolute" bottom="30px" w="100%">
        <Button variant="rounded" onClick={onCancel}>
          Revenir au formulaire
        </Button>
      </Box>
    </Box>
  );
};
