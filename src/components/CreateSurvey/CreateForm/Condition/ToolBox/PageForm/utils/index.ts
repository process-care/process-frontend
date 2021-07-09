import IPage from "interfaces/form/page";
import ISurvey from "interfaces/survey";

// If inputs exist on current page Get the index of the last question in the current page and push the new question after it.
// If no input on this page Get the index of the last question in previous page and push the new question after it.
// If we are on the first page, just push it.

export const getNewOrder: any = (
  survey: ISurvey,
  selected_page: Partial<IPage>,
  new_question_id: string
) => {
  const { pages, order } = survey;
  const current_page_idx = pages.findIndex(
    (page: IPage) => page.id === selected_page.id
  );

  const { questions } = pages[current_page_idx];
  const length = questions?.length;

  if (questions && length && length > 0) {
    console.log("had questions");

    const last_id = questions[length - 1].id;
    const idx = order.findIndex((id: string) => id === last_id);
    const new_order = [...order];
    new_order.splice(idx + 1, 0, new_question_id);
    return new_order;
  } else {
    console.log("had no questions");

    const previous_questions = pages[current_page_idx - 1]?.questions;
    const last_question =
      previous_questions && previous_questions[previous_questions?.length - 1];
    const idx = survey.order?.findIndex(
      (id: string) => id === last_question?.id
    );
    const new_order = order !== null ? [...order] : [];
    new_order.splice(idx + 1, 0, new_question_id);
    return new_order;
  }
};
