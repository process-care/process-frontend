import { createEntityAdapter, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "redux/store";
import { DateTime } from "luxon";
import IQuestion from "types/form/question";
import { GlobalState } from "../global";
import { getNewOrder } from "components/CreateSurvey/CreateForm/Condition/ToolBox/PageForm/utils";

// ----- ENTITY ADAPTER

export const questionAdapter = createEntityAdapter<IQuestion>({
  selectId: (question) => question.id,
});

// ---- TYPES

export interface QuestionEditor {
  // Questions status
  selectedQuestion: string;
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
  changes: Partial<IQuestion>;
};

type UpdatedPayload = {
  lastUpdated: string;
};

type DeletedPayload = {
  lastDeleted: string;
};

type SavePayload = {
  changes: Partial<IQuestion>;
};

type SavedPayload = {
  lastSaved: string;
};

type CreatePayload = {
  type: IQuestion["type"];
};

type CreatedPayload = {
  question: IQuestion;
  lastCreated: string;
  global: GlobalState;
};

// ---- SELECTORS

export const error = (state: RootState): string | undefined =>
  state.global.questions.error;
export const isLoading = (state: RootState): boolean =>
  state.global.questions.isLoading;
export const questionsHasChanges = (state: RootState): boolean => {
  const updated = DateTime.fromISO(state.global.questions.lastUpdated);
  const saved = DateTime.fromISO(state.global.questions.lastSaved);
  return updated > saved;
};

export const questions = (state: RootState): IQuestion[] =>
  questionAdapter.getSelectors().selectAll(state.global.questions);

const getSelectedQuestionId = (state: RootState): string =>
  state.global.questions.selectedQuestion;

const getSelectedPageQuestions = (state: RootState): IQuestion[] => {
  return questions(state).filter(
    (question) => question.page?.id === state.global.pages.selectedPage
  );
};

const getQuestionsByPageId = (
  state: RootState,
  pageId: string
): IQuestion[] => {
  return questions(state).filter((question) => question.page?.id === pageId);
};

const getSelectedQuestion = (state: RootState): IQuestion | any =>
  questionAdapter
    .getSelectors()
    .selectById(state.global.questions, getSelectedQuestionId(state));

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
