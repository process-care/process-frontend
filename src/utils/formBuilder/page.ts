import IFormPage from "interfaces/form/page";
import { store } from "redux/store";

export const getPageById = (
  id: IFormPage["id"] | undefined
): IFormPage | undefined => {
  return store
    .getState()
    .formBuilder.pages.filter((p) => p.id === id)
    .shift();
};
