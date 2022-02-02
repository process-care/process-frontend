import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Landing } from "api/graphql/types.generated";
// import type { RootState } from "redux/store";
import { initialValues } from "components/CreateSurvey/CreateLanding/ToolBox/Form/utils/initialValues";
import { IBase64 } from "components/Fields/Uploadfile";
import { Color, Member } from "types/landing";

export interface LandingBuilder {
  landing: Landing;
}

interface Update {
  data: {
    [index: string]: string | Color | IBase64[] | Member[];
  };
}

const initialState: LandingBuilder = {
  landing: initialValues,
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
  },
});

export const { updateLanding } = landingBuilderSlice.actions;

export default landingBuilderSlice.reducer;
