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
  editLanding: "Modifier la page d'accueil",
  createForm: "Créer le questionnaire",
  createConsent: "éditer la page de consentement",
  title: "Enquête :",
  cta: "Créer l'enquête !",
};

export const ActionButtons: React.FC = () => {
  const { survey } = useAppSelector((state) => state.surveyBuilder);
  const { goToLanding, goToForm, goToConsent } = useNavigator(survey);
  const { landing } = survey;
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
        <Btn
          label={landing ? t.editLanding : t.createLanding}
          handleClick={goToLanding}
        />
        <Btn label={t.createForm} handleClick={goToForm} />
        <Btn label={t.createConsent} handleClick={goToConsent} />
      </Box>
    </Box>
  );
};

// HOOKS

function useNavigator(survey: Survey["survey"]) {
  const history = useHistory();
  const { mutateAsync: updateSurvey } = useUpdateSurvey();
  const { mutateAsync: addLanding } = useAddLanding();
  const { title, id, landing } = survey;

  // Take you to the landing editor
  const goToLanding = useCallback(async () => {
    // If the landing is not created yet, create it
    if (!landing) {
      const newLanding: Record<string, any> = await addLanding({
        title,
        survey: id,
      });
      // update survey with landing id.
      await updateSurvey({
        id,
        data: { landing: newLanding.createLanding.landing.id },
      });
    }
    history.push(`/survey/${id}/create/landing`);
  }, [id]);

  // Take you to the form editor
  const goToForm = useCallback(() => {
    history.push(`/survey/${id}/create/form`);
  }, [id]);

  // Take you to the consent page
  const goToConsent = useCallback(() => {
    history.push(`/survey/${id}/create/consent`);
  }, [id]);

  return {
    goToLanding,
    goToForm,
    goToConsent,
  };
}
