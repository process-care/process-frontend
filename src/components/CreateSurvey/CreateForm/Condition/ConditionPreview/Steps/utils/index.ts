import ICondition from "types/form/condition";

export const checkStepValidation = (
  step: number,
  selectedCondition: ICondition
): boolean => {
  const { target, operator, is_valid } = selectedCondition;

  if (step === 1 && !!target?.id) {
    return false;
  }
  if (step === 2 && !!operator) {
    return false;
  }
  if (step === 3 && !!is_valid) {
    return false;
  } else return true;
};
