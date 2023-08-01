'use client'

import { Box, Center, Container } from "@chakra-ui/react";

import CreateSurveyForm from "@/components/CreateSurvey/CreateSurveyMeta";
import Menu from "@/components/Menu/CreateSurvey";
import Timeline from "@/components/CreateSurvey/Timeline";

export default function CreateSurvey(): JSX.Element {
  return (
    <Box display="flex" justifyContent="space-around" w="100%" overflow="hidden">
      <Box w="100%">
        <Menu />
        <div className="background__grid">
          <Center h="80vh">
            <CreateSurveyForm />
          </Center>
        </div>
      </Box>
      <Container variant="rightPart" maxW="25%">
        <Timeline />
      </Container>
    </Box>
  );
};
