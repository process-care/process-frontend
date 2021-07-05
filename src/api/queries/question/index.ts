import { gql } from "graphql-request";

export const GET_QUESTIONS = gql`
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

export const GET_SURVEY_BY_ID = gql`
  query getSurveyById($id: ID!) {
    survey(id: $id) {
      id
      description
      order
      questions {
        label
      }
      pages {
        id
        questions {
          label
          id
          type
          answers
          placeholder
          help_text
          answers
        }
      }
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
    }
  }
`;

export const ADD_QUESTION = gql`
  mutation addQuestion($new_question: QuestionInput) {
    createQuestion(input: { data: $new_question }) {
      question {
        id
        label
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
      }
    }
  }
`;

export const DELETE_QUESTION = gql`
  mutation deleteQuestion($question_id: ID!) {
    deleteQuestion(input: { where: { id: $question_id } }) {
      question {
        id
      }
    }
  }
`;
