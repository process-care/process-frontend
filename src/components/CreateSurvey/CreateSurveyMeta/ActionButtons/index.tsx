import { Box, Button } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "redux/hooks";
import { Survey } from "redux/slices/surveyBuilder";

const t = {
  createLanding: "Créer une landing",
  createForm: "Créer un formulaire",
  createConsent: "Créer le consentement",
  title: "Enquête :",
  cta: "Créer l'enquête !",
};

export const ActionButtons: React.FC = () => {
  const { survey } = useAppSelector((state) => state.surveyBuilder);
  const { goToLanding, goToForm } = useNavigator(survey.id);

  return (
    <Box>
      <Box pt="80px" d="flex" justifyContent="center" w="100%" my="auto">
        <Button h="400px" mr="50px" w="40%" onClick={goToLanding}>
          {t.createLanding}
        </Button>
        <Button h="400px" mr="50px" w="40%" onClick={goToForm}>
          {t.createForm}
        </Button>
        <Button h="400px" w="40%" onClick={goToForm}>
          {t.createConsent}
        </Button>
      </Box>
    </Box>
  );
};

// HOOKS

function useNavigator(surveyId: Survey["survey"]["id"]) {
  const history = useHistory();

  // Take you to the landing editor
  const goToLanding = useCallback(() => {
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
