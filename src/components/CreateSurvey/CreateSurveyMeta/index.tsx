import React, { useCallback, useEffect, useRef } from "react";
import { Formik, Form } from "formik";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import {
  Errors,
  renderSurveyMessage,
} from "components/Authentification/Errors";
import { createSurveySchema } from "../validationSchema";
import { useAppSelector, useAppDispatch } from "redux/hooks";

import { checkValidity, formatValues, renderInputs } from "./utils";

import { useParams } from "react-router-dom";
import { selectors, actions } from "redux/slices/survey-editor";
import { useGetSurveyBySlug } from "call/actions/survey";

// COMPONENT

export const CreateSurveyForm: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: survey } = useGetSurveyBySlug(slug);

  const dispatch = useAppDispatch();

  // TODO: We could even do this effect when the user opens a side menu in the dashboard, so we "preload" the data
  useEffect(() => {
    if (survey) {
      dispatch(actions.initialize(survey.id));
    }
  }, [survey]);

  // Flag to avoid saving the initial values injected into Formik
  const firstRender = useRef(true);
  const data = useAppSelector(selectors.survey);
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
                <Box my="auto" w="60%" mt="80px">
                  <Flex
                    alignItems="center"
                    justifyContent="flex-end"
                    flexDirection="column"
                    w="100%"
                  >
                    {renderInputs(step)}
                    <Flex w="100%" justifyContent={"space-between"} mt="30px">
                      {step !== 1 ? (
                        <Navigatebtn
                          step={step}
                          previous
                          errors={errors}
                          values={values}
                        />
                      ) : (
                        <Box minW="150px"></Box>
                      )}

                      <Navigatebtn
                        step={step}
                        errors={errors}
                        values={values}
                      />
                    </Flex>
                  </Flex>
                  <Box mt="50px">
                    <Errors message={renderSurveyMessage(error)} />
                  </Box>
                </Box>
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

  if (step === 6 && !previous) {
    return (
      <Button type="submit" variant="roundedBlue" minW="150px">
        Valider
      </Button>
    );
  }

  return (
    <Button
      type={previous ? "button" : "submit"}
      disabled={!previous && !checkValidity(step, values, errors)}
      onClick={() => navigateTo(target)}
      variant="roundedBlue"
      minW="150px"
    >
      {previous ? "Précédant" : "Suivant"}
    </Button>
  );
};
