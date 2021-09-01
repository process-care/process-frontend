import React, { useCallback } from "react";
import { Formik, Form } from "formik";
import { Box, Button, Flex } from "@chakra-ui/react";
import { Textarea } from "components/Fields";

import { useAddSurvey } from "api/actions/survey";
import { useAddPage } from "api/actions/formBuider/page";
import { useAddLanding } from "api/actions/landing";

import { createSurveySchema } from "./validationSchema";
import { useHistory } from "react-router-dom";

// STATIC

const t = {
  createLanding: "Créer une landing",
  createForm: "Créer un formulaire",
};

export const CreateSurveyForm: React.FC = () => {
  const { mutateAsync: addSurvey } = useAddSurvey();
  const { mutateAsync: addPage } = useAddPage();
  const { mutateAsync: addLanding } = useAddLanding();

  const [newSurvey, setNewSurvey] = React.useState<Record<string, any>>({});

  if (newSurvey.id) {
    return <ActionButtons id={newSurvey.id} slug={newSurvey.slug} />;
  }

  return (
    <Formik
      validateOnBlur={false}
      initialValues={{ title: "", slug: "" }}
      enableReinitialize
      validationSchema={createSurveySchema}
      onSubmit={(data, { setSubmitting, validateForm }) => {
        validateForm(data);
        setSubmitting(true);
        addSurvey({ title: data.title, slug: data.slug, status: "draft" }).then(
          (d: any) => {
            setNewSurvey({
              id: d.createSurvey.survey.id,
              slug: d.createSurvey.survey.slug,
            });
            // create survey first page
            addPage({
              name: `Page 1`,
              is_locked: false,
              short_name: `P1`,
              survey: d.createSurvey.survey.id,
            });
            // create Landing
            addLanding({
              title: d.createSurvey.survey.title,
              // survey: d.createSurvey.survey.id,
            });
          }
        );
      }}
    >
      {({ isValid, isSubmitting, values }) => {
        return (
          <Box w="100%">
            <p>{newSurvey.slug}</p>
            <Form
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
                <Textarea
                  id="title"
                  rows="small"
                  placeholder="Titre de l'enquête"
                  label="Renseigner le titre de l'enquête"
                />
                <Textarea
                  id="slug"
                  rows="small"
                  placeholder="Url de l'enquête"
                  label="Renseigner l'url de l'enquête"
                />
                <Button
                  type="submit"
                  w="50%"
                  mt="80px"
                  isDisabled={!isValid || isSubmitting || values.title === ""}
                >
                  Créer l'enquête !
                </Button>
              </Flex>
            </Form>
          </Box>
        );
      }}
    </Formik>
  );
};

const ActionButtons = ({ slug, id }: { slug: string; id: string }) => {
  const { goToLanding, goToForm } = useNavigator(id);

  return (
    <Box>
      <p>Enquête : {slug}</p>

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
