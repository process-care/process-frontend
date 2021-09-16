import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query";
import { client } from "..";

import { ADD_LANDING, GET_LANDING, UPDATE_LANDING } from "call/queries/landing";

import { optimisticUpdate } from "call/optimisiticUpdate";
import { ILanding, ILandingRes } from "types/landing";

export const useAddLanding = (): UseMutationResult<ILanding, Error> =>
  useMutation<ILanding, Error, any>(
    async (data: Partial<ILanding>) =>
      await client.request(ADD_LANDING, {
        data,
      })
  );

export const useUpdateLanding = (): UseMutationResult<ILanding, Error> =>
  useMutation<ILanding, Error, any>(
    async ({ id, data }: { id: string; data: ILanding }) =>
      await client.request(UPDATE_LANDING, {
        id,
        data,
      }),
    optimisticUpdate(["getLanding"])
  );

export const useGetLanding = (
  id: string | undefined
): UseQueryResult<ILandingRes, Error> => {
  return useQuery<ILandingRes, Error>(
    ["getLanding", id],
    async () => {
      return await client.request(GET_LANDING, {
        id,
      });
    },
    { enabled: !!id }
  );
};
