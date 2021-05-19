import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "redux/store";
import Inputs from "interfaces/inputs";

interface FormBuilder {
  inputsCount: number;
  inputs: Inputs[];
}
interface UpdateInput {
  id: string | undefined;
  data: {
    [index: string]: string;
  } | null;
}

// Define the initial state using that type
const initialState: FormBuilder = {
  inputsCount: 0,
  inputs: [],
};

export const formBuilderSlice = createSlice({
  name: "formBuilder",
  initialState,
  reducers: {
    addInput: (state, action: PayloadAction<Inputs>) => {
      state.inputs.push(action.payload);
      state.inputsCount += 1;
    },
    updateInput: (state, action: PayloadAction<UpdateInput>) => {
      const { id, data } = action.payload;
      const current = state.inputs.findIndex((el) => el.id === id);
      state.inputs[current] = { ...state.inputs[current], ...data };
    },
    removeInput: (state, action: PayloadAction<Inputs>) => {
      const { id } = action.payload;
      const { inputs } = state;
      const index = inputs.findIndex((item) => id === item.id);
      inputs.splice(index, 1);
    },
    removeAllInputs: (state) => {
      state.inputs = [];
      state.inputsCount = 0;
    },
  },
});

export const { addInput, removeAllInputs, updateInput } =
  formBuilderSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectInputsCount = (state: RootState): number =>
  state.formBuilder.inputsCount;

export const selectInputs = (state: RootState): FormBuilder =>
  state.formBuilder;

export default formBuilderSlice.reducer;
