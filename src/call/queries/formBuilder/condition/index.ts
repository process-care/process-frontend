import { conditionEntityFragment } from "call/fragments/condition";
import { gql } from "graphql-request";

export const GET_CONDITION = gql`
  ${conditionEntityFragment}
  query getCondition($id: ID!) {
    condition(id: $id) {
      data {
        ...conditionEntityFragment
      }
    }
  }
`;

export const GET_CONDITIONS: any = (type: string) => {
  const target = type === "page" ? "referer_page" : "referer_question";
  return gql`
    ${conditionEntityFragment}
    query getConditions($id: ID!) {
      conditions(filters: { ${target}: { id: { eq: $id } } }) {
        data {
          ...conditionEntityFragment
        }
      }
    }
  `;
};

export const GET_CONDITIONS_BY_QUESTION = gql`
  ${conditionEntityFragment}
  query getConditons($referer_question: [ID]) {
    conditions(filters: { referer_question: { id: { eq: $referer_question }}}) {
      data {
        ...conditionEntityFragment
      }
    }
  }
`;
export const GET_CONDITIONS_BY_PAGE = gql`
  ${conditionEntityFragment}
  query getConditons($referer_page: [ID]) {
    conditions(filters: { referer_page: { id: { eq: $referer_page }}}) {
      data {
        ...conditionEntityFragment
      }
    }
  }
`;

export const ADD_CONDITION = gql`
  ${conditionEntityFragment}
  mutation addcondition($newCondition: ConditionInput) {
    createCondition(data: $newCondition) {
      data {
        ...conditionEntityFragment
      }
    }
  }
`;

export const UPDATE_CONDITION = gql`
  ${conditionEntityFragment}
  mutation updatecondition($id: ID!, $data: editConditionInput) {
    updateCondition(id: $id, data: $data) {
      data {
        ...conditionEntityFragment
      }
    }
  }
`;

export const DELETE_GROUP_CONDITION = gql`
  mutation deleteGroupCondition($name: String) {
    deleteGroupCondition(name: $name)
  }
`;

export const DELETE_CONDITION = gql`
  mutation deletecondition($id: ID!) {
    deleteCondition(id: $id) {
      data {
        id
      }
    }
  }
`;

// FIXME: Check with the backend
export const CHECK_SURVEY = gql`
  query checkSurvey($surveyId: ID!) {
    checkSurvey(id: $surveyId) {
      valid
      errors {
        valid
        pageId
        errors {
          questionId
          __typename
          unordered {
            conditionId
            targetId
          }
        }
      }
    }
  }
`;
