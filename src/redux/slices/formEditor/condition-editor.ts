import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

// import type { RootState } from "redux/store";
import { RootState } from "redux/store";
import { DateTime } from "luxon";
import ICondition from "types/form/condition";

// ----- ENTITY ADAPTER

const conditionAdapter = createEntityAdapter<ICondition>({
  selectId: (condition) => condition.id,
});

// ---- TYPES

export interface QuestionEditor {
  // Questions status
  selectedCondition: string;
  step: number;
  isCreating: boolean;
  isLoading: boolean;
  isSaving: boolean;
  isFailed: boolean;
  isDeleting: boolean;
  error?: string;
  lastUpdated: string;
  lastSaved: string;
  lastCreated: string;
  lastDeleted: string;
  isValid: boolean;
}

// ---- STATE

const initialState: QuestionEditor = {
  isValid: false,
  step: 1,
  isCreating: false,
  isLoading: true,
  isSaving: false,
  isFailed: false,
  isDeleting: false,
  lastUpdated: new Date().toISOString(),
  lastSaved: new Date().toISOString(),
  lastCreated: new Date().toISOString(),
  lastDeleted: new Date().toISOString(),
  selectedCondition: "",
};

// ----- ACTIONS

type UpdatePayload = {
  id: string;
  changes: Partial<ICondition>;
};

type UpdatedPayload = {
  lastUpdated: string;
};

type DeletedPayload = {
  lastDeleted: string;
};

type SavedPayload = {
  lastSaved: string;
};

type CreatePayload = {
  refererId: string;
  type: ICondition["type"];
  group?: string;
};

type CreatedPayload = {
  lastCreated: string;
  condition: ICondition;
  step: number;
  isValid: boolean;
};

// ----- SLICE
const SLICE_NAME = "condition-editor";

export const conditionSlice = createSlice({
  name: SLICE_NAME,
  initialState: conditionAdapter.getInitialState(initialState),
  reducers: {
    initialize: (state, _action: PayloadAction<string>) => {
      state.isLoading = true;
    },
    initialized: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      conditionAdapter.setMany(state, action.payload);
      if (action.payload[0]) state.selectedCondition = action.payload[0].id;
    },
    create: (state, _action: PayloadAction<CreatePayload>) => {
      state.isCreating = true;
    },
    created: (state, action: PayloadAction<CreatedPayload>) => {
      state.isCreating = false;
      state.lastCreated = action.payload.lastCreated;
      conditionAdapter.addOne(state, action.payload.condition);
      state.selectedCondition = action.payload.condition.id;
      state.step = action.payload.step;
      state.isValid = action.payload.isValid;
    },
    update: (state, action: PayloadAction<UpdatePayload>) => {
      state.lastUpdated = new Date().toISOString();
      conditionAdapter.updateOne(state, action.payload);
    },
    updated: (state, action: PayloadAction<UpdatedPayload>) => {
      state.lastUpdated = action.payload.lastUpdated;
    },
    delete: (state, action: PayloadAction<string>) => {
      state.isDeleting = true;
      conditionAdapter.removeOne(state, action.payload);
      const lastConditionId = state.ids.length - 1;

      if (lastConditionId !== -1) {
        state.selectedCondition = state.ids[lastConditionId].toString();
      } else {
        state.selectedCondition = "";
      }
    },
    deleted: (state, action: PayloadAction<DeletedPayload>) => {
      state.isDeleting = false;
      state.lastDeleted = action.payload.lastDeleted;
    },
    save: (state, _action: PayloadAction) => {
      state.isSaving = true;
    },
    saved: (state, action: PayloadAction<SavedPayload>) => {
      state.isSaving = false;
      state.lastSaved = action.payload.lastSaved;
    },
    failed: (state, action: PayloadAction<string>) => {
      state.isFailed = true;
      state.error = action.payload;
    },
    setselectedCondition: (state, action: PayloadAction<string>) => {
      state.selectedCondition = action.payload;
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    setValidity: (state, action: PayloadAction<boolean>) => {
      state.isValid = action.payload;
    },
    reset: () => conditionAdapter.getInitialState(initialState),
  },
});

// ---- SELECTORS

export const error = (state: RootState): string | undefined =>
  state.formEditor.questions.error;
export const isLoading = (state: RootState): boolean =>
  state.formEditor.questions.isLoading;
export const hasChanges = (state: RootState): boolean => {
  const updated = DateTime.fromISO(state.formEditor.questions.lastUpdated);
  const saved = DateTime.fromISO(state.formEditor.questions.lastSaved);
  return updated > saved;
};

export const conditions = (state: RootState): ICondition[] =>
  conditionAdapter.getSelectors().selectAll(state.formEditor.conditions);

const getSelectedConditionId = (state: RootState): string =>
  state.formEditor.conditions.selectedCondition;

const getStep = (state: RootState): number => state.formEditor.conditions.step;
const getValidity = (state: RootState): boolean =>
  state.formEditor.conditions.isValid;

const getSelectedPageConditions = (state: RootState): ICondition[] => {
  return conditions(state).filter(
    (condition) =>
      condition.referer_page?.id === state.formEditor.pages.selectedPage
  );
};
const getSelectedQuestionsConditions = (state: RootState): ICondition[] => {
  return conditions(state).filter(
    (condition) =>
      condition.referer_question?.id ===
      state.formEditor.questions.selectedQuestion
  );
};

const getSelectedCondition = (state: RootState): ICondition | undefined =>
  conditionAdapter
    .getSelectors()
    .selectById(state.formEditor.conditions, getSelectedConditionId(state));

export const selectors = {
  error,
  isLoading,
  hasChanges,
  conditions,
  getSelectedConditionId,
  getSelectedCondition,
  getSelectedPageConditions,
  getSelectedQuestionsConditions,
  getStep,
  getValidity,
};

// ---- EXPORTS

export const actions = conditionSlice.actions;
export default conditionSlice.reducer;
