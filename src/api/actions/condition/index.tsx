import { useMutation } from "react-query";
import { request } from "graphql-request";
import {
  ADD_CONDITION,
  UPDATE_CONDITION,
  DELETE_CONDITION,
} from "api/queries/condition";

import { optimisticUpdate } from "api/optimisiticUpdate";
import ICondition from "interfaces/form/condition";

export const addCondition: any = () =>
  useMutation(
    async (new_condition: ICondition) =>
      await request(process.env.REACT_APP_API_URL_DEV!, ADD_CONDITION, {
        new_condition,
      }),
    optimisticUpdate("getSurvey")
  );

export const updateCondition: any = () =>
  useMutation(
    async ({ id, data }: { id: string; data: ICondition }) =>
      await request(process.env.REACT_APP_API_URL_DEV!, UPDATE_CONDITION, {
        id,
        data,
      }),
    optimisticUpdate("getSurvey")
  );

export const deleteCondition: any = () =>
  useMutation(
    async (id: ICondition["id"]) =>
      await request(process.env.REACT_APP_API_URL_DEV!, DELETE_CONDITION, {
        id,
      }),
    optimisticUpdate("getSurvey")
  );
