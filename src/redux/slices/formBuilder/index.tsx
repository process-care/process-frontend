import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

export interface FormBuilder {
  isEditing: boolean;
  isCollapseView: boolean;
  entityToRemove: string;
  conditionStatus: string | null;
}

// Define the initial state using that type
const initialState: FormBuilder = {
  isEditing: false,
  isCollapseView: false,
  entityToRemove: "",
  conditionStatus: null,
};

export const formBuilderSlice = createSlice({
  name: "formBuilder",
  initialState,
  reducers: {
    setConditionStatus: (state, action: PayloadAction<string>) => {
      state.conditionStatus = action.payload;
    },

    setIsEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },
    setIsRemoving: (state, action: PayloadAction<string>) => {
      state.entityToRemove = action.payload;
    },

    toggleCollapseView: (state) => {
      state.isCollapseView = !state.isCollapseView;
    },
  },
});

// ---- SELECTORS

export const isCollapseView = (state: RootState): boolean =>
  state.editor.form.isCollapseView;
export const isEditing = (state: RootState): boolean =>
  state.editor.form.isEditing;

export const selectors = {
  isCollapseView,
  isEditing,
};

export const { setIsRemoving, toggleCollapseView, setConditionStatus } =
  formBuilderSlice.actions;

export const actions = formBuilderSlice.actions;

export default formBuilderSlice.reducer;
