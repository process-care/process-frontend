import { PayloadAction } from "@reduxjs/toolkit";
import {
  LoginMutation,
  LoginMutationVariables,
  RegisterMutationVariables,
} from "@/api/graphql/queries/auth.gql.generated.js"
import { MeQuery } from "@/api/graphql/sdk.generated.js"
import { RootState } from "@/redux/store/index.js";

import { GlobalState } from "../scientistData.js"

// ---- TYPES
export interface AuthState {
  refreshing: boolean;
  isLogging: boolean;
  isConnected: boolean;
  errors?: any[];
  data: LoginMutation["login"] | null;
}

// ---- STATE

export const initialAuthState: AuthState = {
  refreshing: false,
  isLogging: false,
  isConnected: false,
  data: null,
};

// ---- REDUCERS

export const authReducers = {
  login: (state: GlobalState, _action: PayloadAction<LoginMutationVariables>): void => {
    state.auth.isConnected = false;
  },
  logged: (state: GlobalState, action: PayloadAction<LoginMutation["login"]>): void => {
    state.auth.data = action.payload;
    // If the user is blocked OR has no information (= null | undefined) -> it is not connected
    state.auth.isConnected = !(action.payload?.user?.blocked ?? true);
    state.auth.errors = undefined;
  },
  refresh: (state: GlobalState): void => {
    state.auth.refreshing = true;
  },
  refreshed: (state: GlobalState, action: PayloadAction<MeQuery["me"]>): void => {
    // TODO: Remove this check, it is a type safeguard, but the validation is made in the epic already
    if (!action.payload) return;

    // Reuse JWT with the updated user information
    const combined = { jwt: state.auth.data?.jwt, user: action.payload };
    state.auth.data = combined;

    state.auth.refreshing = false;
  },
  signin: (state: GlobalState, _action: PayloadAction<RegisterMutationVariables>): void => {
    state.auth.isConnected = false;
  },
  signed: (state: GlobalState, action: PayloadAction<LoginMutation["login"]>): void => {
    state.auth.data = action.payload;
    state.auth.errors = undefined;
  },
  authFailed: (state: GlobalState, action: PayloadAction<any>): void => {
    state.auth.isConnected = false;
    state.auth.errors = action.payload;
  },
  logout: (state: GlobalState): void => {
    state.auth.data = null
  },
  disconnected: (state: GlobalState): void => {
    state.auth.isConnected = false
  },
};

// ---- SELECTORS

export const getUser = (state: RootState): any => state.scientistData.auth.data?.user;

export const authSelectors = {
  getUser,
};
