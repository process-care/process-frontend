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
  const isValid = useAppSelector(selectors.getValidity);
  const dispatch = useAppDispatch();

  const currentConditions = useAppSelector(
    selectors.getSelectedQuestionsConditions
  );

  const groups = currentConditions.map((c: ICondition) => c.group);

  // TODO:
  const last_group = 0;
  // currentConditions && currentConditions?.conditions.length > 0
  //   ? Math.max(...currentConditions?.conditions.map((c: ICondition) => c.group))
  //   : 1;

  const isTypePage = selectedCondition.type === "page";

  const onCancel = () => {
    dispatch(actions.setSelectedCondition(""));
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
          last_group={last_group}
        />
      </Box>

      <Box pos="absolute" bottom="30px" w="100%">
        <Button variant="rounded" onClick={onCancel}>
          Revenir au formulaire
        </Button>

        {/* <Footer
          disabled={!isValid}
          onSubmit={() => dispatch(selectCondition({}))}
          onCancel={() => {
            if (!isValid) {
              deleteCondition(selectedCondition.id);
            }
            dispatch(selectCondition({}));
          }}
        /> */}
      </Box>
    </Box>
  );
};
