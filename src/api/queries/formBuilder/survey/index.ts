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

// TO FILTER BY USER
export const GET_SURVEYS = gql`
  query getSurveys {
    surveys {
      id
      description
      status
      createdAt
    }
  }
`;

export const GET_SURVEY = gql`
  query getSurvey($id: ID!) {
    survey(id: $id) {
      id
      description
      order
      landing {
        id
      }
      pages {
        id
        name
        short_name
        is_locked
        questions {
          id
        }
        conditions {
          id
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
