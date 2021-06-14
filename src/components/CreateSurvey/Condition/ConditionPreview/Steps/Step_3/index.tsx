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

interface Props {
  selectedCondition: ICondition;
}

export const Step_3: React.FC<Props> = ({ selectedCondition }) => {
  const dispatch = useAppDispatch();
  const [isValid, setIsValid] = React.useState(false);
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
                setIsValid(false);
                dispatch(
                  updateCondition({
                    id: selectedCondition.id,
                    data: {
                      is_valid: false,
                    },
                  })
                );
              }
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
          const isNotEmpty =
            values.target_value !== "" && values.target_value !== undefined;

          return (
            <Form onChange={(event) => onChange(event)}>
              <Box d="flex" mx="auto" alignItems="center">
                {renderInput(selectedCondition)}
                <Box
                  pt={6}
                  ml={5}
                  onClick={() => {
                    dispatch(
                      updateCondition({
                        id: selectedCondition.id,
                        data: {
                          is_valid: true,
                        },
                      })
                    );
                    if (values.target_value) {
                      setIsValid(true);
                    }
                  }}
                  _hover={{
                    cursor: "pointer",
                    opacity: 0.7,
                    transition: "all 400ms",
                  }}>
                  {isNotEmpty && <Submit />}
                </Box>
              </Box>
              {isValid && isNotEmpty && (
                <Flex
                  alignItems="center"
                  justifyContent="flex-end"
                  w="50%"
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
