import { useMutation, useQuery } from "react-query";
import { request, gql } from "graphql-request";
import IQuestion from "interfaces/form/question";

export const usePosts: any = (id: string) => {
  return useQuery(
    ["posts", id],
    async () => {
      const { survey } = await request(
        process.env.REACT_APP_API_URL_DEV!,
        gql`
          query GetSurvey($id: ID!) {
            survey(id: $id) {
              id
              description
              order
              pages {
                id
                name
                short_name
                is_locked
                questions {
                  id
                  label
                }
              }
            }
          }
        `,
        { id }
      );

      return survey;
    },
    {
      enabled: !!id,
    }
  );
};
