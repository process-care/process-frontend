import React from "react";
import { Formik, Form } from "formik";

import { Box, Container, Text, Flex } from "@chakra-ui/react";
import { useAppDispatch } from "redux/hooks";
import ICondition from "interfaces/form/condition";
import { t } from "static/condition";

import { ReactComponent as Submit } from "./../../assets/submit.svg";
import { ReactComponent as Check } from "./../../assets/check.svg";
import { renderInput } from "./utils";
import { checkIfMultiple } from "utils/formBuilder/input";
import { useUpdateCondition } from "api/actions/condition";

interface Props {
  currentCondition: Partial<ICondition>;
}

export const Step_3: React.FC<Props> = ({ currentCondition }) => {
  const dispatch = useAppDispatch();
  const { mutateAsync: updateCondition } = useUpdateCondition(
    currentCondition?.id
  );
  return (
    <Container w="90%" maxW="unset">
      <Formik
        validateOnBlur={false}
        initialValues={{ target_value: currentCondition.target_value }}
        onSubmit={(data, { setSubmitting, validateForm }) => {
          validateForm(data);
          setSubmitting(true);
        }}
      >
        {({ values }) => {
          const onChange = (event: React.FormEvent<HTMLFormElement>) => {
            const target = event.target as HTMLFormElement;
            if (target !== null) {
              if (target.value === "") {
                dispatch(
                  updateCondition({
                    id: currentCondition.id,
                    data: {
                      is_valid: false,
                    },
                  })
                );
              } else
                updateCondition({
                  id: currentCondition.id,
                  data: {
                    target_value: target.value,
                  },
                });
            }
          };
          const isNotEmpty = checkIfMultiple(currentCondition)
            ? true
            : values.target_value !== "" && values.target_value !== undefined;

          return (
            <Form
              onChange={(event) => onChange(event)}
              style={{ width: "100%" }}
            >
              <Box d="flex" mx="auto" alignItems="center" w="100%">
                {renderInput(currentCondition)}
                <Box
                  pt={6}
                  ml={5}
                  onClick={() => {
                    if (values.target_value) {
                      updateCondition({
                        id: currentCondition.id,
                        data: {
                          is_valid: true,
                        },
                      });
                    }
                  }}
                  _hover={{
                    cursor: "pointer",
                    opacity: 0.7,
                    transition: "all 400ms",
                  }}
                >
                  {isNotEmpty && !checkIfMultiple(currentCondition) && (
                    <Submit />
                  )}
                </Box>
              </Box>
              {currentCondition.is_valid && isNotEmpty && (
                <Flex
                  alignItems="center"
                  justifyContent="flex-end"
                  mt="2"
                  w="100%"
                  mx="auto"
                >
                  <Check />
                  <Text fontSize="14px" color="brand.green" ml={2}>
                    {t.success}
                  </Text>
                </Flex>
              )}
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};
