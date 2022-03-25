import { QuestionRedux } from "redux/slices/types";

export const checkIfMultiple = (target: QuestionRedux): boolean => {
  const multipleInput: string[] = ["checkbox", "radio", "select"];

  const attributes = target.attributes;
  const type = attributes?.type !== undefined ? attributes.type : "text_area";
  if (type && multipleInput.includes(type)) {
    return true;
  } else return false;
};
