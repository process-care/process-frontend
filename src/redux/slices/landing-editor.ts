import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Landing } from "api/graphql/types.generated";
import { RootState } from "redux/store";
import { DateTime } from "luxon";
import { LastSaved, LandingRedux } from "./types";

// ---- STATE

export interface LandingEditor {
  isLoading: boolean;
  error?: string;
  isEditingAbout: boolean;
  lastUpdated: string;
  lastSaved: string;
  data?: LandingRedux;
}

const initialState: LandingEditor = {
  isLoading: true,
  isEditingAbout: false,
  lastUpdated: new Date().toISOString(),
  lastSaved: new Date().toISOString(),
};

// ----- SLICE
const SLICE_NAME = "landing-editor";

export const landingEditorSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    load: (state, _action: PayloadAction<string>) => {
      state.isLoading = true;
    },
    loaded: (state, action: PayloadAction<LandingRedux>) => {
      state.isLoading = false;
      const landing = action.payload;
      state.data = landing;
    },
    loadFailed: (state) => {
      state.isLoading = false;
      state.error = "Chargement de la landing a échoué.";
    },
    update: (state, action: PayloadAction<LandingRedux>) => {
      state.lastUpdated = new Date().toISOString();
      const updated = { ...state.data, ...action.payload };
      state.data = updated;
    },
    updated: (state, action: PayloadAction<LastSaved>) => {
      state.lastSaved = action.payload.lastSaved;
    },
    editAbout: (state, action: PayloadAction<boolean>) => {
      state.isEditingAbout = action.payload;
    },
  },
});

// ---- SELECTORS

function getAttributes(
  state: RootState
): LandingRedux["attributes"] | undefined {
  return state.editor.landing.data?.attributes;
}

export const error = (state: RootState): string | undefined =>
  state.editor.landing.error;
export const isLoading = (state: RootState): boolean =>
  state.editor.landing.isLoading;
export const landingHasChanges = (state: RootState): boolean => {
  const updated = DateTime.fromISO(state.editor.landing.lastUpdated);
  const saved = DateTime.fromISO(state.editor.landing.lastSaved);
  return updated > saved;
};

export const isEditingAbout = (state: RootState): boolean =>
  state.editor.landing.isEditingAbout;
export const hasMembers = (state: RootState): boolean =>
  getAttributes(state)?.members.length > 0;
export const landing = (state: RootState): Landing | undefined =>
  getAttributes(state);
export const members = (state: RootState): Landing["members"] =>
  getAttributes(state)?.members;

export const about = (state: RootState): Landing["about_page"] | undefined =>
  getAttributes(state)?.about_page;

type HeaderData = Partial<Pick<Landing, "title" | "color_theme" | "logo">>;

export const headerData = (state: RootState): HeaderData | undefined => {
  if (!state.editor.landing.data) return;

  const { title, color_theme, logo } = state.editor.landing.data.attributes;
  return {
    title,
    color_theme,
    logo,
  };
};

export const selectors = {
  error,
  isLoading,
  landingHasChanges,
  isEditingAbout,
  hasMembers,
  headerData,
  landing,
  members,
  partners,
  about,
};

// ---- EXPORTS

export const actions = landingEditorSlice.actions;
export default landingEditorSlice.reducer;
