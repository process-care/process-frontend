import React from "react";

import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Container,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { Step_1 } from "components/CreateSurvey/CreateForm/Condition/ConditionPreview/Steps/Step_1";
import { Step_2 } from "./Steps/Step_2";
import { Step_3 } from "./Steps/Step_3";
// import { StepCounter } from "./Steps/StepCounter";
import { checkStepValidation } from "./Steps/utils";
import ICondition from "types/form/condition";
import { Loader } from "components/Spinner";
import { actions, selectors } from "redux/slices/scientistData";
import { Footer } from "../ToolBox/InputForm/Template/Footer";
import { InfoIcon } from "@chakra-ui/icons";
import { renderTitle } from "./utils";

interface Props {
  selectedCondition: ICondition;
}

export const ConditionPreview: React.FC<Props> = ({ selectedCondition }) => {
  const dispatch = useAppDispatch();
  const step = useAppSelector(selectors.conditions.getStep);
  const isValid = useAppSelector(selectors.conditions.getValidity);

  const handleUpdate = (changes: Record<string, any>) => {
    dispatch(
      actions.updateCondition({
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
    dispatch(actions.setStepCondition(to));
  };

  const saveCondition = () => {
    dispatch(actions.saveCondition());
  };

  const onCancel = () => {
    if (!isValid) {
      dispatch(actions.deleteCondition(selectedCondition.id));
    } else {
      dispatch(actions.setSelectedCondition(""));
    }
  };

  return (
    <Container w="100%" maxW="unset" h="100%" pos="relative">
      {/* <StepCounter
        step={step}
        isDisabled={checkStepValidation()}
        navigateTo={(to) => handleNavigation(to)}
      /> */}
      <Tooltip
        isDisabled={step !== 1}
        placement="bottom"
        label="Ne peuvent être sélectionnées que les questions de type liste déroulante, radio et case à cocher, antérieures à la question en cours"
      >
        <Box d="flex" alignItems="center" mt="5">
          <Text
            variant="baseline"
            fontWeight="bold"
            textAlign="left"
            _hover={{ cursor: "pointer" }}
          >
            {renderTitle(step)}
          </Text>
          {step === 1 && (
            <InfoIcon color="gray.300" ml="4" mt="-2" w="3" h="3" />
          )}
        </Box>
      </Tooltip>

      <Center
        mt="5%"
        w="100%"
        d="flex"
        justifyContent="center"
        border="1px solid #F7F7F7F7"
        p="5"
        backgroundColor="#fdfdfdf1"
      >
        {renderStep()}
      </Center>
      {isValid && (
        <Text variant="currentBold" mt="5" textAlign="left">
          Vous pouvez ajouter d’autres conditions (opérateur “ET”) ou d’autres
          groupes de conditions (opérateur “OU”) en utilisant la fenêtre de
          prévisualisation
        </Text>
      )}
      <Box pos="relative" pt="40px" w="100%">
        <ButtonGroup justifyContent="space-between" w="100%">
          <Button
            visibility={step !== 1 ? "visible" : "hidden"}
            variant="roundedTransparent"
            onClick={() => handleNavigation(step - 1)}
          >
            Précédent
          </Button>

          {step !== 3 ? (
            <Button
              variant="roundedBlue"
              isDisabled={checkStepValidation()}
              onClick={() => handleNavigation(step + 1)}
            >
              Suivant
            </Button>
          ) : (
            <Box d="none">
              <Button
                variant="roundedBlue"
                isDisabled={checkStepValidation()}
                onClick={() => handleNavigation(step + 1)}
              >
                Suivant
              </Button>
            </Box>
          )}
        </ButtonGroup>
      </Box>

      <Footer
        w="53%"
        onSubmit={saveCondition}
        disabled={!isValid}
        onCancel={onCancel}
        hideDelete={true}
      />
    </Container>
  );
};
