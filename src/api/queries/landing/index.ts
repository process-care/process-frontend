import { gql } from "graphql-request";
import { landingFragment } from "api/fragments";

export const ADD_LANDING = gql`
  ${landingFragment}
  mutation addLanding($values: PageInput) {
    createLanding(input: { data: $values }) {
      page {
        ...pageFragment
      }
    }
  }
`;

export const GET_LANDING = gql`
  ${landingFragment}
  query getLanding($id: ID!) {
    landing(id: $id) {
      ...landingFragment
    }
  }
`;

export const UPDATE_LANDING = gql`
  ${landingFragment}
  mutation updateLanding($id: ID!, $data: editLandingInput) {
    updateLanding(input: { where: { id: $id }, data: $data }) {
      landing {
        ...landingFragment
      }
    }
  }
`;
