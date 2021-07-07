import { gql } from "graphql-request";

export const GET_QUESTIONS = gql`
  query getQuestions($page_id: ID!) {
    questions(where: { page: $page_id }, limit: 10) {
      label
      id
      type
      answers
      placeholder
      help_text
      answers
      required
      internal_title
    }
  }
`;

export const GET_QUESTION = gql`
  query getQuestion($id: ID!) {
    question(id: $id) {
      label
      id
      type
      answers
      placeholder
      help_text
      answers
      required
      internal_title
    }
  }
`;

export const ADD_QUESTION = gql`
  mutation addQuestion($new_question: QuestionInput) {
    createQuestion(input: { data: $new_question }) {
      question {
        id
        label
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
        label
        id
        type
        placeholder
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
