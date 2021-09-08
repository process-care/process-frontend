import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import slugify from "slugify";
export interface Survey {
  survey: {
    id: string;
    slug: string;
    title: string;
    language?: string;
    email?: string;
    description?: string;
    keywords?: string[];
    categories?: string[];
    landing?: string;
  };
  step: number;
  hadConsent?: boolean;
  consentement?: { id: string; name: ""; url: "" };
}

interface Update {
  data: {
    [index: string]: any;
  };
}

export const initialState: Survey = {
  survey: {
    id: "",
    title: "",
    slug: "",
    language: "",
    description: "",
    email: "",
    keywords: [],
    categories: [],
  },
  step: 1,
  hadConsent: false,
};

export const surveyBuilderSlice = createSlice({
  name: "surveyBuilder",
  initialState,
  reducers: {
    updateSurveyMeta: (state, action: PayloadAction<Update>) => {
      const { data } = action.payload;

      state.survey = { ...state.survey, ...data };

      // auto-generate slug
      if (data.title) {
        state.survey.slug = `/${slugify(data.title.toLowerCase(), {
          strict: true,
        })}`;
      }
      // force slug to begin with a /
      if (data.slug !== undefined && data?.slug?.charAt(0) !== "/") {
        state.survey.slug = `/${data.slug}`;
      }
    },
    updateSurveyStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    updateConsentMeta: (state, action: PayloadAction<any>) => {
      state.consentement = action.payload;
    },
  },
});

export const { updateSurveyMeta, updateSurveyStep, updateConsentMeta } =
  surveyBuilderSlice.actions;

export default surveyBuilderSlice.reducer;
