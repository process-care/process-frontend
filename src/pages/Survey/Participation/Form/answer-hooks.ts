import { useEffect } from "react";
import { useField } from "formik";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { actions, selectors } from "redux/slices/participation/answers";

/**
 *
 * @param participationId
 * @param questionsId
 * @returns
 */
export function useAnswersGetter(
  questionsId: string[]
): {
  values: Record<string, unknown>;
  references: Map<any, any>;
} {
  const data = useAppSelector(state => selectors.selectByIds(state, questionsId));

  const ref = new Map();

  const answers = data.reduce((acc, a) => {
    acc[a.questionId] = a.value;
    ref.set(a.questionId, a.id);
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
export function useAnswerSaver(
  questionId: string,
): void {
  const dispatch = useAppDispatch();
  const [field] = useField(questionId);
  const stateValue = useAppSelector(state => selectors.selectById(state, questionId));

  useEffect(() => {
    // Do not dispatch if the value isn't different between Formik / Redux
    if (stateValue?.value === field.value) return;

    dispatch(actions.update({ questionId, value: field.value }));
  }, [questionId, field.value, stateValue?.value]);
}
