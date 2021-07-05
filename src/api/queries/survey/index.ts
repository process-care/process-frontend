import { gql } from "graphql-request";

export const GET_SURVEY_BY_ID = gql`
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

// order

export const UPDATE_ORDER = gql`
  mutation updateOrder($id: ID!, $new_order: JSON) {
    updateSurvey(input: { where: { id: $id }, data: { order: $new_order } }) {
      survey {
        order
      }
    }
  }
`;
