import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Landing } from "api/graphql/types.generated";

import { initialValues } from "components/CreateSurvey/CreateLanding/ToolBox/Form/utils/initialValues";

export interface LandingBuilder {
  landing: Landing;
}

interface Update {
  data: Landing;
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
