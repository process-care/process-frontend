import { gql } from "graphql-request";

export const ADD_SURVEY = gql`
  mutation addSurvey($new_survey: SurveyInput) {
    createSurvey(input: { data: $new_survey }) {
      survey {
        id
        description
      }
    }
  }
`;

export const GET_SURVEY = gql`
  query getSurvey($id: ID!) {
    survey(id: $id) {
      id
      description
      order
      questions {
        label
      }
      pages {
        id
        name
        short_name
        is_locked
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

export const DELETE_SURVEY = gql`
  mutation deleteSurvey($id: ID!) {
    deleteSurvey(input: { where: { id: $id } }) {
      survey {
        id
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
