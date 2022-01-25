import React, { useCallback } from "react";
import { Box, Button, Container, Center } from "@chakra-ui/react";
import { useCreateParticipation } from "call/actions/participation";

import { Menu } from "components/Menu/CreateSurvey";
import { useGetSurvey } from "call/actions/survey";
import { PdfPreview } from "../CreateConsent/PdfPreview";
import { API_URL_ROOT } from "constants/api";
import { NL } from "./nl";
import { useMediaQueries } from "utils/hooks/mediaqueries";

// ---- TYPES

interface Props {
  surveyId: string;
  onConsent: (participationId: string) => void;
  onRefuse: () => void;
}

// ---- COMPONENT

export const ParticipationConsent: React.FC<Props> = ({
  surveyId,
  onConsent,
  onRefuse,
}) => {
  const { mutateAsync: createParticipation, isLoading } =
    useCreateParticipation();
  const { data: survey } = useGetSurvey(surveyId);

  const onAccept = useCallback(async () => {
    const res = await createParticipation({
      consent: true,
      completed: false,
      survey: surveyId,
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore : I don't understand the structure of the answer, because that's supposed to work
    onConsent(res.createParticipation.participation.id);
  }, [surveyId]);

  const onDecline = useCallback(() => {
    onRefuse();
  }, []);

  const url = survey?.survey?.consentement?.url;
  const { isTablet } = useMediaQueries();

  if (isLoading) <Box mt="20">Please wait...</Box>;

  return (
    <Box
      d="flex"
      justifyContent="space-around"
      w="100%"
      overflow="hidden"
      h="100%"
      flexDirection={isTablet ? "column" : "row"}
    >
      <Box w="100%">
        <Menu surveyTitle={survey?.survey.title} />

        <div className="background__grid">
          <Box
            h="100%"
            d="flex"
            justifyContent="center"
            overflow="scroll"
            pt="40px"
            pb={isTablet ? "50px" : "0px"}
            w={isTablet ? "90%" : "100%"}
            mx="auto"
          >
            {url ? (
              <PdfPreview url={`${API_URL_ROOT}${url}`} />
            ) : (
              <Box w="450px" h="500px" backgroundColor="gray.100" />
            )}
          </Box>
        </div>
      </Box>
      <Container
        variant="rightPart"
        className={isTablet ? "background__grid" : ""}
      >
        <Center
          h={isTablet ? "unset" : "100vh"}
          mb="20px"
          w={isTablet ? "100%" : "unset"}
        >
          <Box d="flex" flexDir="column" w={isTablet ? "90%" : "50%"}>
            <Button
              mb="20px"
              isFullWidth
              variant="rounded"
              onClick={onAccept}
              mr="10"
            >
              {NL.button.consent.accept}
            </Button>

            <Button isFullWidth variant="rounded" onClick={onDecline}>
              {NL.button.consent.refuse}
            </Button>
          </Box>
        </Center>
      </Container>
    </Box>
  );
};
