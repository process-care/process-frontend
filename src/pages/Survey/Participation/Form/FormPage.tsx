import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { Form, Formik, useField } from "formik";

import { useGetPage } from "call/actions/formBuider/page";
import { renderInput } from "components/CreateSurvey/CreateForm/InputsPreview/Card/utils";
import { EvaluationCondition, useGetQuestion, useQuestionEvaluation } from "call/actions/formBuider/question";
import { useCreateAnswer, useGetAnswers, useUpdateAnswer } from "call/actions/answers";
import { useDebounce } from "utils/hooks/debounce";
import { NL } from "../nl";

// ---- TYPES

interface Props {
  pageId: string
  participationId: string
}

// ---- COMPONENT

export const FormPage: React.FC<Props> = ({
  pageId,
  participationId,
}) => {
  // Get page
  const { data } = useGetPage(pageId);

  // Get answers
  const questionsId = data?.page.questions?.map(q => q.id) ?? [];
  const answers = useAnswersGetter(participationId, questionsId);

  // If page is empty
  if (!data?.page) return <Box mt="60">{NL.msg.nodata}</Box>;

  // Final render
  return (
    <Box>
      {data.page.name}

      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={answers.values}
        enableReinitialize
        onSubmit={(data, { setSubmitting, validateForm }) => {
          validateForm(data);
          setSubmitting(true);
        }}
      >
        {() => {
          return (
            <Form>
              {/* Questions */}
              { data.page.questions?.map(q => (
                <Questionator key={q.id} id={q.id} participationId={participationId} answerId={answers.references.get(q.id)} />
              ))}
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
 answerId?: string
}

const Questionator: React.FC<QuestionatorProps> = ({
  id,
  participationId,
  answerId,
}) => {
  const { data: rawEvaluation } = useQuestionEvaluation(id, participationId);
  const { data: rawQuestion, isLoading } = useGetQuestion(id);

  const show = shouldShow(rawEvaluation?.evaluation.conditions);

  useAnswerSaver(id, participationId, answerId);

  if (isLoading) return <div>Loading...</div>
  if (!rawQuestion?.question) return <div>Oups</div>;
  if (!show) return null;

  return (
    <Box ml="60" mr="60" mb="10">
      {renderInput(rawQuestion.question)}
    </Box>
  );
}

// ---- HOOKS

/**
 * 
 * @param participationId 
 * @param questionsId 
 * @returns 
 */
function useAnswersGetter(participationId: string, questionsId: string[]) {
  const { data } = useGetAnswers(participationId, questionsId);

  const ref = new Map();

  const answers = data?.answers.reduce((acc, a) => {
    acc[a.question.id] = a.value;
    ref.set(a.question.id, a.id);
    return acc;
  }, {} as Record<string, unknown>);

  return {
    values: answers ?? {},
    references: ref,
  };
}

/**
 * 
 * @param id 
 * @param participationId 
 */
function useAnswerSaver(questionId: string, participationId: string, initialAnswerId?: string) {
  const [field] = useField(questionId);
  const debouncedValue = useDebounce(field.value, 2000);

  const [answerId, setAnswerId] = useState(initialAnswerId);
  
  // Mutators
  const { mutateAsync: create } = useCreateAnswer();
  const { mutateAsync: update } = useUpdateAnswer();

  useEffect(() => {
    if (debouncedValue === undefined) return;

    console.log('Saving');
    console.log('The value changed to: ', debouncedValue);
    console.log('for participation: ', participationId);
    console.log('for question: ', questionId);
    console.log('with answer: ', answerId);

    if (!answerId) {
      create({ participation: participationId, question: questionId, value: debouncedValue }).then(
        (v => {
          setAnswerId(v.createAnswer.answer.id);
          console.log('Success on CREATE: ', v)
        }),
        (e => console.log('Error on CREATE: ', e)),
      );
    }
    else {
      update({ id: answerId, data: { value: debouncedValue }}).then(
        (v => console.log('Success on UPDATE: ', v)),
        (e => console.log('Error on UPDATE: ', e)),
      );
    }
  }, [questionId, answerId, participationId, debouncedValue]);
}

// ---- HELPERS

function shouldShow(conditions: [EvaluationCondition] | undefined) {
  const grouped = new Map();

  const evaluations = conditions?.map(c => {
    return true;
  });

  return true;
}
