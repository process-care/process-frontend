import { gql } from "graphql-request";

export const CREATE_PARTICIPATION = gql`
  mutation createParticipation($values: ParticipationInput) {
    createParticipation(input: { data: $values }) {
      participation {
        id
      }
    }
  }
`;
