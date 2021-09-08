import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useAddLanding } from "call/actions/landing";
import { useUpdateSurvey } from "call/actions/survey";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "redux/hooks";
import { Survey } from "redux/slices/surveyBuilder";
import { ReactComponent as Picto } from "./assets/add.svg";

const t = {
  createLanding: "Créer la page d'accueil",
  createForm: "Créer le questionnaire",
  createConsent: "éditer la page de consentement",
  title: "Enquête :",
  cta: "Créer l'enquête !",
};

export const ActionButtons: React.FC = () => {
  const { survey, surveyId } = useAppSelector((state) => state.surveyBuilder);
  const { goToLanding, goToForm } = useNavigator(survey, surveyId);

  const Btn = ({
    handleClick,
    label,
  }: {
    handleClick: () => void;
    label: string;
  }) => {
    return (
      <Button
        mx="20px"
        h="320px"
        w="240px"
        bottom="0px"
        onClick={handleClick}
        _hover={{
          backgroundColor: "white",
          bottom: "10px",
          transition: "all 300ms",
        }}
        borderRadius="0"
        backgroundColor="white"
        border="1px solid"
        borderColor="brand.line"
      >
        <Flex
          flexDir="column"
          justifyContent="center"
          textAlign="center"
          alignItems="center"
        >
          <Text
            variant="currentLight"
            textTransform="uppercase"
            whiteSpace="initial"
            maxW="150px"
          >
            {label}
          </Text>

          <Box mt="20px">
            <Picto />
          </Box>
        </Flex>
      </Button>
    );
  };

  return (
    <Box>
      <Box pt="80px" d="flex" justifyContent="space-between" w="100%" my="auto">
        <Btn label={t.createLanding} handleClick={goToLanding} />
        <Btn label={t.createForm} handleClick={goToForm} />
        <Btn label={t.createConsent} handleClick={goToForm} />
      </Box>
    </Box>
  );
};

// HOOKS

function useNavigator(survey: Survey["survey"], surveyId: string) {
  const history = useHistory();
  const { mutateAsync: updateSurvey } = useUpdateSurvey();
  const { mutateAsync: addLanding } = useAddLanding();
  const { title } = survey;
  // Take you to the landing editor
  const goToLanding = useCallback(async () => {
    // create Landing
    const landing: Record<string, any> = await addLanding({
      title,
      survey: surveyId,
    });
    // update survey with landing id.
    await updateSurvey({
      surveyId,
      data: { landing: landing.createLanding.landing.id },
    });
    history.push(`/survey/${surveyId}/create/landing`);
  }, [surveyId]);

  // Take you to the form editor
  const goToForm = useCallback(() => {
    history.push(`/survey/${surveyId}/create/form`);
  }, [surveyId]);

  return {
    goToLanding,
    goToForm,
  };
}
