import { useCallback, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { Formik, Form } from "formik";

import { initialValues } from "./utils/initialValues";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { actions, selectors } from "@/redux/slices/landing-editor";
import Footer from "@/components/CreateSurvey/CreateForm/Condition/ToolBox/InputForm/Template/Footer";
import Wysiwyg from "@/components/Fields/Wysiwyg/Wysiwyg";

export default function AboutForm(): JSX.Element {
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
        useEffect(() => {
          dispatch(
            actions.update({
              changes: {
                id: landing?.id,
                attributes: {
                  ...landing?.attributes,
                  title: landing?.attributes?.title,
                  about_page: values.about_page,
                },
              },
            })
          );
        }, [values.about_page]);

        // Component
        return (
          <Form className="flex flex-col text-left h-full">
            <div className="p-4 overflow-auto flex-grow">
              <Text variant="baseline" fontWeight="bold" textAlign="left" _hover={{ cursor: "pointer" }} mb="5">
                Edition de la section &ldquo;à propos&rdquo;
              </Text>

              <Wysiwyg id="about_page" className="h-[68vh]" />
            </div>

            <Footer
              onCancel={handleFinish}
              onSubmit={handleFinish}
              hideDelete={true}
            />
          </Form>
        );
      }}
    </Formik>
  );
};
