import { request } from "graphql-request";
import { GET_SURVEY_BY_ID } from "api/queries/survey";
import { UPDATE_ORDER } from "api/queries/survey";
import { useMutation, useQuery } from "react-query";
import { getSurveyOptimisticUpdate } from "api/optimisiticUpdate";

export const getSurveyById: any = ({ id }: { id: string }) =>
  useQuery(["getSurveyById", id], () =>
    request(process.env.REACT_APP_API_URL_DEV!, GET_SURVEY_BY_ID, {
      id,
    })
  );

// order.
export const updateOrder: any = () =>
  useMutation(
    async ({ id, new_order }: { id: string; new_order: string[] }) =>
      await request(process.env.REACT_APP_API_URL_DEV!, UPDATE_ORDER, {
        id,
        new_order,
      }),
    getSurveyOptimisticUpdate("getSurveyById")
  );
