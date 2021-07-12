import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPreview {
  preview_mode: "form" | "landing" | null;
}

interface Application {
  drawer_is_open: boolean;
  preview_mode: "form" | "landing" | null;
}

const initialState: Application = {
  drawer_is_open: false,
  preview_mode: null,
};

export const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    toogleDrawer: (state) => {
      state.drawer_is_open = !state.drawer_is_open;
    },
    tooglePreview: (state, action: PayloadAction<IPreview>) => {
      const { preview_mode } = action.payload;
      state.preview_mode = preview_mode;
    },
  },
});

export const { toogleDrawer, tooglePreview } = applicationSlice.actions;

export default applicationSlice.reducer;
