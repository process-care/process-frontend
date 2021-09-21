import {
  useMutation,
  UseMutationResult,
} from "react-query";
import { CREATE_PARTICIPATION, UPDATE_PARTICIPATION } from "call/queries/participation";
import { client } from "..";

// ---- TYPES

type ParticipationData = {
  consent: boolean,
  completed: boolean,
  contact?: string,
  survey: string,
}

type CreateParticipationPayload = ParticipationData & { survey: string }

type UpdateParticipationPayload = {
  id: string,
  data: Partial<Omit<ParticipationData, 'survey'>>,
}

// Results
interface CreateParticipationResults {
  id: string
}

// ---- ACTIONS

export const useCreateParticipation = (): UseMutationResult<CreateParticipationResults, Error> =>
  useMutation<CreateParticipationResults, Error, any>(
    async (values: CreateParticipationPayload) => {
      const override = { ...values, startedAt: new Date() };
      return await client.request(CREATE_PARTICIPATION, { values: override });
    }
  );

export const useUpdateParticipation = (): UseMutationResult<CreateParticipationResults, Error> =>
useMutation<CreateParticipationResults, Error, any>(
  async (payload: UpdateParticipationPayload) => await client.request(UPDATE_PARTICIPATION, payload)
);

export const useFinishParticipation = (): UseMutationResult<CreateParticipationResults, Error> =>
useMutation<CreateParticipationResults, Error, any>(
  async (id: string) => {
    const data = { completed: true, completedAt: new Date() };
    return await client.request(UPDATE_PARTICIPATION, { id, data });
  }
);