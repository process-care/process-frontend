import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import formBuilder from "redux/slices/formBuilder";
import application from "redux/slices/application";
import landingBuilder from "redux/slices/landingBuilder";
import aboutBuilder from "redux/slices/aboutBuilder";

import { surveyApi } from "api/survey";
import { questionsApi } from "api/questions";

export const store = configureStore({
  reducer: {
    [surveyApi.reducerPath]: surveyApi.reducer,
    [questionsApi.reducerPath]: questionsApi.reducer,
    formBuilder,
    landingBuilder,
    aboutBuilder,
    application,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      surveyApi.middleware,
      questionsApi.middleware
    ),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
