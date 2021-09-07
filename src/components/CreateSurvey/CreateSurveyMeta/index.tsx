import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

import { createSurveySchema } from "../validationSchema";
import { useAppSelector, useAppDispatch } from "redux/hooks";

import {
  initialState,
  updateSurveyMeta,
  updateSurveyStep,
} from "redux/slices/surveyBuilder";

import { ReactComponent as Submit } from "./../assets/submit.svg";
import { checkValidity, renderInputs } from "./utils";
import { useUpdateSurvey } from "call/actions/survey";

// COMPONENT

export const CreateSurveyForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { step, survey } = useAppSelector((state) => state.surveyBuilder);
  const { mutateAsync: updateSurvey } = useUpdateSurvey();

  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    const target = event.target as HTMLFormElement;
    const isSelectedField = target.id.includes("react-select");

    if (isSelectedField) return false;
    dispatch(
      updateSurveyMeta({
        data: {
          [target.id]: target.value,
        },
      })
    );
  };

  const Navigatebtn = ({
    step,
    previous,
    values,
    errors,
  }: {
    step: number;
    previous?: boolean;
    errors: any;
    values: any;
  }) => {
    const target = step + (previous ? -1 : +1);

    const handleClick = (target: number) => {
      dispatch(updateSurveyStep(target));
      // Update backend
      delete values.id;
      updateSurvey({
        id: survey.id,
        data: values,
      });
    };

    return (
      <Box mr="40px">
        <Button
          disabled={!previous && !checkValidity(step, values, errors)}
          transform={previous ? "rotate(180deg)" : "inherit"}
          onClick={() => handleClick(target)}
          variant="ghost"
          right="0"
          _hover={{
            backgroundColor: "transparent",
            right: "3px",
            transition: "all 300ms",
          }}
        >
          <Submit />
        </Button>
      </Box>
    );
  };

  return (
    <>
      <Formik
        initialValues={initialState.survey}
        enableReinitialize
        validationSchema={createSurveySchema}
        onSubmit={(data, { setSubmitting, validateForm }) => {
          validateForm(data);
          setSubmitting(true);
        }}
      >
        {({ values, errors }) => {
          useEffect(() => {
            if (values.language) {
              dispatch(
                updateSurveyMeta({
                  data: {
                    language: values.language,
                  },
                })
              );
            }
          }, [values.language]);
          useEffect(() => {
            if (values.categories) {
              dispatch(
                updateSurveyMeta({
                  data: {
                    categories: values.categories,
                  },
                })
              );
            }
          }, [values.categories]);
          useEffect(() => {
            if (values.keywords) {
              dispatch(
                updateSurveyMeta({
                  data: {
                    keywords: values.keywords,
                  },
                })
              );
            }
          }, [values.keywords]);
          return (
            <Box w="100%">
              <Text variant="baseline" minH="40px">
                {values.title}
              </Text>
              <Form
                onChange={(event) => handleChange(event)}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Flex
                  alignItems="center"
                  my="auto"
                  w="60%"
                  mt="80px"
                  flexDir="column"
                >
                  <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    w="100%"
                  >
                    {step !== 1 && (
                      <Navigatebtn
                        step={step}
                        previous
                        errors={errors}
                        values={values}
                      />
                    )}
                    {renderInputs(step)}
                    <Navigatebtn step={step} errors={errors} values={values} />
                  </Flex>
                </Flex>
              </Form>
            </Box>
          );
        }}
      </Formik>
    </>
  );
};