import { Box } from "@chakra-ui/react";
import { useAppSelector } from "redux/hooks";

import { selectors } from "redux/slices/participation/questions";
import { renderInput } from "components/CreateSurvey/CreateForm/InputsPreview/Card/utils";
import { useAnswerSaver } from "./answer-hooks";
import { shouldShow } from "./condition-evaluations";

// ---- TYPES

export type Props = {
  id: string;
};

// ---- COMPONENT

export const Questionator: React.FC<Props> = ({
  id,
}) => {
  // Get question's related content & answers
  const question = useAppSelector(state => selectors.selectById(state, id));
  const evaluations = useAppSelector(state => selectors.selectEvaluation(state, id));

  // Evaluate if the question should be shown
  const show = shouldShow(evaluations);

  // Bind the save mechanism
  useAnswerSaver(id);

  // Intermediate displays
  if (!question) return <div>Loading...</div>;
  if (!show) return null;

  // Render
  return (
    <Box mb="10" backgroundColor="white" w="100%" p="40px">
      {renderInput(question)}
    </Box>
  );
};