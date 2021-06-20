import React from "react";

import { Box, Button, ButtonGroup, Container } from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import {
  addCondition,
  getRefererIdInCurrentCondition,
  getSelectedConditionData,
  selectCondition,
  updateCondition,
} from "redux/slices/formBuilder";
import { Step_1 } from "components/CreateSurvey/CreateForm/Condition/ConditionPreview/Steps/Step_1";
import { Step_2 } from "./Steps/Step_2";
import { Step_3 } from "./Steps/Step_3";
import { v4 as uuidv4 } from "uuid";
import { StepCounter } from "./Steps/StepCounter";
import { checkStepValidation } from "./Steps/utils";

export const ConditionPreview: React.FC = () => {
  const selected_condition = useAppSelector(getSelectedConditionData);
  const currentConditionReferer = useAppSelector(
    getRefererIdInCurrentCondition
  );
  const dispatch = useAppDispatch();
  const condition_id = uuidv4();

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
      <Box h="80%" pt={10} w="100%" d="flex" justifyContent="center">
        {renderStep()}
      </Box>

      <Box pos="relative" bottom="110px" left="0" right="0" w="100%">
        <ButtonGroup justifyContent="space-between" w="70%">
          <Button
            visibility={selected_condition?.step !== 1 ? "visible" : "hidden"}
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

          {selected_condition?.step === 3 && currentConditionReferer ? (
            <Button
              variant="link"
              color="brand.blue"
              isDisabled={checkStepValidation(selected_condition)}
              onClick={() => {
                dispatch(
                  addCondition({
                    id: condition_id,
                    type:
                      selected_condition?.type !== undefined
                        ? selected_condition.type
                        : "page",
                    referer_id:
                      currentConditionReferer?.id !== undefined
                        ? currentConditionReferer?.id
                        : "",
                    step: 1,
                    group: {
                      id: selected_condition.group.id,
                      name: selected_condition.group.name,
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
