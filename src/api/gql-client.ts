import { API_URL } from "constants/api";
import { GraphQLClient } from "graphql-request";
import { getSdk } from "./graphql/sdk.generated";
import { store } from "redux/store";

interface Header {
  headers: any;
}

export const getHeaders = (): Header | Record<string, unknown> | undefined => {
  const jwt = store.getState().scientistData.auth.data?.jwt;
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

export const sdk = getSdk(new GraphQLClient(API_URL, getHeaders()));

export const clientWithNoHeaders = new GraphQLClient(API_URL);
