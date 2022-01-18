import { gql } from "graphql-request";

export const pageFragment = gql`
  fragment pageFragment on Page {
    name
    short_name
    is_locked
    conditions {
      data { id }
    }
    questions {
      data { id }
    }
    survey {
      data { id }
    }
  }
`;

export const pageEntityFragment = gql`
  ${pageFragment}
  
  fragment pageEntityFragment on PageEntity {
    id
    attributes {
      ...pageFragment
    }
  }
`;