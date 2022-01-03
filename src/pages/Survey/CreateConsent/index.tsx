import { Box, Center, Container, Text, Button } from "@chakra-ui/react";
import React from "react";
import { Menu } from "components/Menu/CreateSurvey";
import { Form, Formik } from "formik";
import { useGetSurveyBySlug } from "call/actions/survey";
import { useHistory, useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { updateConsentMeta } from "redux/slices/surveyBuilder";
import { UploadFileRemote } from "components/Fields/UploadFileRemote";

import { API_URL_ROOT } from "constants/api";
import { PdfPreview } from "./PdfPreview";
import { Switch } from "components/Fields";
import ISurvey from "types/survey";

const t = {
  label: "Importer un fichier de consentement",
  cta: "Importer votre fichier",
  format: "Format .pdf",
  submit: "Valider la page de consentement",
  cancel: "Annuler",
};

export const CreateConsent: React.FC = () => {
  const { slug: surveyId } = useParams<{ slug: string }>();
  const { data: survey } = useGetSurveyBySlug(surveyId);
  const dispatch = useDispatch();
  const url = survey?.consentement?.url;
  const history = useHistory();

  const goToDashboard = () => {
    history.push("/dashboard");
  };

  const formatInitialValues = (survey: ISurvey | undefined) => {
    return {
      consentement: survey?.consentement,
      needConsent: survey?.needConsent || true,
    };
  };

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
        <Center h="100vh">
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
                console.log(values);
                dispatch(updateConsentMeta(values));
              }, [values]);
              const targets = React.useMemo(() => {
                const base = { refId: survey?.id, ref: "survey" };
                return {
                  consentement: { ...base, field: "consentement" },
                };
              }, [values, survey]);
              return (
                <Form style={{ textAlign: "left", width: "80%" }}>
                  {values.needConsent && (
                    <>
                      <Text variant="currentBold">{t.label}</Text>
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
                  <Box w="100%" mt="20">
                    <Switch
                      label="Demander un consentement"
                      id="needConsent"
                      defaultChecked={true}
                    />
                  </Box>

                  <Box pos="fixed" bottom="50px" d="flex" flexDir="column">
                    <Button
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
                </Form>
              );
            }}
          </Formik>
        </Center>
      </Container>
    </Box>
  );
};
