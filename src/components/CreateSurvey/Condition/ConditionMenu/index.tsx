import { Box, Text } from "@chakra-ui/react";
import { Footer } from "components/CreateSurvey/ToolBox/InputForm/Template/Footer";
import React from "react";
import { useAppSelector, useAppDispatch } from "redux/hooks";

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
  const groups = conditions.map((c: ICondition) => c.group);
  const last_group = Math.max(
    ...conditions.map((c: ICondition) => c.group.name)
  );

  if (currentConditionPage === undefined) {
    return <p>Error page</p>;
  }
  const isDisabled = !selected_condition?.is_valid;

  return (
    <Box p={4} h="100%">
      <Text fontSize="14px" textTransform="uppercase">
        Afficher la page
      </Text>
      <Text fontSize="16px" fontWeight="bold">
        {currentConditionPage?.name}
      </Text>
      <Group
        conditions={conditions}
        groups={groups}
        last_group={last_group}
        currentConditionPage={currentConditionPage}
      />
      <Box pos="sticky" bottom="0">
        <Footer
          disabled={isDisabled}
          hideRequired
          onSubmit={() => dispatch(selectCondition({ id: "" }))}
          onCancel={() => dispatch(selectCondition({ id: "" }))}
        />
      </Box>
    </Box>
  );
};
