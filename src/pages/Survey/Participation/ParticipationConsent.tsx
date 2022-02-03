import React, { useCallback } from "react";
import { Box, Button, Container, Center } from "@chakra-ui/react";

import { Menu } from "components/Menu/CreateSurvey";
import { PdfPreview } from "../CreateConsent/PdfPreview";
import { API_URL_ROOT } from "constants/api";
import { NL } from "./nl";
import { useSurveyQuery } from "api/graphql/queries/survey.gql.generated";
import { client } from "api/gql-client";
import { useCreateParticipationMutation } from "api/graphql/queries/participation.gql.generated";

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
    useCreateParticipationMutation(client);
  const { data: survey } = useSurveyQuery(client, { id: surveyId });

  const onAccept = useCallback(async () => {
    const res = await createParticipation({
      values: { consent: true, completed: false, survey: surveyId },
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore : I don't understand the structure of the answer, because that's supposed to work
    onConsent(res.createParticipation.participation.id);
  }, [surveyId]);

  const onDecline = useCallback(() => {
    onRefuse();
  }, []);
  const attributes = survey?.survey?.data?.attributes;
  const url = attributes?.notice_consent?.data?.attributes?.url;

  if (isLoading) <Box mt="20">Please wait...</Box>;

  return (
    <Box
      d="flex"
      justifyContent="space-around"
      w="100%"
      overflow="hidden"
      h="100vh"
    >
      <Box w="100%">
        <Menu surveyTitle={attributes?.title} />

        <div className="background__grid">
          <Box
            h="100%"
            d="flex"
            justifyContent="center"
            overflow="scroll"
            pt="40px"
          >
            {url ? (
              <PdfPreview url={`${API_URL_ROOT}${url}`} />
            ) : (
              <Box w="450px" h="500px" backgroundColor="gray.100" />
            )}
          </Box>
        </div>
      </Box>
      <Container variant="rightPart">
        <Center h="100vh">
          <Box d="flex" flexDir="column">
            <Button
              mb="50px"
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
