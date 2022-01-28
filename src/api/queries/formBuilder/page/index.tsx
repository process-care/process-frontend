// import { gql } from "graphql-request";
// import { pageEntityFragment } from "call/fragments/page";
// import { questionEntityFragment } from "call/fragments/question";

// export const GET_PAGE_BY_SURVEY = gql`
//   ${pageEntityFragment}
//   query getPage($slug: ID!) {
//     pages(filters: { survey: { slug: { eq: $slug }}}) {
//       data { ...pageEntityFragment }
//     }
//   }
// `;

// // FIXME: Test this one (not sure about the 'questions' part)
// export const GET_PAGE = gql`
//   ${pageEntityFragment}
//   ${questionEntityFragment}

//   query getPage($id: ID!) {
//     page(id: $id) {
//       ...pageEntityFragment
//       # Include questions
//       data {
//         attributes {
//           questions {
//             ...questionEntityFragment
//           }
//         }
//       }
//     }
//   }
// `;

// export const ADD_PAGE = gql`
//   ${pageEntityFragment}

//   mutation addPage($values: PageInput) {
//     createPage(data: $values) {
//       data {
//         ...pageEntityFragment
//       }
//     }
//   }
// `;

// export const UPDATE_PAGE = gql`
//   ${pageEntityFragment}
//   mutation updatePage($id: ID!, $data: PageInput) {
//     updatePage(id: $id, data: $data) {
//       data {
//         ...pageEntityFragment
//       }
//     }
//   }
// `;

// export const DELETE_PAGE = gql`
//   mutation deletePage($id: ID!) {
//     deletePage(id: $id) {
//       data {
//         id
//       }
//     }
//   }
// `;
