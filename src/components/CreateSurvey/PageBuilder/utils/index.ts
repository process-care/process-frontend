import ICondition from "interfaces/form/condition";
import IPage from "interfaces/form/page";
import { getInputById } from "utils/formBuilder/input";
import { getPageById } from "utils/formBuilder/page";

// Hide current page and page after when we make condition page.
// Hide page after current page when we make condition input

export const isInactive = (
  selectedCondition: ICondition | undefined,
  pages: IPage[],
  i: number
): boolean => {
  if (selectedCondition !== undefined) {
    if (selectedCondition?.type === "page") {
      return (
        pages.findIndex((p) => p.id === selectedCondition?.referer_id) -
        1 <
        i
      );
    } else {
      return (
        pages.findIndex(
          (p) =>
            p.id ===
            getPageById(
              getInputById(selectedCondition?.referer_id)?.page_id
            )?.id
        ) < i
      );
    }
  } else return false;
};
