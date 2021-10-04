import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Answer } from "call/actions/answers";

import { actions as statusAct } from 'redux/slices/participation/status';
import { RootState } from "redux/store";

// ---- TYPES

// type CreatedPayload = {
//   id: string;
// };

// ---- INITIAL STATE

interface SliceState {
  maybe: boolean;
}

const initialState: SliceState = {
  maybe: false,
};

// ---- SLICE

const SLICE_NAME = 'answers';

const adapter = createEntityAdapter<Answer>({
  selectId: (a) => a.question.id,
});

export const slice = createSlice({
  name: SLICE_NAME,
  initialState: adapter.getInitialState(),
  reducers: {
    initialize: (state) => {
      console.log('yolo');
    },
  },
  extraReducers: builder => {
    builder.addCase(statusAct.initialized, (state, action) => {
      console.log('initialized answers');
      adapter.setAll(state, action.payload.answers);
    });
  }
});

// ---- SELECTORS

const entitySelectors = adapter.getSelectors();

const selectById = (state: RootState, questionId: string | undefined): Answer | undefined => {
  if (!questionId) return;
  return entitySelectors.selectById(state.participation.answers, questionId);
};

const selectByIds = (state: RootState, questionsId: string[]): Answer[] => {
  const answerState = state.participation.answers;

  const answers = questionsId.reduce((acc, qId) => {
    const answer = entitySelectors.selectById(answerState, qId);
    if (answer) acc.push(answer);
    return acc;
  }, [] as Answer[]);
    
  return answers;
};

const selectAll = (state: RootState): Answer[] => entitySelectors.selectAll(state.participation.answers);

export const selectors = {
  selectAll,
  selectById,
  selectByIds,
};

// ---- ACTIONS

export const actions = slice.actions;

export default slice.reducer;
