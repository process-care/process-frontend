import React from "react";

import { Box, Flex, Text } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useAppDispatch, useAppSelector } from "redux/hooks";

import { Footer } from "./Template/Footer";
import { renderFormTemplate, renderFormValidationSchema } from "./utils";
import { fields } from "./Template/logic/initialValues";
import {
  updateInput,
  removeInput,
  setIsEditing,
} from "redux/slices/formBuilder";
import { toogleDrawer } from "redux/slices/application";
import { Switch } from "components/Fields";
import { getInputIndex } from "utils/formBuilder/input";

const InputForm: React.FC = () => {
  const selectedInput = useAppSelector(
    (state) => state.formBuilder.selected_input
  );
  const isEditing = useAppSelector((state) => state.formBuilder.is_editing);
  const dispatch = useAppDispatch();

  const onCancel = () => {
    if (!isEditing) dispatch(removeInput(selectedInput));
    dispatch(toogleDrawer());
    dispatch(setIsEditing(false));
  };

  const { input_type } = selectedInput;

  return (
    <Formik
      validateOnBlur={false}
      validationSchema={renderFormValidationSchema(selectedInput)}
      initialValues={selectedInput ? selectedInput : fields[input_type]}
      onSubmit={(data, { setSubmitting, validateForm }) => {
        validateForm(data);
        setSubmitting(true);
        dispatch(toogleDrawer());
      }}>
      {({ isValid, isSubmitting, values }) => {
        const onChange = (event: React.FormEvent<HTMLFormElement>) => {
          const target = event.target as HTMLFormElement;
          if (target !== null) {
            dispatch(
              updateInput({
                id: selectedInput.id,
                data: {
                  [target.id]: target.value ? target.value : target.checked,
                },
              })
            );
          }
        };

        // Handle wysiwyg change
        React.useEffect(() => {
          dispatch(
            updateInput({
              id: selectedInput.id,
              data: {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                wysiwyg: values.wysiwyg,
              },
            })
          );
        }, [values.wysiwyg]);

        // Handle select change
        React.useEffect(() => {
          dispatch(
            updateInput({
              id: selectedInput.id,
              data: {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                freeclassification_responses_count:
                  values.freeclassification_responses_count,
              },
            })
          );
        }, [values.freeclassification_responses_count]);

        return (
          <Form onChange={(event) => onChange(event)}>
            <Flex
              alignItems="center"
              justifyContent="center"
              fontSize="30"
              flexDirection="column"
              px={10}>
              <Flex
                borderBottom="1px solid"
                borderColor="black"
                justifyContent="space-between"
                w="100%"
                pt={5}
                pb={1}
                mb={4}
                alignItems="start">
                <Box>
                  <Text variant="xs">{getInputIndex(selectedInput.id)}</Text>
                  <Text variant="xs">{selectedInput.input_type}</Text>
                </Box>

                {selectedInput.input_type !== "wysiwyg" && (
                  <Flex flexDirection="column">
                    <Switch label="" id="required" size="sm" />
                    <Text variant="xsMedium">Réponse obligatoire</Text>
                  </Flex>
                )}
              </Flex>

              <Box mb={8}>{renderFormTemplate(selectedInput)}</Box>

              <Footer
                onSubmit={() => console.log("submit")}
                disabled={!isValid || isSubmitting}
                onCancel={() => onCancel()}
              />
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
};

export default InputForm;
