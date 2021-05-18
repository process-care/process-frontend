import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "redux/store";
import Inputs from "interfaces/inputs";
import { original } from "immer";

interface FormBuilder {
  inputsCount: number;
  inputs: Inputs[];
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
    updateInput: (state, action: PayloadAction<Inputs>) => {
      const s = state.inputs.find((el) => el.id === action.payload.id);
      console.log(original(s));
      s.name = "plafd";
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
