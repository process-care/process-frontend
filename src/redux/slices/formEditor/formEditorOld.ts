import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
  combineReducers,
} from "@reduxjs/toolkit";

// import type { RootState } from "redux/store";
import { initialPageState, pageAdapter, pageSlice } from "./page-editor";
import {
  initialQuestionState,
  questionAdapter,
  questionsSlice,
} from "./question-editor";
import {
  initialConditionState,
  conditionAdapter,
  conditionSlice,
} from "./condition-editor";
import { initialSurveyState } from "./selected-survey";
import { RootState } from "redux/store";
import ISurvey from "types/survey";

// ----- SLICE
const SLICE_NAME = "globalSlice";
console.log(Object.entries(questionsSlice.caseReducers).map((el) => el[1]));

export const globalSlice: any = createSlice({
  name: SLICE_NAME,
  initialState: {
    pages: pageAdapter.getInitialState(initialPageState),
    questions: questionAdapter.getInitialState(initialQuestionState),
    conditions: conditionAdapter.getInitialState(initialConditionState),
    survey: initialSurveyState,
  },

  reducers: {
    initialize: (state, _action: PayloadAction<string>) => {
      state.survey.isLoading = true;
    },
    initialized: (state, action: PayloadAction<any>) => {
      state.survey.isLoading = false;
      state.survey = action.payload;
      state.survey.order = action.payload.order;
      state.survey.id = action.payload.id;
    },
    updateOrder: (state, action: PayloadAction<ISurvey["id"][]>) => {
      state.survey.isOrdering = true;
      state.survey.order = action.payload;
    },
    updatedOrder: (state, _action: PayloadAction<string>) => {
      state.survey.isOrdering = false;
    },
  },

  // ...conditionSlice.reducer,
  // ...pageSlice.reducer,
  // ...reducerTest.setSelectedPage,

  // setSelectedPage: (state, action: PayloadAction<string>) => {
  //   state.pages.selectedPage = action.payload;
  // },
});

// ---- SELECTORS

export const selectors = {};

// ---- EXPORTS

export const actions = {
  // ...questionsSlice.actions,
  // ...conditionSlice.actions,
  // ...pageSlice.actions,
  ...globalSlice.actions,
};

export default globalSlice.reducer;
