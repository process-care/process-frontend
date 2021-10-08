import React from "react";

import { Box, Button, ButtonGroup, Container } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { selectCondition } from "redux/slices/formBuilder";
import { Step_1 } from "components/CreateSurvey/CreateForm/Condition/ConditionPreview/Steps/Step_1";
import { Step_2 } from "./Steps/Step_2";
import { Step_3 } from "./Steps/Step_3";
import { StepCounter } from "./Steps/StepCounter";
import { checkStepValidation } from "./Steps/utils";
import { useAddCondition } from "call/actions/formBuider/condition";
import ICondition from "types/form/condition";
import { Loader } from "components/Spinner";
import {
  actions as actionsCondition,
  selectors as selectorsCondition,
} from "redux/slices/formEditor/condition-editor";

interface Props {
  selectedCondition: ICondition;
}

export const ConditionPreview: React.FC<Props> = ({ selectedCondition }) => {
  const dispatch = useAppDispatch();
  const step = useAppSelector(selectorsCondition.getStep);
  const { mutateAsync: addCondition } = useAddCondition();

  const is_page_type = selectedCondition?.type === "page";

  const handleUpdate = (changes: Record<string, any>) => {
    dispatch(
      actionsCondition.update({
        id: selectedCondition.id,
        changes: {
          ...changes,
        },
      })
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step_1
            selectedCondition={selectedCondition}
            updateStep={(changes) => handleUpdate(changes)}
          />
        );
        break;
      case 2:
        return (
          <Step_2
            selectedCondition={selectedCondition}
            updateStep={(changes) => handleUpdate(changes)}
          />
        );
        break;
      case 3:
        return (
          <Step_3
            selectedCondition={selectedCondition}
            updateStep={(changes) => handleUpdate(changes)}
          />
        );
        break;

      default:
        break;
    }
  };

  if (selectedCondition === undefined) {
    return <Loader />;
  }

  const handleNavigation = (to: number) => {
    dispatch(actionsCondition.setStep(to));
  };

  return (
    <Container w="90%" maxW="unset" h="100%" pos="relative">
      <StepCounter
        currentCondition={selectedCondition}
        isDisabled={checkStepValidation(step, selectedCondition)}
      />
      <Box h="80%" pt={10} w="100%" d="flex" justifyContent="center">
        {renderStep()}
      </Box>

      <Box pos="relative" bottom="110px" left="0" right="0" w="100%">
        <ButtonGroup justifyContent="space-between" w="70%">
          <Button
            visibility={step !== 1 ? "visible" : "hidden"}
            variant="link"
            onClick={() => handleNavigation(step - 1)}
          >
            Retour
          </Button>

          {step === 3 ? (
            <Button
              variant="link"
              color="brand.blue"
              isDisabled={checkStepValidation(step, selectedCondition)}
              onClick={() => {
                addCondition({
                  type: selectedCondition?.type,
                  [is_page_type ? "referer_page" : "referer_question"]:
                    is_page_type
                      ? selectedCondition.referer_page?.id
                      : selectedCondition.referer_question?.id,
                  step: 1,
                  group: selectedCondition.group,
                  is_valid: false,
                }).then((data: any) =>
                  dispatch(selectCondition(data.createCondition.condition))
                );
              }}
            >
              Ajouter une condition au groupe
            </Button>
          ) : (
            <Button
              variant="roundedBlue"
              isDisabled={checkStepValidation(step, selectedCondition)}
              onClick={() => handleNavigation(step + 1)}
            >
              Suivant
            </Button>
          )}
        </ButtonGroup>
      </Box>
    </Container>
  );
};
