import { gql } from "graphql-request";
import { questionFragment } from "call/fragments";

// ---- QUERIES

export const GET_QUESTIONS_BY_PAGE = gql`
  ${questionFragment}
  query getQuestions($page_id: ID!) {
    questions(where: { page: $page_id }, limit: 10) {
      ...questionFragment
    }
  }
`;

export const GET_QUESTIONS_BY_SURVEY = gql`
  ${questionFragment}

  query questionsBySurvey($surveyId: ID!) {
    questionsBySurvey(surveyId: $surveyId) {
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

export const GET_QUESTION_EVALUATION = gql`
  query getQuestionEvaluation($questionId: ID!, $participationId: ID!) {
    evaluation: questionEvaluation(questionId: $questionId, participationId: $participationId) {
      id
      conditions {
        id
        group
        operator
        target_value
        answer
      }
    }
  }
`;

// ---- MUTATIONS

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
