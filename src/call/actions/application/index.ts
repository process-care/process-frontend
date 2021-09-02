import { request } from "graphql-request";

import { useMutation, UseMutationResult } from "react-query";
import { optimisticUpdate } from "call/optimisiticUpdate";
import { API_URL } from "constants/api";
import {
  DELETE_FILE,
  UPLOAD_FILE_MULTIPLE,
  UPLOAD_FILE_SINGLE,
} from "call/queries/application";

// ---- TYPES

export type UploadParams = {
  refId?: string;
  ref?: string;
  field?: string;
};

export type UploadSingleParams = UploadParams & {
  file: any;
};

export type UploadMultipleParams = UploadParams & {
  files: any[];
};

export type DeleteParams = {
  id: string;
};

// ---- ACTIONS
// FIXME: update all `any` in there

export const useUploadFileSingle = (): UseMutationResult<any, Error> =>
  useMutation<any, Error, any>(
    async (params: UploadSingleParams) =>
      await request(API_URL, UPLOAD_FILE_SINGLE, params),
    optimisticUpdate(["getLanding"])
  );

export const useUploadFileMultiple = (): UseMutationResult<any, Error> =>
  useMutation<any, Error, any>(
    async (params: UploadMultipleParams) =>
      await request(API_URL, UPLOAD_FILE_MULTIPLE, params),
    optimisticUpdate(["getLanding"])
  );

export const useDeleteFile = (): UseMutationResult<any, Error> =>
  useMutation<any, Error, any>(
    async (id: string) => await request(API_URL, DELETE_FILE, { id }),
    optimisticUpdate(["getLanding"])
  );
