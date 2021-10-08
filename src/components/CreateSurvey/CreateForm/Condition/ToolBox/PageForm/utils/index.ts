import { RootState } from "redux/store";

// If inputs exist on current page Get the index of the last question in the current page and push the new question after it.
// If no input on this page Get the index of the last question in previous page and push the new question after it.
// If we are on the first page, just push it.

export const getNewOrder: any = (
  formEditor: RootState["formEditor"],
  new_question_id: string
) => {
  const pagesIds = formEditor.pages.ids;
  const order =
    formEditor.selectedSurvey.order === null
      ? []
      : formEditor.selectedSurvey.order;
  const selectedPageId = formEditor.pages.selectedPage;
  const q = Object.entries(formEditor.questions.entities);
  const questions = q.filter((c) => c[1]?.page?.id === selectedPageId);

  const previousPageIdx = pagesIds.findIndex((p) => p === selectedPageId) - 1;
  const previousPageId = pagesIds[previousPageIdx];
  const previousQuestions = q.filter((c) => c[1]?.page?.id === previousPageId);
  console.log(previousQuestions);
  const length = questions?.length;

  if (questions && length && length > 0) {
    console.log("HAD QUESTIONS ___");
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
      console.log("FIRST QUESTION___");
      return [new_question_id];
    } else {
      console.log("NEW PAGE ");
      const ids = previousQuestions.map((q) => q[0]);
      const last_idx = Math.max(
        ...ids.map((i) => {
          return order.findIndex((id: string) => id === i);
        })
      );
      console.log(ids, order);

      const new_order = order !== null ? [...order] : [];
      new_order.splice(last_idx + 1, 0, new_question_id);
      return new_order;
    }
  }
};
