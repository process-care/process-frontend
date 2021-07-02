import { createApi } from "@reduxjs/toolkit/query/react";
import { gql } from "graphql-request";
import { graphqlBaseQuery } from "api/preset";
import IQuestion from "interfaces/form/question";

export interface GetQuestionsResponse {
  questions: IQuestion[] | undefined;
}

export const questionsApi = createApi({
  reducerPath: "questionsApi",
  baseQuery: graphqlBaseQuery(),
  endpoints: (builder) => ({
    getQuestionsInSelectedPage: builder.query<
      GetQuestionsResponse,
      string | undefined
    >({
      query: (id) => ({
        document: gql`
          query GetQuestion($id: ID) {
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
