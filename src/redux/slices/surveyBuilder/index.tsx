import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Survey {
  survey: {
    id?: string;
    title?: string;
    language?: string;
    description?: string;
    email?: string;
    keywords?: string[];
    categories?: string[];
  };
  step: number;
  had_consent?: boolean;
}

interface Update {
  data: {
    [index: string]: string | number | string[];
  };
}

export const initialState: Survey = {
  survey: {
    id: "",
    title: "",
    language: "",
    description: "",
    email: "",
    keywords: [],
    categories: [],
  },
  step: 1,
  had_consent: false,
};

export const surveyBuilderSlice = createSlice({
  name: "surveyBuilder",
  initialState,
  reducers: {
    updateSurveyMeta: (state, action: PayloadAction<Update>) => {
      state.survey = { ...state.survey, ...action.payload.data };
    },
    updateSurveyStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
  },
});

export const { updateSurveyMeta, updateSurveyStep } =
  surveyBuilderSlice.actions;

export default surveyBuilderSlice.reducer;
