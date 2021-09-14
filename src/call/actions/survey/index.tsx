import { request } from "graphql-request";
import {
  GET_SURVEY,
  GET_SURVEY_STATS,
  GET_SURVEYS,
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
import { API_URL } from "constants/api";
import { Survey } from "redux/slices/surveyBuilder";

export const useAddSurvey: any = (): UseMutationResult<ISurvey, Error> =>
  useMutation<ISurvey, Error, any>(
    async (values: Partial<ISurvey>) =>
      await request(API_URL, ADD_SURVEY, { values }),
    optimisticUpdate(["getSurvey"])
  );

export const useGetSurvey = (id: string): UseQueryResult<ISurveyRes, Error> =>
  useQuery<ISurveyRes, Error>(
    ["getSurvey", id],
    () =>
      request(API_URL, GET_SURVEY, {
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
      request(API_URL, GET_SURVEY_METADATAS, {
        id,
      }),
    { enabled: !!id }
  );

export const useGetSurveyStats: any = (id: string) =>
  useQuery(
    ["getSurveyStats", id],
    () =>
      request(API_URL, GET_SURVEY_STATS, {
        id,
      }),
    { enabled: !!id }
  );

export const useGetSurveys = (): UseQueryResult<ISurveysRes, Error> =>
  useQuery<ISurveysRes, Error>("getSurveys", () =>
    request(API_URL, GET_SURVEYS)
  );

export const useUpdateSurvey = (): UseMutationResult<ISurvey, Error> =>
  useMutation<ISurvey, Error, any>(
    async ({ id, data }: { id: string; data: Partial<ISurvey> }) =>
      await request(API_URL, UPDATE_SURVEY, {
        id,
        data,
      }),
    optimisticUpdate(["getSurvey", "getSurveys"])
  );

export const useDeleteSurvey = (): UseMutationResult<ISurvey, Error> =>
  useMutation<ISurvey, Error, any>(
    async (id: string) =>
      await request(API_URL, DELETE_SURVEY, {
        id,
      }),
    optimisticUpdate(["getSurveys"])
  );

export const useUpdateOrder: any = (new_order: string[]) =>
  useMutation(
    async ({ id, new_order }: { id: string; new_order: string[] }) =>
      await request(API_URL, UPDATE_ORDER, {
        id,
        new_order,
      }),
    optimisticUpdate(["getSurvey", "getQuestions"], new_order)
  );
