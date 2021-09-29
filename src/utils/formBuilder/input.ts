import ICondition from "types/form/condition";

export const checkIfMultiple = (
  currentCondition: Partial<ICondition>
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
