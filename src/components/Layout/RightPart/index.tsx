import { Container } from "@chakra-ui/react";
import { ConditionMenu } from "components/CreateSurvey/Condition/ConditionMenu";
import { PageForm } from "components/CreateSurvey/ToolBox/PageForm";
import React from "react";

interface Props {
  isConditionPreview: boolean;
}

export const RightPart: React.FC<Props> = ({ isConditionPreview }) => {
  return (
    <Container
      justifyContent="flex-start"
      p={0}
      flexDirection="column"
      borderLeft="1px"
      variant="createformColumn"
      minW="300px"
      overflowY="auto"
      w="32%">
      {isConditionPreview ? <ConditionMenu /> : <PageForm />}
    </Container>
  );
};
