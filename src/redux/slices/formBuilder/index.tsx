import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "redux/store";
import Inputs from "interfaces/inputs";

interface FormBuilder {
  inputs_count: number;
  inputs: Inputs[];
  selected_input: Inputs;
}
interface UpdateInput {
  id: string | undefined;
  data: {
    [index: string]: string | undefined;
  } | null;
}

// Define the initial state using that type
const initialState: FormBuilder = {
  inputs_count: 0,
  inputs: [],
  selected_input: {
    id: "",
    type: "",
    name: "",
    internal_title: "",
  },
};

export const formBuilderSlice = createSlice({
  name: "formBuilder",
  initialState,
  reducers: {
    addInput: (state, action: PayloadAction<Inputs>) => {
      state.inputs.push(action.payload);
      state.inputs_count += 1;
    },
    selectInput: (state, action: PayloadAction<Inputs>) => {
      state.selected_input = action.payload;
    },
    updateInput: (state, action: PayloadAction<UpdateInput>) => {
      const { id, data } = action.payload;
      if (data) {
        for (const [key] of Object.entries(data)) {
          const current = state.inputs.findIndex((el) => el.id === id);

          if (key.includes("option")) {
            state.inputs[current] = {
              ...state.inputs[current],
              options: { ...state.inputs[current].options, ...data },
            };
            return;
          }
          state.inputs[current] = { ...state.inputs[current], ...data };
        }
      }
    },
    removeInput: (state, action: PayloadAction<Inputs>) => {
      const { id } = action.payload;
      const { inputs } = state;
      const index = inputs.findIndex((item) => id === item.id);
      inputs.splice(index, 1);
    },
    removeAllInputs: (state) => {
      state.inputs = [];
      state.inputs_count = 0;
    },
  },
});

export const {
  addInput,
  removeAllInputs,
  removeInput,
  updateInput,
  selectInput,
} = formBuilderSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectinputs_count = (state: RootState): number =>
  state.formBuilder.inputs_count;

export const selectInputs = (state: RootState): FormBuilder =>
  state.formBuilder;

export default formBuilderSlice.reducer;
