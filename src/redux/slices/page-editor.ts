import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
} from "@reduxjs/toolkit";

// import type { RootState } from "redux/store";
import { RootState } from "redux/store";
import { DateTime } from "luxon";
import IPage from "types/form/page";

// ----- ENTITY ADAPTER

const pageAdapter = createEntityAdapter<IPage>({
  selectId: (page) => page.id,
});

// ---- STATE

export interface PageEditor {
  // Page status
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

const initialState: PageEditor = {
  isCreating: false,
  isLoading: true,
  isSaving: false,
  isFailed: false,
  isDeleting: false,
  lastUpdated: new Date().toISOString(),
  lastSaved: new Date().toISOString(),
  lastCreated: new Date().toISOString(),
  lastDeleted: new Date().toISOString(),
};
// ----- ACTIONS

type UpdatePayload = {
  id: string;
  changes: Partial<IPage>;
};

type UpdatedPayload = {
  lastUpdated: string;
};

type DeletedPayload = {
  lastDeleted: string;
};

type SavedPayload = {
  lastSaved: string;
};

type ID = {
  id: string;
};

type CreatedPayload = {
  page: IPage;
  lastCreated: string;
};

// ----- SLICE

const SLICE_NAME = "page-editor";

export const questionsSlice = createSlice({
  name: SLICE_NAME,
  initialState: pageAdapter.getInitialState(initialState),
  reducers: {
    initialize: (state, _action: PayloadAction<string>) => {
      state.isLoading = true;
    },
    initialized: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      pageAdapter.setMany(state, action.payload);
    },
    create: (state, _action: PayloadAction<ID>) => {
      state.isCreating = true;
    },
    created: (state, action: PayloadAction<CreatedPayload>) => {
      state.isCreating = false;
      state.lastCreated = action.payload.lastCreated;
      pageAdapter.addOne(state, action.payload.page);
    },
    update: (state, action: PayloadAction<UpdatePayload>) => {
      state.lastUpdated = new Date().toISOString();
      pageAdapter.updateOne(state, action.payload);
    },
    updated: (state, action: PayloadAction<UpdatedPayload>) => {
      state.lastUpdated = action.payload.lastUpdated;
    },
    delete: (state, action: PayloadAction<any>) => {
      state.isDeleting = true;
      pageAdapter.removeOne(state, action.payload);
    },
    deleted: (state, action: PayloadAction<DeletedPayload>) => {
      state.isDeleting = false;
      state.lastDeleted = action.payload.lastDeleted;
    },
    save: (state) => {
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
    reset: () => pageAdapter.getInitialState(initialState),
  },
});

// ---- SELECTORS

export const error = (state: RootState): string | undefined =>
  state.formEditor.pages.error;
export const isLoading = (state: RootState): boolean =>
  state.formEditor.pages.isLoading;
export const hasChanges = (state: RootState): boolean => {
  const updated = DateTime.fromISO(state.formEditor.questions.lastUpdated);
  const saved = DateTime.fromISO(state.formEditor.questions.lastSaved);
  return updated > saved;
};
export const pages = (state: RootState): IPage[] =>
  pageAdapter.getSelectors().selectAll(state.formEditor.pages);

// ---- EXPORTS

export const selectors = {
  error,
  isLoading,
  hasChanges,
  pages,
};

export const actions = questionsSlice.actions;
export default questionsSlice.reducer;
