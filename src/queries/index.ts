import { gql } from "graphql-request";

export const getQuestions = gql`
  {
    questions {
      id
      label
      placeholder
      internal_description
      internal_title
      type
      type_name
      conditions {
        id
      }
      page {
        id
        short_name
      }
    }
  }
`;

export const addQuestion: any = () => gql`
  mutation {
    createQuestion(input: { data: { label: "TEST" } }) {
      question {
        id
        label
      }
    }
  }
`;
