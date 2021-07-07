import React from "react";

import { Box, Button, ButtonGroup, Container, Text } from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import {
  getRefererIdInCurrentCondition,
  selectCondition,
} from "redux/slices/formBuilder";
import { Step_1 } from "components/CreateSurvey/CreateForm/Condition/ConditionPreview/Steps/Step_1";
import { Step_2 } from "./Steps/Step_2";
import { Step_3 } from "./Steps/Step_3";
import { v4 as uuidv4 } from "uuid";
import { StepCounter } from "./Steps/StepCounter";
import { checkStepValidation } from "./Steps/utils";
import {
  useAddCondition,
  useGetCondition,
  useGetConditions,
  useUpdateCondition,
} from "api/actions/condition";
import ICondition from "interfaces/form/condition";

export const ConditionPreview: React.FC = () => {
  const { selected_condition } = useAppSelector((state) => state.formBuilder);
  const { data, isLoading, error } = useGetConditions({
    id: selected_condition?.referer_page?.id,
    type: selected_condition.type,
  });

  const current_condition = data?.conditions.find(
    (c: ICondition) => c.id === selected_condition.id
  );

  const { mutateAsync: updateCondition } = useUpdateCondition(
    current_condition?.condition?.id
  );
  const { mutateAsync: addCondition } = useAddCondition(
    current_condition?.condition?.id
  );

  const is_page_type = current_condition?.type === "page";

  const dispatch = useAppDispatch();

  const renderStep = () => {
    switch (current_condition?.step) {
      case 1:
        return <Step_1 currentCondition={current_condition} />;
        break;
      case 2:
        return <Step_2 currentCondition={current_condition} />;
        break;
      case 3:
        return <Step_3 currentCondition={current_condition} />;
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
      <Box h="80%" pt={10} w="100%" d="flex" justifyContent="center">
        {renderStep()}
      </Box>

      <Box pos="relative" bottom="110px" left="0" right="0" w="100%">
        <ButtonGroup justifyContent="space-between" w="70%">
          <Button
            visibility={current_condition?.step !== 1 ? "visible" : "hidden"}
            variant="link"
            onClick={() =>
              updateCondition({
                id: current_condition?.id,
                data: {
                  step: current_condition?.step - 1,
                },
              })
            }
          >
            Retour
          </Button>

          {current_condition?.condition?.step === 3 ? (
            <Button
              variant="link"
              color="brand.blue"
              isDisabled={checkStepValidation(current_condition)}
              onClick={() => {
                addCondition({
                  type: current_condition?.type,
                  [is_page_type ? "referer_page" : "referer_question"]:
                    is_page_type
                      ? current_condition?.referer_page.id
                      : current_condition?.referer_question.id,
                  step: 1,
                  group: {
                    id: current_condition?.group.id,
                    name: current_condition?.group.name,
                  },
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
              visibility={current_condition?.step !== 3 ? "visible" : "hidden"}
              variant="roundedBlue"
              isDisabled={checkStepValidation(current_condition)}
              onClick={() =>
                updateCondition({
                  id: current_condition?.id,
                  data: {
                    step: current_condition?.step + 1,
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
