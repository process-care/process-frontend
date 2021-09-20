import React, { useCallback } from "react";
import { Box, Button } from "@chakra-ui/react";
import { useCreateParticipation } from "call/actions/participation";

// ---- TYPES

interface Props {
  surveyId: string
  onConsent: (participationId: string) => void
  onRefuse: () => void
}

// ---- COMPONENT

export const ParticipationConsent: React.FC<Props> = ({
  surveyId,
  onConsent,
  onRefuse,
}) => {
  const { mutateAsync: createParticipation, isLoading } = useCreateParticipation();

  const onAccept = useCallback(async () => {
    const res = await createParticipation({ consent: true, completed: false, survey: surveyId });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore : I don't understand the structure of the answer, because that's supposed to work
    onConsent(res.createParticipation.participation.id);
  }, [surveyId]);

  const onDecline = useCallback(() => {
    onRefuse();
  }, []);

  return (
    <Box mt="20">
      Hello man ! Do you consent ?

      <Box mt="20">
        <Button onClick={onAccept} mr="10">Yes</Button>
        <Button onClick={onDecline}>No</Button>
      </Box>
      
      {isLoading && 
        <Box mt="20">
          Please wait...
        </Box>
      }
    </Box>
  );
};
