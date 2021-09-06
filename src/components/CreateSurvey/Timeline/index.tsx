import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { Survey } from "redux/slices/surveyBuilder";

// STATIC
const t = {
  cancel: "Annuler",
};

// //   TYPES
interface Props {
  survey: Survey["survey"];
  step: number;
}

const RenderSteps: React.FC<Props> = ({ survey, step }) => {
  const dispatch = useAppDispatch();
  const { title, language, email, categories, keywords, description } = survey;
  const Step = ({
    objKey,
    step,
  }: {
    objKey: keyof Survey["survey"];
    step: number;
  }) => {
    return (
      <Box>
        <p>{step}</p>
        <strong>{objKey}</strong>
        <p>{survey[objKey]}</p>
        <br />
        <br />
      </Box>
    );
  };

  return (
    <Box>
      {title && <Step objKey="title" step={1} />}
      {language && <Step objKey="language" step={2} />}
      {email && <Step objKey="email" step={3} />}
      {description && <Step objKey="description" step={4} />}
    </Box>
  );
};

export const Timeline: React.FC = () => {
  const { survey, step } = useAppSelector((state) => state.surveyBuilder);
  return (
    <Box p="20px">
      <Flex justifyContent="flex-end">
        <NavLink to="/dashboard">
          <Button variant="link" color="gray.200">
            {t.cancel}
          </Button>
        </NavLink>
      </Flex>
      <RenderSteps survey={survey} step={step} />
    </Box>
  );
};
