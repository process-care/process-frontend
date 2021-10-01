import React, { useCallback, useEffect, useRef } from "react";
import { Formik, Form } from "formik";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

import { createSurveySchema } from "../validationSchema";
import { useAppSelector, useAppDispatch } from "redux/hooks";

import { ReactComponent as Submit } from "./../assets/submit.svg";
import { checkValidity, formatValues, renderInputs } from "./utils";

import { useParams } from "react-router-dom";
import { selectors, actions } from "redux/slices/survey-editor";
import { useGetSurveyBySlug } from "call/actions/survey";

// COMPONENT

export const CreateSurveyForm: React.FC = () => {
  // FIXME: Yup, these ignore are bad, need to be removed
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { slug } = useParams();
  const { data: survey } = useGetSurveyBySlug(slug);

  const dispatch = useAppDispatch();

  // TODO: We could even do this effect when the user opens a side menu in the dashboard, so we "preload" the data
  useEffect(() => {
    if (!survey) {
      console.warn("No survey ID to load.");
      return;
    }
    dispatch(actions.initialize(survey.id));
  }, [survey]);

  // Flag to avoid saving the initial values injected into Formik
  const firstRender = useRef(true);
  const data = useAppSelector(selectors.survey);
  const step = useAppSelector(selectors.step);

  const onSubmit = useCallback((data, { setSubmitting, validateForm }) => {
    validateForm(data);
    setSubmitting(true);
    dispatch(actions.post(data));
  }, []);

  return (
    <>
      <Formik
        initialValues={formatValues(data)}
        enableReinitialize
        validationSchema={createSurveySchema}
        onSubmit={onSubmit}
      >
        {({ values, errors }) => {
          // Handle update value
          useEffect(() => {
            if (firstRender.current) {
              firstRender.current = false;
              return;
            }

            dispatch(actions.update({ ...values }));
          }, [values]);

          return (
            <Box w="100%">
              <Text variant="baseline" minH="40px">
                {values.title}
              </Text>
              <Form
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
                    {step !== 1 && step !== 8 && (
                      <Navigatebtn
                        step={step}
                        previous
                        errors={errors}
                        values={values}
                      />
                    )}
                    {renderInputs(step)}
                    {step !== 7 && (
                      <Navigatebtn
                        step={step}
                        errors={errors}
                        values={values}
                      />
                    )}
                  </Flex>
                  <Flex mt="50px">
                    {step === 7 && (
                      <Button type="submit" variant="rounded">
                        Valider
                      </Button>
                    )}
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

// --- SUBCOMPONENT
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
  const dispatch = useAppDispatch();

  const navigateTo = (target: number) => {
    dispatch(actions.setStep(target));
  };

  return (
    <Box mr="40px">
      <Button
        disabled={!previous && !checkValidity(step, values, errors)}
        transform={previous ? "rotate(180deg)" : "inherit"}
        onClick={() => navigateTo(target)}
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
