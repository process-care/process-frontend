import { Box } from "@chakra-ui/react";
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
              w="90%"
              mx="auto"
              mt="130px"
              h="80%"
              sx={{
                ".jodit-workplace": {
                  height: "60vh !important",
                },
              }}
            >
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
