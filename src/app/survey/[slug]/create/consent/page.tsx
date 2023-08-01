'use client'

import { useRef, useMemo, useEffect } from "react";
import { Box, Container, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import { Switch } from "@/components/Fields";
import { actions } from "@/redux/slices/scientistData";
import { SurveyBySlugQuery, useSurveyBySlugQuery } from "@/api/graphql/queries/survey.gql.generated";
import { client } from "@/api/gql-client";
import Loader from "@/components/Spinner";
import Menu from "@/components/Menu/CreateSurvey";
import UploadFileRemote from "@/components/Fields/UploadFileRemote";
import Footer from "@/components/CreateSurvey/CreateForm/Condition/ToolBox/InputForm/Template/Footer";
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
};

// ---- TYPES

type Props = {
  params: {
    slug: string;
  };
};

// ---- COMPONENT

export default function CreateConsent({ params }: Props): JSX.Element {
  const dispatch = useDispatch();
  const router = useRouter()
  const { slug } = params
  const { data: survey, isLoading, refetch } = useSurveyBySlugQuery(client, { slug });

  const attributes = survey?.surveys?.data[0].attributes;
  const surveyId = survey?.surveys?.data[0].id;
  const url = attributes?.notice_consent?.data?.attributes?.url;

  const firstRender = useRef(true);

  const goToDashboard = () => {
    router.push("/dashboard");
  };

  const formatInitialValues = (survey: SurveyBySlugQuery | undefined) => {
    return {
      consentement: survey?.surveys?.data[0]?.attributes?.notice_consent?.data,
      needConsent: survey?.surveys?.data[0]?.attributes?.need_consent,
    };
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box display="flex" justifyContent="space-around" w="100%" overflow="hidden" h="100vh">
      <Box w="100%">
        <Menu surveyTitle={attributes?.title} />
        <div className="background__grid">
          <Box h="100%" display="flex" justifyContent="center" overflow="scroll" pt="40px" pb="40px">
            {url ? <PDFPreview url={url} /> : <Box w="450px" h="80%" backgroundColor="gray.100" />}
          </Box>
        </div>
      </Box>

      <Container variant="rightPart">
        <Box h="90vh" p="30">
          <Formik
            validateOnBlur={false}
            initialValues={formatInitialValues(survey)}
            enableReinitialize
            onSubmit={(data, { setSubmitting, validateForm }) => {
              validateForm(data);
              setSubmitting(true);
            }}
          >
            {({ values, isValid, isSubmitting }) => {
              useEffect(() => {
                if (firstRender.current) {
                  firstRender.current = false;
                  return;
                }

                dispatch(
                  actions.updateSurvey({
                    id: surveyId,
                    needConsent: Array.isArray(values.needConsent) ? values.needConsent.includes('on') : Boolean(values.needConsent),
                    noticeConsent: values.consentement,
                  })
                );

                // FIXME: Refetch this sh*t better
                setTimeout(refetch, 500);
              }, [values]);

              const targets = useMemo(() => {
                const base = { refId: surveyId, ref: "survey" };
                return {
                  consentement: { ...base, field: "consentement" },
                };
              }, [values, survey]);

              return (
                <Form
                  style={{
                    textAlign: "left",
                    position: "relative",
                    height: "100%",
                  }}
                >
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
                    <>
                      <UploadFileRemote
                        accept=".pdf,.doc"
                        target={targets.consentement}
                        content={values.consentement}
                        label={t.cta}
                        helpText={t.format}
                        onChange={(e: any) => console.log(e)}
                      />
                    </>
                  )}

                  <Footer
                    w="50%"
                    onSubmit={() => goToDashboard()}
                    disabled={!isValid || isSubmitting}
                    onCancel={goToDashboard}
                    hideDelete={true}
                  />
                </Form>
              );
            }}
          </Formik>
        </Box>
      </Container>
    </Box>
  );
};
