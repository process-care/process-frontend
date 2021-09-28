import { useMutation, UseMutationResult } from "react-query";
import { optimisticUpdate } from "call/optimisiticUpdate";
import {
  DELETE_FILE,
  UPLOAD_FILE_MULTIPLE,
  UPLOAD_FILE_SINGLE,
} from "call/queries/application";
import { client } from "..";

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
// TODO: update all `any` in there

export const useUploadFileSingle = (): UseMutationResult<any, Error> =>
  useMutation<any, Error, any>(
    async (params: UploadSingleParams) =>
      await client.request(UPLOAD_FILE_SINGLE, params),
    optimisticUpdate(["getLanding", "getSurvey"])
  );

export const useUploadFileMultiple = (): UseMutationResult<any, Error> =>
  useMutation<any, Error, any>(
    async (params: UploadMultipleParams) =>
      await client.request(UPLOAD_FILE_MULTIPLE, params),
    optimisticUpdate(["getLanding", "getSurvey"])
  );

export const useDeleteFile = (): UseMutationResult<any, Error> =>
  useMutation<any, Error, any>(
    async (id: string) => await client.request(DELETE_FILE, { id }),
    optimisticUpdate(["getLanding", "getSurvey"])
  );
