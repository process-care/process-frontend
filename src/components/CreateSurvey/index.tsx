import React from "react";
import { Formik, Form } from "formik";
import { Box, Button, Flex } from "@chakra-ui/react";
import { Textarea } from "components/Fields";

import { useAddSurvey } from "api/actions/survey";

export const CreateSurveyForm: React.FC = () => {
  const { mutateAsync: addSurvey } = useAddSurvey();

  const onChange = (event: React.FormEvent<HTMLFormElement>) => {
    const target = event.target as HTMLFormElement;
    console.log(target);
  };
  return (
    <Formik
      validateOnBlur={false}
      initialValues={{ description: "" }}
      enableReinitialize
      onSubmit={(data, { setSubmitting, validateForm }) => {
        validateForm(data);
        setSubmitting(true);
        addSurvey(data.description);
      }}
    >
      {() => {
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
                  id="description"
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
                <Button type="submit" isFullWidth mt="80px">
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
