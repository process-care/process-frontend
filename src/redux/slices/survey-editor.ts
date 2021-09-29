import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// import type { RootState } from "redux/store";
import { RootState } from "redux/store";
import { DateTime } from "luxon";
import { Survey } from "./surveyBuilder";
import slugify from "slugify";
import { history } from "redux/store/history";

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
  data?: Partial<Survey["survey"]>;
  step: number;
}

const initialState: SurveyEditor = {
  isLoading: true,
  isPosting: false,
  isFailed: false,
  lastUpdated: new Date().toISOString(),
  lastSaved: new Date().toISOString(),
  lastPosted: new Date().toISOString(),
  step: 1,
  data: {
    title: "",
    description: "",
    slug: "",
    keywords: [],
    categories: [],
    language: "",
    email: "",
  },
};

// ---- ACTIONS

type LoadedPayload = Survey["survey"];

type UpdatePayload = Partial<Survey["survey"]>;

type UpdatedPayload = {
  lastSaved: string;
};
type PostedPayload = {
  lastPosted: string;
};

// ----- SLICE
const SLICE_NAME = "survey-editor";

export const surveyEditorSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    load: (state, _action: PayloadAction<string>) => {
      state.isLoading = true;
    },
    loaded: (state, action: PayloadAction<LoadedPayload>) => {
      // Switch flags
      state.isLoading = false;

      // Update survey data
      const survey = action.payload;
      state.data = survey;
    },
    update: (state, action: PayloadAction<UpdatePayload>) => {
      state.lastUpdated = new Date().toISOString();
      const updated = { ...state.data, ...action.payload };
      state.data = updated;

      // auto-generate slug
      if (action.payload.title && state.data) {
        state.data.slug = `${slugify(action.payload.title.toLowerCase(), {
          strict: true,
        })}`;
      }
    },
    updated: (state, action: PayloadAction<UpdatedPayload>) => {
      state.lastSaved = action.payload.lastSaved;
    },
    post: (state, _action: PayloadAction<string>) => {
      state.isPosting = true;
    },
    posted: (state, action: PayloadAction<PostedPayload>) => {
      // Switch flags
      state.isPosting = false;
      state.lastPosted = action.payload.lastPosted;
      // reset
      state = initialState;

      setTimeout(() => {
        history.push(`/dashboard`);
      }, 1);
    },
    failed: (state, action: PayloadAction<string>) => {
      state.isFailed = true;
      state.error = action.payload;
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    reset: () => initialState,
  },
});

// ---- SELECTORS

export const error = (state: RootState): string | undefined =>
  state.surveyEditor.error;
export const isLoading = (state: RootState): boolean =>
  state.surveyEditor.isLoading;
export const step = (state: RootState): number => state.surveyEditor.step;
export const hasChanges = (state: RootState): boolean => {
  const updated = DateTime.fromISO(state.surveyEditor.lastUpdated);
  const saved = DateTime.fromISO(state.surveyEditor.lastSaved);
  return updated > saved;
};

export const survey = (
  state: RootState
): Partial<Survey["survey"]> | undefined => state.surveyEditor.data;

export const selectors = {
  error,
  isLoading,
  hasChanges,
  survey,
  step,
};

// ---- EXPORTS

export const actions = surveyEditorSlice.actions;
export default surveyEditorSlice.reducer;
