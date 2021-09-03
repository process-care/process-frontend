import React, { useCallback } from "react";
import { Formik, Form } from "formik";
import { Box, Button, Flex } from "@chakra-ui/react";
import { Textarea } from "components/Fields";

import { useAddSurvey, useUpdateSurvey } from "call/actions/survey";
import { useAddPage } from "call/actions/formBuider/page";
import { useAddLanding } from "call/actions/landing";

import { createSurveySchema } from "./validationSchema";
import { useHistory } from "react-router-dom";

// STATIC

const t = {
  createLanding: "Créer une landing",
  createForm: "Créer un formulaire",
  title: "Enquête :",
  cta: "Créer l'enquête !",
};

//  TYPES

interface Survey {
  id?: string;
  title: string;
  slug?: string;
  status?: string;
}

// COMPONENT

export const CreateSurveyForm: React.FC = () => {
  const { mutateAsync: addSurvey } = useAddSurvey();
  const { mutateAsync: updateSurvey } = useUpdateSurvey();
  const { mutateAsync: addPage } = useAddPage();
  const { mutateAsync: addLanding } = useAddLanding();

  const [newSurvey, setNewSurvey] = React.useState<
    Survey | Record<string, any>
  >({});

  const createSurvey = async (data: Survey) => {
    const res = await addSurvey({
      title: data.title,
      slug: data.title,
      status: "draft",
    });

    // create survey first page
    await addPage({
      name: `Page 1`,
      is_locked: false,
      short_name: `P1`,
      survey: res.createSurvey.survey.id,
    });

    // create Landing
    const landing: Record<string, any> = await addLanding({
      title: res.createSurvey.survey.title,
      survey: res.createSurvey.survey.id,
    });

    // update survey with landing id.
    await updateSurvey({
      id: res.createSurvey.survey.id,
      data: { landing: landing.createLanding.landing.id },
    });

    setNewSurvey({
      id: res.createSurvey.survey.id,
      slug: res.createSurvey.survey.title,
      title: res.createSurvey.survey.title,
    });
  };

  if (newSurvey.id) {
    return <ActionButtons newSurvey={newSurvey} />;
  }

  return (
    <Formik
      validateOnBlur={false}
      initialValues={{ title: "" }}
      enableReinitialize
      validationSchema={createSurveySchema}
      onSubmit={(data, { setSubmitting, validateForm }) => {
        validateForm(data);
        setSubmitting(true);
        createSurvey(data);
      }}
    >
      {({ isValid, isSubmitting, values }) => {
        return (
          <Box w="100%">
            <p>{newSurvey.title}</p>
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
                {/* <Textarea
                  id="slug"
                  rows="small"
                  placeholder="Url de l'enquête"
                  label="Renseigner l'url de l'enquête"
                /> */}
                <Button
                  type="submit"
                  w="50%"
                  mt="80px"
                  isDisabled={!isValid || isSubmitting || values.title === ""}
                >
                  {t.cta}
                </Button>
              </Flex>
            </Form>
          </Box>
        );
      }}
    </Formik>
  );
};

interface ActionButtonsProps {
  newSurvey: Survey | Record<string, any>;
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
