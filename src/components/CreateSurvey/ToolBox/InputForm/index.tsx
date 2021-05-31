import React from "react";

import { Flex, Text } from "@chakra-ui/react";
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
          console.log(target.value);
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

        React.useEffect(() => {
          dispatch(
            updateInput({
              id: selectedInput.id,
              data: {
                wysiwyg: values.wysiwyg,
              },
            })
          );
        }, [values.wysiwyg]);

        return (
          <Form onChange={(event) => onChange(event)}>
            <Flex
              alignItems="center"
              justifyContent="center"
              fontSize="30"
              flexDirection="column"
              px={10}>
              <Text fontSize="lg">
                Créer un champ {selectedInput.input_type}
              </Text>
              <hr />
              {renderFormTemplate(selectedInput)}
              <Footer
                hideRequired={selectedInput.input_type === "wysiwyg"}
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
