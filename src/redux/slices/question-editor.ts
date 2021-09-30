import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// import type { RootState } from "redux/store";
import { RootState } from "redux/store";
import { DateTime } from "luxon";
import IQuestion from "types/form/question";

// ---- STATE

export interface SurveyEditor {
  // Page status
  isLoading: boolean;
  isPosting: boolean;
  isFailed: boolean;
  error?: string;
  lastUpdated: string;
  lastSaved: string;
  lastPosted: string;
  data?: Partial<IQuestion>;
}

const initialState: SurveyEditor = {
  isLoading: true,
  isPosting: false,
  isFailed: false,
  lastUpdated: new Date().toISOString(),
  lastSaved: new Date().toISOString(),
  lastPosted: new Date().toISOString(),
};
// ----- ACTIONS

type UpdatePayload = Partial<IQuestion>;

// ----- SLICE
const SLICE_NAME = "question-editor";

export const questionsSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    load: (state, _action: PayloadAction<string>) => {
      state.isLoading = true;
    },
    loaded: (state, action: PayloadAction<IQuestion>) => {
      state.isLoading = false;
      const question = action.payload;
      state.data = question;
    },
    update: (state, action: PayloadAction<UpdatePayload>) => {
      state.lastUpdated = new Date().toISOString();
      const updated = { ...state.data, ...action.payload };
      state.data = updated;
    },
    updated: (state, action: PayloadAction<any>) => {
      state.lastSaved = action.payload.lastSaved;
    },
    post: (state, _action: PayloadAction<string>) => {
      state.isPosting = true;
    },
    posted: (state, action: PayloadAction<any>) => {
      state.isPosting = false;
      state.lastPosted = action.payload.lastPosted;
    },
    failed: (state, action: PayloadAction<string>) => {
      state.isFailed = true;
      state.error = action.payload;
    },
    reset: () => initialState,
  },
});

// ---- SELECTORS

export const error = (state: RootState): string | undefined =>
  state.formEditor.questions.error;
export const isLoading = (state: RootState): boolean =>
  state.formEditor.questions.isLoading;
export const hasChanges = (state: RootState): boolean => {
  const updated = DateTime.fromISO(state.formEditor.questions.lastUpdated);
  const saved = DateTime.fromISO(state.formEditor.questions.lastSaved);
  return updated > saved;
};

export const question = (state: RootState): Partial<IQuestion> | undefined =>
  state.formEditor.questions.data;

export const selectors = {
  error,
  isLoading,
  hasChanges,
  question,
};

// ---- EXPORTS

export const actions = questionsSlice.actions;
export default questionsSlice.reducer;
