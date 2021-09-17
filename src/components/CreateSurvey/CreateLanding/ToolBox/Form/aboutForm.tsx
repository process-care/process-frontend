import { Box } from "@chakra-ui/react";
import { Footer } from "../Footer";

import { Wysiwyg } from "components/Fields/Wysiwyg";
import { Formik, Form } from "formik";
import React from "react";
import { setEditAboutPage } from "redux/slices/landingBuilder";
import { initialValues } from "./utils/initialValues";
import { useAppDispatch } from "redux/hooks";
import { ILanding } from "types/landing";
import { useUpdateLanding } from "call/actions/landing";
import { setAutoSave } from "redux/slices/application";
import { debounce } from "lodash";

interface Props {
  data: ILanding;
}

export const AboutForm: React.FC<Props> = ({ data }) => {
  const { mutateAsync: updateLanding } = useUpdateLanding();

  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    dispatch(setEditAboutPage());
  };

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
      initialValues={{ about_page: data.about_page } || initialValues}
      enableReinitialize
      onSubmit={(data, { setSubmitting, validateForm }) => {
        validateForm(data);
        setSubmitting(true);
      }}
    >
      {({ values }) => {
        React.useEffect(() => {
          updateLanding({
            id: data.id,
            data: {
              about_page: values.about_page,
            },
          });
        }, [values.about_page]);

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
                onCancel={() => dispatch(setEditAboutPage())}
                onSubmit={() => handleSubmit()}
              />
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};
