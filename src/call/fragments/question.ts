import { gql } from "graphql-request";
import { conditionEntityFragment } from "./condition";

export const questionEntityFragment = gql`
  fragment questionEntityFragment on QuestionEntity {
    id
    attributes {
      ...questionFragment
    }
  }
`;

// Question Metadata
export const questionMetadataFragment = gql`
fragment questionMetadataFragment on Question {
  label
  type
  rows
  options
  placeholder
  help_text
  min
  max
  reverse
  vertical
  required
  units
  factors
  max_loop
  wysiwyg
  step
  internal_title
  mono_thumbnail_input
  freeclassification_responses_count
  page {
    data { id }
  }
}`;

// Question with full conditions
export const questionFragment = gql`
  ${conditionEntityFragment}
  ${questionMetadataFragment}

  fragment questionFragment on Question {
    ...questionMetadataFragment
    conditions {
      data {
        ...conditionEntityFragment
      }
    }
  }
`;

// Question with light conditions
export const questionLightFragment = gql`
  ${questionMetadataFragment}

  fragment questionFragment on Question {
    ...questionMetadataFragment
    conditions {
      data {
        id
        attributes {
          target {
            data { id }
          }
          type
          operator
          target_value
          group
        }
      }
    }
  }
`;