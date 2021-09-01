import ICondition from "types/form/condition";

export const checkStepValidation = (
  current_condition: ICondition | undefined
): boolean => {
  if (current_condition) {
    const { step, target, operator, is_valid } = current_condition;

    if (step === 1 && !!target?.id) {
      return false;
    }
    if (step === 2 && !!operator) {
      return false;
    }
    if (step === 3 && !!is_valid) {
      return false;
    } else return true;
  } else return true;
};
