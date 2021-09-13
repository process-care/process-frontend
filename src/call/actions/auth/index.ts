import {
  useMutation,
  UseMutationResult,
  //   useQuery,
  //   UseQueryResult,
} from "react-query";
import { request } from "graphql-request";

import { LOGIN, SIGNIN } from "call/queries/auth";

// import { optimisticUpdate } from "call/optimisiticUpdate";
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
  jwt?: string;
  errors?: string[];
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
