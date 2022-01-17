import { Box, Text } from "@chakra-ui/react";
import { Footer } from "../Footer";

import { Wysiwyg } from "components/Fields/Wysiwyg";
import { Formik, Form } from "formik";
import React, { useCallback } from "react";
import { initialValues } from "./utils/initialValues";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { actions, selectors } from "redux/slices/landing-editor";

export const AboutForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const aboutPage = useAppSelector(selectors.about);
  const landing = useAppSelector(selectors.getLanding);
  const handleFinish = useCallback(() => {
    dispatch(actions.editAbout(false));
  }, []);

  if (!landing) {
    return <p>Une erreur est survenue</p>;
  }
  return (
    <Formik
      validateOnBlur={false}
      initialValues={{ about_page: aboutPage } || initialValues}
      enableReinitialize
      onSubmit={(data, { setSubmitting, validateForm }) => {
        validateForm(data);
        setSubmitting(true);
      }}
    >
      {({ values }) => {
        React.useEffect(() => {
          dispatch(
            actions.update({
              id: landing?.id,
              changes: {
                id: landing?.id,
                attributes: {
                  title: landing?.attributes?.title,
                  about_page: values.about_page,
                },
              },
            })
          );
        }, [values.about_page]);

        // Component
        return (
          <Form>
            <Box
              borderLeft="1px solid"
              px="4%"
              w="100%"
              mx="auto"
              pt="4"
              h="100%"
              sx={{
                ".jodit-workplace": {
                  height: "60vh !important",
                },
              }}
            >
              <Text
                variant="baseline"
                fontWeight="bold"
                textAlign="left"
                _hover={{ cursor: "pointer" }}
                mb="5"
              >
                Edition de la page d'accueil
              </Text>
              <Wysiwyg id="about_page" />
              <Footer
                // TODO: It's the same... ?
                onCancel={handleFinish}
                onSubmit={handleFinish}
              />
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};
