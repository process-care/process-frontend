import { createApi } from "@reduxjs/toolkit/query/react";
import { gql } from "graphql-request";
import { graphqlBaseQuery } from "api/preset";
import IQuestion from "interfaces/form/question";

const baseUrl: string = process.env.REACT_APP_API_URL ?? "whatever default";

export interface GetQuestionsResponse {
  questions: IQuestion[];
}

export const questionsApi = createApi({
  reducerPath: "questionsApi",
  baseQuery: graphqlBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getQuestionsInSelectedPage: builder.query<GetQuestionsResponse, string>({
      query: (id) => ({
        document: gql`
          query GetQuestion($id: ID!) {
            questions(where: { page: { id: $id } }) {
              id
              label
              placeholder
              internal_description
              internal_title
              type
              type_name
              answers
              conditions {
                id
              }
              page {
                id
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

export const { useGetQuestionsInSelectedPageQuery } = questionsApi;
