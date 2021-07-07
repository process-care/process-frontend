import { gql } from "graphql-request";

export const GET_CONDITION = gql`
  query getCondition($id: ID!) {
    condition(id: $id) {
      id
      operator
      is_valid
      group
      step
      type
      referer_page {
        id
        name
      }
      group
      target {
        id
        answers
        label
        type
      }
      target_value
      referer_question {
        id
        label
      }
    }
  }
`;

export const GET_CONDITIONS: any = (type: string) => {
  const target = type === "page" ? "referer_page" : "referer_question";
  return gql`
    query getConditions($id: ID!) {
      conditions(where: { ${target}: $id }) {
        id
        operator
        is_valid
        group
        step
        type
        target {
          id
          answers
        }
          group 
        referer_page {
          id
          name
        }
        target_value
        referer_question {
          id
          label
        }
      }
    }
  `;
};

export const ADD_CONDITION = gql`
  mutation addcondition($new_condition: ConditionInput) {
    createCondition(input: { data: $new_condition }) {
      condition {
        id
        type
        referer_page {
          id
          name
        }
        step
        operator
        group
        target_value
        referer_question {
          id
          label
        }
      }
    }
  }
`;

export const UPDATE_CONDITION = gql`
  mutation updatecondition($id: ID!, $data: editConditionInput) {
    updateCondition(input: { where: { id: $id }, data: $data }) {
      condition {
        id
        type
        referer_page {
          id
          name
        }
        operator
        group
        step
        target {
          id
          answers
        }
        target_value
        referer_question {
          id
          label
        }
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
