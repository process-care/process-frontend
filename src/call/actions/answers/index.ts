import {
  useMutation,
  UseMutationResult,
  useQuery, UseQueryResult,
} from "react-query";

import { CREATE_ANSWERS, GET_ANSWERS, UPDATE_ANSWER } from "call/queries/answers";
import { client } from "..";
// import { optimisticUpdate } from "call/optimisiticUpdate";

// TYPES

export interface Answer {
  id: string,
  question: {
    id: string,
  }
  value: unknown,
}

// QUESTION EVALUATION

export interface AnswersResults {
  answers: Answer[]
}

export const useGetAnswers = (
  participationId: string,
  questionsId: string[],
): UseQueryResult<AnswersResults, Error> => {
  return useQuery<AnswersResults, Error>(
    ["participationAnswers", participationId, questionsId],
    async () => {
      return await client.request(GET_ANSWERS, {
        participationId,
        questionsId
      });
    },
    { enabled: (questionsId.length > 0) && Boolean(participationId) }
  );
};

// CREATE ANSWER

export interface AnswerCreationResults {
  createAnswer: {
    answer: Answer
  }
}

export interface AnswerPayload {
  participation: string,
  question: string,
  value: any,
}

export const useCreateAnswer = (): UseMutationResult<AnswerCreationResults, Error> =>
  useMutation<AnswerCreationResults, Error, any>(
    async (values: Partial<AnswerPayload>) =>
      await client.request(CREATE_ANSWERS, {
        data: values,
      }),
    // optimisticUpdate(["questionEvaluation"])
  );

 
  // UPDATE ANSWER
  
export interface AnswerUpdateResults {
  updateAnswer: {
    answer: Answer
  }
}

export interface UpdateAnswerPayload {
  id: string,
  data: AnswerPayload,
}

export const useUpdateAnswer = (): UseMutationResult<AnswerCreationResults, Error> =>
  useMutation<AnswerCreationResults, Error, any>(
    async (payload: UpdateAnswerPayload) =>
      await client.request(UPDATE_ANSWER, payload),
    // optimisticUpdate(["questionEvaluation"])
  );
