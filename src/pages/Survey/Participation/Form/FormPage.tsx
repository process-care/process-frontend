import React from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";

import { renderInput } from "components/CreateSurvey/CreateForm/InputsPreview/Card/utils";
import { selectors as pagesSelectors } from "redux/slices/participation/page-visited";

import { NL } from "../nl";
import { shouldShow } from "./condition-evaluations";
import { useAnswerSaver, useAnswersGetter } from "./answer-hooks";
import { formSchema } from "./validation";
import { useAppSelector } from "redux/hooks";
import { selectors } from "redux/slices/participation/questions-seen";

// ---- TYPES

interface Props {
  pageId: string;
  participationId: string;
  order: string[];
  isFirstPage: boolean;
  isLastPage: boolean;
  nextPage: () => void;
  previousPage: () => void;
  currentColor: string;
  onFinish: () => void;
}

// ---- COMPONENT

export const FormPage: React.FC<Props> = ({
  pageId,
  participationId,
  order,
  isFirstPage,
  isLastPage,
  nextPage,
  previousPage,
  currentColor,
  onFinish,
}) => {
  // Get page
  const page = useAppSelector(state => pagesSelectors.selectById(state, pageId));

  // Get answers
  const questionsId = page?.questions?.map((q) => q.id) ?? [];
  const answers = useAnswersGetter(questionsId);

  const orderInPage = order.reduce((acc, qId) => {
    const existsInPage = questionsId.some(qInPage => qInPage === qId);
    if (existsInPage) acc.push(qId);
    return acc;
  }, [] as string[]);

  // If page is empty
  if (!page) return <Box mt="60">{NL.msg.nodata}</Box>;

  // Final render
  return (
    <Box>
      <Text variant="xl" my="20px">
        {page.name}
      </Text>

      <Formik
        // validateOnBlur
        // validationSchema={formSchema(page.questions)}
        initialValues={answers.values}
        onSubmit={(data, { setSubmitting, validateForm }) => {
          validateForm(data);
          setSubmitting(true);
        }}
      >
        {({ isValid, dirty }) => {
          // TODO: use callback ?
          const canSubmit = () => {
            if (!page.questions) return true;
            //  isValid === true au mount du form alors que des champs required ne sont pas remplis
            const hasRequiredFields = page.questions.some(q => q.required);
            return (hasRequiredFields) ? dirty && isValid : isValid;
          };

          return (
            <Form>
              {/* Questions */}
              <Box px="10%" pt="20px">
                {orderInPage.map((inputId: string) => (
                  <Questionator
                    key={inputId}
                    id={inputId}
                  />
                ))}
              </Box>

              {/* Navigation */}
              <Flex justifyContent="flex-end" mt="10" mb="10" pr="10%">
                {!isFirstPage && (
                  <Button
                    disabled={!canSubmit()}
                    mr="4"
                    variant="roundedTransparent"
                    onClick={previousPage}
                  >
                    {NL.button.previous}
                  </Button>
                )}
                {!isLastPage && (
                  <Button
                    disabled={!canSubmit()}
                    variant="roundedBlue"
                    backgroundColor={currentColor}
                    onClick={nextPage}
                  >
                    {NL.button.next}
                  </Button>
                )}
                {isLastPage && (
                  <Button
                    disabled={!canSubmit()}
                    variant="roundedBlue"
                    backgroundColor={currentColor}
                    onClick={onFinish}
                  >
                    {NL.button.finish}
                  </Button>
                )}
              </Flex>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

// ---- SUB COMPONENTS

type QuestionatorProps = {
  id: string;
};

const Questionator: React.FC<QuestionatorProps> = ({
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
