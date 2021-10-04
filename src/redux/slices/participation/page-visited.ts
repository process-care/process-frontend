import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import IPage from "types/form/page";

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

const SLICE_NAME = 'pages';

const adapter = createEntityAdapter<IPage>({
  selectId: (p) => p.id,
});

export const slice = createSlice({
  name: SLICE_NAME,
  initialState: adapter.getInitialState(),
  reducers: {
    update: (state, action) => {
      console.log('update, man');
    }
  },
  extraReducers: builder => {
    builder.addCase(statusAct.initialized, (state, action) => {
      console.log('initialized pages');
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

export const selectors = {
  selectAll,
  selectById,
};

// ---- ACTIONS

export const actions = slice.actions;

export default slice.reducer;
