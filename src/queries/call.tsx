import { useQuery } from "react-query";
import { request } from "graphql-request";
import { addQuestion, getQuestions } from "./index";

export const useGetQuestions: any = () => {
  return useQuery("getQuestions", async () => {
    return await request(process.env.REACT_APP_API_URL_DEV!, getQuestions);
  });
};

export const useAddQuestion: any = () => {
  return request(process.env.REACT_APP_API_URL_DEV!, addQuestion());
};
