import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query";
import { request } from "graphql-request";

import { GET_LANDING, UPDATE_LANDING } from "api/queries/landing";

import { optimisticUpdate } from "api/optimisiticUpdate";
import { API_URL } from "constants/api";
import { ILanding, ILandingRes } from "interfaces/landing";

export const useUpdateLanding = (): UseMutationResult<ILanding, Error> =>
  useMutation<ILanding, Error, any>(
    async ({ id, data }: { id: string; data: ILanding }) =>
      await request(API_URL, UPDATE_LANDING, {
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
      return await request(API_URL, GET_LANDING, {
        id,
      });
    },
    { enabled: !!id }
  );
};
