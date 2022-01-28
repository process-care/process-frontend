import React from "react";
import { FieldArray, useField, useFormikContext } from "formik";
import { Textarea } from "components/Fields";
import { Flex, Box, Button, Text } from "@chakra-ui/react";
import { useAppSelector } from "redux/hooks";
import { selectors as selectorsApplication } from "redux/slices/application";
import { UploadFile } from "components/Fields/Uploadfile";

interface Props {
  name: string;
}

export const Modalities: React.FC<Props> = ({ name }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const isEditing = useAppSelector(selectorsApplication.isEditing);

  const fields = field.value;

  React.useEffect(() => {
    // Populate answers field on edit.
    if (isEditing) {
      fields?.map((value: string, index: number) => {
        setFieldValue(`${name}.modalities.${index}`, value);
      });
    }
  }, [isEditing]);

  return (
    <Box w="100%">
      <FieldArray
        name={name}
        render={(arrayHelpers) => (
          <Box w="100%">
            {fields?.length > 0 ? (
              fields.map((_: string, index: number) => (
                <Box key={index} w="100%">
                  <Flex w="100%">
                    <Flex flexDir="column" w="100%">
                      <Textarea
                        id={`${name}.${index}.description`}
                        label={`Description de la modalité #${index + 1}`}
                        placeholder={
                          isEditing ? fields[index] : `Modalité ${index}`
                        }
                        rows="medium"
                        isRequired="true"
                        isCollapsed={false}
                      />

                      <UploadFile
                        onChange={(file) => console.log(file)}
                        label="Ajouter une image à la modalité"
                        id={`${name}.${index}.file`}
                      />
                    </Flex>
                    <Flex ml={3} mt={8}>
                      <Button
                        type="button"
                        onClick={() => {
                          arrayHelpers.remove(index);
                          setFieldValue(
                            `${name}.modalities.${index}`,
                            undefined
                          );
                        }}
                      >
                        -
                      </Button>
                      {(index + 1 === field.value.length ||
                        (index + 1 !== 1 && isEditing)) && (
                        <Button
                          ml={3}
                          type="button"
                          onClick={() => arrayHelpers.push("")}
                          variant="solid"
                        >
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
                  isSmall
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
  );
};
