import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "redux/store";
import IQuestion from "interfaces/form/question";
import IPage from "interfaces/form/page";
import ICondition from "interfaces/form/condition";
import IOperator from "interfaces/form/operator";
import { formMock } from "mocks/form";

export interface FormBuilder {
  input_order: IQuestion["id"][];
  inputs: IQuestion[];
  selected_input: IQuestion | Record<string, any>;
  pages: IPage[];
  selected_page: IPage | Record<string, any>;
  conditions: ICondition[];
  selected_condition: ICondition | Record<string, any>;
  is_editing: boolean;
  is_collapse_view: boolean;
  is_removing: ICondition["id"];
}
interface Update {
  id: string | undefined;
  data: {
    [index: string]: string | undefined;
  } | null;
}

interface UpdateCondition {
  id: string | undefined;
  data: {
    [index: string]: IQuestion | number | boolean | IOperator | string;
  } | null;
}
interface SelectCondition {
  id: string;
  type?: string;
}

interface RemoveGroup {
  id: number | string;
}

// Define the initial state using that type
const initialState: FormBuilder = {
  inputs: [],
  input_order: [],
  selected_input: {},
  pages: [],
  selected_page: {},
  conditions: [],
  selected_condition: {},
  is_editing: false,
  is_collapse_view: false,
  is_removing: "",
};

export const formBuilderSlice = createSlice({
  name: "formBuilder",
  initialState,
  reducers: {
    //Mock
    mockForm: () => formMock,
    // Inputs
    addInput: (state, action: PayloadAction<IQuestion>) => {
      state.inputs.push(action.payload);
      // Insert the new input in good position (last of the selected page).
      const { id } = state.selected_page;
      const inputsInSamePage = state.inputs.filter((i) => i.page === id);
      const previousId = inputsInSamePage[inputsInSamePage.length - 2]?.id;
      const previousIdx = state.input_order.findIndex(
        (id) => id === previousId
      );
      if (previousIdx !== undefined) {
        state.input_order.splice(previousIdx + 1, 0, action.payload.id);
      } else state.input_order.push(action.payload.id);
    },
    selectInput: (state, action: PayloadAction<IQuestion>) => {
      state.selected_input = action.payload;
    },
    updateInputsOrder: (state, action: PayloadAction<IQuestion["id"][]>) => {
      state.input_order = action.payload;
    },
    setIsEditing: (state, action: PayloadAction<boolean>) => {
      state.is_editing = action.payload;
    },
    setIsRemoving: (state, action: PayloadAction<ICondition["id"]>) => {
      state.is_removing = action.payload;
    },
    updateInput: (state, action: PayloadAction<Update>) => {
      const { id, data } = action.payload;
      if (data) {
        for (const [key] of Object.entries(data)) {
          const current = state.inputs.findIndex((el) => el.id === id);

          if (key.includes("option")) {
            state.inputs[current] = {
              ...state.inputs[current],
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              answers: { ...state.inputs[current].answers, ...data },
            };
            return;
          }
          state.inputs[current] = { ...state.inputs[current], ...data };
        }
      }
    },
    removeInput: (
      state,
      action: PayloadAction<IQuestion | Record<string, any>>
    ) => {
      const { id } = action.payload;
      const { inputs, input_order } = state;
      const index = inputs.findIndex((item) => id === item.id);
      inputs.splice(index, 1);
      input_order.splice(index, 1);
    },
    removeAllInputs: (state) => {
      state.inputs = [];
    },
    toggleCollapseView: (state) => {
      state.is_collapse_view = !state.is_collapse_view;
    },
    // PageForm
    addPage: (state, action: PayloadAction<IPage>) => {
      state.pages.push(action.payload);
    },
    selectPage: (state, action: PayloadAction<IPage>) => {
      state.selected_page = action.payload;
    },

    updatePage: (state, action: PayloadAction<Update>) => {
      const { id, data } = action.payload;
      if (data) {
        const current = state.pages.findIndex((el) => el.id === id);
        state.pages[current] = { ...state.pages[current], ...data };
        state.selected_page = { ...state.selected_page, ...data };
      }
    },
    removePage: (state, action: PayloadAction<IPage>) => {
      const { id } = action.payload;
      const { pages } = state;
      const index = pages.findIndex((item) => id === item.id);
      pages.splice(index, 1);
      // reset select page
      state.selected_page = initialState.selected_page;
    },

    updateCondition: (state, action: PayloadAction<UpdateCondition>) => {
      const { id, data } = action.payload;
      if (data) {
        const current = state.conditions.findIndex((el) => el.id === id);
        state.conditions[current] = { ...state.conditions[current], ...data };
      }
    },
    selectCondition: (
      state,
      action: PayloadAction<SelectCondition | Record<string, any>>
    ) => {
      // if (action.payload.id === "") {
      //   state.selected_condition = { id: "" };
      // }
      state.selected_condition = action.payload;
    },
    removeCondition: (state, action: PayloadAction<SelectCondition>) => {
      const { id } = action.payload;
      const { conditions } = state;
      const currentGroup = state.conditions.find((c) => c.id === id)?.group.id;
      const conditionsInSameGroup = state.conditions
        .filter((c) => c.group.id === currentGroup)
        .filter((c) => c.id !== id);
      const index = conditions.findIndex((item) => id === item.id);
      // remove from condition
      conditions.splice(index, 1);

      //  Si on delete la condition selectionnée
      //  Soit on selectionne une condition d'un autre groupe de la même page
      //  Si il n'y en a pas on reset la condition séléctionnée, le tiroir se ferme.

      if (state.selected_condition.id === id) {
        if (conditionsInSameGroup[0]?.id) {
          state.selected_condition.id = conditionsInSameGroup[0]?.id;
        } else state.selected_condition.id = "";
      }
    },
    removeConditionGroup: (state, action: PayloadAction<RemoveGroup>) => {
      const { id } = action.payload;
      const currentGrouptoRemove = state.conditions.filter(
        (c) => c.group.id === id
      );
      state.conditions = state.conditions.filter(
        (c) => currentGrouptoRemove.indexOf(c) < 0
      );

      //  Si on delete la condition selectionnée
      //  Soit on selectionne une condition d'un autre groupe de la même page
      //  Si il n'y en a pas on reset la condition séléctionnée, le tiroir se ferme.

      const selectedConditionIsRemoving = currentGrouptoRemove.find(
        (c) => c.id === state.selected_condition.id
      );
      const currentPageHasOtherConditions = state.conditions.find(
        (c) => c.referer_id === currentGrouptoRemove[0].referer_id
      );
      const otherConditionToSelect = state.conditions.filter(
        (c) => c.referer_id === currentGrouptoRemove[0].referer_id
      )[0]?.id;
      if (selectedConditionIsRemoving) {
        if (currentPageHasOtherConditions) {
          state.selected_condition.id = otherConditionToSelect;
        } else {
          state.selected_condition.id = "";
        }
      }
    },
  },
});

