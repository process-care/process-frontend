import ICondition from "interfaces/form/condition";

export const checkIfMultiple = (
  currentCondition: Partial<ICondition>
): boolean => {
  const multipleInput: string[] = ["checkbox", "radio", "select"];

  const type =
    currentCondition?.type !== undefined ? currentCondition?.type : "text_area";
  if (multipleInput.includes(type)) {
    return true;
  } else return false;
};
