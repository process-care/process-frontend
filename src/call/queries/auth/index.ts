import { gql } from "graphql-request";

export const LOGIN = gql`
  mutation login($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
      user {
        id
        username
        email
        blocked
      }
    }
  }
`;

export const SIGNIN = gql`
  mutation register($email: String!, $username: String!, $password: String!) {
    register(
      input: { email: $email, username: $username, password: $password }
    ) {
      jwt
      user {
        id
        username
        email
        blocked
      }
    }
  }
`;

export const GET_ME = gql`
  query me($userId: ID!) {
    users(where: { id: $userId }) {
      email
      id
      firstName
      lastName
      job
      institution
    }
  }
`;

export const UPDATE_ME = gql`
  mutation updateUser($id: ID!, $data: editUserInput) {
    updateUser(input: { where: { id: $id }, data: $data }) {
      user {
        email
        id
        firstName
        lastName
        job
        institution
      }
    }
  }
`;
