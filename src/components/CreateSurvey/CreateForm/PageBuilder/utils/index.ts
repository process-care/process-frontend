import { ConditionRedux } from "@/redux/slices/types/index.js"
import { PageRedux } from "@/redux/slices/types/index.js"

// Hide current page and page after when we make condition page.
// Hide page after current page when we make condition input

export const isInactive = (selectedCondition: ConditionRedux | undefined, pages: PageRedux[], i: number): boolean => {
  if (selectedCondition === undefined) return false

  if (selectedCondition?.attributes?.type === "page") {
    const refererIndex = pages.findIndex((p) => p.id === selectedCondition?.attributes?.referer_page?.data?.id)
    return refererIndex - 1 < i
  } else {
    const refererIndex = pages.findIndex((p) => p.id === selectedCondition?.attributes?.referer_question?.data?.attributes?.page?.data?.id)
    return refererIndex < i
  }
}
