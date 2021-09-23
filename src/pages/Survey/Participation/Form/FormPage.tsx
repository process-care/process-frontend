import React from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";

import { useGetPage } from "call/actions/formBuider/page";
import { renderInput } from "components/CreateSurvey/CreateForm/InputsPreview/Card/utils";
import {
  useGetQuestion,
  useQuestionEvaluation,
} from "call/actions/formBuider/question";
import { NL } from "../nl";
import { shouldShow } from "./condition-evaluations";
import { useAnswerSaver, useAnswersGetter } from "./answer-hooks";
import IQuestion from "types/form/question";
import { formSchema } from "./validation";

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
  const { data } = useGetPage(pageId);

  // Get answers
  const questionsId = data?.page.questions?.map((q) => q.id) ?? [];
  const answers = useAnswersGetter(participationId, questionsId);

  // If page is empty
  if (!data?.page) return <Box mt="60">{NL.msg.nodata}</Box>;

  // Final render
  return (
    <Box>
      <Text variant="xl" my="20px">
        {data.page.name}
      </Text>

      <Formik
        validateOnBlur
        validationSchema={formSchema(data.page.questions)}
        initialValues={answers.values}
        onSubmit={(data, { setSubmitting, validateForm }) => {
          validateForm(data);
          setSubmitting(true);
        }}
      >
        {({ isValid, dirty }) => {
          const canSubmit = () => {
            if (data.page.questions) {
              //  isValid === true au mount du form alors que des champs required ne sont pas remplis
              const hadRequiredFields =
                data.page.questions.filter((q) => q.required).length !== 0;

              if (hadRequiredFields) {
                return dirty && isValid;
              } else {
                return isValid;
              }
            } else return true;
          };

          return (
            <Form>
              {/* Questions */}
              <Box px="10%" pt="20px">
                {order?.map((inputId: string) => {
                  const current = data.page.questions?.find(
                    (q: IQuestion) => q.id === inputId
                  );
                  if (current !== undefined) {
                    return (
                      <Questionator
                        key={inputId}
                        id={inputId}
                        participationId={participationId}
                        answerId={answers.references.get(inputId)}
                      />
                    );
                  } else return;
                })}
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
  participationId: string;
  answerId?: string;
};

const Questionator: React.FC<QuestionatorProps> = ({
  id,
  participationId,
  answerId,
}) => {
  const { data: rawEvaluation } = useQuestionEvaluation(id, participationId);
  const { data: rawQuestion, isLoading } = useGetQuestion(id);

  const show = shouldShow(rawEvaluation?.evaluation.conditions);

  useAnswerSaver(id, participationId, answerId);

  if (isLoading) return <div>Loading...</div>;
  if (!rawQuestion?.question) return <div>Oups</div>;
  if (!show) return null;

  return (
    <Box mb="10" backgroundColor="white" w="100%" p="40px">
      {renderInput(rawQuestion.question)}
    </Box>
  );
};
