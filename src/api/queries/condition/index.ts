import { gql } from "graphql-request";

export const GET_CONDITION = gql`
  query getCondition($id: ID!) {
    condition(id: $id) {
      id
      operator
      is_valid
      group
      step
      referer_page {
        id
        name
      }
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
        target {
          id
          answers
        }
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
