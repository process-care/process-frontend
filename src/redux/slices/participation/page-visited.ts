import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import IPage from "types/form/page";

import { RootState } from "redux/store";
import { actions as statusAct } from 'redux/slices/participation/status';
import { selectors as answerSelectors } from 'redux/slices/participation/answers';
import { EvaluationCondition } from "call/actions/formBuider/question";
import { shouldShow } from "pages/Survey/Participation/Form/condition-evaluations";

// ---- TYPES
// Nothing so far.

// ---- INITIAL STATE
// None for now...

// ---- SLICE

const SLICE_NAME = 'pages';

const adapter = createEntityAdapter<IPage>({
  selectId: (p) => p.id,
});

export const slice = createSlice({
  name: SLICE_NAME,
  initialState: adapter.getInitialState(),
  reducers: {
    // TODO: Remove unused demo placeholder
    update: (_state, _action) => {
      console.log('Update, man');
    }
  },
  extraReducers: builder => {
    builder.addCase(statusAct.initialized, (state, action) => {
      adapter.setAll(state, action.payload.pages);
    });
  }
});

// ---- SELECTORS

const entitySelectors = adapter.getSelectors();

const selectById = (state: RootState, pageId: string | undefined): IPage | undefined => {
  if (!pageId) return;
  return entitySelectors.selectById(state.participation.pages, pageId);
};

const selectAll = (state: RootState): IPage[] => entitySelectors.selectAll(state.participation.pages);

// TODO: Memoize this (or maybe compute it inside reducer when adding/updating answers, with extra reducers ?)
// Note to self: Hmm... No, it's a computed property, so it should be computed upon selecting it, with memoization.
// But I should make it straight inside 'selectById', so it's seamless
// The select evaluation COULD return just an evaluated boolean right away, instead of the data needed to make the evaluation
// So then, it could be embeded into the selectById or anywhere else with memoization ?
const selectEvaluation = (state: RootState, pageId: string): EvaluationCondition[] => {
  // Get the question
  const p = entitySelectors.selectById(state.participation.pages, pageId);

  if (!p) return [];
  if (!p.conditions) return [];

  // Get the related answers
  const evals = p.conditions.reduce((acc, c) => {
    const { id, group, operator, target_value, target } = c;
    if (!target) return acc;

    const answer = answerSelectors.selectById(state, target.id)

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

// TODO: Memoize this (or maybe compute it inside reducer when adding/updating answers, with extra reducers ?)
// Same as above, it's computed, so it should be memoized and deduced WHEN needed (and not recomputed at every answer update)
const selectShown = (state: RootState): IPage[] => {
  const allPages = entitySelectors.selectAll(state.participation.pages)

  const filtered = allPages.reduce((acc, p) => {
    const evaluations = selectEvaluation(state, p.id);
    const show = shouldShow(evaluations);
    if (show) acc.push(p);
    return acc;
  }, [] as IPage[]);

  return filtered;
}

// ---- EXPORT

export const selectors = {
  selectAll,
  selectById,
  selectEvaluation,
  selectShown,
};

export const actions = slice.actions;

export default slice.reducer;
