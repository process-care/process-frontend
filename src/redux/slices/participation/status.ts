import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Page, Question, Answer } from "api/graphql/types.generated";
import { SafeEntity } from "api/types";

// ---- TYPES

// type CreatedPayload = {
//   id: string;
// };

// ---- INITIAL STATE

interface SliceState {
  isLoading: boolean,
  participationId?: string
  surveyId?: string
}

const initialState: SliceState = {
  isLoading: false
};

// ---- ACTIONS

type InitializePayload = {
  participationId: string,
  surveyId: string,
}

type InitializedPayload = {
  pages: SafeEntity<Page>[]
  questions: SafeEntity<Question>[]
  answers: SafeEntity<Answer>[]
}

// ---- SLICE

const SLICE_NAME = 'status';

export const slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    initialize: (state, action: PayloadAction<InitializePayload>) => {
      const { participationId, surveyId } = action.payload;
      state.participationId = participationId;
      state.surveyId = surveyId;

      // Start loading only if we have both params
      if (surveyId && participationId) state.isLoading = true;
    },
    initialized: (state, _action: PayloadAction<InitializedPayload>) => {
      state.isLoading = false;
    }
  },
});

// ---- ACTIONS

export const actions = slice.actions;

export default slice.reducer;
