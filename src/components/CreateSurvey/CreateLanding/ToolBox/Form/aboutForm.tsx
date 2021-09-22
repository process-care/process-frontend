import { Box } from "@chakra-ui/react";
import { Footer } from "../Footer";

import { Wysiwyg } from "components/Fields/Wysiwyg";
import { Formik, Form } from "formik";
import React, { useCallback } from "react";
import { setEditAboutPage } from "redux/slices/landingBuilder";
import { initialValues } from "./utils/initialValues";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { setAutoSave } from "redux/slices/application";
import { debounce } from "lodash";
import { actions, selectors } from "redux/slices/landing-editor";
import { useDebounce } from "utils/hooks/debounce";

export const AboutForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const aboutPage = useAppSelector(selectors.about);

  const handleFinish = useCallback(() => {
    dispatch(setEditAboutPage());
  }, []);

  const autoSave = () => {
    dispatch(setAutoSave());
    setTimeout(() => {
      dispatch(setAutoSave());
    }, 2000);
  };
  const autoSaveDebounce = debounce(autoSave, 500);

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
        // Handle update value
        const debouncedAbout = useDebounce(values.about_page, 2000);
        React.useEffect(() => {
          dispatch(actions.update({ about_page: debouncedAbout }));
        }, [debouncedAbout]);

        // Component
        return (
          <Form onBlur={autoSaveDebounce}>
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
