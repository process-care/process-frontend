import { gql } from "graphql-request";

// FRAGMENT

const answerFragment = gql`
  fragment answerFragment on Answer {
    id
    question {id}
    value
  }
`;

// QUERIES

export const GET_ANSWERS = gql`
  ${answerFragment}

  query getAnswers($participationId: ID!, $questionsId: [ID]!) {
    answers(where: {
      participation: $participationId,
      question_in: $questionsId
    }) {
      ...answerFragment
    }
  }
`;

// MUTATION

export const CREATE_ANSWERS = gql`
  ${answerFragment}

  mutation createAnswer ($data: AnswerInput!) {
    createAnswer(input: {
      data: $data
    }) {
      answer {
        ...answerFragment
      }
    }
  }
`

export const UPDATE_ANSWER = gql`
  ${answerFragment}

  mutation updateAnswer ($id: ID!, $data: editAnswerInput!) {
    updateAnswer(input: {
      where: { id: $id }
      data: $data
    }) {
      answer {
        ...answerFragment
      }
    }
  }
`
