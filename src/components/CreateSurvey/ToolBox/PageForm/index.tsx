import React from "react";
import { useAppDispatch } from "redux/hooks";

import { fields } from "components/CreateSurvey/ToolBox/InputForm/Template/logic/initialValues";
import { addInput, selectInput } from "redux/slices/formBuilder";
import { toogleDrawer } from "redux/slices/application";
import { Button, Container, Flex, Text } from "@chakra-ui/react";
import { t } from "static/survey";
import ToolBox from "../InputsButton";
import { Formik, Form } from "formik";
import { Footer } from "../InputForm/Template/Footer";

export const PageForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleSelect = (
    input_type: string,
    name: string,
    id: string,
    internal_title: string | undefined
  ) => {
    if (id) {
      const data = {
        ...fields[input_type],
        input_type,
        name,
        id,
        internal_title,
      };
      dispatch(selectInput(data));
      dispatch(addInput(data));
      dispatch(toogleDrawer());
    }
  };

  const onCancel = () => {
    console.log("cancel");
  };
  const onChange = () => {
    console.log("onChange");
  };

  return (
    <Container
      flexDirection="column"
      borderLeft="1px"
      variant="createformColumn"
      minW="300px"
      alignItems="center"
      overflowY="auto"
      w="32%">
      <ToolBox
        onSelect={(input_type, name, id, internal_title) =>
          handleSelect(input_type, name, id, internal_title)
        }
      />

      <Formik
        validateOnBlur={false}
        initialValues={{}}
        onSubmit={(data, { setSubmitting, validateForm }) => {
          validateForm(data);
          setSubmitting(true);
          dispatch(toogleDrawer());
        }}>
        {({ isValid, isSubmitting }) => {
          return (
            <Form onChange={() => onChange()}>
              <Flex
                alignItems="center"
                w="100%"
                justifyContent="space-between"
                mt={5}>
                <Button variant="roundedTransparent">{t.add_condition}</Button>
                <Text fontSize="10px">bloquer la page</Text>
              </Flex>
              <Footer
                disabled={!isValid || isSubmitting}
                onCancel={() => onCancel()}
              />
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};
