import React from "react";

import { Box, Button, ButtonGroup, Container } from "@chakra-ui/react";
import { Step_1 } from "components/CreateSurvey/Condition/ConditionPreview/Steps/Step_1";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { getConditionData, updateCondition } from "redux/slices/formBuilder";
import { Step_2 } from "./Steps/Step_2";
import { Step_3 } from "./Steps/Step_3";

export const ConditionPreview: React.FC = () => {
  const currentCondition = useAppSelector(getConditionData);
  const dispatch = useAppDispatch();
  const checkStepValidation = () => {
    if (currentCondition?.step === 1 && !!currentCondition?.selected_question) {
      return false;
    }
    if (currentCondition?.step === 2 && !!currentCondition?.operator) {
      return false;
    }
    if (currentCondition?.step === 3 && !!currentCondition?.target_value) {
      return false;
    } else return true;
  };

  const renderStep = () => {
    switch (currentCondition?.step) {
      case 1:
        return <Step_1 currentCondition={currentCondition} />;
        break;
      case 2:
        return <Step_2 currentCondition={currentCondition} />;
        break;
      case 3:
        return <Step_3 currentCondition={currentCondition} />;
        break;

      default:
        break;
    }
  };

  return (
    <Container w="90%" maxW="unset" h="100%" pos="relative">
      <Box h="100%">{renderStep()}</Box>

      <Box pos="absolute" bottom="110px" left="0" right="0" w="100%">
        <ButtonGroup justifyContent="space-between" w="30%">
          {currentCondition?.step !== 1 && (
            <Button
              variant="link"
              onClick={() =>
                dispatch(
                  updateCondition({
                    id: currentCondition?.id,
                    data: {
                      step:
                        currentCondition?.step !== undefined
                          ? currentCondition.step - 1
                          : 1,
                    },
                  })
                )
              }>
              Retour
            </Button>
          )}
          <Button
            variant="roundedBlue"
            isDisabled={checkStepValidation()}
            onClick={() =>
              dispatch(
                updateCondition({
                  id: currentCondition?.id,
                  data: {
                    step:
                      currentCondition?.step !== undefined
                        ? currentCondition.step + 1
                        : 1,
                  },
                })
              )
            }>
            {currentCondition?.step === 3
              ? "Ajouter une condition au groupe"
              : "Suivant"}
          </Button>
        </ButtonGroup>
      </Box>
    </Container>
  );
};
