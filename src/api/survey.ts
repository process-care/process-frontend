import { createApi } from "@reduxjs/toolkit/query/react";
import { gql } from "graphql-request";
import ISurvey from "interfaces/survey";
import { graphqlBaseQuery } from "api/preset";
import IQuestion from "interfaces/form/question";
import IPage from "interfaces/form/page";

export interface GetSurveyResponse {
  survey: ISurvey & IQuestion & IPage;
}

export const surveyApi = createApi({
  reducerPath: "surveyApi",
  baseQuery: graphqlBaseQuery(),
  tagTypes: ["Questions"],
  endpoints: (builder) => ({
    getSurvey: builder.query<GetSurveyResponse, string | undefined>({
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
                questions {
                  id
                  label
                }
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
