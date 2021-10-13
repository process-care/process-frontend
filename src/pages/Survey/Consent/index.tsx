import React, { useCallback } from "react";
import { Box, Button } from "@chakra-ui/react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actions } from "redux/slices/participation";
import { useCreateParticipation } from "call/actions/participation";

// STATIC

// ---- COMPONENT

export const Consent = () => {
  console.log("welcome in the desert of the real");

  const { slug } = useParams<{ slug: string }>();
  const history = useHistory();

  const { mutateAsync: createParticipation, isLoading } =
    useCreateParticipation();

  const onAccept = useCallback(async () => {
    console.log("you said yes");
    const res = await createParticipation({ consent: true, completed: false });
    console.log("effin res: ", res);
    history.push(`/survey/${slug}/participate`);
  }, [slug]);

  const onDecline = useCallback(() => {
    console.log("you said no");
    history.push(`/`);
  }, []);

  return (
    <Box mt="20">
      Hello man ! Do you consent ?
      <Box mt="20">
        <Button onClick={onAccept} mr="10">
          Yes
        </Button>
        <Button onClick={onDecline}>No</Button>
      </Box>
      {isLoading && <Box mt="20">Please wait...</Box>}
    </Box>
  );
};
