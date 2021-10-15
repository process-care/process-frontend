import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
  combineReducers,
} from "@reduxjs/toolkit";

// import type { RootState } from "redux/store";
import {
  initialPageState,
  pageAdapter,
  pageReducers,
  pageSlice,
  selectorsPage,
} from "./page-editor";

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

// ----- SLICE
const SLICE_NAME = "globalSlice";

export const globalSlice: any = createSlice({
  name: SLICE_NAME,
  initialState: {
    pages: pageAdapter.getInitialState(initialPageState),
    questions: questionAdapter.getInitialState(initialQuestionState),
    conditions: conditionAdapter.getInitialState(initialConditionState),
    survey: initialSurveyState,
  },

  reducers: {
    ...pageReducers,
  },

  // ...conditionSlice.reducer,
  // ...pageSlice.reducer,
  // ...reducerTest.setSelectedPage,
});

// ---- SELECTORS

export const selectors = { ...selectorsPage };

// ---- EXPORTS

export const actions = globalSlice.actions;
export default globalSlice.reducer;
