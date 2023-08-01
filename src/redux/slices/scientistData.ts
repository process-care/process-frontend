import { createSlice, EntityState, PayloadAction } from "@reduxjs/toolkit";

import { authReducers, authSelectors, AuthState, initialAuthState } from "./scientistData/auth";
import {
  conditionAdapter,
  ConditionEditor,
  conditionsReducers,
  conditionsSelectors,
  initialConditionState,
} from "./scientistData/condition-editor";
import {
  initialSurveysState,
  surveysAdapter,
  SurveysEditor,
  surveysReducers,
  surveysSelectors,
} from "./scientistData/surveys";

import { pageAdapter, PageEditor, pageReducer, pageSelectors, initialPageState } from "./scientistData/page-editor";
import {
  initialQuestionState,
  questionAdapter,
  QuestionEditor,
  questionsReducers,
  questionsSelectors,
} from "./scientistData/question-editor";
import { initialSurveyState, SurveyEditor, surveyReducers, surveySelectors } from "./scientistData/survey-editor";

import { LastUpdated, ConditionRedux, PageRedux, QuestionRedux, SurveyRedux } from "./types";
import { sanitizeEntities } from "@/api/entity-checker";
import { CheckSurveyQuery } from "@/api/graphql/sdk.generated";

// ---- TYPES

export interface GlobalState {
  pages: EntityState<PageRedux> & PageEditor;
  questions: EntityState<QuestionRedux> & QuestionEditor;
  conditions: EntityState<ConditionRedux> & ConditionEditor;
  survey: SurveyEditor;
  auth: AuthState;
  surveys: EntityState<SurveyRedux> & SurveysEditor;
}

export interface InitializedSurveyPayload {
  survey: SurveyRedux;
  questions: QuestionRedux[];
  pages: PageRedux[];
}

// ----- SLICE

const SLICE_NAME = "scientistData";

export const globalSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    pages: pageAdapter.getInitialState(initialPageState),
    questions: questionAdapter.getInitialState(initialQuestionState),
    conditions: conditionAdapter.getInitialState(initialConditionState),
    survey: initialSurveyState,
    auth: initialAuthState,
    surveys: surveysAdapter.getInitialState(initialSurveysState),
  },
  reducers: {
    ...pageReducer,
    ...surveyReducers,
    ...questionsReducers,
    ...conditionsReducers,
    ...authReducers,
    ...surveysReducers,

    initializeSurvey: (state: GlobalState, _action: PayloadAction<string>): void => {
      state.survey.isLoading = true;
      state.questions.isLoading = true;
      state.pages.isLoading = true;
      state.conditions.isLoading = true;
    },
    initializedSurvey: (state: GlobalState, action: PayloadAction<InitializedSurveyPayload>): void => {
      const { survey, questions, pages } = action.payload;

      // Set survey
      state.survey.data = survey;
      state.survey.selectedSurvey = survey.id;
      state.survey.order = survey.attributes.order;

      // const pages = survey.attributes.pages?.data;

      // Set pages
      if (pages) {
        const sanePages = sanitizeEntities(pages);
        pageAdapter.setAll(state.pages, sanePages);
        // Select first page
        state.pages.selectedPage = sanePages[0].id;
        // Set conditions's pages
        sanePages.map((p) => {
          const pageConditions = p.attributes.conditions?.data;

          if (pageConditions) {
            const sanePageConditions = sanitizeEntities(pageConditions);
            conditionAdapter.setMany(state.conditions, sanePageConditions);
          }
        });
      }

      if (questions) {
        const saneQuestions = sanitizeEntities(questions);
        questionAdapter.setAll(state.questions, saneQuestions);
        saneQuestions.map((q) => {
          const questionConditions = q.attributes.conditions?.data;
          if (questionConditions) {
            const saneQuestionConditions = sanitizeEntities(questionConditions);
            conditionAdapter.setMany(state.conditions, saneQuestionConditions);
          }
        });
      }

      // Update the various loading flags
      state.survey.isLoading = false;
      state.pages.isLoading = false;
      state.questions.isLoading = false;
      state.conditions.isLoading = false;
    },
    updateSurvey: (state: GlobalState, action: PayloadAction<any>) => {
      surveysAdapter.updateOne(state.surveys, action.payload);
    },
    updatedSurvey: (state: GlobalState, action: PayloadAction<LastUpdated>) => {
      state.surveys.lastUpdated = action.payload.lastUpdated;
    },
    updateOrder: (state: GlobalState, action: PayloadAction<string[]>) => {
      state.survey.isOrdering = true;
      state.survey.order = action.payload;
    },
    updatedOrder: (state: GlobalState, _action: PayloadAction<{ msg?: string }>) => {
      state.survey.isOrdering = false;
    },
    checkSurvey: (state: GlobalState, action: PayloadAction<boolean>) => {
      state.survey.isChecking = action.payload;
    },
    // TODO: Improve the `CheckSurveyQuery` type (it's too much from the API)
    checkedSurvey: (state: GlobalState, action: PayloadAction<CheckSurveyQuery>) => {
      state.survey.status = action.payload;
      state.survey.isChecking = false;
    },
    // TODO:ERROR: Improve error handling
    error: (_state: GlobalState, _action: PayloadAction<any>) => {
      console.error("An error occured while loading a survey");
    },
  },
});

export const selectors = {
  pages: pageSelectors,
  survey: surveySelectors,
  questions: questionsSelectors,
  conditions: conditionsSelectors,
  mySurveys: surveysSelectors,
  auth: authSelectors,
};

export const actions = globalSlice.actions;
export default globalSlice.reducer;
