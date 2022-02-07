import { ConditionRedux } from "redux/slices/types";

export const checkIfMultiple = (
  currentCondition: Partial<ConditionRedux>
): boolean => {
  const multipleInput: string[] = ["checkbox", "radio", "select"];

  const type =
    currentCondition?.target?.type !== undefined
      ? currentCondition?.target?.type
      : "text_area";
  if (multipleInput.includes(type)) {
    return true;
  } else return false;
};
