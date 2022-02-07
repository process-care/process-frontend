import { ConditionRedux } from "redux/slices/types";

export const checkIfMultiple = (currentCondition: ConditionRedux): boolean => {
  const multipleInput: string[] = ["checkbox", "radio", "select"];

  const attributes = currentCondition?.attributes?.target?.data?.attributes;
  const type = attributes?.type !== undefined ? attributes.type : "text_area";
  if (type && multipleInput.includes(type)) {
    return true;
  } else return false;
};
