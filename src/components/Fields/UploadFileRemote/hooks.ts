import { useCallback, useState } from "react";
import { useField, useFormikContext } from "formik";

import { apollo, client } from "@/api/gql-client.js"
import {
  useDeleteFileMutation,
  useUploadFileMultipleMutation,
} from "@/api/graphql/queries/application.gql.generated.js"

import {
  useUploadFileSingleMutation
} from "@/api/graphql/queries/application.apollo.generated.js"

import { UploadParams } from "@/redux/slices/application/index.js"
// import { API_URL } from "@/constants/api.ts"

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

  const [uploadFileSingleMutation] = useUploadFileSingleMutation({ client: apollo });
  const { mutateAsync: uploadMultiFile } = useUploadFileMultipleMutation(client, {}, {});
  const { mutateAsync: deleteFile } = useDeleteFileMutation(client);

  // Uploader function
  const handleChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.currentTarget.files) return
    let data = null

    try {
      if (multiple) {
        const files = event.currentTarget.files;
        const uploaded = await uploadMultiFile({ ...target, files });
        data = uploaded.multipleUpload;

        // Remove multiple previous files
        field.value.map((file: any) => deleteFile({ id: file.data.id }));
      } else {
        const files = event.currentTarget.files
        const uploaded = await uploadFileSingleMutation({ variables: { ...target, file: files.item(0) }})
        data = uploaded?.data?.upload?.data

        // Remove previous file
        if (field?.value?.data?.id) deleteFile({ id: field.value.data.id })
      }
    } catch (e: any) {
      console.error(e)
      onChange('An error occured while uploading the file.')
      setError('Une erreur est survenue pendant le téléchargement du fichier')
      return
    }

    setFieldValue(target.field, data)
    onChange(`Updated files: ${ data }`)
  }, [deleteFile, field.value, multiple, onChange, setFieldValue, target, uploadFileSingleMutation, uploadMultiFile])

  // Deleter function
  const handleDelete = useCallback((id: string) => {
    deleteFile({ id })
    setFieldValue(target.field, null)
    onChange(`Deleted: ${id}`)
  }, [deleteFile, onChange, setFieldValue, target.field])

  return {
    handleChange,
    handleDelete,
    error,
  };
};

// async function uploadSingleFile(data: UploadParams & { file: File }) {
//   const formData = new FormData(data)
//   const uploaded = await fetch(`${API_URL}/api/upload`, {
//     method: "POST",
//     body: file,
//   })
  
//   console.log(uploaded)

//   const data = await uploaded.json()
  
//   console.log(data)

//   return data
// }