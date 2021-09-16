import React from "react";
import IRoute from "types/routes/route";
import { CreateSurveyForm } from "components/CreateSurvey/CreateSurveyMeta";
import { Menu } from "components/Menu/CreateSurvey";
import { Box, Center, Container } from "@chakra-ui/react";
import { Timeline } from "components/CreateSurvey/Timeline";

export const CreateSurvey: React.FC<IRoute> = () => {
  return (
    <Box d="flex" justifyContent="space-around" w="100%" overflow="hidden">
      <Box w="100%">
        <Menu />
        <div className="background__grid">
          <Center h="80vh">
            <CreateSurveyForm />
          </Center>
        </div>
      </Box>
      <Container variant="rightPart">
        <Timeline />
      </Container>
    </Box>
  );
};
