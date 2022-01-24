import { gql } from "graphql-request";
// import { conditionEntityFragment } from "./condition";
// import { questionEntityFragment } from "./question";

// FIXME: Depth has been cut
// ${conditionEntityFragment}
// ${questionEntityFragment}

// pages {
//   data {
//     id
//     attributes {
//       name
//       short_name
//       is_locked

//       conditions {
//         ...conditionEntityFragment
//       }

//       questions {
//         ...questionEntityFragment
//       }
//     }
//   }
// }

export const surveyEntityFragment = gql`
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
        data { attributes { email } }
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
      # The content has been removed because its going too deep

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