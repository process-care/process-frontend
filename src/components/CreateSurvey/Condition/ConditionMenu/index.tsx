import { Box, Text } from "@chakra-ui/react";
import { Footer } from "components/CreateSurvey/ToolBox/InputForm/Template/Footer";
import React from "react";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import t from "static/condition.json";

import {
  getPageInCurrentCondition,
  selectCondition,
  getConditionData,
  getSelectedConditionData,
} from "redux/slices/formBuilder";
import { Group } from "./Group";
import ICondition from "interfaces/form/condition";

export const ConditionMenu: React.FC = () => {
  const currentConditionPage = useAppSelector(getPageInCurrentCondition);
  const dispatch = useAppDispatch();
  const selected_condition = useAppSelector(getSelectedConditionData);
  const conditions = useAppSelector(getConditionData);
  const isDisabled = !selected_condition?.is_valid;

  const groups = conditions.map((c: ICondition) => c.group);
  const last_group = Math.max(
    ...conditions.map((c: ICondition) => c.group.name)
  );

  if (currentConditionPage === undefined) {
    return <p>{t.error}</p>;
  }

  return (
    <Box p={4} h="100%">
      <Text variant="current" textTransform="uppercase">
        {t.show_page}
      </Text>
      <Text variant="xsMedium">{currentConditionPage?.name}</Text>
      {!selected_condition?.is_valid && (
        <Text variant="xs" mt={5} textAlign="left" color="brand.gray.200">
          {t.cant_edit}
        </Text>
      )}
      <Group
        conditions={conditions}
        groups={groups}
        last_group={last_group}
        currentConditionPage={currentConditionPage}
      />

      <Box pos="sticky" bottom="0">
        <Footer
          disabled={isDisabled}
          onSubmit={() => dispatch(selectCondition({ id: "" }))}
          onCancel={() => dispatch(selectCondition({ id: "" }))}
        />
      </Box>
    </Box>
  );
};
