import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import { useHistory, useParams } from "react-router-dom";
import { ParticipationConsent } from "./ParticipationConsent";
import { ParticipationForm } from "./ParticipationForm";
import { findExistingParticipation, StoredParticipation, storeParticipation } from "./localstorage-handlers";
import { NL } from "./nl";
import { Loader } from "components/Spinner";

import { SURVEY_STATUS } from "types/survey";

import { actions, selectors } from "redux/slices/scientistData";
import { useAppSelector } from "redux/hooks";
import { useDispatch } from "react-redux";

// ---- COMPONENT

export const Participation: React.FC<unknown> = () => {
  const { slug, step } = useParams<{ slug: string; step: string }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const { participation, onConsent, onRefuse } = useConsentHandlers(slug);

  useEffect(() => {
    dispatch(actions.initializeSurvey(slug));
  }, [slug]);

  const survey = useAppSelector(selectors.survey.getSelectedSurvey);
  const isLoading = useAppSelector(selectors.survey.isLoading);

  const surveyId = survey.id;
  const status = survey?.attributes?.status;
  const goBackHome = useCallback(() => history.push("/"), []);

  // If there is already a completed participation in local storage
  if (participation?.completed) {
    return <OverWarning msg={NL.msg.thxParticipation} cta={NL.button.backToWelcome} action={goBackHome} />;
  }

  // LOADING STATE
  if (isLoading || !survey) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  if (status !== SURVEY_STATUS.Running) {
    return <OverWarning msg={NL.msg.surveyOver} cta={NL.button.backToWelcome} action={goBackHome} />;
  }

  // Redirect if the there is an existing participation
  if (participation?.consent && step !== "participate") {
    history.push(`/survey/${slug}/participate`);
  }

  if (!surveyId) {
    return <p>Une erreur est survenue</p>;
  }

  // CONSENT
  if (step === "consent") {
    return <ParticipationConsent surveyId={surveyId} onConsent={onConsent} onRefuse={onRefuse} />;
  }

  // PARTICIPATE
  if (step === "participate") {
    if (!participation) {
      history.push(`/survey/${slug}`);
      return <Box mt="60">{NL.msg.missingConsent}</Box>;
    }

    return <ParticipationForm surveyId={surveyId} participationId={participation.id} />;
  }

  return <Box mt="60">Something went wrong...</Box>;
};

// ---- HOOKS

type ConsentHandler = {
  onConsent: (participationId: string) => void;
  onRefuse: () => void;
  participation: StoredParticipation | undefined;
};
export function useConsentHandlers(slug: string): ConsentHandler {
  const history = useHistory();
  const existingParticipation = findExistingParticipation(slug);
  const [participation, setParticipation] = useState(existingParticipation);

  // Consent
  const onConsent = useCallback(
    (newParticipationId) => {
      const newParticipation = { id: newParticipationId, completed: false, consent: true };
      setParticipation(newParticipation);
      storeParticipation(slug, newParticipation);
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
