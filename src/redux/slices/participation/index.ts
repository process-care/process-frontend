import { Action, createSlice } from "@reduxjs/toolkit";

// ---- TYPES

type CreatedPayload = {
  id: string,
}

// ---- INITIAL STATE

interface SliceState {
  id?: string
  consent: boolean
  completed: boolean
  startedAt?: string
  completedAt?: string
}

const initialState: SliceState = {
  consent: false,
  completed: false,
};

// ---- SLICE

export const slice = createSlice({
  name: "participation",
  initialState,
  reducers: {
    started: (state) => {
      state.consent = true,
      state.startedAt = new Date().toString();
    },
    created: (state, action) => {
      state.id = action.payload.id
    },
    completed: (state) => {
      state.completed = true;
      state.completedAt = new Date().toString();
    },
  },
});

// ---- ACTIONS

export const actions = slice.actions;

export default slice.reducer;
