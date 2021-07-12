import { gql } from "graphql-request";

import { pageFragment } from "api/fragments";

export const ADD_PAGE = gql`
  ${pageFragment}
  mutation addPage($values: PageInput) {
    createPage(input: { data: $values }) {
      page {
        ...pageFragment
      }
    }
  }
`;

export const UPDATE_PAGE = gql`
  ${pageFragment}
  mutation updatePage($id: ID!, $data: editPageInput) {
    updatePage(input: { where: { id: $id }, data: $data }) {
      page {
        ...pageFragment
      }
    }
  }
`;

export const DELETE_PAGE = gql`
  mutation deletePage($id: ID!) {
    deletePage(input: { where: { id: $id } }) {
      page {
        id
      }
    }
  }
`;
