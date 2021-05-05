import create from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { persist } from "zustand/middleware";

interface IForm {
  formState: [];
  removeAllInputs: () => void;
}

export const formStore = create<IForm>(
  persist(
    (set) => ({
      formState: [],
      addInput: (id) =>
        set((state) => ({ formState: [...state.formState, { id }] })),
      removeAllInputs: () => set({ formState: [] }),
    }),
    {
      name: "form-storage",
    }
  )
);

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("formStore", formStore);
}
