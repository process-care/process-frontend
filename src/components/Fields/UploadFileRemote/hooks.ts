import { useCallback, useState } from "react"
import { useField, useFormikContext } from "formik"

import { apollo } from "@/api/gql-client.js"
import {
  useDeleteFileMutation,
  useUploadFileSingleMutation,
  useUploadFileMultipleMutation,
} from "@/api/graphql/queries/application.apollo.generated.js"
import { UploadParams } from "@/redux/slices/application/index.js"

// ---- TYPES

type FileHandlers = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleDelete: (id: string) => void
  error?: string
};

// ---- CUSTOM HOOK

export const useFileHandlers = (
  target: UploadParams,
  multiple: boolean | undefined,
  onChange: (msg: string | undefined | null) => void,
  hiddenFileInput: React.RefObject<HTMLInputElement>
): FileHandlers => {
  const [field] = useField(target.field)
  const { setFieldValue } = useFormikContext()
  const [error, setError] = useState<string>()

  const [ uploadSingleFile ] = useUploadFileSingleMutation({ client: apollo })
  const [ uploadMultiFile ] = useUploadFileMultipleMutation({ client: apollo })
  const [ deleteFile ] = useDeleteFileMutation({ client: apollo })

  // Uploader function
  const handleChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.currentTarget.files) return
    let data = null

    try {
      if (multiple) {
        const files = event.currentTarget.files;
        const uploaded = await uploadMultiFile({ variables: { ...target, files }})
        data = uploaded.data?.multipleUpload

        // Remove multiple previous files
        field.value.map((file: any) => deleteFile({ variables: { id: file.data.id }}))
      } else {
        const files = event.currentTarget.files
        const uploaded = await uploadSingleFile({ variables: { ...target, file: files.item(0) }})
        data = uploaded?.data?.upload?.data

        // Remove previous file
        if (field?.value?.data?.id) deleteFile({ variables: { id: field.value.data.id }})
      }
    } catch (e: any) {
      console.error(e)
      onChange('An error occured while uploading the file.')
      setError('Une erreur est survenue pendant le téléchargement du fichier')
      return
    }

    setFieldValue(target.field, data)
    onChange(`Updated files: ${ data }`)
  }, [deleteFile, field.value, multiple, onChange, setFieldValue, target, uploadSingleFile, uploadMultiFile])

  // Deleter function
  const handleDelete = useCallback((id: string) => {
    deleteFile({ variables: { id }})
    setFieldValue(target.field, null)
    if (hiddenFileInput.current) hiddenFileInput.current.value = ''
    onChange(`Deleted: ${id}`)
  }, [deleteFile, hiddenFileInput, onChange, setFieldValue, target.field])

  return {
    handleChange,
    handleDelete,
    error,
  }
}
