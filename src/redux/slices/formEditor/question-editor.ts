import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { actions as pageActions } from "./page-editor";

// import type { RootState } from "redux/store";
import { RootState } from "redux/store";
import { DateTime } from "luxon";
import IQuestion from "types/form/question";

// ----- ENTITY ADAPTER

const questionAdapter = createEntityAdapter<IQuestion>({
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

const initialState: QuestionEditor = {
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
  formEditor: any;
};

// ----- SLICE
const SLICE_NAME = "question-editor";

export const questionsSlice = createSlice({
  name: SLICE_NAME,
  initialState: questionAdapter.getInitialState(initialState),
  reducers: {
    initialize: (state, _action: PayloadAction<string>) => {
      state.isLoading = true;
    },
    initialized: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      questionAdapter.setMany(state, action.payload);
      if (action.payload[0]) state.selectedQuestion = action.payload[0].id;
    },
    create: (state, _action: PayloadAction<CreatePayload>) => {
      state.isCreating = true;
    },
    created: (state, action: PayloadAction<CreatedPayload>) => {
      state.isCreating = false;
      state.lastCreated = action.payload.lastCreated;
      questionAdapter.addOne(state, action.payload.question);
      state.selectedQuestion = action.payload.question.id;
    },
    update: (state, action: PayloadAction<UpdatePayload>) => {
      state.lastUpdated = new Date().toISOString();
      questionAdapter.updateOne(state, action.payload);
    },
    updated: (state, action: PayloadAction<UpdatedPayload>) => {
      state.lastUpdated = action.payload.lastUpdated;
    },
    delete: (state, action: PayloadAction<string>) => {
      state.isDeleting = true;
      questionAdapter.removeOne(state, action.payload);
    },
    deleted: (state, action: PayloadAction<DeletedPayload>) => {
      state.isDeleting = false;
      state.lastDeleted = action.payload.lastDeleted;
      const lastQuestionId = state.ids.length - 1;
      if (lastQuestionId !== -1) {
        state.selectedQuestion = state.ids[lastQuestionId].toString();
      } else {
        state.selectedQuestion = "";
      }
    },
    save: (state, _action: PayloadAction<SavePayload>) => {
      state.isSaving = true;
    },
    saved: (state, action: PayloadAction<SavedPayload>) => {
      state.isSaving = false;
      state.lastSaved = action.payload.lastSaved;
    },
    failed: (state, action: PayloadAction<string>) => {
      state.isFailed = true;
      state.error = action.payload;
    },
    setSelectedQuestion: (state, action: PayloadAction<string>) => {
      state.selectedQuestion = action.payload;
    },
    reset: () => questionAdapter.getInitialState(initialState),
  },
  extraReducers: (builder) => {
    // Delete all questions from a page when the page is deleted
    builder.addCase(pageActions.deleted, (state, action) => {
      const { questionsToDelete } = action.payload;
      questionAdapter.removeMany(state, questionsToDelete);
    });
  },
});

// ---- SELECTORS

export const error = (state: RootState): string | undefined =>
  state.formEditor.questions.error;
export const isLoading = (state: RootState): boolean =>
  state.formEditor.questions.isLoading;
export const hasChanges = (state: RootState): boolean => {
  const updated = DateTime.fromISO(state.formEditor.questions.lastUpdated);
  const saved = DateTime.fromISO(state.formEditor.questions.lastSaved);
  return updated > saved;
};

export const questions = (state: RootState): IQuestion[] =>
  questionAdapter.getSelectors().selectAll(state.formEditor.questions);

const getSelectedQuestionId = (state: RootState): string =>
  state.formEditor.questions.selectedQuestion;

const getSelectedPageQuestions = (state: RootState): IQuestion[] => {
  return questions(state).filter(
    (question) => question.page?.id === state.formEditor.pages.selectedPage
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
    .selectById(state.formEditor.questions, getSelectedQuestionId(state));

export const selectors = {
  error,
  isLoading,
  hasChanges,
  questions,
  getSelectedQuestionId,
  getSelectedQuestion,
  getSelectedPageQuestions,
  getQuestionsByPageId,
};

// ---- EXPORTS

export const actions = questionsSlice.actions;
export default questionsSlice.reducer;
