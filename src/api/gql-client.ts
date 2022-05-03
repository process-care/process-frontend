import { API_URL } from "constants/api";
import { GraphQLClient } from "graphql-request";
import { getSdk } from "./graphql/sdk.generated";
// import { store } from "redux/store";

export const getAuthorization = (): Record<string, string> => {
  // const jwt = store.getState().scientistData.auth.data?.jwt;
  // TODO: Is this okay ? Is it reliable to use the local storage ?
  const storedUser = JSON.parse(localStorage.getItem("process__user") ?? "{}");

  // If JWT available
  if (storedUser.jwt) {
    return {
      Authorization: `Bearer ${storedUser.jwt} `,
    };
  }

  // In any other case, return nothing
  return {
    Authorization: "",
  };
};

// Client with headers & SDK
export const client = new GraphQLClient(API_URL, {
  mode: "cors",
  headers: getAuthorization(),
});

export const sdk = getSdk(client);

// Client without headers, for specific purposes
export const clientWithNoHeaders = new GraphQLClient(API_URL);
