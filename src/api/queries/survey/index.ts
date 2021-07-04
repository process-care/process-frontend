import { gql } from "graphql-request";

export const getSurveyById = gql`
  query getSurveyById($id: ID!) {
    survey(id: $id) {
      id
      description
      order
      questions {
        label
      }
      pages {
        id
        questions {
          label
          id
          type
          answers
          placeholder
          help_text
          answers
        }
      }
    }
  }
`;
