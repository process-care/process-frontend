import { request } from "graphql-request";
import { getSurveyById } from "api/queries/survey";

export const useGetSurveyById: any = (id: string) => {
  return request(process.env.REACT_APP_API_URL_DEV!, getSurveyById, {
    id,
  });
};
