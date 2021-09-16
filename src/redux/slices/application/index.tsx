import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPreview {
  preview_mode: "form" | "landing" | null;
}

interface Application {
  drawer_is_open: boolean;
  preview_mode: "form" | "landing" | null;
  is_saving: boolean;
}

const initialState: Application = {
  drawer_is_open: false,
  preview_mode: null,
  is_saving: false,
};

export const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    toogleDrawer: (state) => {
      state.drawer_is_open = !state.drawer_is_open;
    },
    setAutoSave: (state) => {
      state.is_saving = !state.is_saving;
    },
    tooglePreview: (state, action: PayloadAction<IPreview>) => {
      const { preview_mode } = action.payload;
      state.preview_mode = preview_mode;
    },
  },
});

export const { toogleDrawer, tooglePreview, setAutoSave } =
  applicationSlice.actions;

export default applicationSlice.reducer;
