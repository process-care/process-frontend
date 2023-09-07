import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { actions as statusAct } from "@/redux/slices/participation/status.js"
import { RootState } from "@/redux/store/index.js";
import { selectors as answerSelectors } from "@/redux/slices/participation/answers.js"
import { EvaluationCondition } from "./types.js"
import { QuestionRedux } from "../types/index.js"

// ---- SLICE

const SLICE_NAME = "questions";

const adapter = createEntityAdapter<QuestionRedux>({
  selectId: (q) => q.id,
});

export const slice = createSlice({
  name: SLICE_NAME,
  initialState: adapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(statusAct.initialized, (state, action) => {
      adapter.setAll(state, action.payload.questions);
    });
  },
});

// ---- SELECTORS

const entitySelectors = adapter.getSelectors();

const selectById = (state: RootState, questionId: string | undefined): QuestionRedux | undefined => {
  if (!questionId) return;
  return entitySelectors.selectById(state.participation.questions, questionId);
};

const selectAll = (state: RootState): QuestionRedux[] => entitySelectors.selectAll(state.participation.questions);

// TODO: see the comments in "page-visited" slice => maybe this should return the boolean right away, instead
// of the data to compute the evaluation. So the logic is embeded into the redux, and it only exposes a props
// that the UI can use mindlessly. It could also be better memoized like that, I guess ?
const selectEvaluation = (state: RootState, questionId: string): EvaluationCondition[] => {
  // Get the question
  const q = entitySelectors.selectById(state.participation.questions, questionId);
  if (!q) return [];

  const data = q.attributes.conditions?.data;
  if (!data) return [];

  // Get the related answers
  const evals = data.reduce((acc, c) => {
    const targetId = c.attributes?.target?.data?.id;
    if (!c.id || !c.attributes || !targetId) return acc;

    const answer = answerSelectors.selectById(state, targetId);
    const { group, operator, target_value } = c.attributes;

    acc.push({
      id: c.id,
      group,
      operator,
      target_value,
      answer: answer?.value,
    });

    return acc;
  }, [] as EvaluationCondition[]);

  return evals;
};

// ---- EXPORTS

export const selectors = {
  selectAll,
  selectById,
  selectEvaluation,
};

export const actions = slice.actions;

export default slice.reducer;
