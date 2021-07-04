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

export const addQuestion = gql`
  mutation addQuestion($values: QuestionInput) {
    createQuestion(input: { data: $values }) {
      question {
        id
        label
        internal_title
        help_text
        required
        answers
      }
    }
  }
`;

export const addPage = gql`
  mutation addPage($values: PageInput) {
    createPage(input: { data: $values }) {
      page {
        name
        short_name
        id
      }
    }
  }
`;
