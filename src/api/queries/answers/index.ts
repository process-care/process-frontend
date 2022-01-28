// import { gql } from "graphql-request";

// // FRAGMENT

// const answerFragment = gql`
//   fragment answerFragment on AnswerEntity {
//     id 
//     attributes {
//       question { data { id } }
//       value
//     }
//   }
// `;

// // QUERIES

// export const GET_ANSWERS = gql`
//   ${answerFragment}

//   query getAnswers($participationId: ID!, $questionsId: [ID]!) {
//     answers(filters: {
//       participation: { id: { eq: $participationId } },
//       question: { id: { in: $questionsId } },
//     }) {
//       data { ...answerFragment }
//     }
//   }
// `;

// export const GET_ANSWERS_BY_PARTICIPATION = gql`
//   ${answerFragment}

//   query getAnswersByParticipation($participationId: ID!) {
//     answers(filters: { participation: { id: { eq: $participationId } } }) {
//       data { ...answerFragment }
//     }
//   }
// `;

// // MUTATION

// export const CREATE_ANSWER = gql`
//   ${answerFragment}

//   mutation createAnswer ($data: AnswerInput!) {
//     createAnswer(data: $data) {
//       data { ...answerFragment }
//     }
//   }
// `

// export const UPDATE_ANSWER = gql`
//   ${answerFragment}

//   mutation updateAnswer ($id: ID!, $data: AnswerInput!) {
//     updateAnswer(id: $id, data: $data) {
//       data { ...answerFragment }
//     }
//   }
// `
