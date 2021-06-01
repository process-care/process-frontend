import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "redux/store";
import IInput from "interfaces/form/input";
import IFormPage from "interfaces/form/page";

import { v4 as uuidv4 } from "uuid";
import ICondition from "interfaces/form/condition";

interface FormBuilder {
  inputs: IInput[];
  selected_input: IInput;
  pages: IFormPage[];
  selected_page: IFormPage;
  conditions: ICondition[];
  selected_condition: ICondition | [];
  is_editing: boolean;
  is_collapse_view: boolean;
}
interface Update {
  id: string | undefined;
  data: {
    [index: string]: string | undefined;
  } | null;
}

const initialFirstPage = {
  name: "Page 1",
  id: `page-${uuidv4()}`,
  is_locked: false,
  condition: [],
  short_name: "P1",
};

// Define the initial state using that type
const initialState: FormBuilder = {
  inputs: [],
  selected_input: {
    id: "",
    input_type: "text-area",
    internal_title: "",
    name: "",
    page_id: "",
  },
  pages: [initialFirstPage],
  selected_page: initialFirstPage,
  conditions: [],
  selected_condition: [],
  is_editing: false,
  is_collapse_view: false,
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
    // Condition
    addCondition: (state, action: PayloadAction<ICondition>) => {
      // add condition & select it & and add it to selected page.
      const { referer_entity_id } = action.payload;
      const { conditions, pages } = state;
      const index = pages.findIndex((item) => referer_entity_id === item.id);
      conditions.push(action.payload);
      state.selected_condition = action.payload;
      pages[index].condition.push(action.payload);
    },
    selectCondition: (state, action: PayloadAction<ICondition>) => {
      state.selected_condition = action.payload;
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
  addCondition,
  selectCondition,
} = formBuilderSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export const selectInputsInCurrentPage = (state: RootState): IInput[] =>
  state.formBuilder.inputs.filter(
    (input) => input.page_id === state.formBuilder.selected_page.id
  );

export const selectConditonInCurrentPage = (state: RootState): ICondition[] =>
  state.formBuilder.conditions.filter(
    (condition) =>
      condition.referer_entity_id === state.formBuilder.selected_page.id
  );

export default formBuilderSlice.reducer;
