import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import { actions as questionAction } from "../formEditor/question-editor";
import { actions as conditionAction } from "../formEditor/condition-editor";

// ---- TYPES

interface IPreview {
  previewMode: "form" | "landing" | null;
}

interface Application {
  drawerIsOpen: boolean;
  previewMode: "form" | "landing" | null;
  isSaving: boolean;
  isEditing: boolean;
}

// ---- STATE

const initialState: Application = {
  drawerIsOpen: false,
  previewMode: null,
  isSaving: false,
  isEditing: false,
};

// ----- SLICE

const SLICE_NAME = "application";

export const applicationSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    toogleDrawer: (state) => {
      state.drawerIsOpen = !state.drawerIsOpen;
    },
    setAutoSave: (state) => {
      state.isSaving = !state.isSaving;
    },
    tooglePreview: (state, action: PayloadAction<IPreview>) => {
      const { previewMode } = action.payload;
      state.previewMode = previewMode;
    },
    setIsEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(questionAction.created, (state) => {
      state.drawerIsOpen = true;
    });
    builder.addCase(questionAction.saved, (state) => {
      state.drawerIsOpen = false;
    });
    builder.addCase(questionAction.delete, (state) => {
      state.drawerIsOpen = false;
    });
    builder.addCase(conditionAction.saved, (state) => {
      state.drawerIsOpen = true;
    });
  },
});

// ---- SELECTORS

const isEditing = (state: RootState): boolean => state.application.isEditing;

// ---- EXPORTS

export const selectors = {
  isEditing,
};

export const actions = applicationSlice.actions;
export default applicationSlice.reducer;
