import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "redux/store";
import { IColors, ILanding } from "interfaces/landing";
import { initialValues } from "components/CreateSurvey/CreateLanding/ToolBox/Form/utils/initialValues";
import { IBase64 } from "components/Fields/Uploadfile";

export interface LandingBuilder {
  landing: ILanding;
}

interface Update {
  data: {
    [index: string]: string | IColors | IBase64[];
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
        for (const [key, value] of Object.entries(data)) {
          if (key.includes("members")) {
            state.landing.members = {
              ...state.landing.members,
              [key.split("].")[1]]: value,
            };

            return;
          }
          state.landing = { ...state.landing, ...data };
        }
      }
    },
  },
});

export const { updateLanding } = landingBuilderSlice.actions;

export default landingBuilderSlice.reducer;
