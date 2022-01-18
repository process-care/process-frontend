import { gql } from "graphql-request";

export const conditionFragment = gql`
  fragment conditionFragment on Condition {
    group
    type
    operator
    target_value
    target {
      data {
        id
        attributes {
          options
          label
          type
        }
      }
    }
    referer_page {
      data {
        id
        attributes {
          name
        }
      }
    }
    referer_question {
      data {
        id
        attributes {
          label
          page { data { id } }
        }
      }
    }
}
`;

export const conditionEntityFragment = gql`
  ${conditionFragment}

  fragment conditionEntityFragment on ConditionEntity {
    id
    attributes {
      ...conditionFragment
    }
  }
`;