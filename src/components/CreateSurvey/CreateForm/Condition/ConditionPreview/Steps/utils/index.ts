import { useAppSelector } from "redux/hooks";
import { selectors } from "redux/slices/formEditor/condition-editor";

export const checkStepValidation = (): boolean => {
  const isValid = useAppSelector(selectors.getValidity);
  const step = useAppSelector(selectors.getStep);
  const selectedCondition = useAppSelector(selectors.getSelectedCondition);

  const target = selectedCondition?.target;
  const operator = selectedCondition?.operator;

  if (step === 1 && !!target?.id) {
    return false;
  }
  if (step === 2 && !!operator) {
    return false;
  }
  if (step === 3 && isValid) {
    return false;
  } else return true;
};
