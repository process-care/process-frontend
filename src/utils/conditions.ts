import ICondition from "interfaces/form/condition";
import { store } from "redux/store";

export const getConditionById = (id: string): ICondition | undefined => {
  return store.getState().formBuilder.conditions.find((c) => c.id === id);
};

export const getConditionsByGroup = (
  group_id: number | undefined
): ICondition[] | [] => {
  if (group_id) {
    return store
      .getState()
      .formBuilder.conditions.filter((c) => c.group === group_id);
  } else return [];
};
