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
import { SURVEY_STATUS } from "types/survey";
import { Loader } from "components/Spinner";

// ---- COMPONENT

export const Participation: React.FC<unknown> = () => {
  const { slug, step } = useParams<{ slug: string; step: string }>();
  const history = useHistory();

  const { data: survey, isLoading } = useGetSurveyBySlug(slug);
  const { participation, onConsent, onRefuse } = useConsentHandlers(slug);

  const goBackHome = useCallback(() => history.push("/"), []);

  // If there is already a completed participation in local storage
  if (participation?.completed) {
    return (
      <OverWarning
        msg={NL.msg.thxParticipation}
        cta={NL.button.backToWelcome}
        action={goBackHome}
      />
    );
  }

  // LOADING STATE
  if (isLoading || !survey) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }
  console.log(survey);

  if (survey.status !== SURVEY_STATUS.Running) {
    return (
      <OverWarning
        msg={NL.msg.surveyOver}
        cta={NL.button.backToWelcome}
        action={goBackHome}
      />
    );
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

// ---- SUB COMPONENTS

type OverWarningProps = {
  msg: string;
  cta: string;
  action: () => void;
};

const OverWarning = ({ msg, cta, action }: OverWarningProps) => {
  return (
    <Center h="100vh">
      <Flex flexDir="column">
        <Text variant="title">{msg}</Text>

        <Button mt="40px" variant="roundedBlue" onClick={action}>
          {cta}
        </Button>
      </Flex>
    </Center>
  );
};
