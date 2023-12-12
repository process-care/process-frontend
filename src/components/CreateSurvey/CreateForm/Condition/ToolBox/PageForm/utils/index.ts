// If inputs exist on current page Get the index of the last question in the current page and push the new question after it.
// If no input on this page Get the index of the last question in previous page and push the new question after it.
// If we are on the first page, just push it.

import { RootState } from "@/redux/store/index.js"

export const getNewOrder: any = (
  global: RootState["scientistData"],
  new_question_id: string
) => {
  const pagesIds = global.pages.ids
  const order = Array.isArray(global.survey.order) ? global.survey.order : [] 

  const selectedPageId = global.pages.selectedPage
  const q = Object.entries(global.questions.entities)
  const questions = q.filter(c => 
    c[1]?.attributes?.page?.data?.id === selectedPageId
    && Boolean(c[1]?.attributes?.internal_title)
    && c[0] !== new_question_id
  )

  // If questions exists on the current page
  if (questions?.length > 0) {
    const ids = questions.map((q) => q[0])
    const last_idx = Math.max(
      ...ids.map((i) => order.findIndex((id: string) => id === i))
    )

    const new_order = [...order]
    new_order.splice(last_idx + 1, 0, new_question_id)

    return new_order
  }

  const previousPageIdx = pagesIds.findIndex((p) => p === selectedPageId) - 1
  const previousPageId = pagesIds[previousPageIdx]
  const previousQuestions = q.filter(
    (c) => c[1]?.attributes?.page?.data?.id === previousPageId
  )

  // If questions exists on the previous page
  if (previousQuestions?.length > 0) {
    const ids = previousQuestions.map((q) => q[0]);
    const last_idx = Math.max(
      ...ids.map((i) => order.findIndex((id: string) => id === i))
    )

    const new_order = order !== null ? [...order] : []
    new_order.splice(last_idx + 1, 0, new_question_id)

    return new_order
  }

  // If none of the above, then this is the first question of the survey
  return [new_question_id]
}
