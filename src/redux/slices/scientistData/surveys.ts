import { PayloadAction, createEntityAdapter } from "@reduxjs/toolkit";

import { RootState } from "redux/store";
import { DateTime } from "luxon";
import ISurvey from "types/survey";
import { GlobalState } from "../scientistData";

// ----- ENTITY ADAPTER

export const surveysAdapter = createEntityAdapter<ISurvey>({
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
  changes: Partial<ISurvey>;
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
  state.scientistData.mySurveys.error;
export const isLoading = (state: RootState): boolean =>
  state.scientistData.mySurveys.isLoading;
export const hasChanges = (state: RootState): boolean => {
  const updated = DateTime.fromISO(state.scientistData.mySurveys.lastUpdated);
  const saved = DateTime.fromISO(state.scientistData.mySurveys.lastSaved);
  return updated > saved;
};
export const getAllSurveys = (state: RootState): ISurvey[] =>
  surveysAdapter.getSelectors().selectAll(state.scientistData.mySurveys);

const getSelectedSurveyId = (state: RootState): string =>
  state.scientistData.mySurveys.selectedSurvey;

const getSelectedSurvey = (state: RootState): ISurvey | undefined =>
  surveysAdapter
    .getSelectors()
    .selectById(state.scientistData.mySurveys, getSelectedSurveyId(state));

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
    state.mySurveys.isLoading = true;
  },
  initializedSurveys: (
    state: GlobalState,
    action: PayloadAction<any>
  ): void => {
    state.mySurveys.isLoading = false;
    surveysAdapter.setMany(state.mySurveys, action.payload);
    if (action.payload[0])
      state.mySurveys.selectedSurvey = action.payload[0].id;
  },
  updateSurveys: (
    state: GlobalState,
    action: PayloadAction<UpdatePayload>
  ): void => {
    state.mySurveys.lastUpdated = new Date().toISOString();
    surveysAdapter.updateOne(state.mySurveys, action.payload);
  },
  updatedSurveys: (
    state: GlobalState,
    action: PayloadAction<UpdatedPayload>
  ): void => {
    state.mySurveys.lastUpdated = action.payload.lastUpdated;
  },
  setSelectedSurvey: (
    state: GlobalState,
    action: PayloadAction<string>
  ): void => {
    state.mySurveys.selectedSurvey = action.payload;
  },
  deleteSurvey: (state: GlobalState, action: PayloadAction<string>): void => {
    state.mySurveys.isDeleting = true;
    surveysAdapter.removeOne(state.mySurveys, action.payload);
    const lastPageId = state.mySurveys.ids.length - 1;
    state.mySurveys.selectedSurvey = state.mySurveys.ids[lastPageId].toString();
  },
  deletedSurvey: (
    state: GlobalState,
    action: PayloadAction<DeletedPayload>
  ): void => {
    state.mySurveys.isDeleting = false;
    state.mySurveys.lastDeleted = action.payload.lastDeleted;
  },
  saveSurvey: (state: GlobalState): void => {
    state.mySurveys.isSaving = true;
  },
  savedSurvey: (
    state: GlobalState,
    action: PayloadAction<SavedPayload>
  ): void => {
    state.mySurveys.isSaving = false;
    state.mySurveys.lastSaved = action.payload.lastSaved;
  },
  failedSurvey: (state: GlobalState, action: PayloadAction<string>): void => {
    state.mySurveys.isFailed = true;
    state.mySurveys.error = action.payload;
  },
  resetMySurveys: (): any =>
    surveysAdapter.getInitialState(initialSurveysState),
};
