import create from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { persist } from "zustand/middleware";
import Inputs from "interfaces/inputs";

interface FormState {
  inputs: Inputs[];
  id: number;
}

interface Store {
  formState: FormState;
  addInput: ({ type, name, id }) => void;
  removeAllInputs: () => void;
}

export const formStore = create<Store>(
  persist(
    (set) => ({
      formState: {
        inputs: [],
        id: 1,
      },
      addInput: (type, name, id) =>
        set((state): unknown => ({
          formState: {
            inputs: [
              ...state.formState.inputs,
              { type, name, uid: id, id: state.formState.id },
            ],
            id: state.formState.id + 1,
          },
        })),
      removeAllInputs: () => set({ formState: { inputs: [], id: 1 } }),
    }),
    {
      name: "form-storage",
    }
  )
);

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("formStore", formStore);
}
