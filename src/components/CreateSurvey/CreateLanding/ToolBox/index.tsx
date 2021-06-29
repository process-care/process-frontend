import React from "react";
import { Container, Text } from "@chakra-ui/react";

import { t } from "static/createLanding";
import { LandingForm } from "./Form";

export const ToolBox: React.FC = () => {
  return (
    <Container variant="rightPart" height="100%" w="100%">
      <Text
        variant="titleParaLight"
        pb="19px"
        pt="19px"
        borderBottom="1px solid"
        borderColor="black"
        position="fixed"
        top="0"
        w="24.2%"
        backgroundColor="white"
        zIndex="3"
      >
        {t.title}
      </Text>
      <LandingForm />
    </Container>
  );
};
