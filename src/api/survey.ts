import { createApi } from "@reduxjs/toolkit/query/react";
import { gql } from "graphql-request";
import ISurvey from "interfaces/survey";
import { graphqlBaseQuery } from "api/preset";

const baseUrl: string = process.env.REACT_APP_API_URL ?? "whatever default";

export interface GetSurveyResponse {
  survey: ISurvey;
}

export const surveyApi = createApi({
  reducerPath: "surveyApi",
  baseQuery: graphqlBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getSurvey: builder.query<GetSurveyResponse, string>({
      query: (id) => ({
        document: gql`
          query GetSurvey($id: ID!) {
            survey(id: $id) {
              id
              description
              order
              pages {
                id
                name
                short_name
                is_locked
              }
            }
          }
        `,

        variables: {
          id,
        },
      }),
    }),
  }),
});

export const { useGetSurveyQuery } = surveyApi;
