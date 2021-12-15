import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query";
import { LOGIN, SIGNIN, GET_ME, UPDATE_ME } from "call/queries/auth";
import { request } from "graphql-request";
import { API_URL } from "constants/api";
import { client } from "..";
import { optimisticUpdate } from "call/optimisiticUpdate";

export interface User {
  email: string;
  lastName: string;
  firstName: string;
  job: string;
  institution: string;
}
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
  register: {
    jwt?: string;
    user: any;
    errors?: string[];
  };
}

export interface UserRes {
  users: User[];
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

export const useGetMe = (userId: string): UseQueryResult<UserRes, Error> => {
  return useQuery<UserRes, Error>(
    ["getMe", userId],
    async () => {
      return await client.request(GET_ME, {
        userId,
      });
    },
    { enabled: !!userId }
  );
};

export const useUpdateMe = (): UseMutationResult<User, Error> =>
  useMutation<User, Error, any>(
    async ({ id, data }: { id: string; data: User }) =>
      await client.request(UPDATE_ME, {
        id,
        data,
      }),
    optimisticUpdate(["getMe"])
  );
