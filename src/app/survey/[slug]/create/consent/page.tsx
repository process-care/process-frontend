'use client'

import { useRef, useMemo, useEffect, useCallback } from "react"
import { Box, Container, Text } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation.js"

import { Switch } from "@/components/Fields/index.ts"
import { actions } from "@/redux/slices/scientistData.js"
import { SurveyBySlugQuery, useSurveyBySlugQuery } from "@/api/graphql/queries/survey.gql.generated.js"
import { client } from "@/api/gql-client.js"
import Loader from "@/components/Spinner/index.tsx"
import Menu from "@/components/Menu/CreateSurvey/index.tsx"
import UploadFileRemote from "@/components/Fields/Upload/UploadFileRemote"
import Footer from "@/components/CreateSurvey/CreateForm/Condition/ToolBox/InputForm/Template/Footer/index.tsx"
import PDFPreview from "@/components/PDFPreview"

// ---- STATICS

const t = {
  label: "Importer la note d'information aux participants sous format pdf",
  cta: "Importer votre fichier",
  format: "Le formulaire de consentement doit être sous format .pdf",
  submit: "Valider la page de consentement",
  cancel: "Annuler",
  switchLabel:
    "Indiquez ici si ce projet nécessite de présenter une notice d'information et de recueillir le consentement des personnes avant participation.",
    placeholderPreview: "Le PDF importé apparaitra ici, le cas échéant."
};

// ---- TYPES

type Props = {
  params: {
    slug: string;
  };
};

// ---- COMPONENT

export default function CreateConsent({ params }: Props): JSX.Element {
  const { slug } = params
  const { data: survey, isLoading, refetch } = useSurveyBySlugQuery(client, { slug });

  const attributes = survey?.surveys?.data[0]?.attributes;
  const surveyId = survey?.surveys?.data[0]?.id;
  const url = attributes?.notice_consent?.data?.attributes?.url;

  // FIXME: Refactor ça ? Pourquoi c'est une fonction ?
  const formatInitialValues = (survey: SurveyBySlugQuery | undefined) => {
    return {
      noticeConsent: survey?.surveys?.data[0]?.attributes?.notice_consent?.data,
      needConsent: survey?.surveys?.data[0]?.attributes?.need_consent,
    };
  };

  if (isLoading) {
    return <Loader />
  }

  return (
    <Box display="flex" justifyContent="space-around" w="100%" overflow="hidden" h="100vh">
      <Box w="100%">
        <Menu surveyTitle={attributes?.title} />

        <div className="h-[calc(100vh-65px)] p-2 bg-gray-100">
          { url
            ? <PDFPreview url={url} />
            : <div className="text-base font-light italic my-20">{ t.placeholderPreview }</div>
          }
        </div>
      </Box>

      <Container variant="rightPart">
        <Formik
          validateOnBlur={false}
          initialValues={formatInitialValues(survey)}
          enableReinitialize
          onSubmit={(data, { setSubmitting, validateForm }) => {
            validateForm(data)
            setSubmitting(true)
          }}
        >
          {({ values, isValid, isSubmitting }) => {
            return <FormConsentement
              values={values}
              isValid={isValid}
              isSubmitting={isSubmitting}
              surveyId={surveyId}
              refetch={refetch}
            />
          }}
        </Formik>
      </Container>
    </Box>
  );
};

// ---- SUB COMPONENT

// Form

interface FormProps {
  values: any
  isValid: boolean
  isSubmitting: boolean
  surveyId: string | undefined | null
  refetch: () => void
}

function FormConsentement({ values, isValid, isSubmitting, surveyId, refetch }: FormProps) {
  const dispatch = useDispatch()
  const router = useRouter()
  const firstRender = useRef(true)

  const goToDashboard = () => { router.push("/dashboard") }

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    dispatch(
      actions.updateSurvey({
        id: surveyId,
        needConsent: Array.isArray(values.needConsent) ? values.needConsent.includes('on') : Boolean(values.needConsent),
        noticeConsent: values.noticeConsent,
      })
    );

    // FIXME: Refetch this sh*t better
    setTimeout(refetch, 500)
  }, [dispatch, refetch, surveyId, values.noticeConsent, values.needConsent])

  const targets = useMemo(() => ({
    consentement: { refId: surveyId, ref: "survey", field: "noticeConsent" }
  }), [surveyId]);

  return (
    <Form className="flex flex-col text-left h-full w-full">
      <div className="p-5 flex-grow overflow-auto">
        <Box w="100%" mb="50px">
          <Text variant="baseline" fontWeight="bold" textAlign="left" _hover={{ cursor: "pointer" }} mb="5">
            Import du consentement
          </Text>

          <Text variant="currentBold" mb="10">
            {t.switchLabel}
          </Text>

          <Switch label={t.label} id="needConsent" defaultChecked={true} />
        </Box>

        {values.needConsent && (
          <UploadConsentement target={targets.consentement} content={values.noticeConsent} />
        )}
      </div>

      <Footer
        onSubmit={goToDashboard}
        disabled={!isValid || isSubmitting}
        onCancel={goToDashboard}
        hideDelete={true}
      />
    </Form>
  );
}

// Uploader

interface UploadConsentementProps {
  target: any
  content: any
}

function UploadConsentement({ target, content }: UploadConsentementProps) {
  const onChange = useCallback((e: any) => console.log(e), [])

  return (
    <UploadFileRemote
      accept=".pdf,.doc"
      target={target}
      content={content}
      label={t.cta}
      helpText={t.format}
      onChange={onChange}
    />
  );
}