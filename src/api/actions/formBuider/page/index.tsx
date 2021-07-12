import { request } from "graphql-request";
import {
  ADD_PAGE,
  UPDATE_PAGE,
  DELETE_PAGE,
} from "api/queries/formBuilder/page";

import IPage from "interfaces/form/page";
import { useMutation, UseMutationResult } from "react-query";
import { optimisticUpdate } from "api/optimisiticUpdate";
import { API_URL } from "constants/api";

export const useAddPage = (): UseMutationResult<IPage, Error> =>
  useMutation<IPage, Error, any>(
    async (values: Partial<IPage>) =>
      await request(API_URL, ADD_PAGE, {
        values,
      }),

    optimisticUpdate(["getSurvey"])
  );

export const useUpdatePage = (): UseMutationResult<IPage, Error> =>
  useMutation<IPage, Error, any>(
    async ({ id, data }: { id: string; data: Partial<IPage> }) =>
      await request(API_URL, UPDATE_PAGE, {
        id,
        data,
      }),
    optimisticUpdate(["getSurvey"])
  );

export const useDeletePage = (): UseMutationResult<IPage, Error> =>
  useMutation<IPage, Error, any>(
    async (id: IPage["id"]) =>
      await request(API_URL, DELETE_PAGE, {
        id,
      }),
    optimisticUpdate(["getSurvey"])
  );
