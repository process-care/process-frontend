import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { actions as questionAction } from "./question-editor";
import { RootState } from "redux/store";
import ISurvey from "types/survey";
import { getNewOrder } from "components/CreateSurvey/CreateForm/Condition/ToolBox/PageForm/utils";

// ---- TYPES

export interface selectedSurveyEditor {
  // Survey status
  survey: ISurvey | Record<string, any>;
  isLoading: boolean;
  isFailed: boolean;
  isOrdering: boolean;
  error?: string;
}

// ---- STATE

const initialState: selectedSurveyEditor = {
  survey: {},
  isLoading: true,
  isOrdering: false,
  isFailed: false,
};

// ----- SLICE

const SLICE_NAME = "selected-survey";

export const selectedSurveySlice = createSlice({
  name: SLICE_NAME,
  initialState: initialState,
  reducers: {
    initialize: (state, _action: PayloadAction<string>) => {
      state.isLoading = true;
    },
    initialized: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.survey = action.payload;
    },
    updateOrder: (state, action: PayloadAction<ISurvey["id"][]>) => {
      state.isOrdering = true;
      state.survey.order = action.payload;
    },
    updatedOrder: (state, _action: PayloadAction<string>) => {
      state.isOrdering = false;
    },
  },
  extraReducers: (builder) => {
    // Update Order on create question
    builder.addCase(questionAction.created, (state, action) => {
      state.survey.order = getNewOrder(
        state.survey,
        action.payload.question.page?.id,
        action.payload.question.id
      );
    });

    // Update Order on delete question
    builder.addCase(questionAction.delete, (state, action) => {
      state.survey.order = state.survey.order.filter(
        (id: string) => id !== action.payload
      );
    });
  },
});

// ---- SELECTORS

export const error = (state: RootState): string | undefined =>
  state.formEditor.selectedSurvey.error;
export const isLoading = (state: RootState): boolean =>
  state.formEditor.selectedSurvey.isLoading;
export const getSelectedSurvey = (
  state: RootState
): ISurvey | Record<string, any> => state.formEditor.selectedSurvey.survey;
// ---- EXPORTS

export const selectors = {
  error,
  isLoading,
  getSelectedSurvey,
};

export const actions = selectedSurveySlice.actions;
export default selectedSurveySlice.reducer;
