import { useMutation, UseMutationResult } from "react-query";
import { LOGIN, SIGNIN } from "call/queries/auth";
import { request } from "graphql-request";
import { API_URL } from "constants/api";

export interface Login {
  identifier: string;
  password: string;
}

export interface Signin {
  email: string;
  username: string;
  password: string;
}

export interface LoginRes {
  login: {
    jwt?: string;
    errors?: string[];
    user?: {
      id: string;
      email: string;
      username: string;
      blocked: boolean;
    };
  };
}

export interface SigninRes {
  jwt?: string;
  user: any;
  errors?: string[];
}

export const useLogin = (): UseMutationResult<LoginRes, Error> =>
  useMutation<LoginRes, Error, any>(
    async ({ identifier, password }) =>
      await request(API_URL, LOGIN, {
        identifier,
        password,
      })
  );

export const useSignin = (): UseMutationResult<SigninRes, Error> =>
  useMutation<SigninRes, Error, any>(
    async ({ email, username, password }) =>
      await request(API_URL, SIGNIN, {
        email,
        username,
        password,
      })
  );