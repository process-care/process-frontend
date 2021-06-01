import React from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";

import { fields } from "components/CreateSurvey/ToolBox/InputForm/Template/logic/initialValues";
import {
  addInput,
  removePage,
  selectInput,
  updatePage,
} from "redux/slices/formBuilder";
import { toogleDrawer } from "redux/slices/application";
import { Box, Button, Container, Flex } from "@chakra-ui/react";
import { t } from "static/survey";
import ToolBox from "../InputsButton";
import { Formik, Form } from "formik";
import { Switch, Textarea } from "components/Fields";
import IInput from "interfaces/form/input";

export const PageForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selected_page, pages } = useAppSelector((state) => state.formBuilder);
  const hasOnePage = pages.length === 1;

  const handleSelect = (
    input_type: IInput["input_type"],
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
        page_id: selected_page.id,
      };
      dispatch(selectInput(data));
      dispatch(addInput(data));
      dispatch(toogleDrawer());
    }
  };

  const onChange = (event: React.FormEvent<HTMLFormElement>) => {
    const target = event.target as HTMLFormElement;
    if (target !== null) {
      dispatch(
        updatePage({
          id: selected_page.id,
          data: {
            [target.id]: target.checked ? target.checked : target.value,
          },
        })
      );
    }
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
        initialValues={selected_page}
        enableReinitialize
        onSubmit={(data, { setSubmitting, validateForm }) => {
          validateForm(data);
          setSubmitting(true);
          dispatch(toogleDrawer());
        }}>
        {() => {
          return (
            <Form
              onChange={(event) => onChange(event)}
              style={{ width: "100%" }}>
              <Flex w="100%" justifyContent="space-between">
                <Switch
                  size="sm"
                  id="is_locked"
                  label={
                    selected_page.is_locked
                      ? "🔒 Page non modifiable"
                      : "🔓  Page modifiable"
                  }
                />
                {!hasOnePage && (
                  <Button
                    variant="ghost"
                    fontSize="13px"
                    onClick={() => {
                      dispatch(removePage(selected_page));
                    }}>
                    🗑
                  </Button>
                )}
              </Flex>

              <Box pt={10}>
                <Textarea
                  id="name"
                  label="Nom de la page"
                  rows="small"
                  placeholder="Page 1"
                />
                <Textarea
                  id="short_name"
                  label="Nom court pour la navigation rapide"
                  rows="small"
                  placeholder="Page 1"
                />
                <ToolBox
                  onSelect={(input_type, name, id, internal_title) =>
                    handleSelect(input_type, name, id, internal_title)
                  }
                />
              </Box>

              {!hasOnePage && (
                <Flex
                  alignItems="center"
                  w="100%"
                  justifyContent="space-between"
                  mt={5}>
                  <Button variant="link">{t.add_condition}</Button>
                </Flex>
              )}
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};
