import { gql } from "graphql-request";
import { conditionFragment } from "../../../fragments";

export const GET_CONDITION = gql`
  ${conditionFragment}
  query getCondition($id: ID!) {
    condition(id: $id) {
      ...conditionFragment
    }
  }
`;

export const GET_CONDITIONS: any = (type: string) => {
  const target = type === "page" ? "referer_page" : "referer_question";
  return gql`
  ${conditionFragment}
    query getConditions($id: ID!) {
      conditions(where: { ${target}: $id }) {
       ...conditionFragment
      }
    }
  `;
};

export const ADD_CONDITION = gql`
  ${conditionFragment}
  mutation addcondition($new_condition: ConditionInput) {
    createCondition(input: { data: $new_condition }) {
      condition {
        ...conditionFragment
      }
    }
  }
`;

export const UPDATE_CONDITION = gql`
  ${conditionFragment}
  mutation updatecondition($id: ID!, $data: editConditionInput) {
    updateCondition(input: { where: { id: $id }, data: $data }) {
      condition {
        ...conditionFragment
      }
    }
  }
`;

export const DELETE_CONDITION = gql`
  mutation deletecondition($id: ID!) {
    deleteCondition(input: { where: { id: $id } }) {
      condition {
        id
      }
    }
  }
`;

export const CHECK_SURVEY = gql`
  query checkSurvey($surveyId: ID!) {
    checkSurvey(id: $surveyId) {
      errors {
        valid
      }
    }
  }
`;
