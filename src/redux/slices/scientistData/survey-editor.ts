import { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@/redux/store";
import { DateTime } from "luxon";
import { SurveyBuilder } from "../surveyBuilderOLD";
import slugify from "slugify";
import { GlobalState } from "../scientistData";
import { SurveyRedux } from "../types";
import { CheckSurveyQuery } from "@/api/graphql/sdk.generated";
// import { push } from "connected-next-router";

// ---- STATE

export interface SurveyEditor {
  // Page status
  isLoading: boolean;
  isPosting: boolean;
  isFailed: boolean;
  isChecking: boolean;
  isOrdering: boolean;
  // TODO: Improve this type (it's too much from the API)
  status?: CheckSurveyQuery;
  lastUpdated: string;
  lastSaved: string;
  lastPosted: string;
  data: SurveyRedux;
  step: number;
  selectedSurvey: string;
  order: string[];
}

export const initialSurveyState: SurveyEditor = {
  isLoading: true,
  isPosting: false,
  isFailed: false,
  isChecking: false,
  isOrdering: false,
  lastUpdated: new Date().toISOString(),
  lastSaved: new Date().toISOString(),
  lastPosted: new Date().toISOString(),
  step: 1,
  selectedSurvey: "",
  order: [],
  data: {
    id: "",
    attributes: { slug: "" },
  },
};

// ---- PAYLOADS

type UpdatePayload = Partial<SurveyBuilder["survey"]>;

type UpdatedPayload = {
  lastSaved: string;
};
type PostedPayload = {
  lastPosted: string;
};

// ---- REDUCERS

export const surveyReducers = {
  update: (state: GlobalState, action: PayloadAction<UpdatePayload>): void => {
    state.survey.lastUpdated = new Date().toISOString();
    const updated = { ...state.survey.data, ...action.payload };
    state.survey.data = updated;

    // auto-generate slug
    if (action.payload.title && state.survey.data) {
      state.survey.data.attributes.slug = `${slugify(
        action.payload.title.toLowerCase(),
        {
          strict: true,
        }
      )}`;
    }
  },
  updated: (
    state: GlobalState,
    action: PayloadAction<UpdatedPayload>
  ): void => {
    state.survey.lastSaved = action.payload.lastSaved;
  },
  post: (state: GlobalState, _action: PayloadAction<string>): void => {
    state.survey.isPosting = true;
  },
  posted: (state: GlobalState, action: PayloadAction<PostedPayload>): void => {
    state.survey.isPosting = false;
    const { lastPosted } = action.payload;
    state.survey.lastPosted = lastPosted;
    state.survey = initialSurveyState;

    setTimeout(() => {
      // push(`/dashboard`)
    }, 1);
  },
  failed: (state: GlobalState, action: PayloadAction<any>): void => {
    state.survey.isFailed = true;
    state.survey.status = action.payload;
  },
  setStep: (state: GlobalState, action: PayloadAction<number>): void => {
    state.survey.step = action.payload;
  },
};

// ---- SELECTORS

export const error = (state: RootState): any[] | undefined =>
  state.editor.survey.error;
export const isLoading = (state: RootState): boolean =>
  state.scientistData.survey.isLoading;
export const step = (state: RootState): number => state.editor.survey.step;
export const hasChanges = (state: RootState): boolean => {
  const updated = DateTime.fromISO(state.editor.survey.lastUpdated);
  const saved = DateTime.fromISO(state.editor.survey.lastSaved);
  return updated > saved;
};

export const getSelectedSurvey = (state: RootState): SurveyRedux =>
  state.scientistData.survey.data;

export const getSelectedSurveyId = (state: RootState): string =>
  state.scientistData.survey.selectedSurvey;

export const getOrder = (state: RootState): string[] =>
  state.scientistData.survey.order;

export const surveySelectors = {
  error,
  isLoading,
  hasChanges,
  getSelectedSurvey,
  getSelectedSurveyId,
  getOrder,
  step,
};