import { Container } from "@chakra-ui/react";

import { useAppSelector } from "@/redux/hooks";
import { selectors } from "@/redux/slices/landing-editor";
import LandingForm from "./Form/landingForm";
import AboutForm from "./Form/aboutForm";

export default function ToolBox(): JSX.Element {
  const isEditingAbout = useAppSelector(selectors.isEditingAbout);

  return (
    <Container variant="rightPart" maxWidth="100%" h="100vh" transition="all 400ms">
      {isEditingAbout ? <AboutForm /> : <LandingForm />}
    </Container>
  );
};
