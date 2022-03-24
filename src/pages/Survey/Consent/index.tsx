import React, { useCallback } from "react";
import { Box, Button } from "@chakra-ui/react";
import { useHistory, useParams } from "react-router-dom";

// STATIC

// ---- COMPONENT

export const Consent: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const history = useHistory();

  const onAccept = useCallback(async () => {
    history.push(`/survey/${slug}/participate`);
  }, [slug]);

  const onDecline = useCallback(() => {
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
    </Box>
  );
};
