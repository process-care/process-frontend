import ICondition from "interfaces/form/condition";
import { getInputById } from "utils/formBuilder/input";

export const checkStepValidation = (
  selected_condition: ICondition | undefined
): boolean => {
  const target_question = getInputById(selected_condition?.target_id)

  if (
    selected_condition?.step === 1 &&
    !!target_question
  ) {
    return false;
  }
  if (selected_condition?.step === 2 && !!selected_condition?.operator) {
    return false;
  }
  if (selected_condition?.step === 3 && !!selected_condition?.is_valid) {
    return false;
  } else return true;
};
