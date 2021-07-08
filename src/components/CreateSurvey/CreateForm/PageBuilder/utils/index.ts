import ICondition from "interfaces/form/condition";
import IPage from "interfaces/form/page";

// Hide current page and page after when we make condition page.
// Hide page after current page when we make condition input

export const isInactive = (
  selectedCondition: Partial<ICondition>,
  pages: IPage[],
  i: number
): boolean => {
  if (selectedCondition?.id !== undefined) {
    if (selectedCondition?.type === "page") {
      return (
        pages.findIndex((p) => p.id === selectedCondition?.referer_page?.id) -
          1 <
        i
      );
    } else {
      return (
        pages.findIndex(
          (p) => p.id === selectedCondition?.referer_question?.page?.id
        ) < i
      );
    }
  } else return false;
};
