import { PayloadAction, createEntityAdapter, createSelector } from "@reduxjs/toolkit";

import { RootState } from "@/redux/store/index.js";
import { DateTime } from "luxon";
import { GlobalState } from "../scientistData.js"
import { PageRedux } from "../types/index.js"
import { Maybe } from "@/api/graphql/types.generated.js"

// ---- TYPES

export interface PageEditor {
  selectedPage: Maybe<string> | undefined;
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
  page: PageRedux;
  lastCreated: string;
};

// type UploadPayload = {
//   id: string;
//   changes: PageRedux;
// };

// ----- ENTITY ADAPTER

export const pageAdapter = createEntityAdapter<PageRedux>({
  selectId: (page) => page.id,
});

// ---- REDUCERS

export const pageReducer = {
  createPage: (state: GlobalState, _action: PayloadAction<ID>): void => {
    state.pages.isCreating = true;
  },
  createdPage: (state: GlobalState, action: PayloadAction<CreatedPayload>): void => {
    state.pages.isCreating = false;
    state.pages.lastCreated = action.payload.lastCreated;
    pageAdapter.addOne(state.pages, action.payload.page);
    state.pages.selectedPage = action.payload.page.id;
  },
  updatePage: (state: GlobalState, action: PayloadAction<any>): void => {
    state.pages.lastUpdated = new Date().toISOString();
    pageAdapter.updateOne(state.pages, action.payload.changes);
  },
  updatedPage: (state: GlobalState, action: PayloadAction<UpdatedPayload>): void => {
    state.pages.lastUpdated = action.payload.lastUpdated;
  },
  deletePage: (state: GlobalState, action: PayloadAction<any>): void => {
    state.pages.isDeleting = true;
    pageAdapter.removeOne(state.pages, action.payload);
    const lastPageId = state.pages.ids.length - 1;
    state.pages.selectedPage = state.pages.ids[lastPageId]?.toString();
  },
  deletedPage: (state: GlobalState, action: PayloadAction<DeletedPayload>): void => {
    state.pages.isDeleting = false;
    state.pages.lastDeleted = action.payload.lastDeleted;
  },
  savePage: (state: GlobalState): void => {
    state.pages.isSaving = true;
  },
  savedPage: (state: GlobalState, action: PayloadAction<SavedPayload>): void => {
    state.pages.isSaving = false;
    state.pages.lastSaved = action.payload.lastSaved;
  },
  failedPage: (state: GlobalState, action: PayloadAction<string>): void => {
    state.pages.isFailed = true;
    state.pages.error = action.payload;
  },
  setSelectedPage: (state: GlobalState, action: PayloadAction<string>): void => {
    state.pages.selectedPage = action.payload;
  },
  setRedirectPage: (state: GlobalState, action: PayloadAction<string>): void => {
    state.pages.redirectToPage = action.payload;
  },
};

// ---- SELECTORS

const getSelectedPageId = (state: RootState): Maybe<string> | undefined => state.scientistData.pages.selectedPage
export const error = (state: RootState): string | undefined => state.scientistData.pages.error;
export const isLoading = (state: RootState): boolean => state.scientistData.pages.isLoading;
export const hasChanges = (state: RootState): boolean => {
  const updated = DateTime.fromISO(state.scientistData.questions.lastUpdated);
  const saved = DateTime.fromISO(state.scientistData.questions.lastSaved);
  return updated > saved;
};

// MEMOIZED SELECTORS

// From the entity adapter
const {
  selectAll: selectPages,
} = pageAdapter.getSelectors((state: RootState) => state.scientistData.pages)


const selectConditionsPages = createSelector(
  selectPages,
  (pages) => pages?.map((c) => c.attributes?.conditions?.data?.map((c) => c))
)

const selectSelectedPage = createSelector(
  [ selectPages, getSelectedPageId ],
  (pages, selectedPageId) => pages?.find((page) => page?.id === selectedPageId)
)

// ---- EXPORTS

export const pageSelectors = {
  error,
  isLoading,
  hasChanges,
  selectPages,
  selectConditionsPages,
  selectSelectedPage,
  getSelectedPageId,
};

