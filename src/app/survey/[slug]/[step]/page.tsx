'use client'

import { useCallback, useEffect } from "react";
import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation.js"

import { useAppSelector } from "@/redux/hooks/index.js"
import { actions, selectors } from "@/redux/slices/scientistData.js"
import { SURVEY_STATUS } from "@/types/survey.js"
import { NL } from "@/static/participation.js"
import { useConsentHandlers } from "@/utils/participations/consent-handler.js"
import Loader from "@/components/Spinner/index.tsx"
import ParticipationConsent from "./_components/ParticipationConsent.tsx"
import ParticipationForm from "./_components/ParticipationForm.tsx"
import { useMediaQueries } from "@/utils/hooks/mediaqueries.ts";

// ---- TYPES

type Props = {
  params: {
    slug: string;
    step: string;
  };
};

// ---- COMPONENT

export default function Participation({ params }: Props): JSX.Element {
  const router = useRouter()

  const { slug, step } = params
  const dispatch = useDispatch();
  const { loading, participation, onConsent, onRefuse } = useConsentHandlers(slug);

  useEffect(() => {
    dispatch(actions.initializeSurvey(slug));
  }, [dispatch, slug]);

  const survey = useAppSelector(selectors.survey.getSelectedSurvey);
  const isLoading = useAppSelector(selectors.survey.isLoading);

  const surveyId = survey.id;
  const status = survey?.attributes?.status;
  const goBackHome = useCallback(() => router.push("/"), [router]);

  // If there is already a completed participation in local storage
  if (participation?.completed) {
    return <OverWarning msg={NL.msg.thxParticipation} cta={NL.button.backToWelcome} action={goBackHome} />
  }

  // LOADING STATE
  if (loading || isLoading || !survey) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  if (status !== SURVEY_STATUS.Running) {
    return <OverWarning msg={NL.msg.surveyOver} cta={NL.button.backToWelcome} action={goBackHome} />;
  }

  // Redirect if the there is an existing participation and consent is already given
  if (participation?.consent && step !== "participate") {
    router.push(`/survey/${slug}/participate`);
  }

  if (!surveyId) {
    return <p>Une erreur est survenue</p>
  }

  // CONSENT
  if (step === "consent") {
    return <ParticipationConsent surveyId={surveyId} onConsent={onConsent} onRefuse={onRefuse} />;
  }

  // PARTICIPATE
  if (step === "participate") {
    if (!participation) {
      router.push(`/survey/${slug}`);
      return <Box mt="60">{NL.msg.missingConsent}</Box>;
    }

    return <ParticipationForm
      surveyId={surveyId}
      participationId={participation.id}
      mode="participant"
    />
  }

  return <Box mt="60">Something went wrong...</Box>
}

// ---- SUB COMPONENTS

type OverWarningProps = {
  msg: string;
  cta: string;
  action: () => void;
};

const OverWarning = ({ msg, cta, action }: OverWarningProps) => {
  const { isTablet } = useMediaQueries()
  
  return (
    <Center h="100vh" display="flex" flexDirection="column" backgroundColor="gray.100">
      <Box
        backgroundColor="white"
        p={isTablet ? "30px 20px" : "50px"}
        border="1px solid"
        borderColor="brand.line"
        w={isTablet ? "90%" : "600px"}
      >
        <Text variant="title">{msg}</Text>
      </Box>
    </Center>
  )
}
