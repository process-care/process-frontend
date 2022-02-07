import { createEntityAdapter, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "redux/store";
import { DateTime } from "luxon";
import { GlobalState } from "../scientistData";
import { getNewOrder } from "components/CreateSurvey/CreateForm/Condition/ToolBox/PageForm/utils";
import { QuestionRedux } from "../types";

// ----- ENTITY ADAPTER

export const questionAdapter = createEntityAdapter<QuestionRedux>({
  selectId: (question) => question.id,
});

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

// ---- SELECTORS

export const error = (state: RootState): string | undefined =>
  state.scientistData.questions.error;
export const isLoading = (state: RootState): boolean =>
  state.scientistData.questions.isLoading;
export const questionsHasChanges = (state: RootState): boolean => {
  const updated = DateTime.fromISO(state.scientistData.questions.lastUpdated);
  const saved = DateTime.fromISO(state.scientistData.questions.lastSaved);
  return updated > saved;
};

export const questions = (state: RootState): QuestionRedux[] =>
  questionAdapter.getSelectors().selectAll(state.scientistData.questions);

const getSelectedQuestionId = (state: RootState): string =>
  state.scientistData.questions.selectedQuestion;

const getSelectedPageQuestions = (state: RootState): QuestionRedux[] => {
  return questions(state).filter(
    (question) =>
      question?.attributes?.page?.data?.id ===
      state.scientistData.pages.selectedPage
  );
};

const getQuestionsByPageId = (
  state: RootState,
  pageId: string
): QuestionRedux[] => {
  return questions(state).filter(
    (question) => question?.attributes?.page?.data?.id === pageId
  );
};

const getSelectedQuestion = (state: RootState): QuestionRedux | any =>
  questionAdapter
    .getSelectors()
    .selectById(state.scientistData.questions, getSelectedQuestionId(state));

export const questionsSelectors = {
  error,
  isLoading,
  questionsHasChanges,
  questions,
  getSelectedQuestionId,
  getSelectedQuestion,
  getSelectedPageQuestions,
  getQuestionsByPageId,
};

// ---- REDUCERS

export const questionsReducers = {
  createQuestion: (
    state: GlobalState,
    _action: PayloadAction<CreatePayload>
  ): void => {
    state.questions.isCreating = true;
  },
  createdQuestion: (
    state: GlobalState,
    action: PayloadAction<CreatedPayload>
  ): void => {
    state.questions.isCreating = false;
    state.questions.lastCreated = action.payload.lastCreated;
    questionAdapter.addOne(state.questions, action.payload.question);
    state.survey.order = getNewOrder(
      action.payload.global,
      action.payload.question.id
    );
    state.questions.selectedQuestion = action.payload.question.id;
  },
  updateQuestion: (
    state: GlobalState,
    action: PayloadAction<UpdatePayload>
  ): void => {
    state.questions.lastUpdated = new Date().toISOString();
    questionAdapter.updateOne(state.questions, action.payload);
  },
  updatedQuestion: (
    state: GlobalState,
    action: PayloadAction<UpdatedPayload>
  ): void => {
    state.questions.lastUpdated = action.payload.lastUpdated;
  },
  deleteQuestion: (state: GlobalState, action: PayloadAction<string>): void => {
    state.questions.isDeleting = true;
    questionAdapter.removeOne(state.questions, action.payload);
    state.survey.order = state.survey.order?.filter(
      (id: string) => id !== action.payload
    );
  },
  deletedQuestion: (
    state: GlobalState,
    action: PayloadAction<DeletedPayload>
  ): void => {
    state.questions.isDeleting = false;
    state.questions.lastDeleted = action.payload.lastDeleted;
    const lastQuestionId = state.questions.ids.length - 1;
    if (lastQuestionId !== -1) {
      state.questions.selectedQuestion =
        state.questions.ids[lastQuestionId].toString();
    } else {
      state.questions.selectedQuestion = "";
    }
  },
  saveQuestion: (
    state: GlobalState,
    _action: PayloadAction<SavePayload>
  ): void => {
    state.questions.isSaving = true;
  },
  savedQuestion: (
    state: GlobalState,
    action: PayloadAction<SavedPayload>
  ): void => {
    state.questions.isSaving = false;
    state.questions.lastSaved = action.payload.lastSaved;
    if (state.pages.redirectToPage) {
      state.pages.selectedPage = state.pages.redirectToPage;
    }
  },
  failedQuestion: (state: GlobalState, action: PayloadAction<string>): void => {
    state.questions.isFailed = true;
    state.questions.error = action.payload;
  },
  setSelectedQuestion: (
    state: GlobalState,
    action: PayloadAction<string>
  ): void => {
    state.questions.selectedQuestion = action.payload;
  },
};
