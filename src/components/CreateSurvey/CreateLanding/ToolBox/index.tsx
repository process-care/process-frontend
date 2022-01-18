import React from "react";
import { Container } from "@chakra-ui/react";

import { LandingForm } from "./Form/landingForm";
import { useAppSelector } from "redux/hooks";
import { AboutForm } from "./Form/aboutForm";
import { selectors } from "redux/slices/landing-editor";

export const ToolBox: React.FC = () => {
  const isEditingAbout = useAppSelector(selectors.isEditingAbout);

  return (
    <Container variant="rightPart" height="100%" w="43%">
      {isEditingAbout ? <AboutForm /> : <LandingForm />}
    </Container>
  );
};
