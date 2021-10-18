import { gql } from "graphql-request";

export const conditionFragment = gql`
  fragment conditionFragment on Condition {
    id
    operator
    group
    type
    referer_page {
      id
      name
    }
    group
    target {
      id
      options
      label
      type
    }
    target_value
    referer_question {
      id
      label
      page {
        id
      }
    }
  }
`;

export const pageFragment = gql`
  fragment pageFragment on Page {
    id
    name
    short_name
    is_locked
    conditions {
      id
    }
    questions {
      id
    }
    survey {
      id
    }
  }
`;

export const questionFragment = gql`
  fragment questionFragment on Question {
    label
    id
    type
    rows
    options
    placeholder
    help_text
    options
    required
    units
    # max
    # min
    step
    internal_title
    page {
      id
    }
    conditions {
      id
      referer_page {
        id
      }
      referer_question {
        id
      }
      type
    }
  }
`;
export const landingFragment = gql`
  fragment landingFragment on Landing {
    id
    title
    subtitle
    wysiwyg
    members
    image_cover
    cover {
      id
      name
      url
    }
    partners {
      id
      name
      url
    }
    color_theme
    video_url
    logo
    partners_logos
    about_page
  }
`;

export const surveyFullFragment = gql`
  fragment surveyFullFragment on Survey {
    id
    description
    order
    title
    slug
    language
    email
    keywords
    categories
    author {
      email
    }
    pages {
      id
      name
      short_name
      is_locked
      conditions {
        id
        operator
        group
        type
        referer_page {
          id
          name
        }
        group
        target {
          id
          options
          label
          type
        }
        target_value
        referer_question {
          id
          label
          page {
            id
          }
        }
      }
      questions {
        label
        id
        type
        rows
        options
        placeholder
        help_text
        options
        required
        units
        # max
        # min
        step
        internal_title
        page {
          id
        }
        conditions {
          id
          operator
          group
          type
          referer_page {
            id
            name
          }
          group
          target {
            id
            options
            label
            type
          }
          target_value
          referer_question {
            id
            label
            page {
              id
            }
          }
        }
      }
    }

    landing {
      id
      color_theme
      logo
    }
    consentement {
      url
      id
      name
    }
    pages {
      id
      name
      short_name
      is_locked
      survey {
        id
      }
      questions {
        id
      }
      conditions {
        id
      }
    }
  }
`;
