import { DocumentNode } from "graphql";
import { ClientError } from "graphql-request";
import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { request } from "graphql-request";

const URL: string =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_URL_DEV!
    : process.env.REACT_APP_API_URL!;

export const graphqlBaseQuery =
  (): BaseQueryFn<
    { document: string | DocumentNode; variables?: any },
    unknown,
    ClientError
  > =>
  async ({ document, variables }) => {
    try {
      return { data: await request(URL, document, variables) };
    } catch (error) {
      if (error instanceof ClientError) {
        return { error };
      }
      throw error;
    }
  };
