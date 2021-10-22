import { gql } from "graphql-request";

import { pageFragment, questionFragment } from "call/fragments";

export const GET_PAGE_BY_SURVEY = gql`
  ${pageFragment}
  query getPage($slug: ID!) {
    pages(where: { survey: { slug: $slug } }) {
      ...pageFragment
    }
  }
`;

export const GET_PAGE = gql`
  ${pageFragment}
  ${questionFragment}
  query getPage($id: ID!) {
    page(id: $id) {
      ...pageFragment
      questions {
        ...questionFragment
      }
    }
  }
`;

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
