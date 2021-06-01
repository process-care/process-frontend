import { Container } from "@chakra-ui/react";
import { ConditionMenu } from "components/CreateSurvey/Condition/ConditionMenu";
import { PageForm } from "components/CreateSurvey/ToolBox/PageForm";
import ICondition from "interfaces/form/condition";
import React from "react";

interface Props {
  selected_condition: ICondition | null;
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
      {selected_condition ? <ConditionMenu /> : <PageForm />}
    </Container>
  );
};
