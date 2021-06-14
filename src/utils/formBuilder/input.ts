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
