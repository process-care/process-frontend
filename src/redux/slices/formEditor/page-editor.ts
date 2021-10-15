import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
  createReducer,
  CreateSliceOptions,
  EntityState,
} from "@reduxjs/toolkit";

import { RootState } from "redux/store";
import { DateTime } from "luxon";
import IPage from "types/form/page";
import { actions as conditionActions } from "./condition-editor";
import { actions as questionActions } from "./question-editor";

// ----- ENTITY ADAPTER

export const pageAdapter = createEntityAdapter<IPage>({
  selectId: (page) => page.id,
});

// ---- TYPES

export interface PageEditor {
  // Page status
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

type State = RootState["formEditor"];

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

// ----- SLICE

const SLICE_NAME = "page-editor";

export const pageSlice = createSlice({
  name: SLICE_NAME,
  initialState: pageAdapter.getInitialState(initialPageState),
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
    setRedirectPage: (state, action: PayloadAction<string>) => {
      state.redirectToPage = action.payload;
    },
    reset: () => pageAdapter.getInitialState(initialPageState),
  },
  extraReducers: (builder) => {
    // Update Question on delete condition
    builder.addCase(conditionActions.created, (state, action) => {
      const id = action.payload.condition.referer_page?.id;

      if (id !== undefined) {
        const payload = {
          id,
          changes: {
            conditions: [action.payload.condition],
          },
        };
        pageAdapter.updateOne(state, payload);
      }
      state.redirectToPage = action.payload.redirectToPage;
    });
    builder.addCase(conditionActions.saved, (state) => {
      if (state.redirectToPage) {
        state.selectedPage = state.redirectToPage;
      }
    });
    builder.addCase(questionActions.saved, (state) => {
      if (state.redirectToPage) {
        state.selectedPage = state.redirectToPage;
      }
    });
  },
});

// ---- SELECTORS

export const error = (state: State): string | undefined => state.pages.error;
export const isLoading = (state: any): boolean =>
  state.globalSlice.pages.isLoading;
export const hasChanges = (state: any): boolean => {
  const updated = DateTime.fromISO(state.globalSlice.questions.lastUpdated);
  const saved = DateTime.fromISO(state.globalSlice.questions.lastSaved);
  return updated > saved;
};

export const pages = (state: any): IPage[] =>
  pageAdapter.getSelectors().selectAll(state.globalSlice.pages);

const getAllPages = (state: any): IPage[] => {
  return pages(state).filter(
    (page) => page?.survey?.id === state.globalSlice.selectedSurvey.id
  );
};

const getSelectedPageId2 = (state: any): string =>
  state.globalSlice.pages.selectedPage;

const getSelectedPage2 = (state: any): IPage | undefined =>
  pageAdapter
    .getSelectors()
    .selectById(state.globalSlice.pages, getSelectedPageId(state));

const getSelectedPageId = (state: any): string =>
  state.formEditor.pages.selectedPage;

const getSelectedPage = (state: any): IPage | undefined =>
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
  getSelectedPage2,
  getSelectedPageId2,
};

export const selectorsPage = {
  error,
  isLoading,
  hasChanges,
  getAllPages,
  getSelectedPage,
  getSelectedPageId,
};

export const actions = pageSlice.actions;
export default pageSlice.reducer;

export const pageReducers: any = {
  initialize: (state: State, action: PayloadAction<string>) => {
    state.pages.isLoading = true;
  },
  initialized: (state: State, action: PayloadAction<any>) => {
    state.pages.isLoading = false;
    pageAdapter.setMany(state.pages, action.payload);
    if (action.payload[0]) state.pages.selectedPage = action.payload[0].id;
  },
  create: (state: State, _action: PayloadAction<ID>) => {
    state.pages.isCreating = true;
  },
  created: (state: State, action: PayloadAction<CreatedPayload>) => {
    state.pages.isCreating = false;
    state.pages.lastCreated = action.payload.lastCreated;
    pageAdapter.addOne(state.pages, action.payload.page);
    state.pages.selectedPage = action.payload.page.id;
  },
  update: (state: State, action: PayloadAction<UpdatePayload>) => {
    state.pages.lastUpdated = new Date().toISOString();
    pageAdapter.updateOne(state.pages, action.payload);
  },
  updated: (state: State, action: PayloadAction<UpdatedPayload>) => {
    state.pages.lastUpdated = action.payload.lastUpdated;
  },
  delete: (state: State, action: PayloadAction<any>) => {
    state.pages.isDeleting = true;
    pageAdapter.removeOne(state.pages, action.payload);
    const lastPageId = state.pages.ids.length - 1;
    state.pages.selectedPage = state.pages.ids[lastPageId].toString();
  },
  deleted: (state: State, action: PayloadAction<DeletedPayload>) => {
    state.pages.isDeleting = false;
    state.pages.lastDeleted = action.payload.lastDeleted;
  },
  save: (state: State) => {
    state.pages.isSaving = true;
  },
  saved: (state: State, action: PayloadAction<SavedPayload>) => {
    state.pages.isSaving = false;
    state.pages.lastSaved = action.payload.lastSaved;
  },
  failed: (state: State, action: PayloadAction<string>) => {
    state.pages.isFailed = true;
    state.pages.error = action.payload;
  },
  setSelectedPage: (state: State, action: PayloadAction<string>) => {
    state.pages.selectedPage = action.payload;
  },
  setRedirectPage: (state: State, action: PayloadAction<string>) => {
    state.pages.redirectToPage = action.payload;
  },
};
