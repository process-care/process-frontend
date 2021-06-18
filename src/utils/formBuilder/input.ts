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

export const checkIfMultiple = (selectedCondition: ICondition): boolean => {
  const multipleInput: string[] = ["checkbox", "radio", "select"];
  const target_question = getInputById(selectedCondition.target_id)

  const input_type =
    target_question?.input_type !== undefined
      ? target_question?.input_type
      : "text-area";
  if (multipleInput.includes(input_type)) {
    return true;
  } else return false;
};