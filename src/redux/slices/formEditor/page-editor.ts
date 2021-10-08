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

// ---- TYPES

export interface PageEditor {
  // Page status
  selectedPage: string;
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
  selectedPage: "",
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
  questionsToDelete: string[];
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
      if (action.payload[0]) state.selectedPage = action.payload[0].id;
    },
    create: (state, _action: PayloadAction<ID>) => {
      state.isCreating = true;
    },
    created: (state, action: PayloadAction<CreatedPayload>) => {
      state.isCreating = false;
      state.lastCreated = action.payload.lastCreated;
      pageAdapter.addOne(state, action.payload.page);
      state.selectedPage = action.payload.page.id;
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
      const lastPageId = state.ids.length - 1;
      state.selectedPage = state.ids[lastPageId].toString();
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
    setSelectedPage: (state, action: PayloadAction<string>) => {
      state.selectedPage = action.payload;
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

const getAllPages = (state: RootState): IPage[] => {
  return pages(state).filter(
    (page) => page?.survey?.id === state.formEditor.selectedSurvey.id
  );
};

// export const getAllPages = (state: RootState): IPage[] =>
//   pageAdapter.getSelectors().selectAll(state.formEditor.pages);

const getSelectedPageId = (state: RootState): string =>
  state.formEditor.pages.selectedPage;

const getSelectedPage = (state: RootState): IPage | undefined =>
  pageAdapter
    .getSelectors()
    .selectById(state.formEditor.pages, getSelectedPageId(state));

// ---- EXPORTS

export const selectors = {
  error,
  isLoading,
  hasChanges,
  getAllPages,
  getSelectedPage,
  getSelectedPageId,
};

export const actions = questionsSlice.actions;
export default questionsSlice.reducer;
