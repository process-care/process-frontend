import { useEffect } from "react"
import { FieldArray, useField, useFormikContext } from "formik"
import { Flex, Box, Button, Text } from "@chakra-ui/react"

import { useAppSelector } from "@/redux/hooks/index.js"
import { selectors as selectorsApplication } from "@/redux/slices/application/index.js"
import { Enum_Question_Rows } from "@/api/graphql/types.generated.ts"
import { Textarea } from "@/components/Fields/index.ts"
import UploadFileRemote from "@/components/Fields/Upload/UploadFileRemote"

interface Props {
  name: string;
}

export default function Modalities({ name }: Props): JSX.Element {
  const [field, meta] = useField(name)
  const { setFieldValue } = useFormikContext()
  const isEditing = useAppSelector(selectorsApplication.isEditing)

  const values = field.value

  useEffect(() => {
    // Populate answers field on edit.
    if (isEditing) {
      values?.map((value: string, index: number) => {
        setFieldValue(`${name}.modalities.${index}`, value);
      });
    }
  }, [values, isEditing, name, setFieldValue]);

  return (
    <Box w="100%" pl="20px">
      <FieldArray
        name={name}
        render={(arrayHelpers) => (
          <Box w="100%">
            {values?.length > 0 ? (
              values.map((value: any, index: number) => (
                <Box key={index} w="100%">
                  <Flex w="100%">
                    <Flex flexDir="column" w="100%">
                      <Textarea
                        id={`${name}.${index}.description`}
                        label={`Description de la modalité #${index + 1}`}
                        placeholder={isEditing ? values[index] : `Modalité ${index}`}
                        rows={Enum_Question_Rows.Medium}
                        isRequired
                        isCollapsed={false}
                      />

                      <UploadFileRemote
                        target={ { field: `${name}.${index}.file` } }
                        accept="image/*"
                        // content={value?.file}
                        onChange={(file) => console.log(file)}
                        label="Ajouter une image à la modalité"
                        urlOnly={true}
                      />
                    </Flex>

                    <Flex ml={3} mt={8}>
                      <Button
                        type="button"
                        onClick={() => {
                          arrayHelpers.remove(index);
                          setFieldValue(`${name}.modalities.${index}`, undefined);
                        }}
                      >
                        -
                      </Button>
                      {(index + 1 === field.value.length || (index + 1 !== 1 && isEditing)) && (
                        <Button ml={3} type="button" onClick={() => arrayHelpers.push("")} variant="solid">
                          +
                        </Button>
                      )}
                    </Flex>
                  </Flex>
                  <Text mt={1} fontSize="10px" color="red">
                    {meta.error}
                  </Text>
                </Box>
              ))
            ) : (
              <>
                <Button
                  onClick={() => arrayHelpers.push("")}
                  variant="rounded"
                  type="button"
                  size="sm"
                >
                  Ajouter un parametre
                </Button>

                <Text mt={1} fontSize="10px" color="red">
                  {meta.error}
                </Text>
              </>
            )}
          </Box>
        )}
      />
    </Box>
  )
}
