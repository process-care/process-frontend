import { Container } from "@chakra-ui/react";

import { useAppSelector } from "@/redux/hooks/index.js"
import { selectors } from "@/redux/slices/landing-editor.ts"
import LandingForm from "./Form/landingForm.tsx"
import AboutForm from "./Form/aboutForm.tsx"

export default function ToolBox(): JSX.Element {
  const isEditingAbout = useAppSelector(selectors.isEditingAbout);

  return (
    <Container variant="rightPart" maxWidth="100%" h="100vh" transition="all 400ms">
      {isEditingAbout ? <AboutForm /> : <LandingForm />}
    </Container>
  );
};
