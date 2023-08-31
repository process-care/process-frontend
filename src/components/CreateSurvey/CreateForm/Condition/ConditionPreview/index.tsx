import { Button, ButtonGroup, Center, Text, Tooltip } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { StepCounter } from "./Steps/StepCounter";
import { useCheckStepValidation } from "./Steps/utils";
import { ConditionRedux } from "@/redux/slices/types";
import { actions, selectors } from "@/redux/slices/scientistData";
import { renderTitle } from "./utils";
import Step_1 from "@/components/CreateSurvey/CreateForm/Condition/ConditionPreview/Steps/Step_1";
import Step_2 from "./Steps/Step_2";
import Step_3 from "./Steps/Step_3";
import Loader from "@/components/Spinner";
import Footer from "../ToolBox/InputForm/Template/Footer";
import { cn } from "@/lib/utils";
import InfoBox from "@/components/Banner/InfoBox";

interface Props {
  selectedCondition: ConditionRedux;
}

export default function ConditionPreview({ selectedCondition }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const step = useAppSelector(selectors.conditions.getStep);
  const isValid = useAppSelector(selectors.conditions.getValidity);

  const isStepValide = useCheckStepValidation()

  const handleUpdate = (changes: any) => {
    dispatch(
      actions.updateCondition({
        id: selectedCondition.id,
        changes: {
          attributes: { ...selectedCondition?.attributes, ...changes },
        },
      })
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step_1 selectedCondition={selectedCondition} updateStep={handleUpdate} />;
      case 2:
        return <Step_2 selectedCondition={selectedCondition} updateStep={handleUpdate} />;
      case 3:
        return <Step_3 selectedCondition={selectedCondition} updateStep={handleUpdate} />;

      default:
        break;
    }
  };

  if (selectedCondition === undefined) {
    return <Loader />
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
    <div className="flex flex-col h-screen w-full">
      <div className="flex flex-col flex-grow overflow-auto p-5">
        <div className="flex-grow">
          <Tooltip
            isDisabled={step !== 1}
            placement="bottom"
            label="Ne peuvent être sélectionnées que les questions de type liste déroulante, radio et case à cocher, antérieures à la question en cours"
          >
            <div className="flex mt-5 px-5 items-center">
              <Text variant="baseline" fontWeight="bold" textAlign="left" _hover={{ cursor: "pointer" }}>
                {renderTitle(step)}
              </Text>

              {step === 1 && <InfoIcon color="gray.300" ml="4" w="7" h="7" />}
            </div>
          </Tooltip>

          <Center
            mt="5%"
            w="100%"
            display="flex"
            justifyContent="center"
            border="1px solid #F7F7F7F7"
            p="5"
            backgroundColor="#fdfdfdf1"
          >
            {renderStep()}
          </Center>

          <ButtonGroup className="relative px-5 pt-5 w-full justify-between">
            <Button
              visibility={step !== 1 ? "visible" : "hidden"}
              variant="roundedTransparent"
              w="128px"
              onClick={() => handleNavigation(step - 1)}
            >
              Précédent
            </Button>

            <Button
              w="128px"
              variant="roundedBlue"
              className={cn(step !== 3 ? '' : '!hidden')}
              isDisabled={isStepValide}
              onClick={() => handleNavigation(step + 1)}
            >
              Suivant
            </Button>
          </ButtonGroup>
        </div>

        {isValid && (
        <InfoBox className="mt-5 p-5 text-left text-sm">
          Vous pouvez ajouter d’autres conditions (opérateur “ET”) ou d’autres groupes de conditions (opérateur “OU”) en
          utilisant la fenêtre de prévisualisation
        </InfoBox>
      )}
      </div>

      <Footer onSubmit={saveCondition} disabled={!isValid} onCancel={onCancel} hideDelete={true} />
    </div>
  );
};
