import ICondition from "interfaces/form/condition";
import IInput from "interfaces/form/input";
import { store } from "redux/store";

export const getInputIndex = (id: string | undefined): number | undefined => {
  return store.getState().formBuilder.inputs.findIndex((c) => c.id === id);
};

export const getInputById = (id: string | undefined): IInput | undefined => {
  return store
    .getState()
    .formBuilder.inputs.filter((c) => c.id === id)
    .shift();
};

export const checkIfMultiple = (selectedCondition: ICondition): boolean => {
  const multipleInput: string[] = ["checkbox", "radio", "select"];
  const input_type =
    selectedCondition?.selected_question?.input_type !== undefined
      ? selectedCondition?.selected_question?.input_type
      : "text-area";
  if (multipleInput.includes(input_type)) {
    return true;
  } else return false;
};
