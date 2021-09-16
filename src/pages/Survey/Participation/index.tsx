import React, { useCallback, useState } from "react";
import { Box } from "@chakra-ui/react";
import { useHistory, useParams } from "react-router-dom";
import { ParticipationConsent } from "./ParticipationConsent";
import { ParticipationForm } from "./ParticipationForm";
import { useGetSurvey } from "call/actions/survey";

// STATIC


// ---- COMPONENT

export const Participation: React.FC<unknown> = () => {
  // FIXME: Yup, these ignore are bad, need to be removed
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { slug, step } = useParams();

  // FIXME: remove hardcoded
  const { data, isLoading } = useGetSurvey('61309b6f5a85913a6791a235');
  const { participationId, onConsent, onRefuse } = useConsentHandlers(slug);

  // LOADING
  if (isLoading || !data?.survey) {
    return <Box mt="60">Loading in progress...</Box>
  }

  // CONSENT
  if (step === 'consent') {
    return (
      <ParticipationConsent surveyId={data.survey.id} onConsent={onConsent} onRefuse={onRefuse} />
    )
  }

  // PARTICIPATE
  if (step === 'participate' && participationId) {
    return (
      <ParticipationForm surveyId={data.survey.id} participationId={participationId} />
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
  const [participationId, setParticipationId] = useState<string>();

  // Consent
  const onConsent = useCallback((newParticipationId) => {
    setParticipationId(newParticipationId);
    history.push(`/survey/${slug}/participate`)
  }, [slug]);

  // Refuse
  const onRefuse = useCallback(() => {
    history.push(`/`);
  }, []);

  return {
    participationId,
    onConsent,
    onRefuse,
  }
}