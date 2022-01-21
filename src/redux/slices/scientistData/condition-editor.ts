import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
  Update,
} from "@reduxjs/toolkit";

// import type { RootState } from "redux/store";
import { RootState } from "redux/store";
import { DateTime } from "luxon";
import { GlobalState } from "../scientistData";
import { Maybe } from "api/graphql/types.generated";
import { ConditionRedux } from "../types";

// ----- ENTITY ADAPTER

export const conditionAdapter = createEntityAdapter<ConditionRedux>({
  selectId: (condition) => condition.id,
});

// ---- TYPES

export interface ConditionEditor {
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

type UnorderedError = {
  conditionId: string;
  targetId: string;
};

type ConditionError = {
  conditionId: string;
  message: string;
};

type QuestionStatus = {
  questionId: string;
  valid: boolean;
  errors: [ConditionError];
  unordered: [UnorderedError];
};

type PageStatus = {
  pageId: string;
  valid: boolean;
  errors: [QuestionStatus];
};

export interface CheckSurvey {
  checkSurvey: {
    valid: boolean;
    errors: [PageStatus];
  };
}
// ---- STATE

export const initialConditionState: ConditionEditor = {
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

// This type seems to be unused
// type UpdatePayload = {
//   changes: ConditionRedux["attributes"];
// };

type UpdatedPayload = {
  lastUpdated: string;
};

type DeletedPayload = {
  lastDeleted: string;
};
type DeleteGroupPayload = {
  groupId: Maybe<string> | undefined;
  conditionsId: string[];
};

type SavedPayload = {
  lastSaved: string;
  // Api payload don't send the same conditon referer page type
  condition: Record<string, any>;
};
type InitializePayload = {
  questionsIds: string[];
  pagesIds: string[];
};
type CreatePayload = {
  refererId: Maybe<string> | undefined;
  // TODO: REFACTO check why ConditionRedux["attributes"]["type"] is not working
  // type: ConditionRedux["attributes"]["type"];
  type: "question" | "page";
  group?: Maybe<string> | undefined;
};

type CreatedPayload = {
  lastCreated: string;
  condition: ConditionRedux;
  step: number;
  isValid: boolean;
  redirectToPage: string;
};

// ----- SLICE
const SLICE_NAME = "condition-editor";

export const conditionSlice = createSlice({
  name: SLICE_NAME,
  initialState: conditionAdapter.getInitialState(initialConditionState),
  reducers: {
    initialize: (state, _action: PayloadAction<InitializePayload>) => {
      state.isLoading = true;
    },
    initialized: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      conditionAdapter.setMany(state, action.payload);
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
    // TODO: Refacto Remove any
    update: (state, action: PayloadAction<any>) => {
      state.lastUpdated = new Date().toISOString();
      conditionAdapter.updateOne(state, action.payload);
    },
    updated: (state, action: PayloadAction<UpdatedPayload>) => {
      state.lastUpdated = action.payload.lastUpdated;
    },
    delete: (state, action: PayloadAction<string>) => {
      state.isDeleting = true;
      conditionAdapter.removeOne(state, action.payload);
      const groupId = action.payload;
      const entities = conditionAdapter.getSelectors().selectAll(state);
      const currentGroup = entities.find(
        (e) => e?.attributes?.group === groupId
      )?.attributes?.group;
      const sameGroup = entities.filter(
        (e) => e?.attributes?.group === currentGroup
      );
      if (sameGroup.length === 0) state.selectedCondition = "";
      if (sameGroup.length > 0) {
        state.selectedCondition = sameGroup[0].id;
      }
    },
    deleted: (state, action: PayloadAction<DeletedPayload>) => {
      state.isDeleting = false;
      state.lastDeleted = action.payload.lastDeleted;
    },
    deleteGroup: (state, action: PayloadAction<DeleteGroupPayload>) => {
      state.isDeleting = true;
      conditionAdapter.removeMany(state, action.payload.conditionsId);
      const { groupId } = action.payload;
      const entities = conditionAdapter.getSelectors().selectAll(state);
      const sameGroup = entities.filter(
        (e) => e?.attributes?.group === groupId
      );
      if (sameGroup.length === 0) state.selectedCondition = "";
      if (sameGroup.length > 0) {
        state.selectedCondition = sameGroup[0].id;
      }
    },
    deletedGroup: (state, action: PayloadAction<DeletedPayload>) => {
      state.isDeleting = false;
      state.lastDeleted = action.payload.lastDeleted;
    },
    save: (state, _action: PayloadAction) => {
      state.isSaving = true;
    },
    saved: (state, action: PayloadAction<SavedPayload>) => {
      state.isSaving = false;
      state.lastSaved = action.payload.lastSaved;
      state.selectedCondition = "";
    },
    failed: (state, action: PayloadAction<string>) => {
      state.isFailed = true;
      state.error = action.payload;
    },
    setSelectedCondition: (state, action: PayloadAction<string>) => {
      state.selectedCondition = action.payload;
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    setValidity: (state, action: PayloadAction<boolean>) => {
      state.isValid = action.payload;
    },
    reset: () => conditionAdapter.getInitialState(initialConditionState),
  },
});

// ---- SELECTORS

export const error = (state: RootState): string | undefined =>
  state.scientistData.questions.error;
export const isLoading = (state: RootState): boolean =>
  state.scientistData.questions.isLoading;
export const hasChanges = (state: RootState): boolean => {
  const updated = DateTime.fromISO(state.scientistData.questions.lastUpdated);
  const saved = DateTime.fromISO(state.scientistData.questions.lastSaved);
  return updated > saved;
};

export const getAllConditions = (state: RootState): ConditionRedux[] =>
  conditionAdapter.getSelectors().selectAll(state.scientistData.conditions);

export const getAllQuestionsConditionsInSelectedPage = (
  state: RootState
): ConditionRedux[] => {
  return getAllConditions(state).filter(
    (condition) =>
      condition?.attributes.type === "question" &&
      condition?.attributes.referer_question?.data?.attributes?.page?.data
        ?.id === state.scientistData.pages.selectedPage
  );
};

const getSelectedConditionId = (state: RootState): string =>
  state.scientistData.conditions.selectedCondition;

const getStep = (state: RootState): number =>
  state.scientistData.conditions.step;
const getValidity = (state: RootState): boolean =>
  state.scientistData.conditions.isValid;

const getSelectedPageConditions = (state: RootState): ConditionRedux[] => {
  return getAllConditions(state).filter(
    (condition) =>
      condition?.attributes?.referer_page?.data?.id ===
      state.scientistData.pages.selectedPage
  );
};

const getConditionsByPageId = (
  state: RootState,
  pageId: string
): ConditionRedux[] => {
  return getAllConditions(state).filter(
    (condition) => condition?.attributes?.referer_page?.data?.id === pageId
  );
};

const getConditionsByQuestionId = (
  state: RootState,
  questionsId: string
): ConditionRedux[] => {
  return getAllConditions(state).filter(
    (condition) =>
      condition?.attributes?.referer_question?.data?.id === questionsId
  );
};

const getSelectedQuestionsConditions = (state: RootState): ConditionRedux[] => {
  return getAllConditions(state).filter(
    (condition) =>
      condition.attributes?.referer_question?.data?.id ===
      state.scientistData.questions.selectedQuestion
  );
};

const getSelectedCondition = (state: RootState): ConditionRedux | undefined =>
  conditionAdapter
    .getSelectors()
    .selectById(state.scientistData.conditions, getSelectedConditionId(state));

export const conditionsSelectors = {
  error,
  isLoading,
  hasChanges,
  getAllConditions,
  getSelectedConditionId,
  getSelectedCondition,
  getSelectedPageConditions,
  getSelectedQuestionsConditions,
  getStep,
  getValidity,
  getConditionsByPageId,
  getConditionsByQuestionId,
  getAllQuestionsConditionsInSelectedPage,
};

// ---- EXPORTS

export const actions = conditionSlice.actions;
export default conditionSlice.reducer;

export const conditionsReducers = {
  createCondition: (
    state: GlobalState,
    _action: PayloadAction<CreatePayload>
  ): void => {
    state.conditions.isCreating = true;
  },
  createdCondition: (
    state: GlobalState,
    action: PayloadAction<CreatedPayload>
  ): void => {
    state.conditions.isCreating = false;
    state.conditions.lastCreated = action.payload.lastCreated;
    conditionAdapter.addOne(state.conditions, action.payload.condition);
    state.conditions.selectedCondition = action.payload.condition.id;
    state.conditions.step = action.payload.step;
    state.conditions.isValid = action.payload.isValid;
    state.pages.redirectToPage = action.payload.redirectToPage;
  },
  updateCondition: (
    state: GlobalState,
    action: PayloadAction<Update<ConditionRedux>>
  ): void => {
    state.conditions.lastUpdated = new Date().toISOString();
    conditionAdapter.updateOne(state.conditions, action.payload);
  },
  updatedCondition: (
    state: GlobalState,
    action: PayloadAction<UpdatedPayload>
  ): void => {
    state.conditions.lastUpdated = action.payload.lastUpdated;
  },
  deleteCondition: (
    state: GlobalState,
    action: PayloadAction<string>
  ): void => {
    state.conditions.isDeleting = true;
    conditionAdapter.removeOne(state.conditions, action.payload);
    const groupId = action.payload;
    const entities = conditionAdapter
      .getSelectors()
      .selectAll(state.conditions);
    const currentGroup = entities.find((e) => e?.attributes?.group === groupId)
      ?.attributes?.group;
    const sameGroup = entities.filter(
      (e) => e?.attributes?.group === currentGroup
    );
    if (sameGroup.length === 0) state.conditions.selectedCondition = "";
    if (sameGroup.length > 0) {
      state.conditions.selectedCondition = sameGroup[0].id;
    }
  },
  deletedCondition: (
    state: GlobalState,
    action: PayloadAction<DeletedPayload>
  ): void => {
    state.conditions.isDeleting = false;
    state.conditions.lastDeleted = action.payload.lastDeleted;
  },
  deleteGroupCondition: (
    state: GlobalState,
    action: PayloadAction<DeleteGroupPayload>
  ): void => {
    state.conditions.isDeleting = true;
    conditionAdapter.removeMany(state.conditions, action.payload.conditionsId);
    const { groupId } = action.payload;
    const entities = conditionAdapter
      .getSelectors()
      .selectAll(state.conditions);
    const sameGroup = entities.filter((e) => e?.attributes?.group === groupId);
    if (sameGroup.length === 0) state.conditions.selectedCondition = "";
    if (sameGroup.length > 0) {
      state.conditions.selectedCondition = sameGroup[0].id;
    }
  },
  deletedGroupCondition: (
    state: GlobalState,
    action: PayloadAction<DeletedPayload>
  ): void => {
    state.conditions.isDeleting = false;
    state.conditions.lastDeleted = action.payload.lastDeleted;
  },
  saveCondition: (state: GlobalState, _action: PayloadAction): void => {
    state.conditions.isSaving = true;
  },
  savedCondition: (
    state: GlobalState,
    action: PayloadAction<SavedPayload>
  ): void => {
    state.conditions.isSaving = false;
    state.conditions.lastSaved = action.payload.lastSaved;
    state.conditions.selectedCondition = "";
    if (state.pages.redirectToPage) {
      state.pages.selectedPage = state.pages.redirectToPage;
    }
  },
  failedCondition: (
    state: GlobalState,
    action: PayloadAction<string>
  ): void => {
    state.conditions.isFailed = true;
    state.conditions.error = action.payload;
  },
  setSelectedCondition: (
    state: GlobalState,
    action: PayloadAction<string>
  ): void => {
    state.conditions.selectedCondition = action.payload;
  },
  setStepCondition: (
    state: GlobalState,
    action: PayloadAction<number>
  ): void => {
    state.conditions.step = action.payload;
  },
  setValidityCondition: (
    state: GlobalState,
    action: PayloadAction<boolean>
  ): void => {
    state.conditions.isValid = action.payload;
  },
};
