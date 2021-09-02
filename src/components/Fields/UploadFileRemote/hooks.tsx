import {
  UploadParams,
  useDeleteFile,
  useUploadFileMultiple,
  useUploadFileSingle,
} from "call/actions/application";
import { useState } from "react";

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
  onChange: (msg: string) => void
): FileHandlers => {
  const [error, setError] = useState<string>();
  const { mutateAsync: uploadSingleFile } = useUploadFileSingle();
  const { mutateAsync: uploadMultiFile } = useUploadFileMultiple();
  const { mutateAsync: deleteFile } = useDeleteFile();

  // TODO: useCallback on those

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.currentTarget.files) return;
    let msg = "";

    // TODO: not sure if a try / catch would work here
    try {
      if (multiple) {
        const files = event.currentTarget.files;
        uploadMultiFile({ ...target, files });
        msg = `uploaded many: ${files.length}`;
      } else {
        const file = event.currentTarget.files[0];
        uploadSingleFile({ ...target, file });
        msg = `uploaded: ${file.name}`;
      }
    } catch (e) {
      setError(e);
    }

    onChange(msg);
  };

  const handleDelete = (id: string) => {
    deleteFile(id);
    onChange(`deleted: ${id}`);
  };

  return {
    handleChange,
    handleDelete,
    error,
  };
};
