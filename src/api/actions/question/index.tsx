import { useMutation, useQuery } from "react-query";
import { request } from "graphql-request";
import {
  GET_QUESTION,
  ADD_QUESTION,
  GET_QUESTIONS,
  DELETE_QUESTION,
  UPDATE_QUESTION,
} from "api/queries/question";
import IQuestion from "interfaces/form/question";
import { optimisticUpdate } from "api/optimisiticUpdate";
import { API_URL } from "constants/api";

export const useGetQuestion: any = ({ id }: { id: string }) => {
  return useQuery(
    ["getQuestion", id],
    async () => {
      return await request(API_URL, GET_QUESTION, {
        id,
      });
    },
    { enabled: !!id }
  );
};

export const useGetQuestions: any = ({ page_id }: { page_id: string }) => {
  return useQuery(
    ["getQuestions", page_id],
    async () => {
      return await request(API_URL, GET_QUESTIONS, {
        page_id,
      });
    },
    { enabled: !!page_id }
  );
};

export const useAddQuestion: any = (new_question: IQuestion) =>
  useMutation(
    async (new_question: IQuestion) => {
      return await request(API_URL, ADD_QUESTION, {
        new_question,
      });
    },

    optimisticUpdate(["getQuestions"], new_question)
  );

export const useUpdateQuestion: any = (id: string, data: IQuestion) =>
  useMutation(
    async ({ id, data }: { id: string; data: IQuestion }) =>
      request(API_URL, UPDATE_QUESTION, {
        id,
        data,
      }),
    optimisticUpdate(["getQuestions"], data)
  );

export const useDeleteQuestion: any = ({ id }: { id: string }) =>
  useMutation(
    async (id: IQuestion["id"]) =>
      await request(API_URL, DELETE_QUESTION, {
        id,
      }),
    optimisticUpdate(["getQuestions", "getSurvey"], id)
  );
