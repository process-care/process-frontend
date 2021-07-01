import { DocumentNode } from "graphql";
import { ClientError } from "graphql-request";
import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { request } from "graphql-request";

export const graphqlBaseQuery =
  ({
    baseUrl,
  }: {
    baseUrl: string;
  }): BaseQueryFn<
    { document: string | DocumentNode; variables?: any },
    unknown,
    ClientError
  > =>
  async ({ document, variables }) => {
    try {
      return { data: await request(baseUrl, document, variables) };
    } catch (error) {
      if (error instanceof ClientError) {
        return { error };
      }
      throw error;
    }
  };
