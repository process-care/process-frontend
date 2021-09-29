import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query";
import {
  ADD_CONDITION,
  UPDATE_CONDITION,
  DELETE_CONDITION,
  CHECK_SURVEY,
  GET_CONDITION,
  GET_CONDITIONS,
  DELETE_GROUP_CONDITION,
} from "call/queries/formBuilder/condition";

import { optimisticUpdate } from "call/optimisiticUpdate";
import ICondition, { CheckSurvey, IConditionRes } from "types/form/condition";
import { client } from "call/actions";

export const useGetCondition = (
  id: string
): UseQueryResult<ICondition, Error> => {
  return useQuery<ICondition, Error>(
    ["getCondition", id],
    async () => {
      return await client.request(GET_CONDITION, {
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
      return await client.request(GET_CONDITIONS(type), {
        id,
      });
    },
    { enabled: !!id && !!type }
  );
};

export const useAddCondition = (): UseMutationResult<ICondition, Error> =>
  useMutation<ICondition, Error, any>(
    async (new_condition: ICondition) =>
      await client.request(ADD_CONDITION, {
        new_condition,
      }),
    optimisticUpdate(["getConditions", "getSurvey"])
  );

export const useUpdateCondition = (): UseMutationResult<ICondition, Error> =>
  useMutation<ICondition, Error, any>(
    async ({ id, data }: { id: string; data: ICondition }) =>
      await client.request(UPDATE_CONDITION, {
        id,
        data,
      }),
    optimisticUpdate(["getConditions"])
  );

export const useDeleteCondition = (): UseMutationResult<ICondition, Error> =>
  useMutation<ICondition, Error, any>(
    async (id: ICondition["id"]) =>
      await client.request(DELETE_CONDITION, {
        id,
      }),
    optimisticUpdate(["getConditions", "getSurvey", "getQuestions"])
  );

export const useDeleteGroupCondition = (): UseMutationResult<
  ICondition,
  Error
> =>
  useMutation<ICondition, Error, any>(
    async (name: ICondition["id"]) =>
      await client.request(DELETE_GROUP_CONDITION, {
        name,
      }),
    optimisticUpdate(["getConditions", "getSurvey", "getQuestions"])
  );

export const useCheckSurvey = (
  surveyId: string | null
): UseQueryResult<CheckSurvey, Error> => {
  return useQuery<CheckSurvey, Error, CheckSurvey>(
    ["getCondition", surveyId],
    async () => {
      return await client.request(CHECK_SURVEY, {
        surveyId,
      });
    },
    { enabled: !!surveyId }
  );
};
