import create from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { persist } from "zustand/middleware";
import Inputs from "interfaces/inputs";

interface form {
  inputs: Inputs[];
  count: number;
}

interface Store {
  form: form;
  addInput: (input: Inputs) => void;
  removeAllInputs: () => void;
}

export const formStore = create<Store>(
  persist(
    (set) => ({
      form: {
        inputs: [],
        count: 0,
      },
      addInput: (input) =>
        set((state): unknown => ({
          form: {
            inputs: [
              ...state.form.inputs,
              { ...input, position: state.form.count },
            ],
            count: state.form.count + 1,
          },
        })),
      removeAllInputs: () => set({ form: { inputs: [], count: 0 } }),
    }),
    {
      name: "form-storage",
    }
  )
);

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("formStore", formStore);
}
