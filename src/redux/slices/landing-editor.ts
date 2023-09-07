import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Landing } from "@/api/graphql/types.generated.js"
import { RootState } from "@/redux/store/index.js";
import { DateTime } from "luxon";
import { LastSaved, LandingRedux } from "./types/index.js"

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

// ----- ACTIONS

type UploadPayload = {
  changes: LandingRedux;
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
      state.error = "Le chargement de la landing a échoué.";
    },
    update: (state, action: PayloadAction<UploadPayload>) => {
      state.lastUpdated = new Date().toISOString();
      const updated = { ...state.data, ...action.payload?.changes };
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

function getAttributes(state: RootState): LandingRedux["attributes"] | undefined {
  return state.editor.landing.data?.attributes;
}

export const error = (state: RootState): string | undefined => state.editor.landing.error;
export const isLoading = (state: RootState): boolean => state.editor.landing.isLoading;
export const landingHasChanges = (state: RootState): boolean => {
  const updated = DateTime.fromISO(state.editor.landing.lastUpdated);
  const saved = DateTime.fromISO(state.editor.landing.lastSaved);
  return updated > saved;
};

export const isEditingAbout = (state: RootState): boolean => state.editor.landing.isEditingAbout;
export const hasMembers = (state: RootState): boolean => getAttributes(state)?.members.length > 0;
export const getLanding = (state: RootState): LandingRedux | undefined => state.editor.landing.data;
export const members = (state: RootState): LandingRedux["attributes"]["members"] => getAttributes(state)?.members;

export const about = (state: RootState): LandingRedux["attributes"]["about_page"] | undefined =>
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
  getLanding,
  members,
  about,
};

// ---- EXPORTS

export const actions = landingEditorSlice.actions;
export default landingEditorSlice.reducer;
