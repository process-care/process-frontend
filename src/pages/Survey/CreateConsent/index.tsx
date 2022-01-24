import { Box, Container, Text, Button } from "@chakra-ui/react";
import React, { useRef } from "react";
import { Menu } from "components/Menu/CreateSurvey";
import { Form, Formik } from "formik";
import { useGetSurveyBySlug } from "call/actions/survey";
import { useHistory, useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { UploadFileRemote } from "components/Fields/UploadFileRemote";

import { API_URL_ROOT } from "constants/api";
import { PdfPreview } from "./PdfPreview";
import { Switch } from "components/Fields";
import { actions } from "redux/slices/scientistData";
import { Loader } from "components/Spinner";
import { Survey } from "types/survey";

// ---- STATICS

const t = {
  label: "Importer la note d'information aux participants sous format pdf",
  cta: "Importer votre fichier",
  format: "Format .pdf",
  submit: "Valider la page de consentement",
  cancel: "Annuler",
  switchLabel:
    "Ce projet nécessite de présenter une notice d'information et de recueillir le consentement des personnes avant participation",
};

// ---- COMPONENT

export const CreateConsent: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: survey, isLoading } = useGetSurveyBySlug(slug);
  const dispatch = useDispatch();
  const url = survey?.consentement?.url;
  const history = useHistory();
  const firstRender = useRef(true);
  const goToDashboard = () => {
    history.push("/dashboard");
  };

  const formatInitialValues = (survey: Survey | undefined) => {
    return {
      consentement: survey?.consentement,
      needConsent: survey?.needConsent,
    };
  };
  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box
      d="flex"
      justifyContent="space-around"
      w="100%"
      overflow="hidden"
      h="100vh"
    >
      <Box w="100%">
        <Menu surveyTitle={survey?.title} />
        <div className="background__grid">
          <Box
            h="100%"
            d="flex"
            justifyContent="center"
            overflow="scroll"
            pt="40px"
          >
            {url ? (
              <PdfPreview url={`${API_URL_ROOT}${url}`} />
            ) : (
              <Box w="450px" h="80%" backgroundColor="gray.100" />
            )}
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
            {({ values }) => {
              React.useEffect(() => {
                if (firstRender.current) {
                  firstRender.current = false;
                  return;
                }
                dispatch(
                  actions.updateSurvey({
                    id: survey?.id,
                    needConsent: values.needConsent,
                  })
                );
              }, [values]);
              const targets = React.useMemo(() => {
                const base = { refId: survey?.id, ref: "survey" };
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
                  <Box w="100%" mt="20">
                    <Text variant="currentBold" mb="10">
                      {t.switchLabel}
                    </Text>
                    <Switch
                      label={t.label}
                      id="needConsent"
                      defaultChecked={true}
                    />
                  </Box>
                  {values.needConsent && (
                    <>
                      <Text variant="currentBold" mt="200px">
                        {t.label}
                      </Text>
                      <UploadFileRemote
                        accept=".pdf,.doc"
                        target={targets.consentement}
                        content={values.consentement}
                        label={t.cta}
                        helpText={t.format}
                        onChange={(e: any) => console.log("e", e)}
                      />
                    </>
                  )}

                  <Box pos="absolute" bottom="0" w="100%" h="100px">
                    <Box d="flex" flexDir="column">
                      <Button
                        m="0 auto"
                        w="fit-content"
                        variant="rounded"
                        backgroundColor="black"
                        onClick={goToDashboard}
                      >
                        {t.submit}
                      </Button>
                      <Button variant="link" onClick={goToDashboard} mt="10px">
                        {t.cancel}
                      </Button>
                    </Box>
                  </Box>
                </Form>
              );
            }}
          </Formik>
        </Box>
      </Container>
    </Box>
  );
};
