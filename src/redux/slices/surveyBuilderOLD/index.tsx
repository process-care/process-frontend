import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import slugify from "slugify";

import { PageRedux } from "@/redux/slices/types/index.js"
import { QuestionRedux } from "@/redux/slices/types/index.js"

export interface SurveyBuilder {
  survey: {
    id: string;
    slug: string;
    title: string;
    language?: string;
    email?: string;
    description?: string;
    keywords?: string[];
    landing?: string;
    order: QuestionRedux["id"][];
    pages?: PageRedux[];
    status?: "draft" | "pending" | "closed" | "archived";
    createdAt?: string;
    needConsent?: boolean;
  };
  step: number;
  consentement?: { id: string; name: ""; url: "" };
}

interface Update {
  data: {
    [index: string]: any;
  };
}

export const initialState: SurveyBuilder = {
  survey: {
    order: [],
    id: "",
    title: "",
    slug: "",
    language: "",
    description: "",
    email: "",
    keywords: [],
    needConsent: true,
  },
  step: 1,
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

export const { updateSurveyMeta, updateSurveyStep, updateConsentMeta } = surveyBuilderSlice.actions;

export default surveyBuilderSlice.reducer;
