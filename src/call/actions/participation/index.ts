import {
  useMutation,
  UseMutationResult,
} from "react-query";
import { request } from "graphql-request";

import { API_URL } from "constants/api";
import { CREATE_PARTICIPATION } from "call/queries/participation";

// ---- TYPES

interface CreateParticipationPayload {
  consent: boolean,
  completed: boolean,
  contact?: string,
  survey: string,
}

interface CreateParticipationResults {
  id: string
}

// ---- ACTIONS

export const useCreateParticipation = (): UseMutationResult<CreateParticipationResults, Error> =>
  useMutation<CreateParticipationResults, Error, any>(
    async (values: CreateParticipationPayload) => await request(API_URL, CREATE_PARTICIPATION, { values })
  );

