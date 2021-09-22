import React from "react";
import { Container, Text } from "@chakra-ui/react";

import { t } from "static/createLanding";
import { LandingForm } from "./Form/landingForm";
import { useAppSelector } from "redux/hooks";
import { AboutForm } from "./Form/aboutForm";
import { selectors } from "redux/slices/landing-editor";

export const ToolBox: React.FC = () => {
  const isEditingAbout = useAppSelector(selectors.isEditingAbout);

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
      {isEditingAbout ? (
        <AboutForm />
      ) : (
        <LandingForm />
      )}
    </Container>
  );
};
