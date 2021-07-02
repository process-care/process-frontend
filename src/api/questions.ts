import { createApi } from "@reduxjs/toolkit/query/react";
import { gql } from "graphql-request";
import { graphqlBaseQuery } from "api/preset";
import IQuestion from "interfaces/form/question";

export interface GetQuestionsResponse {
  questions: IQuestion[] | undefined;
}

export interface IAddQ {
  type: IQuestion["type"];
  internal_title: IQuestion["internal_title"];
  page: IQuestion["page"];
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
    addQuestion: builder.mutation<IAddQ, Partial<IAddQ>>({
      query: ({ type, internal_title, page }) => ({
        document: gql`
          query AddQuestion($type: String!, $internal_title:String!,$page:ID!) {
            createQuestion(input: { data: { type: $type internal_title: $internal_title,page:$page } }) 
            {
              question {
              id
              }
            }
          }
      }
        `,
        variables: {
          type,
          internal_title,
          page,
        },
      }),
    }),
  }),
});

export const { useGetQuestionsInSelectedPageQuery } = questionsApi;
