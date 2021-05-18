import React from "react";
import { FieldArray, useField } from "formik";
import { Textarea } from "components/Fields";
import { Flex, Box, Button } from "@chakra-ui/react";

export const RepeatedFields: React.FC = () => {
  const name = "responses";
  const [field] = useField(name);

  console.log("F in array", field);
  return (
    <Box w="100%">
      <FieldArray
        name={name}
        render={(arrayHelpers) => (
          <Box w="100%">
            {field.value?.length > 0 ? (
              field.value.map((_, index: number) => (
                <Flex key={index} w="100%">
                  <Textarea
                    id={`Réponse ${index}`}
                    label={`Réponse ${index}`}
                    placeholder={`Réponse ${index}`}
                    rows="small"
                    name={`responses.${index}`}
                  />
                  <Flex ml={3} mt={8}>
                    <Button
                      type="button"
                      onClick={() => arrayHelpers.remove(index)}>
                      -
                    </Button>
                    {index + 1 === field.value.length && (
                      <Button
                        ml={3}
                        type="button"
                        onClick={() => arrayHelpers.push("")}
                        variant="solid">
                        +
                      </Button>
                    )}
                  </Flex>
                </Flex>
              ))
            ) : (
              <Button onClick={() => arrayHelpers.push("")} variant="rounded">
                Ajouter une réponse
              </Button>
            )}
          </Box>
        )}
      />
    </Box>
  );
};
