import { DateTime } from "luxon";
import slugify from "slugify";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { RootState } from "@/redux/store/index.js";
import { LastPosted, LastSaved, SurveyRedux } from "./types/index.js"

// ---- STATE

export interface SurveyEditor {
  isLoading: boolean;
  isPosting: boolean;
  isFailed: boolean;
  error?: any[];
  lastUpdated: string;
  lastSaved: string;
  lastPosted: string;
  data: SurveyRedux;
  draft?: SurveyRedux;
  step: number;
  // Flag to know when the survey creation is a success (to react in the UI accordingly)
  isPosted: boolean
}

const initialState: SurveyEditor = {
  isLoading: true,
  isPosting: false,
  isFailed: false,
  isPosted: false,
  lastUpdated: new Date().toISOString(),
  lastSaved: new Date().toISOString(),
  lastPosted: new Date().toISOString(),
  step: 1,
  data: { id: "", attributes: { slug: "" } },
};

// ---- ACTIONS

type InitializedPayload = SurveyRedux[];

export type UpdatePayload = {
  id: string;
  changes: SurveyRedux;
};

// ----- SLICE

const SLICE_NAME = "survey-editor";

export const surveyEditorSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    initialize: (state, _action: PayloadAction<string>) => {
      state = initialState;
    },
    initialized: (state, action: PayloadAction<InitializedPayload>) => {
      state.isLoading = false;
      const survey = action.payload;
      state.data = survey[0];
    },
    update: (state, action: PayloadAction<UpdatePayload>) => {
      state.lastUpdated = new Date().toISOString();
      const updated = { ...state.data, ...action.payload.changes };
      state.data = updated;
    },
    updateMetas: (state, action: PayloadAction<UpdatePayload>) => {
      state.lastUpdated = new Date().toISOString();
      const updated = { ...state.data, ...action.payload.changes };
      state.data = updated;

      // // auto-generate slug
      if (action.payload?.changes?.attributes?.title) {
        state.data.attributes.slug = `${slugify(action.payload?.changes?.attributes?.title.toLowerCase(), {
          strict: true,
        })}`;
      }
    },
    updated: (state, action: PayloadAction<LastSaved>) => {
      state.lastSaved = action.payload.lastSaved;
    },
    post: (state, _action: PayloadAction<SurveyRedux>) => {
      state.isPosting = true;
    },
    posted: (state, action: PayloadAction<LastPosted>) => {
      state.isPosting = false;
      state.isPosted = true;
      state.isFailed = false;
      state.lastPosted = action.payload.lastPosted;
    },
    failed: (state, action: PayloadAction<any[]>) => {
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

export const error = (state: RootState): any[] | undefined => state.editor.survey.error;
export const isLoading = (state: RootState): boolean => state.editor.survey.isLoading;
export const isPosted = (state: RootState): boolean => state.editor.survey.isPosted;
export const step = (state: RootState): number => state.editor.survey.step;
export const hasChanges = (state: RootState): boolean => {
  const updated = DateTime.fromISO(state.editor.survey.lastUpdated);
  const saved = DateTime.fromISO(state.editor.survey.lastSaved);
  return updated > saved;
};

export const survey = (state: RootState): SurveyRedux | undefined => state.editor.survey.data;

export const getSurveyDraft = (state: RootState): SurveyRedux | undefined => state.editor.survey.data;

export const selectors = {
  error,
  isLoading,
  isPosted,
  hasChanges,
  survey,
  getSurveyDraft,
  step,
};

// ---- EXPORTS

export const actions = surveyEditorSlice.actions;
export default surveyEditorSlice.reducer;
