import React from "react";

import { Container } from "@chakra-ui/react";
import { PageForm } from "components/CreateSurvey/CreateForm/Condition/ToolBox/PageForm";
import ICondition from "types/form/condition";
import { ConditionPreview } from "components/CreateSurvey/CreateForm/Condition/ConditionPreview";

interface Props {
  selectedCondition: ICondition | undefined;
}
export const RightPart: React.FC<Props> = ({ selectedCondition }) => {
  return (
    <Container variant="rightPart">
      {selectedCondition?.id !== undefined ? (
        <ConditionPreview selectedCondition={selectedCondition} />
      ) : (
        <PageForm />
      )}
    </Container>
  );
};
