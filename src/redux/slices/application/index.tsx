import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import { actions as questionAction } from "../formEditor/question-editor";
// ---- TYPES

interface IPreview {
  previewMode: "form" | "landing" | null;
}

interface Application {
  drawerIsOpen: boolean;
  previewMode: "form" | "landing" | null;
  isSaving: boolean;
  selectedPage?: string;
  selectedQuestion?: string;
  selectedCondition?: string;
  selectedSurvey?: string;
}

// ---- STATE

const initialState: Application = {
  drawerIsOpen: false,
  previewMode: null,
  isSaving: false,
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
    setSelectedSurvey: (state, action: PayloadAction<string>) => {
      state.selectedSurvey = action.payload;
    },

    setSelectedQuestion: (state, action: PayloadAction<string>) => {
      state.selectedQuestion = action.payload;
    },
    setSelectedCondition: (state, action: PayloadAction<string>) => {
      state.selectedCondition = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(questionAction.created, (state) => {
      state.drawerIsOpen = true;
    });
  },
});

// ---- SELECTORS

const selectedSurvey = (state: RootState): string | undefined =>
  state.application.selectedSurvey;
const selectedPage = (state: RootState): string | undefined =>
  state.application.selectedPage;
const selectedCondition = (state: RootState): string | undefined =>
  state.application.selectedCondition;
const selectedQuestion = (state: RootState): string | undefined =>
  state.application.selectedQuestion;

// ---- EXPORTS

export const selectors = {
  selectedSurvey,
  selectedPage,
  selectedQuestion,
  selectedCondition,
};

export const actions = applicationSlice.actions;
export default applicationSlice.reducer;
