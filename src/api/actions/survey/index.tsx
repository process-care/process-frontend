import { request } from "graphql-request";
import { GET_SURVEY, DELETE_SURVEY, ADD_SURVEY } from "api/queries/survey";
import { UPDATE_ORDER } from "api/queries/survey";
import { useMutation, useQuery } from "react-query";
import { optimisticUpdate } from "api/optimisiticUpdate";
import ISurvey from "interfaces/survey";

export const addSurvey: any = () =>
  useMutation(
    async (new_survey: ISurvey) =>
      await request(process.env.REACT_APP_API_URL_DEV!, ADD_SURVEY, {
        new_survey,
      }),
    optimisticUpdate(["getSurvey"])
  );

export const useGetSurvey: any = ({ id }: { id: string }) =>
  useQuery(
    ["getSurvey", id],
    () =>
      request(process.env.REACT_APP_API_URL_DEV!, GET_SURVEY, {
        id,
      }),
    { enabled: !!id }
  );

export const deleteSurvey: any = () =>
  useMutation(
    async (id: string) =>
      await request(process.env.REACT_APP_API_URL_DEV!, DELETE_SURVEY, {
        id,
      }),
    optimisticUpdate(["getSurvey"])
  );

// order.
export const useUpdateOrder: any = () =>
  useMutation(
    async ({ id, new_order }: { id: string; new_order: string[] }) =>
      await request(process.env.REACT_APP_API_URL_DEV!, UPDATE_ORDER, {
        id,
        new_order,
      }),
    optimisticUpdate(["getSurvey"])
  );
