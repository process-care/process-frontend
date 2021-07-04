import { gql } from "graphql-request";

export const addPage = gql`
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

// A voir si on utilise la query du survey.

export const getPages = gql`
  query getPages {
    pages {
      id
      short_name
      name
      is_locked
      description
      statics {
        id
      }
      survey {
        id
      }
      conditioned_by {
        id
      }
    }
  }
`;
