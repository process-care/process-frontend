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
  const onChange = (event: React.FormEvent<HTMLFormElement>) => {
    const target = event.target as HTMLFormElement;
    if (target !== null) {
      dispatch(
        updateInput({
          id: selectedInput.id,
          data: { [target.id]: target.value },
        })
      );
    }
  };

  const { type } = selectedInput;

  return (
    <Formik
      validateOnBlur={false}
      validationSchema={renderFormValidationSchema(selectedInput)}
      // initialValues={selectedInput ? selectedInput : fields[type]}
      initialValues={selectedInput ? selectedInput : fields[type]}
      onSubmit={(data, { setSubmitting, validateForm }) => {
        validateForm(data);
        setSubmitting(true);
        dispatch(toogleDrawer());
      }}>
      {({ isValid, isSubmitting, errors }) => {
        console.log("E", errors);
        return (
          <Form onChange={(event) => onChange(event)}>
            <Flex
              alignItems="center"
              justifyContent="center"
              fontSize="30"
              flexDirection="column"
              px={10}>
              <Text fontSize="lg">Créer un champ {selectedInput.type}</Text>
              <hr />
              {renderFormTemplate(selectedInput)}
              <Footer
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
