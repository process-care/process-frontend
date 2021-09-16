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
  GET_QUESTION_EVALUATION,
} from "call/queries/formBuilder/question";
import IQuestion, { IQuestionsRes, IQuestionRes } from "types/form/question";
import { optimisticUpdate } from "call/optimisiticUpdate";
import { client } from "call/actions";

// ---- GETTERS

// SINGLE

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

// MANY

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

// QUESTION EVALUATION

export interface QuestionEvaluationResult {
  evaluation: {
    id: string;
    conditions: [EvaluationCondition]
  }
}

export interface EvaluationCondition {
  id: string,
  group: string,
  operator: string,
  target_value: string,
  answer?: unknown,
}

export const useQuestionEvaluation = (
  questionId: string,
  participationId: string,
): UseQueryResult<QuestionEvaluationResult, Error> => {
  return useQuery<QuestionEvaluationResult, Error>(
    ["questionEvaluation", questionId, participationId],
    async () => {
      return await client.request(GET_QUESTION_EVALUATION, {
        questionId,
        participationId,
      });
    },
    { enabled: Boolean(questionId) && Boolean(participationId) }
  );
};

// ---- CRUD

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
