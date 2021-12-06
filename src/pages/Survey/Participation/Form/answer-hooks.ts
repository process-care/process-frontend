import { useEffect, useMemo } from "react";
import { useField } from "formik";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { actions, selectors } from "redux/slices/participation/answers";
import { ReduxPage } from "redux/slices/participation/page";

// ---- TYPES

type InitialAnswers = Record<string, unknown>;

type InitialContent = {
  initialAnswers: InitialAnswers,
  orderInPage: string[]
};

// ---- HOOKS

/**
 * 
 * @param page 
 * @param order 
 * @returns 
 */
export function useInitialPageContent(page: ReduxPage | undefined, order: string[]): InitialContent {
  // Filter questions & order in this page
  const { questionsId, orderInPage } = useMemo(() => {
    const questionsId = page?.questions?.map((q) => q.id) ?? [];

    // Narrow the order to this page only
    const orderInPage = order.reduce((acc, qId) => {
      const existsInPage = questionsId.some(qInPage => qInPage === qId);
      if (existsInPage) acc.push(qId);
      return acc;
    }, [] as string[]);

    return { questionsId, orderInPage };
  }, [page?.id]);

  // Select related data from redux
  // It cannot be memoized, since it's a hook
  const data = useAppSelector(state => selectors.selectByIds(state, questionsId));

  // Recompute the initial answers ONLY when the Page ID changes !
  const initialAnswers = useMemo(() => {
    const answers = data.reduce((acc, a) => {
      acc[a.questionId] = a.value;
      return acc;
    }, {} as Record<string, unknown>);

    return answers;
  }, [page?.id]);
  
  return { initialAnswers, orderInPage };
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
