import { Box, Center, Container, Text } from "@chakra-ui/react";
import React from "react";
import { Menu } from "components/Menu/CreateSurvey";
import { Form, Formik } from "formik";
import { useGetSurvey } from "call/actions/survey";
import { useParams } from "react-router-dom";
import { UploadFile } from "components/Fields/Uploadfile";
import { useDispatch } from "react-redux";
import { updateConsentMeta } from "redux/slices/surveyBuilder";

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

  return (
    <Box d="flex" justifyContent="space-around" w="100%" overflow="hidden">
      <Box w="100%">
        <Menu />
        <div className="background__grid">
          <Center h="80vh">plaf</Center>
        </div>
      </Box>
      <Container variant="rightPart">
        <Center h="100vh">
          <Formik
            validateOnBlur={false}
            initialValues={survey?.survey.consentement || { consentement: "" }}
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
              return (
                <Form style={{ textAlign: "left", width: "80%" }}>
                  <Text variant="currentBold">{t.label}</Text>
                  <UploadFile
                    onChange={(e) => console.log(e)}
                    label={t.cta}
                    id="consentement"
                    helpText={t.format}
                  />
                </Form>
              );
            }}
          </Formik>
        </Center>
      </Container>
    </Box>
  );
};
