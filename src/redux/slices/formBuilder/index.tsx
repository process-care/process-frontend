import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "redux/store";
import IInput from "interfaces/form/input";
import IFormPage from "interfaces/form/page";
import { v4 as uuidv4 } from "uuid";
import ICondition from "interfaces/form/condition";
import IOperator from "interfaces/form/operator";
import { formMock } from "mocks/form";

export interface FormBuilder {
  input_order: IInput["id"][],
  inputs: IInput[];
  selected_input: IInput;
  pages: IFormPage[];
  selected_page: IFormPage;
  conditions: ICondition[];
  selected_condition: {
    id: string;
  };
  is_editing: boolean;
  is_collapse_view: boolean;
  is_removing: ICondition["id"]
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
    [index: string]: IInput | number | boolean | IOperator | string;
  } | null;
}
interface SelectCondition {
  id: string;
}

interface RemoveGroup {
  id: number | string;
}

const initialFirstPage = {
  name: "Page 1",
  id: `page-${uuidv4()}`,
  is_locked: false,
  condition: [],
  short_name: "P1",
};

// Define the initial state using that type
const initialState: FormBuilder = {
  inputs: [],
  input_order: [],
  selected_input: {
    id: "",
    input_type: "text-area",
    internal_title: "",
    name: "",
    page_id: "",
    condition: [],
  },
  pages: [initialFirstPage],
  selected_page: initialFirstPage,
  conditions: [],
  selected_condition: {
    id: "",
  },
  is_editing: false,
  is_collapse_view: false,
  is_removing: ""
};

export const formBuilderSlice = createSlice({
  name: "formBuilder",
  initialState,
  reducers: {
    //Mock
    mockForm: () => formMock,
    // Inputs
    addInput: (state, action: PayloadAction<IInput>) => {
      state.inputs.push(action.payload);
      // Insert the new input in good position (last of the selected page).
      const { id } = state.selected_page
      const inputsInSamePage = state.inputs.filter(i => i.page_id === id)
      const previousId = inputsInSamePage[inputsInSamePage.length - 2].id
      const previousIdx = state.input_order.findIndex(id => id === previousId)
      state.input_order.splice(previousIdx + 1, 0, action.payload.id)
    },
    selectInput: (state, action: PayloadAction<IInput>) => {
      state.selected_input = action.payload;
    },
    updateInputsOrder: (state, action: PayloadAction<IInput["id"][]>) => {
      state.input_order = action.payload;
    },
    setIsEditing: (state, action: PayloadAction<boolean>) => {
      state.is_editing = action.payload;
    },
    setIsRemoving: (state, action: PayloadAction<ICondition["id"]>) => {
      console.log(action.payload)
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
              options: { ...state.inputs[current].options, ...data },
            };
            return;
          }
          state.inputs[current] = { ...state.inputs[current], ...data };
        }
      }
    },
    removeInput: (state, action: PayloadAction<IInput>) => {
      const { id } = action.payload;
      const { inputs, input_order } = state;
      const index = inputs.findIndex((item) => id === item.id);
      inputs.splice(index, 1);
      input_order.splice(index, 1)
    },
    removeAllInputs: (state) => {
      state.inputs = [];
    },
    toggleCollapseView: (state) => {
      state.is_collapse_view = !state.is_collapse_view;
    },
    // PageForm
    addPage: (state, action: PayloadAction<IFormPage>) => {
      state.pages.push(action.payload);
    },
    selectPage: (state, action: PayloadAction<IFormPage>) => {
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
    removePage: (state, action: PayloadAction<IFormPage>) => {
      const { id } = action.payload;
      const { pages } = state;
      const index = pages.findIndex((item) => id === item.id);
      pages.splice(index, 1);
      // reset select page
      state.selected_page = initialState.selected_page;
    },
    // Condition
    addCondition: (state, action: PayloadAction<ICondition>) => {
      // add condition & select it & and add it to selected page.
      const { referer_entity_id, id } = action.payload;
      const { conditions, pages, inputs } = state;
      let index = pages.findIndex((item) => referer_entity_id === item.id);

      conditions.push(action.payload);
      // if condition is related to input
      if (index === undefined) {
        index = inputs.findIndex((item) => referer_entity_id === item.id);
        inputs[index]?.condition?.push(id);
      } else pages[index]?.condition.push(id);
    },
    updateCondition: (state, action: PayloadAction<UpdateCondition>) => {
      const { id, data } = action.payload;
      if (data) {
        const current = state.conditions.findIndex((el) => el.id === id);
        state.conditions[current] = { ...state.conditions[current], ...data };
      }
    },
    selectCondition: (state, action: PayloadAction<SelectCondition>) => {
      if (action.payload.id === "") {
        state.selected_condition = { id: "" };
      }
      state.selected_condition.id = action.payload.id;
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
        (c) => c.referer_entity_id === currentGrouptoRemove[0].referer_entity_id
      );
      const otherConditionToSelect = state.conditions.filter(
        (c) => c.referer_entity_id === currentGrouptoRemove[0].referer_entity_id
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
  addCondition,
  selectCondition,
  updateCondition,
  removeCondition,
  mockForm,
  removeConditionGroup,
} = formBuilderSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export const selectInputsInCurrentPage = (state: RootState): IInput[] =>
  state.formBuilder.inputs.filter(
    (input) => input.page_id === state.formBuilder.selected_page.id
  );

export const selectConditonInCurrentPage = (state: RootState): ICondition[] =>
  state.formBuilder.conditions.filter(
    (condition) =>
      condition.referer_entity_id === state.formBuilder.selected_page.id
  );

export const getSelectedConditionData = (
  state: RootState
): ICondition | undefined =>
  state.formBuilder.conditions.find(
    (condition) => condition.id === state.formBuilder.selected_condition.id
  );

export const getRefererIdInCurrentCondition = (state: RootState): any => {
  const selected_condition = getSelectedConditionData(state);
  if (selected_condition?.condition_type === "page") {
    return state.formBuilder.pages
      .filter((page) => page.id === selected_condition?.referer_entity_id)
      .shift();
  } else {
    return state.formBuilder.inputs
      .filter((i) => i.id === selected_condition?.referer_entity_id)
      .shift();
  }
};

export const getConditionData = (state: RootState): ICondition[] | [] =>
  state.formBuilder.conditions.filter(
    (condition) =>
      condition.referer_entity_id ===
      getSelectedConditionData(state)?.referer_entity_id
  );


export default formBuilderSlice.reducer;
