import React, { useCallback, useState } from "react";
import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import { useHistory, useParams } from "react-router-dom";
import { ParticipationConsent } from "./ParticipationConsent";
import { ParticipationForm } from "./ParticipationForm";
import { useGetSurveyBySlug } from "call/actions/survey";
import {
  findExistingParticipation,
  storeParticipation,
} from "./localstorage-handlers";
import { NL } from "./nl";

// ---- COMPONENT

export const Participation: React.FC<unknown> = () => {
  // FIXME: Yup, these ignore are bad, need to be removed
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { slug, step } = useParams();
  const history = useHistory();

  const { data: survey, isLoading } = useGetSurveyBySlug(slug);
  const { participation, onConsent, onRefuse } = useConsentHandlers(slug);

  if (participation?.completed) {
    return (
      <Center h="100vh">
        <Flex flexDir="column">
          <Text variant="title">{NL.msg.thxParticipation}</Text>

          <Button
            mt="40px"
            variant="roundedBlue"
            onClick={() => history.push("/")}
          >
            {NL.button.backToWelcome}
          </Button>
        </Flex>
      </Center>
    );
  }
  
  // LOADING STATE
  if (isLoading || !survey) {
    return <Box mt="60">Loading in progress...</Box>;
  }

  // Redirect if the there is an existing participation
  if (participation && step !== "participate") {
    history.push(`/survey/${survey.slug}/participate`);
  }

  // CONSENT
  if (step === "consent") {
    return (
      <ParticipationConsent
        surveyId={survey.id}
        onConsent={onConsent}
        onRefuse={onRefuse}
      />
    );
  }

  // PARTICIPATE
  if (step === "participate") {
    if (!participation) {
      history.push(`/survey/${survey.slug}/consent`);
      return <Box mt="60">{NL.msg.missingConsent}</Box>;
    } 
    
    return (
      <ParticipationForm
        surveyId={survey.id}
        participationId={participation.id}
      />
    );
  }

  return <Box mt="60">Something went wrong...</Box>;
};

// ---- HOOKS

function useConsentHandlers(slug: string) {
  const history = useHistory();

  const existingParticipation = findExistingParticipation(slug);
  const [participation, setParticipation] = useState(existingParticipation);

  // Consent
  const onConsent = useCallback(
    (newParticipationId) => {
      setParticipation({ id: newParticipationId, completed: false });
      storeParticipation(slug, newParticipationId);
      history.push(`/survey/${slug}/participate`);
    },
    [slug]
  );

  // Refuse
  const onRefuse = useCallback(() => {
    history.push(`/`);
  }, []);

  return {
    participation,
    onConsent,
    onRefuse,
  };
}
