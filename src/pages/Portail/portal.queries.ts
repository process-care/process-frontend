import { gql } from "graphql-request";
import { client, clientWithNoHeaders } from "call/actions";
import { useQuery, UseQueryResult } from "react-query";
import { ISurveysRes } from "types/survey";

// ---- REFERENCES

const STATUS_PUBLISHED = ["pending", "closed", "archived"];
export const ITEMS_PER_PAGE = 10;

// ---- GQL

export const WHERE_SURVEYS = gql`
  query getSurveys($where: JSON!, $pagination: Int, $limit: Int) {
    surveysConnection(where: $where) {
      aggregate {
        totalCount
        count
      }
    }
    surveys(where: $where, limit: $limit, start: $pagination) {
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
export const useGetPublishedSurvey = (
  pagination: number
): UseQueryResult<ISurveysRes, Error> => {
  return useQuery<ISurveysRes, Error>(
    ["getPublishedSurveys", pagination],
    async () => {
      return await clientWithNoHeaders.request(WHERE_SURVEYS, {
        where: { status: STATUS_PUBLISHED },
        limit: ITEMS_PER_PAGE,
        pagination,
      });
    }
  );
};

export const useSearchSurvey = (
  query: string
): UseQueryResult<ISurveysRes, Error> => {
  return useQuery<ISurveysRes, Error>(
    ["getPublishedSurveys", query],
    async () => {
      return await client.request(WHERE_SURVEYS, {
        where: { status: STATUS_PUBLISHED, title_contains: query },
        pagination: 0,
      });
    }
  );
};
