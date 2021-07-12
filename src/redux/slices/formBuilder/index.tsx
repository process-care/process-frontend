import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IQuestion from "interfaces/form/question";
import IPage from "interfaces/form/page";
import ICondition from "interfaces/form/condition";

export interface FormBuilder {
  selected_input: IQuestion | Record<string, any>;
  selected_page: IPage | Record<string, any>;
  selected_condition: ICondition | Record<string, any>;
  is_editing: boolean;
  is_collapse_view: boolean;
  is_removing: ICondition["id"];
}

// Define the initial state using that type
const initialState: FormBuilder = {
  selected_input: {},
  selected_page: {},
  selected_condition: {},
  is_editing: false,
  is_collapse_view: false,
  is_removing: "",
};

export const formBuilderSlice = createSlice({
  name: "formBuilder",
  initialState,
  reducers: {
    //Mock

    // mockForm: () => formMock,

    // Inputs

    selectInput: (state, action: PayloadAction<IQuestion>) => {
      state.selected_input = action.payload;
    },

    setIsEditing: (state, action: PayloadAction<boolean>) => {
      state.is_editing = action.payload;
    },
    setIsRemoving: (state, action: PayloadAction<string>) => {
      state.is_removing = action.payload;
    },

    toggleCollapseView: (state) => {
      state.is_collapse_view = !state.is_collapse_view;
    },

    // Pages

    selectPage: (state, action: PayloadAction<IPage>) => {
      state.selected_page = action.payload;
    },

    // Condition

    selectCondition: (
      state,
      action: PayloadAction<ICondition | Record<string, any>>
    ) => {
      state.selected_condition = action.payload;
    },
  },
});

export const {
  selectInput,
  setIsEditing,
  setIsRemoving,
  toggleCollapseView,
  selectPage,
  selectCondition,
} = formBuilderSlice.actions;

export default formBuilderSlice.reducer;
