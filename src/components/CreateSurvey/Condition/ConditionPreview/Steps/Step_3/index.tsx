import React from "react";
import { Formik, Form } from "formik";

import { Box, Container, Text, Flex } from "@chakra-ui/react";
import { updateCondition } from "redux/slices/formBuilder";
import { useAppDispatch } from "redux/hooks";
import ICondition from "interfaces/form/condition";
import { t } from "static/condition";

import { ReactComponent as Submit } from "./../../assets/submit.svg";
import { ReactComponent as Check } from "./../../assets/check.svg";
import { renderInput } from "./utils";
import { checkIfMultiple } from "utils/formBuilder/input";

interface Props {
  selectedCondition: ICondition;
}

export const Step_3: React.FC<Props> = ({ selectedCondition }) => {
  const dispatch = useAppDispatch();

  return (
    <Container w="90%" maxW="unset">
      <Formik
        validateOnBlur={false}
        initialValues={{ target_value: selectedCondition.target_value }}
        onSubmit={(data, { setSubmitting, validateForm }) => {
          validateForm(data);
          setSubmitting(true);
        }}>
        {({ values }) => {
          const onChange = (event: React.FormEvent<HTMLFormElement>) => {
            const target = event.target as HTMLFormElement;
            if (target !== null) {
              if (target.value === "") {
                dispatch(
                  updateCondition({
                    id: selectedCondition.id,
                    data: {
                      is_valid: false,
                    },
                  })
                );
              } else
                dispatch(
                  updateCondition({
                    id: selectedCondition.id,
                    data: {
                      target_value: target.value,
                    },
                  })
                );
            }
          };
          const isNotEmpty = checkIfMultiple(selectedCondition)
            ? true
            : values.target_value !== "" && values.target_value !== undefined;

          console.log(isNotEmpty);
          return (
            <Form onChange={(event) => onChange(event)}>
              <Box d="flex" mx="auto" alignItems="center">
                {renderInput(selectedCondition)}
                <Box
                  pt={6}
                  ml={5}
                  onClick={() => {
                    if (values.target_value) {
                      dispatch(
                        updateCondition({
                          id: selectedCondition.id,
                          data: {
                            is_valid: true,
                          },
                        })
                      );
                    }
                  }}
                  _hover={{
                    cursor: "pointer",
                    opacity: 0.7,
                    transition: "all 400ms",
                  }}>
                  {isNotEmpty && !checkIfMultiple(selectedCondition) && (
                    <Submit />
                  )}
                </Box>
              </Box>
              {selectedCondition.is_valid && isNotEmpty && (
                <Flex
                  alignItems="center"
                  justifyContent="flex-end"
                  mt="2"
                  w="100%"
                  mx="auto">
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
