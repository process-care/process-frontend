import { useAppSelector } from "@/redux/hooks/index.js"
import { selectors } from "@/redux/slices/scientistData.js"

export const useCheckStepValidation = (): boolean => {
  const isValid = useAppSelector(selectors.conditions.getValidity);
  const step = useAppSelector(selectors.conditions.getStep);
  const selectedCondition = useAppSelector(
    selectors.conditions.selectSelectedCondition
  );

  const target = selectedCondition?.attributes?.target;
  const operator = selectedCondition?.attributes?.operator;

  if (step === 1 && !!target?.data?.id) {
    return false;
  }
  if (step === 2 && !!operator) {
    return false;
  }
  if (step === 3 && isValid) {
    return false;
  } else return true;
};
