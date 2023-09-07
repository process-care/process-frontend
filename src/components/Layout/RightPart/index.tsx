import { Container } from "@chakra-ui/react";

import { ConditionRedux } from "@/redux/slices/types/index.js"
import PageForm from "@/components/CreateSurvey/CreateForm/Condition/ToolBox/PageForm/index.tsx"
import ConditionPreview from "@/components/CreateSurvey/CreateForm/Condition/ConditionPreview/index.tsx"

interface Props {
  selectedCondition: ConditionRedux | undefined;
}
export default function RightPart({ selectedCondition }: Props): JSX.Element {
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
