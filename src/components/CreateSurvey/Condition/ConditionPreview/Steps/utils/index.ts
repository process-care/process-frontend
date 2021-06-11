import ICondition from "interfaces/form/condition";

export const checkStepValidation = (
  selected_condition: ICondition | undefined
): boolean => {
  if (
    selected_condition?.step === 1 &&
    !!selected_condition?.selected_question
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
