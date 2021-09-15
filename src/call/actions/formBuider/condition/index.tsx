import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query";
import { request } from "graphql-request";
import {
  ADD_CONDITION,
  UPDATE_CONDITION,
  DELETE_CONDITION,
  CHECK_SURVEY,
  GET_CONDITION,
  GET_CONDITIONS,
} from "call/queries/formBuilder/condition";

import { optimisticUpdate } from "call/optimisiticUpdate";
import ICondition, { CheckSurvey, IConditionRes } from "types/form/condition";
import { API_URL } from "constants/api";

export const useGetCondition = (
  id: string
): UseQueryResult<ICondition, Error> => {
  return useQuery<ICondition, Error>(
    ["getCondition", id],
    async () => {
      return await request(API_URL, GET_CONDITION, {
        id,
      });
    },
    { enabled: !!id }
  );
};

export const useGetConditions = ({
  id,
  type,
}: {
  id: string;
  type: string;
}): UseQueryResult<IConditionRes, Error> => {
  return useQuery<IConditionRes, Error>(
    ["getConditions", { id, type }],
    async () => {
      return await request(API_URL, GET_CONDITIONS(type), {
        id,
      });
    },
    { enabled: !!id && !!type }
  );
};

export const useAddCondition = (): UseMutationResult<ICondition, Error> =>
  useMutation<ICondition, Error, any>(
    async (new_condition: ICondition) =>
      await request(API_URL, ADD_CONDITION, {
        new_condition,
      }),
    optimisticUpdate(["getConditions", "getSurvey"])
  );

export const useUpdateCondition = (): UseMutationResult<ICondition, Error> =>
  useMutation<ICondition, Error, any>(
    async ({ id, data }: { id: string; data: ICondition }) =>
      await request(API_URL, UPDATE_CONDITION, {
        id,
        data,
      }),
    optimisticUpdate(["getConditions"])
  );

export const useDeleteCondition = (): UseMutationResult<ICondition, Error> =>
  useMutation<ICondition, Error, any>(
    async (id: ICondition["id"]) =>
      await request(API_URL, DELETE_CONDITION, {
        id,
      }),
    optimisticUpdate(["getConditions", "getSurvey", "getQuestions"])
  );

export const useCheckSurvey = (
  surveyId: string | null
): UseQueryResult<CheckSurvey, Error> => {
  return useQuery<CheckSurvey, Error, CheckSurvey>(
    ["getCondition", surveyId],
    async () => {
      return await request(API_URL, CHECK_SURVEY, {
        surveyId,
      });
    },
    { enabled: !!surveyId }
  );
};
