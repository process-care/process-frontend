import { Box, Button, Flex, Circle, Text } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { actions, selectors } from "redux/slices/survey-editor";
import { SurveyBuilder } from "redux/slices/surveyBuilderOLD";
import { t } from "./static";

// ---- TYPES

interface Props {
  survey: Partial<SurveyBuilder["survey"]> | undefined;
  step: number;
}

interface IStep {
  id: keyof Omit<SurveyBuilder["survey"], "needConsent">;
  label: string;
  pos: number;
}

// ---- COMPONENT

export const Timeline: React.FC = () => {
  const survey = useAppSelector(selectors.survey);
  const step = useAppSelector(selectors.step);
  return (
    <Box p="8px 20px 0 30px" pos="relative">
      <Flex justifyContent="flex-end">
        <NavLink to="/dashboard">
          <Button variant="link" color="gray.600">
            {t.cancel}
          </Button>
        </NavLink>
      </Flex>
      <RenderSteps survey={survey} step={step} />
    </Box>
  );
};

// --- SUBCOMPONENT

const RenderSteps: React.FC<Props> = ({ survey, step }) => {
  const dispatch = useAppDispatch();

  const navigateTo = (target: number) => {
    dispatch(actions.setStep(target));
  };

  const Step = ({ data }: { data: IStep }) => {
    const { id, label, pos } = data;
    const isCompleted = survey && survey[id]?.length !== 0;
    const isCurrent = pos === step;
    const value = survey && survey[id];

    return (
      <Box
        zIndex={3}
        opacity={isCompleted || isCurrent ? 1 : 0.2}
        textAlign="left"
        d="flex"
        justifyContent="flex-start"
        alignItems="flex-start"
        _hover={{ cursor: isCompleted ? "pointer" : "not-allowed" }}
        onClick={() => isCompleted && navigateTo(data.pos)}
        pos="relative"
      >
        <Box
          zIndex={-1}
          top="-38px"
          h="75%"
          w="1px"
          borderColor="black"
          borderLeft="0.5px solid"
          transform="rotate(0deg)"
          left="15px"
          pos="absolute"
        />
        <Circle
          transition="all 500ms"
          w="32px"
          h="32px"
          bg={isCurrent ? "white" : "black"}
          mr="30px"
          color={isCurrent ? "black" : "white"}
          border="1px solid"
          borderColor={isCurrent ? "black" : "white"}
        >
          {pos}
        </Circle>
        <Box mt="10px" minH="60px">
          <Text variant="current" textDecor="underline">
            {label}
          </Text>
          {typeof value === "string" ? (
            <Text variant="current">{value}</Text>
          ) : (
            value?.map((item: any, index: number) => {
              return (
                <Text variant="current" key={index}>
                  {item.value}
                </Text>
              );
            })
          )}
        </Box>
      </Box>
    );
  };
  return (
    <Box>
      {t.steps.map((data: any) => {
        return <Step data={data} key={data.pos} />;
      })}
    </Box>
  );
};
