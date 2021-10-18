import { PayloadAction, createEntityAdapter } from "@reduxjs/toolkit";

import { RootState } from "redux/store";
import { DateTime } from "luxon";
import IPage from "types/form/page";
import { GlobalState } from "../global";

// ----- ENTITY ADAPTER

export const pageAdapter = createEntityAdapter<IPage>({
  selectId: (page) => page.id,
});

// ---- TYPES

export interface PageEditor {
  selectedPage: string;
  redirectToPage?: string;
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

export const initialPageState: PageEditor = {
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

// ---- SELECTORS

export const error = (state: RootState): string | undefined =>
  state.global.pages.error;
export const isLoading = (state: RootState): boolean =>
  state.global.pages.isLoading;
export const hasChanges = (state: RootState): boolean => {
  const updated = DateTime.fromISO(state.global.questions.lastUpdated);
  const saved = DateTime.fromISO(state.global.questions.lastSaved);
  return updated > saved;
};

export const pages = (state: RootState): IPage[] =>
  pageAdapter.getSelectors().selectAll(state.global.pages);

const getAllPages = (state: RootState): IPage[] => {
  return pages(state).filter(
    (page) => page?.survey?.id === state.global.survey.selectedSurvey
  );
};

const getSelectedPageId = (state: RootState): string =>
  state.global.pages.selectedPage;

const getSelectedPage = (state: RootState): IPage | undefined =>
  pageAdapter
    .getSelectors()
    .selectById(state.global.pages, getSelectedPageId(state));

// ---- EXPORTS

export const pageSelectors = {
  error,
  isLoading,
  hasChanges,
  getAllPages,
  getSelectedPage,
  getSelectedPageId,
};

// ---- REDUCERS

export const pageReducer = {
  createPage: (state: GlobalState, _action: PayloadAction<ID>): void => {
    state.pages.isCreating = true;
  },
  createdPage: (
    state: GlobalState,
    action: PayloadAction<CreatedPayload>
  ): void => {
    state.pages.isCreating = false;
    state.pages.lastCreated = action.payload.lastCreated;
    pageAdapter.addOne(state.pages, action.payload.page);
    state.pages.selectedPage = action.payload.page.id;
  },
  updatePage: (
    state: GlobalState,
    action: PayloadAction<UpdatePayload>
  ): void => {
    state.pages.lastUpdated = new Date().toISOString();
    pageAdapter.updateOne(state.pages, action.payload);
  },
  updatedPage: (
    state: GlobalState,
    action: PayloadAction<UpdatedPayload>
  ): void => {
    state.pages.lastUpdated = action.payload.lastUpdated;
  },
  deletePage: (state: GlobalState, action: PayloadAction<any>): void => {
    state.pages.isDeleting = true;
    pageAdapter.removeOne(state.pages, action.payload);
    const lastPageId = state.pages.ids.length - 1;
    state.pages.selectedPage = state.pages.ids[lastPageId].toString();
  },
  deletedPage: (
    state: GlobalState,
    action: PayloadAction<DeletedPayload>
  ): void => {
    state.pages.isDeleting = false;
    state.pages.lastDeleted = action.payload.lastDeleted;
  },
  savePage: (state: GlobalState): void => {
    state.pages.isSaving = true;
  },
  savedPage: (
    state: GlobalState,
    action: PayloadAction<SavedPayload>
  ): void => {
    state.pages.isSaving = false;
    state.pages.lastSaved = action.payload.lastSaved;
  },
  failedPage: (state: GlobalState, action: PayloadAction<string>): void => {
    state.pages.isFailed = true;
    state.pages.error = action.payload;
  },
  setSelectedPage: (
    state: GlobalState,
    action: PayloadAction<string>
  ): void => {
    state.pages.selectedPage = action.payload;
  },
  setRedirectPage: (
    state: GlobalState,
    action: PayloadAction<string>
  ): void => {
    state.pages.redirectToPage = action.payload;
  },
};
