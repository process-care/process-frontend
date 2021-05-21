import React from "react";
import { FieldArray, useField } from "formik";
import { Textarea } from "components/Fields";
import { Flex, Box, Button, Text } from "@chakra-ui/react";

export const RepeatedFields: React.FC = () => {
  const name = "options";
  const [field, meta] = useField(name);
  return (
    <Box w="100%">
      <FieldArray
        name={name}
        render={(arrayHelpers) => (
          <Box w="100%">
            {field.value?.length > 0 ? (
              field.value.map((_: string, index: number) => (
                <Box key={index} w="100%">
                  <Flex w="100%">
                    <Textarea
                      id={`option_${index}`}
                      label={`Réponse ${index}`}
                      placeholder={`Réponse ${index}`}
                      rows="small"
                      isRequired
                      isCollapsed={false}
                    />
                    <Flex ml={3} mt={8}>
                      <Button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        -
                      </Button>
                      {index + 1 === field.value.length && (
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
