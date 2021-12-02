import {
  GET_SURVEY,
  GET_SURVEY_STATS,
  GET_SURVEYS,
  GET_MY_SURVEYS,
  GET_SURVEY_METADATAS,
  DELETE_SURVEY,
  ADD_SURVEY,
  UPDATE_SURVEY,
  WHERE_SURVEYS,
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

// ---- QUERIES

// Get one by ID
export const useGetSurvey = (id: string): UseQueryResult<ISurveyRes, Error> =>
  useQuery<ISurveyRes, Error>(
    ["getSurvey", id],
    () =>
      client.request(GET_SURVEY, {
        id,
      }),
    { enabled: !!id }
  );

// Get metadata of a survey by ID
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

// Get stats of a survey by ID
export const useGetSurveyStats: any = (id: string) =>
  useQuery(
    ["getSurveyStats", id],
    () =>
      client.request(GET_SURVEY_STATS, {
        id,
      }),
    { enabled: !!id }
  );

// Get only my on surveys  
export const useGetMySurveys = (
  authorId: string
): UseQueryResult<ISurveysRes, Error> =>
  useQuery<ISurveysRes, Error, any>(
    "getSurveys",
    () => client.request(GET_MY_SURVEYS, { authorId }),
    { enabled: !!authorId }
  );

// Get one by slug  
export const useGetSurveyBySlug = (slug: string): UseQueryResult<ISurvey, Error> =>
  useQuery<ISurvey, Error>(
    ["getSurveyBySlug", slug],
    () => client.request(WHERE_SURVEYS, { where: { slug } }).then(res => {
      return res.surveys[0];
    }),
    { enabled: Boolean(slug) }
  );

// Get all surveys  
export const useGetSurveys = (): UseQueryResult<ISurveysRes, Error> =>
  useQuery<ISurveysRes, Error>("getMySurveys", () =>
    client.request(GET_SURVEYS)
  );

  // ---- MUTATIONS

  export const useAddSurvey: any = (): UseMutationResult<ISurvey, Error> =>
  useMutation<ISurvey, Error, any>(
    async (values: Partial<ISurvey>) =>
      await client.request(ADD_SURVEY, { values }),
    optimisticUpdate(["getSurvey"])
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
