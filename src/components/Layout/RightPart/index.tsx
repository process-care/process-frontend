import React from "react";

import { Container } from "@chakra-ui/react";
import { ConditionMenu } from "components/CreateSurvey/CreateForm/Condition/ConditionMenu";
import { PageForm } from "components/CreateSurvey/CreateForm/Condition/ToolBox/PageForm";
import ICondition from "types/form/condition";

interface Props {
  selectedCondition: ICondition | undefined;
}
export const RightPart: React.FC<Props> = ({ selectedCondition }) => {
  return (
    <Container variant="rightPart">
      {selectedCondition?.id !== undefined ? (
        <ConditionMenu selectedCondition={selectedCondition} />
      ) : (
        <PageForm />
      )}
    </Container>
  );
};
