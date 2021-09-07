import { Box, Button } from "@chakra-ui/react";
import { useAddLanding } from "call/actions/landing";
import { useUpdateSurvey } from "call/actions/survey";
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
  const { goToLanding, goToForm } = useNavigator(survey);

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

function useNavigator(survey: Survey["survey"]) {
  const history = useHistory();
  const { mutateAsync: updateSurvey } = useUpdateSurvey();
  const { mutateAsync: addLanding } = useAddLanding();
  const { id, title } = survey;
  // Take you to the landing editor
  const goToLanding = useCallback(async () => {
    // create Landing
    const landing: Record<string, any> = await addLanding({
      title,
      survey: id,
    });
    // update survey with landing id.
    await updateSurvey({
      id,
      data: { landing: landing.createLanding.landing.id },
    });
    history.push(`/survey/${id}/create/landing`);
  }, [id]);

  // Take you to the form editor
  const goToForm = useCallback(() => {
    history.push(`/survey/${id}/create/form`);
  }, [id]);

  return {
    goToLanding,
    goToForm,
  };
}
