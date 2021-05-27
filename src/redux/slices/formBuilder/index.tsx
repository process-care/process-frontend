import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "redux/store";
import IInput from "interfaces/form/input";
import IFormPage from "interfaces/form/page";

interface FormBuilder {
  inputs: IInput[];
  selected_input: IInput;
  is_editing: boolean;
  is_collapse_view: boolean;
  pages: IFormPage[];
  selected_page: IFormPage;
}
interface Update {
  id: string | undefined;
  data: {
    [index: string]: string | undefined;
  } | null;
}

// Define the initial state using that type
const initialState: FormBuilder = {
  inputs: [],
  selected_input: {
    id: "",
    input_type: "",
    internal_title: "",
    name: "",
  },
  is_editing: false,
  is_collapse_view: false,
  pages: [],
  selected_page: {
    name: "",
    id: "",
    is_locked: false,
    had_condition: false,
  },
};

export const formBuilderSlice = createSlice({
  name: "formBuilder",
  initialState,
  reducers: {
    // Inputs
    addInput: (state, action: PayloadAction<IInput>) => {
      state.inputs.push(action.payload);
    },
    selectInput: (state, action: PayloadAction<IInput>) => {
      state.selected_input = action.payload;
    },
    setIsEditing: (state, action: PayloadAction<boolean>) => {
      state.is_editing = action.payload;
    },
    updateInput: (state, action: PayloadAction<Update>) => {
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
    removeInput: (state, action: PayloadAction<IInput>) => {
      const { id } = action.payload;
      const { inputs } = state;
      const index = inputs.findIndex((item) => id === item.id);
      inputs.splice(index, 1);
    },
    removeAllInputs: (state) => {
      state.inputs = [];
    },
    toggleCollapseView: (state) => {
      state.is_collapse_view = !state.is_collapse_view;
    },
    // PageForm
    addPage: (state, action: PayloadAction<IFormPage>) => {
      state.pages.push(action.payload);
    },
    selectPage: (state, action: PayloadAction<IFormPage>) => {
      state.selected_page = action.payload;
    },

    updatePage: (state, action: PayloadAction<Update>) => {
      const { id, data } = action.payload;
      if (data) {
        const current = state.pages.findIndex((el) => el.id === id);
        state.pages[current] = { ...state.pages[current], ...data };
        state.selected_page = { ...state.selected_page, ...data };
      }
    },
    removePage: (state, action: PayloadAction<IFormPage>) => {
      const { id } = action.payload;
      const { pages } = state;
      const index = pages.findIndex((item) => id === item.id);
      pages.splice(index, 1);
      // reset select page
      state.selected_page = initialState.selected_page;
    },
  },
});

export const {
  addInput,
  removeAllInputs,
  removeInput,
  updateInput,
  selectInput,
  setIsEditing,
  toggleCollapseView,
  addPage,
  removePage,
  selectPage,
  updatePage,
} = formBuilderSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export const selectInputs = (state: RootState): FormBuilder =>
  state.formBuilder;

export default formBuilderSlice.reducer;
