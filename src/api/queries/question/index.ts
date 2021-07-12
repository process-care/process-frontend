import { gql } from "graphql-request";
import { questionFragment } from "api/fragments";

export const GET_QUESTIONS = gql`
  ${questionFragment}
  query getQuestions($page_id: ID!) {
    questions(where: { page: $page_id }, limit: 10) {
      ...questionFragment
    }
  }
`;

export const GET_QUESTION = gql`
  ${questionFragment}
  query getQuestion($id: ID!) {
    question(id: $id) {
      ...questionFragment
    }
  }
`;

export const ADD_QUESTION = gql`
  mutation addQuestion($new_question: QuestionInput) {
    createQuestion(input: { data: $new_question }) {
      question {
        id
        type
        page {
          id
        }
      }
    }
  }
`;

export const UPDATE_QUESTION = gql`
  mutation updateQuestion($id: ID!, $data: editQuestionInput) {
    updateQuestion(input: { where: { id: $id }, data: $data }) {
      question {
        id
        type
        internal_title
      }
    }
  }
`;

export const DELETE_QUESTION = gql`
  mutation deleteQuestion($id: ID!) {
    deleteQuestion(input: { where: { id: $id } }) {
      question {
        id
      }
    }
  }
`;
