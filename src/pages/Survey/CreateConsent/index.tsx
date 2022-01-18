import { Box, Container, Text } from "@chakra-ui/react";
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
import ISurvey from "types/survey";
import { actions } from "redux/slices/scientistData";
import { Loader } from "components/Spinner";
import { Footer } from "components/CreateSurvey/CreateForm/Condition/ToolBox/InputForm/Template/Footer";
const t = {
  label: "Importer la note d'information aux participants sous format pdf",
  cta: "Importer votre fichier",
  format: "Le formulaire de consentement doit être sous format .pdf",
  submit: "Valider la page de consentement",
  cancel: "Annuler",
  switchLabel:
    "Indiquez ici si ce projet nécessite de présenter une notice d'information et de recueillir le consentement des personnes avant participation.",
};

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

  const formatInitialValues = (survey: ISurvey | undefined) => {
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
            {({ values, isValid, isSubmitting }) => {
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
                  <Box w="100%" mb="50px">
                    <Text
                      variant="baseline"
                      fontWeight="bold"
                      textAlign="left"
                      _hover={{ cursor: "pointer" }}
                      mb="5"
                    >
                      Import du consentement
                    </Text>
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
