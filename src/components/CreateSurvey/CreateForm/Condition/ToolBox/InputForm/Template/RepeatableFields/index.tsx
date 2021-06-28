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

  return (
    <Box w="100%">
      <FieldArray
        name="members"
        render={(arrayHelpers) => (
          <Box w="100%">
            {fields?.length > 0 ? (
              fields.map((_: string, index: number) => (
                <Box key={index} w="100%">
                  <Flex w="100%">
                    <Box>
                      <Textarea
                        id={`members[${index}].name`}
                        label="Nom"
                        placeholder="Renseigner le nom"
                        rows="small"
                        isRequired
                        isCollapsed={false}
                        {...field}
                      />
                      <Textarea
                        id={`members[${index}].job`}
                        label="Job"
                        placeholder="Renseigner l'emploi"
                        rows="small"
                        isRequired
                        isCollapsed={false}
                        {...field}
                      />
                      <UploadFile
                        label="Ajouter une photo"
                        id={`members[${index}].image`}
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
                  mt={4}
                >
                  Ajouter un membre de l'équipe
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
