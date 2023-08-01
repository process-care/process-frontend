import { Container } from "@chakra-ui/react";

import { ConditionRedux } from "@/redux/slices/types";
import PageForm from "@/components/CreateSurvey/CreateForm/Condition/ToolBox/PageForm";
import ConditionPreview from "@/components/CreateSurvey/CreateForm/Condition/ConditionPreview";

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
