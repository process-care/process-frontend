import { gql } from "graphql-request";
import { conditionEntityFragment } from "./condition";
import { questionEntityFragment } from "./question";

export const surveyEntityFragment = gql`
  ${conditionEntityFragment}
  ${questionEntityFragment}

  fragment surveyEntityFragment on SurveyEntity {
    id
    attributes {
      # Metadata
      description
      order
      title
      slug
      status
      language
      email
      keywords
      categories
      author {
        data { email }
      }

      # Landing
      landing {
        data {
          id
          attributes {
            color_theme
            logo
          }
        }
      }

      # Pages
      pages {
        data {
          id
          attributes {
            name
            short_name
            is_locked

            conditions {
              ...conditionEntityFragment
            }

            questions {
              ...questionEntityFragment
            }
          }
        }
      }

      # Consent & related
      need_consent
      notice_consent {
        data {
          id
          attributes {
            url
            name
          }
        }
      }
    }
  }
`;