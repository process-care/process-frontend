import { gql } from "graphql-request";

export const ADD_PAGE = gql`
  mutation addPage($values: PageInput) {
    createPage(input: { data: $values }) {
      page {
        name
        short_name
        id
      }
    }
  }
`;

export const UPDATE_PAGE = gql`
  mutation updatePage($id: ID!, $data: editPageInput) {
    updatePage(input: { where: { id: $id }, data: $data }) {
      page {
        id
        name
        short_name
        survey {
          id
        }
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
