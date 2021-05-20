import { createSlice } from "@reduxjs/toolkit";

interface Application {
  drawer_is_open: boolean;
}

// Define the initial state using that type
const initialState: Application = {
  drawer_is_open: false,
};

export const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    toogleDrawer: (state) => {
      state.drawer_is_open = !state.drawer_is_open;
    },
  },
});

export const { toogleDrawer } = applicationSlice.actions;

export default applicationSlice.reducer;
