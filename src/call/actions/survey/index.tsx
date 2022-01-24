import {
  GET_SURVEY,
  GET_SURVEY_STATS,
  GET_SURVEYS,
  GET_MY_SURVEYS,
  // GET_SURVEY_METADATAS,
  DELETE_SURVEY,
  ADD_SURVEY,
  UPDATE_SURVEY,
  GET_SURVEY_BY_SLUG,
} from "call/queries/survey";
import { UPDATE_ORDER } from "call/queries/survey";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query";
import { optimisticUpdate } from "call/optimisiticUpdate";
import { SurveysResult } from "types/survey/api";
// import { SurveyBuilder } from "redux/slices/surveyBuilder";
import { Survey, SurveyCollection } from "types/survey";
import { client } from "..";
import { shapeSurvey, shapeSurveys } from "call/shapers/survey";

// ---- QUERIES

// Get one by ID
export const useGetSurvey = (id: string): UseQueryResult<Survey, Error> =>
  useQuery(
    ["getSurvey", id],
    () => client.request(GET_SURVEY, { id }).then(res => res.survey),
    {
      enabled: !!id,
      select: shapeSurvey
    }
  );

// Get metadata of a survey by ID
// export const useGetSurveyMetadas = (
//   id: string
// ): UseQueryResult<SurveyBuilder, Error> =>
//   useQuery(
//     ["getSurveyMetadas", id],
//     () => client.request(GET_SURVEY_METADATAS, { id }),
//     {
//       enabled: !!id,
//       select: shapeSurvey
//     }
//   );

// Get stats of a survey by ID
export const useGetSurveyStats: any = (id: string) =>
  useQuery(
    ["getSurveyStats", id],
    () => client.request(GET_SURVEY_STATS, { id }),
    {
      enabled: !!id,
    }
  );

// Get only my on surveys  
export const useGetMySurveys = (
  authorId: string
): UseQueryResult<SurveyCollection, Error> =>
  useQuery<SurveysResult, Error, any>(
    "getSurveys",
    () => client.request(GET_MY_SURVEYS, { authorId }).then(res => res.surveys),
    {
      enabled: !!authorId,
      select: shapeSurveys
    }
  );

// Get one by slug  
export const useGetSurveyBySlug = (slug: string): UseQueryResult<Survey, Error> =>
  useQuery(
    ["getSurveyBySlug", slug],
    () => client.request(GET_SURVEY_BY_SLUG, { slug }).then(res => {
      console.log('getting a survey by its slug: ', res.surveys.data[0]);
      return { data: res.surveys.data[0] };
    }),
    {
      enabled: Boolean(slug),
      select: shapeSurvey
    }
  );

// Get all surveys  
export const useGetSurveys = (): UseQueryResult<SurveyCollection, Error> =>
  useQuery(
    "getMySurveys",
    () => client.request(GET_SURVEYS).then(res => res.surveys),
    {
      select: shapeSurveys
    }
  );

// ---- MUTATIONS

export const useAddSurvey: any = (): UseMutationResult<Survey, Error> =>
useMutation<Survey, Error, any>(
  (values: Partial<Survey>) => client.request(ADD_SURVEY, { values }),
  optimisticUpdate(["getSurvey"]),
);

export const useUpdateSurvey = (): UseMutationResult<Survey, Error> =>
  useMutation<Survey, Error, any>(
    async ({ id, data }: { id: string; data: Partial<Survey> }) =>
      await client.request(UPDATE_SURVEY, {
        id,
        data,
      }),
    optimisticUpdate(["getSurvey", "getSurveys"])
  );

export const useDeleteSurvey = (): UseMutationResult<Survey, Error> =>
  useMutation<Survey, Error, any>(
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
