import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import IQuestion from "types/form/question";

import { actions as statusAct } from 'redux/slices/participation/status';
import { RootState } from "redux/store";
import { selectors as answerSelectors } from 'redux/slices/participation/answers';
import { EvaluationCondition } from "call/actions/formBuider/question";

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

const SLICE_NAME = 'questions';

const adapter = createEntityAdapter<IQuestion>({
  selectId: (q) => q.id,
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
      console.log('initialized questions');
      adapter.setAll(state, action.payload.questions);
    });
  }
});

// ---- SELECTORS

const entitySelectors = adapter.getSelectors();

const selectById = (state: RootState, questionId: string | undefined): IQuestion | undefined => {
  if (!questionId) return;
  return entitySelectors.selectById(state.participation.questions, questionId);
};

const selectAll = (state: RootState): IQuestion[] => entitySelectors.selectAll(state.participation.questions);

const selectEvaluation = (state: RootState, questionId: string): EvaluationCondition[] => {
  // Get the question
  const q = entitySelectors.selectById(state.participation.questions, questionId);
  if (!q) return [];
  if (!q.conditions) return [];

  // Get the related answers
  const evals = q.conditions.reduce((acc, c) => {
    const { id, group, operator, target_value, target } = c;
    if (!target) return acc;

    const answer = answerSelectors.selectById(state, target.id)
    if (!answer) return acc;

    acc.push({
      id,
      group,
      operator,
      target_value,
      answer: answer?.value,
    });
    
    return acc;
  }, [] as EvaluationCondition[]);

  return evals;
};

export const selectors = {
  selectAll,
  selectById,
  selectEvaluation,
};

// ---- ACTIONS

export const actions = slice.actions;

export default slice.reducer;
