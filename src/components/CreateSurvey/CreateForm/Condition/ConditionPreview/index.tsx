import React from "react";

import { Box, Button, ButtonGroup, Container, Text } from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import {
  addCondition,
  getRefererIdInCurrentCondition,
  selectCondition,
} from "redux/slices/formBuilder";
import { Step_1 } from "components/CreateSurvey/CreateForm/Condition/ConditionPreview/Steps/Step_1";
import { Step_2 } from "./Steps/Step_2";
import { Step_3 } from "./Steps/Step_3";
import { v4 as uuidv4 } from "uuid";
import { StepCounter } from "./Steps/StepCounter";
import { checkStepValidation } from "./Steps/utils";
import { useGetCondition, useUpdateCondition } from "api/actions/condition";

export const ConditionPreview: React.FC = () => {
  const { selected_condition } = useAppSelector((state) => state.formBuilder);
  const { data: current_condition } = useGetCondition(selected_condition.id);
  const { mutateAsync: updateCondition } = useUpdateCondition(
    current_condition?.condition?.id
  );
  const currentConditionReferer = useAppSelector(
    getRefererIdInCurrentCondition
  );

  console.log("Current condition", current_condition);
  const dispatch = useAppDispatch();
  const condition_id = uuidv4();

  const renderStep = () => {
    switch (current_condition?.condition?.step) {
      case 1:
        return <Step_1 currentCondition={current_condition?.condition} />;
        break;
      case 2:
        return <Step_2 currentCondition={current_condition?.condition} />;
        break;
      case 3:
        return <Step_3 currentCondition={current_condition?.condition} />;
        break;

      default:
        break;
    }
  };

  return (
    <Container w="90%" maxW="unset" h="100%" pos="relative">
      <StepCounter
        currentCondition={current_condition?.condition}
        isDisabled={checkStepValidation(current_condition?.condition)}
      />
      <Text>{current_condition?.target?.id}</Text>
      <Box h="80%" pt={10} w="100%" d="flex" justifyContent="center">
        {renderStep()}
      </Box>

      <Box pos="relative" bottom="110px" left="0" right="0" w="100%">
        <ButtonGroup justifyContent="space-between" w="70%">
          <Button
            visibility={
              current_condition?.condition?.step !== 1 ? "visible" : "hidden"
            }
            variant="link"
            onClick={() =>
              updateCondition({
                id: current_condition?.condition?.id,
                data: {
                  step: current_condition?.condition.step - 1,
                },
              })
            }
          >
            Retour
          </Button>

          {selected_condition?.step === 3 && currentConditionReferer ? (
            <Button
              variant="link"
              color="brand.blue"
              isDisabled={checkStepValidation(current_condition?.condition)}
              onClick={() => {
                dispatch(
                  addCondition({
                    id: condition_id,
                    type: current_condition?.condition.type,
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
              }}
            >
              Ajouter une condition au groupe
            </Button>
          ) : (
            <Button
              visibility={
                current_condition?.condition?.step !== 3 ? "visible" : "hidden"
              }
              variant="roundedBlue"
              isDisabled={checkStepValidation(current_condition?.condition)}
              onClick={() =>
                updateCondition({
                  id: current_condition?.condition?.id,
                  data: {
                    step: current_condition?.condition.step + 1,
                  },
                })
              }
            >
              Suivant
            </Button>
          )}
        </ButtonGroup>
      </Box>
    </Container>
  );
};
