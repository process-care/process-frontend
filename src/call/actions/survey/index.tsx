import {
  GET_SURVEY,
  GET_SURVEY_STATS,
  GET_SURVEYS,
  GET_MY_SURVEYS,
  GET_SURVEY_METADATAS,
  DELETE_SURVEY,
  ADD_SURVEY,
  UPDATE_SURVEY,
} from "call/queries/survey";
import { UPDATE_ORDER } from "call/queries/survey";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query";
import { optimisticUpdate } from "call/optimisiticUpdate";
import ISurvey, { ISurveyRes, ISurveysRes } from "types/survey";
import { Survey } from "redux/slices/surveyBuilder";
import { client } from "..";

export const useAddSurvey: any = (): UseMutationResult<ISurvey, Error> =>
  useMutation<ISurvey, Error, any>(
    async (values: Partial<ISurvey>) =>
      await client.request(ADD_SURVEY, { values }),
    optimisticUpdate(["getSurvey"])
  );

export const useGetSurvey = (id: string): UseQueryResult<ISurveyRes, Error> =>
  useQuery<ISurveyRes, Error>(
    ["getSurvey", id],
    () =>
      client.request(GET_SURVEY, {
        id,
      }),
    { enabled: !!id }
  );

export const useGetSurveyMetadas = (
  id: string
): UseQueryResult<Survey, Error> =>
  useQuery<Survey, Error>(
    ["getSurveyMetadas", id],
    () =>
      client.request(GET_SURVEY_METADATAS, {
        id,
      }),
    { enabled: !!id }
  );

export const useGetSurveyStats: any = (id: string) =>
  useQuery(
    ["getSurveyStats", id],
    () =>
      client.request(GET_SURVEY_STATS, {
        id,
      }),
    { enabled: !!id }
  );

export const useGetMySurveys = (
  authorId: string
): UseQueryResult<ISurveysRes, Error> =>
  useQuery<ISurveysRes, Error, any>(
    "getSurveys",
    () => client.request(GET_MY_SURVEYS, { authorId }),
    { enabled: !!authorId }
  );

export const useGetSurveys = (): UseQueryResult<ISurveysRes, Error> =>
  useQuery<ISurveysRes, Error>("getMySurveys", () =>
    client.request(GET_SURVEYS)
  );

export const useUpdateSurvey = (): UseMutationResult<ISurvey, Error> =>
  useMutation<ISurvey, Error, any>(
    async ({ id, data }: { id: string; data: Partial<ISurvey> }) =>
      await client.request(UPDATE_SURVEY, {
        id,
        data,
      }),
    optimisticUpdate(["getSurvey", "getSurveys"])
  );

export const useDeleteSurvey = (): UseMutationResult<ISurvey, Error> =>
  useMutation<ISurvey, Error, any>(
    async (id: string) =>
      await client.request(DELETE_SURVEY, {
        id,
      }),
    optimisticUpdate(["getSurveys"])
  );

export const useUpdateOrder: any = (new_order: string[]) =>
  useMutation(
    async ({ id, new_order }: { id: string; new_order: string[] }) =>
      await client.request(UPDATE_ORDER, {
        id,
        new_order,
      }),
    optimisticUpdate(["getSurvey", "getQuestions"], new_order)
  );
