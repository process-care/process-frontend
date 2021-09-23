import { useEffect, useState } from "react";
import { useField } from "formik";
import { useDebounce } from "utils/hooks/debounce";
import {
  useCreateAnswer,
  useGetAnswers,
  useUpdateAnswer,
} from "call/actions/answers";

/**
 *
 * @param participationId
 * @param questionsId
 * @returns
 */
export function useAnswersGetter(
  participationId: string,
  questionsId: string[]
): {
  values: Record<string, unknown>;
  references: Map<any, any>;
  isLoading: boolean;
} {
  const { data, isLoading } = useGetAnswers(participationId, questionsId);

  const ref = new Map();

  const answers = data?.answers.reduce((acc, a) => {
    acc[a.question.id] = a.value;
    ref.set(a.question.id, a.id);
    return acc;
  }, {} as Record<string, unknown>);

  return {
    values: answers ?? {},
    references: ref,
    isLoading,
  };
}

/**
 *
 * @param id
 * @param participationId
 */
export function useAnswerSaver(
  questionId: string,
  participationId: string,
  initialAnswerId?: string
): void {
  const [field] = useField(questionId);
  const debouncedValue = useDebounce(field.value, 2000);

  const [answerId, setAnswerId] = useState(initialAnswerId);

  // Mutators
  const { mutateAsync: create } = useCreateAnswer();
  const { mutateAsync: update } = useUpdateAnswer();

  useEffect(() => {
    if (debouncedValue === undefined) return;

    console.log(
      `Saving : question "${questionId}" -> value changed to: ${debouncedValue} (answer ID: ${answerId})`
    );

    if (!answerId) {
      create({
        participation: participationId,
        question: questionId,
        value: debouncedValue,
      }).then(
        (v) => {
          setAnswerId(v.createAnswer.answer.id);
          console.log("Success on CREATE: ", v);
        },
        (e) => console.log("Error on CREATE: ", e)
      );
    } else {
      update({ id: answerId, data: { value: debouncedValue } }).then(
        (v) => console.log("Success on UPDATE: ", v),
        (e) => console.log("Error on UPDATE: ", e)
      );
    }
  }, [questionId, answerId, participationId, debouncedValue]);
}
