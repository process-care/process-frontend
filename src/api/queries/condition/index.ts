import { gql } from "graphql-request";

export const GET_CONDITION = gql`
  query getCondition($id: ID!) {
    condition(id: $id) {
      id
      operator
      target_page {
        id
      }
      target_value
      target_question {
        id
      }
    }
  }
`;

export const ADD_CONDITION = gql`
  mutation addcondition($new_condition: ConditionInput) {
    createCondition(input: { data: $new_condition }) {
      condition {
        id
        group
        operator
        target_value
        referer {
          id
        }
      }
    }
  }
`;

export const UPDATE_CONDITION = gql`
  mutation updatecondition($id: ID!, $data: editConditionInput) {
    updateCondition(input: { where: { id: $id }, data: $data }) {
      condition {
        label
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
