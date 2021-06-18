import IPage from "interfaces/form/page";
import { store } from "redux/store";

export const getPageById = (
  id: IPage["id"] | undefined
): IPage | undefined => {
  return store
    .getState()
    .formBuilder.pages.filter((p) => p.id === id)
    .shift();
};
