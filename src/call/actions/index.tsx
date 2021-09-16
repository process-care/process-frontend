import { API_URL } from "constants/api";
import { GraphQLClient } from "graphql-request";

const cookie = localStorage.getItem("process__user");
const jwt = cookie && JSON.parse(cookie)?.jwt;

const getHeaders = () => {
  if (jwt) {
    return {
      headers: {
        authorization: `Bearer ${jwt} `,
      },
    };
  } else {
    return undefined;
  }
};
export const client = new GraphQLClient(API_URL, getHeaders());
