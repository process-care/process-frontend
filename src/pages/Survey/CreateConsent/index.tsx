import { Box, Center, Container, Text } from "@chakra-ui/react";
import React from "react";
import { Menu } from "components/Menu/CreateSurvey";
import { Form, Formik } from "formik";
import { useGetSurvey } from "call/actions/survey";
import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { updateConsentMeta } from "redux/slices/surveyBuilder";
import { UploadFileRemote } from "components/Fields/UploadFileRemote";

import { API_URL_ROOT } from "constants/api";
import { PdfPreview } from "./PdfPreview";

const t = {
  label: "Importer un fichier de consentement",
  cta: "Importer votre fichier",
  format: "Format Pdf",
};

export const CreateConsent: React.FC = () => {
  // FIXME: Yup, these ignore are bad, need to be removed
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { slug: surveyId } = useParams();
  const { data: survey } = useGetSurvey(surveyId);
  const dispatch = useDispatch();

  console.log(survey);
  return (
    <Box d="flex" justifyContent="space-around" w="100%" overflow="hidden">
      <Box w="100%">
        <Menu />
        <div className="background__grid">
          <Center h="80vh">
            <PdfPreview
              url={`${API_URL_ROOT}${survey?.survey.consentement.url}`}
            />
          </Center>
        </div>
      </Box>
      <Container variant="rightPart">
        <Center h="100vh">
          <Formik
            validateOnBlur={false}
            initialValues={
              survey?.survey.consentement || {
                consentement: { id: "", name: "", url: "" },
              }
            }
            enableReinitialize
            onSubmit={(data, { setSubmitting, validateForm }) => {
              validateForm(data);
              setSubmitting(true);
            }}
          >
            {({ values }) => {
              React.useEffect(() => {
                dispatch(updateConsentMeta(values));
              }, [values]);

              // Target params for various uploads (cover, partners)
              const targets = React.useMemo(() => {
                const base = { refId: surveyId, ref: "survey" };
                return {
                  consentement: { ...base, field: "consentement" },
                };
              }, [values]);

              return (
                <Form style={{ textAlign: "left", width: "80%" }}>
                  <Text variant="currentBold">{t.label}</Text>

                  <UploadFileRemote
                    accept=".pdf,.doc"
                    target={targets.consentement}
                    content={values}
                    label={t.cta}
                    helpText=""
                    onChange={(e) => console.log(e)}
                  />

                  {/* <UploadFile
                    onChange={(e) => console.log(e)}
                    label={t.cta}
                    id="consentement"
                    helpText={t.format}
                  /> */}
                </Form>
              );
            }}
          </Formik>
        </Center>
      </Container>
    </Box>
  );
};
