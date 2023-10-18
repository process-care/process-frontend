import { useEffect, useMemo } from "react";
import { useField } from "formik";

import { useAppDispatch, useAppSelector } from "@/redux/hooks/index.js"
import { actions, selectors } from "@/redux/slices/participation/answers.js"
import { PageParticipationRedux } from "@/redux/slices/participation/page.js"
import { QuestionRedux } from "@/redux/slices/types/index.js"

// ---- TYPES

type InitialAnswers = Record<string, unknown>;

type InitialContent = {
  initialAnswers: InitialAnswers;
  orderInPage: string[];
};

// ---- HOOKS

/**
 *
 * @param page
 * @param order
 * @returns
 */
export function useInitialPageContent(
  page: PageParticipationRedux | undefined,
  order: string[],
  questions: QuestionRedux[]
): InitialContent {
  // Filter questions & order in this page
  const { questionsId, orderInPage } = useMemo(() => {
    const questionsId =
      questions?.reduce((acc, q) => {
        if (q.id) acc.push(q.id);
        return acc;
      }, [] as string[]) ?? [];

    // Narrow the order to this page only
    const orderInPage = order.reduce((acc, qId) => {
      const existsInPage = questionsId.some((qInPage) => qInPage === qId);
      if (existsInPage) acc.push(qId);
      return acc;
    }, [] as string[]);

    return { questionsId, orderInPage };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page?.id]);

  // Select related data from redux
  const data = useAppSelector((state) => selectors.selectByIds(state, questionsId));

  // Recompute the initial answers ONLY when the Page ID changes !
  const initialAnswers = useMemo(() => {
    const answers = data.reduce((acc, a) => {
      acc[a.questionId] = a.value;
      return acc;
    }, {} as Record<string, unknown>);

    return answers;
  // eslint-disable-next-line react-hooks/exhaustive-deps -- only when page changes
  }, [page?.id]);

  return { initialAnswers, orderInPage };
}

/**
 *
 * @param id
 * @param participationId
 */
export function useAnswerSaver(questionId: string): void {
  const dispatch = useAppDispatch();
  const [field] = useField(questionId);
  const stateValue = useAppSelector((state) => selectors.selectById(state, questionId));

  useEffect(() => {
    // Do not dispatch if the value isn't different between Formik / Redux
    if (stateValue?.value === field.value) return;

    dispatch(actions.update({ questionId, value: field.value }));
  }, [questionId, field.value, stateValue?.value, dispatch]);
}
