import { Box, Text } from "@chakra-ui/react";
import { Footer } from "components/CreateSurvey/ToolBox/InputForm/Template/Footer";
import React from "react";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { t } from "static/condition";

import {
  getRefererIdInCurrentCondition,
  selectCondition,
  getConditionData,
  getSelectedConditionData,
} from "redux/slices/formBuilder";
import { Group } from "./Group";
import ICondition from "interfaces/form/condition";

export const ConditionMenu: React.FC = () => {
  const currentReferer = useAppSelector(getRefererIdInCurrentCondition);
  const dispatch = useAppDispatch();
  const selected_condition = useAppSelector(getSelectedConditionData);
  const conditions = useAppSelector(getConditionData);
  const isDisabled = !selected_condition?.is_valid;
  const groups = conditions.map((c: ICondition) => c.group);
  const last_group = Math.max(
    ...conditions.map((c: ICondition) => c.group.name)
  );
  const isConditionTypePage = selected_condition?.condition_type === "page";

  if (currentReferer === undefined) {
    return <p>{t.error}</p>;
  }

  return (
    <Box p={4} h="100%">
      <Text variant="current" textTransform="uppercase">
        {isConditionTypePage ? t.show_page : t.show_input}
      </Text>
      <Text variant="xsMedium">
        {isConditionTypePage ? currentReferer?.name : currentReferer.label}
      </Text>
      {isDisabled && (
        <Text variant="xs" mt={5} textAlign="left" color="brand.gray.200">
          {t.cant_edit}
        </Text>
      )}
      <Group
        conditions={conditions}
        groups={groups}
        last_group={last_group}
        currentReferer={currentReferer}
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
