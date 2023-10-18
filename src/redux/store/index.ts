import {
  configureStore,
  AnyAction,
  combineReducers,
} from "@reduxjs/toolkit";
import {
  Epic as ReduxEpic,
  combineEpics,
  createEpicMiddleware,
} from "redux-observable";

import formBuilder from "@/redux/slices/formBuilder/index.js"
import application from "@/redux/slices/application/index.js"
import participation from "@/redux/slices/participation/index.js"
import landingEditor from "@/redux/slices/landing-editor.js"
import surveyEditor from "@/redux/slices/survey-editor.js"
import scientistData from "@/redux/slices/scientistData.js"

import { landingEditorEpics } from "@/redux/epics/landing/landing-editor.js";
import { surveyEditorEpics } from "@/redux/epics/survey-editor.js"
import { surveysEpics } from "@/redux/epics/my-surveys.js"
import { surveyEpics } from "@/redux/epics/global/survey.js"
import { conditionsEditorEpics } from "@/redux/epics/global/condition-editor.js"
import { authEpics } from "@/redux/epics/global/auth.js"
import { pageEditorEpic } from "@/redux/epics/global/page-editor.js"
import { questionEditorEpic } from "@/redux/epics/global/question-editor.js"
import participationEpics from "@/redux/epics/participation/index.js"

// ---- EPICS

// Generic type of an epic
export type Epic = ReduxEpic<AnyAction, AnyAction, RootState, unknown>;

// Combine all epics from all the app
export const rootEpic = combineEpics<AnyAction,AnyAction,RootState,unknown>(
  landingEditorEpics,
  surveyEditorEpics,
  participationEpics,
  pageEditorEpic,
  questionEditorEpic,
  surveysEpics,
  surveyEpics,
  conditionsEditorEpics,
  authEpics
);

// Create a middleware to set in the store
const epicMiddleware = createEpicMiddleware<
  AnyAction,
  AnyAction,
  RootState,
  unknown
>();

// ---- REDUCERS

const editor = combineReducers({
  form: formBuilder,
  landing: landingEditor,
  survey: surveyEditor,
});

const combinedReducer = combineReducers({
  application,
  scientistData,
  editor,
  participation,
});

// ---- STORE

export const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(epicMiddleware)
});

// Run all the epics
epicMiddleware.run(rootEpic);

// ---- TYPES

// Infer `RootState` from the combined reducers. We CANNOT infer it from the store, since RootState is needed in the epic middleware
// and the epic middleware is needed in the store. We would have a circular reference: "store -> RootState -> epic middleware -> store"
export type RootState = ReturnType<typeof combinedReducer>;
// Infer `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch;
