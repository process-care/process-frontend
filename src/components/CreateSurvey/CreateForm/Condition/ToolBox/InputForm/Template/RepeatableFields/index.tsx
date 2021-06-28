import React from "react";
import { FieldArray, useField, useFormikContext } from "formik";
import { Textarea } from "components/Fields";
import { Flex, Box, Button, Text } from "@chakra-ui/react";
import { useAppSelector } from "redux/hooks";
import { UploadFile } from "components/Fields/Uploadfile";

interface Props {
  name: string;
}

export const RepeatableFields: React.FC<Props> = ({ name }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const isEditing = useAppSelector((state) => state.formBuilder.is_editing);

  const fields = field.value;

  React.useEffect(() => {
    // Populate options field on edit.
    if (isEditing) {
      fields.map((el: string, index: number) => {
        setFieldValue(`members_${index}`, el);
      });
    }
  }, [fields.length]);

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
                    <Box>
                      <Textarea
                        id={`members.name_${index}`}
                        label="Nom"
                        placeholder="Renseigner le nom"
                        rows="small"
                        isRequired
                        isCollapsed={false}
                        {...field}
                      />
                      <Textarea
                        id={`members.job_${index}`}
                        label="Job"
                        placeholder="Renseigner l'emploi"
                        rows="small"
                        isRequired
                        isCollapsed={false}
                        {...field}
                      />
                      <UploadFile
                        label="Ajouter une photo"
                        id={`members.image_${index}`}
                      />
                    </Box>

                    <Flex ml={3} mt={8}>
                      <Button
                        type="button"
                        onClick={() => {
                          arrayHelpers.remove(index);
                          setFieldValue(index.toString(), undefined);
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
                >
                  Ajouter une réponse
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
