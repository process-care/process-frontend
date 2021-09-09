import { gql } from "graphql-request";

export const ADD_SURVEY = gql`
  mutation addSurvey($values: SurveyInput) {
    createSurvey(input: { data: $values }) {
      survey {
        id
        title
        slug
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
      title
      slug
      status
      participations {
        id
      }
      landing {
        id
        color_theme
        subtitle
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
      title
      slug
      language
      email
      keywords
      categories
      landing {
        id
      }
      consentement {
        url
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

export const GET_SURVEY_METADATAS = gql`
  query getSurvey($id: ID!) {
    survey(id: $id) {
      id
      title
      description
      language
      email
      keywords
      categories
      email
      landing {
        id
      }
    }
  }
`;

export const GET_SURVEY_STATS = gql`
  query getSurveyStats($id: ID!) {
    surveyStats(id: $id) {
      title
      description
      publishedAt
      createdAt
      statistics {
        day {
          visits
          consented
          completed
        }
        week {
          visits
          consented
          completed
        }
        month {
          visits
          consented
          completed
        }
        semester {
          visits
          consented
          completed
        }
        year {
          visits
          consented
          completed
        }
        all {
          visits
          consented
          completed
        }
      }
    }
  }
`;

export const UPDATE_SURVEY = gql`
  mutation updateSurvey($id: ID!, $data: editSurveyInput) {
    updateSurvey(input: { where: { id: $id }, data: $data }) {
      survey {
        id
        title
        slug
        landing {
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
