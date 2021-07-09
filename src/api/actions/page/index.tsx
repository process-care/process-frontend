import { request } from "graphql-request";
import { ADD_PAGE, UPDATE_PAGE, DELETE_PAGE } from "api/queries/page";

import IPage from "interfaces/form/page";
import { useMutation } from "react-query";
import { optimisticUpdate } from "api/optimisiticUpdate";
import { API_URL } from "constants/api";

export const useAddPage: any = (values: Partial<IPage>) =>
  useMutation(
    async (values: Partial<IPage>) =>
      await request(API_URL, ADD_PAGE, {
        values,
      }),

    optimisticUpdate(["getSurvey"], values)
  );

export const useUpdatePage: any = () =>
  useMutation(
    async ({ id, data }: { id: string; data: Partial<IPage> }) =>
      await request(API_URL, UPDATE_PAGE, {
        id,
        data,
      }),
    optimisticUpdate(["getSurvey"])
  );

export const useDeletePage: any = () =>
  useMutation(
    async (id: IPage["id"]) =>
      await request(API_URL, DELETE_PAGE, {
        id,
      }),
    optimisticUpdate(["getSurvey"])
  );
