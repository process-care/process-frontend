import { client } from "api/gql-client";
import {
  useDeleteFileMutation,
  useUploadFileMultipleMutation,
  useUploadFileSingleMutation,
} from "api/graphql/queries/application.gql.generated";
import { useField, useFormikContext } from "formik";

import { useState } from "react";
import { UploadParams } from "redux/slices/application";

// ---- TYPES

type FileHandlers = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDelete: (id: string) => void;
  error?: string;
};

// ---- CUSTOM HOOK

export const useFileHandlers = (
  target: UploadParams,
  multiple: boolean | undefined,
  onChange: (msg: string | undefined | null) => void
): FileHandlers => {
  const [field] = useField(target.field);
  const { setFieldValue } = useFormikContext();
  const [error, setError] = useState<string>();

  const { mutateAsync: uploadSingleFile } = useUploadFileSingleMutation(client);
  const { mutateAsync: uploadMultiFile } = useUploadFileMultipleMutation(client);
  const { mutateAsync: deleteFile } = useDeleteFileMutation(client);

  // TODO: useCallback on those

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.currentTarget.files) return;
    let data = null;

    // TODO: not sure if a try / catch would work here
    try {
      // Upload the files
      if (multiple) {
        const files = event.currentTarget.files;
        const uploaded = await uploadMultiFile({ ...target, files });
        data = uploaded.multipleUpload;

        // Remive multiple previous files
        field.value.map((file: any) => deleteFile({ id: file.data.id }));
      } else {
        const file = event.currentTarget.files[0];
        const uploaded = await uploadSingleFile({ ...target, file });
        data = uploaded?.upload;

        // Remove previous file
        deleteFile({ id: field.value.data.id });
      }
    } catch (e: any) {
      setError(e);
    }

    setFieldValue(target.field, data);
    onChange(`Updated files: ${data}`);
  };

  const handleDelete = (id: string) => {
    deleteFile({ id });
    setFieldValue(target.field, { data: null });
    onChange(`Deleted: ${id}`);
  };

  return {
    handleChange,
    handleDelete,
    error,
  };
};
