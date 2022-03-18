import React from "react";
import { Container } from "@chakra-ui/react";

import { LandingForm } from "./Form/landingForm";
import { useAppSelector } from "redux/hooks";
import { AboutForm } from "./Form/aboutForm";
import { selectors } from "redux/slices/landing-editor";

export const ToolBox: React.FC = () => {
  const isEditingAbout = useAppSelector(selectors.isEditingAbout);

  return (
    <Container variant="rightPart" maxWidth="100%" transition="all 400ms" overflow="scroll" height="100vh">
      {isEditingAbout ? <AboutForm /> : <LandingForm />}
    </Container>
  );
};
