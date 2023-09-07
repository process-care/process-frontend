import { useEffect } from "react";
import { Flex, Box, Button, Text } from "@chakra-ui/react";
import { FieldArray, useField, useFormikContext } from "formik";

import { Textarea } from "@/components/Fields/index.ts"
import { useAppSelector } from "@/redux/hooks/index.js"
import { selectors as selectorsApplication } from "@/redux/slices/application/index.js"
import { Enum_Question_Rows } from "@/api/graphql/types.generated.ts"

interface Props {
  name: string;
}

export default function RepeatedFields({ name }: Props): JSX.Element {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const isEditing = useAppSelector(selectorsApplication.isEditing);

  const fields = field.value;

  useEffect(() => {
    // Populate answers field on edit.
    if (isEditing) {
      fields?.map((value: string, index: number) => {
        setFieldValue(`${name}.${index}`, value);
      });
    }
  }, [fields, isEditing, name, setFieldValue]);

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
                      id={`${name}.${index}`}
                      label={`Option ${index + 1}`}
                      placeholder={
                        isEditing ? fields[index] : `Option ${index + 1}`
                      }
                      rows={Enum_Question_Rows.Small}
                      isRequired
                      isCollapsed={false}
                    />
                    <Flex ml={3} mt={8}>
                      <Button
                        type="button"
                        onClick={() => {
                          arrayHelpers.remove(index);
                          setFieldValue(`${name}.${index}`, undefined);
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
                  size="sm"
                >
                  Ajouter une option de réponse
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
