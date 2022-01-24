import { PayloadAction, createEntityAdapter } from "@reduxjs/toolkit";

import { RootState } from "redux/store";
import { DateTime } from "luxon";
import { GlobalState } from "../scientistData";
import { Survey } from "types/survey";

// ----- ENTITY ADAPTER

export const surveysAdapter = createEntityAdapter<Survey>({
  selectId: (survey) => survey.id,
});

// ---- TYPES

export interface SurveysEditor {
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

export const initialSurveysState: SurveysEditor = {
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
  changes: Partial<Survey>;
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

// ---- SELECTORS

export const error = (state: RootState): string | undefined =>
  state.scientistData.surveys.error;

export const isLoading = (state: RootState): boolean =>
  state.scientistData.surveys.isLoading;

export const hasChanges = (state: RootState): boolean => {
  const updated = DateTime.fromISO(state.scientistData.surveys.lastUpdated);
  const saved = DateTime.fromISO(state.scientistData.surveys.lastSaved);
  return updated > saved;
};

export const getAllSurveys = (state: RootState): Survey[] =>
  surveysAdapter.getSelectors().selectAll(state.scientistData.surveys);

const getSelectedSurveyId = (state: RootState): string =>
  state.scientistData.surveys.selectedSurvey;

const getSelectedSurvey = (state: RootState): Survey | undefined =>
  surveysAdapter
    .getSelectors()
    .selectById(state.scientistData.surveys, getSelectedSurveyId(state));

// ---- EXPORTS

export const surveysSelectors = {
  error,
  isLoading,
  hasChanges,
  getAllSurveys,
  getSelectedSurvey,
  getSelectedSurveyId,
};

// ---- REDUCERS

export const surveysReducers = {
  initializeSurveys: (
    state: GlobalState,
    _action: PayloadAction<string>
  ): void => {
    state.surveys.isLoading = true;
  },
  initializedSurveys: (
    state: GlobalState,
    action: PayloadAction<any>
  ): void => {
    state.surveys.isLoading = false;
    surveysAdapter.setMany(state.surveys, action.payload);
    if (action.payload[0]) state.surveys.selectedSurvey = action.payload[0].id;
  },
  updateSurveys: (
    state: GlobalState,
    action: PayloadAction<UpdatePayload>
  ): void => {
    state.surveys.lastUpdated = new Date().toISOString();
    surveysAdapter.updateOne(state.surveys, action.payload);
  },
  updatedSurveys: (
    state: GlobalState,
    action: PayloadAction<UpdatedPayload>
  ): void => {
    state.surveys.lastUpdated = action.payload.lastUpdated;
  },
  setSelectedSurvey: (
    state: GlobalState,
    action: PayloadAction<string>
  ): void => {
    state.surveys.selectedSurvey = action.payload;
  },
  deleteSurvey: (state: GlobalState, action: PayloadAction<string>): void => {
    state.surveys.isDeleting = true;
    surveysAdapter.removeOne(state.surveys, action.payload);
    const lastPageId = state.surveys.ids.length - 1;
    state.surveys.selectedSurvey = state.surveys.ids[lastPageId].toString();
  },
  deletedSurvey: (
    state: GlobalState,
    action: PayloadAction<DeletedPayload>
  ): void => {
    state.surveys.isDeleting = false;
    state.surveys.lastDeleted = action.payload.lastDeleted;
  },
  saveSurvey: (state: GlobalState): void => {
    state.surveys.isSaving = true;
  },
  savedSurvey: (
    state: GlobalState,
    action: PayloadAction<SavedPayload>
  ): void => {
    state.surveys.isSaving = false;
    state.surveys.lastSaved = action.payload.lastSaved;
  },
  failedSurvey: (state: GlobalState, action: PayloadAction<string>): void => {
    state.surveys.isFailed = true;
    state.surveys.error = action.payload;
  },
  resetMySurveys: (): any =>
    surveysAdapter.getInitialState(initialSurveysState),
};
