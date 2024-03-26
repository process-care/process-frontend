import { GraphQLClient } from "graphql-request"
import { ApolloClient, InMemoryCache } from "@apollo/client"
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'

import { API_URL } from "@/constants/api.js"
import { getSdk } from "./graphql/sdk.generated.js"
import { buildBearer } from "@/utils/auth.js"

// ---- Apollo ----

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const storage = localStorage.getItem("process__user")
  const jwt = storage ? JSON.parse(storage).jwt : null
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: buildBearer(jwt ?? process.env.STRAPI_API_TOKEN),
    }
  }
})

export const apollo = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
  link: authLink
    .concat(createUploadLink({
      uri: API_URL,
    })),
})

// ---- SDK & Client (for React Query) ----

// Client Initialization
// Is exposed because we need to set the header at some point
export const client = new GraphQLClient(API_URL, {
  mode: "cors",
  headers: {
    "Authorization": `bearer ${ process.env.STRAPI_API_TOKEN }`,
  }
});

export const sdk = getSdk(client);
