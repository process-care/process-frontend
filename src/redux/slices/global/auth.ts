import { PayloadAction } from "@reduxjs/toolkit";
import { LoginRes } from "call/actions/auth";

import { GlobalState } from "../global";

// ---- TYPES

export interface AuthState {
  isLogging: boolean;
  isConnected: boolean;
  errors?: any[];
  data: LoginRes["login"] | null;
}

// ---- STATE

export const initialAuthState: AuthState = {
  isLogging: false,
  isConnected: false,
  data: null,
};

// ---- ACTIONS

type Credentials = {
  identifier: string;
  password: string;
};

// ---- REDUCERS

export const authReducers = {
  login: (state: GlobalState, _action: PayloadAction<Credentials>): void => {
    state.auth.isConnected = false;
  },
  logged: (state: GlobalState, action: PayloadAction<LoginRes | any>): void => {
    state.auth.data = action.payload;
    state.auth.isConnected = action.payload.login?.user?.blocked === false;
    // setTimeout(() => {
    //   history.push(`/dashboard`);
    // }, 1);
  },
  authFailed: (state: GlobalState, action: PayloadAction<any>): void => {
    state.auth.isConnected = false;
    state.auth.errors = action.payload;
  },
  logout: (): void => {
    () => initialAuthState;
  },
};
