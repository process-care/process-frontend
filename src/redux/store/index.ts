import { configureStore } from "@reduxjs/toolkit";
import formBuilder from "redux/slices/formBuilder";
import application from "redux/slices/application";
import landingBuilder from "redux/slices/landingBuilder";
import aboutBuilder from "redux/slices/aboutBuilder";

export const store = configureStore({
  reducer: {
    formBuilder,
    landingBuilder,
    aboutBuilder,
    application,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
