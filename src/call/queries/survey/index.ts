import { gql } from "graphql-request";
import { surveyFullFragment } from "call/fragments";

// ---- QUERIES

// Get my surveys only
export const GET_MY_SURVEYS = gql`
  query getSurveys($authorId: ID!) {
    surveys(where: { author: $authorId }) {
      id
      title
      slug
      status
      createdAt
    }
  }
`;

// Get all surveys
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
      keywords
      createdAt
    }
  }
`;

// Search for a survey
export const WHERE_SURVEYS = gql`
  ${surveyFullFragment}
  query getSurveys($where: JSON!) {
    surveys(where: $where) {
      ...surveyFullFragment
    }
  }
`;

// Get one specific survey
export const GET_SURVEY = gql`
  ${surveyFullFragment}
  query getSurvey($id: ID!) {
    survey(id: $id) {
      ...surveyFullFragment
    }
  }
`;

// Get one specific survey
export const GET_SURVEY_BY_SLUG = gql`
  ${surveyFullFragment}
  query getSurveyBySlug($slug: String!) {
    surveys(where: { slug: $slug }) {
      ...surveyFullFragment
    }
  }
`;

// GEt survey metadata
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

// Get survey stats
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

// ---- MUTATIONS

// Create survey
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

// Update survey
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

// Delete survey
export const DELETE_SURVEY = gql`
  mutation deleteSurvey($id: ID!) {
    deleteSurvey(input: { where: { id: $id } }) {
      survey {
        id
      }
    }
  }
`;

// Update order in survey
export const UPDATE_ORDER = gql`
  mutation updateOrder($id: ID!, $new_order: JSON) {
    updateSurvey(input: { where: { id: $id }, data: { order: $new_order } }) {
      survey {
        order
      }
    }
  }
`;
