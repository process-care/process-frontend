import React, { useCallback, useEffect, useRef } from "react";
import { Formik, Form } from "formik";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import {
  Errors,
  renderSurveyMessage,
} from "components/Authentification/Errors";
import { createSurveySchema } from "../validationSchema";
import { useAppSelector, useAppDispatch } from "redux/hooks";

import { ReactComponent as Submit } from "./../assets/submit.svg";
import { checkValidity, formatValues, renderInputs } from "./utils";

import { useParams } from "react-router-dom";
import { selectors, actions } from "redux/slices/survey-editor";

// COMPONENT

export const CreateSurveyForm: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useAppDispatch();

  // TODO: We could even do this effect when the user opens a side menu in the dashboard, so we "preload" the data
  useEffect(() => {
    if (slug) {
      dispatch(actions.initialize(slug));
    }
  }, [slug]);

  // Flag to avoid saving the initial values injected into Formik
  const firstRender = useRef(true);
  const survey = useAppSelector(selectors.survey);
  const error = useAppSelector(selectors.error);
  const step = useAppSelector(selectors.step);

  const onSubmit = useCallback((data, { setSubmitting, validateForm }) => {
    validateForm(data);
    setSubmitting(true);
    dispatch(actions.post(data));
  }, []);

  return (
    <>
      <Formik
        initialValues={formatValues(survey)}
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
            if (!survey?.id) return;
            dispatch(
              actions.update({
                id: survey?.id,
                changes: {
                  id: survey?.id,
                  attributes: {
                    ...values,
                  },
                },
              })
            );
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
                    {step !== 1 && (
                      <Navigatebtn
                        step={step}
                        previous
                        errors={errors}
                        values={values}
                      />
                    )}
                    {renderInputs(step)}
                    {step !== 6 && (
                      <Navigatebtn
                        step={step}
                        errors={errors}
                        values={values}
                      />
                    )}
                  </Flex>
                  <Box mt="50px">
                    <Errors message={renderSurveyMessage(error)} />
                    {step === 6 && (
                      <Button mt="10px" type="submit" variant="rounded">
                        Valider
                      </Button>
                    )}
                  </Box>
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
