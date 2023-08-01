import { FieldArray, useField, useFormikContext } from "formik";
import { Flex, Box, Button, Text } from "@chakra-ui/react";

import { useAppSelector } from "@/redux/hooks";
import { selectors as selectorsApplication } from "@/redux/slices/application";
import { Enum_Question_Rows } from "@/api/graphql/types.generated";
import { Textarea } from "@/components/Fields";
import UploadFile from "@/components/Fields/Uploadfile";

interface Props {
  name: string;
  onlyUpload?: boolean;
  cta: string;
}

export default function RepeatableJobs({ name, onlyUpload, cta }: Props): JSX.Element {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const isEditing = useAppSelector(selectorsApplication.isEditing);
  const fields = field.value;
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
                      <UploadFile
                        onChange={(e) => console.log(e)}
                        label="Ajouter une photo"
                        id={`${name}.${index}.image`}
                      />
                    </Box>

                    <Flex ml={3} mt={8} alignItems="center">
                      <Button
                        ml={3}
                        type="button"
                        onClick={() => {
                          arrayHelpers.remove(index);
                          setFieldValue(`${name}.${index}`, undefined);
                        }}
                        variant="link"
                        color="brand.blue"
                      >
                        Supprimer
                      </Button>
                      {/* <SvgHover>
                        <Delete
                          onClick={() => {
                            arrayHelpers.remove(index);
                            setFieldValue(`${name}.${index}`, undefined);
                          }}
                        />
                      </SvgHover> */}

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
