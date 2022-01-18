import { gql } from "graphql-request";
import { questionFragment, questionEntityFragment } from "call/fragments/question";

// ---- QUERIES

// export const GET_QUESTIONS_BY_PAGE = gql`
//   ${questionFragment}
//   query getQuestions($page_id: ID!) {
//     questions(where: { page: $page_id }, limit: 10) {
//       ...questionFragment
//     }
//   }
// `;

// FIXME: Check with the backend
export const GET_QUESTIONS_BY_SURVEY = gql`
  ${questionFragment}

  query questionsBySurvey($surveyId: ID!) {
    questionsBySurvey(surveyId: $surveyId) {
      ...questionFragment
    }
  }
`;

// FIXME: What is the argument ? Is it really an array ?
export const GET_QUESTIONS_BY_PAGE = gql`
  ${questionEntityFragment}

  query getQuestions($page: [ID]) {
    questions(filters: { page: { in: $page }}) {
      data {
        ...questionEntityFragment
      }
    }
  }
`;

export const GET_QUESTION = gql`
  ${questionEntityFragment}

  query getQuestion($id: ID!) {
    question(id: $id) {
      data {
        ...questionEntityFragment
      }
    }
  }
`;

// FIXME: Check with the backend
export const GET_QUESTION_EVALUATION = gql`
  query getQuestionEvaluation($questionId: ID!, $participationId: ID!) {
    evaluation: questionEvaluation(
      questionId: $questionId
      participationId: $participationId
    ) {
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
  mutation addQuestion($values: QuestionInput) {
    createQuestion(data: $values) {
      data {
        id
        attributes {
          type
          page {
            data { id }
          }
        }
      }
    }
  }
`;

export const UPDATE_QUESTION = gql`
  mutation updateQuestion($id: ID!, $data: QuestionInput) {
    updateQuestion(id: $id, data: $data) {
      data {
        id
        attributes {
          type
          internal_title
        }
      }
    }
  }
`;

export const DELETE_QUESTION = gql`
  mutation deleteQuestion($id: ID!) {
    deleteQuestion(id: $id) {
      data {
        id
      }
    }
  }
`;
