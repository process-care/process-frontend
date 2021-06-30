import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AboutBuilder {
  content: string;
  is_editing_about_page: boolean;
}

const initialState: AboutBuilder = {
  content: "",
  is_editing_about_page: false,
};

export const aboutBuilderSlice = createSlice({
  name: "aboutBuilder",
  initialState,
  reducers: {
    updateLanding: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    editAboutPage: (state) => {
      state.is_editing_about_page = !state.is_editing_about_page;
    },
  },
});

export const { updateLanding, editAboutPage } = aboutBuilderSlice.actions;

export default aboutBuilderSlice.reducer;
