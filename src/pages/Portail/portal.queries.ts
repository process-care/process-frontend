import { gql } from "graphql-request";
import { client } from 'call/actions';
import {
  useQuery,
  UseQueryResult,
} from "react-query";
import { ISurveysRes } from "types/survey";

// ---- REFERENCES

const STATUS_PUBLISHED = ["pending", "closed", "archived"];

// ---- GQL

export const WHERE_SURVEYS = gql`
  query getSurveys($where: JSON!) {
    surveys(where: $where) {
      id
      description
      title
      slug
      status
      participations {
        id
      }
      landing {
        id
        color_theme
        subtitle
      }
      keywords
      createdAt
    }
  }
`;

// ---- QUERIES

// Get surveys by status
export const useGetPublishedSurvey = (): UseQueryResult<ISurveysRes, Error> =>
useQuery<ISurveysRes, Error>(
  "getPublishedSurveys",
  () => client.request(WHERE_SURVEYS, { where: { status: STATUS_PUBLISHED }})
);