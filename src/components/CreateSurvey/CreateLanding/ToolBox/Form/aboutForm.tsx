import { Box } from "@chakra-ui/react";
import { Footer } from "../Footer";

import { Wysiwyg } from "components/Fields/Wysiwyg";
import { Formik } from "formik";
import React from "react";
import { updateLanding } from "redux/slices/aboutBuilder";
import { editAboutPage } from "redux/slices/aboutBuilder";

import { initialValuesAbout } from "./utils/initialValues";
import { useAppDispatch, useAppSelector } from "redux/hooks";

export const AboutForm: React.FC = () => {
  const { content } = useAppSelector((state) => state.aboutBuilder);
  const dispatch = useAppDispatch();

  return (
    <Formik
      validateOnBlur={false}
      initialValues={{ wysiwyg: content } || initialValuesAbout}
      enableReinitialize
      onSubmit={(data, { setSubmitting, validateForm }) => {
        validateForm(data);
        setSubmitting(true);
      }}
    >
      {({ values }) => {
        // Handle wysiwyg change
        React.useEffect(() => {
          dispatch(updateLanding(values.wysiwyg));
        }, [values.wysiwyg]);

        return (
          <Box
            w="90%"
            mx="auto"
            mt="130px"
            h="100%"
            sx={{
              ".jodit-workplace": {
                height: "60vh !important",
              },
            }}
          >
            <Wysiwyg id="about" />
            <Footer
              onCancel={() => dispatch(editAboutPage())}
              onSubmit={() => console.log("")}
            />
          </Box>
        );
      }}
    </Formik>
  );
};
