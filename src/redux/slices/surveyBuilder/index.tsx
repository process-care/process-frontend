import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import slugify from "slugify";
import IPage from "types/form/page";
import IQuestion from "types/form/question";

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
    order: IQuestion["id"][];
    pages?: IPage[];
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

export const initialState: Survey = {
  survey: {
    order: [],
    id: "",
    title: "",
    slug: "",
    language: "",
    description: "",
    email: "",
    keywords: [],
    categories: [],
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

export const { updateSurveyMeta, updateSurveyStep, updateConsentMeta } =
  surveyBuilderSlice.actions;

export default surveyBuilderSlice.reducer;
