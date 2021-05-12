import create from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { persist } from "zustand/middleware";
import Inputs from "interfaces/inputs";

interface FormState {
  inputs: Inputs[];
  count: number;
}

interface Store {
  formState: FormState;
  addInput: (input: Inputs) => void;
  removeAllInputs: () => void;
}

export const formStore = create<Store>(
  persist(
    (set) => ({
      formState: {
        inputs: [],
        count: 0,
      },
      addInput: (input) =>
        set((state): unknown => ({
          formState: {
            inputs: [
              ...state.formState.inputs,
              { ...input, position: state.formState.count },
            ],
            count: state.formState.count + 1,
          },
        })),
      removeAllInputs: () => set({ formState: { inputs: [], count: 0 } }),
    }),
    {
      name: "form-storage",
    }
  )
);

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("formStore", formStore);
}
