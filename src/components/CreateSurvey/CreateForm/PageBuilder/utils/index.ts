import { ConditionRedux } from "redux/slices/types";
import { PageRedux } from "redux/slices/types";

// Hide current page and page after when we make condition page.
// Hide page after current page when we make condition input

export const isInactive = (selectedCondition: ConditionRedux | undefined, pages: PageRedux[], i: number): boolean => {
  if (selectedCondition?.id !== undefined) {
    if (selectedCondition?.attributes?.type === "page") {
      return pages.findIndex((p) => p.id === selectedCondition?.attributes?.referer_page?.data?.id) - 1 < i;
    } else {
      return (
        pages.findIndex(
          (p) => p.id === selectedCondition?.attributes?.referer_question?.data?.attributes?.page?.data?.id
        ) < i
      );
    }
  } else return false;
};
