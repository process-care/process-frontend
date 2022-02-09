import React from "react";

import { Container } from "@chakra-ui/react";
import { PageForm } from "components/CreateSurvey/CreateForm/Condition/ToolBox/PageForm";
import { ConditionRedux } from "redux/slices/types";
import { ConditionPreview } from "components/CreateSurvey/CreateForm/Condition/ConditionPreview";

interface Props {
  selectedCondition: ConditionRedux | undefined;
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
