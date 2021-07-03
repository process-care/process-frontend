import { useQuery } from "react-query";
import { request } from "graphql-request";
import { addPage, addQuestion, getQuestions } from "./index";
import IQuestion from "interfaces/form/question";
import IPage from "interfaces/form/page";

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

export const useAddPage: any = async (values: Partial<IPage>) => {
  await request(process.env.REACT_APP_API_URL_DEV!, addPage, {
    values,
  });
};
