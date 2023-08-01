import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@/redux/store";
import { actions as statusAct } from "@/redux/slices/participation/status";
import { selectors as answerSelectors } from "@/redux/slices/participation/answers";
import { shouldShow } from "@/utils/participations/condition-evaluations";
import { EvaluationCondition } from "./types";
import { PageRedux } from "../types";

// ---- INITIAL STATE

// TODO: make the submitable false by default ?
export type PageParticipationRedux = PageRedux & { submitable?: boolean };

// ---- ACTIONS

export type SubmitablePayload = {
  id: string;
  submitable: boolean;
};

// ---- SLICE

const SLICE_NAME = "pages";

const adapter = createEntityAdapter<PageParticipationRedux>({
  selectId: (p) => p.id,
});

export const slice = createSlice({
  name: SLICE_NAME,
  initialState: adapter.getInitialState(),
  reducers: {
    submitable: (state, action: PayloadAction<SubmitablePayload>) => {
      const { id, submitable } = action.payload;
      const changes = { id, changes: { submitable } };
      adapter.updateOne(state, changes);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(statusAct.initialized, (state, action) => {
      adapter.setAll(state, action.payload.pages);
    });
  },
});

// ---- SELECTORS

const entitySelectors = adapter.getSelectors();

const selectById = (state: RootState, pageId: string | undefined): PageParticipationRedux | undefined => {
  if (!pageId) return;
  return entitySelectors.selectById(state.participation.pages, pageId);
};

const selectAll = (state: RootState): PageParticipationRedux[] => entitySelectors.selectAll(state.participation.pages);

// TODO: Memoize this (or maybe compute it inside reducer when adding/updating answers, with extra reducers ?)
// Note to self: Hmm... No, it's a computed property, so it should be computed upon selecting it, with memoization.
// But I should make it straight inside 'selectById', so it's seamless
// The select evaluation COULD return just an evaluated boolean right away, instead of the data needed to make the evaluation
// So then, it could be embeded into the selectById or anywhere else with memoization ?
const selectEvaluation = (state: RootState, pageId: string): EvaluationCondition[] => {
  // Get the question
  const p = entitySelectors.selectById(state.participation.pages, pageId);

  if (!p) return [];
  if (!p.attributes.conditions?.data) return [];

  // Get the related answers
  const evals = p.attributes.conditions.data.reduce((acc, c) => {
    // Check the condition is full

    const targetId = c.attributes?.target?.data?.id;

    if (!c.id || !c.attributes || !targetId) return acc;

    // Gather all elements
    const answer = answerSelectors.selectById(state, targetId);
    const { group, operator, target_value } = c.attributes;

    // Add the evaluation's data
    acc.push({
      id: c.id,
      group,
      operator,
      target_value,
      answer,
    });

    return acc;
  }, [] as EvaluationCondition[]);

  return evals;
};

// TODO: Memoize this (or maybe compute it inside reducer when adding/updating answers, with extra reducers ?)
// Same as above, it's computed, so it should be memoized and deduced WHEN needed (and not recomputed at every answer update)
const selectShown = (state: RootState): PageParticipationRedux[] => {
  const allPages = entitySelectors.selectAll(state.participation.pages);
  const filtered = allPages.reduce((acc, p) => {
    const evaluations = selectEvaluation(state, p.id);

    const show = shouldShow(evaluations);
    if (show) acc.push(p);

    return acc;
  }, [] as PageParticipationRedux[]);

  return filtered;
};

// ---- EXPORT

export const selectors = {
  selectAll,
  selectById,
  selectEvaluation,
  selectShown,
};

export const actions = slice.actions;

export default slice.reducer;
