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

export const deleteQuestion = gql`
  mutation deleteQuestion($question_id: ID!) {
    deleteQuestion(input: { where: { id: $question_id } }) {
      question {
        id
      }
    }
  }
`;
