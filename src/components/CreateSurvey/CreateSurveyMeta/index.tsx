'use client'

import { useCallback, useEffect, useRef, useState } from "react";
import { Formik, Form } from "formik";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import Errors, { renderSurveyMessage } from "@/components/Authentification/Errors";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { selectors, actions } from "@/redux/slices/survey-editor";
import { Enum_Survey_Status } from "@/api/graphql/types.generated";
import { createSurveySchema } from "../validationSchema";
import { checkValidity, renderInputs } from "./utils";

// COMPONENT

export default function CreateSurveyForm(): JSX.Element {
  const params = useParams()
  const router = useRouter();
  const slug = params.slug as string;
  const dispatch = useAppDispatch();
  const [submitted, setSubmitted] = useState(false);

  // TODO: We could even do this effect when the user opens a side menu in the dashboard, so we "preload" the data
  useEffect(() => {
    if (slug) {
      dispatch(actions.initialize(slug));
    }
  }, [dispatch, slug]);

  // Flag to avoid saving the initial values injected into Formik
  const firstRender = useRef(true);
  const survey = useAppSelector(selectors.getSurveyDraft);
  const error = useAppSelector(selectors.error);
  const step = useAppSelector(selectors.step);
  const isPosted = useAppSelector(selectors.isPosted);

  // If survey does not have id, it means that it is a draft
  const isDraft = survey?.id === "";

  const onSubmit = useCallback((data: any, { setSubmitting, validateForm }: any) => {
    validateForm(data);
    setSubmitting(true);
    setSubmitted(true);
    dispatch(actions.post(data));
  }, [dispatch]);

  // Redirect if survey has been correctly posted
  useEffect(() => {
    if (isPosted && submitted) {
      router.push('/dashboard')
    }
  }, [isPosted, router, submitted]);

  return (
    <>
      <Formik
        initialValues={survey?.attributes ?? { slug: "" }}
        enableReinitialize
        validationSchema={createSurveySchema}
        onSubmit={onSubmit}
      >
        {({ values, errors, isSubmitting }) => {
          useEffect(() => {
            const format = () => {
              return {
                title: values.title,
                slug: values.slug,
                description: values.description,
                keywords: values.keywords,
                language: values.language,
                email: values.email,
              };
            };
            if (!survey?.id) return;
            if (!isDraft)
              dispatch(
                actions.update({
                  id: survey.id,
                  changes: {
                    id: survey.id,
                    attributes: { ...format() },
                  },
                })
              );
          }, [values]);

          // Handle update value
          useEffect(() => {
            if (firstRender.current) {
              firstRender.current = false;
              return;
            }
            dispatch(
              actions.updateMetas({
                // need id to be SurveyRedux
                id: isDraft ? "" : survey?.id || "",
                changes: {
                  id: isDraft ? "" : survey?.id || "",
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
                        <Navigatebtn
                          step={step}
                          previous
                          errors={errors}
                          values={values}
                          isSubmitting={isSubmitting}
                          isDraft={isDraft}
                        />
                      ) : (
                        <Box minW="150px"></Box>
                      )}

                      <Navigatebtn
                        step={step}
                        errors={errors}
                        values={values}
                        isSubmitting={isSubmitting}
                        isDraft={isDraft}
                      />
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
  isSubmitting,
  isDraft,
}: {
  step: number;
  previous?: boolean;
  errors: any;
  values: any;
  isSubmitting: boolean;
  isDraft: boolean;
}) => {
  const target = step + (previous ? -1 : +1);
  const dispatch = useAppDispatch();

  const navigateTo = (target: number) => {
    dispatch(actions.setStep(target));
  };

  if (step === 6 && !previous) {
    if (!isDraft) {
      return (
        <Link href="/dashboard">
          <Button type="submit" variant="roundedBlue" minW="150px">
            Sauvegarder et revenir
          </Button>
        </Link>
      );
    }
    return (
      <Button type="submit" variant="roundedBlue" minW="150px" isLoading={isSubmitting}>
        Valider
      </Button>
    );
  }

  return (
    <Button
      disabled={!previous && !checkValidity(step, values, errors)}
      onClick={() => navigateTo(target)}
      variant="roundedBlue"
      minW="150px"
    >
      {previous ? "Précédant" : "Suivant"}
    </Button>
  );
};
