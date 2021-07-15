import { Box } from "@chakra-ui/react";
import { Footer } from "../Footer";

import { Wysiwyg } from "components/Fields/Wysiwyg";
import { Formik } from "formik";
import React from "react";
import { editAboutPage } from "redux/slices/aboutBuilder";
import { useHistory } from "react-router-dom";
import { initialValues } from "./utils/initialValues";
import { useAppDispatch } from "redux/hooks";
import { ILanding } from "interfaces/landing";
import { useUpdateLanding } from "api/actions/Landing";

interface Props {
  data: ILanding;
}

export const AboutForm: React.FC<Props> = ({ data }) => {
  const { mutateAsync: updateLanding } = useUpdateLanding();

  const history = useHistory();
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    history.push("/create-survey/create-landing");
    dispatch(editAboutPage());
  };
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
              onCancel={() => dispatch(editAboutPage())}
              onSubmit={() => handleSubmit()}
            />
          </Box>
        );
      }}
    </Formik>
  );
};
