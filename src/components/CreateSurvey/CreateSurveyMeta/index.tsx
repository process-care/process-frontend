import React, { useCallback, useEffect, useRef } from "react";
import { Formik, Form } from "formik";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Errors, renderSurveyMessage } from "components/Authentification/Errors";
import { createSurveySchema } from "../validationSchema";
import { useAppSelector, useAppDispatch } from "redux/hooks";

import { checkValidity, renderInputs } from "./utils";

import { useParams } from "react-router-dom";
import { selectors, actions } from "redux/slices/survey-editor";
import { Enum_Survey_Status } from "api/graphql/types.generated";

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
  const survey = useAppSelector(selectors.getSurveyDraft);
  const error = useAppSelector(selectors.error);
  const step = useAppSelector(selectors.step);

  const onSubmit = useCallback((data, { setSubmitting, validateForm }) => {
    validateForm(data);
    setSubmitting(true);
    dispatch(actions.post(data));
  }, []);

  console.log(renderSurveyMessage(error));
  return (
    <>
      <Formik
        initialValues={survey?.attributes ?? { slug: "draft" }}
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
            dispatch(
              actions.updateMetas({
                // need id to be SurveyRedux
                id: "draft",
                changes: {
                  id: "draft",
                  attributes: {
                    ...values,
                    status: Enum_Survey_Status.Draft,
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
                <Box my="auto" w="60%" mt="80px">
                  <Flex alignItems="center" justifyContent="flex-end" flexDirection="column" w="100%">
                    {renderInputs(step)}
                    <Box w="100%" textAlign="right">
                      <Errors message={renderSurveyMessage(error)} />
                    </Box>
                    <Flex w="100%" justifyContent={"space-between"} mt="30px">
                      {step !== 1 ? (
                        <Navigatebtn step={step} previous errors={errors} values={values} />
                      ) : (
                        <Box minW="150px"></Box>
                      )}

                      <Navigatebtn step={step} errors={errors} values={values} />
                    </Flex>
                  </Flex>
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
