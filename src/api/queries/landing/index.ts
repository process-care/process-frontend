// import { gql } from "graphql-request";
// import { landingEntityFragment } from "call/fragments/landing";

// export const ADD_LANDING = gql`
//   ${landingEntityFragment}
//   mutation addLanding($data: LandingInput) {
//     createLanding(data: $data) {
//       data { ...landingFragment }
//     }
//   }
// `;

// export const GET_LANDING = gql`
//   ${landingEntityFragment}
//   query getLanding($id: ID!) {
//     landing(id: $id) {
//       data { ...landingFragment }
//     }
//   }
// `;

// export const UPDATE_LANDING = gql`
//   ${landingEntityFragment}
//   mutation updateLanding($id: ID!, $data: editLandingInput) {
//     updateLanding(id: $id, data: $data) {
//       data { ...landingFragment }
//     }
//   }
// `;
