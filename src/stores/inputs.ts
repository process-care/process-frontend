import create from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { persist } from "zustand/middleware";
import Inputs from "interfaces/inputs";

interface FormState {
  inputs: Inputs[];
  inputOrder: [];
  id: number;
}

interface Store {
  formState: FormState;
  addInput: (slug: string, name: string, id: number) => void;
  removeAllInputs: () => void;
}

export const formStore: unknown = create<Store>(
  persist(
    (set) => ({
      formState: {
        inputs: [],
        inputOrder: [],
        id: 1,
      },
      addInput: (slug, name, id) =>
        set(
          (state): Store => ({
            formState: {
              inputs: [
                ...state.formState.inputs,
                { slug, name, uid: id, id: state.formState.id },
              ],
              inputOrder: [state.formState.inputOrder, id],
              id: state.formState.id + 1,
            },
          })
        ),
      removeAllInputs: () =>
        set({ formState: { inputs: [], inputOrder: [], id: 1 } }),
    }),
    {
      name: "form-storage",
    }
  )
);

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("formStore", formStore);
}
