import { Box } from "@chakra-ui/react";
import { useAppSelector } from "redux/hooks";

import { selectors } from "redux/slices/participation/questions";
import { RenderInput } from "components/CreateSurvey/CreateForm/InputsPreview/Card/utils";
import { useAnswerSaver } from "./answer-hooks";
import { shouldShow } from "./condition-evaluations";
import { useMediaQueries } from "utils/hooks/mediaqueries";

// ---- TYPES

export type Props = {
  id: string;
};

// ---- COMPONENT

export const Questionator: React.FC<Props> = ({ id }) => {
  const { isTablet } = useMediaQueries();

  // Get question's related content & answers
  const question = useAppSelector((state) => selectors.selectById(state, id));
  const evaluations = useAppSelector((state) =>
    selectors.selectEvaluation(state, id)
  );

  console.log(evaluations);
  // Evaluate if the question should be shown
  const show = shouldShow(evaluations);

  // Bind the save mechanism
  useAnswerSaver(id);

  // Intermediate displays
  if (!question) return <div>Loading...</div>;
  if (!show) return null;

  // Render
  return (
    <Box
      mb="10"
      backgroundColor="white"
      w="100%"
      p={isTablet ? "20px" : "40px"}
      borderRadius="5px"
    >
      <RenderInput input={question} />
    </Box>
  );
};
