import React, { useCallback, useEffect } from "react";
import { Formik, Form } from "formik";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

import { useAddSurvey, useUpdateSurvey } from "call/actions/survey";
import { useAddPage } from "call/actions/formBuider/page";
import { useAddLanding } from "call/actions/landing";

import { createSurveySchema } from "../validationSchema";
import { useHistory } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "redux/hooks";

import {
  initialState,
  Survey,
  updateSurveyMeta,
  updateSurveyStep,
} from "redux/slices/surveyBuilder";

import { ReactComponent as Submit } from "./../assets/submit.svg";
import { renderInputs } from "./utils";

// STATIC

const t = {
  createLanding: "Créer une landing",
  createForm: "Créer un formulaire",
  title: "Enquête :",
  cta: "Créer l'enquête !",
};

//  TYPES

// COMPONENT

export const CreateSurveyForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { survey, step } = useAppSelector((state) => state.surveyBuilder);

  const { mutateAsync: addSurvey } = useAddSurvey();
  const { mutateAsync: updateSurvey } = useUpdateSurvey();
  const { mutateAsync: addPage } = useAddPage();
  const { mutateAsync: addLanding } = useAddLanding();

  const [newSurvey, setNewSurvey] = React.useState<
    Survey["survey"] | Record<string, any>
  >({});

  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    const target = event.target as HTMLFormElement;
    dispatch(
      updateSurveyMeta({
        data: {
          [target.id]: target.value,
        },
      })
    );
    // const res = await addSurvey({
    //   title: data.title,
    //   slug: data.title,
    //   status: "draft",
    // });
    // // create survey first page
    // await addPage({
    //   name: `Page 1`,
    //   is_locked: false,
    //   short_name: `P1`,
    //   survey: res.createSurvey.survey.id,
    // });
    // // create Landing
    // const landing: Record<string, any> = await addLanding({
    //   title: res.createSurvey.survey.title,
    //   survey: res.createSurvey.survey.id,
    // });
    // // update survey with landing id.
    // await updateSurvey({
    //   id: res.createSurvey.survey.id,
    //   data: { landing: landing.createLanding.landing.id },
    // });
    // setNewSurvey({
    //   id: res.createSurvey.survey.id,
    //   slug: res.createSurvey.survey.title,
    //   title: res.createSurvey.survey.title,
    // });
  };

  const Navigatebtn = ({
    step,
    previous,
  }: {
    step: number;
    previous?: boolean;
  }) => {
    const target = step + (previous ? -1 : +1);
    return (
      <Box mr="40px">
        <Button
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

  const navigateTo = (step: number) => {
    dispatch(updateSurveyStep(step));
  };

  if (newSurvey.id) {
    return <ActionButtons newSurvey={newSurvey} />;
  }

  return (
    <>
      <Formik
        initialValues={initialState.survey}
        enableReinitialize
        validationSchema={createSurveySchema}
        onSubmit={(data, { setSubmitting, validateForm }) => {
          validateForm(data);
          setSubmitting(true);
          // createSurvey(data);
        }}
      >
        {({ isValid, isSubmitting, values }) => {
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
                    {step !== 1 && <Navigatebtn step={step} previous />}
                    {renderInputs(step)}
                    <Navigatebtn step={step} />
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

// <Button
//   variant="ghost"
//   left="0"
//   _hover={{
//     backgroundColor: "transparent",
//     left: "3px",
//     transition: "all 300ms",
//   }}
//   type="submit"
//   isDisabled={!isValid || isSubmitting || values.title === ""}
// >
//   <Submit />
// </Button>;

interface ActionButtonsProps {
  newSurvey: Survey["survey"] | Record<string, any>;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ newSurvey }) => {
  const { id, title } = newSurvey;
  const { goToLanding, goToForm } = useNavigator(id);

  return (
    <Box>
      <p>
        {t.title} {title}
      </p>

      <Box pt="80px" d="flex" justifyContent="center" w="100%" my="auto">
        <Button h="400px" mr="50px" w="40%" onClick={goToLanding}>
          {t.createLanding}
        </Button>
        <Button h="400px" w="40%" onClick={goToForm}>
          {t.createForm}
        </Button>
      </Box>
    </Box>
  );
};

// HOOKS

function useNavigator(surveyId: string) {
  const history = useHistory();

  // Take you to the landing editor
  const goToLanding = useCallback(() => {
    history.push(`/survey/${surveyId}/create/landing`);
  }, [surveyId]);

  // Take you to the form editor
  const goToForm = useCallback(() => {
    history.push(`/survey/${surveyId}/create/form`);
  }, [surveyId]);

  return {
    goToLanding,
    goToForm,
  };
}
