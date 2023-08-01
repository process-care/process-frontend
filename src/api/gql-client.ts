import { API_URL } from "@/constants/api";
import { GraphQLClient } from "graphql-request";
import { getSdk } from "./graphql/sdk.generated";

// Client Initialization
// Is exposed because we need to set the header at some point
export const client = new GraphQLClient(API_URL, {
  mode: "cors",
});

export const sdk = getSdk(client);
