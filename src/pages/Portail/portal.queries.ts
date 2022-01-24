import { gql } from "graphql-request";
import { client } from "call/actions";
import { useQuery, UseQueryResult } from "react-query";
import { shapeSurveys } from "call/shapers/survey";
import { SurveyCollection } from "types/survey";

// ---- REFERENCES

const STATUS_PUBLISHED = ["pending", "closed", "archived"];
export const ITEMS_PER_PAGE = 10;

// ---- GQL

export const WHERE_SURVEYS = gql`
  query getSurveys($filters: SurveyFiltersInput, $pagination: PaginationArg, $sort: [String]) {
    surveys(filters: $filters, pagination: $pagination, sort: $sort) {
      data {
        id
        attributes {
          description
          title
          slug
          status
          participations {
            data { id }
          }
          landing {
            data {
              id
              attributes {
                color_theme
                subtitle
              }
            }
          }
          keywords
          createdAt
        }
      }

      meta {
        pagination {
          total
          page
          pageSize
          pageCount
        }
      }
    }
  }
`;

// ---- QUERIES

// Get surveys by status
export const useGetPublishedSurvey = (pagination: number): UseQueryResult<SurveyCollection, Error> => {
  return useQuery(
    ["getPublishedSurveys", pagination],
    () => client.request(WHERE_SURVEYS, {
      filters: { status: { in: STATUS_PUBLISHED }},
      pagination: { page: pagination, pageSize: ITEMS_PER_PAGE },
    }),
    {
      select: shapeSurveys,
    }
  );
};

export const useSearchSurvey = (query: string): UseQueryResult<SurveyCollection, Error> => {
  return useQuery(
    ["getPublishedSurveys", query],
    () => client.request(WHERE_SURVEYS, {
      filters: { status: { in: STATUS_PUBLISHED }, title: { contains: query }},
    }),
    {
      select: shapeSurveys,
    }
  );
};
