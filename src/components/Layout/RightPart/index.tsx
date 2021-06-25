import React from "react";

import { Container } from "@chakra-ui/react";
import { ConditionMenu } from "components/CreateSurvey/CreateForm/Condition/ConditionMenu";
import { PageForm } from "components/CreateSurvey/CreateForm/Condition/ToolBox/PageForm";
import IPage from "interfaces/form/page";

interface Props {
  selected_page: IPage;
  selected_condition: {
    id: string;
  };
}

export const RightPart: React.FC<Props> = ({ selected_condition }) => {
  return (
    <Container variant="rightPart">
      {selected_condition.id !== "" ? <ConditionMenu /> : <PageForm />}
    </Container>
  );
};
