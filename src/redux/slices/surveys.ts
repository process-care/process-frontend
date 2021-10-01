import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
} from "@reduxjs/toolkit";

// import type { RootState } from "redux/store";
import { RootState } from "redux/store";
import { DateTime } from "luxon";
import IPage from "types/form/page";
import ISurvey from "types/survey";

// ----- ENTITY ADAPTER

const surveyAdapter = createEntityAdapter<ISurvey>({
  selectId: (survey) => survey.id,
});

// ---- TYPES

export interface surveyEditor {
  // Surveys status
  selectedSurvey: string;
  isLoading: boolean;
  isFailed: boolean;
  isDeleting: boolean;
  isSaving: boolean;
  error?: string;
  lastUpdated: string;
  lastSaved: string;
  lastCreated: string;
  lastDeleted: string;
}

// ---- STATE

const initialState: surveyEditor = {
  isLoading: true,
  isFailed: false,
  isSaving: false,
  isDeleting: false,
  lastUpdated: new Date().toISOString(),
  lastSaved: new Date().toISOString(),
  lastCreated: new Date().toISOString(),
  lastDeleted: new Date().toISOString(),
  selectedSurvey: "",
};
// ----- ACTIONS

type UpdatePayload = {
  id: string;
  changes: Partial<IPage>;
};

type UpdatedPayload = {
  lastUpdated: string;
};

type DeletedPayload = {
  lastDeleted: string;
};

type SavedPayload = {
  lastSaved: string;
};

// ----- SLICE

const SLICE_NAME = "surveys";

export const surveysSlice = createSlice({
  name: SLICE_NAME,
  initialState: surveyAdapter.getInitialState(initialState),
  reducers: {
    initialize: (state, _action: PayloadAction<string>) => {
      state.isLoading = true;
    },
    initialized: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      surveyAdapter.setMany(state, action.payload);
      if (action.payload[0]) state.selectedSurvey = action.payload[0].id;
    },
    update: (state, action: PayloadAction<UpdatePayload>) => {
      state.lastUpdated = new Date().toISOString();
      surveyAdapter.updateOne(state, action.payload);
    },
    updated: (state, action: PayloadAction<UpdatedPayload>) => {
      state.lastUpdated = action.payload.lastUpdated;
    },
    delete: (state, action: PayloadAction<any>) => {
      state.isDeleting = true;
      surveyAdapter.removeOne(state, action.payload);
      const lastPageId = state.ids.length - 1;
      state.selectedSurvey = state.ids[lastPageId].toString();
    },
    deleted: (state, action: PayloadAction<DeletedPayload>) => {
      state.isDeleting = false;
      state.lastDeleted = action.payload.lastDeleted;
    },
    save: (state) => {
      state.isSaving = true;
    },
    saved: (state, action: PayloadAction<SavedPayload>) => {
      state.isSaving = false;
      state.lastSaved = action.payload.lastSaved;
    },
    failed: (state, action: PayloadAction<string>) => {
      state.isFailed = true;
      state.error = action.payload;
    },
    setselectedSurvey: (state, action: PayloadAction<string>) => {
      state.selectedSurvey = action.payload;
    },
    reset: () => surveyAdapter.getInitialState(initialState),
  },
});

// ---- SELECTORS

export const error = (state: RootState): string | undefined =>
  state.surveys.error;
export const isLoading = (state: RootState): boolean => state.surveys.isLoading;
export const hasChanges = (state: RootState): boolean => {
  const updated = DateTime.fromISO(state.surveys.lastUpdated);
  const saved = DateTime.fromISO(state.surveys.lastSaved);
  return updated > saved;
};
export const getAllSurveys = (state: RootState): ISurvey[] =>
  surveyAdapter.getSelectors().selectAll(state.surveys);

const getselectedSurveyId = (state: RootState): string =>
  state.surveys.selectedSurvey;

const getselectedSurvey = (state: RootState): ISurvey | undefined =>
  surveyAdapter
    .getSelectors()
    .selectById(state.surveys, getselectedSurveyId(state));

// ---- EXPORTS

export const selectors = {
  error,
  isLoading,
  hasChanges,
  getAllSurveys,
  getselectedSurvey,
  getselectedSurveyId,
};

export const actions = surveysSlice.actions;
export default surveysSlice.reducer;
