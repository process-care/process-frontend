import { configureStore, getDefaultMiddleware, AnyAction, combineReducers } from "@reduxjs/toolkit";
import { Epic as ReduxEpic, combineEpics, createEpicMiddleware } from "redux-observable";

import formBuilder from "redux/slices/formBuilder";
import application from "redux/slices/application";
import landingBuilder from "redux/slices/landingBuilder";
import participation from "redux/slices/participation";
import surveyBuilder from "redux/slices/surveyBuilder";

import { pingEpic } from "redux/slices/participation/epic";

// ---- EPICS

// Generic type of an epic
export type Epic = ReduxEpic<AnyAction, AnyAction, RootState, unknown>;

// Combine all epics from all the app
export const rootEpic = combineEpics(
  pingEpic
);

// Create a middleware to set in the store
const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, RootState, unknown>();

// ---- REDUCERS

const combinedReducer = combineReducers({
  formBuilder,
  landingBuilder,
  surveyBuilder,
  application,
  participation,
});

// ---- STORE

export const store = configureStore({
  reducer: combinedReducer,
  middleware: [...getDefaultMiddleware(), epicMiddleware]
});

// Run all the epics
epicMiddleware.run(rootEpic);

// ---- TYPES

// Infer `RootState` from the combined reducers. We CANNOT infer it from the store, since RootState is needed in the epic middleware
// and the epic middleware is needed in the store. We would have a circular reference: "store -> RootState -> epic middleware -> store" 
export type RootState = ReturnType<typeof combinedReducer>;
// Infer `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch;
