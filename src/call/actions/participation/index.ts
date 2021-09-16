import {
  useMutation,
  UseMutationResult,
} from "react-query";
import { CREATE_PARTICIPATION } from "call/queries/participation";
import { client } from "..";

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
    async (values: CreateParticipationPayload) => await client.request(CREATE_PARTICIPATION, { values })
  );

