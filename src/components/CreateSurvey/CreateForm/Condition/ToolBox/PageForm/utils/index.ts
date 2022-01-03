// If inputs exist on current page Get the index of the last question in the current page and push the new question after it.
// If no input on this page Get the index of the last question in previous page and push the new question after it.
// If we are on the first page, just push it.

import { RootState } from "redux/store";

export const getNewOrder: any = (
  global: RootState["scientistData"],
  new_question_id: string
) => {
  const pagesIds = global.pages.ids;
  const order = global.survey.order === null ? [] : global.survey.order;
  const selectedPageId = global.pages.selectedPage;
  const q = Object.entries(global.questions.entities);
  const questions = q.filter((c) => c[1]?.page?.id === selectedPageId);

  const previousPageIdx = pagesIds.findIndex((p) => p === selectedPageId) - 1;
  const previousPageId = pagesIds[previousPageIdx];
  const previousQuestions = q.filter((c) => c[1]?.page?.id === previousPageId);
  const length = questions?.length;

  if (questions && length && length > 0) {
    const ids = questions.map((q) => q[0]);
    const last_idx = Math.max(
      ...ids.map((i) => {
        return order.findIndex((id: string) => id === i);
      })
    );
    const new_order = [...order];
    new_order.splice(last_idx + 1, 0, new_question_id);

    return new_order;
  } else {
    if (previousQuestions.length === 0) {
      return [new_question_id];
    } else {
      const ids = previousQuestions.map((q) => q[0]);
      const last_idx = Math.max(
        ...ids.map((i) => {
          return order.findIndex((id: string) => id === i);
        })
      );

      const new_order = order !== null ? [...order] : [];
      new_order.splice(last_idx + 1, 0, new_question_id);
      return new_order;
    }
  }
};
