import { gql } from "graphql-request";

export const landingFragment = gql`
  fragment landingFragment on Landing {
    title
    subtitle
    wysiwyg
    members
    cover
    partners {
      data {
        id
        attributes {
          name
          url
        }
      }
    }
    color_theme
    video_url
    logo
    partners_logos
    about_page
  }
`;

export const landingEntityFragment = gql`
  ${landingFragment}
  
  fragment landingEntityFragment on LandingEntity {
    id
    attributes {
      ...landingFragment
    }
  }
`;