export const {
  addInput,
  removeAllInputs,
  removeInput,
  updateInput,
  updateInputsOrder,
  selectInput,
  setIsEditing,
  setIsRemoving,
  toggleCollapseView,
  addPage,
  removePage,
  selectPage,
  updatePage,
  selectCondition,
  updateCondition,
  removeCondition,
  mockForm,
  removeConditionGroup,
} = formBuilderSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export const selectInputsInCurrentPage = (state: RootState): IQuestion[] =>
  state.formBuilder.inputs.filter(
    (input) => input.page === state.formBuilder.selected_page.id
  );

export const selectConditonInCurrentPage = (state: RootState): ICondition[] =>
  state.formBuilder.conditions.filter(
    (condition) => condition.referer_id === state.formBuilder.selected_page.id
  );

export const getSelectedConditionData = (
  state: RootState
): ICondition | undefined =>
  state.formBuilder.conditions.find(
    (condition) => condition.id === state.formBuilder.selected_condition.id
  );

export const getRefererIdInCurrentCondition = (state: RootState): any => {
  const selected_condition = getSelectedConditionData(state);
  if (selected_condition?.type === "page") {
    return state.formBuilder.pages
      .filter((page) => page.id === selected_condition?.referer_id)
      .shift();
  } else {
    return state.formBuilder.inputs
      .filter((i) => i.id === selected_condition?.referer_id)
      .shift();
  }
};

export const getConditionData = (state: RootState): ICondition[] | [] =>
  state.formBuilder.conditions.filter(
    (condition) =>
      condition.referer_id === getSelectedConditionData(state)?.referer_id
  );

export default formBuilderSlice.reducer;
