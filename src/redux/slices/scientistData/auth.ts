import { PayloadAction } from "@reduxjs/toolkit";
import {
  LoginMutation,
  LoginMutationVariables,
  RegisterMutationVariables,
} from "api/graphql/queries/auth.gql.generated";
import { RootState } from "redux/store";

import { GlobalState } from "../scientistData";

// ---- TYPES
export interface AuthState {
  isLogging: boolean;
  isConnected: boolean;
  errors?: any[];
  data: LoginMutation["login"] | null;
}

// ---- STATE

export const initialAuthState: AuthState = {
  isLogging: false,
  isConnected: false,
  data: null,
};

// ---- REDUCERS

export const authReducers = {
  login: (
    state: GlobalState,
    _action: PayloadAction<LoginMutationVariables>
  ): void => {
    state.auth.isConnected = false;
  },
  logged: (
    state: GlobalState,
    action: PayloadAction<LoginMutation["login"]>
  ): void => {
    state.auth.data = action.payload;
    state.auth.isConnected = !action.payload.user.blocked;
    state.auth.errors = undefined;
  },
  signin: (
    state: GlobalState,
    _action: PayloadAction<RegisterMutationVariables>
  ): void => {
    state.auth.isConnected = false;
  },
  signed: (
    state: GlobalState,
    action: PayloadAction<LoginMutation["login"]>
  ): void => {
    state.auth.data = action.payload;
    state.auth.errors = undefined;
  },
  authFailed: (state: GlobalState, action: PayloadAction<any>): void => {
    state.auth.isConnected = false;
    state.auth.errors = action.payload;
  },
  logout: (state: GlobalState): void => {
    state.auth.isConnected = false;
    state.auth.data = null;
  },
};

// ---- SELECTORS

export const getUser = (state: RootState): any =>
  state.scientistData.auth.data?.user;

export const authSelectors = {
  getUser,
};
