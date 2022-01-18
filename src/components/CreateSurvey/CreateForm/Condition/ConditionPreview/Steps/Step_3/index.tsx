import React from "react";
import { Formik, Form } from "formik";

import { Box, Container, Text, Flex } from "@chakra-ui/react";
import { ConditionRedux } from "redux/slices/types";
import { t } from "static/condition";

import { ReactComponent as Submit } from "./../../assets/submit.svg";
import { ReactComponent as Check } from "./../../assets/check.svg";
import { renderInput } from "./utils";
import { checkIfMultiple } from "utils/formBuilder/input";
import { actions, selectors } from "redux/slices/scientistData";
import { useAppDispatch, useAppSelector } from "redux/hooks";

interface Props {
  selectedCondition: ConditionRedux;
  updateStep: (d: any) => void;
}

export const Step_3: React.FC<Props> = ({ selectedCondition, updateStep }) => {
  const dispatch = useAppDispatch();
  const isValid = useAppSelector(selectors.conditions.getValidity);
  const handleValidity = (bool: boolean) => {
    dispatch(actions.setValidityCondition(bool));
  };

  return (
    <Container w="100%" maxW="unset" p="0">
      <Formik
        validateOnBlur={false}
        initialValues={{
          target_value: selectedCondition?.attributes.target_value,
        }}
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
                handleValidity(false);
              } else updateStep({ target_value: target.value });
            }
          };
          const isNotEmpty = checkIfMultiple(selectedCondition)
            ? true
            : values.target_value !== "" && values.target_value !== undefined;

          return (
            <Form
              onChange={(event) => onChange(event)}
              style={{ width: "100%" }}
            >
              <Box d="flex" mx="auto" alignItems="center" w="100%">
                {renderInput(selectedCondition)}
                <Box
                  pt={6}
                  onClick={() => {
                    if (isNotEmpty) {
                      handleValidity(true);
                    }
                  }}
                  _hover={{
                    cursor: "pointer",
                    opacity: 0.7,
                    transition: "all 400ms",
                  }}
                >
                  {isNotEmpty && !checkIfMultiple(selectedCondition) && (
                    <Submit />
                  )}
                </Box>
              </Box>
              {isValid && isNotEmpty && (
                <Flex
                  alignItems="center"
                  justifyContent="flex-start"
                  w="100%"
                  mx="auto"
                  mt="2"
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
