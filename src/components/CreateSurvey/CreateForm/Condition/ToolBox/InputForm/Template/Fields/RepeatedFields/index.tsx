import React from "react";
import { FieldArray, useField, useFormikContext } from "formik";
import { Textarea } from "components/Fields";
import { Flex, Box, Button, Text } from "@chakra-ui/react";
import { useAppSelector } from "redux/hooks";
import { selectors as selectorsApplication } from "redux/slices/application";

interface Props {
  name: string;
}

export const RepeatedFields: React.FC<Props> = ({ name }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const isEditing = useAppSelector(selectorsApplication.isEditing);

  const fields = field.value;

  React.useEffect(() => {
    // Populate answers field on edit.
    if (isEditing) {
      fields?.map((value: string, index: number) => {
        setFieldValue(`options.${index}`, value);
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
                    <Textarea
                      id={`options.${index}`}
                      label={`Option ${index}`}
                      placeholder={
                        isEditing ? fields[index] : `Option ${index}`
                      }
                      rows="small"
                      isRequired
                      isCollapsed={false}
                    />
                    <Flex ml={3} mt={8}>
                      <Button
                        type="button"
                        onClick={() => {
                          arrayHelpers.remove(index);
                          setFieldValue(`options.${index}`, undefined);
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
