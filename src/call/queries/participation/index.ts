import { gql } from "graphql-request";

export const CREATE_PARTICIPATION = gql`
  mutation createParticipation($values: ParticipationInput) {
    createParticipation(input: { data: $values }) {
      participation {
        id
        startedAt
      }
    }
  }
`;

export const UPDATE_PARTICIPATION = gql`
  mutation updateParticipation($id: ID!, $data: editParticipationInput) {
    updateParticipation(input: {
      where: { id: $id }
      data: $data
    }) {
      participation {
        id
        survey { id }
        contact
        consent
        completed
      }
    }
  }
`;