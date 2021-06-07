import { Box, Button, Text } from "@chakra-ui/react";
import { Footer } from "components/CreateSurvey/ToolBox/InputForm/Template/Footer";
import React from "react";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { v4 as uuidv4 } from "uuid";

import {
  getPageInCurrentCondition,
  selectCondition,
  getConditionData,
  addCondition,
} from "redux/slices/formBuilder";
import { Group } from "./Group";
import ICondition from "interfaces/form/condition";

export const ConditionMenu: React.FC = () => {
  const currentConditionPage = useAppSelector(getPageInCurrentCondition);
  const conditions = useAppSelector(getConditionData);
  const dispatch = useAppDispatch();
  const condition_id = uuidv4();
  const groups = conditions.map((c: ICondition) => c.group);
  const last_group = Math.max(...groups);
  console.log(typeof groups);
  return (
    <Box p={4}>
      <Text fontSize="14px" textTransform="uppercase">
        Afficher la page
      </Text>
      <Text fontSize="16px" fontWeight="bold">
        {currentConditionPage?.name}
      </Text>
      <Group conditions={conditions} groups={groups} />
      {currentConditionPage && (
        <Box>
          <Button
            onClick={() => {
              dispatch(
                addCondition({
                  id: condition_id,
                  condition_type: "page",
                  referer_entity_id: currentConditionPage?.id,
                  step: 1,
                  group: last_group + 1,
                })
              );
              dispatch(selectCondition({ id: condition_id }));
            }}>
            ajouter un ou
          </Button>
          <Footer
            hideRequired
            onCancel={() => dispatch(selectCondition({ id: "" }))}
          />
        </Box>
      )}
    </Box>
  );
};
