import { gql } from "graphql-request";

export const ADD_SURVEY = gql`
  mutation addSurvey($description: SurveyInput) {
    createSurvey(input: { data: $description }) {
      survey {
        id
        description
      }
    }
  }
`;

// TO DO FILTER BY USER
export const GET_SURVEYS = gql`
  query getSurveys {
    surveys {
      id
      description
      status
      participations {
        id
      }
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
