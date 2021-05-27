import React from "react";
import { useAppDispatch } from "redux/hooks";

import { fields } from "components/CreateSurvey/ToolBox/InputForm/Template/logic/initialValues";
import { addInput, selectInput } from "redux/slices/formBuilder";
import { toogleDrawer } from "redux/slices/application";
import { Box, Button, Container, Flex } from "@chakra-ui/react";
import { t } from "static/survey";
import ToolBox from "../InputsButton";
import { Formik, Form } from "formik";
import { Textarea } from "components/Fields";

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

  const onChange = () => {
    console.log("onChange");
  };

  return (
    <Container
      justifyContent="flex-start"
      pt={2}
      flexDirection="column"
      borderLeft="1px"
      variant="createformColumn"
      minW="300px"
      overflowY="auto"
      w="32%">
      <Formik
        validateOnBlur={false}
        initialValues={{}}
        onSubmit={(data, { setSubmitting, validateForm }) => {
          validateForm(data);
          setSubmitting(true);
          dispatch(toogleDrawer());
        }}>
        {() => {
          return (
            <Form onChange={() => onChange()} style={{ width: "100%" }}>
              <Flex w="100%" justifyContent="space-between">
                <Button variant="ghost" fontSize="13px">
                  🔒 Page non modifiable
                </Button>
                <Button variant="ghost" fontSize="13px">
                  🗑
                </Button>
              </Flex>
              <Box pt={10}>
                <Textarea
                  id="page_name"
                  label="Nom de la page"
                  rows="small"
                  placeholder="Page 1"
                />
                <ToolBox
                  onSelect={(input_type, name, id, internal_title) =>
                    handleSelect(input_type, name, id, internal_title)
                  }
                />
              </Box>

              <Flex
                alignItems="center"
                w="100%"
                justifyContent="space-between"
                mt={5}>
                <Button variant="link">{t.add_condition}</Button>
              </Flex>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};
