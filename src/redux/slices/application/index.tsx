import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import { actions as globalActions } from "../scientistData";

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
    builder.addCase(globalActions.createdQuestion, (state) => {
      state.drawerIsOpen = true;
    });
    builder.addCase(globalActions.savedQuestion, (state) => {
      state.drawerIsOpen = false;
    });
    builder.addCase(globalActions.deleteQuestion, (state) => {
      state.drawerIsOpen = false;
    });
    builder.addCase(globalActions.savedCondition, (state, action) => {
      const { type } = action.payload.condition;
      if (type === "question") {
        state.drawerIsOpen = true;
      }
    });
    builder.addCase(globalActions.deletedCondition, (state) => {
      state.drawerIsOpen = false;
    });
  },
});

// ---- SELECTORS

const isEditing = (state: RootState): boolean => state.application.isEditing;
const drawerIsOpen = (state: RootState): boolean =>
  state.application.drawerIsOpen;

// ---- EXPORTS

export const selectors = {
  isEditing,
  drawerIsOpen,
};

export const actions = applicationSlice.actions;
export default applicationSlice.reducer;
