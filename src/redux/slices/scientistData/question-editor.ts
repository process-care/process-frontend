import { createEntityAdapter, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { DateTime } from "luxon";

import { RootState } from "@/redux/store/index.js";
import { GlobalState } from "../scientistData.js"
import { getNewOrder } from "@/components/CreateSurvey/CreateForm/Condition/ToolBox/PageForm/utils/index.js"
import { QuestionRedux } from "../types/index.js"
import { pageSelectors } from "./page-editor.js"

// ---- TYPES

export interface QuestionEditor {
  // Questions status
  selectedQuestion: QuestionRedux["id"];
  isCreating: boolean;
  isLoading: boolean;
  isSaving: boolean;
  isFailed: boolean;
  isDeleting: boolean;
  error?: string;
  lastUpdated: string;
  lastSaved: string;
  lastCreated: string;
  lastDeleted: string;
}

// ---- STATE

export const initialQuestionState: QuestionEditor = {
  isCreating: false,
  isLoading: true,
  isSaving: false,
  isFailed: false,
  isDeleting: false,
  lastUpdated: new Date().toISOString(),
  lastSaved: new Date().toISOString(),
  lastCreated: new Date().toISOString(),
  lastDeleted: new Date().toISOString(),
  selectedQuestion: "",
};

// ----- ACTIONS

type UpdatePayload = {
  id: string;
  changes: QuestionRedux;
};

type UpdatedPayload = {
  lastUpdated: string;
};

type DeletedPayload = {
  lastDeleted: string;
};

type SavePayload = {
  changes: QuestionRedux;
};

type SavedPayload = {
  lastSaved: string;
};

type CreatePayload = {
  type: QuestionRedux["attributes"]["type"];
};

type CreatedPayload = {
  question: QuestionRedux;
  lastCreated: string;
  global: GlobalState;
};

// ----- ENTITY ADAPTER

export const questionAdapter = createEntityAdapter<QuestionRedux>({
  selectId: (question) => question.id,
});

// ---- REDUCERS

export const questionsReducers = {
  createQuestion: (state: GlobalState, _action: PayloadAction<CreatePayload>): void => {
    state.questions.isCreating = true;
  },
  createdQuestion: (state: GlobalState, action: PayloadAction<CreatedPayload>): void => {
    state.questions.lastCreated = action.payload.lastCreated;
    questionAdapter.addOne(state.questions, action.payload.question);
    state.survey.order = getNewOrder(action.payload.global, action.payload.question.id);
    state.questions.selectedQuestion = action.payload.question.id;
    state.questions.isCreating = false;
  },
  updateQuestion: (state: GlobalState, action: PayloadAction<UpdatePayload>): void => {
    state.questions.lastUpdated = new Date().toISOString();
    questionAdapter.updateOne(state.questions, action.payload);
  },
  updatedQuestion: (state: GlobalState, action: PayloadAction<UpdatedPayload>): void => {
    state.questions.lastUpdated = action.payload.lastUpdated;
  },
  deleteQuestion: (state: GlobalState, action: PayloadAction<string>): void => {
    state.questions.isDeleting = true;
    questionAdapter.removeOne(state.questions, action.payload);
    state.survey.order = state.survey.order?.filter((id: string) => id !== action.payload);
  },
  deletedQuestion: (state: GlobalState, action: PayloadAction<DeletedPayload>): void => {
    state.questions.isDeleting = false;
    state.questions.lastDeleted = action.payload.lastDeleted;
    const lastQuestionId = state.questions.ids.length - 1;
    if (lastQuestionId !== -1) {
      state.questions.selectedQuestion = state.questions.ids[lastQuestionId].toString();
    } else {
      state.questions.selectedQuestion = "";
    }
  },
  saveQuestion: (state: GlobalState, _action: PayloadAction<SavePayload>): void => {
    state.questions.isSaving = true;
  },
  savedQuestion: (state: GlobalState, action: PayloadAction<SavedPayload>): void => {
    state.questions.isSaving = false;
    state.questions.lastSaved = action.payload.lastSaved;
    if (state.pages.redirectToPage) {
      state.pages.selectedPage = state.pages.redirectToPage;
    }
    state.questions.isCreating = false;
  },
  failedQuestion: (state: GlobalState, action: PayloadAction<string>): void => {
    state.questions.isFailed = true;
    state.questions.error = action.payload;
  },
  setSelectedQuestion: (state: GlobalState, action: PayloadAction<string>): void => {
    state.questions.selectedQuestion = action.payload;
  },
};

// ---- SELECTORS

const getSelectedQuestionId = (state: RootState): string => state.scientistData.questions.selectedQuestion;

export const error = (state: RootState): string | undefined => state.scientistData.questions.error;
export const isLoading = (state: RootState): boolean => state.scientistData.questions.isLoading;
export const isCreating = (state: RootState): boolean => state.scientistData.questions.isCreating;
export const questionsHasChanges = (state: RootState): boolean => {
  const updated = DateTime.fromISO(state.scientistData.questions.lastUpdated);
  const saved = DateTime.fromISO(state.scientistData.questions.lastSaved);
  return updated > saved;
};

// MEMOIZED

const localizedSelectors = questionAdapter.getSelectors()

const {
  selectAll: selectAllQuestions,
  selectById: selectQuestionById,
} = questionAdapter.getSelectors((state: RootState) => state.scientistData.questions)

const selectSelectedPageQuestions = createSelector(
  [ selectAllQuestions, pageSelectors.getSelectedPageId],
  (questions, selectedPageId) => questions.filter((question) => question?.attributes?.page?.data?.id === selectedPageId)
)

const selectQuestionsByPageId = createSelector(
  [ selectAllQuestions, (_: any, args: { pageId: string }) => args?.pageId ],
  (questions, pageId) => questions.filter((question) => question?.attributes?.page?.data?.id === pageId)
)

const selectSelectedQuestion = createSelector(
  [ (state) => state.scientistData.questions, getSelectedQuestionId ],
  (questions, selectedQuestionId) => localizedSelectors.selectById(questions, selectedQuestionId)
)

// ---- EXPORTS

export const questionsSelectors = {
  error,
  isLoading,
  isCreating,
  questionsHasChanges,
  getSelectedQuestionId,
  selectSelectedQuestion,
  selectSelectedPageQuestions,
  selectQuestionsByPageId,
  selectQuestionById
};

