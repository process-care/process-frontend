import { GraphQLClient } from "graphql-request"
import { ApolloClient, InMemoryCache } from "@apollo/client"
import { createUploadLink } from 'apollo-upload-client'


// Client Initialization
// Is exposed because we need to set the header at some point
export const client = new GraphQLClient(API_URL, {
  mode: "cors",
});

export const apollo = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
  link: createUploadLink({
    uri: API_URL,
  }),
})

export const sdk = getSdk(client);
