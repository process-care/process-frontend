import { useQuery } from "react-query";
import { request } from "graphql-request";
import { addQuestion, getQuestions } from "api/queries";
import IQuestion from "interfaces/form/question";

export const useGetQuestions: any = () => {
  return useQuery("getQuestions", async () => {
    return await request(process.env.REACT_APP_API_URL_DEV!, getQuestions);
  });
};

export const useAddQuestion: any = async (values: Partial<IQuestion>) => {
  await request(process.env.REACT_APP_API_URL_DEV!, addQuestion, {
    values,
  });
};
