import { createEntityAdapter, createSlice, PayloadAction, Update } from "@reduxjs/toolkit"
import { Maybe } from "@/api/graphql/types.generated.js"

import { actions as statusAct } from "@/redux/slices/participation/status.js"
import { RootState } from "@/redux/store/index.js"
import { sanitizeAnswers } from "./utils.js"

// ---- INITIAL STATE

export interface AnswerParticipationRedux {
  id?: string | null
  questionId: string
  value: unknown
}

// ---- ACTIONS

export type UpsertAnswerPayload = {
  questionId: string
  value: string
}

export type UpsertedAnswerPayload = {
  created: Update<AnswerParticipationRedux>[]
  updated: Update<AnswerParticipationRedux>[]
}

// ---- SLICE

const SLICE_NAME = "answers"

const adapter = createEntityAdapter<AnswerParticipationRedux>({
  selectId: (a) => a.questionId,
});

export const slice = createSlice({
  name: SLICE_NAME,
  initialState: adapter.getInitialState(),
  reducers: {
    update: (state, action: PayloadAction<UpsertAnswerPayload>) => {
      adapter.upsertOne(state, action.payload)
    },
    updated: (state, action: PayloadAction<UpsertedAnswerPayload>) => {
      // Update only those who have been created to keep their answerId
      adapter.updateMany(state, action.payload.created)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(statusAct.initialized, (state, action) => {
      const sanitized = sanitizeAnswers(action.payload.answers)
      adapter.setAll(state, sanitized)
    });
  },
});

// ---- SELECTORS

const entitySelectors = adapter.getSelectors();

const selectById = (state: RootState, questionId: Maybe<string>): AnswerParticipationRedux | undefined => {
  if (!questionId) return;
  return entitySelectors.selectById(state.participation.answers, questionId);
};

const selectByIds = (state: RootState, questionsId: string[]): AnswerParticipationRedux[] => {
  const answerState = state.participation.answers;

  const answers = questionsId.reduce((acc, qId) => {
    const answer = entitySelectors.selectById(answerState, qId);
    if (answer) acc.push(answer);
    return acc;
  }, [] as AnswerParticipationRedux[]);

  return answers;
};

const selectAll = (state: RootState): AnswerParticipationRedux[] =>
  entitySelectors.selectAll(state.participation.answers);

export const selectors = {
  selectAll,
  selectById,
  selectByIds,
};

// ---- ACTIONS

export const actions = slice.actions;

export default slice.reducer;
