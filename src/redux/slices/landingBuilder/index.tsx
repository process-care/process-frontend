import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "redux/store";
import { IColor, ILanding, IMember } from "types/landing";
import { initialValues } from "components/CreateSurvey/CreateLanding/ToolBox/Form/utils/initialValues";
import { IBase64 } from "components/Fields/Uploadfile";

export interface LandingBuilder {
  landing: ILanding;
  is_editing_about_page: boolean;
}

interface Update {
  data: {
    [index: string]: string | IColor | IBase64[] | IMember[];
  };
}

const initialState: LandingBuilder = {
  landing: initialValues,
  is_editing_about_page: false,
};

export const landingBuilderSlice = createSlice({
  name: "landingBuilder",
  initialState,
  reducers: {
    updateLanding: (state, action: PayloadAction<Update>) => {
      const { data } = action.payload;
      if (data) {
        state.landing = { ...state.landing, ...data };
      }
    },
    setEditAboutPage: (state) => {
      state.is_editing_about_page = !state.is_editing_about_page;
    },
  },
});

export const { updateLanding, setEditAboutPage } = landingBuilderSlice.actions;

export default landingBuilderSlice.reducer;
