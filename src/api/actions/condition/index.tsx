import { useMutation, useQuery } from "react-query";
import { request } from "graphql-request";
import {
  ADD_CONDITION,
  UPDATE_CONDITION,
  DELETE_CONDITION,
  GET_CONDITION,
  GET_CONDITIONS,
} from "api/queries/condition";

import { optimisticUpdate } from "api/optimisiticUpdate";
import ICondition from "interfaces/form/condition";
import { API_URL } from "constants/api";

export const useGetCondition: any = (id: string) => {
  return useQuery(
    ["getCondition", id],
    async () => {
      return await request(API_URL, GET_CONDITION, {
        id,
      });
    },
    { enabled: !!id }
  );
};

export const useGetConditions: any = ({
  id,
  type,
}: {
  id: string;
  type: string;
}) => {
  return useQuery(
    ["getConditions", { id, type }],
    async () => {
      return await request(API_URL, GET_CONDITIONS(type), {
        id,
      });
    },
    { enabled: !!id && !!type }
  );
};

export const useAddCondition: any = () =>
  useMutation(
    async (new_condition: ICondition) =>
      await request(API_URL, ADD_CONDITION, {
        new_condition,
      }),
    optimisticUpdate(["getConditions", "getSurvey"])
  );

export const useUpdateCondition: any = () =>
  useMutation(
    async ({ id, data }: { id: string; data: ICondition }) =>
      await request(API_URL, UPDATE_CONDITION, {
        id,
        data,
      }),
    optimisticUpdate(["getConditions"])
  );

export const useDeleteCondition: any = () =>
  useMutation(
    async (id: ICondition["id"]) =>
      await request(API_URL, DELETE_CONDITION, {
        id,
      }),
    optimisticUpdate(["getConditions", "getSurvey", "getQuestions"])
  );
