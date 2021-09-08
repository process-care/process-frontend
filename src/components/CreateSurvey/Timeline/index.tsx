import { Box, Button, Flex, Circle, Text } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { Survey, updateSurveyStep } from "redux/slices/surveyBuilder";

// STATIC
const t = {
  cancel: "Annuler",
  steps: [
    {
      id: "title",
      label: "Titre de l'enquête",
      pos: 1,
    },
    {
      id: "slug",
      label: "Url de l'enquête",
      pos: 2,
    },
    {
      id: "description",
      label: "Description de l'enquête",
      pos: 3,
    },
    {
      id: "keywords",
      label: "Mot-clé publics",
      pos: 4,
    },

    {
      id: "language",
      label: "Langue de l'enquête",
      pos: 5,
    },
    {
      id: "email",
      label: "Mail de contact",
      pos: 6,
    },
    {
      id: "categories",
      label: "Categories du projet",
      pos: 7,
    },
  ],
};

// //   TYPES
interface Props {
  survey: Survey["survey"];
  step: number;
}

interface IStep {
  id: keyof Survey["survey"];
  label: string;
  pos: number;
}

const RenderSteps: React.FC<Props> = ({ survey, step }) => {
  const dispatch = useAppDispatch();

  const navigateTo = (target: number) => {
    dispatch(updateSurveyStep(target));
  };

  const Step = ({ data }: { data: IStep }) => {
    const { id, label, pos } = data;
    const isCompleted = survey[id] !== null;
    const isCurrent = pos === step;
    const value = survey[id];
    console.log(survey);

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
          top="-80px"
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
        <Box mt="10px" minH="100px">
          <Text variant="current" textDecor="underline">
            {label}
          </Text>
          {typeof value === "string" ? (
            <Text variant="current">{value}</Text>
          ) : (
            value?.map((item: any, index) => {
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

export const Timeline: React.FC = () => {
  const { survey, step } = useAppSelector((state) => state.surveyBuilder);
  return (
    <Box p="20px" pos="relative">
      <Flex justifyContent="flex-end">
        <NavLink to="/dashboard">
          <Button variant="link" color="gray.200">
            {t.cancel}
          </Button>
        </NavLink>
      </Flex>

      <RenderSteps survey={survey} step={step} />
    </Box>
  );
};
