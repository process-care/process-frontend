import React from "react";

import { Container } from "@chakra-ui/react";
import { ConditionMenu } from "components/CreateSurvey/Condition/ConditionMenu";
import { PageForm } from "components/CreateSurvey/ToolBox/PageForm";

interface Props {
  selected_condition: {
    id: string;
  };
}

export const RightPart: React.FC<Props> = ({ selected_condition }) => {
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
      {selected_condition.id !== "" ? <ConditionMenu /> : <PageForm />}
    </Container>
  );
};
