import {
  ADD_PAGE,
  UPDATE_PAGE,
  DELETE_PAGE,
} from "call/queries/formBuilder/page";

import IPage from "types/form/page";
import { useMutation, UseMutationResult } from "react-query";
import { optimisticUpdate } from "call/optimisiticUpdate";
import { client } from "call/actions";

export const useAddPage = (): UseMutationResult<IPage, Error> =>
  useMutation<IPage, Error, any>(
    async (values: Partial<IPage>) =>
      await client.request(ADD_PAGE, {
        values,
      }),

    optimisticUpdate(["getSurvey"])
  );

export const useUpdatePage = (): UseMutationResult<IPage, Error> =>
  useMutation<IPage, Error, any>(
    async ({ id, data }: { id: string; data: Partial<IPage> }) =>
      await client.request(UPDATE_PAGE, {
        id,
        data,
      }),
    optimisticUpdate(["getSurvey"])
  );

export const useDeletePage = (): UseMutationResult<IPage, Error> =>
  useMutation<IPage, Error, any>(
    async (id: IPage["id"]) =>
      await client.request(DELETE_PAGE, {
        id,
      }),
    optimisticUpdate(["getSurvey"])
  );
