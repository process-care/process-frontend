// import { gql } from "graphql-request";
// import { surveyEntityFragment } from "call/fragments/survey";

// // ---- QUERIES

// // Get my surveys only
// export const GET_MY_SURVEYS = gql`
//   query getSurveys($authorId: ID!) {
//     surveys(filters: { author: { id: { eq: $authorId }}}) {
//       data {
//         id
//         attributes {
//           description
//           title
//           slug
//           status
//           order
//           createdAt
//           landing {
//             data {
//               id
//               attributes {
//                 color_theme
//                 subtitle
//               }
//             }
//           }
//           participations {
//             data { id }
//           }
//         }
//       }
//     }
//   }
// `;

// // Get all surveys
// export const GET_SURVEYS = gql`
//   query getSurveys {
//     data {
//       id
//       attributes {
//         description
//         title
//         slug
//         status
//         participations {
//           data { id }
//         }
//         landing {
//           data {
//             id
//             attributes {
//               color_theme
//               subtitle
//             }
//           }
//         }
//         keywords
//         createdAt
//       }
//     }
//   }
// `;

// // Search for a survey
// // FIXME: this has a depth problem with the fragment
// export const WHERE_SURVEYS = gql`
//   ${surveyEntityFragment}

//   query getSurveys($filters: SurveyFiltersInput, $pagination: PaginationArg, $sort: [String]) {
//     surveys(filters: $filters, pagination: $pagination, sort: $sort) {
//       data {
//         ...surveyEntityFragment
//       }

//       meta {
//         pagination {
//           total
//           page
//           pageSize
//           pageCount
//         }
//       }
//     }
//   }
// `;

// // Get one specific survey
// export const GET_SURVEY = gql`
//   ${surveyEntityFragment}

//   query getSurvey($id: ID!) {
//     survey(id: $id) {
//       data {
//         ...surveyEntityFragment
//       }
//     }
//   }
// `;

// // Get one specific survey
// export const GET_SURVEY_BY_SLUG = gql`
//   ${surveyEntityFragment}
  
//   query getSurveyBySlug($slug: String!) {
//     surveys(filters: { slug: { eq: $slug }}) {
//       data {
//         ...surveyEntityFragment
//       }
//     }
//   }
// `;

// // GEt survey metadata
// export const GET_SURVEY_METADATAS = gql`
//   query getSurvey($id: ID!) {
//     survey(id: $id) {
//       data {
//         id
//         attributes {
//           title
//           description
//           language
//           email
//           keywords
//           categories
//           email
//           landing {
//             data { id }
//           }
//         }
//       }
//     }
//   }
// `;

// // Get survey stats
// export const GET_SURVEY_STATS = gql`
//   query getSurveyStats($id: ID!) {
//     surveyStats(id: $id) {
//       title
//       description
//       publishedAt
//       createdAt
//       statistics {
//         day {
//           visits
//           consented
//           completed
//         }
//         week {
//           visits
//           consented
//           completed
//         }
//         month {
//           visits
//           consented
//           completed
//         }
//         semester {
//           visits
//           consented
//           completed
//         }
//         year {
//           visits
//           consented
//           completed
//         }
//         all {
//           visits
//           consented
//           completed
//         }
//       }
//     }
//   }
// `;

// // ---- MUTATIONS

// // Create survey
// export const ADD_SURVEY = gql`
//   mutation addSurvey($values: SurveyInput!) {
//     createSurvey(data: $values) {
//       data {
//         id
//         attributes {
//           title
//           slug
//         }
//       }
//     }
//   }
// `;

// // Update survey
// export const UPDATE_SURVEY = gql`
//   mutation updateSurvey($id: ID!, $data: editSurveyInput) {
//     updateSurvey(id: $id, data: $data }) {
//       data {
//         id
//         attributes {
//           title
//           slug
//           need_consent
//           landing {
//             data { id }
//           }
//         }
//       }
//     }
//   }
// `;

// // Delete survey
// export const DELETE_SURVEY = gql`
//   mutation deleteSurvey($id: ID!) {
//     deleteSurvey(id: $id) {
//       data {
//         id
//       }
//     }
//   }
// `;

// // Update order in survey
// export const UPDATE_ORDER = gql`
//   mutation updateOrder($id: ID!, $new_order: JSON) {
//     updateSurvey(id: $id, data: { order: $new_order }) {
//       data {
//         id
//         attributes {
//           order
//         }
//       }
//     }
//   }
// `;
