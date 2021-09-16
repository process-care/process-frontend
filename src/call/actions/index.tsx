import { API_URL } from "constants/api";
import { GraphQLClient } from "graphql-request";

const cookie = localStorage.getItem("process__user");
const { jwt } = cookie && JSON.parse(cookie);
export const client = new GraphQLClient(API_URL, {
  headers: {
    authorization: `Bearer ${jwt} `,
  },
});
