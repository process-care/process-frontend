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
      .formBuilder.conditions.filter((c) => c.group.name === group_id);
  } else return [];
};

export const getConditionsByRefererId = (
  referer_entity_id: string | undefined
): ICondition[] | [] => {
  if (referer_entity_id) {
    return store
      .getState()
      .formBuilder.conditions.filter((c) => c.referer_id === referer_entity_id);
  } else return [];
};

export const hadValidCondition = (
  referer_entity_id: string | undefined
): ICondition[] | [] => {
  if (referer_entity_id) {
    return store
      .getState()
      .formBuilder.conditions.filter((c) => c.referer_id === referer_entity_id)
      .filter((c) => c.is_valid);
  } else return [];
};
