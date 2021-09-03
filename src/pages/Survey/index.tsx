import React from "react";
import IRoute from "types/routes/route";
import { CreateSurveyForm } from "components/CreateSurvey";
import { Menu } from "components/Menu/CreateSurvey";
import { Box, Container } from "@chakra-ui/react";

export const CreateSurvey: React.FC<IRoute> = () => {
  return (
    <Box d="flex" justifyContent="space-around" w="100%" overflow="hidden">
      <Box w="100%">
        <Menu />
        <CreateSurveyForm />
      </Box>
      <Container variant="rightPart" />
    </Box>
  );
};
