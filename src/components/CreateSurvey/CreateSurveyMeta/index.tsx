import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

import { createSurveySchema } from "../validationSchema";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { debounce } from "lodash";

import { updateSurveyMeta, updateSurveyStep } from "redux/slices/surveyBuilder";

import { ReactComponent as Submit } from "./../assets/submit.svg";
import { checkValidity, renderInputs } from "./utils";
import { useUpdateSurvey, useGetSurveyMetadas } from "call/actions/survey";

import { useHistory, useParams } from "react-router-dom";
import { setAutoSave } from "redux/slices/application";

// COMPONENT

export const CreateSurveyForm: React.FC = () => {
  // FIXME: Yup, these ignore are bad, need to be removed
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { slug: surveyId } = useParams();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { step, survey } = useAppSelector((state) => state.surveyBuilder);
  const { mutateAsync: updateSurvey } = useUpdateSurvey();
  const { data, isLoading } = useGetSurveyMetadas(surveyId);

  const autoSave = () => {
    dispatch(setAutoSave());
    setTimeout(() => {
      dispatch(setAutoSave());
    }, 2000);
  };
  const autoSaveDebounce = debounce(autoSave, 500);

  useEffect(() => {
    if (data && !isLoading) {
      dispatch(updateSurveyMeta({ data: data.survey }));
    }
    dispatch(updateSurveyStep(1));
  }, [isLoading]);

  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    const target = event.target as HTMLFormElement;
    // const isSelectedField = target.id.includes("react-select");

    // if (isSelectedField) return false;
    dispatch(
      updateSurveyMeta({
        data: {
          [target.id]: target.value,
        },
      })
    );
  };

  const goToDashboard = () => {
    history.push("/dashboard");
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
      updateSurvey({
        id: surveyId,
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

  // remove unused values
  const formatInitialValues = () => {
    return {
      title: survey.title,
      slug: survey.slug,
      email: survey.email,
      language: survey.language,
      description: survey.description,
      keywords: survey.keywords,
      categories: survey.categories,
    };
  };

  return (
    <>
      <Formik
        initialValues={formatInitialValues()}
        enableReinitialize
        validationSchema={createSurveySchema}
        onSubmit={(data, { setSubmitting, validateForm }) => {
          validateForm(data);
          setSubmitting(true);
        }}
      >
        {({ values, errors }) => {
          // useEffect(() => {
          //   if (values.language) {
          //     dispatch(
          //       updateSurveyMeta({
          //         data: {
          //           language: values.language,
          //         },
          //       })
          //     );
          //   }
          // }, [values.language]);

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
                onBlur={autoSaveDebounce}
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
                      <Button onClick={goToDashboard} variant="rounded">
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
