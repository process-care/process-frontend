import { FieldArray, useField } from "formik"
import { Flex, Box, Button, Text } from "@chakra-ui/react"

import { useAppSelector } from "@/redux/hooks/index.js"
import { selectors as selectorsApplication } from "@/redux/slices/application/index.js"
import { Enum_Question_Rows } from "@/api/graphql/types.generated.ts"
import { Textarea } from "@/components/Fields/index.ts"
import UploadFileRemote from "@/components/Fields/Upload/UploadFileRemote"

interface Props {
  name: string;
  onlyUpload?: boolean;
  cta: string;
}

export default function RepeatableJobs({ name, onlyUpload, cta }: Props): JSX.Element {
  const [field, meta] = useField(name)
  const isEditing = useAppSelector(selectorsApplication.isEditing)
  const fields = field.value

  return (
    <Box w="100%">
      <FieldArray
        name={name}
        render={(arrayHelpers) => (
          <Box w="100%">
            {fields?.length > 0 ? (
              fields.map((_: string, index: number) => (
                <Box key={index} w="100%">
                  <Flex w="100%" alignItems="flex-start">
                    <Box w="45%">
                      {!onlyUpload && (
                        <>
                          <Textarea
                            id={`${name}.${index}.name`}
                            label="Nom"
                            placeholder="Renseigner le nom"
                            rows={Enum_Question_Rows.Small}
                            isRequired
                            isCollapsed={false}
                            {...field}
                          />

                          <Textarea
                            id={`${name}.${index}.job`}
                            label="Job"
                            placeholder="Renseigner l'emploi"
                            rows={Enum_Question_Rows.Small}
                            isRequired
                            isCollapsed={false}
                            {...field}
                          />
                        </>
                      )}

                      <UploadFileRemote
                        target={ { field: `${name}.${index}.image` } }
                        label="Ajouter une photo"
                        accept="image/*"
                        onChange={(e) => console.log(e)}
                        multiple={false}
                        urlOnly={true}
                      />
                    </Box>

                    <Flex ml={3} mt={8} alignItems="center">
                      <Button
                        ml={3}
                        type="button"
                        onClick={() => {
                          // Remove the item from the field values
                          arrayHelpers.remove(index)
                        }}
                        variant="link"
                        color="brand.blue"
                      >
                        Supprimer
                      </Button>

                      {(index + 1 === field.value.length ||
                        (index + 1 !== 1 && isEditing)) && (
                        <Button
                          ml={3}
                          type="button"
                          onClick={() => arrayHelpers.push("")}
                          variant="link"
                          color="brand.blue"
                        >
                          Ajouter
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
                  mt={4}
                  minW="280px"
                >
                  {cta}
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
  );
};
