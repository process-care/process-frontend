import React, { useCallback, useState } from "react";
import { Box } from "@chakra-ui/react";
import { useHistory, useParams } from "react-router-dom";
import { ParticipationConsent } from "./ParticipationConsent";
import { ParticipationForm } from "./ParticipationForm";
import { useGetSurvey } from "call/actions/survey";
import { findExistingParticipation, storeParticipation } from "./localstorage-handlers";

// ---- COMPONENT

export const Participation: React.FC<unknown> = () => {
  // FIXME: Yup, these ignore are bad, need to be removed
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { slug, step } = useParams();
  const history = useHistory();

  // FIXME: remove hardcoded
  const { data, isLoading } = useGetSurvey('61309b6f5a85913a6791a235');
  const { participation, onConsent, onRefuse } = useConsentHandlers(slug);

  // LOADING STATE
  if (isLoading || !data?.survey) {
    return <Box mt="60">Loading in progress...</Box>
  }

  // Redirect if the there is an existing participation
  if (participation && step !== 'participate') {
    history.push(`/survey/${slug}/participate`);
  }

  // CONSENT
  if (step === 'consent') {
    return (
      <ParticipationConsent surveyId={data.survey.id} onConsent={onConsent} onRefuse={onRefuse} />
    )
  }

  // PARTICIPATE
  if (step === 'participate' && participation) {
    return (
      <ParticipationForm surveyId={data.survey.id} participationId={participation.id} />
    )
  }

  return (
    <Box mt="60">Something went wrong...</Box>
  );
};

// ---- HOOKS

function useConsentHandlers(slug: string) {
  const history = useHistory();

  // TODO: Load this from local storage ?
  // if present: go to participate right away
  // else: set up for consent
  const existingParticipation = findExistingParticipation(slug);
  const [participation, setParticipation] = useState(existingParticipation);

  // Consent
  const onConsent = useCallback((newParticipationId) => {
    setParticipation({ id: newParticipationId, completed: false });
    storeParticipation(slug, newParticipationId);
    history.push(`/survey/${slug}/participate`)
  }, [slug]);

  // Refuse
  const onRefuse = useCallback(() => {
    history.push(`/`);
  }, []);

  return {
    participation,
    onConsent,
    onRefuse,
  }
}