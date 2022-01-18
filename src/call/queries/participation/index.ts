import { gql } from "graphql-request";

export const CREATE_PARTICIPATION = gql`
  mutation createParticipation($values: ParticipationInput) {
    createParticipation(data: $values) {
      data {
        id
        attributes {
          startedAt
        }
      }
    }
  }
`;

export const UPDATE_PARTICIPATION = gql`
  mutation updateParticipation($id: ID!, $data: editParticipationInput) {
    updateParticipation(id: $id, data: $data) {
      data {
        id
        attributes {
          survey { data { id } }
          contact
          consent
          completed
        }
      }
    }
  }
`;