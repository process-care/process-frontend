'use client'

import { useCallback, useEffect, useRef, useState } from "react";
import { Formik, Form, FormikErrors } from "formik";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation.js"
import Link from "next/link.js"

import Errors, { renderSurveyMessage } from "@/components/Authentification/Errors/index.tsx"
import { useAppSelector, useAppDispatch } from "@/redux/hooks/index.js"
import { selectors, actions } from "@/redux/slices/survey-editor.js"
import { Enum_Survey_Status, Survey } from "@/api/graphql/types.generated.ts"
import { createSurveySchema } from "../validationSchema/index.tsx"
import { checkValidity, renderInputs } from "./utils.tsx"
import { SurveyRedux } from "@/redux/slices/types/index.js"

// COMPONENT

export default function CreateSurveyForm(): JSX.Element {
  const params = useParams()
  const router = useRouter();
  const slug = params.slug as string;
  const dispatch = useAppDispatch()
  const [submitted, setSubmitted] = useState(false);

  // TODO: We could even do this effect when the user opens a side menu in the dashboard, so we "preload" the data
  useEffect(() => {
    if (!slug) return
    dispatch(actions.initialize(slug));
  }, [dispatch, slug]);

  const survey = useAppSelector(selectors.getSurveyDraft);
  const isPosted = useAppSelector(selectors.isPosted);

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
        {({ values, errors, isSubmitting }) =>
          <FormDisplay
            survey={survey}
            values={values}
            errors={errors}
            isSubmitting={isSubmitting}
          />
        }
      </Formik>
    </>
  );
};

// ---- SUB COMPONENT

// -- Form display

interface FormDisplayProps {
  survey: SurveyRedux | undefined
  values: Survey
  errors: FormikErrors<Survey>
  isSubmitting: boolean
}

function FormDisplay({ survey, values, errors, isSubmitting }: FormDisplayProps): JSX.Element {
  const dispatch = useAppDispatch()

  // Flag to avoid saving the initial values injected into Formik
  const firstRender = useRef(true)
  const error = useAppSelector(selectors.error)
  const step = useAppSelector(selectors.step)

  // If survey does not have id, it means that it is a draft
  const isDraft = survey?.id === "";

  // Handle update survey values
  useEffect(() => {
    if (!survey?.id || isDraft) return

    dispatch(
      actions.update({
        id: survey.id,
        changes: {
          id: survey.id,
          attributes: {
            title: values.title,
            slug: values.slug,
            description: values.description,
            keywords: values.keywords,
            language: values.language,
            email: values.email,
          },
        },
      })
    );
  }, [dispatch, isDraft, survey?.id, values]);

  // Handle update meta values
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
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
  }, [dispatch, isDraft, survey?.id, values]);

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
                <NavigateBtn
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

              <NavigateBtn
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
  )
}

// -- Buttons

const NavigateBtn = ({
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
