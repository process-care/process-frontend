import React from "react";

import { Container } from "@chakra-ui/react";
import { ConditionMenu } from "components/CreateSurvey/CreateForm/Condition/ConditionMenu";
import { PageForm } from "components/CreateSurvey/CreateForm/Condition/ToolBox/PageForm";
import ISurvey from "interfaces/survey";

interface Props {
  selected_condition: {
    id: string;
  };
  survey: ISurvey;
}

export const RightPart: React.FC<Props> = ({ selected_condition, survey }) => {
  return (
    <Container variant="rightPart">
      {selected_condition.id !== "" ? (
        <ConditionMenu />
      ) : (
        <PageForm survey={survey} />
      )}
    </Container>
  );
};
