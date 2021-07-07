import ICondition from "interfaces/form/condition";
import IQuestion from "interfaces/form/question";
import { store } from "redux/store";

export const getInputIndex = (id: string | undefined): number | undefined => {
  return store.getState().formBuilder.inputs.findIndex((c) => c.id === id);
};

export const getInputById = (id: string | undefined): IQuestion | undefined => {
  return store
    .getState()
    .formBuilder.inputs.filter((c) => c.id === id)
    .shift();
};

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
