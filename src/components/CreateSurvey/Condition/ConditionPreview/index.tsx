import React from "react";

import { Box, Button, ButtonGroup, Container } from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import {
  addCondition,
  getConditionData,
  getRefererIdInCurrentCondition,
  getSelectedConditionData,
  selectCondition,
  updateCondition,
} from "redux/slices/formBuilder";
import { Step_1 } from "components/CreateSurvey/Condition/ConditionPreview/Steps/Step_1";
import { Step_2 } from "./Steps/Step_2";
import { Step_3 } from "./Steps/Step_3";
import { v4 as uuidv4 } from "uuid";
import ICondition from "interfaces/form/condition";
import { StepCounter } from "./Steps/StepCounter";
import { checkStepValidation } from "./Steps/utils";

export const ConditionPreview: React.FC = () => {
  const selected_condition = useAppSelector(getSelectedConditionData);
  const currentConditionReferer = useAppSelector(
    getRefererIdInCurrentCondition
  );
  const dispatch = useAppDispatch();
  const condition_id = uuidv4();
  const conditions = useAppSelector(getConditionData);
  const groups = conditions.map((c: ICondition) => c.group.name);
  const last_group = Math.max(...groups);

  const renderStep = () => {
    switch (selected_condition?.step) {
      case 1:
        return <Step_1 selectedCondition={selected_condition} />;
        break;
      case 2:
        return <Step_2 selectedCondition={selected_condition} />;
        break;
      case 3:
        return <Step_3 selectedCondition={selected_condition} />;
        break;

      default:
        break;
    }
  };

  return (
    <Container w="90%" maxW="unset" h="100%" pos="relative">
      <StepCounter
        selectedCondition={selected_condition}
        isDisabled={checkStepValidation(selected_condition)}
      />
      <Box h="100%">{renderStep()}</Box>

      <Box pos="absolute" bottom="110px" left="0" right="0" w="100%">
        <ButtonGroup justifyContent="space-between" w="30%">
          {selected_condition?.step !== 1 && (
            <Button
              variant="link"
              onClick={() =>
                dispatch(
                  updateCondition({
                    id: selected_condition?.id,
                    data: {
                      step:
                        selected_condition?.step !== undefined
                          ? selected_condition.step - 1
                          : 1,
                    },
                  })
                )
              }>
              Retour
            </Button>
          )}
          {selected_condition?.step === 3 && currentConditionReferer ? (
            <Button
              variant="link"
              color="brand.blue"
              isDisabled={checkStepValidation(selected_condition)}
              onClick={() => {
                dispatch(
                  addCondition({
                    id: condition_id,
                    condition_type: "page",
                    referer_entity_id:
                      currentConditionReferer?.id !== undefined
                        ? currentConditionReferer?.id
                        : "",
                    step: 1,
                    group: {
                      id: uuidv4(),
                      name: last_group,
                    },
                    is_valid: false,
                  })
                );
                dispatch(selectCondition({ id: condition_id }));
              }}>
              Ajouter une condition au groupe
            </Button>
          ) : (
            <Button
              variant="roundedBlue"
              isDisabled={checkStepValidation(selected_condition)}
              onClick={() =>
                dispatch(
                  updateCondition({
                    id: selected_condition?.id,
                    data: {
                      step:
                        selected_condition?.step !== undefined
                          ? selected_condition.step + 1
                          : 1,
                    },
                  })
                )
              }>
              Suivant
            </Button>
          )}
        </ButtonGroup>
      </Box>
    </Container>
  );
};
