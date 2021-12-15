import { PayloadAction } from "@reduxjs/toolkit";
import { LoginRes, SigninRes } from "call/actions/auth";

import { GlobalState } from "../global";

// ---- TYPES

export interface AuthState {
  isLogging: boolean;
  isConnected: boolean;
  errors?: any[];
  data: LoginRes["login"] | SigninRes["register"] | null;
}

// ---- STATE

export const initialAuthState: AuthState = {
  isLogging: false,
  isConnected: false,
  data: null,
};

// ---- ACTIONS

type Login = {
  identifier: string;
  password: string;
};
type Signin = {
  email: string;
  username: string;
  password: string;
};

// ---- REDUCERS

export const authReducers = {
  login: (state: GlobalState, _action: PayloadAction<Login>): void => {
    state.auth.isConnected = false;
  },
  logged: (state: GlobalState, action: PayloadAction<LoginRes | any>): void => {
    state.auth.data = action.payload;
    state.auth.isConnected = action.payload.login?.user?.blocked === false;
    state.auth.errors = undefined;
  },
  signin: (state: GlobalState, _action: PayloadAction<Signin>): void => {
    state.auth.isConnected = false;
  },
  signed: (state: GlobalState, action: PayloadAction<LoginRes | any>): void => {
    state.auth.data = action.payload;
    state.auth.errors = undefined;
  },
  authFailed: (state: GlobalState, action: PayloadAction<any>): void => {
    state.auth.isConnected = false;
    state.auth.errors = action.payload;
  },
  logout: (): void => {
    () => initialAuthState;
  },
};
