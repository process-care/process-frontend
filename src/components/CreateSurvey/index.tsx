import React from "react";
import { Formik, Form } from "formik";
import { Box, Button, Flex } from "@chakra-ui/react";
import { Textarea } from "components/Fields";

import { useAddSurvey } from "api/actions/survey";
import { createSurveySchema } from "./validationSchema";

export const CreateSurveyForm: React.FC = () => {
  const { mutateAsync: addSurvey } = useAddSurvey();

  const onChange = (event: React.FormEvent<HTMLFormElement>) => {
    const target = event.target as HTMLFormElement;
    console.log(target);
  };
  return (
    <Formik
      validateOnBlur={false}
      initialValues={{ title: "" }}
      enableReinitialize
      validationSchema={createSurveySchema}
      onSubmit={(data, { setSubmitting, validateForm }) => {
        validateForm(data);
        setSubmitting(true);
        addSurvey({ title: data.title, status: "draft" });
      }}
    >
      {({ isValid, isSubmitting, values }) => {
        return (
          <Box w="100%">
            <Form
              onChange={(event) => onChange(event)}
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
