import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query";
import {
  GET_QUESTION,
  ADD_QUESTION,
  GET_QUESTIONS,
  DELETE_QUESTION,
  UPDATE_QUESTION,
} from "call/queries/formBuilder/question";
import IQuestion, { IQuestionsRes, IQuestionRes } from "types/form/question";
import { optimisticUpdate } from "call/optimisiticUpdate";
import { client } from "call/actions";

export const useGetQuestion = (
  id: string
): UseQueryResult<IQuestionRes, Error> => {
  return useQuery<IQuestionRes, Error>(
    ["getQuestion", id],
    async () => {
      return await client.request(GET_QUESTION, {
        id,
      });
    },
    { enabled: !!id }
  );
};

export const useGetQuestions = (
  page_id: string
): UseQueryResult<IQuestionsRes, Error> => {
  return useQuery<IQuestionsRes, Error>(
    ["getQuestions", page_id],
    async () => {
      return await client.request(GET_QUESTIONS, {
        page_id,
      });
    },
    { enabled: !!page_id }
  );
};

export const useAddQuestion = (
  new_question?: IQuestion
): UseMutationResult<Partial<IQuestion>, Error> =>
  useMutation<IQuestion, Error, any>(
    async (new_question: IQuestion) => {
      return await client.request(ADD_QUESTION, {
        new_question,
      });
    },

    optimisticUpdate(["getQuestions"], new_question)
  );

export const useUpdateQuestion = (
  id?: string,
  data?: IQuestion
): UseMutationResult<IQuestion, Error> =>
  useMutation<IQuestion, Error, any>(
    async ({ id, data }: { id: string; data: IQuestion }) =>
      client.request(UPDATE_QUESTION, {
        id,
        data,
      }),
    optimisticUpdate(["getQuestions"], data)
  );

export const useDeleteQuestion = (
  id?: string
): UseMutationResult<IQuestion, Error> =>
  useMutation<IQuestion, Error, any>(
    async (id: IQuestion["id"]) =>
      await client.request(DELETE_QUESTION, {
        id,
      }),
    optimisticUpdate(["getQuestions", "getSurvey"], id)
  );
