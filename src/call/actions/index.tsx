import { API_URL } from "constants/api";
import { GraphQLClient } from "graphql-request";

const cookie = localStorage.getItem("process__user");
const jwt = cookie && JSON.parse(cookie)?.jwt;

interface Header {
  headers: {
    Authorization?: string;
  };
}

export const getHeaders = (): Header | undefined => {
  if (jwt) {
    return {
      headers: {
        Authorization: `Bearer ${jwt} `,
      },
    };
  } else {
    return {
      headers: {
        Authorization: "",
      },
    };
  }
};

export const client = new GraphQLClient(API_URL, getHeaders());

export const clientWithNoHeaders = new GraphQLClient(API_URL);
